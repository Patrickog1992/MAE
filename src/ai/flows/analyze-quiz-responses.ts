'use server';

/**
 * @fileOverview Analyzes quiz responses and generates personalized results and recommendations.
 *
 * - analyzeQuizResponses - A function that analyzes quiz responses and generates results.
 * - QuizResponsesInput - The input type for the analyzeQuizResponses function.
 * - QuizResponsesOutput - The return type for the analyzeQuizResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizResponsesInputSchema = z.object({
  answers: z.array(z.string()).describe('An array of strings containing the user\u2019s answers to the quiz questions.'),
});

export type QuizResponsesInput = z.infer<typeof QuizResponsesInputSchema>;

const QuizResponsesOutputSchema = z.object({
  analysis: z.string().describe('A detailed analysis of the user\u2019s quiz responses, including personalized recommendations.'),
});

export type QuizResponsesOutput = z.infer<typeof QuizResponsesOutputSchema>;

export async function analyzeQuizResponses(input: QuizResponsesInput): Promise<QuizResponsesOutput> {
  return analyzeQuizResponsesFlow(input);
}

const analyzeQuizResponsesPrompt = ai.definePrompt({
  name: 'analyzeQuizResponsesPrompt',
  input: {schema: QuizResponsesInputSchema},
  output: {schema: QuizResponsesOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing quiz responses related to baby sleep patterns and providing personalized recommendations.

  Analyze the following quiz responses from the user:
  {{#each answers}}
  - {{{this}}}
  {{/each}}

  Based on these responses, provide a detailed analysis of the user's situation and offer tailored advice to help the baby sleep without relying on breastfeeding.
  Consider factors like the baby's age, current sleep habits, and the mother's feelings and concerns, suggest a course of action that addresses the user's unique needs and goals.
  Focus on providing actionable steps and practical tips that the user can implement immediately.
`,
});

const analyzeQuizResponsesFlow = ai.defineFlow(
  {
    name: 'analyzeQuizResponsesFlow',
    inputSchema: QuizResponsesInputSchema,
    outputSchema: QuizResponsesOutputSchema,
  },
  async input => {
    const {output} = await analyzeQuizResponsesPrompt(input);
    return output!;
  }
);
