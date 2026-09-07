import { getAllConceptos } from "@/lib/conceptos";
import AIPromptStudio from "@/components/AIPromptStudio";
import { Sparkles } from "lucide-react";

export default async function PromptStudioPage() {
  const conceptos = await getAllConceptos();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-8">
      <AIPromptStudio conceptos={conceptos} />
    </div>
  );
}
