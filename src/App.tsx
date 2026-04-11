import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion, useAnimationControls, useScroll, useSpring } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Code2,
  ExternalLink,
  Filter,
  Shield,
  ChevronDown,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  MoonStar,
  Phone,
  Sparkles,
  Sun,
  Search,
  Trophy,
  Menu,
  X,
} from 'lucide-react'
import { Link, Route, Routes, useParams } from 'react-router-dom'

type Locale = 'en' | 'ar'
type Theme = 'dark' | 'light'

type ModalData = {
  title: string
  paragraphs?: string[]
  bullets?: readonly string[]
}

type LocaleText = {
  en: string
  ar: string
}

type ProjectOutlineSection = {
  heading: LocaleText
  points: LocaleText[]
}

type Project = {
  slug: string
  title: LocaleText
  githubUrl: string
  summary: LocaleText
  description: LocaleText
  outline: ProjectOutlineSection[]
  stack: string[]
  category: 'AI' | 'Platform' | 'Tool'
  year: string
  status: LocaleText
  gallery: string[]
  details: Array<{ label: LocaleText; value: LocaleText }>
}

const internalTransferGallery = [
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (1).jpeg', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (2).jpeg', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (3).jpeg', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (4).png', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (5).png', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (6).png', import.meta.url).href,
  new URL('./assets/Projects Images/Internal File Transfer Server/Screenshot (7).jpeg', import.meta.url).href,
]

const homeServerGallery = [
  new URL('./assets/Projects Images/Home Server/Screenshot (1).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (2).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (3).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (4).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (5).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (6).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (7).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (8).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (9).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (10).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (11).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (12).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (13).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (14).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (15).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (16).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (17).png', import.meta.url).href,
  new URL('./assets/Projects Images/Home Server/Screenshot (18).png', import.meta.url).href,
]

