'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Juliana S.',
    text: 'Funciona mesmo! Em dois dias meu filho já não precisava mais mamar para dormir. Foi um alívio!',
    avatar: 'https://i.imgur.com/Sza1ZfT.png',
  },
  {
    name: 'Fernanda L.',
    text: 'Eu estava exausta e sem esperança. O método é super gentil e funcionou mais rápido do que eu imaginava. Recomendo demais!',
    avatar: 'https://i.imgur.com/GJZpDHa.png',
  },
  {
    name: 'Camila P.',
    text: 'O melhor investimento que fiz. Ter minhas noites de sono de volta não tem preço. Meu relacionamento com meu marido melhorou 100%.',
    avatar: 'https://i.imgur.com/NVXnmUf.jpg',
  },
  {
    name: 'Amanda R.',
    text: 'Tinha medo de ser um método de deixar chorando, mas é o oposto! Muito carinhoso e meu bebê aceitou super bem.',
    avatar: 'https://i.imgur.com/naq9F89.jpg',
  },
  {
    name: 'Beatriz M.',
    text: 'Três dias. Foi o que precisei. Inacreditável. Só posso agradecer por terem criado algo tão eficaz e simples de aplicar.',
    avatar: 'https://i.imgur.com/UA8o4Kz.png',
  },
  {
    name: 'Larissa F.',
    text: 'Se você está na dúvida, apenas compre. Vale cada centavo. Minha vida mudou da água para o vinho.',
    avatar: 'https://i.imgur.com/SPsVs9s.jpg',
  },
];

const TimelineStep = ({ day, title, description }: { day: string; title: string; description: string }) => (
  <div className="flex items-center gap-4">
    <div className="flex flex-col items-center self-stretch">
      <div className="w-px flex-1 bg-primary -mb-1" />
      <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">{day}</div>
      <div className="w-px flex-1 bg-primary -mt-1" />
    </div>
    <div>
      <h4 className="font-bold font-headline text-lg">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);


export default function SolutionPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl py-12 px-4 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">ÓTIMAS NOTÍCIAS!</h1>
          <p className="text-lg md:text-xl text-muted-foreground">Você está exatamente onde milhares de outras mães estavam antes de descobrirem o Soninho sem Peito</p>
        </div>

        {/* O que descobrimos */}
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">O que descobrimos sobre sua situação:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-lg">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Seu bebê tem a idade ideal para o método.</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Seu nível de exaustão está afetando sua qualidade de vida.</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Você está pronta para uma mudança gentil e eficaz.</span>
            </div>
          </CardContent>
        </Card>

        {/* A Boa Notícia */}
        <div className="text-center bg-primary/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold font-headline text-primary">A BOA NOTÍCIA É:</h2>
          <p className="mt-2 text-lg">Você não precisa continuar assim. Nosso método já ajudou mais de 32.000 famílias e pode ajudar você também.</p>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
            <TimelineStep day="★" title="Resultado atual: HOJE" description="Seu bebê só dorme mamando" />
            <TimelineStep day="1" title="Após 1 dia com o Soninho sem peito" description="Aprenda a técnica" />
            <TimelineStep day="2" title="Após 2 dias com o Soninho sem peito" description="Você já vê resultados" />
            <TimelineStep day="3" title="Após 3 dias com o Soninho sem peito" description="Seu bebê dormindo sem peito" />
        </div>
        
        {/* Desafio Prático */}
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Seu desafio prático de 3 dias para ensinar seu bebê a dormir sem ser mamando</h2>
            <p className="mt-2 text-lg text-muted-foreground">Em no máximo 3 Dias o seu bebê não dependerá mais do peito para dormir, e você poderá descansar como fazia antes.</p>
        </div>

        {/* Depoimentos */}
        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-center">Mães Satisfeitas</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardContent className="p-6 flex-1">
                            <p className="italic text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                        </CardContent>
                        <CardHeader className="flex-row items-center gap-4 pt-0">
                           <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>

        {/* CTA Card */}
        <Card className="bg-gradient-to-br from-primary/80 via-primary to-accent/80 text-primary-foreground shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-xl line-through opacity-80">De R$197,00</p>
              <p className="text-6xl font-extrabold">por R$ 47,00</p>
              <p className="text-lg opacity-90">ou 12x de R$ 4,70</p>
            </div>
            <Button size="lg" className="w-full text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-transform">
              QUERO COMEÇAR AGORA
            </Button>
            <div className="space-y-2 pt-4 text-left md:text-center text-sm">
                <div className="flex items-center gap-2 justify-center">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Garantia de 7 dias</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Método 100% gentil (não precisa deixar bebê chorando sozinho)</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Resultados em 72 horas (3 dias)</span>
                </div>
            </div>
          </div>
        </Card>

        {/* Garantia */}
        <div className="text-center border-2 border-dashed border-primary/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold font-headline text-primary">O seu bebê dormindo sem ser mamando ou o seu dinheiro de volta!</h3>
            <p className="mt-4 text-muted-foreground">Todo o passo a passo deve ser feito por 3 dias consecutivos, esse é o tempo que várias mamães precisaram para verem seus bebês dormindo melhor sem o peito. Por esse motivo, com a nossa garantia de 7 dias, você não corre nenhum risco. Se em 7 dias ou menos, você aplicar as técnicas e não ver nenhum resultado, devolvemos 100% do seu dinheiro.</p>
        </div>

        {/* Final CTA */}
         <div className="text-center">
            <Button size="lg" className="w-full max-w-md text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg">
              QUERO COMEÇAR AGORA
            </Button>
        </div>

      </div>
    </main>
  );
}
