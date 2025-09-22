
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { analyzeQuizResponses, type QuizResponsesOutput } from '@/ai/flows/analyze-quiz-responses';
import { Progress } from '@/components/ui/progress';
import { Check, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnalysisPoints } from '@/app/components/analysis-points';


const BeforeAfterSection = ({ title, imageId, items, checkColor }: { title: string, imageId: string, items: string[], checkColor: string }) => {
  const imageDetails = PlaceHolderImages.find(img => img.id === imageId);

  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-headline">{title}</h3>
      {imageDetails && (
         <div className="relative w-full max-w-md mx-auto aspect-video">
            <Image
              src={imageDetails.imageUrl}
              alt={imageDetails.description}
              fill
              className="object-contain"
              data-ai-hint={imageDetails.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
      )}
      <ul className="text-left space-y-2 max-w-md mx-auto">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${checkColor}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (!answersParam) {
      setError('Nenhuma resposta foi encontrada. Por favor, comece o quiz novamente.');
    }
  }, [searchParams]);

  const beforeItems = [
    'Bebê só dorme no peito → mãe presa, exausta.',
    'Noites mal dormidas → cansaço extremo, choro e irritação.',
    'Medo de “desmamar” → insegurança e culpa.',
    'Sem tempo para si → zero energia para cuidar de si mesma ou da família.',
    'Relacionamento desgastado → menos paciência com parceiro e outros filhos.'
  ];

  const afterItems = [
    'Bebê dorme tranquilo, sem depender do peito.',
    'Noites de descanso → mãe recupera energia.',
    'Método gentil → sem deixar o bebê chorando.',
    'Mais tempo e disposição → mãe volta a se sentir bem consigo mesma.',
    'Harmonia na família → mais leveza no relacionamento e rotina.'
  ];

  const analysisPoints = [
    { title: 'A Hora Certa', description: 'Seu bebê está na fase ideal para aprender a dormir sem mamar' },
    { title: 'Nível da Associação', description: 'A associação atual com o peito/mamadeira é forte' },
    { title: 'Nível de saúde', description: 'Você está perdendo aproximadamente 20 horas de sono por semana' }
  ];

  const handleSeeSolution = () => {
    router.push('/loading-solution');
  };
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center w-full flex-1 justify-center">
           <Image
              src="https://i.imgur.com/FuMHzNS.png"
              alt="Soninho sem Peito Logo"
              width={100}
              height={100}
              className="mb-6"
          />
          <Card className="w-full max-w-lg text-center shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-destructive">Ocorreu um erro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <p>{error}</p>
              <Button onClick={() => router.push('/')}>Voltar ao Início</Button>
            </CardContent>
          </Card>
        </div>
        <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
          Soninho sem Peito todos os direitos reservados 2025
        </footer>
      </div>
    );
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <Image
            src="https://i.imgur.com/FuMHzNS.png"
            alt="Soninho sem Peito Logo"
            width={100}
            height={100}
            className="mb-6"
        />
        <Card className="w-full max-w-4xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-headline">Resultado da sua análise</CardTitle>
            <CardDescription className="text-lg pt-2">
              Com base em suas respostas, identificamos o seguinte:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-12 p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <BeforeAfterSection 
                title="Você antes do Soninho sem peito"
                imageId="quiz-results-before"
                items={beforeItems}
                checkColor="text-red-500"
              />
              <BeforeAfterSection 
                title="Você depois do Soninho sem peito"
                imageId="quiz-results-after"
                items={afterItems}
                checkColor="text-green-500"
              />
            </div>
            
            <AnalysisPoints points={analysisPoints} />

            <div className="text-center">
              <Button size="lg" onClick={handleSeeSolution}>
                Ver Solução Recomendada
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
        Soninho sem Peito todos os direitos reservados 2025
      </footer>
    </main>
  );
}


export default function AnalysisPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AnalysisContent />
    </Suspense>
  );
}