const projectCatalog: Project[] = [
  {
    slug: 'ai-food-classification',
    title: {
      en: 'AI-Based Food Classification & Calorie Estimation',
      ar: 'تصنيف الأطعمة وتقدير السعرات بالذكاء الاصطناعي',
    },
    githubUrl: 'https://github.com/Bader-ccsit/AI-Calories-Estimation-Using-ML',
    summary: {
      en: 'ResNet50 model with USDA integration for meal nutrition estimation.',
      ar: 'نموذج ResNet50 مع تكامل USDA لتقدير القيمة الغذائية للوجبات.',
    },
    description: {
      en: '🍽️ End-to-end AI project for food image understanding and calorie estimation. The pipeline uses Food-101 with ResNet50 fine-tuning to classify meals, then enriches predictions through 🔗 USDA nutrition data to estimate calories and key nutritional values. The output is presented in a structured format (predicted class + nutrition profile), making it suitable for practical health and meal-tracking scenarios while maintaining a clear ML workflow from dataset preparation to inference.',
      ar: '🍽️ مشروع ذكاء اصطناعي متكامل لفهم صور الطعام وتقدير السعرات. يعتمد على Food-101 مع ضبط نموذج ResNet50 لتصنيف الوجبات، ثم يربط النتائج مع 🔗 بيانات USDA الغذائية لتقدير السعرات والقيم الأساسية. تُعرض المخرجات بشكل منظم (الفئة المتوقعة + الملف الغذائي)، مما يجعله مناسبًا لتطبيقات صحية وتتبع الوجبات مع مسار واضح من إعداد البيانات حتى الاستدلال.',
    },
    outline: [
      {
        heading: { en: '🎯 Project Scope', ar: '🎯 نطاق المشروع' },
        points: [
          { en: 'Build an AI workflow for food recognition and calorie estimation.', ar: 'بناء مسار ذكاء اصطناعي للتعرف على الطعام وتقدير السعرات.' },
          { en: 'Connect model predictions with nutrition reference data.', ar: 'ربط نتائج النموذج ببيانات غذائية مرجعية.' },
        ],
      },
      {
        heading: { en: '⚙️ Core Implementation', ar: '⚙️ التنفيذ الأساسي' },
        points: [
          { en: 'ResNet50 fine-tuning on Food-101 for image classification.', ar: 'ضبط ResNet50 على Food-101 لتصنيف الصور.' },
          { en: 'USDA API integration for nutrition and calorie estimation.', ar: 'تكامل USDA API لحساب القيم الغذائية والسعرات.' },
          { en: 'Structured output: predicted class + nutrition profile.', ar: 'مخرجات منظمة: الفئة المتوقعة + الملف الغذائي.' },
        ],
      },
    ],
    stack: ['Python', 'TensorFlow', 'ResNet50', 'USDA API', 'Computer Vision'],
    category: 'AI',
    year: '2024',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: ['/logo.png', '/logo-original.png', '/logo.png'],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Food recognition + calorie estimation', ar: 'التعرف على الطعام + تقدير السعرات' },
      },
      {
        label: { en: 'Dataset', ar: 'مجموعة البيانات' },
        value: { en: 'Food-101', ar: 'Food-101' },
      },
      {
        label: { en: 'Model', ar: 'النموذج' },
        value: { en: 'ResNet50 fine-tuning', ar: 'ضبط دقيق لنموذج ResNet50' },
      },
      {
        label: { en: 'Output', ar: 'المخرجات' },
        value: { en: 'Predicted class + estimated nutrition', ar: 'الفئة المتوقعة + تقدير القيم الغذائية' },
      },
    ],
  },
  {
    slug: 'watheh-platform',
    title: { en: 'Watheh', ar: 'واضح' },
    githubUrl: 'https://github.com/Bader-ccsit/watheh',
    summary: {
      en: 'Video platform with discussion features and moderation workflows.',
      ar: 'منصة فيديو مع ميزات نقاش وتدفقات إشراف متكاملة.',
    },
    description: {
      en: '📺 واضح is a full educational video platform built with Flask backend and React (TypeScript) frontend, designed for multilingual learning environments (EN/AR with RTL). It includes 🔐 secure authentication with OTP verification, password recovery, and JWT sessions; rich video workflows (direct upload + Google Drive integration, metadata, visibility controls, comments/likes/views); and 💬 discussion spaces with interactive messaging. On top of that, it provides 🛡️ admin-level moderation and platform management, plus 📊 comprehensive audit/system logging for user actions, content interactions, and operational monitoring. Infrastructure support includes PostgreSQL, MinIO object storage, and production-oriented Docker deployment flow.',
      ar: '📺 واضح هي منصة فيديو تعليمية متكاملة مبنية على Flask في الخلفية وReact (TypeScript) في الواجهة، ومصممة لبيئة تعلم متعددة اللغات (عربي/إنجليزي مع RTL). تشمل 🔐 مصادقة آمنة عبر OTP واستعادة كلمة المرور وجلسات JWT؛ وتدفقات فيديو غنية (رفع مباشر + تكامل Google Drive، بيانات وصفية، إعدادات ظهور، تعليقات/إعجابات/مشاهدات)؛ إضافة إلى 💬 مساحات نقاش وتفاعل. كما توفر 🛡️ أدوات إشراف وإدارة متقدمة، مع 📊 سجل نظام شامل لتتبع أنشطة المستخدمين والتفاعلات والمراقبة التشغيلية. البنية تعتمد على PostgreSQL وMinIO وتدعم نمط نشر مهيأ للإنتاج عبر Docker.',
    },
    outline: [
      {
        heading: { en: '🔐 Authentication & Security', ar: '🔐 المصادقة والأمان' },
        points: [
          { en: 'Multi-method registration with OTP verification and JWT sessions.', ar: 'تسجيل متعدد الطرق مع OTP وجلسات JWT.' },
          { en: 'Password recovery and validation policies for account safety.', ar: 'استعادة كلمة المرور وسياسات تحقق تعزز أمان الحساب.' },
        ],
      },
      {
        heading: { en: '📺 Video & Discussion Features', ar: '📺 الفيديو وميزات النقاش' },
        points: [
          { en: 'Direct uploads + Google Drive integration with metadata controls.', ar: 'رفع مباشر + تكامل Google Drive مع تحكم بالبيانات الوصفية.' },
          { en: 'Likes, comments, views, discussions, and real-time interaction flows.', ar: 'إعجابات وتعليقات ومشاهدات ونقاشات وتدفقات تفاعل فورية.' },
        ],
      },
      {
        heading: { en: '🛡️ Admin & Monitoring', ar: '🛡️ الإدارة والمراقبة' },
        points: [
          { en: 'Admin dashboard for users/content moderation and system controls.', ar: 'لوحة إدارة للإشراف على المستخدمين والمحتوى وإعدادات المنصة.' },
          { en: 'Comprehensive logging and audit trails for platform activities.', ar: 'سجلات شاملة ومسارات تدقيق لجميع أنشطة المنصة.' },
        ],
      },
    ],
    stack: ['Flask', 'React TypeScript', 'PostgreSQL', 'MinIO', 'JWT', 'Docker'],
    category: 'Platform',
    year: '2024',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: [
      '/projects/watheh-platform/slide-03.png',
      '/projects/watheh-platform/slide-04.png',
      '/projects/watheh-platform/slide-05.png',
      '/projects/watheh-platform/slide-01.png',
      '/projects/watheh-platform/slide-02.png',
      '/projects/watheh-platform/slide-06.png',
      '/projects/watheh-platform/slide-07.png',
      '/projects/watheh-platform/slide-08.png',
      '/projects/watheh-platform/slide-09.png',
      '/projects/watheh-platform/slide-10.png',
      '/projects/watheh-platform/slide-11.png',
      '/projects/watheh-platform/slide-12.png',
      '/projects/watheh-platform/slide-13.png',
      '/projects/watheh-platform/slide-14.png',
    ],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Educational video delivery + discussion', ar: 'تقديم محتوى فيديو تعليمي + نقاشات' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Upload/stream, forums, moderation, logging', ar: 'رفع/بث، منتديات، إشراف، وسجلات' },
      },
      {
        label: { en: 'Auth & Security', ar: 'المصادقة والأمان' },
        value: { en: 'JWT + OTP verification + password recovery', ar: 'JWT + OTP + استعادة كلمة المرور' },
      },
      {
        label: { en: 'Admin Features', ar: 'خصائص الإدارة' },
        value: { en: 'User/content management + analytics logs', ar: 'إدارة المستخدمين/المحتوى + تحليلات السجلات' },
      },
    ],
  },
  {
    slug: 'swalif-social-app',
    title: { en: 'Swalif', ar: 'سوالف' },
    githubUrl: 'https://github.com/Bader-ccsit/Swalif',
    summary: {
      en: 'Cross-platform social app with groups, messaging, and bilingual UX.',
      ar: 'تطبيق اجتماعي متعدد المنصات مع مجموعات ورسائل وتجربة ثنائية اللغة.',
    },
    description: {
      en: '✅ سوالف is a modern social-media style platform centered on secure group chats and media sharing. The architecture combines Flask services with a React Native (Expo + TypeScript) mobile client, and includes authentication flows with verification/OTP, user preferences, and profile management. Core product capabilities include chat discovery with filters, group lifecycle management (create/edit/delete), real-time messaging UI, image sharing via MinIO, notifications, and friend/follow relationships. UX features include EN/AR localization with RTL handling, light/dark themes, and mobile-first navigation. The roadmap includes 🚧 private 1-on-1 messaging, video sharing, and advanced moderation controls.',
      ar: '✅ سوالف منصة اجتماعية حديثة تركز على الدردشات الجماعية الآمنة ومشاركة الوسائط. تعتمد على خدمات Flask مع تطبيق جوال React Native (Expo + TypeScript)، وتضم تدفقات مصادقة مع OTP والتحقق وتفضيلات المستخدم وإدارة الملف الشخصي. تشمل القدرات الأساسية اكتشاف الدردشات مع فلاتر، وإدارة المجموعات (إنشاء/تعديل/حذف)، وواجهة رسائل فورية، ورفع الصور عبر MinIO، ونظام إشعارات، وعلاقات متابعة/أصدقاء. من ناحية التجربة، تدعم العربية والإنجليزية مع RTL، إضافة إلى الوضع الداكن/الفاتح وتنقل ملائم للجوال. وتتضمن الخطة 🚧 الرسائل الخاصة الفردية، ومشاركة الفيديو، وخصائص إشراف متقدمة.',
    },
    outline: [
      {
        heading: { en: '✅ Core Product Features', ar: '✅ الميزات الأساسية' },
        points: [
          { en: 'Secure group chats, media sharing, and real-time messaging.', ar: 'دردشات جماعية آمنة ومشاركة وسائط ورسائل فورية.' },
          { en: 'Chat discovery/search with filters and My Chats management.', ar: 'اكتشاف وبحث الدردشات مع فلاتر وإدارة دردشاتي.' },
          { en: 'Friends/followers system and notification center.', ar: 'نظام أصدقاء/متابعين ومركز إشعارات.' },
        ],
      },
      {
        heading: { en: '⚙️ Architecture & Stack', ar: '⚙️ البنية والتقنيات' },
        points: [
          { en: 'Flask API + PostgreSQL + Redis + Celery + MinIO backend services.', ar: 'خلفية Flask مع PostgreSQL وRedis وCelery وMinIO.' },
          { en: 'React Native + Expo + TypeScript mobile frontend.', ar: 'واجهة جوال React Native + Expo + TypeScript.' },
          { en: 'EN/AR localization, RTL support, and dark/light themes.', ar: 'دعم عربي/إنجليزي وRTL مع الوضع الداكن/الفاتح.' },
        ],
      },
      {
        heading: { en: '🚧 Roadmap', ar: '🚧 خارطة الطريق' },
        points: [
          { en: '1-on-1 private messaging and video sharing.', ar: 'الرسائل الخاصة الفردية ومشاركة الفيديو.' },
          { en: 'Advanced moderation and real-time backend triggers.', ar: 'إشراف متقدم ومحفزات لحظية في الخلفية.' },
        ],
      },
    ],
    stack: ['Flask', 'React Native', 'PostgreSQL', 'Redis', 'Celery', 'MinIO', 'JWT'],
    category: 'Platform',
    year: '2024',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: [
      '/projects/swalif-social-app/slide-10.png',
      '/projects/swalif-social-app/slide-11.png',
      '/projects/swalif-social-app/slide-01.png',
      '/projects/swalif-social-app/slide-02.png',
      '/projects/swalif-social-app/slide-03.png',
      '/projects/swalif-social-app/slide-04.png',
      '/projects/swalif-social-app/slide-05.png',
      '/projects/swalif-social-app/slide-06.png',
      '/projects/swalif-social-app/slide-07.png',
      '/projects/swalif-social-app/slide-08.png',
      '/projects/swalif-social-app/slide-09.png',
    ],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Secure group social experience', ar: 'تجربة اجتماعية جماعية آمنة' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Group chat, media sharing, notifications', ar: 'دردشات جماعية، مشاركة وسائط، إشعارات' },
      },
      {
        label: { en: 'Frontend', ar: 'الواجهة' },
        value: { en: 'React Native + Expo + TypeScript', ar: 'React Native + Expo + TypeScript' },
      },
      {
        label: { en: 'Status', ar: 'الحالة التطويرية' },
        value: { en: 'Core complete, private messaging in progress', ar: 'الأساس مكتمل، الرسائل الخاصة قيد التطوير' },
      },
    ],
  },
  {
    slug: '7mlny-downloader',
    title: { en: '7mlny', ar: 'حملني' },
    githubUrl: 'https://github.com/Bader-ccsit/7mlny',
    summary: {
      en: 'Responsive media downloader with Flask backend and yt-dlp integration.',
      ar: 'منصة تحميل وسائط متجاوبة مع خلفية Flask وتكامل yt-dlp.',
    },
    description: {
      en: '🚀 حملني is a modern media downloader built with a React + TypeScript frontend and Flask backend, focused on clean downloads from major social/video platforms. It provides 🧼 watermark-free outputs, 🎞️ format and quality selection, and real-time metadata preview before download. Under the hood, it uses yt-dlp for robust extraction, URL validation, and reliable multi-platform support (YouTube, Instagram, TikTok, X/Twitter, Facebook, and more). The UI is responsive and mobile-friendly, with clear loading/error states and straightforward API endpoints for info retrieval and download execution.',
      ar: '🚀 حملني منصة تحميل وسائط حديثة مبنية على React + TypeScript في الواجهة وFlask في الخلفية، وتركز على تنزيلات نظيفة من أشهر المنصات. توفر 🧼 مخرجات بدون علامة مائية، و🎞️ اختيار الصيغة والجودة، ومعاينة بيانات المحتوى قبل التنزيل. تقنيًا تعتمد على yt-dlp لاستخراج موثوق وتحقق من الروابط ودعم واسع للمنصات (YouTube وInstagram وTikTok وX/Facebook وغيرها). الواجهة متجاوبة ومناسبة للجوال، مع حالات تحميل/أخطاء واضحة ونقاط API مباشرة لجلب المعلومات وتنفيذ التنزيل.',
    },
    outline: [
      {
        heading: { en: '🚀 Product Highlights', ar: '🚀 أبرز مزايا المنتج' },
        points: [
          { en: 'Multi-platform downloading with watermark-free output.', ar: 'تحميل من منصات متعددة مع مخرجات بدون علامة مائية.' },
          { en: 'Preview media info before download with format/quality selection.', ar: 'معاينة معلومات الوسائط قبل التحميل مع اختيار الصيغة والجودة.' },
        ],
      },
      {
        heading: { en: '🛠️ Technical Stack', ar: '🛠️ المكدس التقني' },
        points: [
          { en: 'Frontend: React + TypeScript + Tailwind + Axios.', ar: 'الواجهة: React + TypeScript + Tailwind + Axios.' },
          { en: 'Backend: Flask + yt-dlp + validation/CORS handling.', ar: 'الخلفية: Flask + yt-dlp + التحقق من الروابط وCORS.' },
          { en: 'API endpoints for info retrieval and download execution.', ar: 'نقاط API لجلب معلومات المحتوى وتنفيذ التحميل.' },
        ],
      },
      {
        heading: { en: '🌐 Supported Platforms', ar: '🌐 المنصات المدعومة' },
        points: [
          { en: 'YouTube, Instagram, Twitter/X, TikTok, Facebook, Snapchat, and more.', ar: 'YouTube وInstagram وTwitter/X وTikTok وFacebook وSnapchat وغيرها.' },
        ],
      },
    ],
    stack: ['React TypeScript', 'Flask', 'yt-dlp', 'Tailwind CSS', 'Axios'],
    category: 'Tool',
    year: '2024',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: [
      '/projects/7mlny-downloader/slide-01.png',
      '/projects/7mlny-downloader/slide-02.png',
      '/projects/7mlny-downloader/slide-03.png',
      '/projects/7mlny-downloader/slide-04.png',
      '/projects/7mlny-downloader/slide-05.png',
    ],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Watermark-free media downloads', ar: 'تحميل وسائط بدون علامة مائية' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Info preview + format/quality selection', ar: 'معاينة المحتوى + اختيار الصيغة/الجودة' },
      },
      {
        label: { en: 'Supported Platforms', ar: 'المنصات المدعومة' },
        value: { en: 'YouTube, Instagram, TikTok, X, Facebook + more', ar: 'يوتيوب، إنستغرام، تيك توك، X، فيسبوك وغيرها' },
      },
      {
        label: { en: 'API Endpoints', ar: 'نقاط API' },
        value: { en: '/api/info, /api/download, /api/supported-platforms', ar: '/api/info و /api/download و /api/supported-platforms' },
      },
    ],
  },
  {
    slug: 'internal-file-transfer-server',
    title: { en: 'Internal File Transfer Server', ar: 'خادم نقل ملفات داخلي' },
    githubUrl: 'https://github.com/Bader-ccsit/internal_server',
    summary: {
      en: 'Local IPv4 file sharing with Flask, Tkinter GUI, and QR-based access.',
      ar: 'مشاركة ملفات محلية عبر IPv4 باستخدام Flask وواجهة Tkinter ووصول QR.',
    },
    description: {
      en: '🖥️ Cross-device local transfer tool that combines a Tkinter desktop control panel with a 🌐 Flask web upload interface. The app starts/stops a local server, shows server status + IP, and generates a 📱 QR code for instant mobile connection on the same network. Users can upload files and text from nearby devices, preview uploaded content quickly, and manage transfers without complex setup. The project emphasizes simplicity, practical LAN workflows, and a lightweight implementation using Flask, Pillow, and qrcode utilities.',
      ar: '🖥️ أداة نقل محلية بين الأجهزة تجمع بين لوحة تحكم مكتبية عبر Tkinter وواجهة رفع 🌐 مبنية على Flask. يتيح التطبيق تشغيل/إيقاف الخادم المحلي، عرض حالة الخادم وعنوان IP، وتوليد 📱 رمز QR للاتصال السريع من الأجهزة على نفس الشبكة. يمكن للمستخدمين رفع ملفات ونصوص من الأجهزة القريبة مع معاينة سريعة للمحتوى المرفوع، دون إعدادات معقدة. يركز المشروع على البساطة وسيناريوهات LAN العملية وتنفيذ خفيف باستخدام Flask وPillow وqrcode.',
    },
    outline: [
      {
        heading: { en: '🖥️ Desktop Control Layer', ar: '🖥️ طبقة التحكم المكتبية' },
        points: [
          { en: 'Tkinter panel to start/stop local Flask server and view status/IP.', ar: 'لوحة Tkinter لتشغيل/إيقاف خادم Flask المحلي وعرض الحالة وIP.' },
          { en: 'Auto-generated QR code for fast phone access.', ar: 'توليد QR تلقائي للوصول السريع من الهاتف.' },
        ],
      },
      {
        heading: { en: '🌐 Web Upload Interface', ar: '🌐 واجهة الرفع عبر الويب' },
        points: [
          { en: 'Upload files and text from devices on the same network.', ar: 'رفع ملفات ونصوص من الأجهزة على نفس الشبكة.' },
          { en: 'Preview uploaded items and maintain lightweight transfer workflow.', ar: 'معاينة العناصر المرفوعة مع تدفق نقل خفيف وسريع.' },
        ],
      },
      {
        heading: { en: '📦 Implementation Notes', ar: '📦 ملاحظات التنفيذ' },
        points: [
          { en: 'Built with Flask, Tkinter, Pillow, and qrcode utilities.', ar: 'مبني باستخدام Flask وTkinter وPillow وqrcode.' },
          { en: 'Designed for practical LAN sharing scenarios.', ar: 'مصمم لسيناريوهات مشاركة عملية داخل الشبكة المحلية.' },
        ],
      },
    ],
    stack: ['Python', 'Flask', 'Tkinter', 'Pillow', 'qrcode'],
    category: 'Tool',
    year: '2023',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: internalTransferGallery,
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Fast LAN-based file transfer', ar: 'نقل ملفات سريع عبر الشبكة المحلية' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Desktop server control + QR upload access', ar: 'تحكم مكتبي بالخادم + وصول رفع عبر QR' },
      },
      {
        label: { en: 'Desktop App', ar: 'تطبيق سطح المكتب' },
        value: { en: 'Server start/stop, IP status, preview uploads', ar: 'تشغيل/إيقاف الخادم، حالة IP، معاينة المرفوعات' },
      },
      {
        label: { en: 'Web UI', ar: 'واجهة الويب' },
        value: { en: 'File upload, text upload, uploaded files listing', ar: 'رفع ملفات، رفع نصوص، عرض الملفات المرفوعة' },
      },
    ],
  },
  {
    slug: 'movie-recommendation-system',
    title: { en: 'Movie Recommendation System', ar: 'نظام توصية الأفلام' },
    githubUrl: 'https://github.com/Bader-ccsit/Movie-Recommendation-System.git',
    summary: {
      en: 'Modern Flask recommendation platform with TF-IDF similarity and advanced filters.',
      ar: 'منصة توصية حديثة بـ Flask تعتمد على TF-IDF والتشابه مع فلاتر متقدمة.',
    },
    description: {
      en: '🎬 A full-stack recommendation web app that combines data prep and intelligent matching. The backend uses Flask and data science tooling to generate content-based suggestions with TF-IDF and cosine similarity, while the UI provides smooth discovery flows with search and filters. It supports movie metadata exploration and integrates poster retrieval through TMDb, creating a practical recommendation experience from model logic to end-user interface.',
      ar: '🎬 تطبيق توصية متكامل يجمع بين تجهيز البيانات ومنطق المطابقة الذكي. يعتمد على Flask مع أدوات علم البيانات لبناء توصيات قائمة على المحتوى باستخدام TF-IDF وcosine similarity، مع واجهة سهلة للبحث والاستكشاف. يدعم استعراض بيانات الأفلام ويتكامل مع TMDb لجلب الملصقات، ليقدم تجربة توصية عملية من منطق التحليل حتى واجهة المستخدم.',
    },
    outline: [
      {
        heading: { en: '🧠 Recommendation Core', ar: '🧠 نواة التوصية' },
        points: [
          { en: 'TF-IDF vectorization and cosine similarity drive related-movie suggestions.', ar: 'الاعتماد على TF-IDF وcosine similarity لتوليد اقتراحات أفلام مشابهة.' },
          { en: 'Content signals include genres, language, rating, and release-window constraints.', ar: 'إشارات المحتوى تشمل النوع واللغة والتصنيف ونطاق سنة الإصدار.' },
        ],
      },
      {
        heading: { en: '🔎 Discovery Experience', ar: '🔎 تجربة الاستكشاف' },
        points: [
          { en: 'Search-first flow with advanced filtering by genre, rating, language, and year range.', ar: 'تدفق بحث مع فلاتر متقدمة حسب النوع والتصنيف واللغة ونطاق السنوات.' },
          { en: 'Detailed movie views with dynamic poster loading for richer browsing.', ar: 'صفحات تفاصيل للأفلام مع تحميل ملصقات ديناميكي لتحسين تجربة الاستعراض.' },
        ],
      },
      {
        heading: { en: '📦 Data Workflow', ar: '📦 سير البيانات' },
        points: [
          { en: 'Dataset prepared through collection/cleaning notebooks before app consumption.', ar: 'إعداد وتنظيف البيانات عبر دفاتر التحليل قبل استخدامها داخل التطبيق.' },
          { en: 'Structured datasets enable reproducible recommendations and easier model iteration.', ar: 'بيانات منظمة تضمن توصيات قابلة للتكرار وتسهل تحسين النموذج.' },
        ],
      },
    ],
    stack: ['Flask', 'Pandas', 'scikit-learn', 'TF-IDF', 'Cosine Similarity', 'TMDb API'],
    category: 'AI',
    year: '2023',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: [
      '/projects/movie-recommendation-system/slide-01.png',
      '/projects/movie-recommendation-system/slide-02.png',
      '/projects/movie-recommendation-system/slide-03.png',
      '/projects/movie-recommendation-system/slide-04.png',
      '/projects/movie-recommendation-system/slide-05.png',
      '/projects/movie-recommendation-system/slide-07.png',
      '/projects/movie-recommendation-system/slide-08.png',
      '/projects/movie-recommendation-system/slide-09.png',
      '/projects/movie-recommendation-system/slide-10.png',
      '/projects/movie-recommendation-system/slide-11.png',
    ],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Accurate and explainable movie recommendations', ar: 'توصيات أفلام دقيقة وقابلة للفهم' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'TF-IDF + cosine similarity recommendation engine', ar: 'محرك توصية يعتمد TF-IDF + cosine similarity' },
      },
      {
        label: { en: 'Filters', ar: 'الفلاتر' },
        value: { en: 'Genre, rating, language, and release year range', ar: 'النوع، التصنيف، اللغة، ونطاق سنة الإصدار' },
      },
      {
        label: { en: 'Poster Source', ar: 'مصدر الملصقات' },
        value: { en: 'TMDb API integration', ar: 'تكامل مع TMDb API' },
      },
    ],
  },
  {
    slug: 'hotel-management-system',
    title: { en: 'Hotel Management System', ar: 'نظام إدارة الفنادق' },
    githubUrl: 'https://github.com/Bader-ccsit/Hotel-Managment-System.git',
    summary: {
      en: 'Full-stack reservation platform with secure auth, booking workflows, and admin controls.',
      ar: 'منصة حجز متكاملة بمصادقة آمنة وتدفقات حجز وإدارة بصلاحيات إدارية.',
    },
    description: {
      en: '🏨 A full-stack hotel operations web app built with Flask and PostgreSQL for booking and account management. Users can browse available rooms, create reservations, and manage existing bookings, while administrators can monitor reservations and user records from a dedicated dashboard. The system includes hashed-password authentication, account recovery via security questions, and practical CRUD flows designed for real hotel reservation scenarios.',
      ar: '🏨 تطبيق ويب متكامل لإدارة عمليات الفنادق مبني بـ Flask وPostgreSQL لإدارة الحجز والحسابات. يمكن للمستخدمين استعراض الغرف المتاحة وإنشاء حجوزات وإدارة حجوزاتهم الحالية، بينما يتيح قسم الإدارة متابعة الحجوزات وبيانات المستخدمين عبر لوحة مخصصة. يتضمن النظام مصادقة آمنة بكلمات مرور مُشفرة، واستعادة الحساب عبر أسئلة الأمان، وتدفقات CRUD عملية لسيناريوهات الحجز الواقعية.',
    },
    outline: [
      {
        heading: { en: '🛏️ Reservation Flow', ar: '🛏️ تدفق الحجز' },
        points: [
          { en: 'Room browsing with reservation creation, update, and cancellation.', ar: 'استعراض الغرف مع إنشاء الحجز وتعديله وإلغائه.' },
          { en: 'User-centric booking history and account-linked reservation management.', ar: 'سجل حجوزات مرتبط بالحساب وإدارة كاملة للحجوزات.' },
        ],
      },
      {
        heading: { en: '🔒 Security & Accounts', ar: '🔒 الأمان والحسابات' },
        points: [
          { en: 'Credential handling with hashed passwords and authentication checks.', ar: 'حماية بيانات الدخول عبر كلمات مرور مُشفرة وتحقق مصادقة.' },
          { en: 'Forgot-password support through security-question based recovery.', ar: 'دعم استعادة كلمة المرور عبر أسئلة الأمان.' },
        ],
      },
      {
        heading: { en: '🛠️ Admin Operations', ar: '🛠️ عمليات الإدارة' },
        points: [
          { en: 'Admin dashboard for viewing all bookings and user-level data.', ar: 'لوحة إدارة لعرض جميع الحجوزات وبيانات المستخدمين.' },
          { en: 'Operational controls for day-to-day reservation oversight.', ar: 'أدوات تشغيلية لمتابعة وإدارة الحجوزات اليومية.' },
        ],
      },
    ],
    stack: ['Flask', 'PostgreSQL', 'Jinja2', 'HTML/CSS', 'psycopg2'],
    category: 'Platform',
    year: '2023',
    status: { en: 'Completed', ar: 'مكتمل' },
    gallery: [
      '/projects/hotel-management-system/slide-01.png',
      '/projects/hotel-management-system/slide-02.png',
      '/projects/hotel-management-system/slide-03.png',
      '/projects/hotel-management-system/slide-04.png',
      '/projects/hotel-management-system/slide-05.png',
      '/projects/hotel-management-system/slide-06.png',
      '/projects/hotel-management-system/slide-07.png',
    ],
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Reliable hotel room reservation management', ar: 'إدارة موثوقة لحجوزات غرف الفنادق' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Room booking lifecycle with account-based control', ar: 'دورة حجز متكاملة مرتبطة بحساب المستخدم' },
      },
      {
        label: { en: 'Security', ar: 'الأمان' },
        value: { en: 'Hashed passwords + security-question recovery', ar: 'كلمات مرور مُشفرة + استعادة عبر أسئلة الأمان' },
      },
      {
        label: { en: 'Admin Dashboard', ar: 'لوحة الإدارة' },
        value: { en: 'Bookings and user management visibility', ar: 'عرض شامل لإدارة الحجوزات والمستخدمين' },
      },
    ],
  },
  {
    slug: 'home-server-platform',
    title: { en: 'HomeServer', ar: 'هوم سيرفر' },
    githubUrl: 'https://github.com/Bader-ccsit/Home-Server',
    summary: {
      en: 'Comprehensive multi-service home platform with modular NestJS APIs, React web UI, OTP-secured flows, PostgreSQL persistence, and optional MinIO storage.',
      ar: 'منصة منزلية متكاملة متعددة الخدمات تعتمد على NestJS المعياري وواجهة React وتدفقات محمية بـ OTP مع PostgreSQL ودعم تخزين اختياري عبر MinIO.',
    },
    description: {
      en: '🏠 HomeServer is a large modular home platform designed to run multiple services under one unified account and dashboard experience. The project is organized as a full-stack workspace with a React + Vite frontend and a NestJS + TypeORM backend, backed by PostgreSQL and extendable with MinIO for object storage use cases. On the user side, it delivers account onboarding (signup/signin, OTP activation, token-based sessions), media modules (Aflami for movies and Al3abi for games), utility workflows (PasteMe sharing for text/files with expiry windows), and secure vault operations (Secrets with OTP-gated access to sensitive credentials). On the operational side, it includes SQL/bootstrap scripts, env-driven configuration, module-based backend architecture, and practical local-first development commands for parallel API/UI execution. This makes the platform not just a single app, but a service hub where each section can evolve independently while still sharing a common auth, storage, and persistence layer.',
      ar: '🏠 HomeServer منصة منزلية كبيرة ومقسمة إلى وحدات معيارية، هدفها جمع عدة خدمات في تجربة موحدة بحساب واحد ولوحة استخدام واحدة. المشروع مبني كبيئة Full-Stack متكاملة: واجهة React + Vite وخلفية NestJS + TypeORM مع قاعدة بيانات PostgreSQL، مع قابلية التوسعة عبر MinIO لحالات تخزين الملفات والكائنات. من جهة المستخدم، توفر المنصة مسار مصادقة متكامل (تسجيل/دخول، تفعيل OTP، جلسات مبنية على التوكن)، ووحدات وسائط (Aflami للأفلام وAl3abi للألعاب)، وخدمات عملية (PasteMe لمشاركة النصوص/الملفات مع صلاحية زمنية)، وخزنة أسرار آمنة (Secrets) محمية بطبقة OTP قبل الوصول للبيانات الحساسة. ومن جهة التشغيل، تتضمن سكربتات تهيئة قاعدة البيانات، وإعدادات تشغيل عبر متغيرات البيئة، وبنية معيارية واضحة في الخلفية، وأوامر تطوير عملية لتشغيل الواجهة والخلفية بالتوازي. لذلك HomeServer ليس مجرد تطبيق واحد، بل منصة خدمات يمكن تطوير كل قسم فيها بشكل مستقل مع الحفاظ على طبقة مصادقة وتخزين وبيانات مشتركة.',
    },
    outline: [
      {
        heading: { en: '🔐 Authentication & Identity', ar: '🔐 المصادقة وإدارة الهوية' },
        points: [
          { en: 'Signup/signin workflows with OTP activation and token-based session handling.', ar: 'مسارات تسجيل/دخول مع تفعيل OTP وإدارة الجلسات عبر التوكن.' },
          { en: 'Security-focused account lifecycle that centralizes user identity across all modules.', ar: 'دورة حساب آمنة توحد هوية المستخدم عبر جميع وحدات المنصة.' },
        ],
      },
      {
        heading: { en: '🎬 Media & Utility Modules', ar: '🎬 وحدات الوسائط والأدوات' },
        points: [
          { en: 'Aflami and Al3abi modules for managing movie/game records with dedicated backend endpoints.', ar: 'وحدتا Aflami وAl3abi لإدارة محتوى الأفلام والألعاب عبر نقاط خلفية مخصصة.' },
          { en: 'PasteMe supports quick text/file sharing with expiry windows for temporary sharing use cases.', ar: 'PasteMe يدعم مشاركة النصوص/الملفات بسرعة مع صلاحية زمنية لحالات المشاركة المؤقتة.' },
          { en: 'Secrets module introduces OTP-gated access for sensitive credentials and protected retrieval flows.', ar: 'وحدة Secrets تضيف طبقة حماية OTP للوصول إلى البيانات الحساسة واسترجاعها بشكل آمن.' },
        ],
      },
      {
        heading: { en: '🏗️ Architecture, Data, and Ops', ar: '🏗️ البنية والبيانات والتشغيل' },
        points: [
          { en: 'Frontend stack: React + TypeScript + Vite + TailwindCSS for fast modular UI development.', ar: 'تقنيات الواجهة: React + TypeScript + Vite + TailwindCSS لتطوير واجهات سريعة ومقسمة.' },
          { en: 'Backend stack: NestJS + TypeORM with module boundaries and PostgreSQL persistence.', ar: 'تقنيات الخلفية: NestJS + TypeORM مع حدود معيارية للوحدات وحفظ بيانات عبر PostgreSQL.' },
          { en: 'Optional MinIO storage plus SQL/bootstrap scripts and environment-based configuration for local-first setup.', ar: 'تخزين اختياري عبر MinIO مع سكربتات SQL/تهيئة وإعدادات بيئة لتشغيل محلي عملي.' },
        ],
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'NestJS', 'TypeORM', 'PostgreSQL', 'MinIO'],
    category: 'Platform',
    year: '2026',
    status: { en: 'In Progress', ar: 'قيد التطوير' },
    gallery: homeServerGallery,
    details: [
      {
        label: { en: 'Primary Goal', ar: 'الهدف الرئيسي' },
        value: { en: 'Unified multi-service home platform', ar: 'منصة منزلية موحدة متعددة الخدمات' },
      },
      {
        label: { en: 'Core Feature', ar: 'الميزة الأساسية' },
        value: { en: 'Auth + media + sharing + secrets in one modular service hub', ar: 'مصادقة + وسائط + مشاركة + أسرار ضمن منصة معيارية موحدة' },
      },
      {
        label: { en: 'Auth Security', ar: 'أمن المصادقة' },
        value: { en: 'OTP activation and OTP-gated secret access flows', ar: 'تفعيل OTP وحماية الوصول للأسرار عبر طبقة OTP' },
      },
      {
        label: { en: 'Architecture', ar: 'البنية' },
        value: { en: 'React + Vite frontend, NestJS + TypeORM backend, PostgreSQL database', ar: 'واجهة React + Vite، وخلفية NestJS + TypeORM، وقاعدة PostgreSQL' },
      },
      {
        label: { en: 'Storage & Ops', ar: 'التخزين والتشغيل' },
        value: { en: 'Optional MinIO + bootstrap scripts + environment-driven deployment config', ar: 'MinIO اختياري + سكربتات تهيئة + إعداد تشغيل عبر متغيرات البيئة' },
      },
    ],
  },
]

