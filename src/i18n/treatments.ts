import type { Lang } from './index';

export interface Faq { q: string; a: string }
export interface TreatmentCopy {
  intro: string;
  suits: string[];
  how: string;
  sessions: string;
  downtime: string;
  results: string;
  avoid: string[];
  prep?: string[];
  aftercare: string[];
  faqs: Faq[];
}
export interface Treatment {
  slug: string;
  /** value of the booking form select */
  book: string;
  /** i18n key prefix used by the home page cards (title / text / time) */
  key: string;
  image: string;
  copy: Record<Lang, TreatmentCopy>;
}

// DRAFT: general information only. Deena should review every statement (sessions, downtime,
// who should avoid, aftercare) so it matches what she actually does in the clinic.
export const treatments: Treatment[] = [
  {
    slug: 'signature-facial', book: 'facial', key: 't1', image: 'signature-facial',
    copy: {
      en: {
        intro: 'A deep-cleansing facial tailored to your skin type. It leaves skin clean, hydrated and comfortable, with no downtime.',
        suits: ['Dull, congested or dehydrated skin.', 'Anyone who wants a calm reset before an event.', 'A good first visit if you are not sure where to start.'],
        how: 'We cleanse, gently extract where needed and finish with hydration chosen for your skin type. A short skin assessment comes first.',
        sessions: 'One visit gives a visible refresh. Many clients return every few weeks as part of a routine. We advise on timing at your visit.',
        downtime: 'Usually none. Mild redness can appear for a short time after extraction.',
        results: 'Skin feels clearer and more comfortable straight away. Results depend on your skin and on home care.',
        avoid: ['Sunburn, open wounds or an active skin infection.', 'Use of strong acne medication. Tell us beforehand.'],
        aftercare: ['Cleanse gently and keep skin moisturised.', 'Use sunscreen every day.', 'Avoid scrubs and strong active ingredients for about 48 hours.', 'Do not pick at the skin.', 'Skip saunas and intense exercise for 24 hours.'],
        faqs: [
          { q: 'How long does a facial take?', a: 'About 60 minutes.' },
          { q: 'Can I wear makeup afterwards?', a: 'Light makeup is usually fine after a few hours. If your skin is red, give it a rest until it settles.' }
        ]
      },
      ar: {
        intro: 'فيشل لتنظيف البشرة بعمق مصمّم وفق نوع بشرتك. يمنح البشرة نقاءً وترطيباً وراحة، دون فترة نقاهة.',
        suits: ['البشرة الباهتة أو المسدودة أو الجافة.', 'من يرغب بإنعاش هادئ قبل مناسبة.', 'بداية مناسبة إن لم تكن متأكدة من أين تبدأين.'],
        how: 'ننظّف البشرة ونزيل الشوائب بلطف عند الحاجة ونختم بترطيب يناسب نوع بشرتك. يسبق ذلك تقييم سريع للبشرة.',
        sessions: 'تعطي الجلسة الواحدة انتعاشاً واضحاً. تعود كثيرات كل بضعة أسابيع كجزء من روتين العناية. ننصحك بالتوقيت المناسب خلال زيارتك.',
        downtime: 'عادة لا توجد. قد يظهر احمرار خفيف لفترة قصيرة بعد إزالة الشوائب.',
        results: 'تشعرين بصفاء وراحة أكبر مباشرة. تعتمد النتائج على بشرتك وعلى العناية المنزلية.',
        avoid: ['حروق الشمس أو الجروح المفتوحة أو الالتهاب الجلدي النشط.', 'استخدام أدوية حب الشباب القوية. أخبرينا مسبقاً.'],
        aftercare: ['نظّفي البشرة بلطف وحافظي على ترطيبها.', 'استعملي واقي الشمس يومياً.', 'تجنبي المقشرات والمواد الفعالة القوية نحو 48 ساعة.', 'لا تعبثي بالبشرة أو تقشريها.', 'تجنبي الساونا والتمارين الشاقة لمدة 24 ساعة.'],
        faqs: [
          { q: 'كم تستغرق جلسة الفيشل؟', a: 'نحو 60 دقيقة.' },
          { q: 'هل يمكنني وضع المكياج بعدها؟', a: 'عادة يمكن وضع مكياج خفيف بعد بضع ساعات. وإن كانت بشرتك محمرّة فأريحيها حتى تهدأ.' }
        ]
      }
    }
  },
  {
    slug: 'skin-rejuvenation', book: 'rejuvenation', key: 't2', image: 'skin-rejuvenation',
    copy: {
      en: {
        intro: 'Microneedling and skin boosters to improve texture, glow and firmness.',
        suits: ['Uneven texture, dullness or early fine lines.', 'Skin that has lost some firmness.', 'Clients who want gradual, natural-looking improvement.'],
        how: 'After a skin assessment we treat the area with microneedling and, where suitable, skin boosters. A numbing cream may be used for comfort.',
        sessions: 'Usually a course of several sessions spaced a few weeks apart. We agree the number with you at your consultation.',
        downtime: 'Redness and slight swelling for a day or two are common. Skin may feel dry or tight briefly.',
        results: 'Improvement builds gradually over the course. Results vary from person to person.',
        avoid: ['Pregnancy or breastfeeding.', 'Active acne flare-ups, infection or cold sores in the area.', 'Blood-thinning medication or recent isotretinoin. Tell us beforehand.', 'A tendency to keloid scarring.'],
        aftercare: ['Avoid makeup for the first 24 hours.', 'Use gentle products and a daily sunscreen.', 'Avoid direct sun, saunas and intense exercise for a few days.', 'Pause exfoliants and retinoids until your skin settles.'],
        faqs: [
          { q: 'Does it hurt?', a: 'Most clients feel mild pressure or tingling. We adjust for your comfort and explain what to expect first.' },
          { q: 'When will I see a difference?', a: 'Some glow can appear within days. Texture and firmness improve gradually over the course.' }
        ]
      },
      ar: {
        intro: 'علاج بالإبر الدقيقة ومحفّزات البشرة لتحسين الملمس والإشراقة والشدّ.',
        suits: ['الملمس غير المتجانس أو بهتان البشرة أو الخطوط الدقيقة المبكرة.', 'البشرة التي فقدت بعض الشدّ.', 'من يرغب بتحسّن تدريجي وطبيعي.'],
        how: 'بعد تقييم البشرة نعالج المنطقة بالإبر الدقيقة، ومعها محفّزات البشرة عند الملاءمة. وقد نستعمل كريماً مخدّراً لراحتك.',
        sessions: 'عادة مجموعة جلسات تفصل بينها بضعة أسابيع. نتفق معك على عددها خلال الاستشارة.',
        downtime: 'الاحمرار والتورم الخفيف ليوم أو يومين أمر شائع. قد تشعرين بجفاف أو شدّ لفترة قصيرة.',
        results: 'يتراكم التحسّن تدريجياً على مدى الجلسات. وتختلف النتائج من شخص إلى آخر.',
        avoid: ['الحمل أو الرضاعة.', 'ظهور حب الشباب النشط أو الالتهاب أو الهربس في المنطقة.', 'أدوية تميّع الدم أو استخدام الإيزوتريتينوين مؤخراً. أخبرينا مسبقاً.', 'الميل إلى تكوّن الندوب الجدرية.'],
        aftercare: ['تجنبي المكياج في أول 24 ساعة.', 'استعملي منتجات لطيفة وواقي شمس يومياً.', 'تجنبي الشمس المباشرة والساونا والتمارين الشاقة لبضعة أيام.', 'أوقفي المقشرات والريتينويد حتى تهدأ البشرة.'],
        faqs: [
          { q: 'هل العلاج مؤلم؟', a: 'تشعر معظم العميلات بضغط خفيف أو وخز. نضبط العلاج لراحتك ونشرح لك ما تتوقعينه أولاً.' },
          { q: 'متى ألاحظ الفرق؟', a: 'قد تظهر إشراقة خلال أيام. ويتحسن الملمس والشدّ تدريجياً على مدى الجلسات.' }
        ]
      }
    }
  },
  {
    slug: 'laser-resurfacing', book: 'laser-resurfacing', key: 't3', image: 'laser-resurfacing',
    copy: {
      en: {
        intro: 'Fractional laser to refine pores, soften scars and even out tone.',
        suits: ['Enlarged pores or rough texture.', 'Acne scars or uneven tone.', 'Clients ready to follow strict sun protection.'],
        how: 'The laser treats tiny columns of skin to encourage renewal while the skin around them heals it quickly. We set the treatment to your skin type at the consultation.',
        sessions: 'Usually a course of several sessions spaced weeks apart. We decide the number together after assessing your skin.',
        downtime: 'Redness and mild swelling for a few days, then light flaking. Some clients need up to a week to feel fully comfortable.',
        results: 'Skin looks smoother and more even over the weeks after each session. Results vary and are not guaranteed.',
        avoid: ['Pregnancy or breastfeeding.', 'A recent tan or sunburn.', 'Recent isotretinoin or medication that makes skin sensitive to light.', 'Active infection, cold sores or a tendency to keloid scarring.'],
        prep: ['Avoid sun and tanning beds for at least two weeks before.', 'Arrive with clean skin and no makeup.'],
        aftercare: ['Use a gentle cleanser and a rich moisturiser.', 'Wear a high-factor sunscreen every day and avoid direct sun.', 'Do not pick flaking skin.', 'Avoid exfoliants and active ingredients until your skin has healed.', 'Skip saunas and intense exercise for a few days.'],
        faqs: [
          { q: 'Will I be red afterwards?', a: 'Yes, redness for a few days is normal. We tell you how to care for your skin during that time.' },
          { q: 'Is summer a good time?', a: 'Strong sun makes aftercare harder. We advise on timing when you book.' }
        ]
      },
      ar: {
        intro: 'ليزر جزئي لتصغير المسام وتخفيف الندوب وتوحيد لون البشرة.',
        suits: ['المسام الواسعة أو الملمس الخشن.', 'ندوب حب الشباب أو اختلاف اللون.', 'من هي مستعدة للالتزام بحماية صارمة من الشمس.'],
        how: 'يعالج الليزر أعمدة دقيقة من الجلد لتحفيز التجدد بينما تساعد البشرة المحيطة بها على الشفاء بسرعة. نضبط العلاج وفق نوع بشرتك في الاستشارة.',
        sessions: 'عادة مجموعة جلسات تفصل بينها أسابيع. نحدد العدد معاً بعد تقييم بشرتك.',
        downtime: 'احمرار وتورم خفيف لبضعة أيام ثم تقشّر خفيف. قد تحتاج بعض العميلات إلى أسبوع لتشعر بالراحة الكاملة.',
        results: 'تبدو البشرة أنعم وأكثر توحداً في الأسابيع التي تلي كل جلسة. تختلف النتائج ولا يمكن ضمانها.',
        avoid: ['الحمل أو الرضاعة.', 'سُمرة حديثة أو حروق شمس.', 'استخدام الإيزوتريتينوين مؤخراً أو أدوية تزيد حساسية البشرة للضوء.', 'التهاب نشط أو هربس أو ميل إلى تكوّن الندوب الجدرية.'],
        prep: ['تجنبي الشمس وأجهزة التسمير أسبوعين على الأقل قبل الجلسة.', 'احضري ببشرة نظيفة ودون مكياج.'],
        aftercare: ['استعملي غسولاً لطيفاً ومرطباً غنياً.', 'ضعي واقي شمس عالي الحماية يومياً وتجنبي الشمس المباشرة.', 'لا تقشّري الجلد المتقشّر.', 'تجنبي المقشرات والمواد الفعالة حتى تلتئم البشرة.', 'تجنبي الساونا والتمارين الشاقة لبضعة أيام.'],
        faqs: [
          { q: 'هل سيحمرّ وجهي بعدها؟', a: 'نعم، الاحمرار لبضعة أيام أمر طبيعي. نخبرك كيف تعتنين ببشرتك خلال تلك الفترة.' },
          { q: 'هل الصيف وقت مناسب؟', a: 'الشمس القوية تجعل العناية اللاحقة أصعب. ننصحك بالتوقيت المناسب عند الحجز.' }
        ]
      }
    }
  },
  {
    slug: 'laser-hair-removal', book: 'hair-removal', key: 't5', image: 'quadro-laser',
    copy: {
      en: {
        intro: 'Quadro laser hair removal, comfortable and suited to most skin tones.',
        suits: ['Unwanted hair on the face or body.', 'Ingrown hairs and shaving irritation.', 'Anyone who wants a long-term alternative to waxing and shaving.'],
        how: 'The laser targets the hair root. Hair grows in cycles, so treatment is repeated to catch each stage. Time depends on the area, from about 15 minutes for small areas to about 60 minutes for large ones.',
        sessions: 'A course of several sessions spaced a number of weeks apart. We confirm the plan for your skin and hair type at the consultation.',
        downtime: 'None for most clients. Mild redness or a warm feeling for a few hours is common.',
        results: 'Hair becomes finer and sparser over the course. Results vary and are not guaranteed.',
        avoid: ['Pregnancy or breastfeeding.', 'A recent tan or sunburn.', 'Medication that makes skin sensitive to light.', 'Active infection or irritation in the area.'],
        prep: ['Shave the area the day before. Do not wax or pluck for at least four weeks before.', 'Avoid sun and tanning beds before and after treatment.'],
        aftercare: ['Avoid direct sun and use sunscreen on treated areas.', 'Skip hot baths, saunas and intense exercise for 24 hours.', 'Use gentle, fragrance-free products on the area.', 'Do not wax or pluck between sessions. Shaving is fine.'],
        faqs: [
          { q: 'Does it hurt?', a: 'Most clients describe a warm snapping sensation. We adjust for your comfort.' },
          { q: 'How many sessions will I need?', a: 'It depends on the area, your hair and your skin. We give you a clear plan at the consultation.' },
          { q: 'Can I shave between sessions?', a: 'Yes. Shaving is fine. Please avoid waxing and plucking.' }
        ]
      },
      ar: {
        intro: 'إزالة الشعر بليزر كوادرو، مريحة ومناسبة لمعظم ألوان البشرة.',
        suits: ['الشعر غير المرغوب في الوجه أو الجسم.', 'الشعر تحت الجلد وتهيّج الحلاقة.', 'من تريد بديلاً طويل الأمد للشمع والحلاقة.'],
        how: 'يستهدف الليزر جذر الشعر. ينمو الشعر على دورات، لذلك يتكرر العلاج ليشمل كل مرحلة. تعتمد المدة على المنطقة، من نحو 15 دقيقة للمناطق الصغيرة إلى نحو 60 دقيقة للكبيرة.',
        sessions: 'مجموعة جلسات تفصل بينها عدة أسابيع. نؤكد الخطة وفق بشرتك ونوع شعرك في الاستشارة.',
        downtime: 'لا توجد لدى معظم العميلات. الاحمرار الخفيف أو الإحساس بالدفء لبضع ساعات أمر شائع.',
        results: 'يصبح الشعر أنعم وأقل كثافة على مدى الجلسات. تختلف النتائج ولا يمكن ضمانها.',
        avoid: ['الحمل أو الرضاعة.', 'سُمرة حديثة أو حروق شمس.', 'أدوية تزيد حساسية البشرة للضوء.', 'التهاب نشط أو تهيّج في المنطقة.'],
        prep: ['احلقي المنطقة قبل يوم. لا تستعملي الشمع أو النتف قبل أربعة أسابيع على الأقل.', 'تجنبي الشمس وأجهزة التسمير قبل العلاج وبعده.'],
        aftercare: ['تجنبي الشمس المباشرة واستعملي واقي الشمس على المناطق المعالجة.', 'تجنبي الحمامات الساخنة والساونا والتمارين الشاقة لمدة 24 ساعة.', 'استعملي منتجات لطيفة خالية من العطر على المنطقة.', 'لا تستعملي الشمع أو النتف بين الجلسات. الحلاقة لا بأس بها.'],
        faqs: [
          { q: 'هل العلاج مؤلم؟', a: 'تصفه معظم العميلات بإحساس دافئ كطقطقة خفيفة. نضبط العلاج لراحتك.' },
          { q: 'كم جلسة أحتاج؟', a: 'يعتمد ذلك على المنطقة وشعرك وبشرتك. نعطيك خطة واضحة في الاستشارة.' },
          { q: 'هل يمكنني الحلاقة بين الجلسات؟', a: 'نعم، الحلاقة لا بأس بها. يرجى تجنب الشمع والنتف.' }
        ]
      }
    }
  },
  {
    slug: 'anti-wrinkle', book: 'anti-wrinkle', key: 't6', image: 'anti-wrinkle',
    copy: {
      en: {
        intro: 'Softens expression lines while keeping your face expressive.',
        suits: ['Frown lines, forehead lines or crow’s feet.', 'Clients who want a subtle, rested look.', 'Anyone who prefers to treat lines early and lightly.'],
        how: 'After an assessment of how your face moves, small amounts are placed in chosen muscles. We favour a light hand and will tell you when less is better.',
        sessions: 'A single short visit. Results fade over time, so some clients return at intervals. We advise on timing at your visit.',
        downtime: 'None. Small marks or slight bruising can appear and settle quickly.',
        results: 'The effect builds over the days after treatment and then settles. Results vary from person to person.',
        avoid: ['Pregnancy or breastfeeding.', 'Neuromuscular conditions.', 'Allergy to any ingredient.', 'Infection or skin problems at the treatment area.'],
        aftercare: ['Stay upright for a few hours and avoid rubbing the area.', 'Avoid intense exercise, saunas and heat for 24 hours.', 'Skip facials and massage on the area for a couple of days.', 'Contact us if anything concerns you.'],
        faqs: [
          { q: 'Will I look frozen?', a: 'That is not our aim. We keep the face expressive and recommend less when less is better.' },
          { q: 'How long does the visit take?', a: 'About 20 minutes.' }
        ]
      },
      ar: {
        intro: 'يخفّف خطوط التعبير مع الحفاظ على تعابير وجهك الطبيعية.',
        suits: ['خطوط العبوس أو خطوط الجبين أو الخطوط حول العينين.', 'من ترغب بمظهر مرتاح وخفيف.', 'من تفضّل معالجة الخطوط مبكراً وبخفة.'],
        how: 'بعد تقييم حركة وجهك توضع كميات صغيرة في عضلات محددة. نفضّل اليد الخفيفة وسنخبرك عندما يكون الأقل أفضل.',
        sessions: 'زيارة قصيرة واحدة. يتلاشى الأثر مع الوقت، لذلك تعود بعض العميلات على فترات. ننصحك بالتوقيت المناسب خلال زيارتك.',
        downtime: 'لا توجد. قد تظهر علامات صغيرة أو كدمة خفيفة وتزول سريعاً.',
        results: 'يتكوّن الأثر في الأيام التي تلي العلاج ثم يستقر. وتختلف النتائج من شخص إلى آخر.',
        avoid: ['الحمل أو الرضاعة.', 'أمراض الأعصاب والعضلات.', 'الحساسية تجاه أي من المكونات.', 'التهاب أو مشاكل جلدية في منطقة العلاج.'],
        aftercare: ['ابقي بوضعية منتصبة لبضع ساعات وتجنبي فرك المنطقة.', 'تجنبي التمارين الشاقة والساونا والحرارة لمدة 24 ساعة.', 'تجنبي الفيشل والتدليك على المنطقة ليومين.', 'تواصلي معنا إن أقلقك أي أمر.'],
        faqs: [
          { q: 'هل سيبدو وجهي جامداً؟', a: 'هذا ليس هدفنا. نحافظ على تعابير الوجه وننصح بالأقل عندما يكون الأقل أفضل.' },
          { q: 'كم تستغرق الزيارة؟', a: 'نحو 20 دقيقة.' }
        ]
      }
    }
  }
];

