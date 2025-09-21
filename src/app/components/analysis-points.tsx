'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface AnalysisPoint {
  title: string;
  description: string;
}

export const AnalysisPoints = ({ points }: { points: AnalysisPoint[] }) => {
  return (
    <div className="text-center space-y-6">
      <h3 className="text-3xl font-headline">Descobrimos 3 pontos importantes</h3>
      <div className="grid md:grid-cols-3 gap-6 text-left">
        {points.map((point, index) => (
          <Card key={index} className="bg-secondary/30">
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-400" />
              <CardTitle className="text-xl font-headline">{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