const content = {
  en: {
    nav: ['Overview', 'Objective', 'Experience', 'Projects', 'Extras', 'Contact'],
    role: 'Software Engineer',
    intro:
      'Fresh Computer Science graduate specialized in full-stack engineering and AI, delivering secure and production-ready systems.',
    objectiveTitle: 'Objective',
    objectivePoints: [
      'Computer Science graduate from King Faisal University.',
      'Strong foundation in full-stack engineering and AI systems.',
      'Focused on secure, scalable, and production-ready solutions.',
    ],
    educationTitle: 'Education',
    additionalCoursesTitle: 'Additional Courses',
    skillsTitle: 'Skills & Technologies',
    experienceTitle: 'Professional Experience',
    timelineTitle: 'Internship Journey at Innosoft',
    certificationsLabel: 'Certifications & Courses',
    languagesLabel: 'Languages',
    activitiesLabel: 'Extracurricular Activities',
    projectsTitle: 'Featured Projects',
    extrasTitle: 'Certifications, Languages & Activities',
    contactTitle: 'Let us Build Something Great',
    resume: 'Download Resume',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    website: 'My Website',
    toggleTheme: 'Toggle theme',
    toggleLang: 'Arabic / English',
    menuTitle: 'Quick Menu',
    brandMark: 'Eng.',
    menuReserved: 'Copyright © Bader Sami Alkhamees. All rights reserved.',
    loadingLabel: 'Loading portfolio...',
    close: 'Close',
    viewMore: 'View Details',
    footerContact: 'Contact Info',
    rights: 'Designed and built with React and inspired motion.',
    cta: 'Open GitHub Profile',
    subtitleObjective: 'Academic foundation and practical readiness for real-world software delivery.',
    subtitleExperience: 'Built secure, scalable, and AI-enabled systems in a production team environment.',
    subtitleProjects: 'Selected portfolio work across AI, web platforms, and productivity tools.',
    sinceLabel: 'Since 2026',
    graduationLabel: 'Graduated',
    fullName: 'Bader Sami Alkhamees',
    headerName: 'Bader Sami Alkhamees',
    educationUniversity: 'King Faisal University',
    majorLabel: 'Major',
    majorValue: 'Computer Science',
    gpaLabel: 'GPA',
    gpaValue: '3.98 / 5',
    courses: [
      'Advanced Software Engineering',
      'Software Security',
      'Web Penetration Testing',
      'Advanced Programming Languages (.NET Framework)',
    ],
    projects: [
      {
        name: 'AI-Based Food Classification & Calorie Estimation',
        details:
          'Built a ResNet50 model on Food-101 and integrated USDA API for nutritional estimates based on predicted meals.',
      },
      {
        name: 'Watheh',
        details:
          'A YouTube-like platform with video CRUD and group-chat style discussions for collaborative interaction.',
      },
      {
        name: 'Swalif',
        details:
          'Cross-platform social app with secure groups, real-time messaging, MinIO media handling, bilingual UI, and dark mode.',
      },
      {
        name: '7mlny',
        details:
          'Responsive media downloader with Flask REST backend, React frontend, and yt-dlp integration for multiple platforms.',
      },
      {
        name: 'Internal File Transfer Server',
        details:
          'Cross-platform local IPv4 transfer tool with Flask + Tkinter GUI, QR sharing, and easy upload/download workflows.',
      },
      {
        name: 'HomeServer',
        details:
          'Modular home platform with NestJS + React, OTP auth, movies/games modules, PasteMe sharing, secrets vault, and PostgreSQL persistence.',
      },
      {
        name: 'Movie Recommendation System',
        details:
          'Content-based recommendation platform using TF-IDF + cosine similarity, advanced filtering, and dynamic poster retrieval.',
      },
      {
        name: 'Hotel Management System',
        details:
          'Full-stack Flask + PostgreSQL booking platform with secure authentication, reservation lifecycle management, and admin dashboard.',
      },
    ],
    skillGroups: [
      'Programming: Python (Flask, Django), Java, C++',
      'AI/ML: TensorFlow, PyTorch, Scikit-learn',
      'Web/Mobile: HTML, CSS, JavaScript, React, React-Native, Vue.js, NestJS, REST APIs, JWT',
      'Cybersecurity: Network Security, Ethical Hacking, Cryptography',
      'Databases: MySQL, PostgreSQL',
      'Tools: Git, Linux, Docker, MinIO, ERPNext (Frappe), Virtual Machines',
    ],
    certifications: [
      'IT Essentials - CyberHub (Cisco)',
      'CCNAv7: Introduction to Networks - CyberHub (Cisco)',
      'CyberOps Associate - CyberHub (Cisco)',
      'Coursera Courses in AI, Statistics, and Professional Skills',
    ],
    activities: [
      'Member of the AI and Cybersecurity Club at the College',
      'Founding and active member of the Peer Tutoring Interactive Club',
      'Participated in multiple University coding workshops',
    ],
    nativeLanguage: 'Arabic: Native',
    fluentLanguage: 'English: Very Fluent (Almost Native)',
    companyLabel: 'Innosoft',
    cityCountry: 'Dammam, Saudi Arabia',
    projectsLinkLabel: 'View all projects',
    searchPlaceholder: 'Search projects, stack, or keyword...',
    filterLabel: 'Filter',
    sortLabel: 'Sort',
    filterAll: 'All',
    sortNewest: 'Newest',
    sortAToZ: 'A to Z',
    openProject: 'Open project',
    openInGithub: 'Open in GitHub',
    backToProjects: 'Back to projects',
    stackUsed: 'Built with',
    projectDescription: 'Description',
    projectDetails: 'Project details',
    noProjectFound: 'No matching project found. Try another keyword or filter.',
    prevSlide: 'Previous',
    nextSlide: 'Next',
    experienceIntro: '6-month cooperative training at Innosoft (my only professional training experience).',
    experiencePoints: [
      'Built and maintained full-stack applications with NestJS, Flask, React, Vue.js, and PostgreSQL.',
      'Led backend work on InternHub with secure authentication, role-based access, and REST APIs.',
      'Implemented AI sentiment-analysis middleware with JWT authorization and bulk processing.',
      'Contributed to Watheh and ERPNext/Frappe features, performance optimization, and deployment readiness.',
    ],
  },
  ar: {
    nav: ['نبذة', 'الهدف', 'الخبرة', 'المشاريع', 'إضافات', 'التواصل'],
    role: 'مهندس برمجيات',
    intro:
      'خريج علوم حاسب متخصص في تطوير الأنظمة والذكاء الاصطناعي، مع تركيز على حلول آمنة وجاهزة للإطلاق.',
    objectiveTitle: 'الهدف المهني',
    objectivePoints: [
      'خريج علوم حاسب من جامعة الملك فيصل.',
      'أساس قوي في تطوير الأنظمة والذكاء الاصطناعي.',
      'تركيز على حلول آمنة وقابلة للتوسع وجاهزة للإنتاج.',
    ],
    educationTitle: 'التعليم',
    additionalCoursesTitle: 'دورات إضافية',
    skillsTitle: 'المهارات والتقنيات',
    experienceTitle: 'الخبرة العملية',
    timelineTitle: 'رحلة التدريب في Innosoft',
    certificationsLabel: 'الشهادات والدورات',
    languagesLabel: 'اللغات',
    activitiesLabel: 'الأنشطة اللامنهجية',
    projectsTitle: 'المشاريع المميزة',
    extrasTitle: 'الشهادات واللغات والأنشطة',
    contactTitle: 'لنصنع شيئًا رائعًا',
    resume: 'تحميل السيرة الذاتية',
    github: 'جيت هب',
    linkedin: 'لينكدإن',
    website: 'موقعي',
    toggleTheme: 'تبديل المظهر',
    toggleLang: 'عربي / English',
    menuTitle: 'القائمة السريعة',
    brandMark: 'مهندس',
    menuReserved: 'حقوق النشر © بدر سامي الخميس. جميع الحقوق محفوظة.',
    loadingLabel: 'جاري تحميل الملف الشخصي...',
    close: 'إغلاق',
    viewMore: 'عرض التفاصيل',
    footerContact: 'معلومات التواصل',
    rights: 'تم التصميم والتطوير باستخدام React وحركة حديثة.',
    cta: 'عرض GitHub',
    subtitleObjective: 'أساس أكاديمي قوي واستعداد عملي لتقديم حلول برمجية واقعية.',
    subtitleExperience: 'تنفيذ أنظمة آمنة وقابلة للتوسع ومدعومة بالذكاء الاصطناعي ضمن فريق إنتاجي.',
    subtitleProjects: 'مجموعة مشاريع مختارة في الذكاء الاصطناعي ومنصات الويب وأدوات الإنتاجية.',
    sinceLabel: 'منذ 2026',
    graduationLabel: 'خريج',
    fullName: 'بدر سامي الخميس',
    headerName: 'بدر سامي الخميس',
    educationUniversity: 'جامعة الملك فيصل',
    majorLabel: 'التخصص',
    majorValue: 'علوم الحاسب',
    gpaLabel: 'المعدل',
    gpaValue: '3.98 / 5',
    courses: [
      'هندسة البرمجيات المتقدمة',
      'أمن البرمجيات',
      'اختبار اختراق تطبيقات الويب',
      'لغات البرمجة المتقدمة (.NET Framework)',
    ],
    projects: [
      {
        name: 'تصنيف الأطعمة وتقدير السعرات بالذكاء الاصطناعي',
        details: 'تطوير نموذج ResNet50 على مجموعة Food-101 وربطه بواجهة USDA لتقدير القيم الغذائية للوجبات المتوقعة.',
      },
      {
        name: 'واتِه',
        details: 'منصة شبيهة بيوتيوب مع إدارة فيديو كاملة ونقاشات تفاعلية بأسلوب المجموعات.',
      },
      {
        name: 'سوالف',
        details: 'تطبيق اجتماعي متعدد المنصات بمجموعات آمنة، رسائل فورية، إدارة وسائط عبر MinIO، ودعم ثنائي اللغة والوضع الداكن.',
      },
      {
        name: 'حملني',
        details: 'منصة تحميل وسائط متجاوبة بواجهة React وخلفية Flask ودمج yt-dlp لعدة منصات.',
      },
      {
        name: 'خادم نقل ملفات داخلي',
        details: 'أداة نقل محلية عبر IPv4 باستخدام Flask وTkinter مع مشاركة QR وتجربة رفع/تحميل سهلة.',
      },
      {
        name: 'هوم سيرفر',
        details: 'منصة منزلية معيارية بـ NestJS وReact تشمل OTP، وحدات أفلام/ألعاب، مشاركة PasteMe، وخزنة أسرار مع PostgreSQL.',
      },
      {
        name: 'نظام توصية الأفلام',
        details: 'منصة توصية قائمة على TF-IDF وcosine similarity مع فلاتر متقدمة وتكامل لجلب الملصقات.',
      },
      {
        name: 'نظام إدارة الفنادق',
        details: 'منصة حجز متكاملة بـ Flask وPostgreSQL تشمل مصادقة آمنة وإدارة حجوزات ولوحة تحكم إدارية.',
      },
    ],
    skillGroups: [
      'البرمجة: Python (Flask, Django)، Java، C++',
      'الذكاء الاصطناعي وتعلم الآلة: TensorFlow، PyTorch، Scikit-learn',
      'الويب والموبايل: HTML، CSS، JavaScript، React، React-Native، Vue.js، NestJS، REST APIs، JWT',
      'الأمن السيبراني: أمن الشبكات، الاختبار الأخلاقي، التشفير',
      'قواعد البيانات: MySQL، PostgreSQL',
      'الأدوات: Git، Linux، Docker، MinIO، ERPNext (Frappe)، الآلات الافتراضية',
    ],
    certifications: [
      'IT Essentials - CyberHub (Cisco)',
      'CCNAv7: Introduction to Networks - CyberHub (Cisco)',
      'CyberOps Associate - CyberHub (Cisco)',
      'دورات Coursera في الذكاء الاصطناعي والإحصاء والمهارات المهنية',
    ],
    activities: [
      'عضو في نادي الذكاء الاصطناعي والأمن السيبراني بالكلية',
      'عضو مؤسس وفعّال في نادي التدريس التفاعلي بين الأقران',
      'المشاركة في عدة ورش برمجية داخل الجامعة',
    ],
    nativeLanguage: 'العربية: اللغة الأم',
    fluentLanguage: 'الإنجليزية: طلاقة عالية جدًا (قريبة من المستوى الأم)',
    companyLabel: 'إنوسوفت',
    cityCountry: 'الدمام، المملكة العربية السعودية',
    projectsLinkLabel: 'عرض جميع المشاريع',
    searchPlaceholder: 'ابحث عن مشروع أو تقنية أو كلمة مفتاحية...',
    filterLabel: 'تصفية',
    sortLabel: 'ترتيب',
    filterAll: 'الكل',
    sortNewest: 'الأحدث',
    sortAToZ: 'أبجديًا',
    openProject: 'فتح المشروع',
    openInGithub: 'فتح المشروع في GitHub',
    backToProjects: 'العودة إلى المشاريع',
    stackUsed: 'التقنيات المستخدمة',
    projectDescription: 'الوصف',
    projectDetails: 'تفاصيل المشروع',
    noProjectFound: 'لا يوجد مشروع مطابق. جرّب كلمة مختلفة أو تصفية أخرى.',
    prevSlide: 'السابق',
    nextSlide: 'التالي',
    experienceIntro: 'تدريب تعاوني لمدة 6 أشهر في Innosoft (وهي خبرتي المهنية الوحيدة).',
    experiencePoints: [
      'تطوير وصيانة تطبيقات Full-Stack باستخدام NestJS وFlask وReact وVue.js وPostgreSQL.',
      'قيادة تطوير الخلفية في InternHub مع مصادقة آمنة وصلاحيات REST APIs.',
      'تنفيذ وسيط تحليل مشاعر بالذكاء الاصطناعي مع JWT ودعم المعالجة الدفعية.',
      'المساهمة في Watheh وERPNext/Frappe وتحسين الأداء وجاهزية الإطلاق.',
    ],
  },
} as const

