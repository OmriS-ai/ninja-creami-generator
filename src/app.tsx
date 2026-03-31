import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RecipeTypeSelector } from '@/components/recipe-type-selector';
import { IngredientBrowser } from '@/components/ingredient-browser';
import { RecipeEditor } from '@/components/recipe-editor';
import { MetricsDashboard } from '@/components/metrics-dashboard';
import { WarningsPanel } from '@/components/warnings-panel';
import { ProgramRecommendation } from '@/components/program-recommendation';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <RecipeTypeSelector />
        <IngredientBrowser />
        <RecipeEditor />
        <MetricsDashboard />
        <WarningsPanel />
        <ProgramRecommendation />
      </main>
      <Footer />
    </div>
  );
}
