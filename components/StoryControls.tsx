
import React from 'react';
import { Genre, StoryLength, GeneratorOptions } from '../types';
import { GENRE_ICONS, TONES } from '../constants';

interface StoryControlsProps {
  options: GeneratorOptions;
  setOptions: React.Dispatch<React.SetStateAction<GeneratorOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const StoryControls: React.FC<StoryControlsProps> = ({ options, setOptions, onGenerate, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <i className="fa-solid fa-sliders text-indigo-600"></i>
        Configure Generator
      </h2>

      {/* Prompt Area */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Initial Prompt / Idea</label>
        <textarea
          value={options.prompt}
          onChange={(e) => setOptions({ ...options, prompt: e.target.value })}
          placeholder="e.g., A detective finds a watch that can stop time..."
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Genre</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Genre).map((g) => (
              <button
                key={g}
                onClick={() => setOptions({ ...options, genre: g })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  options.genre === g 
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {GENRE_ICONS[g]}
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tone & Length */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
            <select
              value={options.tone}
              onChange={(e) => setOptions({ ...options, tone: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Story Length</label>
            <div className="flex flex-col gap-2">
              {Object.values(StoryLength).map((l) => (
                <label key={l} className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-slate-50">
                  <input
                    type="radio"
                    name="length"
                    checked={options.length === l}
                    onChange={() => setOptions({ ...options, length: l })}
                    className="text-indigo-600"
                  />
                  {l}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Toggles */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-slate-50 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeTwist}
            onChange={(e) => setOptions({ ...options, includeTwist: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <span className="text-sm font-medium text-slate-700">Add Plot Twist</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.heavyDialogue}
            onChange={(e) => setOptions({ ...options, heavyDialogue: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <span className="text-sm font-medium text-slate-700">Focus on Dialogue</span>
        </label>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !options.prompt.trim()}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
          isLoading || !options.prompt.trim() 
          ? 'bg-slate-400 cursor-not-allowed' 
          : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
        }`}
      >
        {isLoading ? (
          <><i className="fa-solid fa-spinner fa-spin"></i> Weaving your story...</>
        ) : (
          <><i className="fa-solid fa-magic-wand-sparkles"></i> Generate Masterpiece</>
        )}
      </button>
    </div>
  );
};

export default StoryControls;