const experienceBubbleIcons = [Code2, Shield, Sparkles, Database]

function tr(text: LocaleText, locale: Locale) {
  return locale === 'ar' ? text.ar : text.en
}

type HomePageProps = {
  locale: Locale
  t: (typeof content)[Locale]
  setModal: Dispatch<SetStateAction<ModalData | null>>
}

function HomePage({ locale, t, setModal }: HomePageProps) {
  return (
    <>
      <motion.section id="overview" className="hero page-hero" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{t.graduationLabel} · {t.sinceLabel}</p>
            <h1 className="gradient-heading">{t.fullName}</h1>
            <p className="hero-subtitle">{t.role}</p>
            <p className="hero-subtitle">{t.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                <Sparkles size={16} /> {t.projectsTitle}
              </a>
              <a className="btn btn-outline" href="https://github.com/Bader-ccsit" target="_blank" rel="noreferrer">
                {t.github}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="grid-lines" />
            <div className="geo geo-1" />
            <div className="geo geo-2" />
            <div className="geo geo-3" />
            <img src="/logo.png" alt="IS-3 logo" className="hero-logo" />
          </div>
        </div>
      </motion.section>

      <motion.section id="objective" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="section-header">
          <h2>{t.objectiveTitle}</h2>
          <p>{t.subtitleObjective}</p>
        </div>
        <div className="cards-grid">
          <article className="animated-card">
            <div className="card-icon"><Sparkles size={18} /></div>
            <h3>{t.objectiveTitle}</h3>
            <ul className="objective-list">
              {t.objectivePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article className="animated-card">
            <div className="card-icon"><GraduationCap size={18} /></div>
            <h3>{t.educationTitle}</h3>
            <p>{t.educationUniversity}</p>
            <p>{t.majorLabel}: {t.majorValue}</p>
            <p>{t.gpaLabel}: {t.gpaValue}</p>
            <button className="inline-action" onClick={() => setModal({ title: t.additionalCoursesTitle, bullets: t.courses })}>
              {t.viewMore}
            </button>
          </article>
          <article className="animated-card">
            <div className="card-icon"><Code2 size={18} /></div>
            <h3>{t.skillsTitle}</h3>
            <ul>
              {t.skillGroups.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="inline-action" onClick={() => setModal({ title: t.skillsTitle, bullets: t.skillGroups })}>
              {t.viewMore}
            </button>
          </article>
        </div>
      </motion.section>

      <motion.section id="experience" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="section-header">
          <h2>{t.experienceTitle}</h2>
          <p>{t.subtitleExperience}</p>
        </div>
        <div className="timeline">
          <article className="timeline-step experience-single">
            <span className="phase">{t.companyLabel}</span>
            <p className="experience-intro">{t.experienceIntro}</p>
            <div className="experience-bubble-cloud">
              {t.experiencePoints.map((point, index) => {
                const Icon = experienceBubbleIcons[index % experienceBubbleIcons.length]
                return (
                  <article key={point} className="experience-bubble">
                    <div className="card-icon experience-card-icon"><Icon size={18} /></div>
                    <p>{point}</p>
                  </article>
                )
              })}
            </div>
          </article>
        </div>
      </motion.section>

      <motion.section id="projects" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="section-header">
          <h2>
            <Link className="section-link" to="/projects">
              {t.projectsTitle} <ExternalLink size={18} />
            </Link>
          </h2>
          <p>{t.subtitleProjects}</p>
        </div>
        <div className="cards-grid">
          {projectCatalog.map((project, idx) => (
            <motion.article
              key={project.slug}
              className="animated-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="card-icon"><Code2 size={18} /></div>
              <h3>{tr(project.title, locale)}</h3>
              <p>{tr(project.summary, locale)}</p>
              <Link className="inline-action project-open" to={`/projects/${project.slug}`}>
                {t.openProject}
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="extras" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="section-header">
          <h2>{t.extrasTitle}</h2>
        </div>
        <div className="company-layout">
          <article className="animated-card values">
            <div className="card-icon"><Trophy size={18} /></div>
            <h3 className="heading-with-link">
              {t.certificationsLabel}
              <a
                className="cert-link"
                href="https://drive.google.com/drive/folders/1VVZjy0h9y0CV_Wj6HxcLS8q2ZJlyCyG_"
                target="_blank"
                rel="noreferrer"
                aria-label={t.certificationsLabel}
              >
                <ExternalLink size={14} />
              </a>
            </h3>
            <ul>
              {t.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="animated-card values">
            <div className="card-icon"><Sparkles size={18} /></div>
            <h3>{t.activitiesLabel}</h3>
            <ul>
              {t.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>{t.languagesLabel}</h3>
            <p>{t.nativeLanguage}</p>
            <p>{t.fluentLanguage}</p>
          </article>
        </div>
      </motion.section>

      <motion.section id="contact" className="cta-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
        <div className="cta-panel footer-layout">
          <div className="footer-left">
            <h2>{t.contactTitle}</h2>
            <a className="mail-link" href="mailto:bader.ccsit@gmail.com">bader.ccsit@gmail.com</a>
            <div className="hero-actions">
              <a className="btn btn-primary" href="https://github.com/Bader-ccsit" target="_blank" rel="noreferrer">
                {t.cta}
              </a>
              <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noreferrer">
                {t.resume}
              </a>
            </div>
            <p className="footer-note">{t.rights}</p>
          </div>
          <div className="footer-right">
            <h3>{t.footerContact}</h3>
            <div className="identity-items">
              <span><Mail size={14} /> bader.ccsit@gmail.com</span>
              <span><Phone size={14} /> +966546098886</span>
              <span><MapPin size={14} /> {t.cityCountry}</span>
            </div>
            <div className="footer-links">
              <a href="https://github.com/Bader-ccsit" target="_blank" rel="noreferrer">{t.github}</a>
              <a href="https://www.linkedin.com/in/bader-alkhamees" target="_blank" rel="noreferrer">{t.linkedin}</a>
              <a href="https://bader-ccsit.github.io/" target="_blank" rel="noreferrer">{t.website}</a>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

function ProjectsPage({ locale, t }: { locale: Locale; t: (typeof content)[Locale] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'ALL' | Project['category']>('ALL')
  const [sortBy, setSortBy] = useState<'newest' | 'az'>('newest')
  const searchControls = useAnimationControls()

  const categories = useMemo(() => ['ALL', ...Array.from(new Set(projectCatalog.map((project) => project.category)))], [])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const byCategory = category === 'ALL' ? projectCatalog : projectCatalog.filter((project) => project.category === category)

    const byQuery = byCategory.filter((project) => {
      const haystack = [
        tr(project.title, locale),
        tr(project.summary, locale),
        tr(project.description, locale),
        project.stack.join(' '),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })

    return [...byQuery].sort((a, b) => {
      if (sortBy === 'az') {
        return tr(a.title, locale).localeCompare(tr(b.title, locale), locale === 'ar' ? 'ar' : 'en')
      }

      const manualNewestOrder = [
        'internal-file-transfer-server',
        'ai-food-classification',
        'movie-recommendation-system',
      ]

      const aManualIndex = manualNewestOrder.indexOf(a.slug)
      const bManualIndex = manualNewestOrder.indexOf(b.slug)

      if (aManualIndex !== -1 && bManualIndex !== -1) {
        return aManualIndex - bManualIndex
      }

      if (aManualIndex !== -1 || bManualIndex !== -1) {
        const aYear = Number(a.year)
        const bYear = Number(b.year)

        if (aYear !== bYear) {
          return bYear - aYear
        }

        return aManualIndex !== -1 ? 1 : -1
      }

      return Number(b.year) - Number(a.year)
    })
  }, [category, locale, query, sortBy])

  const animateSearchField = () => {
    void searchControls.start({
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0 rgba(35, 200, 255, 0)',
        '0 10px 28px rgba(35, 200, 255, 0.24)',
        '0 0 0 rgba(35, 200, 255, 0)',
      ],
      transition: { duration: 0.28, ease: 'easeOut' },
    })
  }

  return (
    <section className="projects-page">
      <div className="section-header projects-head">
        <h2>{t.projectsTitle}</h2>
        <p>{t.projectsLinkLabel}</p>
      </div>

      <div className="projects-controls">
        <motion.label className="control-field search-field" animate={searchControls}>
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              animateSearchField()
            }}
            placeholder={t.searchPlaceholder}
          />
        </motion.label>

        <label className="control-field">
          <Filter size={16} />
          <span>{t.filterLabel}</span>
          <span className="control-select-wrap">
            <select value={category} onChange={(event) => setCategory(event.target.value as 'ALL' | Project['category'])}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'ALL' ? t.filterAll : item}
              </option>
            ))}
            </select>
            <ChevronDown size={14} className="select-chevron" />
          </span>
        </label>

        <label className="control-field">
          <span>{t.sortLabel}</span>
          <span className="control-select-wrap">
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'newest' | 'az')}>
              <option value="newest">{t.sortNewest}</option>
              <option value="az">{t.sortAToZ}</option>
            </select>
            <ChevronDown size={14} className="select-chevron" />
          </span>
        </label>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="projects-empty">{t.noProjectFound}</p>
      ) : (
        <motion.div className="projects-grid-page" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                layout
                className="animated-card project-page-card"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ delay: idx * 0.03, duration: 0.25 }}
              >
                <div className="card-icon"><Code2 size={18} /></div>
                <h3>{tr(project.title, locale)}</h3>
                <p>{tr(project.summary, locale)}</p>
                <div className="stack-row">
                  {project.stack.slice(0, 4).map((stack) => (
                    <motion.span key={stack} className="stack-chip" whileHover={{ y: -2, scale: 1.04 }} transition={{ duration: 0.18 }}>
                      {stack}
                    </motion.span>
                  ))}
                </div>
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                  <Link className="inline-action project-open" to={`/projects/${project.slug}`}>
                    {t.openProject}
                  </Link>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}

