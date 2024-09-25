import React from 'react';
import { examplePrompts } from '@/utils/examplePrompts';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectPrompt }) => {
  const [selectedPrompts, setSelectedPrompts] = React.useState<string[]>([]);

  React.useEffect(() => {
    const shuffled = examplePrompts.sort(() => 0.5 - Math.random());
    setSelectedPrompts(shuffled.slice(0, 4)); // Changed to 4 prompts
  }, []);

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2 text-center">Try these personalized prompts:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {selectedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="text-sm border border-purple-400 text-purple-400 px-3 py-1 rounded-full hover:bg-purple-400 hover:text-white transition-colors duration-200 ease-in-out"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
