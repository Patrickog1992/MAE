'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportagemPage() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the quiz, starting from step 2 (the first question)
    router.push('/?step=2');
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <Image
          src="https://i.imgur.com/POLpDFS.png"
          alt="Soninho sem Peito Logo"
          width={100}
          height={100}
          className="mb-6"
        />
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center font-headline">
              Método Soninho sem Peito ganha destaque na mídia
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="relative w-full aspect-video">
              <Image
                src="https://i.imgur.com/I9il9aV.png"
                alt="Reportagem sobre o método Soninho sem Peito"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <Button size="lg" onClick={handleContinue}>
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
      <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
        Soninho sem Peito todos os direitos reservados 2025
      </footer>
    </main>
  );
}
