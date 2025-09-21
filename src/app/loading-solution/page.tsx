'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoadingSolutionPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 4 seconds total

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        router.push('/solution');
      }, 500);
    }
  }, [progress, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-5xl font-bold font-headline text-primary">
            {Math.min(99, Math.floor(progress))}%
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-8">
          <h2 className="text-2xl font-headline">Preparando...</h2>
          <p className="text-muted-foreground">Estamos preparando o seu plano personalizado</p>
          <Progress value={progress} className="w-full h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