function ProjectDetailPage({ locale, t }: { locale: Locale; t: (typeof content)[Locale] }) {
  const { slug } = useParams<{ slug: string }>()
  const project = projectCatalog.find((item) => item.slug === slug)
  const [activeSlide, setActiveSlide] = useState(0)

  if (!project) {
    return (
      <section className="projects-page">
        <p className="projects-empty">{t.noProjectFound}</p>
        <Link className="inline-action project-open" to="/projects">{t.backToProjects}</Link>
      </section>
    )
  }

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % project.gallery.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
  const isArabic = locale === 'ar'

  return (
    <section className="project-detail-page">
      <Link className="back-link" to="/projects">
        <ArrowLeft size={16} /> {t.backToProjects}
      </Link>

      <div className="section-header">
        <h2>{tr(project.title, locale)}</h2>
        <a className="project-github-link" href={project.githubUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={14} /> {t.openInGithub}
        </a>
      </div>

      <section className="detail-block">
        <h3>{t.stackUsed}</h3>
        <div className="stack-row">
          {project.stack.map((stack) => (
            <motion.span key={stack} className="stack-chip" whileHover={{ y: -2, scale: 1.05 }} transition={{ duration: 0.18 }}>
              {stack}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="detail-block slide-block">
        <button className="slide-nav" onClick={isArabic ? nextSlide : prevSlide} aria-label={isArabic ? t.nextSlide : t.prevSlide}>
          {isArabic ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </button>
        <div className="slide-frame">
          <img
            src={project.gallery[activeSlide % project.gallery.length]}
            alt={tr(project.title, locale)}
            className="project-slide-img"
          />
          <p className="slide-count">{(activeSlide % project.gallery.length) + 1} / {project.gallery.length}</p>
        </div>
        <button className="slide-nav" onClick={isArabic ? prevSlide : nextSlide} aria-label={isArabic ? t.prevSlide : t.nextSlide}>
          {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>
      </section>

      <section className="detail-block">
        <h3>{t.projectDescription}</h3>
        <div className="project-outline">
          {project.outline.map((section) => (
            <article key={tr(section.heading, locale)} className="project-outline-section">
              <h4>{tr(section.heading, locale)}</h4>
              <ul>
                {section.points.map((point) => (
                  <li key={tr(point, locale)}>{tr(point, locale)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-block">
        <h3>{t.projectDetails}</h3>
        <table className="project-table">
          <tbody>
            {project.details.map((detail) => (
              <tr key={tr(detail.label, locale)}>
                <th>{tr(detail.label, locale)}</th>
                <td>{tr(detail.value, locale)}</td>
              </tr>
            ))}
            <tr>
              <th>{locale === 'ar' ? 'الحالة' : 'Status'}</th>
              <td>{tr(project.status, locale)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('locale')
    return savedLocale === 'ar' || savedLocale === 'en' ? savedLocale : 'en'
  })
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })
  const [modal, setModal] = useState<ModalData | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [viewInitKey, setViewInitKey] = useState(0)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('locale', locale)
  }, [locale])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const syncScrollState = () => {
      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('scroll'))
    }

    const onPageShow = () => syncScrollState()
    window.addEventListener('pageshow', onPageShow)

    const raf1 = requestAnimationFrame(syncScrollState)
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(syncScrollState))
    const timeout1 = window.setTimeout(syncScrollState, 120)
    const timeout2 = window.setTimeout(syncScrollState, 420)

    return () => {
      window.removeEventListener('pageshow', onPageShow)
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(timeout1)
      window.clearTimeout(timeout2)
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    let animationFrame = 0
    let completeTimer = 0

    const duration = 1550
    const start = performance.now()

    const animateProgress = (now: number) => {
      const elapsed = now - start
      const normalized = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - normalized, 2.2)
      setBootProgress(Math.round(eased * 100))

      if (normalized < 1) {
        animationFrame = window.requestAnimationFrame(animateProgress)
        return
      }

      completeTimer = window.setTimeout(() => setIsBooting(false), 220)
    }

    animationFrame = window.requestAnimationFrame(animateProgress)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(completeTimer)
    }
  }, [])

  useEffect(() => {
    if (isBooting) {
      return
    }

    setViewInitKey((value) => value + 1)

    const syncInViewState = () => {
      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('scroll'))
    }

    const raf1 = window.requestAnimationFrame(syncInViewState)
    const raf2 = window.requestAnimationFrame(() => window.requestAnimationFrame(syncInViewState))
    const timer1 = window.setTimeout(syncInViewState, 90)
    const timer2 = window.setTimeout(syncInViewState, 260)
    const timer3 = window.setTimeout(syncInViewState, 560)

    let cancelled = false
    const fontSet = document.fonts
    if (fontSet?.ready) {
      fontSet.ready.then(() => {
        if (!cancelled) {
          syncInViewState()
        }
      })
    }

    const onLoad = () => syncInViewState()
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
      window.clearTimeout(timer1)
      window.clearTimeout(timer2)
      window.clearTimeout(timer3)
    }
  }, [isBooting])

  const t = content[locale]

  return (
    <div>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            className="boot-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <motion.div
              className="boot-popup"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="boot-loader">
                <span className="boot-ring boot-ring-1" />
                <span className="boot-ring boot-ring-2" />
                <span className="boot-core">{t.brandMark}</span>
              </div>
              <p className="boot-label">{t.loadingLabel}</p>
              <div className="boot-progress-track" aria-hidden="true">
                <motion.span
                  className="boot-progress-fill"
                  animate={{ width: `${bootProgress}%` }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                />
              </div>
              <p className="boot-progress-text">{bootProgress}%</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <div className={`brand-cluster ${locale === 'ar' ? 'rtl' : ''}`}>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? t.close : t.menuTitle}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <Link className="brand" to="/">
              <span className="brand-mark">{t.brandMark}</span>
              <span className="brand-text">{t.headerName}</span>
            </Link>
          </div>

          <nav className="site-nav">
            <a href="/#overview">{t.nav[0]}</a>
            <a href="/#objective">{t.nav[1]}</a>
            <a href="/#experience">{t.nav[2]}</a>
            <a href="/#projects">{t.nav[3]}</a>
            <a href="/#extras">{t.nav[4]}</a>
            <a href="/#contact">{t.nav[5]}</a>
          </nav>

          <div className={`toolbar ${locale === 'ar' ? 'toolbar-rtl' : 'toolbar-ltr'}`}>
            <a className="link-chip" href="/resume.pdf" target="_blank" rel="noreferrer">
              {t.resume}
            </a>
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={t.toggleTheme}
            >
              <span className="toggle-dot">{theme === 'dark' ? <Sun size={12} /> : <MoonStar size={12} />}</span>
            </button>
            <button
              className="lang-btn"
              onClick={() => {
                setMobileMenuOpen(false)
                setLocale(locale === 'en' ? 'ar' : 'en')
              }}
              aria-label={t.toggleLang}
            >
              <Languages size={14} /> {locale === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              onPointerDown={() => setMobileMenuOpen(false)}
            >
              <motion.aside
                className={`mobile-menu-panel${locale === 'ar' ? ' rtl' : ''}`}
                initial={{ x: locale === 'ar' ? 280 : -280, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: locale === 'ar' ? 280 : -280, opacity: 0.4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <div className="mobile-menu-title-row">
                  <h3>{t.menuTitle}</h3>
                  <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label={t.close}>
                    <X size={15} />
                  </button>
                </div>
                <a className="mobile-menu-link" href="/#overview" onClick={() => setMobileMenuOpen(false)}><Sparkles size={15} /> <span>{t.nav[0]}</span></a>
                <a className="mobile-menu-link" href="/#objective" onClick={() => setMobileMenuOpen(false)}><GraduationCap size={15} /> <span>{t.nav[1]}</span></a>
                <a className="mobile-menu-link" href="/#experience" onClick={() => setMobileMenuOpen(false)}><Shield size={15} /> <span>{t.nav[2]}</span></a>
                <a className="mobile-menu-link" href="/#projects" onClick={() => setMobileMenuOpen(false)}><Code2 size={15} /> <span>{t.nav[3]}</span></a>
                <a className="mobile-menu-link" href="/#extras" onClick={() => setMobileMenuOpen(false)}><Trophy size={15} /> <span>{t.nav[4]}</span></a>
                <a className="mobile-menu-link" href="/#contact" onClick={() => setMobileMenuOpen(false)}><Mail size={15} /> <span>{t.nav[5]}</span></a>

                <footer className="mobile-menu-footer">
                  <p>{t.fullName}</p>
                  <p>bader.ccsit@gmail.com</p>
                  <div className="mobile-menu-footer-links">
                    <a href="https://github.com/Bader-ccsit" target="_blank" rel="noreferrer">{t.github}</a>
                    <a href="https://www.linkedin.com/in/bader-alkhamees" target="_blank" rel="noreferrer">{t.linkedin}</a>
                    <a href="/resume.pdf" target="_blank" rel="noreferrer">{t.resume}</a>
                  </div>
                  <p className="mobile-menu-reserved">{t.menuReserved}</p>
                </footer>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${locale}-${viewInitKey}`}
            className="page-flip-shell"
            initial={{ opacity: 0, rotateY: locale === 'ar' ? -16 : 16 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: locale === 'ar' ? 16 : -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: locale === 'ar' ? 'right center' : 'left center' }}
          >
            <Routes>
              <Route path="/" element={<HomePage locale={locale} t={t} setModal={setModal} />} />
              <Route path="/projects" element={<ProjectsPage locale={locale} t={t} />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage locale={locale} t={t} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.article
              className="modal-card"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h3>{modal.title}</h3>
              {modal.paragraphs?.map((item) => (
                <p key={item}>{item}</p>
              ))}
              {modal.bullets && (
                <ul>
                  {modal.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <button className="inline-action solid" onClick={() => setModal(null)}>
                {t.close}
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
