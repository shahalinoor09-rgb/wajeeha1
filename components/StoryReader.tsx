
import React, { useState } from 'react';
import { StoryState } from '../types';

interface StoryReaderProps {
  story: StoryState | null;
  onUpdateContent: (newContent: string) => void;
  onExpand: (instruction: string) => void;
  isExpanding: boolean;
}

const StoryReader: React.FC<StoryReaderProps> = ({ story, onUpdateContent, onExpand, isExpanding }) => {
  const [expandInput, setExpandInput] = useState('');

  if (!story) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-xl bg-white">
        <i className="fa-solid fa-book-open text-6xl mb-4 opacity-20"></i>
        <p className="text-lg font-medium">Your story will appear here</p>
        <p className="text-sm">Configure the settings on the left to begin</p>
      </div>
    );
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`# ${story.title}\n\n${story.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${story.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Reader Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded uppercase tracking-wider">
            {story.genre}
          </span>
          <h2 className="font-bold text-slate-800 line-clamp-1">{story.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            title="Download as Text"
          >
            <i className="fa-solid fa-download"></i>
          </button>
          <button 
            onClick={handlePrint}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            title="Print / Save to PDF"
          >
            <i className="fa-solid fa-print"></i>
          </button>
        </div>
      </div>

      {/* Editor/Content Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 serif leading-relaxed text-lg bg-slate-50/30">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-slate-900 serif text-center">{story.title}</h1>
          <div className="prose prose-slate max-w-none">
            <textarea
              value={story.content}
              onChange={(e) => onUpdateContent(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[500px] font-inherit outline-none whitespace-pre-wrap"
              placeholder="The story unfolds here..."
            />
          </div>
        </div>
      </div>

      {/* Continuation UI */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={expandInput}
            onChange={(e) => setExpandInput(e.target.value)}
            placeholder="Tell AI how to continue... (e.g., 'A dragon appears', 'They reveal a secret')"
            className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            onKeyDown={(e) => e.key === 'Enter' && onExpand(expandInput)}
          />
          <button
            onClick={() => onExpand(expandInput)}
            disabled={isExpanding || !expandInput.trim()}
            className="px-6 py-2 bg-slate-800 hover:bg-black text-white rounded-lg font-bold text-sm transition-all disabled:bg-slate-300"
          >
            {isExpanding ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-wand-sparkles mr-2"></i>}
            Extend
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
