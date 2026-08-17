/* ---- 
const translations = {
  ar: {

    nav_hadiths:"أحاديث", nav_duas:"أدعية وأذكار", nav_stories:"قصص الأنبياء",
    home_hadiths_h:"أحاديث", home_hadiths_p:"أحاديث نبوية مختارة للتدبر والعمل.",
    home_duas_h:"أدعية وأذكار", home_duas_p:"أذكار وأدعية يومية من السنة.",
    home_stories_h:"قصص الأنبياء", home_stories_p:"عبر ودروس من قصص الأنبياء.",

    daily_label:"خاطرة اليوم",

    quran_select_label:"اختر السورة:",
    quran_loading:"جاري التحميل...",
    quran_translation_label:"الترجمة",
    quran_tafsir_label:"التفسير الميسر",
    quran_show_tafsir:"إظهار/إخفاء التفسير",
    quran_play:"تشغيل الآية",
    quran_tab_read:"المصحف", quran_tab_listen:"استماع", quran_tab_tafsir:"التفسير",
    quran_hub_read_h:"المصحف", quran_hub_read_p:"تصفح النص القرآني الكامل بخط واضح، مع الترجمة.",
    quran_hub_listen_h:"الاستماع للتلاوات", quran_hub_listen_p:"استمع لتلاوة كل آية بصوت الشيخ مشاري العفاسي.",
    quran_hub_tafsir_h:"التفسير الميسر", quran_hub_tafsir_p:"اقرأ تفسيرًا مبسطًا لكل آية من كتب التفسير الموثوقة.",
    quran_hub_tajweed_h:"دليل التجويد", quran_hub_tajweed_p:"تعرّف على أحكام التجويد الأساسية وألوانها في المصحف.",
    tajweed_page_title:"دليل التجويد", tajweed_page_lead:"تعرّف على أهم أحكام تجويد القرآن الكريم، مع الحكمة من كل حكم ومثال عليه.",
    tajweed_how_label:"كيف يُطبَّق", tajweed_why_label:"لماذا يهم", tajweed_example_label:"مثال",
    back_quran:"← العودة إلى القرآن",
    font_dec:"أ-", font_inc:"أ+", font_label:"حجم الخط",
    mushaf_toggle:"عرض المصحف",
    bookmark_save:"حفظ العلامة هنا", bookmark_go:"↩ الذهاب للعلامة المحفوظة", bookmark_saved:"تم الحفظ ", bookmark_none:"لا توجد علامة محفوظة",
    reciter_label:"القارئ:",
    mushaf_style_label:"نوع الخط",
    style_uthmani:"الرسم العثماني", style_simple:"الرسم المبسط", style_tajweed:"تلوين التجويد",
    style_page:"مصحف (صفحة)",
    tajweed_legend_title:"دليل ألوان التجويد",
    tw_ghunnah:"غُنّة", tw_qalqalah:"قلقلة", tw_madd:"مدّ", tw_ikhfa:"إخفاء/إقلاب", tw_idgham:"إدغام", tw_hamzat:"همزة وصل / حروف ساكنة",
    tajweed_disclaimer:"الألوان تقريبية لمساعدة القارئ، ولا تُعتبر مرجعًا دقيقًا لأحكام التجويد — يُرجى الرجوع لمصحف تجويد معتمد أو معلم متخصص.",
    tajweed_guide_link:"عرض دليل التجويد الكامل ←",
    tafsir_lang_note:"تُعرض التفاسير المتاحة بلغتك إن وُجدت، وبالعربية كخيار دائم.",

    nav_tools:"أدوات",
    tools_title:"أدوات إسلامية", tools_lead:"مجموعة أدوات تساعدك في عبادتك اليومية.",
    tool_asma_h:"أسماء الله الحسنى", tool_asma_p:"الأسماء الـ99 مع معانيها.",
    tool_zakat_h:"حاسبة الزكاة", tool_zakat_p:"احسب زكاة المال والذهب بسهولة.",
    tool_qibla_h:"اتجاه القبلة", tool_qibla_p:"حدد اتجاه القبلة من موقعك.",
    tool_hijri_h:"التقويم الهجري", tool_hijri_p:"التاريخ الهجري اليوم والمناسبات القادمة.",
    tool_search_h:"البحث في القرآن", tool_search_p:"ابحث عن كلمة أو آية في القرآن الكريم.",
    tool_faq_h:"أسئلة وأجوبة", tool_faq_p:"إجابات لأسئلة شائعة في العبادات.",
    tool_library_h:"مكتبة الكتب", tool_library_p:"روابط كتب إسلامية موثوقة ومجانية.",
    tool_tracker_h:"ورد القرآن", tool_tracker_p:"تتبّع تقدمك اليومي في القراءة والحفظ.",
    tool_contact_h:"تواصل معنا", tool_contact_p:"انضم لمجتمعنا على ديسكورد.",

    asma_title:"أسماء الله الحسنى", asma_lead:"الأسماء التسعة والتسعون لله سبحانه وتعالى، ومن دعاه بها استجاب له.",

    zakat_title:"حاسبة الزكاة", zakat_lead:"احسب زكاة مالك وذهبك (2.5%) إذا بلغت النصاب وحال عليها الحول.",
    zakat_cash_label:"المال النقدي (المدخرات)", zakat_gold_label:"قيمة الذهب/الفضة الحالية",
    zakat_calc_btn:"احسب الزكاة", zakat_result_label:"الزكاة المستحقة:",
    zakat_nisab_note:"ملاحظة: الزكاة تجب إذا بلغ المال نصابًا (يُقدّر بقيمة 85 جرامًا من الذهب تقريبًا) وحال عليه عام هجري كامل. يُرجى استشارة عالم لحالتك الدقيقة.",

    qibla_title:"اتجاه القبلة", qibla_lead:"يحدد اتجاه القبلة (الكعبة المشرفة) من موقعك الحالي.",
    qibla_locating:"جاري تحديد موقعك...", qibla_result_label:"اتجاه القبلة من الشمال:",
    qibla_note:"وجّه الجزء العلوي من جهازك نحو الشمال، ثم اتجه بزاوية الدرجات المذكورة باتجاه الشرق.",

    hijri_title:"التقويم الهجري", hijri_lead:"التاريخ الهجري الحالي وأهم المناسبات الإسلامية القادمة.",
    hijri_today_label:"التاريخ الهجري اليوم:", hijri_events_h:"مناسبات إسلامية مهمة",
    hijri_ev1:"رأس السنة الهجرية", hijri_ev2:"يوم عاشوراء", hijri_ev3:"المولد النبوي الشريف",
    hijri_ev4:"بداية شهر رمضان المبارك", hijri_ev5:"عيد الفطر", hijri_ev6:"يوم عرفة وعيد الأضحى",

    search_title:"البحث في القرآن", search_lead:"ابحث عن أي كلمة أو عبارة في القرآن الكريم.",
    search_placeholder:"اكتب كلمة للبحث...", search_btn:"بحث", search_no_results:"لا توجد نتائج.",
    search_results_label:"النتائج:",

    faq_title:"أسئلة وأجوبة", faq_lead:"إجابات مبسطة لأسئلة شائعة حول العبادات اليومية.",

    library_title:"مكتبة الكتب", library_lead:"روابط لمصادر موثوقة لكتب إسلامية مجانية للقراءة والتحميل.",

    tracker_title:"ورد القرآن", tracker_lead:"سجّل تقدمك اليومي في قراءة أو حفظ القرآن، محفوظ في متصفحك.",
    tracker_pages_label:"عدد الصفحات/الأجزاء اليوم", tracker_add_btn:"إضافة",
    tracker_total_label:"الإجمالي:", tracker_log_h:"السجل", tracker_pages_unit:"صفحة",
    tracker_reset:"تصفير السجل",

    contact_title:"تواصل معنا", contact_lead:"انضم إلى مجتمع AL-HUDA على ديسكورد للنقاش والتعلم والدعم.",
    contact_join_btn:"الانضمام إلى السيرفر",
    audio_mode_label:"طريقة الاستماع",
    audio_ayah:"آية بآية", audio_surah:"السورة كاملة",
    play_surah:"▶ تشغيل السورة كاملة",
    mark_label:"علامات الحفظ:",
    mark_memorize:"للحفظ", mark_review:"للمراجعة", mark_done:"تم حفظه", mark_clear:"إزالة",
    tafsir_source_label:"مصدر التفسير",
    tafsir_muyassar:"التفسير الميسر", tafsir_jalalayn:"تفسير الجلالين",
    story_prev:"← السابق", story_next:"التالي →", story_back:"← كل القصص",

    prayer_locating:"جاري تحديد موقعك...",
    prayer_location_label:"موقعك",
    prayer_allow:"يرجى السماح بالوصول للموقع لعرض المواقيت بدقة",
    prayer_next:"الصلاة القادمة",
    prayer_default_note:"يتم عرض مواقيت مكة المكرمة افتراضيًا حتى تسمح بتحديد موقعك.",

    art4_h:"الإقلاع عن الإدمان", art4_p:"دعم وإرشادات للتعافي بعون الله من العادات الضارة.",
    addictions_title:"الإقلاع عن الإدمان",
    addictions_b1:"الإدمان بكل أنواعه ابتلاء يمكن التعافي منه بالصبر والدعاء والاستعانة بالله، مع اتخاذ خطوات عملية وطلب الدعم من المختصين والأقران.",
    addictions_h1:"خطوات عملية",
    addictions_b2:"حدد دافعك، تجنب أماكن ومحفزات الإدمان، استبدل العادة بنشاط مفيد، واطلب الدعم من أهلك أو مجتمع موثوق.",
    addictions_h2:"الجانب الإيماني",
    addictions_b3:"الإكثار من ذكر الله، والمحافظة على الصلاة، والدعاء بصدق، يقوّي القلب ويُعين على الصبر والثبات.",
    addictions_h3:"لا تيأس",
    addictions_b4:"النكسة ليست نهاية الطريق، فباب التوبة مفتوح دائمًا، وكل خطوة للأمام محسوبة عند الله.",

    hadiths_title:"أحاديث نبوية شريفة",
    hadiths_lead:"مجموعة من الأحاديث الصحيحة للتدبر والعمل بها في حياتنا اليومية.",

    duasdhikr_title:"أدعية وأذكار",
    duasdhikr_lead:"أذكار وأدعية يومية من السنة النبوية لطمأنة القلب وحفظ اللسان.",
    dhikr_section_h:"أذكار",
    duas_section_h:"أدعية",

    stories_title:"قصص الأنبياء",
    stories_lead:"عبر ودروس من قصص الأنبياء عليهم السلام.",
    brand:"الهُدى", brand_sub:"EL HUDA",
    nav_home:"الرئيسية", nav_quran:"القرآن", nav_prayer:"الصلاة", nav_hadiths:"أحاديث", nav_articles:"مقالات", nav_about:"من نحن",

    hero_eyebrow:"منصة إسلامية رقمية · 2026",
    hero_title:'نور <span>القرآن</span> ودليلك إلى الهدى',
    hero_lead:"اكتشف القرآن الكريم، مواقيت الصلاة، ومقالات إسلامية موثوقة — في تجربة عصرية وهادئة.",
    cta_primary:"ابدأ القراءة", cta_ghost:"مواقيت الصلاة",

    home_q_h:"القرآن الكريم", home_q_p:"تصفح، استمع، وتدبّر في تصميم هادئ ومريح.",
    home_p_h:"مواقيت الصلاة", home_p_p:"تابع أوقات الصلوات الخمس بسهولة.",
    home_a_h:"مقالات", home_a_p:"محتوى مختصر لتغذية القلب والعقل يوميًا.",
    home_about_h:"من نحن", home_about_p:"تعرّف على رسالة الهُدى وأهدافها.",
    more:"اقرأ المزيد",

    ayah_quote:"«وَقُل رَّبِّ زِدْنِي عِلْمًا»", ayah_ref:"سورة طه - الآية 114",

    quran_title:"القرآن الكريم",
    quran_lead:"وسائل بسيطة وعصرية للتقرب من كتاب الله.",
    quran_card1_h:"تصفح المصحف", quran_card1_p:"اقرأ القرآن الكريم كاملاً بخط واضح وتصميم مريح للعين.",
    quran_card2_h:"الاستماع للتلاوات", quran_card2_p:"استمع إلى تلاوات هادئة بأصوات أشهر القراء.",
    quran_card3_h:"التفسير الميسر", quran_card3_p:"شرح مبسّط للآيات من أوثق كتب التفسير.",

    prayer_title:"مواقيت الصلاة",
    prayer_lead:"أوقات تقريبية، اضبطها حسب موقعك الجغرافي.",
    p_fajr:"الفجر", p_sunrise:"الشروق", p_dhuhr:"الظهر", p_asr:"العصر", p_maghrib:"المغرب", p_isha:"العشاء",
    prayer_note:"* المواقيت تقريبية ويُفضل ضبطها حسب موقعك.",

    articles_title:"مقالات ومواضيع",
    articles_lead:"محتوى مختصر لتغذية القلب والعقل يوميًا.",
    art1_h:"فضل قيام الليل", art1_p:"تعرف على أجر وثواب قيام الليل وكيفية أدائه بسهولة.",
    art2_h:"أدعية يومية", art2_p:"مجموعة من الأدعية المستحبة لكل وقت ومناسبة.",
    art3_h:"السيرة النبوية", art3_p:"قصص وأحداث من حياة النبي محمد ﷺ تلهم وتُعلّم.",

    back_articles:"← عودة إلى المقالات",

    qiyam_title:"فضل قيام الليل",
    qiyam_b1:"قيام الليل من أعظم العبادات التي يتقرب بها المسلم إلى ربه، فهو وقت السكون والهدوء حيث تُرفع الأعمال وتُستجاب الدعوات.",
    qiyam_h1:"فضله",
    qiyam_b2:"وردت أحاديث كثيرة تبيّن فضل قيام الليل، ومنها أنه سبب لمحبة الله للعبد، وأنه من أفضل القربات بعد الفرائض.",
    qiyam_h2:"كيفية أدائه",
    qiyam_b3:"يبدأ قيام الليل بعد صلاة العشاء، ويمكن أداؤه بركعتين أو أكثر، مع الإطالة في القراءة والدعاء والتدبر.",
    qiyam_b4:"ينبغي الإكثار من الاستغفار والدعاء في هذا الوقت المبارك، فهو من أوقات استجابة الدعاء.",

    duas_title:"أدعية يومية",
    duas_b1:"الدعاء عبادة يومية يقرّب العبد من ربه في كل أوقاته، صباحًا ومساءً وفي كل حال.",
    duas_h1:"دعاء الصباح",
    duas_b2:"اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك المصير.",
    duas_h2:"دعاء قبل النوم",
    duas_b3:"باسمك ربي وضعت جنبي وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين.",
    duas_h3:"دعاء طلب العلم",
    duas_b4:"رب زدني علمًا، وارزقني فهمًا، واجعل ما علمتني حجة لي لا عليّ.",

    sirah_title:"السيرة النبوية",
    sirah_b1:"السيرة النبوية هي سجل حياة النبي محمد ﷺ منذ مولده إلى وفاته، وهي مصدر إلهام وهداية للمسلمين في كل زمان ومكان.",
    sirah_h1:"المولد والنشأة",
    sirah_b2:"وُلد النبي محمد ﷺ في مكة، ونشأ يتيمًا، وعُرف بين قومه بالصدق والأمانة قبل البعثة.",
    sirah_h2:"الرسالة والدعوة",
    sirah_b3:"بدأت الرسالة بنزول الوحي في غار حراء، فدعا الناس إلى توحيد الله بالحكمة والصبر على الأذى.",
    sirah_h3:"دروس مستفادة",
    sirah_b4:"تحمل السيرة النبوية دروسًا في الصبر، والرحمة، والعدل، والحكمة في التعامل مع الناس، تصلح لكل زمان.",

    about_title:"من نحن",
    about_p1:'"الهُدى" منصة إسلامية تهدف إلى تقديم محتوى موثوق من القرآن الكريم والسنة النبوية، بتصميم عصري وبسيط، لمساعدة الزوار على التعلم والتقرب إلى الله عز وجل، بلغتهم المفضلة.',
    about_h1:"رسالتنا",
    about_p2:"نسعى لتقديم محتوى إسلامي واضح وسهل الوصول، يخدم المسلمين في كل مكان.",
    about_h2:"قيمنا",
    about_p3:"الدقة في المصادر، البساطة في التصميم، والاحترام لكل زائر بغض النظر عن لغته أو خلفيته.",

    footer_quote:"«وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ»", footer_rights:"© 2026 الهُدى. جميع الحقوق محفوظة.",

    nav_ramadan:"رمضان", nav_store:"متجر الحجاب", nav_lessons:"الدروس",

    ramadan_title:"شهر رمضان المبارك", ramadan_lead:"أحكام وأدعية وعبادات شهر الخير والبركة.",
    ramadan_countdown_label:"الوقت المتبقي على رمضان القادم",
    cd_days:"يوم", cd_hours:"ساعة", cd_mins:"دقيقة", cd_secs:"ثانية",
    ramadan_times_h:"أوقات السحور والإفطار",
    ramadan_suhoor:"السحور", ramadan_suhoor_p:"قبيل أذان الفجر — استيقظ مبكرًا وتسحّر فإن في السحور بركة.",
    ramadan_iftar:"الإفطار", ramadan_iftar_p:"عند أذان المغرب — أفطر على تمر وماء واحرص على دعاء الإفطار.",
    ramadan_guide_h:"دليل رمضان",
    ram_card1_h:"أركان الصيام", ram_card1_p:"الإمساك عن المفطرات من الفجر إلى المغرب بنية صادقة.",
    ram_card2_h:"مفطرات الصيام", ram_card2_p:"الأكل والشرب والجماع عمدًا — أما النسيان فلا يفسد الصوم.",
    ram_card3_h:"مستحبات رمضان", ram_card3_p:"تلاوة القرآن، قيام الليل، الاعتكاف، والإكثار من الصدقة.",
    ram_card4_h:"ليلة القدر", ram_card4_p:"خير من ألف شهر — تُلتمس في الأوتار من العشر الأخيرة.",
    ram_card5_h:"دعاء الإفطار", ram_card5_p:"«اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ...»",
    ram_card6_h:"زكاة الفطر", ram_card6_p:"تجب على كل مسلم قبيل صلاة العيد — صاع من قوت البلد.",
    ramadan_ayahs_h:"آيات عن الصيام",
    ramadan_deeds_h:"برنامج يومي مقترح",
    deed1:"الاستيقاظ للسحور والصلاة — الفجر في وقته",
    deed2:"قراءة جزء من القرآن بعد الفجر",
    deed3:"الإكثار من الاستغفار والذكر في النهار",
    deed4:"حضور صلاة الجماعة والتراويح",
    deed5:"قيام الليل وإحياء الأوتار من العشر الأخيرة",
    deed6:"الصدقة اليومية ولو بالقليل",

    store_title:"متجر الحجاب", store_lead:"دليل متاجر الحجاب الموثوقة في المغرب وأوروبا — مصنّفة حسب المنطقة.",
    store_note:"هذه القائمة دليل إرشادي للمتاجر المعروفة. إن كنتِ صاحبة متجر وتودّين الإدراج، تواصلي معنا.",
    filter_all:"الكل", filter_maroc:"المغرب", filter_france:"فرنسا", filter_online:"أونلاين",

    lessons_title:"الدروس الإسلامية", lessons_lead:"دروس مبسّطة في الفقه والعقيدة والأخلاق — للمبتدئ والمتقدم.",
    cat_zawaj:"الزواج", cat_aqeedah:"العقيدة", cat_fiqh:"الفقه", cat_akhlaq:"الأخلاق", cat_family:"‍‍الأسرة",
    lesson_zawaj1_h:"شروط صحة عقد الزواج", lesson_zawaj1_p:"تعرف على الشروط الشرعية اللازمة لصحة عقد الزواج في الإسلام.",
    lesson_zawaj2_h:"حقوق الزوجين وواجباتهما", lesson_zawaj2_p:"ما الذي يجب على الزوج تجاه زوجته والعكس.",
    lesson_zawaj3_h:"الخطبة وآدابها", lesson_zawaj3_p:"آداب الخطبة الشرعية، ما يجوز وما لا يجوز للخاطب.",
    lesson_zawaj4_h:"الطلاق وأحكامه", lesson_zawaj4_p:"أنواع الطلاق، العدة، والحقوق المالية — أحكام موضحة.",
    lesson_aqeedah1_h:"أركان الإيمان الستة", lesson_aqeedah1_p:"ما يجب على كل مسلم الإيمان به.",
    lesson_aqeedah2_h:"التوحيد وأنواعه", lesson_aqeedah2_p:"توحيد الربوبية والألوهية والأسماء والصفات.",
    lesson_fiqh1_h:"الطهارة وأحكام الوضوء", lesson_fiqh1_p:"شروط الوضوء وفرائضه وسننه ونواقضه.",
    lesson_fiqh2_h:"أركان الصلاة وواجباتها", lesson_fiqh2_p:"ما تصح به الصلاة وما يُبطلها.",
    lesson_akhlaq1_h:"الصدق وأثره في حياة المسلم", lesson_akhlaq1_p:"فضل الصدق وكيف يبني شخصية موثوقة.",
    lesson_akhlaq2_h:"الصبر والشكر — ركيزتا السعادة", lesson_akhlaq2_p:"كيف يجعل الإسلام من الصبر والشكر طريقًا للراحة.",
    lesson_family1_h:"تربية الأبناء في الإسلام", lesson_family1_p:"مبادئ التربية الإسلامية للطفل منذ الولادة.",
    lesson_family2_h:"بر الوالدين — أعلى الواجبات", lesson_family2_p:"فضل بر الوالدين وكيفية التعامل مع الوالدين."
  },

  en: {

    nav_hadiths:"Hadiths", nav_duas:"Duas & Dhikr", nav_stories:"Prophets' Stories",
    home_hadiths_h:"Hadiths", home_hadiths_p:"Selected prophetic hadiths to reflect on and apply.",
    home_duas_h:"Duas & Dhikr", home_duas_p:"Daily remembrances and supplications from the Sunnah.",
    home_stories_h:"Prophets' Stories", home_stories_p:"Lessons from the stories of the Prophets.",

    daily_label:"Today's Reflection",

    quran_select_label:"Select Surah:",
    quran_loading:"Loading...",
    quran_translation_label:"Translation",
    quran_tafsir_label:"Simplified Tafsir",
    quran_show_tafsir:"Show/Hide Tafsir",
    quran_play:"Play verse",
    quran_tab_read:"Reading", quran_tab_listen:"Listening", quran_tab_tafsir:"Tafsir",
    quran_hub_read_h:"Reading", quran_hub_read_p:"Browse the full Quranic text in a clear font, with translation.",
    quran_hub_listen_h:"Listen to Recitations", quran_hub_listen_p:"Listen to each verse recited by Sheikh Mishary Alafasy.",
    quran_hub_tafsir_h:"Simplified Tafsir", quran_hub_tafsir_p:"Read a simplified explanation of each verse from trusted commentaries.",
    quran_hub_tajweed_h:"Tajweed Guide", quran_hub_tajweed_p:"Learn the essential rules of Tajweed and what their colors mean in the mushaf.",
    tajweed_page_title:"Tajweed Guide", tajweed_page_lead:"Learn the essential rules of Qur'anic recitation, why each one matters, and an example.",
    tajweed_how_label:"How it works", tajweed_why_label:"Why it matters", tajweed_example_label:"Example",
    back_quran:"← Back to Quran",
    font_dec:"A-", font_inc:"A+", font_label:"Font size",
    mushaf_toggle:"Mushaf view",
    bookmark_save:"Save bookmark here", bookmark_go:"↩ Go to bookmark", bookmark_saved:"Saved ", bookmark_none:"No bookmark saved",
    reciter_label:"Reciter:",
    mushaf_style_label:"Script style",
    style_uthmani:"Uthmani script", style_simple:"Simple script", style_tajweed:"Tajweed coloring",
    style_page:"Mushaf (page)",
    tajweed_legend_title:"Tajweed color guide",
    tw_ghunnah:"Ghunnah (nasal sound)", tw_qalqalah:"Qalqalah (echo)", tw_madd:"Madd (elongation)", tw_ikhfa:"Ikhfa / Iqlab", tw_idgham:"Idgham (merging)", tw_hamzat:"Hamzat al-Wasl / silent letters",
    tajweed_disclaimer:"Colors are an approximate aid and not a precise reference for Tajweed rules — please consult a certified Tajweed Mushaf or qualified teacher.",
    tajweed_guide_link:"View the full Tajweed guide →",
    tafsir_lang_note:"Tafsir sources available in your language are shown when available, plus Arabic as a permanent option.",

    nav_tools:"Tools",
    tools_title:"Islamic Tools", tools_lead:"A set of tools to help with your daily worship.",
    tool_asma_h:"The 99 Names of Allah", tool_asma_p:"The 99 Names with their meanings.",
    tool_zakat_h:"Zakat Calculator", tool_zakat_p:"Easily calculate Zakat on money and gold.",
    tool_qibla_h:"Qibla Direction", tool_qibla_p:"Find the Qibla direction from your location.",
    tool_hijri_h:"Hijri Calendar", tool_hijri_p:"Today's Hijri date and upcoming occasions.",
    tool_search_h:"Quran Search", tool_search_p:"Search for a word or verse in the Quran.",
    tool_faq_h:"FAQ", tool_faq_p:"Answers to common questions about worship.",
    tool_library_h:"Book Library", tool_library_p:"Links to trusted free islamic books.",
    tool_tracker_h:"Quran Tracker", tool_tracker_p:"Track your daily reading/memorization progress.",
    tool_contact_h:"Contact Us", tool_contact_p:"Join our community on Discord.",

    asma_title:"The 99 Names of Allah", asma_lead:"The 99 beautiful names of Allah; whoever calls upon Him by them, He answers.",

    zakat_title:"Zakat Calculator", zakat_lead:"Calculate Zakat (2.5%) on your money and gold if it reaches the threshold (Nisab) and a lunar year has passed.",
    zakat_cash_label:"Cash savings", zakat_gold_label:"Current value of gold/silver",
    zakat_calc_btn:"Calculate Zakat", zakat_result_label:"Zakat due:",
    zakat_nisab_note:"Note: Zakat is due if wealth reaches the Nisab threshold (roughly equivalent to 85g of gold) and a full lunar year has passed. Please consult a scholar for your specific situation.",

    qibla_title:"Qibla Direction", qibla_lead:"Find the direction of the Kaaba from your current location.",
    qibla_locating:"Locating you...", qibla_result_label:"Qibla direction from North:",
    qibla_note:"Point the top of your device towards North, then rotate by the given degrees towards the East.",

    hijri_title:"Hijri Calendar", hijri_lead:"Today's Hijri date and major upcoming islamic occasions.",
    hijri_today_label:"Today's Hijri date:", hijri_events_h:"Important islamic occasions",
    hijri_ev1:"Islamic New Year", hijri_ev2:"Day of Ashura", hijri_ev3:"Prophet's Birthday (Mawlid)",
    hijri_ev4:"Start of Ramadan", hijri_ev5:"Eid al-Fitr", hijri_ev6:"Day of Arafah & Eid al-Adha",

    search_title:"Quran Search", search_lead:"Search for any word or phrase in the Holy Quran.",
    search_placeholder:"Type a word to search...", search_btn:"Search", search_no_results:"No results found.",
    search_results_label:"Results:",

    faq_title:"FAQ", faq_lead:"Simple answers to common questions about daily worship.",

    library_title:"Book Library", library_lead:"Links to trusted sources for free islamic books to read and download.",

    tracker_title:"Quran Tracker", tracker_lead:"Log your daily Quran reading/memorization progress, saved in your browser.",
    tracker_pages_label:"Pages/parts today", tracker_add_btn:"Add",
    tracker_total_label:"Total:", tracker_log_h:"Log", tracker_pages_unit:"pages",
    tracker_reset:"Reset log",

    contact_title:"Contact Us", contact_lead:"Join the AL-HUDA community on Discord for discussion, learning and support.",
    contact_join_btn:"Join the Server",
    audio_mode_label:"Listening mode",
    audio_ayah:"Verse by verse", audio_surah:"Full surah",
    play_surah:"▶ Play full surah",
    mark_label:"Memorization marks:",
    mark_memorize:"To memorize", mark_review:"To review", mark_done:"Memorized", mark_clear:"Clear",
    tafsir_source_label:"Tafsir source",
    tafsir_muyassar:"Tafsir Al-Muyassar", tafsir_jalalayn:"Tafsir Al-Jalalayn",
    story_prev:"← Previous", story_next:"Next →", story_back:"← All stories",

    prayer_locating:"Locating you...",
    prayer_location_label:"Your location",
    prayer_allow:"Please allow location access for accurate prayer times",
    prayer_next:"Next prayer",
    prayer_default_note:"Showing Makkah times by default until you allow location access.",

    art4_h:"Overcoming Addiction", art4_p:"Support and guidance for recovering from harmful habits, with Allah's help.",
    addictions_title:"Overcoming Addiction",
    addictions_b1:"Addiction of any kind is a trial that can be overcome with patience, prayer, and reliance on Allah, alongside practical steps and support from professionals and peers.",
    addictions_h1:"Practical steps",
    addictions_b2:"Identify your motivation, avoid triggers and places associated with the habit, replace it with a beneficial activity, and seek support from family or a trusted community.",
    addictions_h2:"The faith dimension",
    addictions_b3:"Frequent remembrance of Allah, maintaining the prayers, and sincere supplication strengthen the heart and help with patience and steadfastness.",
    addictions_h3:"Don't despair",
    addictions_b4:"A relapse is not the end of the road — the door of repentance is always open, and every step forward counts with Allah.",

    hadiths_title:"Noble Hadiths",
    hadiths_lead:"A collection of authentic hadiths to reflect on and apply in daily life.",

    duasdhikr_title:"Duas & Dhikr",
    duasdhikr_lead:"Daily remembrances and supplications from the Sunnah to comfort the heart and guard the tongue.",
    dhikr_section_h:"Dhikr",
    duas_section_h:"Duas",

    stories_title:"Stories of the Prophets",
    stories_lead:"Lessons and reflections from the stories of the Prophets, peace be upon them.",
    brand:"El Huda", brand_sub:"GUIDANCE & LIGHT",
    nav_home:"Home", nav_quran:"Quran", nav_prayer:"Prayer", nav_hadiths:"Hadiths", nav_articles:"Articles", nav_about:"About",

    hero_eyebrow:"A digital islamic platform · 2026",
    hero_title:'The light of the <span>Quran</span>, your path to guidance',
    hero_lead:"Explore the Holy Quran, prayer times, and trusted islamic articles — in a calm, modern experience.",
    cta_primary:"Start reading", cta_ghost:"Prayer times",

    home_q_h:"The Holy Quran", home_q_p:"Read, listen, and reflect in a calm, comfortable design.",
    home_p_h:"Prayer Times", home_p_p:"Follow the five daily prayer times with ease.",
    home_a_h:"Articles", home_a_p:"Short content to nourish the heart and mind every day.",
    home_about_h:"About Us", home_about_p:"Learn about El Huda's mission and goals.",
    more:"Read more",

    ayah_quote:"\u201CAnd say: My Lord, increase me in knowledge\u201D", ayah_ref:"Surah Ta-Ha - Verse 114",

    quran_title:"The Holy Quran",
    quran_lead:"Simple, modern ways to connect with the book of Allah.",
    quran_card1_h:"Read the Quran", quran_card1_p:"Read the full Quran in a clear, comfortable typeface.",
    quran_card2_h:"Listen to recitations", quran_card2_p:"Listen to calm recitations by renowned reciters.",
    quran_card3_h:"Simplified Tafsir", quran_card3_p:"Easy explanations of verses from trusted commentaries.",

    prayer_title:"Prayer Times",
    prayer_lead:"Approximate times — adjust to your location.",
    p_fajr:"Fajr", p_sunrise:"Sunrise", p_dhuhr:"Dhuhr", p_asr:"Asr", p_maghrib:"Maghrib", p_isha:"Isha",
    prayer_note:"* Times are approximate, please adjust to your location.",

    articles_title:"Articles & Topics",
    articles_lead:"Short content to nourish the heart and mind every day.",
    art1_h:"The virtue of night prayer", art1_p:"Learn about the reward of night prayer and how to perform it.",
    art2_h:"Daily duas", art2_p:"A collection of recommended duas for every time and occasion.",
    art3_h:"The Prophet's biography", art3_p:"Stories and events from the life of Prophet Muhammad ﷺ.",

    back_articles:"← Back to articles",

    qiyam_title:"The Virtue of Night Prayer",
    qiyam_b1:"Night prayer (Qiyam al-Layl) is one of the greatest acts of worship through which a Muslim draws closer to Allah, a time of calm when deeds rise and prayers are answered.",
    qiyam_h1:"Its virtue",
    qiyam_b2:"Many hadiths describe the virtue of night prayer, including that it is a cause for Allah's love for His servant, and one of the best acts of worship after the obligatory prayers.",
    qiyam_h2:"How to perform it",
    qiyam_b3:"Night prayer begins after Isha prayer, and can be performed with two or more units (rak'ahs), with extended recitation, supplication, and reflection.",
    qiyam_b4:"One should increase in seeking forgiveness and supplication during this blessed time, as it is among the times when prayers are answered.",

    duas_title:"Daily Duas",
    duas_b1:"Dua is a daily act of worship that brings a servant closer to Allah at all times, morning, evening, and in every situation.",
    duas_h1:"Morning dua",
    duas_b2:"O Allah, by Your leave we have entered the morning and by Your leave we entered the evening, by Your leave we live and die, and unto You is our return.",
    duas_h2:"Dua before sleeping",
    duas_b3:"In Your name, my Lord, I lie down, and in Your name I rise. If You take my soul, have mercy on it, and if You release it, protect it as You protect Your righteous servants.",
    duas_h3:"Dua for seeking knowledge",
    duas_b4:"My Lord, increase me in knowledge, grant me understanding, and make what You have taught me an argument in my favor, not against me.",

    sirah_title:"The Prophet's Biography",
    sirah_b1:"The Prophet's biography (Sirah) is the record of the life of Prophet Muhammad ﷺ from his birth to his passing, a source of inspiration and guidance for Muslims everywhere.",
    sirah_h1:"Birth and upbringing",
    sirah_b2:"Prophet Muhammad ﷺ was born in Makkah, grew up as an orphan, and was known among his people for his honesty and trustworthiness before his mission began.",
    sirah_h2:"The message and the call",
    sirah_b3:"The message began with the revelation in the cave of Hira, after which he called people to the oneness of Allah with wisdom and patience through hardship.",
    sirah_h3:"Lessons learned",
    sirah_b4:"The Prophet's biography carries lessons in patience, mercy, justice, and wisdom in dealing with people, lessons relevant for every age.",

    about_title:"About Us",
    about_p1:'"El Huda" is an islamic platform offering trusted content from the Quran and Sunnah, with a modern, simple design, helping visitors learn and grow closer to Allah, in their preferred language.',
    about_h1:"Our Mission",
    about_p2:"We aim to provide clear, accessible islamic content that serves Muslims everywhere.",
    about_h2:"Our Values",
    about_p3:"Accuracy in sources, simplicity in design, and respect for every visitor regardless of their language or background.",

    footer_quote:"\u201CAnd cooperate in righteousness and piety\u201D", footer_rights:"© 2026 El Huda. All rights reserved.",

    nav_ramadan:"Ramadan", nav_store:"Hijab Store", nav_lessons:"Lessons",
    ramadan_title:"The Blessed Month of Ramadan", ramadan_lead:"Rulings, duas and worship for the month of goodness.",
    ramadan_countdown_label:"Time remaining until next Ramadan",
    cd_days:"days", cd_hours:"hours", cd_mins:"min", cd_secs:"sec",
    ramadan_times_h:"Suhoor & Iftar times",
    ramadan_suhoor:"Suhoor", ramadan_suhoor_p:"Before Fajr — wake early, for there is blessing in the pre-dawn meal.",
    ramadan_iftar:"Iftar", ramadan_iftar_p:"At Maghrib — break your fast with dates and water and say the iftar dua.",
    ramadan_guide_h:"Ramadan Guide",
    ram_card1_h:"Pillars of fasting", ram_card1_p:"Abstaining from all nullifiers from Fajr to Maghrib with sincere intention.",
    ram_card2_h:"What breaks the fast", ram_card2_p:"Eating, drinking or intercourse intentionally — forgetting does not break the fast.",
    ram_card3_h:"Recommended acts", ram_card3_p:"Quran recitation, night prayer, i'tikaf, and increased charity.",
    ram_card4_h:"Laylat al-Qadr", ram_card4_p:"Better than a thousand months — seek it in the odd nights of the last ten days.",
    ram_card5_h:"Iftar dua", ram_card5_p:"\"O Allah, for You I fasted and upon Your provision I break my fast...\"",
    ram_card6_h:"Zakat al-Fitr", ram_card6_p:"Obligatory on every Muslim before Eid prayer.",
    ramadan_ayahs_h:"Verses about fasting", ramadan_deeds_h:"Suggested daily schedule",
    deed1:"Wake up for suhoor and Fajr prayer", deed2:"Read a portion of the Quran after Fajr",
    deed3:"Increase dhikr and istighfar during the day", deed4:"Attend Jama'ah and Tarawih prayers",
    deed5:"Night prayer in the last ten nights", deed6:"Daily charity, even a small amount",
    store_title:"Hijab Store", store_lead:"A directory of trusted hijab stores in Morocco and Europe.",
    store_note:"This is an informational directory. If you own a store and wish to be listed, contact us.",
    filter_all:"All", filter_maroc:"Morocco", filter_france:"France", filter_online:"Online",
    lessons_title:"Islamic Lessons", lessons_lead:"Simplified lessons in fiqh, aqeedah and ethics.",
    cat_zawaj:"Marriage", cat_aqeedah:"Aqeedah", cat_fiqh:"Fiqh", cat_akhlaq:"Ethics", cat_family:"‍‍Family",
    lesson_zawaj1_h:"Conditions for a valid marriage", lesson_zawaj1_p:"The legal conditions required for a valid marriage in Islam.",
    lesson_zawaj2_h:"Rights and duties of spouses", lesson_zawaj2_p:"A comprehensive guide from Quran and Sunnah.",
    lesson_zawaj3_h:"Engagement and its etiquette", lesson_zawaj3_p:"What is permitted during the engagement period.",
    lesson_zawaj4_h:"Divorce and its rulings", lesson_zawaj4_p:"Types of divorce, iddah, and financial rights explained.",
    lesson_aqeedah1_h:"The six pillars of faith", lesson_aqeedah1_p:"What every Muslim must believe in.",
    lesson_aqeedah2_h:"Tawhid and its types", lesson_aqeedah2_p:"Tawhid of Lordship, Worship, and Names & Attributes.",
    lesson_fiqh1_h:"Purification and wudu rulings", lesson_fiqh1_p:"Obligatory acts, sunnah acts, and what nullifies wudu.",
    lesson_fiqh2_h:"Pillars and requirements of prayer", lesson_fiqh2_p:"What validates and invalidates the prayer.",
    lesson_akhlaq1_h:"Truthfulness and its impact", lesson_akhlaq1_p:"The virtue of truthfulness and building a trustworthy character.",
    lesson_akhlaq2_h:"Patience and gratitude", lesson_akhlaq2_p:"How Islam makes patience and gratitude a path to inner peace.",
    lesson_family1_h:"Raising children in Islam", lesson_family1_p:"Principles of Islamic upbringing from birth.",
    lesson_family2_h:"Honoring parents — a supreme duty", lesson_family2_p:"The virtue of honoring parents and how to do so wisely."
  },

  fr: {

    nav_hadiths:"Hadiths", nav_duas:"Invocations & Dhikr", nav_stories:"Histoires des Prophètes",
    home_hadiths_h:"Hadiths", home_hadiths_p:"Hadiths prophétiques choisis pour méditer et appliquer.",
    home_duas_h:"Invocations & Dhikr", home_duas_p:"Rappels et invocations quotidiennes de la Sunna.",
    home_stories_h:"Histoires des Prophètes", home_stories_p:"Leçons tirées des histoires des Prophètes.",

    daily_label:"Réflexion du jour",

    quran_select_label:"Choisir une sourate :",
    quran_loading:"Chargement...",
    quran_translation_label:"Traduction",
    quran_tafsir_label:"Tafsir simplifié",
    quran_show_tafsir:"Afficher/Masquer le Tafsir",
    quran_play:"Lire le verset",
    quran_tab_read:"Lecture", quran_tab_listen:"Écoute", quran_tab_tafsir:"Tafsir",
    quran_hub_read_h:"Lecture", quran_hub_read_p:"Parcourez le texte coranique complet dans une police claire, avec traduction.",
    quran_hub_listen_h:"Écouter les récitations", quran_hub_listen_p:"Écoutez chaque verset récité par Cheikh Mishary Alafasy.",
    quran_hub_tafsir_h:"Tafsir simplifié", quran_hub_tafsir_p:"Lisez une explication simplifiée de chaque verset issue de commentaires fiables.",
    quran_hub_tajweed_h:"Guide du Tajweed", quran_hub_tajweed_p:"Découvrez les règles essentielles du tajweed et la signification de leurs couleurs.",
    tajweed_page_title:"Guide du Tajweed", tajweed_page_lead:"Découvrez les règles essentielles de la récitation coranique, leur importance, et un exemple.",
    tajweed_how_label:"Comment ça marche", tajweed_why_label:"Pourquoi c'est important", tajweed_example_label:"Exemple",
    back_quran:"← Retour au Coran",
    font_dec:"A-", font_inc:"A+", font_label:"Taille du texte",
    mushaf_toggle:"Vue Mushaf",
    bookmark_save:"Enregistrer ce repère", bookmark_go:"↩ Aller au repère", bookmark_saved:"Enregistré ", bookmark_none:"Aucun repère enregistré",
    reciter_label:"Récitateur :",
    mushaf_style_label:"Style d'écriture",
    style_uthmani:"Écriture Uthmani", style_simple:"Écriture simplifiée", style_tajweed:"Coloration Tajweed",
    style_page:"Mushaf (page)",
    tajweed_legend_title:"Guide des couleurs Tajweed",
    tw_ghunnah:"Ghunnah (son nasal)", tw_qalqalah:"Qalqalah (écho)", tw_madd:"Madd (allongement)", tw_ikhfa:"Ikhfa / Iqlab", tw_idgham:"Idgham (fusion)", tw_hamzat:"Hamzat al-Wasl / lettres muettes",
    tajweed_disclaimer:"Les couleurs sont une aide approximative et non une référence précise des règles du Tajweed — veuillez consulter un Mushaf Tajweed certifié ou un enseignant qualifié.",
    tajweed_guide_link:"Voir le guide complet du Tajweed →",
    tafsir_lang_note:"Les tafsirs disponibles dans votre langue sont affichés si disponibles, en plus de l'arabe comme option permanente.",

    nav_tools:"Outils",
    tools_title:"Outils Islamiques", tools_lead:"Un ensemble d'outils pour vous aider dans votre culte quotidien.",
    tool_asma_h:"Les 99 Noms d'Allah", tool_asma_p:"Les 99 Noms avec leurs significations.",
    tool_zakat_h:"Calculateur de Zakat", tool_zakat_p:"Calculez facilement la Zakat sur l'argent et l'or.",
    tool_qibla_h:"Direction de la Qibla", tool_qibla_p:"Trouvez la direction de la Qibla depuis votre position.",
    tool_hijri_h:"Calendrier Hégirien", tool_hijri_p:"La date hégirienne d'aujourd'hui et les occasions à venir.",
    tool_search_h:"Recherche Coranique", tool_search_p:"Recherchez un mot ou un verset dans le Coran.",
    tool_faq_h:"FAQ", tool_faq_p:"Réponses aux questions fréquentes sur le culte.",
    tool_library_h:"Bibliothèque", tool_library_p:"Liens vers des livres islamiques gratuits et fiables.",
    tool_tracker_h:"Suivi du Coran", tool_tracker_p:"Suivez vos progrès quotidiens de lecture/mémorisation.",
    tool_contact_h:"Contactez-nous", tool_contact_p:"Rejoignez notre communauté sur Discord.",

    asma_title:"Les 99 Noms d'Allah", asma_lead:"Les 99 plus beaux noms d'Allah ; quiconque L'invoque par eux, Il répond.",

    zakat_title:"Calculateur de Zakat", zakat_lead:"Calculez la Zakat (2,5%) sur votre argent et votre or si le seuil (Nisab) est atteint et qu'une année lunaire est passée.",
    zakat_cash_label:"Épargne en liquide", zakat_gold_label:"Valeur actuelle de l'or/argent",
    zakat_calc_btn:"Calculer la Zakat", zakat_result_label:"Zakat due :",
    zakat_nisab_note:"Remarque : la Zakat est due si la richesse atteint le seuil du Nisab (environ équivalent à 85g d'or) et qu'une année lunaire complète est passée. Veuillez consulter un savant pour votre situation précise.",

    qibla_title:"Direction de la Qibla", qibla_lead:"Trouvez la direction de la Kaaba depuis votre position actuelle.",
    qibla_locating:"Localisation en cours...", qibla_result_label:"Direction de la Qibla depuis le Nord :",
    qibla_note:"Orientez le haut de votre appareil vers le Nord, puis tournez selon l'angle indiqué vers l'Est.",

    hijri_title:"Calendrier Hégirien", hijri_lead:"La date hégirienne d'aujourd'hui et les principales occasions islamiques à venir.",
    hijri_today_label:"Date hégirienne d'aujourd'hui :", hijri_events_h:"Occasions islamiques importantes",
    hijri_ev1:"Nouvel An islamique", hijri_ev2:"Jour de Achoura", hijri_ev3:"Anniversaire du Prophète (Mawlid)",
    hijri_ev4:"Début du Ramadan", hijri_ev5:"Aïd al-Fitr", hijri_ev6:"Jour d'Arafat et Aïd al-Adha",

    search_title:"Recherche Coranique", search_lead:"Recherchez n'importe quel mot ou phrase dans le Saint Coran.",
    search_placeholder:"Tapez un mot à rechercher...", search_btn:"Rechercher", search_no_results:"Aucun résultat trouvé.",
    search_results_label:"Résultats :",

    faq_title:"FAQ", faq_lead:"Réponses simples aux questions fréquentes sur le culte quotidien.",

    library_title:"Bibliothèque", library_lead:"Liens vers des sources fiables de livres islamiques gratuits à lire et télécharger.",

    tracker_title:"Suivi du Coran", tracker_lead:"Enregistrez vos progrès quotidiens de lecture/mémorisation, sauvegardés dans votre navigateur.",
    tracker_pages_label:"Pages/parties aujourd'hui", tracker_add_btn:"Ajouter",
    tracker_total_label:"Total :", tracker_log_h:"Journal", tracker_pages_unit:"pages",
    tracker_reset:"Réinitialiser",

    contact_title:"Contactez-nous", contact_lead:"Rejoignez la communauté AL-HUDA sur Discord pour discuter, apprendre et obtenir du soutien.",
    contact_join_btn:"Rejoindre le serveur",
    audio_mode_label:"Mode d'écoute",
    audio_ayah:"Verset par verset", audio_surah:"Sourate complète",
    play_surah:"▶ Lire la sourate complète",
    mark_label:"Repères de mémorisation :",
    mark_memorize:"À mémoriser", mark_review:"À revoir", mark_done:"Mémorisé", mark_clear:"Effacer",
    tafsir_source_label:"Source du Tafsir",
    tafsir_muyassar:"Tafsir Al-Muyassar", tafsir_jalalayn:"Tafsir Al-Jalalayn",
    story_prev:"← Précédent", story_next:"Suivant →", story_back:"← Toutes les histoires",

    prayer_locating:"Localisation en cours...",
    prayer_location_label:"Votre position",
    prayer_allow:"Veuillez autoriser la localisation pour des horaires précis",
    prayer_next:"Prochaine prière",
    prayer_default_note:"Horaires de La Mecque affichés par défaut tant que la localisation n'est pas autorisée.",

    art4_h:"Surmonter une addiction", art4_p:"Soutien et conseils pour se rétablir d'habitudes nuisibles, avec l'aide d'Allah.",
    addictions_title:"Surmonter une addiction",
    addictions_b1:"L'addiction, quelle qu'elle soit, est une épreuve dont on peut se rétablir avec patience, invocation et confiance en Allah, en plus d'étapes concrètes et du soutien de professionnels ou de pairs.",
    addictions_h1:"Étapes concrètes",
    addictions_b2:"Identifiez votre motivation, évitez les déclencheurs et lieux associés, remplacez l'habitude par une activité bénéfique, et cherchez le soutien de votre famille ou d'une communauté de confiance.",
    addictions_h2:"La dimension spirituelle",
    addictions_b3:"Multiplier le rappel d'Allah, maintenir les prières, et invoquer sincèrement renforcent le cœur et aident à la patience et à la persévérance.",
    addictions_h3:"Ne désespérez pas",
    addictions_b4:"Une rechute n'est pas la fin du chemin — la porte du repentir est toujours ouverte, et chaque pas en avant compte auprès d'Allah.",

    hadiths_title:"Hadiths Nobles",
    hadiths_lead:"Une collection de hadiths authentiques à méditer et appliquer au quotidien.",

    duasdhikr_title:"Invocations & Dhikr",
    duasdhikr_lead:"Rappels et invocations quotidiennes issus de la Sunna pour apaiser le cœur et préserver la langue.",
    dhikr_section_h:"Dhikr",
    duas_section_h:"Invocations",

    stories_title:"Histoires des Prophètes",
    stories_lead:"Leçons et réflexions tirées des histoires des Prophètes, paix sur eux.",
    brand:"El Huda", brand_sub:"GUIDANCE & LUMIÈRE",
    nav_home:"Accueil", nav_quran:"Coran", nav_prayer:"Prière", nav_hadiths:"Hadiths", nav_articles:"Articles", nav_about:"À propos",

    hero_eyebrow:"Plateforme islamique digitale · 2026",
    hero_title:'La lumière du <span>Coran</span>, votre chemin vers la guidance',
    hero_lead:"Découvrez le Saint Coran, les horaires de prière et des articles islamiques fiables — dans une expérience moderne et apaisante.",
    cta_primary:"Commencer la lecture", cta_ghost:"Horaires de prière",

    home_q_h:"Le Saint Coran", home_q_p:"Lisez, écoutez et méditez dans un design apaisant.",
    home_p_h:"Horaires de prière", home_p_p:"Suivez facilement les cinq prières quotidiennes.",
    home_a_h:"Articles", home_a_p:"Des contenus courts pour nourrir le cœur et l'esprit chaque jour.",
    home_about_h:"À propos", home_about_p:"Découvrez la mission et les objectifs d'El Huda.",
    more:"Lire la suite",

    ayah_quote:"« Et dis : Ô mon Seigneur, accroît mes connaissances »", ayah_ref:"Sourate Ta-Ha - Verset 114",

    quran_title:"Le Saint Coran",
    quran_lead:"Des moyens simples et modernes de se rapprocher du Livre d'Allah.",
    quran_card1_h:"Lire le Coran", quran_card1_p:"Lisez le Coran complet avec une police claire et confortable.",
    quran_card2_h:"Écouter les récitations", quran_card2_p:"Écoutez des récitations apaisantes par de célèbres récitateurs.",
    quran_card3_h:"Tafsir simplifié", quran_card3_p:"Explications simplifiées des versets issues de commentaires fiables.",

    prayer_title:"Horaires de prière",
    prayer_lead:"Horaires approximatifs, à ajuster selon votre position.",
    p_fajr:"Fajr", p_sunrise:"Lever du soleil", p_dhuhr:"Dhuhr", p_asr:"Asr", p_maghrib:"Maghrib", p_isha:"Isha",
    prayer_note:"* Les horaires sont approximatifs, ajustez-les selon votre position.",

    articles_title:"Articles & sujets",
    articles_lead:"Des contenus courts pour nourrir le cœur et l'esprit chaque jour.",
    art1_h:"Le mérite de la prière nocturne", art1_p:"Découvrez la récompense de la prière de nuit et comment l'accomplir.",
    art2_h:"Invocations quotidiennes", art2_p:"Une collection d'invocations recommandées pour chaque moment.",
    art3_h:"La biographie du Prophète", art3_p:"Récits et événements de la vie du Prophète Muhammad ﷺ.",

    back_articles:"← Retour aux articles",

    qiyam_title:"Le mérite de la prière nocturne",
    qiyam_b1:"La prière de nuit (Qiyam al-Layl) est l'un des actes d'adoration les plus précieux par lequel le musulman se rapproche d'Allah, un moment de calme où les œuvres s'élèvent et les invocations sont exaucées.",
    qiyam_h1:"Son mérite",
    qiyam_b2:"De nombreux hadiths décrivent le mérite de la prière nocturne, notamment qu'elle attire l'amour d'Allah pour son serviteur et qu'elle est l'un des meilleurs actes après les prières obligatoires.",
    qiyam_h2:"Comment l'accomplir",
    qiyam_b3:"La prière de nuit commence après la prière d'Isha et peut être accomplie en deux unités (rak'ah) ou plus, avec une récitation, des invocations et une méditation prolongées.",
    qiyam_b4:"Il convient de multiplier les demandes de pardon et les invocations durant ce moment béni, car c'est l'un des moments où les prières sont exaucées.",

    duas_title:"Invocations quotidiennes",
    duas_b1:"L'invocation (dua) est un acte d'adoration quotidien qui rapproche le serviteur d'Allah à tout moment, le matin, le soir et en toute situation.",
    duas_h1:"Invocation du matin",
    duas_b2:"Ô Allah, par Toi nous entrons dans le matin et par Toi nous entrons dans le soir, par Toi nous vivons et mourons, et vers Toi est le retour.",
    duas_h2:"Invocation avant de dormir",
    duas_b3:"En Ton nom, Seigneur, je me couche, et en Ton nom je me relève. Si Tu retiens mon âme, aie pitié d'elle, et si Tu la libères, protège-la comme Tu protèges Tes serviteurs vertueux.",
    duas_h3:"Invocation pour la recherche du savoir",
    duas_b4:"Seigneur, augmente mes connaissances, accorde-moi la compréhension, et fais de ce que Tu m'as enseigné un argument en ma faveur, et non contre moi.",

    sirah_title:"La biographie du Prophète",
    sirah_b1:"La biographie du Prophète (Sirah) retrace la vie du Prophète Muhammad ﷺ depuis sa naissance jusqu'à sa mort, une source d'inspiration et de guidance pour les musulmans partout.",
    sirah_h1:"Naissance et jeunesse",
    sirah_b2:"Le Prophète Muhammad ﷺ est né à La Mecque, a grandi orphelin, et était connu parmi son peuple pour son honnêteté et sa fiabilité avant sa mission.",
    sirah_h2:"Le message et l'appel",
    sirah_b3:"Le message a commencé avec la révélation dans la grotte de Hira, après quoi il a appelé les gens à l'unicité d'Allah avec sagesse et patience face aux épreuves.",
    sirah_h3:"Leçons à retenir",
    sirah_b4:"La biographie du Prophète porte des leçons de patience, de miséricorde, de justice et de sagesse dans les relations humaines, pertinentes pour toute époque.",

    about_title:"À propos",
    about_p1:"« El Huda » est une plateforme islamique proposant un contenu fiable issu du Coran et de la Sunna, avec un design moderne et simple, pour aider les visiteurs à apprendre et à se rapprocher d'Allah, dans la langue de leur choix.",
    about_h1:"Notre mission",
    about_p2:"Nous visons à offrir un contenu islamique clair et accessible, au service des musulmans partout.",
    about_h2:"Nos valeurs",
    about_p3:"La rigueur des sources, la simplicité du design, et le respect de chaque visiteur, quelle que soit sa langue ou son origine.",

    footer_quote:"« Et entraidez-vous dans la bonté et la piété »", footer_rights:"© 2026 El Huda. Tous droits réservés.",

    nav_ramadan:"Ramadan", nav_store:"Boutique Hijab", nav_lessons:"Cours",
    ramadan_title:"Le Mois Béni du Ramadan", ramadan_lead:"Règles, invocations et adorations du mois de la bonté.",
    ramadan_countdown_label:"Temps restant avant le prochain Ramadan",
    cd_days:"jours", cd_hours:"heures", cd_mins:"min", cd_secs:"sec",
    ramadan_times_h:"Horaires Suhoor & Iftar",
    ramadan_suhoor:"Suhoor", ramadan_suhoor_p:"Avant l'adhan du Fajr — levez-vous tôt, car il y a une bénédiction dans le repas pré-aube.",
    ramadan_iftar:"Iftar", ramadan_iftar_p:"À l'adhan du Maghrib — rompez le jeûne avec des dattes et de l'eau.",
    ramadan_guide_h:"Guide du Ramadan",
    ram_card1_h:"Piliers du jeûne", ram_card1_p:"S'abstenir de tout ce qui rompt le jeûne du Fajr au Maghrib avec une intention sincère.",
    ram_card2_h:"Ce qui rompt le jeûne", ram_card2_p:"Manger, boire ou avoir des relations intentionnellement — oublier ne rompt pas le jeûne.",
    ram_card3_h:"Actes recommandés", ram_card3_p:"Récitation du Coran, prière de nuit, i'tikaf et augmentation des aumônes.",
    ram_card4_h:"Laylat al-Qadr", ram_card4_p:"Meilleure que mille mois — cherchez-la dans les nuits impaires des dix derniers jours.",
    ram_card5_h:"Dua de l'iftar", ram_card5_p:"« Ô Allah, c'est pour Toi que j'ai jeûné et c'est avec Ta provision que je romps le jeûne... »",
    ram_card6_h:"Zakat al-Fitr", ram_card6_p:"Obligatoire pour chaque musulman avant la prière de l'Aïd.",
    ramadan_ayahs_h:"Versets sur le jeûne", ramadan_deeds_h:"Programme quotidien suggéré",
    deed1:"Se lever pour le suhoor et la prière du Fajr", deed2:"Lire une partie du Coran après le Fajr",
    deed3:"Multiplier le dhikr et l'istighfar dans la journée", deed4:"Assister à la prière en groupe et aux Tarawih",
    deed5:"Prière de nuit dans les dix dernières nuits", deed6:"Aumône quotidienne, même modeste",
    store_title:"Boutique Hijab", store_lead:"Un annuaire de boutiques hijab de confiance au Maroc et en Europe.",
    store_note:"Ceci est un annuaire indicatif. Si vous possédez une boutique et souhaitez y figurer, contactez-nous.",
    filter_all:"Tout", filter_maroc:"Maroc", filter_france:"France", filter_online:"En ligne",
    lessons_title:"Cours Islamiques", lessons_lead:"Cours simplifiés en fiqh, aqîda et éthique — pour débutants et avancés.",
    cat_zawaj:"Mariage", cat_aqeedah:"Aqîda", cat_fiqh:"Fiqh", cat_akhlaq:"Éthique", cat_family:"‍‍Famille",
    lesson_zawaj1_h:"Conditions du contrat de mariage", lesson_zawaj1_p:"Les conditions légales pour la validité du mariage en Islam.",
    lesson_zawaj2_h:"Droits et devoirs des époux", lesson_zawaj2_p:"Un guide complet du Coran et de la Sunna.",
    lesson_zawaj3_h:"Les fiançailles et leur étiquette", lesson_zawaj3_p:"Ce qui est permis pendant la période de fiançailles.",
    lesson_zawaj4_h:"Le divorce et ses règles", lesson_zawaj4_p:"Types de divorce, période d'attente et droits financiers.",
    lesson_aqeedah1_h:"Les six piliers de la foi", lesson_aqeedah1_p:"Ce que tout musulman doit croire.",
    lesson_aqeedah2_h:"Le Tawhid et ses types", lesson_aqeedah2_p:"Tawhid de la Seigneurie, de l'Adoration, et des Noms et Attributs.",
    lesson_fiqh1_h:"La purification et les règles du wudu", lesson_fiqh1_p:"Actes obligatoires, sunnah et ce qui annule le wudu.",
    lesson_fiqh2_h:"Piliers et conditions de la prière", lesson_fiqh2_p:"Ce qui valide et invalide la prière.",
    lesson_akhlaq1_h:"La véracité et son impact", lesson_akhlaq1_p:"La vertu de la véracité et construire un caractère digne de confiance.",
    lesson_akhlaq2_h:"Patience et gratitude", lesson_akhlaq2_p:"Comment l'Islam fait de la patience et de la gratitude une voie vers la sérénité.",
    lesson_family1_h:"L'éducation des enfants en Islam", lesson_family1_p:"Principes de l'éducation islamique depuis la naissance.",
    lesson_family2_h:"La bonté envers les parents", lesson_family2_p:"La vertu d'honorer ses parents et comment le faire avec sagesse."
  }
};

function setLang(lang){
  if(typeof window.switchLang!=='undefined'){ window.switchLang(lang); return; }
  const dict = translations[lang];
  if(!dict) return;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(dict[key]) el.innerHTML=dict[key];
  });
  document.body.setAttribute('data-lang',lang);
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('#langSelect').forEach(s=>s.value=lang);
  localStorage.setItem('elhuda_lang',lang);
  document.dispatchEvent(new CustomEvent('langchange',{detail:{lang}}));
}
---- */
/* ---- language pill buttons (AR/FR/EN) ---- */
function setLangBtn(lang){
  setLang(lang);
  document.querySelectorAll('.lang-opt').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

/* ---- theme ---- */
function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('elhuda_theme', theme);
  document.querySelectorAll('.theme-option').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });
}
function toggleThemePanel(){
  const panel = document.getElementById('themePanel');
  if(panel) panel.classList.toggle('open');
}

