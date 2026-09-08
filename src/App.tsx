import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { AdConfigForm } from './components/AdConfigForm';
import { PromptOutput } from './components/PromptOutput';
import { SavedPromptsModal } from './components/SavedPromptsModal';
import { Toast } from './components/Toast';
import { AdFormState, SavedPrompt } from './types';
import { generateAdPrompt } from './utils/promptGenerator';
import { BEBBLE_PRODUCTS } from './data/products';

const INITIAL_FORM_STATE: AdFormState = {
  product: 'AUTO — analyze the uploaded reference image',
  campaign: 'Single Product',
  style: 'AUTO',
  environment: 'AUTO',
  camera: 'AUTO',
  lighting: 'AUTO',
  duration: '8 seconds',
  format: '9:16 — 1080x1920',
  promotion: 'No Promotion',
  offer: '',
  headline: '',
  cta: 'اطلبي الآن',
  notes: '',
  referenceImage: null,
  referenceImageName: null,
};

const STORAGE_KEY = 'bebble_saved_prompts_v1';

export default function App() {
  const [formState, setFormState] = useState<AdFormState>(INITIAL_FORM_STATE);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when savedPrompts change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrompts));
    } catch {
      // ignore
    }
  }, [savedPrompts]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const handleFieldChange = useCallback(
    <K extends keyof AdFormState>(key: K, value: AdFormState[K]) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Compute generated prompts on every state change
  const { fullPrompt, positivePrompt, negativePrompt, voiceoverPrompt } = useMemo(() => {
    return generateAdPrompt(formState);
  }, [formState]);

  const handleCopy = useCallback(
    (textToCopy?: string, label?: string) => {
      const text = textToCopy || fullPrompt;
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            showToast(`تم نسخ ${label || 'البرومبت'} بنجاح إلى الحافظة! 📋`);
          })
          .catch(() => {
            showToast('تعذر النسخ التلقائي، يمكنك نسخه يدوياً', 'error');
          });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showToast(`تم نسخ ${label || 'البرومبت'} بنجاح إلى الحافظة! 📋`);
        } catch {
          showToast('يرجى نسخ النص يدوياً', 'error');
        }
        document.body.removeChild(textArea);
      }
    },
    [fullPrompt, showToast]
  );

  const handleDownload = useCallback(() => {
    if (!fullPrompt) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    const fileName = `Bebble_AI_Ad_Prompt_${timestamp}.txt`;

    const blob = new Blob([fullPrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`تم تنزيل الملف بنجاح: ${fileName} 💾`);
  }, [fullPrompt, showToast]);

  const handleReset = useCallback(() => {
    setFormState(INITIAL_FORM_STATE);
    showToast('تمت إعادة ضبط جميع الخيارات إلى الوضع الافتراضي 🔄', 'info');
  }, [showToast]);

  const handleSelectPreset = useCallback(
    (presetConfig: Partial<AdFormState>) => {
      setFormState((prev) => ({
        ...prev,
        ...presetConfig,
      }));
      showToast('تم تطبيق القالب الإعلاني الجاهز بنجاح ✨');
    },
    [showToast]
  );

  const handleSavePrompt = useCallback(() => {
    const productObj = BEBBLE_PRODUCTS.find((p) => p.value === formState.product);
    const title =
      formState.headline ||
      (productObj ? productObj.nameAr : 'إعلان بيبل الكويت') + ` (${formState.campaign})`;

    const newSaved: SavedPrompt = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toLocaleDateString('ar-KW', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      promptText: fullPrompt,
      config: { ...formState },
    };

    setSavedPrompts((prev) => [newSaved, ...prev]);
    showToast('تم حفظ البرومبت في سجلك المحلي بنجاح 📌');
  }, [formState, fullPrompt, showToast]);

  const handleDeleteSaved = useCallback((id: string) => {
    setSavedPrompts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleRestoreSaved = useCallback(
    (config: AdFormState) => {
      setFormState(config);
      showToast('تمت استعادة إعدادات البرومبت إلى النموذج ⚡');
    },
    [showToast]
  );

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#1e293b] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header
          onSelectPreset={handleSelectPreset}
          onOpenHistory={() => setIsHistoryOpen(true)}
          savedCount={savedPrompts.length}
        />

        <AdConfigForm
          formState={formState}
          onChange={handleFieldChange}
          onGenerate={() => showToast('تم تحديث البرومبت بأحدث الإعدادات ⚡')}
          onCopy={() => handleCopy()}
          onDownload={handleDownload}
          onReset={handleReset}
        />

        <PromptOutput
          fullPrompt={fullPrompt}
          positivePrompt={positivePrompt}
          negativePrompt={negativePrompt}
          voiceoverPrompt={voiceoverPrompt}
          formState={formState}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onSavePrompt={handleSavePrompt}
        />
      </div>

      <SavedPromptsModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedPrompts={savedPrompts}
        onRestore={handleRestoreSaved}
        onDelete={handleDeleteSaved}
        onCopyPrompt={(text) => handleCopy(text, 'البرومبت')}
      />

      <Toast message={toast?.message || null} type={toast?.type} />
    </div>
  );
}
