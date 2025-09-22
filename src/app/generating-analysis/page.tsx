
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const analysisSteps = [
  'Analisando suas respostas...',
  'Calculando o potencial de sono do seu bebê',
  'Identificando padrões de comportamento',
  'Personalizando recomendações',
  'Preparando seu resultado',
];

function GeneratingAnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200); // Wait 1.2 seconds per step

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      const answers = searchParams.get('answers');
      router.replace(`/analysis?answers=${answers || ''}`);
    }
  }, [currentStep, router, searchParams]);
  
  return (
     <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <Image
          src="https://i.imgur.com/FuMHzNS.png"
          alt="Soninho sem Peito Logo"
          width={100}
          height={100}
          className="mb-6"
        />
        <div className="w-full max-w-md text-center">
            <h1 className="text-2xl font-headline mb-8">Estamos preparando sua análise...</h1>
            <ul className="space-y-4">
              {analysisSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-center gap-3 text-lg transition-all duration-500 ${
                    currentStep > index ? 'text-green-500' : 
                    currentStep === index ? 'text-primary font-semibold animate-pulse' : 'text-muted-foreground'
                  }`}
                >
                  <CheckCircle2 className={`h-5 w-5 transition-all duration-500 ${currentStep > index ? 'opacity-100' : 'opacity-0'}`} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
        </div>
      </div>
      <footer className="w-full text-center p-4 text-sm text-muted-foreground mt-8">
        Soninho sem Peito todos os direitos reservados 2025
      </footer>
    </main>
  );
}

export default function GeneratingAnalysisPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <GeneratingAnalysisContent />
        </Suspense>
    )
}
