import { AdFormState } from '../types';

export const STRICT_NEGATIVE_PROMPT = `STRICT NEGATIVE PROMPT:
Do not change the Bebble logo.
Do not change the Bebble brand name.
Do not change product packaging.
Do not redesign or reinterpret the packaging.
Do not change bottle shapes, tube shapes or box shapes.
Do not change product colors.
Do not change caps, pumps, lids or closures.
Do not change product dimensions or proportions.
Do not change label layout or label artwork.
Do not generate fake labels.
Do not generate incorrect text.
Do not generate extra products.
Do not duplicate products.
Do not add products not visible in the uploaded reference.
No distorted bottles.
No warped packaging.
No melted products.
No stretched or compressed products.
No incorrect Bebble logo.
No misspelled brand name.
No deformed caps or pumps.
No unrealistic product proportions.
No altered product geometry.
No modified packaging colors.
No incorrect product variants.
No generic baby-care bottles.
No fictional Bebble products.
No fake ingredients or graphics.
No cartoon products.
No cheap animation.
No CGI-looking packaging.
No excessive reflections hiding product details.
No excessive motion blur.
No object morphing.
No product morphing.
No product transformation.
No disappearing or unexpectedly appearing products.
No cluttered composition.
No chaotic arrangement.
No unnecessary props.
No hands or objects blocking product labels.
No extreme lens distortion.
No fisheye distortion.
No unrealistic perspective.
No cheap stock-photo aesthetic.
No generic AI aesthetic.`;

export function getVoiceoverGuidance(duration: string): { guide: string; sampleScript: string; wordRange: string } {
  switch (duration) {
    case '5 seconds':
      return {
        wordRange: '8–12 كلمة عربية',
        guide: 'Write a very short Gulf-Arabic voiceover of about 8–12 Arabic words.',
        sampleScript: 'لحظات ناعمة مع بيبل الكويت… عناية نقية تحمي طفلك بحب.'
      };
    case '6 seconds':
      return {
        wordRange: '12–16 كلمة عربية',
        guide: 'Write a concise Gulf-Arabic voiceover of about 12–16 Arabic words.',
        sampleScript: 'بشرة طفلك تستاهل الأرق… مع بيبل، كل لمسة حب وأمان يدوم طول اليوم.'
      };
    case '8 seconds':
      return {
        wordRange: '16–22 كلمة عربية',
        guide: 'Write a concise Gulf-Arabic voiceover of about 16–22 Arabic words.',
        sampleScript: 'لأن نقاء طفلك هو كل اهتمامك، اختاري العناية الأوروبية اللطيفة من بيبل. نعومة، أمان، وراحة تامة.'
      };
    case '10 seconds':
      return {
        wordRange: '22–28 كلمة عربية',
        guide: 'Write a Gulf-Arabic voiceover of about 22–28 Arabic words.',
        sampleScript: 'كل يوم يبدأ بلمسة حب وعناية لطيفة مع بيبل. تركيبة مخصصة لبشرة طفلك الحساسة، تمنحه النعومة والحماية بكل ثقة وأمان.'
      };
    case '15 seconds':
      return {
        wordRange: '32–42 كلمة عربية',
        guide: 'Write a Gulf-Arabic voiceover of about 32–42 Arabic words.',
        sampleScript: 'من أول يوم، ملاكك الصغير يحتاج عناية تفهم رقة بشرته. منتجات بيبل المصنوعة بأعلى المعايير الأوروبية توفر الترطيب والنقاء الطبيعي ليبقى طفلك سعيداً ومحمياً دائماً. اطلبي مجموعتك اليوم.'
      };
    case '30 seconds':
    default:
      return {
        wordRange: '65–80 كلمة عربية',
        guide: 'Write a polished Gulf-Arabic voiceover paced naturally across 30 seconds, about 65–80 Arabic words.',
        sampleScript: 'في كل لحظة، وكل ابتسامة، وكل ضحكة… طفلك يعيش عالمه النقي. ومع بيبل الكويت، نرافقك في أجمل رحلة أمومة. تركيبتنا المبتكرة من خلاصة الطبيعة والزيوت اللطيفة تحافظ على نعومة بشرة رضيعك وتحميه من الجفاف، بدون دموع وبأعلى درجات الأمان. بيبل… لأن حب الأم يستحق الأفضل دائماً. اطلبي الآن من صيدليات ومتاجر الكويت.'
      };
  }
}

