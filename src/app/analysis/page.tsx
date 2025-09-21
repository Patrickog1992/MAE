'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { analyzeQuizResponses, type QuizResponsesOutput } from '@/ai/flows/analyze-quiz-responses';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<QuizResponsesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const answers = JSON.parse(answersParam);
        if (Array.isArray(answers) && answers.length > 0) {
          analyzeQuizResponses({ answers })
            .then(result => {
              setAnalysisResult(result);
            })
            .catch(err => {
              console.error('Analysis failed:', err);
              setError('Failed to analyze responses.');
            });
        }
      } catch (e) {
        console.error('Failed to parse answers:', e);
        setError('Invalid answers format.');
      }
    }

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2.5; // Fills in 4 seconds
      });
    }, 100);

    return () => clearInterval(timer);
  }, [searchParams]);

  useEffect(() => {
    if ((progress >= 100 && analysisResult) || error) {
      if (analysisResult) {
        sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
        router.push('/results');
      }
      if (error) {
        // Handle error - maybe redirect to an error page or back to quiz
        router.push('/');
      }
    }
  }, [progress, analysisResult, router, error]);

  const loadingSteps = [
    'Calculando o potencial de sono do seu bebê',
    'Identificando padrões de comportamento',
    'Personalizando recomendações',
    'Preparando seu resultado',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <Image
          src="https://i.imgur.com/POLpDFS.png"
          alt="Soninho sem Peito Logo"
          width={100}
          height={100}
          className="mb-6"
        />
        <Card className="w-full max-w-lg text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Analisando suas respostas...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Progress value={progress} className="w-full h-3" />
            <ul className="text-left space-y-3 text-lg">
              {loadingSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-6 w-6 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
        Soninho sem Peito todos os direitos reservados 2025
      </footer>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalysisContent />
    </Suspense>
  );
}
