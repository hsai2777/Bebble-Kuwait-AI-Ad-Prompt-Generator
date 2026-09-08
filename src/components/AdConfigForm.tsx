import React from 'react';
import {
  Settings,
  Sparkles,
  Copy,
  Download,
  RotateCcw,
  Lightbulb,
  Tag,
  Palette,
  Camera,
  Sun,
  Clock,
  Layout,
  Type,
  Send,
  FileText
} from 'lucide-react';
import { AdFormState } from '../types';
import { BEBBLE_PRODUCTS } from '../data/products';
import { ReferenceImageUploader } from './ReferenceImageUploader';

interface AdConfigFormProps {
  formState: AdFormState;
  onChange: <K extends keyof AdFormState>(key: K, value: AdFormState[K]) => void;
  onGenerate: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export const AdConfigForm: React.FC<AdConfigFormProps> = ({
  formState,
  onChange,
  onGenerate,
  onCopy,
  onDownload,
  onReset
}) => {
  const selectedProduct = BEBBLE_PRODUCTS.find((p) => p.value === formState.product) || BEBBLE_PRODUCTS[0];

  const handleProductSelect = (val: string) => {
    onChange('product', val);
    const prod = BEBBLE_PRODUCTS.find((p) => p.value === val);
    if (prod && prod.id !== 'auto') {
      if (!formState.headline) {
        onChange('headline', prod.suggestedHeadline);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">إعدادات الحملة والمنتج (Campaign & Product)</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          التحديث فوري وتلقائي عند أي تغيير
        </span>
      </div>

      {/* Reference Image Uploader */}
      <ReferenceImageUploader
        imagePreview={formState.referenceImage}
        imageName={formState.referenceImageName}
        onImageChange={(dataUrl, name) => {
          onChange('referenceImage', dataUrl);
          onChange('referenceImageName', name);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Product Selection */}
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <label htmlFor="product" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>المنتج / Product</span>
            </span>
            {selectedProduct && selectedProduct.id !== 'auto' && (
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <span>نوع العبوة:</span>
                <span className="text-blue-600 font-semibold">{selectedProduct.bottleColor}</span>
              </span>
            )}
          </label>
          <select
            id="product"
            value={formState.product}
            onChange={(e) => handleProductSelect(e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            {BEBBLE_PRODUCTS.map((prod) => (
              <option key={prod.id} value={prod.value}>
                {prod.nameAr}
              </option>
            ))}
          </select>
        </div>

        {/* Campaign Type */}
        <div className="flex flex-col">
          <label htmlFor="campaign" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-blue-600" />
            <span>نوع الإعلان / Campaign Type</span>
          </label>
          <select
            id="campaign"
            value={formState.campaign}
            onChange={(e) => onChange('campaign', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="Single Product">منتج واحد — Single Product</option>
            <option value="Product Bundle">باقة منتجات — Product Bundle</option>
            <option value="Full Collection">المجموعة الكاملة — Full Collection</option>
            <option value="New Product">منتج جديد — New Product</option>
            <option value="Promotional Offer">عرض ترويجي — Promotional Offer</option>
            <option value="Brand Awareness">وعي بالعلامة التجارية — Brand Awareness</option>
            <option value="Seasonal Campaign">حملة موسمية — Seasonal Campaign</option>
            <option value="E-commerce Advertisement">إعلان متجر إلكتروني — E-commerce</option>
          </select>
        </div>

        {/* Visual Style */}
        <div className="flex flex-col">
          <label htmlFor="style" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            <span>الستايل البصري / Visual Style</span>
          </label>
          <select
            id="style"
            value={formState.style}
            onChange={(e) => onChange('style', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="AUTO">تلقائي — AUTO</option>
            <option value="Luxury Premium">فاخر راقٍ — Luxury Premium</option>
            <option value="Soft Baby">ناعم وطفولي — Soft Baby</option>
            <option value="Natural Botanical">طبيعي ونباتي — Natural Botanical</option>
            <option value="Clean & Minimal">نظيف ومينيمال — Clean & Minimal</option>
            <option value="Cinematic">سينمائي — Cinematic</option>
            <option value="Playful & Colorful">مرح وملون — Playful & Colorful</option>
            <option value="Elegant European">أناقة أوروبية — Elegant European</option>
            <option value="E-commerce Studio">استوديو متجر إلكتروني — E-commerce Studio</option>
          </select>
        </div>

        {/* Environment */}
        <div className="flex flex-col">
          <label htmlFor="environment" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>البيئة والمحيط / Environment</span>
          </label>
          <select
            id="environment"
            value={formState.environment}
            onChange={(e) => onChange('environment', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="AUTO">تلقائي — AUTO</option>
            <option value="Luxury Baby Bathroom">حمام أطفال فاخر — Luxury Baby Bathroom</option>
            <option value="Baby Bedroom">غرفة أطفال — Baby Bedroom</option>
            <option value="Natural Botanical">طبيعة ونباتات — Natural Botanical</option>
            <option value="Clean White Studio">استوديو أبيض نظيف — Clean White Studio</option>
            <option value="Baby Laundry Room">غرفة غسيل أطفال — Baby Laundry Room</option>
            <option value="Soft Cloud Environment">سحب ناعمة — Soft Cloud Environment</option>
            <option value="Lifestyle Baby Environment">بيئة يومية للطفل — Lifestyle Baby</option>
            <option value="Product Studio">استوديو منتجات — Product Studio</option>
          </select>
        </div>

        {/* Camera Movement */}
        <div className="flex flex-col">
          <label htmlFor="camera" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>حركة الكاميرا / Camera</span>
          </label>
          <select
            id="camera"
            value={formState.camera}
            onChange={(e) => onChange('camera', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="AUTO">تلقائي — AUTO</option>
            <option value="Slow Push-In">اقتراب بطيء — Slow Push-In</option>
            <option value="Slow Pull-Back">ابتعاد بطيء — Slow Pull-Back</option>
            <option value="Cinematic Orbit">دوران سينمائي 360° — Cinematic Orbit</option>
            <option value="Lateral Slide">انزلاق جانبي — Lateral Slide</option>
            <option value="Macro → Wide Reveal">ماكرو إلى لقطة واسعة — Macro → Wide</option>
            <option value="Top-Down → Hero Shot">من أعلى إلى Hero Shot — Top-Down</option>
            <option value="Focus Pull">انتقال التركيز — Focus Pull</option>
          </select>
        </div>

        {/* Lighting */}
        <div className="flex flex-col">
          <label htmlFor="lighting" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-blue-600" />
            <span>الإضاءة / Lighting</span>
          </label>
          <select
            id="lighting"
            value={formState.lighting}
            onChange={(e) => onChange('lighting', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="AUTO">تلقائي — AUTO</option>
            <option value="Soft Morning Light">ضوء صباحي ناعم — Soft Morning</option>
            <option value="Luxury Studio Light">إضاءة استوديو فاخرة — Luxury Studio</option>
            <option value="Warm Golden Light">ضوء ذهبي دافئ — Warm Golden</option>
            <option value="Clean High-Key Light">إضاءة بيضاء مشرقة — High-Key</option>
            <option value="Natural Window Light">ضوء نافذة طبيعي — Window Light</option>
            <option value="Cinematic Volumetric Light">ضوء سينمائي حجمي — Volumetric</option>
          </select>
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>مدة الفيديو / Duration</span>
          </label>
          <select
            id="duration"
            value={formState.duration}
            onChange={(e) => onChange('duration', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="5 seconds">5 ثوانٍ — 5s (مختصر جداً: 8-12 كلمة)</option>
            <option value="6 seconds">6 ثوانٍ — 6s (12-16 كلمة)</option>
            <option value="8 seconds">8 ثوانٍ — 8s (مثالي لريلز: 16-22 كلمة)</option>
            <option value="10 seconds">10 ثوانٍ — 10s (22-28 كلمة)</option>
            <option value="15 seconds">15 ثانية — 15s (32-42 كلمة)</option>
            <option value="30 seconds">30 ثانية — 30s (إعلان كامل: 65-80 كلمة)</option>
          </select>
        </div>

        {/* Format */}
        <div className="flex flex-col">
          <label htmlFor="format" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-blue-600" />
            <span>مقاس الإعلان / Format</span>
          </label>
          <select
            id="format"
            value={formState.format}
            onChange={(e) => onChange('format', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="9:16 — 1080x1920">عمودي — 9:16 — 1080×1920 (Reels / TikTok / Shorts)</option>
            <option value="4:5 — 1080x1350">منشور رأسي — 4:5 — 1080×1350 (Instagram Feed)</option>
            <option value="1:1 — 1080x1080">مربع — 1:1 — 1080×1080 (Square Ad)</option>
            <option value="16:9 — 1920x1080">أفقي — 16:9 — 1920×1080 (Landscape / YouTube / TV)</option>
          </select>
        </div>

        {/* Promotion Type */}
        <div className="flex flex-col">
          <label htmlFor="promotion" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>نوع العرض / Promotion</span>
          </label>
          <select
            id="promotion"
            value={formState.promotion}
            onChange={(e) => onChange('promotion', e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          >
            <option value="No Promotion">بدون عرض — No Promotion</option>
            <option value="Discount">خصم — Discount</option>
            <option value="Special Offer">عرض خاص — Special Offer</option>
            <option value="Bundle Offer">عرض باقة — Bundle Offer</option>
            <option value="New Arrival">وصل حديثًا — New Arrival</option>
            <option value="Shop Now">تسوق الآن — Shop Now</option>
          </select>
        </div>

        {/* Offer Value */}
        <div className="flex flex-col">
          <label htmlFor="offer" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <span>قيمة الخصم أو العرض / Offer Value</span>
          </label>
          <input
            id="offer"
            type="text"
            value={formState.offer}
            onChange={(e) => onChange('offer', e.target.value)}
            placeholder="مثال: خصم 20% أو اشتري 2 واحصل على 1"
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          />
        </div>

        {/* Headline */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="headline" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-blue-600" />
            <span>العنوان الظاهر / Main Headline (Arabic)</span>
          </label>
          <input
            id="headline"
            type="text"
            value={formState.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            placeholder="مثال: رعاية لطيفة… حب لا ينتهي لملاكك الصغير"
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          />
        </div>

        {/* Call to action */}
        <div className="flex flex-col">
          <label htmlFor="cta" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-blue-600" />
            <span>زر الدعوة للإجراء / Call To Action (CTA)</span>
          </label>
          <input
            id="cta"
            type="text"
            value={formState.cta}
            onChange={(e) => onChange('cta', e.target.value)}
            placeholder="اطلبي الآن"
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          />
        </div>

        {/* Extra Notes */}
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <label htmlFor="notes" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>ملاحظات إضافية وتوجيهات خاصة / Extra Notes</span>
          </label>
          <input
            id="notes"
            type="text"
            value={formState.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="مثال: أجواء صيفية هادئة، قطرات ماء رقيقة ورغوة، مساحة مريحة للنصوص في الأعلى"
            className="w-full bg-slate-50/70 border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white rounded-xl p-3 text-sm font-medium text-slate-800 transition-all outline-none focus:ring-3 focus:ring-blue-500/15"
          />
        </div>
      </div>

      {/* Instructional Note */}
      <div className="bg-amber-50/80 border-r-4 border-amber-500 p-4 rounded-xl mt-6 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-extrabold text-amber-950">نصيحة ذهبية للحملات الإعلانية:</strong>{' '}
          ارفع صورة عبوة Bebble الأصلية كـ (Image Prompt / Reference) في Midjourney (باستخدام معامل <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">--iw 2</code>) أو Runway Gen-3 لضمان التطابق التام مع تفاصيل العبوة الحقيقية وشعار بيبل.
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-100">
        <button
          onClick={onGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>توليد وتحديث البرومبت</span>
        </button>

        <button
          onClick={onCopy}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm px-5 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          <span>نسخ البرومبت الكامل</span>
        </button>

        <button
          onClick={onDownload}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>تحميل ملف TXT</span>
        </button>

        <button
          onClick={onReset}
          className="bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200 font-bold text-sm px-4 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 mr-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة ضبط</span>
        </button>
      </div>
    </div>
  );
};
