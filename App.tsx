
import React, { useState, useEffect, useCallback } from 'react';
import { Genre, StoryLength, StoryState, GeneratorOptions, Suggestions } from './types';
import { generateStory, getSuggestions, expandStory } from './services/geminiService';
import StoryControls from './components/StoryControls';
import StoryReader from './components/StoryReader';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [options, setOptions] = useState<GeneratorOptions>({
    prompt: '',
    genre: Genre.FANTASY,
    length: StoryLength.SHORT,
    includeTwist: false,
    heavyDialogue: false,
    tone: 'Serious'
  });

  const [currentStory, setCurrentStory] = useState<StoryState | null>(null);
  const [history, setHistory] = useState<StoryState[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Auto-fetch suggestions when prompt is long enough
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (options.prompt.length > 15) {
        setIsLoadingSuggestions(true);
        try {
          const res = await getSuggestions(options.prompt, options.genre);
          setSuggestions(res);
        } catch (error) {
          console.error("Failed to fetch suggestions", error);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [options.prompt, options.genre]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateStory(options);
      const newStory: StoryState = {
        id: crypto.randomUUID(),
        title: result.title,
        genre: options.genre,
        content: result.content,
        summary: result.summary,
        characters: [],
        createdAt: Date.now()
      };
      setCurrentStory(newStory);
      setHistory(prev => [newStory, ...prev]);
    } catch (error) {
      alert("Failed to weave a story. Please check your API key or connection.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = async (instruction: string) => {
    if (!currentStory || !instruction.trim()) return;
    setIsExpanding(true);
    try {
      const continuation = await expandStory(currentStory.content, instruction);
      const updatedStory = {
        ...currentStory,
        content: currentStory.content + "\n\n" + continuation
      };
      setCurrentStory(updatedStory);
      setHistory(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
    } catch (error) {
      alert("Expansion failed.");
      console.error(error);
    } finally {
      setIsExpanding(false);
    }
  };

  const handleUpdateContent = (newContent: string) => {
    if (!currentStory) return;
    const updated = { ...currentStory, content: newContent };
    setCurrentStory(updated);
    // Debounce this in a real app, but for this demo:
    setHistory(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <i className="fa-solid fa-feather-pointed text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">ChronicleAI</h1>
            <p className="text-xs text-slate-400 font-medium -mt-1 uppercase tracking-widest">Story Studio</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Gemini 3 Pro Active
          </span>
          <button className="text-slate-400 hover:text-indigo-600 transition-colors">
            <i className="fa-solid fa-circle-question text-xl"></i>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex p-6 gap-6 overflow-hidden">
        {/* Left Control Panel */}
        <div className="w-full max-w-md flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar shrink-0">
          <StoryControls 
            options={options} 
            setOptions={setOptions} 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />
        </div>

        {/* Center Story Display */}
        <StoryReader 
          story={currentStory} 
          onUpdateContent={handleUpdateContent}
          onExpand={handleExpand}
          isExpanding={isExpanding}
        />

        {/* Right Sidebar */}
        <Sidebar 
          history={history} 
          suggestions={suggestions} 
          onSelectStory={setCurrentStory} 
          isLoadingSuggestions={isLoadingSuggestions}
          currentStoryId={currentStory?.id}
        />
      </main>

      {/* Footer Mobile Nav (Placeholder) */}
      <footer className="lg:hidden bg-white border-t border-slate-200 p-4 flex justify-around shrink-0">
        <button className="text-indigo-600 flex flex-col items-center gap-1">
          <i className="fa-solid fa-pen-nib"></i>
          <span className="text-[10px] font-bold">Write</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span className="text-[10px] font-bold">History</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <i className="fa-solid fa-gear"></i>
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
