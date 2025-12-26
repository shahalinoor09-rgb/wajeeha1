
import React from 'react';
import { StoryState, Suggestions } from '../types';

interface SidebarProps {
  history: StoryState[];
  suggestions: Suggestions | null;
  onSelectStory: (story: StoryState) => void;
  isLoadingSuggestions: boolean;
  currentStoryId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  history, 
  suggestions, 
  onSelectStory, 
  isLoadingSuggestions,
  currentStoryId 
}) => {
  return (
    <aside className="w-80 hidden lg:flex flex-col gap-6 overflow-y-auto pr-2">
      {/* Suggestions Section */}
      <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb"></i>
          AI Spark
        </h3>
        {isLoadingSuggestions ? (
          <div className="flex items-center gap-2 text-indigo-400 text-sm italic">
            <i className="fa-solid fa-spinner fa-spin"></i>
            Generating ideas...
          </div>
        ) : suggestions ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-indigo-400 mb-2">TITLE IDEAS</p>
              <ul className="space-y-1">
                {suggestions.titles.map((t, i) => (
                  <li key={i} className="text-sm text-indigo-800 bg-white/50 p-2 rounded border border-indigo-100 select-all cursor-pointer hover:bg-white transition-colors">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 mb-2">NAMES</p>
              <div className="flex flex-wrap gap-1">
                {suggestions.characterNames.map((n, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white rounded-full border border-indigo-100 text-indigo-700">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-indigo-400 italic">Enter a prompt to see creative sparks here</p>
        )}
      </div>

      {/* History Section */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left"></i>
          Recent Works
        </h3>
        <div className="space-y-2">
          {history.length === 0 ? (
            <p className="text-sm text-slate-400 italic px-2">No stories yet</p>
          ) : (
            history.map((story) => (
              <button
                key={story.id}
                onClick={() => onSelectStory(story)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  currentStoryId === story.id 
                  ? 'bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-500' 
                  : 'bg-transparent border-transparent hover:bg-slate-200/50 text-slate-600'
                }`}
              >
                <p className="font-bold text-sm truncate">{story.title}</p>
                <p className="text-xs opacity-60 flex justify-between items-center mt-1">
                  <span>{story.genre}</span>
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
