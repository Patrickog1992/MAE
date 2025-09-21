import { QuizClient } from '@/app/components/quiz-client';
import { Suspense } from 'react';

function HomePageContent() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <QuizClient />
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
