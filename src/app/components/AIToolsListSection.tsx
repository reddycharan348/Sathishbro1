import { ExternalLink, Sparkles, Code, Palette, FileText, Brain, Video, Music, Database, Search, BookOpen, Presentation, Calculator, Globe, Search as SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useMemo, memo } from 'react';
import lovableLogo from '@/assets/tools/lovable.png';
import boltLogo from '@/assets/tools/bolt.png';
import github_copilotLogo from '@/assets/tools/github_copilot.png';
import cursorLogo from '@/assets/tools/cursor.png';
import replitLogo from '@/assets/tools/replit.png';
import codeiumLogo from '@/assets/tools/codeium.png';
import tabnineLogo from '@/assets/tools/tabnine.png';
import amazon_codewhispererLogo from '@/assets/tools/amazon_codewhisperer.png';
import piecesLogo from '@/assets/tools/pieces.png';
import codexLogo from '@/assets/tools/codex.png';
import figLogo from '@/assets/tools/fig.png';
import sourcegraph_codyLogo from '@/assets/tools/sourcegraph_cody.png';
import chatgptLogo from '@/assets/tools/chatgpt.png';
import google_geminiLogo from '@/assets/tools/google_gemini.png';
import claudeLogo from '@/assets/tools/claude.png';
import microsoft_copilotLogo from '@/assets/tools/microsoft_copilot.png';
import perplexityLogo from '@/assets/tools/perplexity.png';
import grammarlyLogo from '@/assets/tools/grammarly.png';
import quillbotLogo from '@/assets/tools/quillbot.png';
import jasperLogo from '@/assets/tools/jasper.png';
import copyaiLogo from '@/assets/tools/copyai.png';
import notion_aiLogo from '@/assets/tools/notion_ai.png';
import canvaLogo from '@/assets/tools/canva.png';
import midjourneyLogo from '@/assets/tools/midjourney.png';
import dalle3Logo from '@/assets/tools/dalle3.png';
import leonardoLogo from '@/assets/tools/leonardo.png';
import stable_diffusionLogo from '@/assets/tools/stable_diffusion.png';
import adobe_fireflyLogo from '@/assets/tools/adobe_firefly.png';
import figma_aiLogo from '@/assets/tools/figma_ai.png';
import removebgLogo from '@/assets/tools/removebg.png';
import runwayLogo from '@/assets/tools/runway.png';
import elevenlabsLogo from '@/assets/tools/elevenlabs.png';
import descriptLogo from '@/assets/tools/descript.png';
import pictoryLogo from '@/assets/tools/pictory.png';
import synthesiaLogo from '@/assets/tools/synthesia.png';
import murfLogo from '@/assets/tools/murf.png';
import consensusLogo from '@/assets/tools/consensus.png';
import elicitLogo from '@/assets/tools/elicit.png';
import sciteLogo from '@/assets/tools/scite.png';
import explainpaperLogo from '@/assets/tools/explainpaper.png';
import quizletLogo from '@/assets/tools/quizlet.png';
import wolframLogo from '@/assets/tools/wolfram.png';
import scholarcyLogo from '@/assets/tools/scholarcy.png';
import semantic_scholarLogo from '@/assets/tools/semantic_scholar.png';
import gammaLogo from '@/assets/tools/gamma.png';
import beautiful_aiLogo from '@/assets/tools/beautiful_ai.png';
import slidesgoLogo from '@/assets/tools/slidesgo.png';
import tomeLogo from '@/assets/tools/tome.png';
import otterLogo from '@/assets/tools/otter.png';
import todoistLogo from '@/assets/tools/todoist.png';
import juliusLogo from '@/assets/tools/julius.png';
import tableauLogo from '@/assets/tools/tableau.png';
import datarobotLogo from '@/assets/tools/datarobot.png';
import monkeylearnLogo from '@/assets/tools/monkeylearn.png';
import deeplLogo from '@/assets/tools/deepl.png';
import duolingoLogo from '@/assets/tools/duolingo.png';


