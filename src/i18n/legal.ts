import type { Lang } from './index';

export interface LegalSection { h: string; p: string[]; ul?: string[] }
export interface LegalDoc { slug: string; title: string; lead: string; sections: LegalSection[] }

// DRAFT legal text. Have a Lebanese lawyer review it before relying on it.
export const legalDocs: Record<Lang, LegalDoc[]> = {
  en: [
    {
      slug: 'privacy',
      title: 'Privacy policy',
      lead: 'How ByDee handles the personal information you share with us through this website.',
      sections: [
        { h: 'Who we are', p: ['ByDee is an aesthetics and skin clinic in Barbir, Beirut, Lebanon, run by Deena Kaddoura, RN. In this policy "we" means ByDee.'] },
        { h: 'What we collect', p: ['When you request an appointment we ask for your name, phone number, the treatment you are interested in, a preferred date and an optional message.', 'The booking form does not store these details on our website. When you submit it, your device opens WhatsApp with a message containing them, and the details reach us only when you press send in WhatsApp.', 'Please do not send medical history, photos or other health information through the website form. We collect health information in person during your consultation, with your consent.'] },
        { h: 'How we use it', p: ['We use your details only to answer you, arrange and confirm your appointment and, if you choose, remind you about it. We do not sell your information.'] },
        { h: 'Cookies and similar storage', p: ['The site stores your theme choice (light or dark) on your device. This is needed for the site to work as you expect and does not identify you.', 'If analytics or advertising measurement is switched on, it loads only after you accept in the cookie notice. You can change your choice at any time using "Cookie settings" in the footer.'] },
        { h: 'Third parties', p: ['Some features involve other companies that receive technical data such as your IP address:'], ul: ['WhatsApp (Meta), when you choose to message us.', 'Google Maps, only after you press "Show map".', 'Vercel, which hosts the website and keeps standard server logs.', 'Google Analytics or Meta Pixel, only if enabled and accepted by you.'] },
        { h: 'Your rights', p: ['You may ask to see, correct or delete the personal information we hold about you, and withdraw consent at any time, in line with applicable Lebanese law, including Law No. 81 of 2018 on Electronic Transactions and Personal Data. Contact us using the details below.'] },
        { h: 'How long we keep it', p: ['We keep appointment details only as long as needed to serve you and meet our professional record-keeping duties.'] },
        { h: 'Children', p: ['This website is intended for adults. Treatments for anyone under 18 require a parent or guardian.'] },
        { h: 'Changes', p: ['We may update this policy. The date at the top shows the latest version.'] }
      ]
    },
    {
      slug: 'terms',
      title: 'Terms of use',
      lead: 'The rules for using the ByDee website.',
      sections: [
        { h: 'Using this website', p: ['By using this website you agree to these terms. If you do not agree, please do not use it.'] },
        { h: 'Information, not advice', p: ['Content on this website is general information. It is not medical advice and does not replace a consultation. See our medical disclaimer.'] },
        { h: 'Appointments', p: ['A request sent through the website is not a confirmed appointment. Your appointment is confirmed only when we confirm it to you by phone or WhatsApp.', 'You may reschedule free of charge up to 24 hours before your appointment. Please tell us as early as you can if you cannot attend.'] },
        { h: 'Prices and treatments', p: ['Treatments, durations and prices may change. The final plan and price are agreed with you at your consultation.'] },
        { h: 'Photos and results', p: ['Before and after photos, where shown, are published with the client’s consent. Individual results vary and are not guaranteed.'] },
        { h: 'Our content', p: ['The text, design and images on this website belong to ByDee or are used with permission. Please do not copy or reuse them without written permission.'] },
        { h: 'Links to other sites', p: ['We are not responsible for the content or practices of websites we link to.'] },
        { h: 'Liability', p: ['We take care to keep this website accurate and available, but we provide it as is. To the extent allowed by law, we are not liable for losses resulting from using it.'] },
        { h: 'Governing law', p: ['These terms are governed by the laws of Lebanon. Disputes fall under the competent courts of Beirut.'] }
      ]
    },
    {
      slug: 'medical-disclaimer',
      title: 'Medical disclaimer',
      lead: 'Please read this before booking a treatment.',
      sections: [
        { h: 'General information only', p: ['Everything on this website is for general information. It does not diagnose, treat or replace advice from your doctor.'] },
        { h: 'Consultation first', p: ['Every treatment begins with a consultation and skin assessment. We decide with you whether a treatment is suitable, and we may advise against it or refer you to a doctor.'] },
        { h: 'Tell us about your health', p: ['Please tell us about your medical history before treatment, especially if any of these apply:'], ul: ['You are pregnant or breastfeeding.', 'You take prescription medication, including isotretinoin or blood thinners.', 'You have a skin condition, an active infection or a tendency to scarring.', 'You have allergies or have had a reaction to a treatment before.', 'You have recently had sun exposure or tanning.'] },
        { h: 'Risks and results', p: ['Aesthetic treatments carry possible side effects, such as redness, swelling, bruising, sensitivity, infection or changes in skin colour. We explain the risks relevant to you before you decide.', 'Results vary from person to person and cannot be guaranteed.'] },
        { h: 'Emergencies', p: ['If you have a severe reaction or urgent symptoms after a treatment, contact us at once. In an emergency, call your local emergency number or go to the nearest hospital.'] }
      ]
    }
  ],
  ar: [
    {
      slug: 'privacy',
      title: 'سياسة الخصوصية',
      lead: 'كيف تتعامل ByDee مع المعلومات الشخصية التي تشاركها معنا عبر هذا الموقع.',
      sections: [
        { h: 'من نحن', p: ['ByDee عيادة تجميل وعناية بالبشرة في بربير، بيروت، لبنان، تديرها دينا قدورة، ممرضة مجازة. تعني كلمة «نحن» في هذه السياسة ByDee.'] },
        { h: 'ما الذي نجمعه', p: ['عند طلب موعد نطلب اسمك ورقم هاتفك والعلاج الذي يهمّك وتاريخاً مفضّلاً ورسالة اختيارية.', 'لا يخزّن نموذج الحجز هذه البيانات على موقعنا. عند إرساله يفتح جهازك واتساب برسالة تحتوي عليها، ولا تصلنا البيانات إلا عندما تضغط على زر الإرسال في واتساب.', 'يرجى عدم إرسال تاريخك الطبي أو صورك أو أي معلومات صحية عبر نموذج الموقع. نجمع المعلومات الصحية حضورياً أثناء الاستشارة وبموافقتك.'] },
        { h: 'كيف نستخدمها', p: ['نستخدم بياناتك فقط للرد عليك وترتيب موعدك وتأكيده، وتذكيرك به إن رغبت. لا نبيع معلوماتك.'] },
        { h: 'ملفات تعريف الارتباط والتخزين المشابه', p: ['يحفظ الموقع اختيارك للمظهر (فاتح أو داكن) على جهازك. هذا ضروري لعمل الموقع كما تتوقع ولا يحدّد هويتك.', 'إذا فُعّل التحليل أو قياس الإعلانات فلن يعمل إلا بعد موافقتك في إشعار ملفات تعريف الارتباط. يمكنك تغيير اختيارك في أي وقت من «إعدادات ملفات تعريف الارتباط» في أسفل الصفحة.'] },
        { h: 'أطراف ثالثة', p: ['تتضمن بعض الميزات شركات أخرى تتلقى بيانات تقنية مثل عنوان IP الخاص بك:'], ul: ['واتساب (Meta) عندما تختار مراسلتنا.', 'خرائط Google، فقط بعد الضغط على «عرض الخريطة».', 'Vercel التي تستضيف الموقع وتحتفظ بسجلات الخادم المعتادة.', 'Google Analytics أو Meta Pixel، فقط إذا فُعّلا ووافقت عليهما.'] },
        { h: 'حقوقك', p: ['يحق لك طلب الاطلاع على معلوماتك الشخصية لدينا أو تصحيحها أو حذفها، وسحب موافقتك في أي وقت، وفق القوانين اللبنانية المرعية، ومنها القانون رقم 81 لسنة 2018 المتعلق بالمعاملات الإلكترونية والبيانات ذات الطابع الشخصي. تواصل معنا عبر وسائل الاتصال أدناه.'] },
        { h: 'مدة الاحتفاظ', p: ['نحتفظ بتفاصيل المواعيد فقط للمدة اللازمة لخدمتك والوفاء بواجبات حفظ السجلات المهنية.'] },
        { h: 'الأطفال', p: ['هذا الموقع موجّه إلى البالغين. تتطلب العلاجات لمن هم دون 18 عاماً حضور أحد الوالدين أو الوصي.'] },
        { h: 'التغييرات', p: ['قد نحدّث هذه السياسة. يبيّن التاريخ في أعلاها آخر نسخة.'] }
      ]
    },
    {
      slug: 'terms',
      title: 'شروط الاستخدام',
      lead: 'القواعد التي تحكم استخدام موقع ByDee.',
      sections: [
        { h: 'استخدام الموقع', p: ['باستخدامك هذا الموقع فإنك توافق على هذه الشروط. إذا لم توافق فيرجى عدم استخدامه.'] },
        { h: 'معلومات وليست نصيحة', p: ['المحتوى في هذا الموقع معلومات عامة. وهو ليس نصيحة طبية ولا يغني عن الاستشارة. اطّلع على إخلاء المسؤولية الطبية.'] },
        { h: 'المواعيد', p: ['الطلب المرسل عبر الموقع ليس موعداً مؤكداً. يُعتبر موعدك مؤكداً فقط عندما نؤكده لك عبر الهاتف أو واتساب.', 'يمكنك تغيير موعدك مجاناً حتى 24 ساعة قبله. يرجى إبلاغنا في أبكر وقت إن تعذّر حضورك.'] },
        { h: 'الأسعار والعلاجات', p: ['قد تتغير العلاجات ومدتها وأسعارها. نتفق معك على الخطة النهائية والسعر خلال الاستشارة.'] },
        { h: 'الصور والنتائج', p: ['تُنشر صور قبل وبعد، عند عرضها، بموافقة العميل. تختلف النتائج من شخص إلى آخر ولا يمكن ضمانها.'] },
        { h: 'محتوانا', p: ['النصوص والتصميم والصور في هذا الموقع ملك لـ ByDee أو مستخدمة بإذن. يرجى عدم نسخها أو إعادة استخدامها دون إذن خطي.'] },
        { h: 'روابط إلى مواقع أخرى', p: ['لسنا مسؤولين عن محتوى المواقع التي نضع روابط إليها أو ممارساتها.'] },
        { h: 'المسؤولية', p: ['نحرص على دقة هذا الموقع وتوفّره، لكنه مقدَّم كما هو. وبالقدر الذي يسمح به القانون، لا نتحمل المسؤولية عن أي خسائر ناتجة عن استخدامه.'] },
        { h: 'القانون الواجب التطبيق', p: ['تخضع هذه الشروط لقوانين لبنان، وتختص بالنظر في النزاعات المحاكم المختصة في بيروت.'] }
      ]
    },
    {
      slug: 'medical-disclaimer',
      title: 'إخلاء المسؤولية الطبية',
      lead: 'يرجى قراءة هذا قبل حجز أي علاج.',
      sections: [
        { h: 'معلومات عامة فقط', p: ['كل ما في هذا الموقع هو للمعلومات العامة. فهو لا يشخّص ولا يعالج ولا يحل محل نصيحة طبيبك.'] },
        { h: 'الاستشارة أولاً', p: ['يبدأ كل علاج باستشارة وتقييم للبشرة. نقرر معك ما إذا كان العلاج مناسباً، وقد ننصح بعدم إجرائه أو نحيلك إلى طبيب.'] },
        { h: 'أخبرنا عن صحتك', p: ['يرجى إخبارنا بتاريخك الطبي قبل العلاج، خصوصاً إذا انطبق عليك أي مما يلي:'], ul: ['أنتِ حامل أو مرضع.', 'تتناول أدوية بوصفة طبية، ومنها الإيزوتريتينوين أو مميّعات الدم.', 'لديك مشكلة جلدية أو التهاب نشط أو ميل لتكوّن الندوب.', 'لديك حساسية أو سبق أن تفاعلت مع علاج ما.', 'تعرّضت مؤخراً للشمس أو التسمير.'] },
        { h: 'المخاطر والنتائج', p: ['قد تترافق العلاجات التجميلية مع آثار جانبية محتملة مثل الاحمرار والتورم والكدمات والحساسية والالتهاب أو تغيّر لون البشرة. نشرح لك المخاطر المتعلقة بحالتك قبل أن تقرر.', 'تختلف النتائج من شخص إلى آخر ولا يمكن ضمانها.'] },
        { h: 'الحالات الطارئة', p: ['إذا ظهر لديك تفاعل شديد أو أعراض عاجلة بعد العلاج فتواصل معنا فوراً. وفي الطوارئ اتصل برقم الطوارئ المحلي أو توجه إلى أقرب مستشفى.'] }
      ]
    }
  ]
};

export const legalExtra: Record<Lang, Record<string, string>> = {
  en: { updated: 'Last updated', contact: 'Questions or requests', back: 'Back to home' },
  ar: { updated: 'آخر تحديث', contact: 'للاستفسار أو الطلبات', back: 'العودة إلى الرئيسية' }
};
