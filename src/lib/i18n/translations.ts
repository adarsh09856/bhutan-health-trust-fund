// Bhutan Health Trust Fund (BHTF) — Official Bilingual Terminology & DDC Standard Translations
// Source: Official BHTF Royal Charter, Logo Inscription, MoH Bhutan, and Dzongkha Development Commission (DDC)

export type Language = "en" | "dz";

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    dz: string;
  };
}

export const translations: TranslationDictionary = {
  // Brand & Identity
  brand_name_dz: {
    en: "BHUTAN HEALTH TRUST FUND",
    dz: "༄༅༎ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ ༎",
  },
  brand_name_en: {
    en: "BHUTAN HEALTH TRUST FUND",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ།",
  },
  brand_tagline: {
    en: "Ensuring equitable access to essential medicines and vaccines",
    dz: "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་ འདྲ་མཉམ་ཐོབ་ཚུགས་པའི་ཁག་འཁྱགས།",
  },
  brand_badge: {
    en: "Autonomous Statutory Trust Fund • Est. 1998",
    dz: "རང་སྐྱོང་ཅན་གྱི་ཁྲིམས་མཐུན་མ་དངུལ། • གཞི་བཙུགས་ ༡༩༩༨",
  },
  topbar_motto: {
    en: "Working together for a healthier Bhutan",
    dz: "འཕྲོད་བསྟེན་ལྡན་པའི་འབྲུག་རྒྱལ་ཁབ་ཀྱི་དོན་ལུ་ མཉམ་རུབ་ཐོག་ལཱ་འབད་དོ།",
  },
  topbar_address: {
    en: "Lower Motithang, Thimphu",
    dz: "ཐིམ་ཕུག མཐོ་རིས་ལམ། སྨད་མོ་ཏི་ཐང་།",
  },

  // Main Navigation Menu
  nav_about_us: {
    en: "About Us",
    dz: "ང་བཅས་ཀྱི་སྐོར།",
  },
  nav_about_overview: {
    en: "About Us Overview",
    dz: "ང་བཅས་ཀྱི་སྐོར་ སྤྱི་མཐོང་།",
  },
  nav_about_overview_desc: {
    en: "Founding narrative & 26-year mission",
    dz: "གཞི་བཙུགས་བྱུང་རབས་དང་ ལོ་ངོ་ ༢༦ གི་དམིགས་ཡུལ།",
  },
  nav_organization: {
    en: "Organization & Organogram",
    dz: "ལས་ཁུངས་དང་ བཀོད་རིམ།",
  },
  nav_organization_desc: {
    en: "Mandate, Vision, Mission & Organizational Chart",
    dz: "འགན་དབང་། མཐོང་སྣང་། དམིགས་ཡུལ་དང་ བཀོད་རིམ་རེའུ་མིག",
  },
  nav_trustees: {
    en: "Board of trustees (with photos)",
    dz: "བདག་སྐྱོང་ལྷན་ཚོགས། (འདྲ་པར་དང་བཅས)",
  },
  nav_trustees_desc: {
    en: "Apex governing body & ministerial leadership",
    dz: "མཐོ་རིམ་བདག་སྐྱོང་ཚོགས་པ་དང་ བློན་པོའི་དབུ་ཁྲིད།",
  },
  nav_amc: {
    en: "Asset management committee",
    dz: "མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་།",
  },
  nav_amc_desc: {
    en: "Endowment stewardship & investment oversight",
    dz: "མ་རྩ་བདག་སྐྱོང་དང་ མ་དངུལ་བཙུགས་བཞག་ལྟ་རྟོག",
  },
  nav_secretariat: {
    en: "Secretariat",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་།",
  },
  nav_secretariat_desc: {
    en: "Directorate leadership & operational officers",
    dz: "མདོ་ཆེན་དབུ་ཁྲིད་དང་ ལག་ལེན་འགོ་དཔོན།",
  },
  nav_our_story: {
    en: "Our Story",
    dz: "ང་བཅས་ཀྱི་བྱུང་རབས།",
  },
  nav_impact: {
    en: "Impact",
    dz: "གྲུབ་འབྲས།",
  },
  nav_resources: {
    en: "Resources",
    dz: "རྒྱུ་ཆས་དང་ཡིག་ཆ།",
  },
  nav_news: {
    en: "News and Events",
    dz: "གནས་ཚུལ་དང་ མཛད་སྒོ།",
  },
  nav_donate: {
    en: "Donate",
    dz: "ཞལ་འདེབས་ཕུལ།",
  },
  nav_contact: {
    en: "Contact Us",
    dz: "འབྲེལ་གཏུགས།",
  },
  nav_home: {
    en: "Home",
    dz: "གདོང་ཤོག",
  },
  nav_admin: {
    en: "Admin",
    dz: "བདག་སྐྱོང་།",
  },

  // Language Switcher
  lang_switch_label: {
    en: "Dzongkha",
    dz: "English",
  },
  lang_current: {
    en: "EN",
    dz: "རྫོང་ཁ",
  },
  lang_title: {
    en: "Switch to Dzongkha (རྫོང་ཁ)",
    dz: "Switch to English (EN)",
  },

  // Common Action Buttons & Labels
  btn_donate_now: {
    en: "Donate to BHTF",
    dz: "མ་དངུལ་ལུ་ ཞལ་འདེབས་ཕུལ།",
  },
  btn_learn_more: {
    en: "Learn More",
    dz: "རྒྱས་པ་ལྷག",
  },
  btn_read_more: {
    en: "Read More",
    dz: "ལྷག་པར་ལྷག",
  },
  btn_download: {
    en: "Download PDF",
    dz: "ཡིག་ཆ་ཕབ་ལེན།",
  },
  btn_explore: {
    en: "Explore",
    dz: "གཟིགས་ཞིབ།",
  },
  btn_back_to_home: {
    en: "Back to Home",
    dz: "གདོང་ཤོག་ལུ་ལོག",
  },
  btn_view_details: {
    en: "View Details",
    dz: "ཁ་གསལ་བལྟ།",
  },
  btn_view_all: {
    en: "View All",
    dz: "ཆ་མཉམ་བལྟ།",
  },
  btn_contact_us: {
    en: "Contact Secretariat",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་ལུ་ འབྲེལ་བ་འཐབ།",
  },

  // Institutional Tenets (About Us & Organization)
  tenet_mandate_title: {
    en: "Our Mandate",
    dz: "ང་བཅས་ཀྱི་འགན་དབང་།",
  },
  tenet_mandate_text: {
    en: "To ensure sustainable financing for essential medicines and vaccines through prudent fund management and responsible investment.",
    dz: "མ་དངུལ་འཛིན་སྐྱོང་ཚུལ་མཐུན་དང་ འགན་འཁྲི་ཅན་གྱི་མ་རྩ་བཙུགས་བཞག་ཐོག་ལས་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཀྱི་དོན་ལུ་ བརྟན་བཞུགས་ཅན་གྱི་དངུལ་རྩིས་རྒྱབ་སྐྱོར་ ངེས་གཏན་བཟོ་ནི།",
  },
  tenet_vision_title: {
    en: "Our Vision",
    dz: "ང་བཅས་ཀྱི་མཐོང་སྣང་།",
  },
  tenet_vision_text: {
    en: "A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.",
    dz: "ད་ལྟོ་དང་ མ་འོངས་པའི་མི་རབས་ཚུ་གི་དོན་ལུ་ མི་སེར་རེ་རེ་བཞིན་དུ་ལུ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཚུ་ རྒྱུན་ཆད་མེད་པར་ཐོབ་ཚུགས་པའི་ འབྲུག་རྒྱལ་ཁབ་ཅིག",
  },
  tenet_mission_title: {
    en: "Our Mission",
    dz: "ང་བཅས་ཀྱི་དམིགས་ཡུལ།",
  },
  tenet_mission_text: {
    en: "To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for financing essential medicines, vaccines, and related health supplies.",
    dz: "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ། འབྲེལ་ཡོད་འཕྲོད་བསྟེན་མཁོ་ཆས་ཚུ་ མཁོ་སྒྲུབ་འབད་ནིའི་དོན་ལུ་ བརྟན་བཞུགས་འོང་འབབ་བཟོ་ནིའི་དམིགས་གཏད་བསྐྱེད་དེ་ འཕྲོད་བསྟེན་བློ་གཏད་མ་དངུལ་བསྡུ་སྒྲིལ་དང་ མ་རྩ་བཙུགས་བཞག ཚུལ་མཐུན་འཛིན་སྐྱོང་འབད་ནི།",
  },
  governance_title: {
    en: "Governance Framework",
    dz: "བདག་སྐྱོང་དང་ འཛིན་སྐྱོང་གཞི་བཀོད།",
  },
  governance_desc: {
    en: "The Bhutan Health Trust Fund (BHTF) operates under the guidance of the Board of Directors, headed by a Chairperson. The Board provides strategic direction and ensures effective governance, accountability and the long-term sustainability of the Fund. To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets in line with its mandate and objectives. Together, the Board and the AMC play an important role in safeguarding the Fund’s resources to ensure the continued availability of essential medicines and vaccines for the people of Bhutan.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་འདི་ ཁྲི་འཛིན་གྱིས་དབུ་ཁྲིད་པའི་ བདག་སྐྱོང་ལྷན་ཚོགས་ཀྱི་ལམ་སྟོན་འོག་ལུ་ ལཱ་འགན་འགྲུབ་ཨིན། ལྷན་ཚོགས་ཀྱིས་ ཐབས་བྱུས་ཀྱི་ལམ་སྟོན་བྱིནམ་མ་ཚད་ བདག་སྐྱོང་དང་ འགན་འཁྲི། མ་དངུལ་གྱི་ཕུགས་རྒྱང་བརྟན་བཞུགས་ཚུ་ ངེས་གཏན་བཟོཝ་ཨིན། དངུལ་རྩིས་ཀྱི་བདག་སྐྱོང་དང་ མ་རྩ་བཙུགས་བཞག་གི་ལྟ་རྟོག་སྒྲིང་སྒྲིང་བཟོ་ནིའི་དོན་ལུ་ ལྷན་ཚོགས་ཀྱིས་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་ (AMC) བསྐོ་བཞག་འབདཝ་ཨིན། བདག་སྐྱོང་ལྷན་ཚོགས་དང་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་གཉིས་ཀྱིས་ འབྲུག་གི་མི་སེར་ཚུ་གི་དོན་ལུ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་ཚུ་ རྒྱུན་ཆད་མེད་པར་ཐོབ་ཚུགས་པའི་ མ་དངུལ་སྲུང་སྐྱོབ་འབད་ནིའི་ནང་ གལ་ཆེ་བའི་འགན་ཁུར་འབགཔ་ཨིན།",
  },

  // 70-20-10 Operating Model
  model_title: {
    en: "The 70–20–10 Operating Model",
    dz: "༧༠-༢༠-༡༠ ལག་ལེན་དཔེ་གཞི།",
  },
  model_desc: {
    en: "As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a 70–20–10 operating model to ensure the sustainable financing of national essential medicines and vaccines in Bhutan.",
    dz: "མ་རྩ་བཙུགས་བཞག་ཐབས་བྱུས་གསལ་བཤད་དང་འཁྲིལ་ཏེ་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱིས་ རྒྱལ་ཡོངས་ཀྱི་ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་ཚུ་ བརྟན་བཞུགས་ཅན་གྱི་དངུལ་རྩིས་རྒྱབ་སྐྱོར་འབད་ནིའི་དོན་ལུ་ ༧༠-༢༠-༡༠ གི་ལག་ལེན་དཔེ་གཞི་ལག་ལེན་འཐབ་ཨིན།",
  },
  model_70_title: {
    en: "Medicines & Vaccines Procurement",
    dz: "༧༠% སྨན་རྫས་དང་སྨན་ཁབ་མཁོ་སྒྲུབ།",
  },
  model_70_desc: {
    en: "70% of investment income is allocated to finance the procurement of national essential medicines and vaccines.",
    dz: "མ་རྩ་བཙུགས་བཞག་གི་འོང་འབབ་ལས་ བརྒྱ་ཆ་ ༧༠% འདི་ རྒྱལ་ཡོངས་ཀྱི་ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་མཁོ་སྒྲུབ་དོན་ལུ་ གཏོང་ལེན་འབདཝ་ཨིན།",
  },
  model_20_title: {
    en: "Capital Growth Reinvestment",
    dz: "༢༠% མ་རྩ་ཡར་རྒྱས་ཀྱི་དོན་ལུ་བསྐྱར་བཙུགས།",
  },
  model_20_desc: {
    en: "20% is reinvested to support the growth of the Fund’s capital and safeguard purchasing power against inflation.",
    dz: "བརྒྱ་ཆ་ ༢༠% འདི་ མ་དངུལ་གྱི་མ་རྩ་ཡར་རྒྱས་གཏང་ནི་དང་ གོང་ཚད་འཕར་བའི་ཉེན་ཁ་ལས་སྲུང་སྐྱོབ་འབད་ནིའི་དོན་ལུ་ བསྐྱར་བཙུགས་འབདཝ་ཨིན།",
  },
  model_10_title: {
    en: "Operational Expenses",
    dz: "༡༠% ཡིག་ཚང་གི་ལག་ལེན་ཟད་འགྲོ།",
  },
  model_10_desc: {
    en: "10% is allocated to cover operational expenses of the Secretariat, ensuring maximum efficiency.",
    dz: "བརྒྱ་ཆ་ ༡༠% འདི་ དྲུང་ཆེན་ཡིག་ཚང་གི་ལག་ལེན་ཟད་འགྲོ་ཚུ་ དོ་དམ་འབད་ནིའི་དོན་ལུ་ གཏོང་ལེན་འབདཝ་ཨིན།",
  },
  preservation_title: {
    en: "Principal Capital Preservation Principle",
    dz: "མ་རྩ་ངོ་མ་ ཉམས་མེད་སྲུང་སྐྱོབ་ཀྱི་རྩ་དོན།",
  },
  preservation_text: {
    en: "A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations. Any remaining funding gap is supplemented by a 1% health contribution deducted from the monthly gross salaries of salaried employees in the country.",
    dz: "མ་དངུལ་འདི་གི་གཙོ་བོའི་རྩ་དོན་གཅིག་འདི་ མ་རྩ་ངོ་མ་ཉམས་མེད་སྲུང་སྐྱོབ་འབད་ནི་འདི་ཨིན། མ་རྩ་ངོ་མ་ལག་ལེན་མ་འཐབ་པར་ མ་རྩ་བཙུགས་བཞག་ལས་བྱུང་བའི་འོང་འབབ་ཐོག་ལས་ འཕྲོད་བསྟེན་གྱི་དགོས་མཁོ་ཚུ་ གྲུབ་ཐབས་འབད་དེ་ མ་འོངས་པའི་མི་རབས་ཚུ་གི་དོན་ལུ་ དངུལ་རྩིས་སྲུང་སྐྱོབ་འབདཝ་ཨིན། དེ་མ་ཚད་ རྒྱལ་ཁབ་ནང་གི་ཕོགས་ཐོབ་ལས་བྱེད་པ་ཚུ་གི་ཟླ་རིམ་ཕོགས་ལས་ བརྒྱ་ཆ་ ༡% འཕྲོད་བསྟེན་ཞལ་འདེབས་བསྡུ་ལེན་འབད་དེ་ ཆད་གདོང་སེལ་ཐབས་འབདཝ་ཨིན།",
  },

  // Organogram & Hierarchy
  organogram_title: {
    en: "Organizational Chart (Organogram)",
    dz: "ལས་ཁུངས་ཀྱི་བཀོད་རིམ་རེའུ་མིག (Organogram)",
  },
  organogram_subtitle: {
    en: "Hierarchical governance from the Board of Trustees and Asset Management Committee to the Secretariat Directorate and four operational divisions.",
    dz: "བདག་སྐྱོང་ལྷན་ཚོགས་དང་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་ལས་ དྲུང་ཆེན་ཡིག་ཚང་དང་ ལག་ལེན་སྡེ་ཚན་བཞི་གི་བར་ནའི་ བདག་སྐྱོང་གོ་རིམ།",
  },
  organogram_board: {
    en: "Board of Trustees",
    dz: "བདག་སྐྱོང་ལྷན་ཚོགས།",
  },
  organogram_board_sub: {
    en: "High-Level Governance • 7 Trustees (Table 1.1)",
    dz: "མཐོ་རིམ་བདག་སྐྱོང་ • འཐུས་མི་ ༧ (རེའུ་མིག་ ༡.༡)",
  },
  organogram_amc: {
    en: "Asset Management Committee",
    dz: "མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་།",
  },
  organogram_amc_sub: {
    en: "Specialized Advisory Sub-committee (Table 1.2)",
    dz: "དམིགས་བསལ་གྲོས་སྟོན་ཚོགས་ཆུང་ (རེའུ་མིག་ ༡.༢)",
  },
  organogram_director: {
    en: "Director",
    dz: "མདོ་ཆེན།",
  },
  organogram_director_name: {
    en: "Dr. Gyambo Sithey, PhD",
    dz: "དྲག་ཤོས་ རྒྱལ་མཚན་སི་ཐེ། (འབུམ་རམས་པ)",
  },
  organogram_director_sub: {
    en: "Member Secretary & Executive Head",
    dz: "འཐུས་མི་དྲུང་ཆེན་དང་ ལག་ལེན་གཙོ་འཛིན།",
  },
  div_investment: {
    en: "Investment Management Division",
    dz: "མ་རྩ་བཙུགས་བཞག་འཛིན་སྐྱོང་སྡེ་ཚན།",
  },
  div_admin: {
    en: "Administration & Finance Division",
    dz: "བདག་སྐྱོང་དང་དངུལ་རྩིས་སྡེ་ཚན།",
  },
  div_programme: {
    en: "Programme Division",
    dz: "ལས་རིམ་སྡེ་ཚན།",
  },
  div_monitoring: {
    en: "Monitoring & Evaluation Division",
    dz: "ལྟ་རྟོག་དང་དབྱེ་ཞིབ་སྡེ་ཚན།",
  },

  // Key Statistics & Impact Metrics
  stat_essential_meds: {
    en: "438 Essential Medicines",
    dz: "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨",
  },
  stat_traditional_meds: {
    en: "110 Traditional Formulations",
    dz: "གསོ་བ་རིག་པའི་སྨན་སྦྱོར་ ༡༡༠",
  },
  stat_vaccines: {
    en: "4 Essential Vaccines",
    dz: "ཉེ་བར་མཁོ་བའི་སྨན་ཁབ་ ༤",
  },
  stat_dzongkhags: {
    en: "20 / 20 Dzongkhags",
    dz: "རྫོང་ཁག་ ༢༠ ཆ་མཉམ།",
  },
  stat_annual_commit: {
    en: "Nu. ~600 Million Annual Commitment",
    dz: "ལོ་རེར་ མ་དངུལ་དངུལ་ཀྲམ་ས་ཡ་ ༦༠༠ རེའི་རྒྱབ་སྐྱོར།",
  },
  stat_cumulative_disburse: {
    en: "Nu. 4.3 Billion Disbursed to Date",
    dz: "ད་ལྟོའི་བར་ དངུལ་ཀྲམ་ཐེར་འབུམ་ ༤.༣ གཏོང་ལེན་གྲུབ་པ།",
  },

  // Bottom Floating Navigation Capsule
  capsule_about: {
    en: "About Us",
    dz: "ང་བཅས་སྐོར།",
  },
  capsule_org: {
    en: "Organization & Organogram",
    dz: "ལས་ཁུངས་དང་བཀོད་རིམ།",
  },
  capsule_trustees: {
    en: "Board of Trustees",
    dz: "བདག་སྐྱོང་ལྷན་ཚོགས།",
  },
  capsule_amc: {
    en: "Asset Management Committee",
    dz: "མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་།",
  },
  capsule_secretariat: {
    en: "Secretariat",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་།",
  },
  capsule_story: {
    en: "Our Story",
    dz: "ང་བཅས་ཀྱི་བྱུང་རབས།",
  },

  // Footer Sections
  footer_col_about: {
    en: "About BHTF",
    dz: "མ་དངུལ་གྱི་སྐོར།",
  },
  footer_col_formularies: {
    en: "Impact & Formularies",
    dz: "གྲུབ་འབྲས་དང་ སྨན་ཐོ།",
  },
  footer_col_contribute: {
    en: "Contribute",
    dz: "ཞལ་འདེབས་དང་ གྲོགས་རམ།",
  },
  footer_col_contact: {
    en: "Secretariat HQ",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ།",
  },
  footer_charter_note: {
    en: "Established under Royal Charter in Geneva to guarantee uninterrupted sovereign financing for essential medicines and universal vaccines across all 20 Dzongkhags in Bhutan.",
    dz: "འབྲུག་རྒྱལ་ཁབ་ཀྱི་རྫོང་ཁག་ ༢༠ ཆ་མཉམ་ནང་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཚུ་ རྒྱུན་ཆད་མེད་པར་ ཐོབ་ཚུགས་པའི་ཁག་འཁྱགས་ཀྱི་དོན་ལུ་ ཇི་ནི་བཱ་ལུ་ རྒྱལ་པོའི་བཀའ་ཤོག་འོག་ལུ་ གཞི་བཙུགས་འབད་ཡོད།",
  },
  footer_copyright: {
    en: "All rights reserved. Autonomous Statutory Entity of the Kingdom of Bhutan.",
    dz: "ཐོབ་དབང་ཡོངས་རྫོགས་འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ལུ་ཡོད། འབྲུག་རྒྱལ་ཁབ་ཀྱི་རང་སྐྱོང་ཅན་གྱི་ཁྲིམས་མཐུན་ལས་ཚོགས།",
  },
  footer_emergency: {
    en: "National Health Emergency: Dial 112 | Health Help Center",
    dz: "རྒྱལ་ཡོངས་འཕྲོད་བསྟེན་ཉེན་འཕྲང་བརྒྱུད་འཕྲིན་: ༡༡༢ ལུ་གཏང་གནང་།",
  },

  // Official Quotes
  quote_king_label: {
    en: "Royal Proclamation — His Majesty the Fourth Druk Gyalpo (2004)",
    dz: "རྒྱལ་པོའི་བཀའ་སློབ་ — མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་མཆོག (༢༠༠༤)",
  },
  quote_king_text: {
    en: "“No Bhutanese should ever have to choose between their health and their livelihood.”",
    dz: "“འབྲུག་པའི་མི་སེར་ག་འབད་རུང་ རང་གི་འཕྲོད་བསྟེན་དང་ འཚོ་བའི་བར་ན་ གདམ་ཁ་རྐྱབ་དགོཔ་ ནམ་ཡང་མ་ཐོན་གཅིག”",
  },
  quote_lyonpo_label: {
    en: "Founding Vision — Lyonpo Sangay Ngedup",
    dz: "གཞི་བཙུགས་ཀྱི་དམིགས་གཏད་ — བློན་པོ་ སངས་རྒྱས་དངོས་གྲུབ།",
  },
  quote_lyonpo_text: {
    en: "“A tree is only as strong as the hands that first planted it. Lyonpo Sangay Ngedup laid the foundation of BHTF, and its founding members nurtured it into life. We remain forever grateful for their vision and contributions.”",
    dz: "“ཤིང་གཅིག་གི་རྩ་བ་སྒྲིང་སྒྲིང་ཡོད་མི་འདི་ དང་པ་ར་བཙུགས་མི་གི་ལག་པའི་དྲིན་ཨིན། བློན་པོ་སངས་རྒྱས་དངོས་གྲུབ་མཆོག་གིས་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་རྨང་གཞི་བཙུགས་གནང་ཡོདཔ་ལས་ ཁོང་གི་མཛད་རྗེས་ལུ་ ང་བཅས་ཀྱིས་ དུས་ནམ་ཡང་ བཀའ་དྲིན་དྲན་ཏེ་སྡོད་ནི་ཨིན།”",
  },

  // About Us Official 4-Paragraph Narrative
  about_p1: {
    en: "The Bhutan Health Trust Fund (BHTF) is a symbol of compassion, shared responsibility and Bhutan’s enduring commitment to the health and well-being of its people. Inspired by the vision of His Majesty the Fourth Druk Gyalpo, Jigme Singye Wangchuck, the Fund was established to help sustain Bhutan’s free primary healthcare service and ensure that essential medicines and vaccines remain accessible to all. It was officially launched on 12 May 1998 at the World Health Organization headquarters in Geneva, and received its formal legal foundation through the Royal Charter issued on 3 August 2000. Since 2018, the Fund has become a self-independent autonomous agency and continues to uphold a simple yet profound mission to protect lives and safeguard the health of present and future generations.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ (BHTF) འདི་ བྱམས་སྙིང་རྗེ་དང་ ཐུན་མོང་གི་འགན་ཁུར། མི་སེར་ཚུ་གི་འཕྲོད་བསྟེན་དང་ སྐྱིད་སྡུག་ལུ་ འབྲུག་རྒྱལ་ཁབ་ཀྱི་ རྒྱུན་བརྟན་ཁས་བླངས་ཀྱི་ བརྡ་མཚོན་ཅིག་ཨིན། མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་ འཇིགས་མེད་སེངྒེ་དབང་ཕྱུག་མཆོག་གི་ རླབས་ཆེན་མཐོང་སྣང་ལུ་ བརྟེན་ཏེ་ འབྲུག་གི་རིན་མེད་འཕྲོད་བསྟེན་ཞབས་ཏོག་ རྒྱུན་སྐྱོང་འབད་ནི་དང་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་ཚུ་ མི་སེར་ཆ་མཉམ་ལུ་ རྒྱུན་ཆད་མེད་པར་ ཐོབ་ཚུགས་པའི་དོན་ལུ་ གཞི་བཙུགས་གནང་ཡི། མ་དངུལ་འདི་ སྤྱི་ལོ་ ༡༩༩༨ སྤྱི་ཟླ་ ༥ པའི་ཚེས་ ༡༢ ལུ་ ཇི་ནི་བཱ་ཡོད་པའི་ འཛམ་གླིང་འཕྲོད་བསྟེན་ལས་ཚོགས་ཀྱི་ ཡིག་ཚང་ལྟེ་བ་ལུ་ གཞུང་འབྲེལ་ཐོག་ལས་ འགོ་འབྱེད་གནང་ཡོདཔ་དང་ སྤྱི་ལོ་ ༢༠༠༠ སྤྱི་ཟླ་ ༨ པའི་ཚེས་ ༣ ལུ་ རྒྱལ་པོའི་བཀའ་ཤོག་གནང་མི་ཐོག་ལས་ ཁྲིམས་མཐུན་གཞི་རྟེན་ཐོབ་ཡི། སྤྱི་ལོ་ ༢༠༡༨ ལས་ཚུར་ མ་དངུལ་འདི་ རང་སྐྱོང་ཅན་གྱི་ལས་ཚོགས་ཅིག་ལུ་གྱུར་ཏེ་ ད་ལྟོ་དང་མ་འོངས་པའི་མི་རབས་ཚུ་གི་ ཚེ་སྲོག་སྲུང་སྐྱོབ་འབད་ནིའི་ དམིགས་ཡུལ་གཙོ་བོ་འདི་ བཟུང་སྟེ་ཡོད།",
  },
  about_p2: {
    en: "Over the past two decades, the Bhutan Health Trust Fund has grown into a vital pillar of sustainable healthcare financing in Bhutan. Beginning with support for vaccines, the Fund expanded its assistance to include essential medicines in 2014. Today, it supports the procurement of 438 national essential medicines, 110 traditional medicines and four key vaccines, with an annual commitment of approximately Nu. 600 million. To date, the Fund has disbursed Nu. 4.3 billion towards essential medicines and vaccines, helping strengthen the delivery of free primary healthcare services across the country. Behind these figures are countless lives touched, families supported and communities given greater peace of mind through access to essential healthcare.",
    dz: "འདས་པའི་ལོ་ངོ་ ༢༠ ལྷག་གི་རིང་ལུ་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་འདི་ འབྲུག་གི་བརྟན་བཞུགས་འཕྲོད་བསྟེན་དངུལ་རྩིས་ཀྱི་ ཀ་ཆེན་གཙོ་བོ་ཅིག་ལུ་གྱུར་ཡོད། འགོ་ཐོག་སྨན་ཁབ་ཀྱི་རྒྱབ་སྐྱོར་ལས་འགོ་བཙུགས་ཏེ་ སྤྱི་ལོ་ ༢༠༡༤ ལུ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ཚུ་ཡང་ ཚུད་ཡོད། ད་རེས་ནངས་པ་ ལོ་རེར་ མ་དངུལ་དངུལ་ཀྲམ་ས་ཡ་ ༦༠༠ དེ་ཅིག་གི་འགན་ལེན་ཐོག་ལས་ རྒྱལ་ཡོངས་ཀྱི་ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨ དང་ གསོ་བ་རིག་པའི་སྨན་སྦྱོར་ ༡༡༠ དེ་ལས་ སྨན་ཁབ་གཙོ་བོ་ ༤ མཁོ་སྒྲུབ་འབད་ནིའི་ནང་ རྒྱབ་སྐྱོར་འབདཝ་ཨིན། ད་ལྟོའི་བར་ན་ མ་དངུལ་གྱིས་ སྨན་རྫས་དང་སྨན་ཁབ་ཀྱི་དོན་ལུ་ དངུལ་ཀྲམ་ཐེར་འབུམ་ ༤.༣ གཏོང་ལེན་འབད་དེ་ རྒྱལ་ཁབ་ནང་ རིན་མེད་འཕྲོད་བསྟེན་ཞབས་ཏོག་སྤྲོད་ནིའི་ནང་ ཕན་ཐོགས་ཆེན་པོ་བྱུང་ཡོད།",
  },
  about_p3: {
    en: "The spirit of collective care has always been at the heart of the Fund. In 2002, the “Move for Health” initiative, led by the then Health Minister, Lyonpo Sangay Ngedup, brought people together through a remarkable journey from Trashigang to Thimphu. Raising nearly USD 2 million, the initiative demonstrated how the compassion, generosity and determination of individuals and communities can contribute to a healthier nation. This legacy of shared responsibility continues to inspire the Fund’s work today.",
    dz: "ཐུན་མོང་གི་བདག་སྐྱོང་སྙིང་སྟོབས་འདི་ མ་དངུལ་གྱི་རྩ་བ་ཨིན། སྤྱི་ལོ་ ༢༠༠༢ ལུ་ སྐབས་དེ་གི་ གསོ་བའི་བློན་པོ་ སངས་རྒྱས་དངོས་གྲུབ་མཆོག་གིས་ དབུ་ཁྲིད་མཛད་པའི་ “འཕྲོད་བསྟེན་དོན་ལུ་གོམ་བགྲོད” (Move for Health) ལས་རིམ་གྱིས་ བཀྲིས་སྒང་ལས་ ཐིམ་ཕུག་བར་ན་ གོམ་བགྲོད་མཛད་དེ་ མི་སང་འབུམ་ཕྲག་ལྷགཔ་ཅིག་ མཉམ་རུབ་བཟོ་ཡོད། ལས་རིམ་འདི་གིས་ ཡུ་ཨེས་དྲོ་ལར་ ས་ཡ་ ༢ དེ་ཅིག་བསྡུ་སྒྲིལ་འབད་དེ་ མི་སེར་དང་མི་སྡེའི་ བྱམས་སྙིང་རྗེ་དང་ གཏོང་ཕོད་ སྙིང་སྟོབས་ཚུ་གིས་ རྒྱལ་ཁབ་འཕྲོད་བསྟེན་ཅན་ཅིག་ལུ་ ག་དེ་སྦེ་ ཕན་ཐོགས་ཚུགསཔ་ཨིན་ན་ གསལ་སྟོན་འབད་ཡི། ཐུན་མོང་འགན་ཁུར་གྱི་ རྗེས་ཤུལ་འདི་གིས་ ད་རེས་ཡང་ མ་དངུལ་གྱི་ལཱ་ལུ་ སེམས་ཤུགས་སྤྲོདཔ་ཨིན།",
  },
  about_p4: {
    en: "With the support of the Royal Government of Bhutan, development partners, institutions, businesses and generous individuals, the Bhutan Health Trust Fund continues to build a sustainable foundation for essential healthcare. Every contribution represents more than financial support; it is an investment in human life, dignity and the well-being of future generations. Guided by the values of accountability, sustainability and service, the Fund remains committed to ensuring that no one is left behind in accessing essential medicines and vaccines. Its story is ultimately a story of a nation caring for its people, united by the belief that a healthy population is the foundation of a happy and thriving Bhutan.",
    dz: "འབྲུག་གཞུང་དང་ གོང་འཕེལ་མཉམ་འབྲེལ་པ། ལས་ཚོགས། ཚོང་ལས་ཁང་། དེ་ལས་ སྦྱིན་བདག་མི་སེར་ཚུ་གི་ རྒྱབ་སྐྱོར་ཐོག་ལས་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱིས་ ཉེ་བར་མཁོ་བའི་འཕྲོད་བསྟེན་གྱི་ བརྟན་བཞུགས་གཞི་རྟེན་ མུ་མཐུད་དེ་ར་ བཟོ་དོ་ཡོད། ཞལ་འདེབས་རེ་རེ་བཞིན་དུ་འདི་ དངུལ་གྱི་རྒྱབ་སྐྱོར་རྐྱངམ་གཅིག་མེན་པར་ འགྲོ་བ་མིའི་ཚེ་སྲོག་དང་ ཆེ་མཐོང་། མ་འོངས་མི་རབས་ཀྱི་ བདེ་སྐྱིད་ལུ་ མ་རྩ་བཙུགས་བཞག་འབད་མི་ཅིག་ཨིན། འགན་འཁྲི་དང་ བརྟན་བཞུགས། ཞབས་ཏོག་གི་ རིན་ཐང་ལུ་གཞི་བཞག་སྟེ་ མི་སེར་ག་འབད་རུང་ སྨན་རྫས་དང་སྨན་ཁབ་ཐོབ་ནིའི་ནང་ མ་ཐོབ་པར་མི་ལུས་ནིའི་དོན་ལུ་ མ་དངུལ་གྱིས་ ཁས་བླངས་འབདཝ་ཨིན། འདི་གི་བྱུང་རབས་འདི་ མཐར་གཏུགས་པ་ཅིན་ མི་སེར་ཚུ་གི་སྐྱིད་སྡུག་ལྟ་བའི་ རྒྱལ་ཁབ་ཀྱི་བྱུང་རབས་ཅིག་ཨིན།",
  },

  // --- Section 1.1: Board of Trustees ---
  trustees_page_badge: {
    en: "Section 1.1 • Fiduciary Governance",
    dz: "དབྱེ་ཚན་ ༡.༡ • དངུལ་རྩིས་བདག་སྐྱོང་།",
  },
  trustees_page_title: {
    en: "Board of trustees",
    dz: "བདག་སྐྱོང་ལྷན་ཚོགས།",
  },
  trustees_page_subtitle: {
    en: "The Bhutan Health Trust Fund operates under the guidance of the Board of Directors, headed by a Chairperson, providing strategic direction, accountability, and long-term sustainability.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་འདི་ ཁྲི་འཛིན་གྱིས་དབུ་ཁྲིད་པའི་ བདག་སྐྱོང་ལྷན་ཚོགས་ཀྱི་ལམ་སྟོན་འོག་ལུ་ ཐབས་བྱུས་ཀྱི་ལམ་སྟོན་དང་ འགན་འཁྲི། ཕུགས་རྒྱང་བརྟན་བཞུགས་ཚུ་ ངེས་གཏན་བཟོ་སྟེ་ ལཱ་འགན་འགྲུབ་ཨིན།",
  },
  trustees_table_badge: {
    en: "Table 1.1 • High-Level Governance",
    dz: "རེའུ་མིག་ ༡.༡ • མཐོ་རིམ་བདག་སྐྱོང་།",
  },
  trustees_statutory_badge: {
    en: "Statutory Fiduciary Trustee",
    dz: "ཁྲིམས་མཐུན་བདག་སྐྱོང་འཐུས་མི།",
  },
  trustee_tandin_name: {
    en: "HE Lyonpo Tandin Wangchuk",
    dz: "མི་དབང་བློན་པོ་ རྟནྡྲིན་དབང་ཕྱུག",
  },
  trustee_tandin_role: {
    en: "Chairperson",
    dz: "ཁྲི་འཛིན།",
  },
  trustee_tandin_org: {
    en: "Minister, Ministry of Health",
    dz: "གསོ་བའི་བློན་པོ། འཕྲོད་བསྟེན་ལྷན་ཁག",
  },
  trustee_tandin_desc: {
    en: "Provides ministerial leadership, steering sovereign health financing and aligning BHTF disbursements with universal healthcare priorities.",
    dz: "རྒྱལ་ཡོངས་འཕྲོད་བསྟེན་དངུལ་རྩིས་དང་ ཀུན་ཁྱབ་འཕྲོད་བསྟེན་གཙོ་རིམ་ཚུ་ལུ་ བློན་པོའི་དབུ་ཁྲིད་དང་ ལམ་སྟོན་གནངམ་ཨིན།",
  },
  trustee_lopen_name: {
    en: "Lopen Tshering Wangchuk",
    dz: "སློབ་དཔོན་ ཚེ་རིང་དབང་ཕྱུག",
  },
  trustee_lopen_role: {
    en: "Trustee",
    dz: "བདག་སྐྱོང་འཐུས་མི།",
  },
  trustee_lopen_org: {
    en: "Secretary, Monastic Council for Administration and Development Affairs, Zhung Dratshang",
    dz: "དྲུང་ཆེན། གཞུང་དགེ་འདུན་བདག་སྐྱོང་དང་གོང་འཕེལ་ལྷན་ཚོགས། གཞུང་གྲྭ་ཚང་།",
  },
  trustee_lopen_badge: {
    en: "Zhung Dratshang",
    dz: "གཞུང་གྲྭ་ཚང་།",
  },
  trustee_lopen_desc: {
    en: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom.",
    dz: "གཞུང་གྲྭ་ཚང་གི་སྐུ་ཚབ་མཛད་དེ་ རྒྱལ་ཁབ་ནང་ དམ་ཆོས་ཀྱི་ལམ་སྟོན་དང་ བྱམས་བརྩེའི་འཕྲོད་བསྟེན་གྱི་ འགན་ཁུར་འབགཔ་ཨིན།",
  },
  trustee_ugyen_name: {
    en: "Ms. Ugyen Choden",
    dz: "སྐུ་ཞབས་ ཨོ་རྒྱན་ཆོས་ལྡན།",
  },
  trustee_ugyen_role: {
    en: "Trustee & AMC Chairperson",
    dz: "བདག་སྐྱོང་འཐུས་མི་ དང་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་གི་ཁྲི་འཛིན།",
  },
  trustee_ugyen_org: {
    en: "Deputy Governor, Royal Monetary Authority (RMA)",
    dz: "བགྲེས་གཞོན་མདོ་ཆེན། རྒྱལ་གཞུང་དངུལ་ལས་དབང་འཛིན།",
  },
  trustee_ugyen_badge: {
    en: "Central Bank / AMC Chair",
    dz: "དབུས་དངུལ་ཁང་ / AMC ཁྲི་འཛིན།",
  },
  trustee_ugyen_desc: {
    en: "Brings extensive central banking, monetary policy, and financial regulatory expertise. Chairs the BHTF Asset Management Committee (AMC) overseeing capital preservation and asset allocation.",
    dz: "དབུས་དངུལ་ཁང་གི་སྲིད་བྱུས་དང་ མ་རྩ་སྲུང་སྐྱོབ་ཀྱི་དམིགས་བསལ་ཉམས་མྱོང་ཐོག་ལས་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་གི་ཁྲི་འཛིན་མཛདཔ་ཨིན།",
  },
  trustee_chencho_name: {
    en: "Mr. Chencho T. Namgay",
    dz: "སྐུ་ཞབས་ ཅེན་ཅོ་ ཊི་ རྣམ་རྒྱལ།",
  },
  trustee_chencho_role: {
    en: "Trustee & AMC Member",
    dz: "བདག་སྐྱོང་འཐུས་མི་ དང་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་གི་འཐུས་མི།",
  },
  trustee_chencho_org: {
    en: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    dz: "གཙོ་འཛིན་འགོ་དཔོན། རྒྱལ་ཡོངས་དགོངས་ཕོགས་དང་ལྟོ་ཕོགས་མ་དངུལ།",
  },
  trustee_chencho_badge: {
    en: "Pension Fund / AMC Member",
    dz: "དགོངས་ཕོགས་མ་དངུལ་ / AMC འཐུས་མི།",
  },
  trustee_chencho_desc: {
    en: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight as a member of the Board and Asset Management Committee.",
    dz: "རྒྱལ་ཡོངས་དགོངས་ཕོགས་མ་དངུལ་གྱི་གཙོ་འཛིན་འགོ་དཔོན་སྦེ་ མ་རྩ་བཙུགས་བཞག་དང་ ཉེན་ཁ་ལྟ་རྟོག་གི་ ལམ་སྟོན་གནངམ་ཨིན།",
  },
  trustee_norbu_name: {
    en: "Mr. Norbu Dendup",
    dz: "སྐུ་ཞབས་ ནོར་བུ་དོན་གྲུབ།",
  },
  trustee_norbu_role: {
    en: "Trustee & AMC Member",
    dz: "བདག་སྐྱོང་འཐུས་མི་ དང་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་གི་འཐུས་མི།",
  },
  trustee_norbu_org: {
    en: "Director, Department of Treasury and Accounts, Ministry of Finance",
    dz: "མདོ་ཆེན། མཛོད་ཁང་དང་རྩིས་ཁུངས་ལས་ཁུངས། དངུལ་རྩིས་ལྷན་ཁག",
  },
  trustee_norbu_badge: {
    en: "Ministry of Finance / AMC Member",
    dz: "དངུལ་རྩིས་ལྷན་ཁག་ / AMC འཐུས་མི།",
  },
  trustee_norbu_desc: {
    en: "Oversees public financial management, treasury coordination, and sovereign endowment governance, serving on the Board and Asset Management Committee.",
    dz: "མི་མང་དངུལ་རྩིས་འཛིན་སྐྱོང་དང་ རྒྱལ་གཞུང་མཛོད་ཁང་གི་མཐུན་འབྲེལ་ལྟ་རྟོག་མཛདཔ་ཨིན།",
  },
  trustee_pema_name: {
    en: "Mr. Pema Tshering",
    dz: "སྐུ་ཞབས་ པདྨ་ཚེ་རིང་།",
  },
  trustee_pema_role: {
    en: "Trustee (Independent Director)",
    dz: "བདག་སྐྱོང་འཐུས་མི། (རང་དབང་ཅན་གྱི་མདོ་ཆེན)",
  },
  trustee_pema_org: {
    en: "Independent Director / Former CEO, T Bank Ltd.",
    dz: "རང་དབང་ཅན་གྱི་མདོ་ཆེན། / ཊི་ དངུལ་ཁང་གི་གཙོ་འཛིན་འགོ་དཔོན་ཟུར་པ།",
  },
  trustee_pema_badge: {
    en: "Financial Sector Specialist",
    dz: "དངུལ་འབྲེལ་ལས་རིགས་མཁས་མཆོག",
  },
  trustee_pema_desc: {
    en: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan.",
    dz: "ཚོང་ལས་དངུལ་ཁང་དང་ མ་རྩའི་ཚོང་རའི་ནང་ ལོ་ངོ་བཅུ་ཕྲག་ལྷག་གི་ ཉམས་མྱོང་ཅན་གྱི་ རང་དབང་ཅན་གྱི་མདོ་ཆེན་ཨིན།",
  },
  trustee_phub_name: {
    en: "Dr. Phub Tshering",
    dz: "འབུམ་རམས་པ་ ཕུར་པ་ཚེ་རིང་།",
  },
  trustee_phub_role: {
    en: "Trustee",
    dz: "བདག་སྐྱོང་འཐུས་མི།",
  },
  trustee_phub_org: {
    en: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    dz: "སྨན་བཅོས་མདོ་ཆེན། འཇིགས་མེད་རྡོ་རྗེ་དབང་ཕྱུག་རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་།",
  },
  trustee_phub_badge: {
    en: "Clinical Specialist",
    dz: "སྨན་བཅོས་མཁས་མཆོག",
  },
  trustee_phub_desc: {
    en: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment directly representing the nation's premier tertiary healthcare institution.",
    dz: "རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་གི་ སྨན་བཅོས་མདོ་ཆེན་སྦེ་ སྨན་ཐོ་དང་སྨན་བཅོས་ནུས་པའི་ ལམ་སྟོན་གནངམ་ཨིན།",
  },

  // --- Section 1.2: Asset Management Committee ---
  amc_page_badge: {
    en: "Section 1.2 • Fiduciary Oversight",
    dz: "དབྱེ་ཚན་ ༡.༢ • དངུལ་རྩིས་ལྟ་རྟོག",
  },
  amc_page_title: {
    en: "Asset management committee",
    dz: "མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་།",
  },
  amc_page_subtitle: {
    en: "To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets.",
    dz: "དངུལ་རྩིས་བདག་སྐྱོང་དང་ མ་རྩ་བཙུགས་བཞག་གི་ལྟ་རྟོག་སྒྲིང་སྒྲིང་བཟོ་ནིའི་དོན་ལུ་ ལྷན་ཚོགས་ཀྱིས་ མ་རྩ་འཛིན་སྐྱོང་ཚོགས་ཆུང་ (AMC) བསྐོ་བཞག་འབདཝ་ཨིན།",
  },
  amc_table_badge: {
    en: "Table 1.2 • Investment Stewardship",
    dz: "རེའུ་མིག་ ༡.༢ • མ་རྩ་བཙུགས་བཞག་ལྟ་རྟོག",
  },
  amc_member_badge: {
    en: "AMC Member",
    dz: "AMC འཐུས་མི།",
  },
  amc_chair_badge: {
    en: "Chairperson (AMC)",
    dz: "AMC ཁྲི་འཛིན།",
  },

  // --- Section 1.3: Secretariat ---
  secretariat_page_badge: {
    en: "Executive Directorate",
    dz: "ལག་ལེན་མདོ་ཆེན་ཡིག་ཚང་།",
  },
  secretariat_page_title: {
    en: "Secretariat",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་།",
  },
  secretariat_page_subtitle: {
    en: "The executive arm of the Bhutan Health Trust Fund executing day-to-day operations, endowment investments, and healthcare procurement disbursements.",
    dz: "ཉིན་བསྟར་གྱི་ལཱ་འགན་དང་ མ་རྩ་བཙུགས་བཞག་ དེ་ལས་ འཕྲོད་བསྟེན་མཁོ་སྒྲུབ་གཏོང་ལེན་ཚུ་ ལག་ལེན་འཐབ་མི་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་ ལག་ལེན་ཡན་ལག",
  },
  secretariat_divisions_title: {
    en: "Secretariat Operational Divisions",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་གི་ ལག་ལེན་སྡེ་ཚན་ཚུ།",
  },
  secretariat_divisions_sub: {
    en: "Under the leadership of the Director & Member Secretary, the Secretariat manages four specialized operational divisions to fulfill the statutory objectives of the Fund.",
    dz: "མདོ་ཆེན་དང་ འཐུས་མི་དྲུང་ཆེན་གྱི་ དབུ་ཁྲིད་འོག་ལུ་ དྲུང་ཆེན་ཡིག་ཚང་གིས་ མ་དངུལ་གྱི་ཁྲིམས་མཐུན་དམིགས་ཡུལ་ཚུ་ གྲུབ་ཐབས་ལུ་ དམིགས་བསལ་ལག་ལེན་སྡེ་ཚན་བཞི་ འཛིན་སྐྱོང་འབདཝ་ཨིན།",
  },
  div_investment_desc: {
    en: "Oversees endowment portfolio management, yield generation, onshore/offshore asset allocations, and liquidity monitoring.",
    dz: "མ་དངུལ་མ་རྩ་བཙུགས་བཞག་དང་ འོང་འབབ་བཟོ་ནི། རྒྱལ་ནང་དང་ཕྱི་རྒྱལ་གྱི་མ་རྩ་བགོ་བཀྲམ། དངུལ་རྐྱང་འགྲོ་འགྲུལ་ལྟ་རྟོག་ཚུ་ འགན་ལེན་འབདཝ་ཨིན།",
  },
  div_admin_desc: {
    en: "Directs statutory accounting, audit compliance, human resources, IT infrastructure, and secretariat procurement support.",
    dz: "ཁྲིམས་མཐུན་རྩིས་ཁྲ་དང་ རྩིས་ཞིབ་བསྟུན་སྒྲིག མི་སྟོབས་ཐོན་སྐྱེད། བརྡ་དོན་འཕྲུལ་རིག་དང་ ཡིག་ཚང་མཁོ་སྒྲུབ་ཚུ་ དོ་དམ་འབདཝ་ཨིན།",
  },
  div_programme_desc: {
    en: "Coordinates with the Ministry of Health on the procurement of 438 essential medicines, traditional medicines, and universal vaccines.",
    dz: "འཕྲོད་བསྟེན་ལྷན་ཁག་དང་མཉམ་འབྲེལ་ཐོག་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨ དང་ གསོ་བ་རིག་པའི་སྨན་སྦྱོར། སྨན་ཁབ་ཚུ་ མཁོ་སྒྲུབ་ཀྱི་མཐུན་འབྲེལ་འབདཝ་ཨིན།",
  },
  div_monitoring_desc: {
    en: "Tracks distribution to health centers, formulary adherence, stock integrity, and primary healthcare outcomes across all 20 Dzongkhags.",
    dz: "རྫོང་ཁག་ ༢༠ གི་ འཕྲོད་བསྟེན་ས་ཚུགས་ཚུ་ནང་ སྨན་རྫས་བགོ་བཀྲམ་དང་ སྨན་ཐོའི་བསྟུན་སྒྲིག གཞི་རྟེན་འཕྲོད་བསྟེན་གྲུབ་འབྲས་ཚུ་ ལྟ་རྟོག་འབདཝ་ཨིན།",
  },

  // --- Section 2: Our Story & Milestones ---
  story_page_badge: {
    en: "Section 2 • Historical Journey",
    dz: "དབྱེ་ཚན་ ༢ • བྱུང་རབས་ལམ་འགྲོས།",
  },
  story_page_title: {
    en: "Our Story",
    dz: "ང་བཅས་ཀྱི་བྱུང་རབས།",
  },
  story_page_subtitle: {
    en: "The founding chronicle of the Bhutan Health Trust Fund and 26 years of service to the nation.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་ གཞི་བཙུགས་བྱུང་རབས་དང་ རྒྱལ་ཁབ་ལུ་ ལོ་ངོ་ ༢༦ གི་ཞབས་ཏོག",
  },
  story_mandate_badge: {
    en: "Founding Mandate • Est. 1998",
    dz: "གཞི་བཙུགས་འགན་དབང་ • ༡༩༩༨",
  },
  story_p1: {
    en: "The Bhutan Health Trust Fund (BHTF) was established in 1998 with the objective of ensuring sustainable financing for essential medicines and vaccines in Bhutan. The Fund received its royal charter in 2000, which provides the foundation for its mandate and operations.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ (BHTF) འདི་ འབྲུག་ནང་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཚུ་གི་དོན་ལུ་ བརྟན་བཞུགས་ཅན་གྱི་དངུལ་རྩིས་རྒྱབ་སྐྱོར་ ངེས་གཏན་བཟོ་ནིའི་དམིགས་ཡུལ་ཐོག་ལས་ སྤྱི་ལོ་ ༡༩༩༨ ལུ་ གཞི་བཙུགས་གནང་ཡི། མ་དངུལ་འདི་ལུ་ སྤྱི་ལོ་ ༢༠༠༠ ལུ་ རྒྱལ་པོའི་བཀའ་ཤོག་ཐོབ་མི་གིས་ འགན་དབང་དང་ ལག་ལེན་གྱི་རྨང་གཞི་བཟོ་གནང་ཡི།",
  },
  story_p2: {
    en: "Since its establishment, BHTF has continued to strengthen its financial sustainability through prudent fund management and investment, supporting the continued provision of essential medicines and vaccines for the people of Bhutan.",
    dz: "གཞི་བཙུགས་གནང་ཚུན་ཚོད་ འབྲུག་གི་མི་སེར་ཚུ་གི་དོན་ལུ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཚུ་ རྒྱུན་ཆད་མེད་པར་ ཐོབ་ཚུགས་པའི་རྒྱབ་སྐྱོར་གྱི་དོན་ལུ་ མ་དངུལ་འཛིན་སྐྱོང་ཚུལ་མཐུན་དང་ མ་རྩ་བཙུགས་བཞག་ཐོག་ལས་ དངུལ་རྩིས་བརྟན་བཞུགས་ སྒྲིང་སྒྲིང་བཟོ་དོ་ཡོད།",
  },
  milestone_1998_title: {
    en: "Launched in Geneva",
    dz: "ཇི་ནི་བཱ་ལུ་ འགོ་འབྱེད་མཛད་པ།",
  },
  milestone_1998_desc: {
    en: "BHTF launched on 12th May at the World Health Organization headquarters in Geneva.",
    dz: "སྤྱི་ལོ་ ༡༩༩༨ སྤྱི་ཟླ་ ༥ པའི་ཚེས་ ༡༢ ལུ་ ཇི་ནི་བཱ་ལུ་ཡོད་པའི་ འཛམ་གླིང་འཕྲོད་བསྟེན་ལས་ཚོགས་ཀྱི་ ཡིག་ཚང་ལྟེ་བ་ལུ་ འགོ་འབྱེད་གནང་ཡི།",
  },
  milestone_2000_title: {
    en: "Royal Charter issued",
    dz: "རྒྱལ་པོའི་བཀའ་ཤོག་གནང་བ།",
  },
  milestone_2000_desc: {
    en: "Secretariat established; Charter issued by the Fourth Druk Gyalpo on 3rd August.",
    dz: "དྲུང་ཆེན་ཡིག་ཚང་གཞི་བཙུགས་དང་ མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་མཆོག་གིས་ སྤྱི་ཟླ་ ༨ པའི་ཚེས་ ༣ ལུ་ རྒྱལ་པོའི་བཀའ་ཤོག་གནང་ཡི།",
  },
  milestone_2003_title: {
    en: "Vaccine financing begins",
    dz: "སྨན་ཁབ་དངུལ་རྩིས་རྒྱབ་སྐྱོར་འགོ་བཙུགས་པ།",
  },
  milestone_2003_desc: {
    en: "First funding for primary health care vaccines.",
    dz: "གཞི་རྟེན་འཕྲོད་བསྟེན་གྱི་ སྨན་ཁབ་ཚུ་གི་དོན་ལུ་ འགོ་ཐོག་མ་དངུལ་རྒྱབ་སྐྱོར་གནང་ཡི།",
  },
  milestone_2006_title: {
    en: "National campaigns",
    dz: "རྒྱལ་ཡོངས་ལས་འགུལ་རྒྱབ་སྐྱོར།",
  },
  milestone_2006_desc: {
    en: "Supported nationwide Measles & Rubella campaign; financed the Hepatitis B drive.",
    dz: "རྒྱལ་ཡོངས་ཀྱི་ གྲུམ་བུའི་ནད་འབྲུམ་དང་ མཆིན་ནད་ བཱི་ སྨན་ཁབ་ལས་འགུལ་ལུ་ དངུལ་རྩིས་རྒྱབ་སྐྱོར་མཛད་ཡི།",
  },
  milestone_2014_title: {
    en: "Health Contribution transferred",
    dz: "འཕྲོད་བསྟེན་ཞལ་འདེབས་རྩིས་སྤྲོད་བྱུང་བ།",
  },
  milestone_2014_desc: {
    en: "HC moved to BHTF; Fund began financing both essential drugs and vaccines.",
    dz: "འཕྲོད་བསྟེན་ཞལ་འདེབས་འདི་ མ་དངུལ་ལུ་རྩིས་སྤྲོད་བྱུང་སྟེ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་གཉིས་ཆ་ར་ལུ་ རྒྱབ་སྐྱོར་འགོ་བཙུགས་ཡི།",
  },
  milestone_2017_title: {
    en: "HPV vaccine co-financed",
    dz: "ཨེཆ་པི་བཱི་ སྨན་ཁབ་མཉམ་རུབ་རྒྱབ་སྐྱོར།",
  },
  milestone_2017_desc: {
    en: "Co-financed with the Australian Cervical Cancer Foundation (ACCF).",
    dz: "ཨཱོས་ཊྲེ་ལི་ཡཱན་ མངལ་སྐྲན་གཞི་ཚོགས་དང་མཉམ་འབྲེལ་ཐོག་ མཉམ་རུབ་རྒྱབ་སྐྱོར་མཛད་ཡི།",
  },
  milestone_2018_title: {
    en: "Autonomous & Pentavalent",
    dz: "རང་སྐྱོང་ལས་ཚོགས་དང་ སྨན་ཁབ་ལྔ་འདུས།",
  },
  milestone_2018_desc: {
    en: "Delinked from MoH; supported Pentavalent Vaccine introduction with GAVI.",
    dz: "འཕྲོད་བསྟེན་ལྷན་ཁག་ལས་ རང་སྐྱོང་ལོགས་སུ་ཐོན་ཏེ་ GAVI དང་མཉམ་འབྲེལ་ཐོག་ སྨན་ཁབ་ལྔ་འདུས་ངོ་སྤྲོད་འབད་ཡི།",
  },
  milestone_2019_title: {
    en: "PCV & Influenza funded",
    dz: "པི་སི་བཱི་ དང་ ཆམ་རིམ་སྨན་ཁབ་རྒྱབ་སྐྱོར།",
  },
  milestone_2019_desc: {
    en: "Funded introduction of Pneumococcal Conjugate and Influenza vaccines.",
    dz: "གློ་ཚད་དང་ ཆམ་རིམ་སྨན་ཁབ་ངོ་སྤྲོད་ཀྱི་དོན་ལུ་ མ་དངུལ་རྒྱབ་སྐྱོར་མཛད་ཡི།",
  },
  milestone_2026_title: {
    en: "26 years of service to the nation",
    dz: "རྒྱལ་ཁབ་ལུ་ ལོ་ངོ་ ༢༦ གི་ཞབས་ཏོག",
  },
  milestone_2026_desc: {
    en: "26 unbroken years sustaining primary healthcare financing for essential medicines and vaccines across all 20 Dzongkhags.",
    dz: "རྫོང་ཁག་ ༢༠ ཆ་མཉམ་ནང་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་སྨན་ཁབ་ཚུ་ རྒྱུན་ཆད་མེད་པར་ ལོ་ངོ་ ༢༦ གི་རིང་ དངུལ་རྩིས་རྒྱབ་སྐྱོར་གྲུབ་པ།",
  },

  // --- Homepage Translations ---
  home_hero_match_badge: {
    en: "1:1 Sovereign Match",
    dz: "༡:༡ རྒྱལ་གཞུང་འདྲ་མཉམ་གཏོང་ལེན།",
  },
  home_hero_title_1: {
    en: "Building a",
    dz: "འཕྲོད་བསྟེན་ལྡན་པའི་",
  },
  home_hero_title_2: {
    en: "Healthier Bhutan",
    dz: "འབྲུག་རྒྱལ་ཁབ་ བསྐྲུན་ནི།",
  },
  home_hero_desc: {
    en: "The Bhutan Health Trust Fund sustainably finances essential medicines and vaccines to strengthen primary healthcare and protect the well-being of every Bhutanese citizen.",
    dz: "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱིས་ གཞི་རྟེན་འཕྲོད་བསྟེན་ཞབས་ཏོག་སྒྲིང་སྒྲིང་བཟོ་ནི་དང་ འབྲུག་པའི་མི་སེར་རེ་རེ་བཞིན་དུ་གི་ བདེ་སྐྱིད་སྲུང་སྐྱོབ་ཀྱི་དོན་ལུ་ ཉེ་བར་མཁོ་བའི་སྨན་རྫས་དང་ སྨན་ཁབ་ཚུ་ བརྟན་བཞུགས་ཅན་གྱི་དངུལ་རྩིས་རྒྱབ་སྐྱོར་འབདཝ་ཨིན།",
  },
  home_btn_donate: {
    en: "Donate (1:1 Sovereign Match)",
    dz: "ཞལ་འདེབས་ཕུལ། (༡:༡ རྒྱལ་གཞུང་འདྲ་མཉམ)",
  },
  home_btn_explore_impact: {
    en: "Explore Our Impact",
    dz: "ང་བཅས་ཀྱི་གྲུབ་འབྲས་ གཟིགས་ཞིབ།",
  },
  ql_essential_meds: {
    en: "Essential Medicines",
    dz: "ཉེ་བར་མཁོ་བའི་སྨན་རྫས།",
  },
  ql_essential_meds_sub: {
    en: "438 Modern Formulations",
    dz: "དེང་རབས་སྨན་སྦྱོར་ ༤༣༨",
  },
  ql_vaccine_sec: {
    en: "Vaccine Security",
    dz: "སྨན་ཁབ་སྲུང་སྐྱོབ།",
  },
  ql_vaccine_sec_sub: {
    en: "100% Childhood & Flu",
    dz: "༡༠༠% ཨ་ལོ་དང་ཆམ་རིམ་སྨན་ཁབ།",
  },
  ql_traditional_med: {
    en: "Traditional Medicine",
    dz: "གསོ་བ་རིག་པའི་སྨན་སྦྱོར།",
  },
  ql_traditional_med_sub: {
    en: "110 gSo-ba Rig-pa Formulations",
    dz: "གསོ་བ་རིག་པའི་སྨན་སྦྱོར་ ༡༡༠",
  },
  ql_cold_chain: {
    en: "Cold Chain Network",
    dz: "བསིལ་ཁང་མཐུད་སྦྲེལ།",
  },
  ql_cold_chain_sub: {
    en: "20 Dzongkhags Monitoring",
    dz: "རྫོང་ཁག་ ༢༠ ལྟ་རྟོག",
  },
  ql_universal_access: {
    en: "Universal Access",
    dz: "ཀུན་ཁྱབ་ཐོབ་སྐལ།",
  },
  ql_universal_access_sub: {
    en: "100% Free at Point of Care",
    dz: "༡༠༠% རིན་མེད་འཕྲོད་བསྟེན།",
  },
  ql_window_financing: {
    en: "Window Financing",
    dz: "སྒོ་འབྱེད་དངུལ་རྩིས།",
  },
  ql_window_financing_sub: {
    en: "Quarterly DMS Releases",
    dz: "བཞི་དཔྱའི་མཁོ་སྒྲུབ་གཏོང་ལེན།",
  },
  stat_sovereign_endowment: {
    en: "Sovereign Endowment",
    dz: "རྒྱལ་གཞུང་མ་དངུལ་ངོ་མ།",
  },
  stat_ringfenced: {
    en: "Ring-fenced principal",
    dz: "སྲུང་སྐྱོབ་ཅན་གྱི་མ་རྩ།",
  },
  stat_free_healthcare: {
    en: "Free Primary Healthcare",
    dz: "རིན་མེད་གཞི་རྟེན་འཕྲོད་བསྟེན།",
  },
  stat_zero_cost: {
    en: "Zero out-of-pocket costs",
    dz: "སྒེར་གྱི་ཟད་འགྲོ་མེད་པ།",
  },
  stat_meds_formulations: {
    en: "Medicines & Formulations",
    dz: "སྨན་རྫས་དང་སྨན་སྦྱོར།",
  },
  stat_modern_trad: {
    en: "Modern + Traditional",
    dz: "དེང་རབས་ + གསོ་བ་རིག་པ།",
  },
  stat_dzongkhags_covered: {
    en: "Dzongkhags Covered",
    dz: "རྫོང་ཁག་ཁྱབ་ཚད།",
  },
  stat_phu_units: {
    en: "205 gewog health units",
    dz: "རྒེད་འོག་འཕྲོད་བསྟེན་ས་ཚུགས་ ༢༠༥",
  },
  stat_sovereign_match: {
    en: "Sovereign Match",
    dz: "རྒྱལ་གཞུང་འདྲ་མཉམ།",
  },
  stat_guaranteed_rgob: {
    en: "Guaranteed by RGoB",
    dz: "འབྲུག་གཞུང་གི་ཁག་འཁྱགས།",
  },
};
