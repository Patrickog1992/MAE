'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { quizSteps, QuizOption, getIcon } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function QuizClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz();
    }
  };

  const handleAnswer = (option: QuizOption) => {
    const currentQuestionKey = quizSteps[currentStep].questionKey;
    const newAnswers = { ...answers, [currentQuestionKey]: option.text };
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: Record<string, string> = answers) => {
    const answersAsArray = Object.entries(finalAnswers).map(([key, value]) => `${key}: ${value}`);
    router.push(`/analysis?answers=${encodeURIComponent(JSON.stringify(answersAsArray))}`);
  };

  const stepData = quizSteps[currentStep];

  const imageDetails = stepData.image ? PlaceHolderImages.find(img => img.id === stepData.image!.id) : null;

  return (
    <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <Progress value={stepData.progress} className="w-full h-2 mb-4" />
        <CardTitle className="text-3xl text-center font-headline">{stepData.title}</CardTitle>
        {stepData.description && (
          <CardDescription className="text-center text-lg whitespace-pre-line pt-2">
            {stepData.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {imageDetails && (
          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
            <Image
              src={imageDetails.imageUrl}
              alt={imageDetails.description}
              fill
              className="object-cover"
              data-ai-hint={imageDetails.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {stepData.bullets && (
          <ul className="space-y-2 text-lg w-full max-w-md">
            {stepData.bullets.map((bullet, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="h-6 w-6 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {stepData.type === 'intro' && (
          <Button size="lg" onClick={handleNext} className="mt-4 text-lg font-bold">
            {stepData.buttonText}
          </Button>
        )}

        {stepData.type === 'question' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {stepData.options?.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-base justify-start text-left flex-col items-start gap-3 transition-all duration-300 hover:shadow-lg hover:border-primary"
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center gap-3">
                  {option.icon && getIcon(option.icon)}
                  <span className="font-semibold">{option.text}</span>
                </div>
                {option.subtext && <p className="text-sm text-muted-foreground whitespace-normal">{option.subtext}</p>}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