/* ---- mobile nav ---- */
function toggleNav(){
  const navLinks = document.getElementById('navLinks');
  if(navLinks) navLinks.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded',()=>{
  /* restore saved language */
  const savedLang = localStorage.getItem('elhuda_lang');
  if(savedLang && translations[savedLang]){
    setLang(savedLang);
    document.querySelectorAll('.lang-opt').forEach(btn=>{
      btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
    });
  }

  /* restore saved theme (dark is default, already set inline before paint) */
  const savedTheme = localStorage.getItem('elhuda_theme');
  if(savedTheme){
    document.querySelectorAll('.theme-option').forEach(btn=>{
      btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
    });
  }

  /* legacy select-based language switcher, if present on a page */
  document.querySelectorAll('#langSelect').forEach(sel=>{
    sel.addEventListener('change', ()=>setLang(sel.value));
  });

  /* mobile menu: close on outside click / link click */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if(menuToggle && navLinks){
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> navLinks.classList.remove('open'));
    });
    document.addEventListener('click', (e)=>{
      if(!menuToggle.contains(e.target) && !navLinks.contains(e.target)){
        navLinks.classList.remove('open');
      }
    });
  }

  /* theme panel: close on outside click */
  const themeToggle = document.getElementById('themeToggle');
  const themePanel = document.getElementById('themePanel');
  if(themeToggle && themePanel){
    document.addEventListener('click', (e)=>{
      if(!themeToggle.contains(e.target) && !themePanel.contains(e.target)){
        themePanel.classList.remove('open');
      }
    });
  }
});
