import React from 'react';
import { Lock, Camera, Mic, Film, Sparkles, HelpCircle } from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presets';
import { AdFormState } from '../types';

interface HeaderProps {
  onSelectPreset: (presetConfig: Partial<AdFormState>) => void;
  onOpenHistory: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onOpenHistory,
  savedCount
}) => {
  return (
    <header className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-lg shadow-sm shadow-blue-500/20">
              B
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
                BEBBLE KUWAIT — AI AD PROMPT GENERATOR
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-500">
                مولّد البرومبت الاحترافي لإعلانات الفيديو والصور لمنتجات بيبل الكويت
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onOpenHistory}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            title="سجل البرومبتات المحفوظة"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>السجل المحفوظ</span>
            {savedCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-4 leading-relaxed max-w-4xl">
        أداة ذكية متخصصة لفرق التسويق وصنّاع الإعلانات، مصممة لبناء وتوليد برومبتات احترافية متوافقة مع أدوات الذكاء الاصطناعي (مثل Midjourney و Runway و Kling و Sora و Flux)، مع التزام صارم بالهوية البصرية والعبوة الأصلية وقفل العلامة التجارية، بالإضافة إلى نصوص التعليق الصوتي باللهجة الكويتية/الخليجية.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          <span>قفل المنتج والهوية البصرية</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <Camera className="w-3.5 h-3.5 text-emerald-600" />
          <span>أولوية الصورة المرجعية</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200/60">
          <Mic className="w-3.5 h-3.5 text-violet-600" />
          <span>تعليق صوتي خليجي متناسق</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
          <Film className="w-3.5 h-3.5 text-amber-600" />
          <span>جودة تصوير إعلاني 4K</span>
        </span>
      </div>

      {/* Quick Preset Pills */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1">
          <span>قوالب سريعة جاهزة للحملات (Quick Presets):</span>
          <span className="text-[11px] text-slate-400 font-normal">اضغط لتطبيق الإعدادات فوراً</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.config)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-700 transition-all flex items-center gap-1.5 group"
            >
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
