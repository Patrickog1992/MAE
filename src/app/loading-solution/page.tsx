'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

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
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="flex flex-col items-center w-full flex-1 justify-center">
            <Image
                src="https://i.imgur.com/POLpDFS.png"
                alt="Soninho sem Peito Logo"
                width={100}
                height={100}
                className="mb-6"
            />
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
         <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
            Soninho sem Peito todos os direitos reservados 2025
        </footer>
    </main>
  );
}
