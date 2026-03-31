import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildUserPrompt } from './prompt-template';
import { getById } from '@/lib/ingredients';
import type { RecipeType } from '@/lib/types';

interface GeneratedRecipe {
  ingredients: { ingredientId: string; amount: number }[];
  notes: string;
}

export async function generateRecipe(
  apiKey: string,
  recipeType: RecipeType,
  flavor: string,
): Promise<GeneratedRecipe> {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: buildUserPrompt(recipeType, flavor) }],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response. Please try again.');
  }

  const parsed = JSON.parse(jsonMatch[0]) as {
    ingredients: { id: string; amount: number }[];
    notes: string;
  };

  const validated: GeneratedRecipe = { ingredients: [], notes: parsed.notes || '' };

  for (const item of parsed.ingredients) {
    const ingredient = getById(item.id);
    if (!ingredient) continue;
    if (item.amount <= 0) continue;
    validated.ingredients.push({ ingredientId: item.id, amount: item.amount });
  }

  if (validated.ingredients.length === 0) {
    throw new Error('AI generated an invalid recipe. Please try again.');
  }

  return validated;
}
