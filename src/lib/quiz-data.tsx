import React from 'react';
import { BedDouble, CheckSquare, Clock, Flower2, HeartHandshake, HeartPulse, Leaf, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface QuizOption {
  icon?: string;
  text: string;
  subtext?: string;
}

export interface QuizStep {
  type: 'intro' | 'question';
  title: string;
  image?: {
    id: string,
    width: number;
    height: number;
  };
  description?: string;
  bullets?: string[];
  buttonText: string;
  options?: QuizOption[];
  questionKey: string;
  progress: number;
}

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const quizSteps: QuizStep[] = [
  {
    type: 'intro',
    title: 'Descubra em 2 minutos como seu bebê pode aprender a dormir sem ser mamando',
    image: { id: 'quiz-intro-1', width: 600, height: 400 },
    bullets: [
      'O potencial do seu bebê para dormir a noite toda',
      'O método personalizado ideal para seu caso',
      'Quanto tempo você poderia recuperar para si mesma',
    ],
    buttonText: 'Começar Agora',
    questionKey: 'intro1',
    progress: 0,
  },
  {
    type: 'intro',
    title: 'Mais de 32 mil',
    description: 'É o número de mães que já ajudamos a conquistarem noites tranquilas, através deste projeto.',
    image: { id: 'quiz-intro-2', width: 600, height: 400 },
    buttonText: 'Continuar',
    questionKey: 'intro2',
    progress: 10,
  },
  {
    type: 'question',
    title: 'Para começar, me conte uma coisa boa: Qual dessas conquistas você mais sonha realizar?',
    options: [
      { icon: 'Flower2', text: 'Ter mais tempo para cuidar de mim mesma' },
      { icon: 'BedDouble', text: 'Ver meu bebê dormindo tranquilo a noite toda' },
      { icon: 'Zap', text: 'Recuperar minha energia e disposição' },
      { icon: 'HeartHandshake', text: 'Ter momentos especiais com meu parceiro(a)' },
    ],
    buttonText: '',
    questionKey: 'dream_achievement',
    progress: 20,
  },
  {
    type: 'question',
    title: 'Qual a idade do seu bebê?',
    options: [
      { text: '👶 0-3 meses' },
      { text: '👩‍🍼 4-6 meses' },
      { text: '🚼 7-12 meses' },
      { text: '🍼 Mais de 1 ano' },
    ],
    buttonText: '',
    questionKey: 'baby_age',
    progress: 30,
  },
  {
    type: 'question',
    title: 'Como seu bebê costuma adormecer?',
    description: 'Escolha a opção mais frequente:',
    options: [
      { text: '😐 Sempre precisa do peito/mamadeira até adormecer' },
      { text: '😅 Às vezes dorme sem peito/mamadeira, mas é raro' },
      { text: '😶 Adormece sem peito/mamadeira, mas acorda na madrugada procurando' },
      { text: '😑 Precisa do peito/mamadeira em todos os sonos do dia e da noite' },
    ],
    buttonText: '',
    questionKey: 'sleep_habit',
    progress: 40,
  },
  {
    type: 'question',
    title: 'Em uma noite típica...',
    description: 'Quantas vezes seu bebê acorda procurando peito/mamadeira?',
    options: [
      { text: '1-2 vezes' },
      { text: '3-4 vezes' },
      { text: '5 vezes ou mais' },
      { text: 'Perdi as contas de tantas vezes' },
    ],
    buttonText: '',
    questionKey: 'night_waking',
    progress: 50,
  },
  {
    type: 'question',
    title: 'Eu tendo a me sentir...',
    description: 'Selecione a opção que mais se aplica',
    options: [
      { text: '😫 Exausta por não conseguir dormir uma noite inteira' },
      { text: '😰 Preocupada se estou fazendo a coisa certa' },
      { text: '😪 Frustrada por tentar várias coisas sem sucesso' },
      { text: '🥺 Ansiosa pensando em quantas vezes vou precisar levantar na madrugada' },
    ],
    buttonText: '',
    questionKey: 'mother_feeling_general',
    progress: 60,
  },
  {
    type: 'question',
    title: 'Complete honestamente: "Como mãe, eu me sinto..."',
    options: [
      { text: 'Culpada', subtext: 'Um pouco culpada por querer mudar a forma como meu bebê dorme' },
      { text: 'Impotente', subtext: 'Impotente por não conseguir resolver isso sozinha' },
      { text: 'Preocupada', subtext: 'Preocupada que essa situação esteja afetando minha saúde mental' },
      { text: 'Medo', subtext: 'Com medo de que isso nunca vá melhorar' },
    ],
    buttonText: '',
    questionKey: 'mother_feeling_specific',
    progress: 70,
  },
  {
    type: 'question',
    title: 'Você sabia?',
    description: 'Se seu bebê tem de 7 a 12 meses, você já passou aproximadamente: 990 horas acordada durante a noite (equivalente a 41 dias inteiros sem dormir direito)\n\nIsso está afetando outras áreas da sua vida? Selecione a opção mais afetada.',
    options: [
      { icon: 'HeartPulse', text: 'Sim, meu relacionamento com meu parceiro(a)' },
      { icon: 'Clock', text: 'Sim, minha produtividade durante o dia' },
      { icon: 'Leaf', text: 'Sim, minha saúde física e mental' },
      { icon: 'CheckSquare', text: 'Sim, todas as opções acima' },
    ],
    buttonText: '',
    questionKey: 'life_impact',
    progress: 80,
  },
  {
    type: 'question',
    title: 'Se existisse um método gentil...',
    description: 'Que pudesse ajudar seu bebê a dormir sem precisar do peito em apenas 3 dias, quanto isso mudaria sua vida?',
    options: [
      { text: 'Seria uma transformação completa' },
      { text: 'Ajudaria muito, gostaria de saber mais' },
    ],
    buttonText: '',
    questionKey: 'method_openness',
    progress: 90,
  },
];

const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Flower2,
  BedDouble,
  Zap,
  HeartHandshake,
  HeartPulse,
  Clock,
  Leaf,
  CheckSquare,
};

export const getIcon = (name: string) => {
  const Icon = iconComponents[name];
  return Icon ? <Icon className="h-6 w-6 text-accent" /> : null;
};