// AI Tools Database
const AI_TOOLS_DATA = [
  // Coding & Development - 12 tools
    {
    name: 'Lovable.ai',
    description: 'AI-powered full-stack web app builder that generates production-ready code',
    category: 'Coding & Development',
    icon: Code,
    logo: lovableLogo,
    url: 'https://lovable.ai',
    features: ['Full-stack development', 'React & TypeScript', 'Real-time preview'],
    gradient: 'from-[#7c3aed] to-[#db2777]',
    popular: true,
  },
  {
    name: 'Bolt.new',
    description: 'AI coding assistant that builds and deploys full-stack applications instantly',
    category: 'Coding & Development',
    icon: Code,
    logo: boltLogo,
    url: 'https://bolt.new',
    features: ['Instant deployment', 'Full-stack apps', 'Live editing'],
    gradient: 'from-[#2563eb] to-[#0891b2]',
    popular: true,
  },
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with intelligent suggestions',
    category: 'Coding & Development',
    icon: Code,
    logo: github_copilotLogo,
    url: 'https://github.com/features/copilot',
    features: ['Code completion', 'Multi-language support', 'Context-aware'],
    gradient: 'from-[#24292e] to-[#6e40c9]',
    popular: true,
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor built for pair programming with AI',
    category: 'Coding & Development',
    icon: Code,
    logo: cursorLogo,
    url: 'https://cursor.sh',
    features: ['AI code generation', 'Refactoring', 'Bug fixing'],
    gradient: 'from-[#3d5afe] to-[#00e5ff]',
    popular: true,
  },
  {
    name: 'Replit AI',
    description: 'AI coding assistant integrated into online IDE for collaborative development',
    category: 'Coding & Development',
    icon: Code,
    logo: replitLogo,
    url: 'https://replit.com',
    features: ['Online IDE', 'Code explanation', 'Debugging help'],
    gradient: 'from-[#f26b00] to-[#f2b000]',
    popular: false,
  },
  {
    name: 'Codeium',
    description: 'Free AI code completion tool supporting 70+ programming languages',
    category: 'Coding & Development',
    icon: Code,
    logo: codeiumLogo,
    url: 'https://codeium.com',
    features: ['Free forever', '70+ languages', 'IDE integration'],
    gradient: 'from-[#09b6a2] to-[#2ecc71]',
    popular: false,
  },
  {
    name: 'Tabnine',
    description: 'AI code assistant that predicts and suggests your next lines of code',
    category: 'Coding & Development',
    icon: Code,
    logo: tabnineLogo,
    url: 'https://tabnine.com',
    features: ['Local & cloud AI', 'Team learning', 'Privacy-focused'],
    gradient: 'from-[#22c1c3] to-[#fdbb2d]',
    popular: false,
  },
  {
    name: 'Amazon CodeWhisperer',
    description: 'AI coding companion from AWS with security scanning built-in',
    category: 'Coding & Development',
    icon: Code,
    logo: amazon_codewhispererLogo,
    url: 'https://aws.amazon.com/codewhisperer',
    features: ['Security scanning', 'AWS integration', 'Free for individuals'],
    gradient: 'from-[#ff9900] to-[#ff4f00]',
    popular: false,
  },
  {
    name: 'Pieces',
    description: 'AI-powered code snippet manager with intelligent search and organization',
    category: 'Coding & Development',
    icon: Code,
    logo: piecesLogo,
    url: 'https://pieces.app',
    features: ['Code snippets', 'AI search', 'Context aware'],
    gradient: 'from-[#ff0080] to-[#7928ca]',
    popular: false,
  },
  {
    name: 'Codex by OpenAI',
    description: 'AI system that translates natural language to code (powers GitHub Copilot)',
    category: 'Coding & Development',
    icon: Code,
    logo: codexLogo,
    url: 'https://openai.com/blog/openai-codex',
    features: ['Natural language to code', 'Multi-language', 'API access'],
    gradient: 'from-[#00a67e] to-[#000000]',
    popular: false,
  },
  {
    name: 'Fig',
    description: 'AI-powered terminal autocomplete for developers',
    category: 'Coding & Development',
    icon: Code,
    logo: figLogo,
    url: 'https://fig.io',
    features: ['Terminal autocomplete', 'CLI tools', 'Team scripts'],
    gradient: 'from-[#6366f1] to-[#a855f7]',
    popular: false,
  },
  {
    name: 'Sourcegraph Cody',
    description: 'AI coding assistant that understands your entire codebase',
    category: 'Coding & Development',
    icon: Code,
    logo: sourcegraph_codyLogo,
    url: 'https://sourcegraph.com/cody',
    features: ['Codebase understanding', 'Code search', 'Refactoring'],
    gradient: 'from-[#ff352e] to-[#6b1111]',
    popular: false,
  },

    // AI Chatbots & Writing - 10 tools
    {
      name: 'ChatGPT',
      description: 'Advanced conversational AI for writing, coding, learning, and brainstorming',
      category: 'AI Chatbots & Writing',
      icon: Brain,
      logo: chatgptLogo,
      url: 'https://chat.openai.com',
      features: ['GPT-4 model', 'Multimodal', 'Custom GPTs'],
      gradient: 'from-[#10a37f] to-[#1a7f64]',
      popular: true,
    },
    {
      name: 'Google Gemini',
      description: 'Google\'s most capable AI for research, writing, and productivity',
      category: 'AI Chatbots & Writing',
      icon: Brain,
      logo: google_geminiLogo,
      url: 'https://gemini.google.com',
      features: ['Multimodal AI', 'Google integration', 'Real-time info'],
      gradient: 'from-[#4285F4] via-[#9b72cb] to-[#d96570]',
      popular: true,
    },
    {
      name: 'Claude AI',
      description: 'AI assistant by Anthropic focused on helpful, harmless, and honest conversations',
      category: 'AI Chatbots & Writing',
      icon: Brain,
      logo: claudeLogo,
      url: 'https://claude.ai',
      features: ['200K context window', 'Long documents', 'Safe & helpful'],
      gradient: 'from-[#d97757] to-[#ae5630]',
      popular: true,
    },
    {
      name: 'Microsoft Copilot',
      description: 'AI-powered assistant integrated into Microsoft 365 apps',
      category: 'AI Chatbots & Writing',
      icon: Brain,
      logo: microsoft_copilotLogo,
      url: 'https://copilot.microsoft.com',
      features: ['Office integration', 'Web search', 'Image generation'],
      gradient: 'from-[#0078d4] to-[#00bcf2]',
      popular: false,
    },
    {
      name: 'Perplexity AI',
      description: 'AI-powered search engine that provides cited answers with sources',
      category: 'AI Chatbots & Writing',
      icon: Search,
      logo: perplexityLogo,
      url: 'https://perplexity.ai',
      features: ['Cited sources', 'Research mode', 'Real-time search'],
      gradient: 'from-[#1fb8cd] to-[#125e68]',
      popular: true,
    },
    {
      name: 'Grammarly',
      description: 'AI writing assistant for grammar, spelling, and style improvements',
      category: 'AI Chatbots & Writing',
      icon: FileText,
      logo: grammarlyLogo,
      url: 'https://grammarly.com',
      features: ['Grammar check', 'Tone detection', 'Plagiarism checker'],
      gradient: 'from-[#00d182] to-[#00b06f]',
      popular: false,
    },
    {
      name: 'Quillbot',
      description: 'AI paraphrasing and summarization tool for academic writing',
      category: 'AI Chatbots & Writing',
      icon: FileText,
      logo: quillbotLogo,
      url: 'https://quillbot.com',
      features: ['Paraphrasing', 'Summarization', 'Citation generator'],
      gradient: 'from-[#3b873e] to-[#2c662e]',
      popular: false,
    },
    {
      name: 'Jasper AI',
      description: 'AI content creation platform for marketing and business writing',
      category: 'AI Chatbots & Writing',
      icon: FileText,
      logo: jasperLogo,
      url: 'https://jasper.ai',
      features: ['Content templates', 'Brand voice', 'SEO optimization'],
      gradient: 'from-[#6700eb] to-[#ff3b8d]',
      popular: false,
    },
    {
      name: 'Copy.ai',
      description: 'AI copywriting tool for marketing content and sales copy',
      category: 'AI Chatbots & Writing',
      icon: FileText,
      logo: copyaiLogo,
      url: 'https://copy.ai',
      features: ['Marketing copy', 'Social media', 'Email templates'],
      gradient: 'from-[#2b59ff] to-[#7000ff]',
      popular: false,
    },
    {
      name: 'Notion AI',
      description: 'AI assistant built into Notion for writing, brainstorming, and organizing',
      category: 'AI Chatbots & Writing',
      icon: FileText,
      logo: notion_aiLogo,
      url: 'https://notion.so/product/ai',
      features: ['Notion integration', 'Writing help', 'Summaries'],
      gradient: 'from-[#37352f] to-[#000000]',
      popular: false,
    },

    // Design & Creative - 8 tools
    {
      name: 'Canva AI',
      description: 'AI-powered design platform with Magic Design and text-to-image',
      category: 'Design & Creative',
      icon: Palette,
      logo: canvaLogo,
      url: 'https://canva.com',
      features: ['Magic Design', 'Background remover', 'Templates'],
      gradient: 'from-[#00c4cc] to-[#7d2ae8]',
      popular: true,
    },
    {
      name: 'Midjourney',
      description: 'AI art generator creating stunning images from text descriptions',
      category: 'Design & Creative',
      icon: Palette,
      logo: midjourneyLogo,
      url: 'https://midjourney.com',
      features: ['High-quality images', 'Artistic styles', 'Discord-based'],
      gradient: 'from-[#000000] to-[#2c3e50]',
      popular: true,
    },
    {
      name: 'DALL-E 3',
      description: 'OpenAI\'s advanced image generation model with precise prompt following',
      category: 'Design & Creative',
      icon: Palette,
      logo: dalle3Logo,
      url: 'https://openai.com/dall-e-3',
      features: ['High resolution', 'ChatGPT integration', 'Safe generation'],
      gradient: 'from-[#00a67e] to-[#000000]',
      popular: true,
    },
    {
      name: 'Leonardo.ai',
      description: 'AI art generator focused on game assets and creative designs',
      category: 'Design & Creative',
      icon: Palette,
      logo: leonardoLogo,
      url: 'https://leonardo.ai',
      features: ['Game assets', 'Character design', 'Consistent style'],
      gradient: 'from-[#ff4d4d] to-[#ff9900]',
      popular: false,
    },
    {
      name: 'Stable Diffusion',
      description: 'Open-source AI image generation with full control and customization',
      category: 'Design & Creative',
      icon: Palette,
      logo: stable_diffusionLogo,
      url: 'https://stability.ai',
      features: ['Open source', 'Customizable', 'Local deployment'],
      gradient: 'from-[#6d28d9] to-[#4338ca]',
      popular: false,
    },
    {
      name: 'Adobe Firefly',
      description: 'Adobe\'s AI for generating images, text effects, and design variations',
      category: 'Design & Creative',
      icon: Palette,
      logo: adobe_fireflyLogo,
      url: 'https://firefly.adobe.com',
      features: ['Adobe integration', 'Commercial safe', 'Text effects'],
      gradient: 'from-[#fa0f00] to-[#ff9500]',
      popular: false,
    },
    {
      name: 'Figma AI',
      description: 'AI features in Figma for design automation and smart layouts',
      category: 'Design & Creative',
      icon: Palette,
      logo: figma_aiLogo,
      url: 'https://figma.com',
      features: ['Auto-layout', 'Design systems', 'Prototyping'],
      gradient: 'from-[#f24e1e] via-[#a259ff] to-[#1abcfe]',
      popular: false,
    },
    {
      name: 'Remove.bg',
      description: 'AI-powered background removal tool for images',
      category: 'Design & Creative',
      icon: Palette,
      logo: removebgLogo,
      url: 'https://remove.bg',
      features: ['Instant removal', 'Bulk processing', 'API access'],
      gradient: 'from-[#2980b9] to-[#3498db]',
      popular: false,
    },

    // Video & Audio - 6 tools
    {
      name: 'Runway ML',
      description: 'AI video editing with text-to-video, image-to-video, and more',
      category: 'Video & Audio',
      icon: Video,
      logo: runwayLogo,
      url: 'https://runwayml.com',
      features: ['Text-to-video', 'Video editing', 'Motion tracking'],
      gradient: 'from-[#000000] to-[#555555]',
      popular: true,
    },
    {
      name: 'ElevenLabs',
      description: 'AI voice generation with ultra-realistic text-to-speech',
      category: 'Video & Audio',
      icon: Music,
      logo: elevenlabsLogo,
      url: 'https://elevenlabs.io',
      features: ['Voice cloning', 'Text-to-speech', 'Multiple languages'],
      gradient: 'from-[#f4a261] to-[#e76f51]',
      popular: true,
    },
    {
      name: 'Descript',
      description: 'AI video and podcast editing by editing text transcripts',
      category: 'Video & Audio',
      icon: Video,
      logo: descriptLogo,
      url: 'https://descript.com',
      features: ['Text-based editing', 'Voice cloning', 'Transcription'],
      gradient: 'from-[#0052cc] to-[#00b8d9]',
      popular: false,
    },
    {
      name: 'Pictory',
      description: 'AI video creation from long-form content and scripts',
      category: 'Video & Audio',
      icon: Video,
      logo: pictoryLogo,
      url: 'https://pictory.ai',
      features: ['Script-to-video', 'Auto-captions', 'Highlights'],
      gradient: 'from-[#4a148c] to-[#7b1fa2]',
      popular: false,
    },
    {
      name: 'Synthesia',
      description: 'AI video generation with virtual avatars and voiceovers',
      category: 'Video & Audio',
      icon: Video,
      logo: synthesiaLogo,
      url: 'https://synthesia.io',
      features: ['AI avatars', '120+ languages', 'Professional videos'],
      gradient: 'from-[#0ea5e9] to-[#2563eb]',
      popular: false,
    },
    {
      name: 'Murf AI',
      description: 'AI voice generator for podcasts, videos, and presentations',
      category: 'Video & Audio',
      icon: Music,
      logo: murfLogo,
      url: 'https://murf.ai',
      features: ['Voice-over studio', '120+ voices', 'Voice changer'],
      gradient: 'from-[#059669] to-[#10b981]',
      popular: false,
    },

    // Research & Learning - 8 tools
    {
      name: 'Consensus',
      description: 'AI-powered search engine for scientific research papers',
      category: 'Research & Learning',
      icon: Search,
      logo: consensusLogo,
      url: 'https://consensus.app',
      features: ['Paper search', 'Cited answers', 'Research summaries'],
      gradient: 'from-[#1e40af] to-[#3b82f6]',
      popular: true,
    },
    {
      name: 'Elicit',
      description: 'AI research assistant that helps analyze research papers',
      category: 'Research & Learning',
      icon: Search,
      logo: elicitLogo,
      url: 'https://elicit.org',
      features: ['Paper analysis', 'Literature review', 'Data extraction'],
      gradient: 'from-[#5b21b6] to-[#7c3aed]',
      popular: false,
    },
    {
      name: 'Scite',
      description: 'AI tool showing how research papers have been cited',
      category: 'Research & Learning',
      icon: BookOpen,
      logo: sciteLogo,
      url: 'https://scite.ai',
      features: ['Citation context', 'Paper reliability', 'Research dashboard'],
      gradient: 'from-[#0ea5e9] to-[#06b6d4]',
      popular: false,
    },
    {
      name: 'Explainpaper',
      description: 'AI that explains complex research papers in simple terms',
      category: 'Research & Learning',
      icon: BookOpen,
      logo: explainpaperLogo,
      url: 'https://explainpaper.com',
      features: ['Paper explanations', 'Highlight to explain', 'Academic support'],
      gradient: 'from-[#f97316] to-[#fb923c]',
      popular: false,
    },
    {
      name: 'Quizlet AI',
      description: 'AI-powered flashcards and study tools for exam preparation',
      category: 'Research & Learning',
      icon: BookOpen,
      logo: quizletLogo,
      url: 'https://quizlet.com',
      features: ['AI flashcards', 'Practice tests', 'Study modes'],
      gradient: 'from-[#3b82f6] to-[#60a5fa]',
      popular: false,
    },
    {
      name: 'Wolfram Alpha',
      description: 'Computational knowledge engine for math, science, and engineering',
      category: 'Research & Learning',
      icon: Calculator,
      logo: wolframLogo,
      url: 'https://wolframalpha.com',
      features: ['Math solver', 'Step-by-step', 'Data analysis'],
      gradient: 'from-[#da291c] to-[#a51c12]',
      popular: true,
    },
    {
      name: 'Scholarcy',
      description: 'AI that summarizes research papers and extracts key information',
      category: 'Research & Learning',
      icon: BookOpen,
      logo: scholarcyLogo,
      url: 'https://scholarcy.com',
      features: ['Paper summaries', 'Key points', 'Flashcards'],
      gradient: 'from-[#0369a1] to-[#0ea5e9]',
      popular: false,
    },
    {
      name: 'Semantic Scholar',
      description: 'AI-powered academic search engine by Allen Institute',
      category: 'Research & Learning',
      icon: Search,
      logo: semantic_scholarLogo,
      url: 'https://semanticscholar.org',
      features: ['Research discovery', 'Paper insights', 'Citation analysis'],
      gradient: 'from-[#1d4ed8] to-[#3b82f6]',
      popular: false,
    },

    // Presentation & Productivity - 6 tools
    {
      name: 'Gamma AI',
      description: 'AI presentation maker that creates beautiful decks from text',
      category: 'Presentation & Productivity',
      icon: Presentation,
      logo: gammaLogo,
      url: 'https://gamma.app',
      features: ['Auto-design', 'Interactive content', 'Instant formatting'],
      gradient: 'from-[#7c3aed] to-[#db2777]',
      popular: true,
    },
    {
      name: 'Beautiful.ai',
      description: 'AI-powered presentation software with smart slide design',
      category: 'Presentation & Productivity',
      icon: Presentation,
      logo: beautiful_aiLogo,
      url: 'https://beautiful.ai',
      features: ['Smart templates', 'Auto-formatting', 'Team collaboration'],
      gradient: 'from-[#2563eb] to-[#4f46e5]',
      popular: false,
    },
    {
      name: 'Slidesgo AI',
      description: 'AI presentation generator with professional templates',
      category: 'Presentation & Productivity',
      icon: Presentation,
      logo: slidesgoLogo,
      url: 'https://slidesgo.com',
      features: ['AI templates', 'Customizable', 'Free & premium'],
      gradient: 'from-[#f97316] to-[#ea580c]',
      popular: false,
    },
    {
      name: 'Tome',
      description: 'AI-powered storytelling format for presentations and documents',
      category: 'Presentation & Productivity',
      icon: Presentation,
      logo: tomeLogo,
      url: 'https://tome.app',
      features: ['AI storytelling', 'Multimedia', 'Interactive'],
      gradient: 'from-[#000000] to-[#333333]',
      popular: false,
    },
    {
      name: 'Otter.ai',
      description: 'AI meeting assistant with real-time transcription and notes',
      category: 'Presentation & Productivity',
      icon: FileText,
      logo: otterLogo,
      url: 'https://otter.ai',
      features: ['Live transcription', 'Meeting notes', 'Action items'],
      gradient: 'from-[#0ea5e9] to-[#0284c7]',
      popular: false,
    },
    {
      name: 'Todoist AI',
      description: 'AI-powered task manager with intelligent scheduling',
      category: 'Presentation & Productivity',
      icon: FileText,
      logo: todoistLogo,
      url: 'https://todoist.com',
      features: ['Smart scheduling', 'Task suggestions', 'Productivity insights'],
      gradient: 'from-[#e44232] to-[#b83428]',
      popular: false,
    },

    // Data & Analytics - 4 tools
    {
      name: 'Julius AI',
      description: 'AI data analyst that interprets and visualizes your data',
      category: 'Data & Analytics',
      icon: Database,
      logo: juliusLogo,
      url: 'https://julius.ai',
      features: ['Data analysis', 'Visualizations', 'Natural language queries'],
      gradient: 'from-[#4f46e5] to-[#7c3aed]',
      popular: true,
    },
    {
      name: 'Tableau AI',
      description: 'AI-powered analytics and business intelligence platform',
      category: 'Data & Analytics',
      icon: Database,
      logo: tableauLogo,
      url: 'https://tableau.com',
      features: ['Data visualization', 'AI insights', 'Dashboards'],
      gradient: 'from-[#e97627] via-[#00a8e1] to-[#f4ae1b]',
      popular: false,
    },
    {
      name: 'DataRobot',
      description: 'AI platform for automated machine learning and predictive analytics',
      category: 'Data & Analytics',
      icon: Database,
      logo: datarobotLogo,
      url: 'https://datarobot.com',
      features: ['AutoML', 'Model deployment', 'Predictions'],
      gradient: 'from-[#ff4d4d] to-[#ff9900]',
      popular: false,
    },
    {
      name: 'MonkeyLearn',
      description: 'AI for text analysis and data extraction from documents',
      category: 'Data & Analytics',
      icon: Database,
      logo: monkeylearnLogo,
      url: 'https://monkeylearn.com',
      features: ['Text analysis', 'Sentiment analysis', 'Data extraction'],
      gradient: 'from-[#00d1b2] to-[#00b894]',
      popular: false,
    },

    // Language & Translation - 2 tools
    {
      name: 'DeepL',
      description: 'AI translator with superior quality for professional translations',
      category: 'Language & Translation',
      icon: Globe,
      logo: deeplLogo,
      url: 'https://deepl.com',
      features: ['High-quality translation', '31 languages', 'Document translation'],
      gradient: 'from-[#0f2b46] to-[#0c1f32]',
      popular: true,
    },
    {
      name: 'Duolingo Max',
      description: 'AI-powered language learning with GPT-4 integration',
      category: 'Language & Translation',
      icon: Globe,
      logo: duolingoLogo,
      url: 'https://duolingo.com',
      features: ['AI tutor', 'Personalized learning', 'Practice conversations'],
      gradient: 'from-[#58cc02] to-[#46a302]',
      popular: false,
    },
  ];

