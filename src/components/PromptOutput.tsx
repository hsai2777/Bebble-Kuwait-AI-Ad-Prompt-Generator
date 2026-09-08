import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Download,
  BookmarkPlus,
  Check,
  Volume2,
  ShieldAlert,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { AdFormState } from '../types';

interface PromptOutputProps {
  fullPrompt: string;
  positivePrompt: string;
  negativePrompt: string;
  voiceoverPrompt: string;
  formState: AdFormState;
  onCopy: (text: string, label: string) => void;
  onDownload: () => void;
  onSavePrompt: () => void;
}

type TabType = 'full' | 'positive' | 'negative' | 'voiceover';

export const PromptOutput: React.FC<PromptOutputProps> = ({
  fullPrompt,
  positivePrompt,
  negativePrompt,
  voiceoverPrompt,
  formState,
  onCopy,
  onDownload,
  onSavePrompt
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('full');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const getActiveText = () => {
    switch (activeTab) {
      case 'positive':
        return positivePrompt;
      case 'negative':
        return negativePrompt;
      case 'voiceover':
        return voiceoverPrompt;
      case 'full':
      default:
        return fullPrompt;
    }
  };

  const activeText = getActiveText();
  const wordCount = activeText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = activeText.length;

  const handleCopyCurrent = () => {
    const label =
      activeTab === 'full'
        ? 'البرومبت الكامل'
        : activeTab === 'positive'
        ? 'البرومبت الأساسي'
        : activeTab === 'negative'
        ? 'البرومبت السلبي'
        : 'نص وسيناريو التعليق الصوتي';

    onCopy(activeText, label);
    setCopiedTab(activeTab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">
            البرومبت النهائي المولد / Final AI Ad Prompt
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'full'
                ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>البرومبت الشامل</span>
          </button>

          <button
            onClick={() => setActiveTab('positive')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'positive'
                ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>الإيجابي فقط</span>
          </button>

          <button
            onClick={() => setActiveTab('negative')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'negative'
                ? 'bg-white text-rose-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>السلبي (Negative)</span>
          </button>

          <button
            onClick={() => setActiveTab('voiceover')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'voiceover'
                ? 'bg-white text-violet-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>التعليق الصوتي</span>
          </button>
        </div>
      </div>

      {/* Metrics and Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 border border-slate-200/70 px-4 py-2.5 rounded-xl mb-4 text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <span className="text-slate-400">عدد الكلمات: </span>
            <span className="font-mono font-bold text-slate-800">{wordCount}</span>
          </div>
          <div>
            <span className="text-slate-400">عدد الأحرف: </span>
            <span className="font-mono font-bold text-slate-800">{charCount}</span>
          </div>
          <div>
            <span className="text-slate-400">المقاس: </span>
            <span className="font-mono font-bold text-blue-600">{formState.format.split('—')[0].trim()}</span>
          </div>
          <div>
            <span className="text-slate-400">المدة: </span>
            <span className="font-bold text-slate-800">{formState.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSavePrompt}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            title="حفظ في سجل البرومبتات"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-amber-500" />
            <span>حفظ بالسجل</span>
          </button>

          <button
            onClick={handleCopyCurrent}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center gap-1.5 shadow-2xs shadow-blue-500/20"
          >
            {copiedTab === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ هذا التبويب</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Textarea View */}
      <div className="relative">
        <textarea
          id="output"
          value={activeText}
          readOnly
          spellCheck="false"
          rows={18}
          dir="ltr"
          className="w-full font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 bg-[#fafbfc] border border-slate-200 focus:border-blue-400 rounded-xl p-4 transition-all outline-none resize-y selection:bg-blue-100 selection:text-blue-900"
        />
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-xs text-slate-500">
        <div>
          <span>جاهز للاستخدام المباشر في: </span>
          <span className="font-bold text-slate-700">Midjourney v6, Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, Sora, Flux Pro</span>
        </div>
        <button
          onClick={onDownload}
          className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تنزيل كملف نصي (.txt)</span>
        </button>
      </div>
    </div>
  );
};
