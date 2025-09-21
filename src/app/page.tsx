import { QuizClient } from '@/app/components/quiz-client';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <QuizClient />
    </main>
  );
}