export const AIToolsListSection = memo(function AIToolsListSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => [
    { id: 'All', name: 'All Tools', count: AI_TOOLS_DATA.length },
    { id: 'Coding & Development', name: 'Coding & Development', count: AI_TOOLS_DATA.filter(t => t.category === 'Coding & Development').length },
    { id: 'AI Chatbots & Writing', name: 'AI Chatbots & Writing', count: AI_TOOLS_DATA.filter(t => t.category === 'AI Chatbots & Writing').length },
    { id: 'Design & Creative', name: 'Design & Creative', count: AI_TOOLS_DATA.filter(t => t.category === 'Design & Creative').length },
    { id: 'Video & Audio', name: 'Video & Audio', count: AI_TOOLS_DATA.filter(t => t.category === 'Video & Audio').length },
    { id: 'Research & Learning', name: 'Research & Learning', count: AI_TOOLS_DATA.filter(t => t.category === 'Research & Learning').length },
    { id: 'Presentation & Productivity', name: 'Presentation & Productivity', count: AI_TOOLS_DATA.filter(t => t.category === 'Presentation & Productivity').length },
    { id: 'Data & Analytics', name: 'Data & Analytics', count: AI_TOOLS_DATA.filter(t => t.category === 'Data & Analytics').length },
    { id: 'Language & Translation', name: 'Language & Translation', count: AI_TOOLS_DATA.filter(t => t.category === 'Language & Translation').length },
  ], []);

  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATA.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden theme-transition">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Curated AI Ecosystem</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-heading mb-6"
          >
            Ultimate AI Tools <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Directory</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Explore our hand-picked collection of AI tools across coding, design, research, and productivity 
            to supercharge your engineering workflow and learning experience.
          </motion.p>
        </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative group mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-text-muted group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for tools, features, or tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-surface/50 backdrop-blur-md border border-surface-border rounded-2xl text-heading placeholder:text-text-muted focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm group-hover:shadow-md theme-transition"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-hover rounded text-[10px] text-text-muted border border-surface-border hidden sm:block">
              {filteredTools.length} Tools
            </div>
          </div>
        
        {/* Category filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl border transition-all duration-300 text-sm flex items-center gap-2 transform active:scale-95 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-500 text-white shadow-lg shadow-purple-500/30 -translate-y-0.5'
                    : 'bg-surface/50 backdrop-blur-sm text-text-secondary border-surface-border hover:border-purple-500/40 hover:text-heading hover:bg-surface theme-transition'
                }`}
              >
                {category.name}
                <span className="ml-2 opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-heading mb-1">{filteredTools.length}</div>
            <div className="text-base text-text-muted">AI Tools Available</div>
          </div>
          <div className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-heading mb-1">{categories.length - 1}</div>
            <div className="text-base text-text-muted">Categories</div>
          </div>
          <div className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-heading mb-1">{filteredTools.filter(t => t.popular).length}</div>
            <div className="text-base text-text-muted">Popular Tools</div>
          </div>
          <div className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-heading mb-1">Free</div>
            <div className="text-base text-text-muted">Most Have Free Tier</div>
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-purple-500/50 transition-all group relative theme-transition"
            >
              {/* Popular badge */}
              {tool.popular && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-2.5 py-1 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 rounded-full text-[10px] font-bold text-amber-500 flex items-center gap-1 shadow-lg shadow-amber-500/10">
                    <Sparkles className="w-3 h-3" />
                    POPULAR
                  </div>
                </div>
              )}

              {/* Header with Large Logo */}
              <div className="flex flex-col items-center mb-6 pt-4">
                <div className="relative group/logo">
                  {/* Category Icon Badge (smaller, in corner) */}
                  <div className={`absolute -top-2 -right-2 z-10 p-2 rounded-lg bg-gradient-to-br ${tool.gradient} shadow-lg border border-white/20 theme-transition`}>
                    <tool.icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Large Brand Logo Container */}
                  <div className={`w-20 h-20 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-br ${tool.gradient} shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 p-2 overflow-hidden flex items-center justify-center relative">
                      {tool.logo ? (
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="w-full h-full object-contain relative z-10 transition-opacity duration-300"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.classList.add('hidden');
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-full h-full items-center justify-center ${tool.logo ? 'hidden' : 'flex'}`}
                      >
                        <tool.icon className={`w-10 h-10 text-transparent bg-gradient-to-br ${tool.gradient} bg-clip-text`} />
                      </div>
                      
                      {/* Inner glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-black text-heading mb-3 group-hover:text-purple-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-lg text-text-muted leading-relaxed mb-4 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              {/* Features (Pills) */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-hover border border-surface-border rounded-lg text-[10px] text-text-secondary theme-transition">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${tool.gradient}`} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Footer Action */}
              <div className="mt-auto pt-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${tool.gradient}`} />
                  {tool.category}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600 hover:to-blue-600 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300"
                >
                  Explore
                  <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No tools found in this category.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl text-heading mb-3">
              Want More AI Learning Resources?
            </h3>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Join Tectonix to get personalized AI tool recommendations, exclusive tutorials, 
              and learn how to integrate these tools into your study workflow.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-get-started'))}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Explore Tectonix AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