export const generalFaq: Record<Lang, Faq[]> = {
  en: [
    { q: 'What happens at the first consultation?', a: 'We talk about your goals and your skin, assess it and agree a plan with you before any treatment begins. It is unhurried.' },
    { q: 'Who performs the treatments?', a: 'Deena Kaddoura, a registered nurse and professional certified derma.' },
    { q: 'Will the results look natural?', a: 'That is our aim. We recommend less when less is better, and we say no when a treatment is not right for you.' },
    { q: 'Do treatments hurt?', a: 'Comfort varies by treatment and by person. We explain what to expect first and adjust to keep you comfortable.' },
    { q: 'Can I have treatments if I am pregnant or breastfeeding?', a: 'Most aesthetic treatments are postponed during pregnancy and breastfeeding. Please tell us, and we will advise you.' },
    { q: 'Are treatments suitable for my skin tone?', a: 'We choose and adjust each treatment to your skin type and tone at the consultation.' },
    { q: 'How many sessions will I need?', a: 'It depends on the treatment and on you. Each treatment page gives a general idea, and we confirm your plan at the consultation.' },
    { q: 'How do I book, and can I reschedule?', a: 'Book through the form, on WhatsApp or by phone. We confirm your appointment with you. You can reschedule free of charge up to 24 hours before.' },
    { q: 'Where are you and when are you open?', a: 'We are in Barbir, Beirut. Monday to Friday 09:00 to 19:00, Saturday 10:00 to 16:00, closed on Sunday.' }
  ],
  ar: [
    { q: 'ماذا يحدث في الاستشارة الأولى؟', a: 'نتحدث عن أهدافك وبشرتك ونقيّمها ونتفق معك على خطة قبل بدء أي علاج. دون أي استعجال.' },
    { q: 'من يجري العلاجات؟', a: 'دينا قدورة، ممرضة مجازة ومختصة معتمدة في العناية الجلدية.' },
    { q: 'هل ستبدو النتائج طبيعية؟', a: 'هذا هدفنا. ننصح بالأقل عندما يكون الأقل أفضل، ونقول لا عندما لا يناسبك العلاج.' },
    { q: 'هل العلاجات مؤلمة؟', a: 'تختلف الراحة بحسب العلاج والشخص. نشرح لك ما تتوقعينه أولاً ونضبط العلاج لراحتك.' },
    { q: 'هل يمكنني إجراء العلاجات إن كنت حاملاً أو مرضعاً؟', a: 'تؤجَّل معظم العلاجات التجميلية خلال الحمل والرضاعة. يرجى إخبارنا وسننصحك.' },
    { q: 'هل العلاجات مناسبة للون بشرتي؟', a: 'نختار كل علاج ونضبطه وفق نوع بشرتك ولونها في الاستشارة.' },
    { q: 'كم جلسة سأحتاج؟', a: 'يعتمد ذلك على العلاج وعليك. تعطي صفحة كل علاج فكرة عامة، ونؤكد خطتك في الاستشارة.' },
    { q: 'كيف أحجز، وهل يمكنني تغيير الموعد؟', a: 'احجزي عبر النموذج أو واتساب أو الهاتف. نؤكد لك موعدك. يمكنك تغييره مجاناً حتى 24 ساعة قبله.' },
    { q: 'أين مكانكم ومتى تفتحون؟', a: 'نحن في بربير، بيروت. من الاثنين إلى الجمعة 09:00 إلى 19:00، والسبت 10:00 إلى 16:00، ومغلق الأحد.' }
  ]
};

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    learn: 'Learn more', book: 'Book this treatment', suits: 'Who it suits', how: 'How it works', sessions: 'Sessions', downtime: 'Downtime',
    results: 'Results', avoid: 'Not suitable if', prep: 'Before your visit', aftercare: 'Aftercare', faq: 'Questions', duration: 'Duration',
    from: 'From', packages: 'Packages', includes: 'Includes', note: 'General information. Your plan is confirmed at your consultation. See the medical disclaimer.',
    other: 'Other treatments', onlineBook: 'Book online', home: 'Home', faqTitle: 'Frequently asked questions', faqEyebrow: 'FAQ', all: 'All',
    sessionsCount: 'sessions', consent: 'Shared with the client’s consent. Individual results vary.', reviewsBtn: 'Read our Google reviews'
  },
  ar: {
    learn: 'اعرفي المزيد', book: 'احجزي هذا العلاج', suits: 'لمن يناسب', how: 'كيف يعمل', sessions: 'الجلسات', downtime: 'فترة النقاهة',
    results: 'النتائج', avoid: 'لا يناسب في حال', prep: 'قبل زيارتك', aftercare: 'العناية بعد العلاج', faq: 'أسئلة', duration: 'المدة',
    from: 'ابتداءً من', packages: 'الباقات', includes: 'تشمل', note: 'معلومات عامة. تُؤكَّد خطتك في الاستشارة. اطّلعي على إخلاء المسؤولية الطبية.',
    other: 'علاجات أخرى', onlineBook: 'احجزي أونلاين', home: 'الرئيسية', faqTitle: 'الأسئلة الشائعة', faqEyebrow: 'أسئلة', all: 'الكل',
    sessionsCount: 'جلسات', consent: 'تُنشر بموافقة العميلة. تختلف النتائج من شخص إلى آخر.', reviewsBtn: 'اقرئي تقييماتنا على Google'
  }
};
