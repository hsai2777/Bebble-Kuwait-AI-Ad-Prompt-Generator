import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReferenceImageUploaderProps {
  imagePreview: string | null;
  imageName: string | null;
  onImageChange: (dataUrl: string | null, name: string | null) => void;
}

export const ReferenceImageUploader: React.FC<ReferenceImageUploaderProps> = ({
  imagePreview,
  imageName,
  onImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-800">
            صورة المنتج المرجعية الحقيقية (Reference Image)
          </span>
          <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
            موصى بها بشدة
          </span>
        </div>
        {imagePreview && (
          <button
            onClick={() => onImageChange(null, null)}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            حذف الصورة
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />

      {!imagePreview ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white/70 hover:bg-white rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">
              اضغط هنا لرفع صورة العبوة الأصلية، أو اسحب الصورة وأفلتها هنا
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              تدعم PNG, JPG, WebP — تضمن التوليد المطابق 100% للعبوة والشعار الأصلي
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-blue-200">
          <img
            src={imagePreview}
            alt="Reference Bebble"
            className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{imageName || 'bebble-product-ref.jpg'}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              تم تثبيت الصورة كمرجع بصري أساسي — سيتم توجيه الذكاء الاصطناعي للاعتماد عليها كلياً
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold shrink-0"
          >
            تغيير
          </button>
        </div>
      )}
    </div>
  );
};
