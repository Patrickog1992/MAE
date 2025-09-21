import { QuizClient } from '@/app/components/quiz-client';
import { Suspense } from 'react';
import Image from 'next/image';

function HomePageContent() {
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
        <QuizClient />
      </div>
      <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
        Soninho sem Peito todos os direitos reservados 2025
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
