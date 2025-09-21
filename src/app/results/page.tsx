'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { QuizResponsesOutput } from '@/ai/flows/analyze-quiz-responses';

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResponsesOutput | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resultData = sessionStorage.getItem('analysisResult');
    if (resultData) {
      setResult(JSON.parse(resultData));
    } else {
      // Redirect if no result is found
      router.push('/');
    }
  }, [router]);
  
  const imageDetails = PlaceHolderImages.find(img => img.id === 'quiz-results');

  if (!result || !imageDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando resultado...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">Resultado da sua análise</CardTitle>
          <CardDescription className="text-lg pt-2">
            Com base em suas respostas, identificamos o seguinte:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="p-6 bg-secondary/50 rounded-lg border">
            <p className="text-lg whitespace-pre-wrap">{result.analysis}</p>
          </div>

          <div className="text-center space-y-4 pt-6">
            <h3 className="text-2xl font-headline">Você antes do Soninho sem peito</h3>
            <div className="relative w-full max-w-md mx-auto aspect-[3/2] rounded-lg overflow-hidden ring-2 ring-primary/50">
              <Image
                src={imageDetails.imageUrl}
                alt={imageDetails.description}
                fill
                className="object-cover"
                data-ai-hint={imageDetails.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="text-center pt-4">
            <Button size="lg" onClick={() => router.push('/')}>
              Fazer o quiz novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