export function generateAdPrompt(state: AdFormState): {
  fullPrompt: string;
  positivePrompt: string;
  negativePrompt: string;
  voiceoverPrompt: string;
} {
  const {
    product,
    campaign,
    style,
    environment,
    camera,
    lighting,
    duration,
    format,
    promotion,
    offer,
    headline,
    cta,
    notes,
    referenceImage
  } = state;

  const envAuto = `If ENVIRONMENT is AUTO, choose the most suitable environment from the product category:
Shampoo/Shower Gel → premium baby bathroom, water and delicate foam.
Body Cream/Body Milk → soft skincare environment with botanical accents.
Laundry Detergent → fresh white baby fabrics and premium laundry setting.
Bottle/Toy/Dish Wash → clean water, baby bottle, toys and children's accessories.
Cream Soap → elegant bathroom, soft foam and subtle botanical details.`;

  const camAuto = `If CAMERA is AUTO, choose the most flattering professional movement:
slow push-in, controlled lateral slide, cinematic orbit, macro-to-wide reveal,
focus pull, or top-down-to-hero shot. Camera moves around the product, never through it.`;

  const styleAuto = `If STYLE is AUTO, select the style that best matches the product:
Luxury Premium, Soft Baby, Natural Botanical, Clean & Minimal,
Cinematic, Playful & Colorful, or Elegant European.`;

  const voData = getVoiceoverGuidance(duration);

  const referenceImageClause = referenceImage
    ? `REFERENCE IMAGE STATUS: [ATTACHED - Reference image loaded into memory]
The uploaded Bebble product image is the ABSOLUTE SOURCE OF TRUTH.
Analyze it first and reproduce the selected product packaging, colors, and typography exactly.`
    : `REFERENCE IMAGE:
The uploaded Bebble product image is the ABSOLUTE SOURCE OF TRUTH.
Analyze it first and reproduce the selected product exactly.`;

  const positivePrompt = `BEBBLE KUWAIT — FINAL AI AD PROMPT

ROLE:
Act as a world-class commercial advertising director, luxury product photographer,
cinematographer, art director and social media creative director.

REFERENCE IMAGE:
${referenceImageClause}

PRODUCT:
${product}

CAMPAIGN TYPE:
${campaign}

VISUAL STYLE:
${style}
${styleAuto}

ENVIRONMENT:
${environment}
${envAuto}

CAMERA:
${camera}
${camAuto}

LIGHTING:
${lighting}
If AUTO, choose professional lighting appropriate to the product and environment:
soft morning light, luxury studio light, warm golden light, clean high-key light,
natural window light or cinematic volumetric light.

DURATION:
${duration}

FORMAT:
${format}

PROMOTION:
${promotion}${offer ? ` — Offer: ${offer}` : ''}

CREATIVE DIRECTION:
Create a premium, photorealistic Bebble Kuwait advertisement.
The selected product is ALWAYS the visual HERO.
Build the environment around the original product.
Use elegant pastel colors inspired by the actual packaging:
baby blue, soft pink, mint green, gentle yellow, lavender, cream and clean white.
Use sophisticated composition, realistic contact shadows, controlled reflections,
premium depth of field and international commercial quality.

PRODUCT LOCK:
Preserve EXACTLY:
product identity, packaging, bottle/tube/box shape, dimensions, proportions,
colors, cap, pump, lid, label, label artwork, Bebble logo, brand name,
typography, illustrations, icons, graphics and product geometry.

The product itself MUST NEVER be redesigned, regenerated, reinterpreted or replaced.
Only the environment, lighting, camera, atmosphere and supporting props may change.

VIDEO MOTION:
If video, keep the product geometrically stable across every frame.
Only camera, background atmosphere, water, foam, fabric, leaves and subtle light
effects may move.
No product morphing, deformation or unrealistic motion.

TEXT:
Do NOT generate Arabic typography inside the product image/video.
Leave clean negative space for post-production graphics.

Generate:
HEADLINE: ${headline || '[Create a short Arabic headline appropriate to the product]'}
SUBHEAD: [Optional]
CTA: ${cta || 'اطلبي الآن'}
WEBSITE: bebble-kuwait.com

VOICEOVER:
${voData.guide}
SUGGESTED GULF SCRIPT: "${voData.sampleScript}"

VOICE STYLE:
Warm female Gulf-Arabic voice, elegant, natural, motherly and premium.

MUSIC & SOUND:
Soft premium baby-care music with gentle piano, subtle bells and ambient textures.
Use restrained water/fabric/chime sound design when relevant.
No childish cartoon music.

ADDITIONAL NOTES:
${notes || '[No additional notes]'}

FINAL CREATIVE REQUIREMENT:
The result must look like a professionally produced international baby-care
commercial, not an AI-generated advertisement.

ALWAYS PRIORITIZE THE UPLOADED REFERENCE IMAGE FOR PRODUCT ACCURACY.
PRODUCT ACCURACY HAS HIGHER PRIORITY THAN CREATIVE EFFECTS.`;

  const fullPrompt = `${positivePrompt}\n\n${STRICT_NEGATIVE_PROMPT}`;

  const voiceoverPrompt = `GULF-ARABIC VOICEOVER & AUDIO SPECIFICATION:
Target Duration: ${duration}
Recommended Word Count: ${voData.wordRange}
Voice Persona: Warm female Gulf-Arabic voice (اللهجة الخليجية الكويتية المحببة والأنيقة), motherly, premium, trustworthy.
Audio Ambience: Gentle acoustic piano notes, subtle water drops / foam texture, warm room reverberation.

Sample Script:
"${voData.sampleScript}"

CTA:
"${cta || 'اطلبي الآن'}" - Bebble Kuwait`;

  return {
    fullPrompt,
    positivePrompt,
    negativePrompt: STRICT_NEGATIVE_PROMPT,
    voiceoverPrompt
  };
}
