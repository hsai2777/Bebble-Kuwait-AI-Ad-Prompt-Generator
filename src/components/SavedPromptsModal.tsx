import React from 'react';
import { X, Trash2, Copy, ArrowUpRight, Calendar, Bookmark, Download } from 'lucide-react';
import { SavedPrompt, AdFormState } from '../types';

interface SavedPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPrompt[];
  onRestore: (config: AdFormState) => void;
  onDelete: (id: string) => void;
  onCopyPrompt: (text: string) => void;
}

export const SavedPromptsModal: React.FC<SavedPromptsModalProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onRestore,
  onDelete,
  onCopyPrompt
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-base">
              سجل البرومبتات المحفوظة ({savedPrompts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {savedPrompts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto mb-2 stroke-[1.5] text-slate-300" />
              <p className="text-sm font-bold text-slate-600">لا توجد برومبتات محفوظة بعد</p>
              <p className="text-xs text-slate-400 mt-1">
                اضغط على زر "حفظ بالسجل" عند توليد أي برومبت للرجوع إليه لاحقاً
              </p>
            </div>
          ) : (
            savedPrompts.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.createdAt}</span>
                      </span>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">
                        {item.config.campaign}
                      </span>
                      <span>•</span>
                      <span>{item.config.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onCopyPrompt(item.promptText)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="نسخ البرومبت"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onRestore(item.config);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="استعادة الإعدادات إلى النموذج"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="حذف من السجل"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-[11px] font-mono text-slate-600 line-clamp-2 text-left" dir="ltr">
                  {item.promptText.slice(0, 160)}...
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
