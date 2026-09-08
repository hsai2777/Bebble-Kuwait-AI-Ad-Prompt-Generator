import { PresetTemplate } from '../types';

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'reels-viral',
    title: '📱 ريلز وتيك توك عمودي سريع (8 ثوانٍ)',
    description: 'مقاس 9:16 مع اقتراب بطيء وإضاءة صباحية دافئة مثالية للسوشيال ميديا',
    icon: 'Sparkles',
    config: {
      format: '9:16 — 1080x1920',
      duration: '8 seconds',
      camera: 'Slow Push-In',
      lighting: 'Soft Morning Light',
      style: 'Soft Baby',
      campaign: 'Single Product',
      cta: 'اطلبي الآن عبر الرابط',
    }
  },
  {
    id: 'luxury-cinematic',
    title: '🎬 إعلان سينمائي فاخر للأمهات (15 ثانية)',
    description: 'دوران سينمائي 360 وإضاءة استوديو أوروبية فاخرة تعكس الجودة العالية',
    icon: 'Film',
    config: {
      style: 'Luxury Premium',
      environment: 'Luxury Baby Bathroom',
      camera: 'Cinematic Orbit',
      lighting: 'Luxury Studio Light',
      duration: '15 seconds',
      format: '9:16 — 1080x1920',
      campaign: 'Brand Awareness',
      headline: 'رعاية لطيفة تفهم نقاء طفلك',
      cta: 'اكتشفي المجموعة الكاملة'
    }
  },
  {
    id: 'promo-discount',
    title: '🏷️ حملة خصم وعرض خاص (20%)',
    description: 'إعلان ترويجي مركز على العرض والزر التفاعلي مع لقطة Hero Shot',
    icon: 'Tag',
    config: {
      campaign: 'Promotional Offer',
      promotion: 'Discount',
      offer: 'خصم 20% لفترة محدودة',
      camera: 'Top-Down → Hero Shot',
      lighting: 'Clean High-Key Light',
      duration: '10 seconds',
      format: '9:16 — 1080x1920',
      headline: 'وفري أكثر واهتمي بنعومة ملاكك الصغير',
      cta: 'استفيدي من العرض الآن'
    }
  },
  {
    id: 'kids-fun',
    title: '🍉 مجموعة My Friend للأطفال والمرح',
    description: 'أجواء منعشة مرحة وملونة مع فقاعات ماء وانتعاش الفواكه',
    icon: 'Smile',
    config: {
      product: 'Bebble My Friend Watermelon Shampoo & Shower Gel — original green bottle',
      style: 'Playful & Colorful',
      environment: 'Luxury Baby Bathroom',
      camera: 'Lateral Slide',
      lighting: 'Clean High-Key Light',
      duration: '8 seconds',
      format: '9:16 — 1080x1920',
      campaign: 'New Product',
      headline: 'وقت الاستحمام أصبح لعب ومرح وانتعاش فواكه!',
      cta: 'اطلبي الآن مع توصيل سريع'
    }
  },
  {
    id: 'clean-laundry',
    title: '🧺 عناية الملابس وغسيل الرضّاعات',
    description: 'أقمشة بيضاء قطنية فائقة النعومة مع قطرات ماء نقية ونظافة فائقة',
    icon: 'Shirt',
    config: {
      product: 'Bebble Liquid Laundry Detergent — original pink bottle',
      style: 'Clean & Minimal',
      environment: 'Baby Laundry Room',
      camera: 'Macro → Wide Reveal',
      lighting: 'Natural Window Light',
      duration: '10 seconds',
      format: '9:16 — 1080x1920',
      campaign: 'Single Product',
      headline: 'نظافة ناعمة تحمي بشرة طفلك الحساسة',
      cta: 'اطلبي لغسيل ألطف'
    }
  }
];
