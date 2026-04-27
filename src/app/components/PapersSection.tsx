import {
  FileText, BookOpen, Award, Search, X, Filter,
  ChevronDown, ChevronUp, ExternalLink, Bookmark, BookmarkCheck,
  Star, Quote, Sparkles, FlaskConical, Code, Cpu,
  Zap, Wrench, Building2, Brain, Globe,
  ArrowUpRight, BadgeCheck, Calendar, Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, memo } from 'react';

/* ──────────────── branch config ──────────────── */
const BRANCH_META: Record<string, { gradient: string; icon: React.ElementType; color: string; label: string }> = {
  'CSE AI & DS': { gradient: 'from-blue-600 to-cyan-500', icon: Brain,     color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'AI & Data Science' },
  'CSE':         { gradient: 'from-blue-600 to-cyan-500', icon: Code,      color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Computer Science'  },
  'ECE':         { gradient: 'from-blue-600 to-cyan-500', icon: Cpu,       color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Electronics & Comm'},
  'EEE':         { gradient: 'from-blue-600 to-cyan-500', icon: Zap,       color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Electrical Engg'   },
  'MEC':         { gradient: 'from-blue-600 to-cyan-500', icon: Wrench,    color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Mechanical'        },
  'CIVIL':       { gradient: 'from-blue-600 to-cyan-500', icon: Building2, color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Civil Engineering' },
};

const IMPACT_META = {
  High:   { cls: 'text-blue-400  bg-blue-500/10  border-blue-500/25',  dot: 'bg-blue-400'  },
  Medium: { cls: 'text-cyan-400  bg-cyan-500/10  border-cyan-500/25',  dot: 'bg-cyan-400'  },
  Low:    { cls: 'text-text-muted bg-slate-500/10 border-slate-500/25', dot: 'bg-slate-400' },
};

const TYPE_META: Record<string, string> = {
  'Journal':    'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Conference': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Survey':     'text-blue-300 bg-blue-400/10 border-blue-400/20',
  'Workshop':   'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
};

/* ──────────────── paper data ──────────────── */
const PAPERS = [
  // ── CSE AI & DS ──
  { id: 1,  title: 'Deep Learning for Real-Time Object Detection in Autonomous Vehicles', authors: ['Dr. Priya Sharma', 'Rahul Verma', 'Anjali Patel'], journal: 'IEEE Transactions on Neural Networks', year: '2024', branch: 'CSE AI & DS', citations: 342, impact: 'High',   type: 'Journal',    keywords: ['Deep Learning', 'Object Detection', 'Autonomous Vehicles', 'Computer Vision'], abstract: 'Novel deep learning architecture optimized for real-time object detection in autonomous driving. Achieves 45 FPS on embedded hardware with 94.2% mAP on standard benchmarks, outperforming YOLO and SSD baselines.', link: 'https://scholar.google.com/scholar?q=Deep+Learning+Real-Time+Object+Detection+Autonomous+Vehicles' },
  { id: 2,  title: 'Transformer Models for Natural Language Understanding: A Comprehensive Survey', authors: ['Dr. Arun Kumar', 'Sneha Singh'], journal: 'ACM Computing Surveys', year: '2024', branch: 'CSE AI & DS', citations: 567, impact: 'High',   type: 'Survey',     keywords: ['Transformers', 'NLP', 'BERT', 'GPT', 'LLMs'], abstract: 'Comprehensive analysis of 120+ transformer architectures across modern NLP tasks. Benchmarks include GLUE, SuperGLUE, SQuAD and multilingual tasks, with empirical comparison of 18 leading models.', link: 'https://scholar.google.com/scholar?q=Transformer+Models+Natural+Language+Understanding+Survey' },
  { id: 3,  title: 'Reinforcement Learning for Robotic Control Systems', authors: ['Prof. Kavita Mehta', 'Arjun Reddy'], journal: 'Journal of AI Research', year: '2024', branch: 'CSE AI & DS', citations: 298, impact: 'High',   type: 'Journal',    keywords: ['Reinforcement Learning', 'Robotics', 'Control', 'Policy Gradient'], abstract: 'Novel policy gradient algorithms for real-time robotic manipulation. Our approach achieves 89% task success on dexterous manipulation benchmarks, exceeding SAC and PPO baselines by 12%.', link: 'https://scholar.google.com/scholar?q=Reinforcement+Learning+Robotics+Control+Systems' },
  { id: 4,  title: 'Generative Adversarial Networks for High-Resolution Image Synthesis', authors: ['Dr. Rajesh Gupta', 'Pooja Sharma'], journal: 'Computer Vision and Pattern Recognition', year: '2024', branch: 'CSE AI & DS', citations: 423, impact: 'High',   type: 'Conference', keywords: ['GANs', 'Image Synthesis', 'Generative Models', 'Style Transfer'], abstract: 'Advanced GAN architecture for 4K image generation. Introduces multi-scale discriminator and adaptive instance normalization, achieving state-of-the-art FID score of 2.3 on FFHQ dataset.', link: 'https://scholar.google.com/scholar?q=GANs+High+Resolution+Image+Synthesis' },
  { id: 5,  title: 'Federated Learning for Privacy-Preserving AI Systems', authors: ['Dr. Neha Verma', 'Vikram Singh'], journal: 'IEEE Security & Privacy', year: '2024', branch: 'CSE AI & DS', citations: 389, impact: 'High',   type: 'Journal',    keywords: ['Federated Learning', 'Privacy', 'Differential Privacy', 'Edge AI'], abstract: 'Federated learning framework with differential privacy guarantees for collaborative ML without raw data sharing. Achieves within 2% of centralized accuracy with formal ε-differential privacy.', link: 'https://scholar.google.com/scholar?q=Federated+Learning+Privacy+Preserving+AI' },
  { id: 6,  title: 'Neural Architecture Search for Edge AI Devices', authors: ['Prof. Suresh Babu', 'Divya Krishnan'], journal: 'ACM Transactions on Embedded Computing', year: '2024', branch: 'CSE AI & DS', citations: 234, impact: 'Medium', type: 'Journal',    keywords: ['NAS', 'Edge AI', 'Neural Networks', 'Embedded Systems'], abstract: 'Automated neural architecture search for resource-constrained edge devices. Reduces search cost by 80× while discovering architectures with 3× better accuracy-latency trade-off than MobileNetV3.', link: 'https://scholar.google.com/scholar?q=Neural+Architecture+Search+Edge+Devices' },
  { id: 7,  title: 'Explainable AI for Medical Diagnosis: Interpretability Methods Survey', authors: ['Dr. Anitha Rao', 'Karthik Menon'], journal: 'Journal of Medical AI', year: '2024', branch: 'CSE AI & DS', citations: 512, impact: 'High',   type: 'Survey',     keywords: ['Explainable AI', 'Healthcare', 'LIME', 'SHAP', 'Interpretability'], abstract: 'Comprehensive survey of interpretability methods for medical AI, covering LIME, SHAP, Grad-CAM across 50+ datasets. Provides guidelines for deploying explainable models in clinical settings.', link: 'https://scholar.google.com/scholar?q=Explainable+AI+Medical+Diagnosis' },
  { id: 8,  title: 'Contrastive Learning for Unsupervised Visual Representation', authors: ['Dr. Ramesh Gupta', 'Sneha Reddy'], journal: 'ICLR', year: '2024', branch: 'CSE AI & DS', citations: 523, impact: 'High',   type: 'Conference', keywords: ['Contrastive Learning', 'Self-Supervised', 'Representation', 'SimCLR'], abstract: 'New contrastive learning framework achieving 85.4% linear probe accuracy on ImageNet without labels, surpassing SimCLR by 4.2 points with 40% less compute.', link: 'https://scholar.google.com/scholar?q=Contrastive+Learning+Unsupervised+Visual+Representation' },
  { id: 9,  title: 'Graph Neural Networks for Large-Scale Social Network Analysis', authors: ['Prof. Vijay Deshmukh', 'Priya Nair'], journal: 'ACM Transactions on Knowledge Discovery', year: '2024', branch: 'CSE AI & DS', citations: 278, impact: 'Medium', type: 'Journal',    keywords: ['GNN', 'Graph Learning', 'Community Detection', 'Link Prediction'], abstract: 'Scalable GNN architecture for billion-node graphs with O(log n) complexity. Demonstrates 8.3% improvement on link prediction and 5.1% on node classification over GraphSAGE.', link: 'https://scholar.google.com/scholar?q=Graph+Neural+Networks+Social+Network+Analysis' },
  { id: 10, title: 'Meta-Learning for Few-Shot Classification', authors: ['Dr. Sanjay Sharma', 'Anjali Kumar'], journal: 'ICML', year: '2024', branch: 'CSE AI & DS', citations: 401, impact: 'High',   type: 'Conference', keywords: ['Meta-Learning', 'Few-Shot Learning', 'MAML', 'Prototypical Networks'], abstract: 'Hierarchical meta-learning framework enabling rapid adaptation with 1-5 examples. Achieves 96.1% on miniImageNet 5-way 5-shot benchmark, surpassing MAML++ by 3.2%.', link: 'https://scholar.google.com/scholar?q=Meta-Learning+Few-Shot+Classification' },
  { id: 11, title: 'Large Language Models for Code Generation and Bug Detection', authors: ['Dr. Meera Reddy', 'Aditya Singh'], journal: 'ACM SIGPLAN', year: '2024', branch: 'CSE AI & DS', citations: 356, impact: 'High',   type: 'Conference', keywords: ['LLMs', 'Code Generation', 'Bug Detection', 'Program Synthesis'], abstract: 'Fine-tuned LLM for code generation achieves 67.3% pass@1 on HumanEval and detects 89% of common vulnerability patterns, outperforming Codex on Python and Java tasks.', link: 'https://scholar.google.com/scholar?q=Large+Language+Models+Code+Generation' },
  { id: 12, title: 'Diffusion Models for Medical Image Synthesis', authors: ['Prof. Kumar Patel', 'Sneha Verma'], journal: 'Nature Machine Intelligence', year: '2024', branch: 'CSE AI & DS', citations: 489, impact: 'High',   type: 'Journal',    keywords: ['Diffusion Models', 'Medical Imaging', 'Data Augmentation', 'Generative AI'], abstract: 'Conditional diffusion models for synthesizing realistic MRI and CT scans for data augmentation. Improves downstream segmentation model accuracy by 7.4% in low-data regimes.', link: 'https://scholar.google.com/scholar?q=Diffusion+Models+Medical+Image+Synthesis' },
  { id: 13, title: 'Quantum Machine Learning: Algorithms and Applications', authors: ['Dr. Arvind Krishnan', 'Pooja Gupta'], journal: 'Quantum Information Processing', year: '2024', branch: 'CSE AI & DS', citations: 198, impact: 'Medium', type: 'Survey',     keywords: ['Quantum ML', 'VQE', 'QAOA', 'Quantum Advantage'], abstract: 'Survey of 60+ quantum ML algorithms covering variational circuits, quantum kernels and HHL algorithm. Provides theoretical bounds on quantum advantage for ML tasks.', link: 'https://scholar.google.com/scholar?q=Quantum+Machine+Learning+Algorithms' },
  { id: 14, title: 'Multi-Modal Foundation Models: Vision-Language Alignment', authors: ['Dr. Rajiv Mehta', 'Divya Sharma'], journal: 'NeurIPS', year: '2024', branch: 'CSE AI & DS', citations: 445, impact: 'High',   type: 'Conference', keywords: ['Multi-Modal', 'CLIP', 'Foundation Models', 'Vision-Language'], abstract: 'New cross-modal alignment technique for vision-language models achieving 86.2% zero-shot ImageNet accuracy, surpassing CLIP by 5.1 points with 3× smaller pre-training dataset.', link: 'https://scholar.google.com/scholar?q=Multi-Modal+Foundation+Models+Vision+Language' },
  { id: 15, title: 'Efficient Transformers for Long-Context Reasoning', authors: ['Prof. Sunil Kumar', 'Kavita Singh'], journal: 'EMNLP', year: '2024', branch: 'CSE AI & DS', citations: 267, impact: 'Medium', type: 'Conference', keywords: ['Efficient Transformers', 'Long Context', 'Attention', 'Linear Complexity'], abstract: 'Linear-complexity attention mechanism enabling 1M-token context windows with 10× memory reduction. Achieves parity with full attention on SCROLLS long-range benchmark.', link: 'https://scholar.google.com/scholar?q=Efficient+Transformers+Long+Context+Reasoning' },

  // ── CSE ──
  { id: 16, title: 'Blockchain-Based Secure Data Management in Healthcare Systems', authors: ['Dr. Rajesh Kumar', 'Neha Gupta'], journal: 'Journal of Medical Informatics', year: '2024', branch: 'CSE', citations: 423, impact: 'High',   type: 'Journal',    keywords: ['Blockchain', 'Healthcare', 'Data Security', 'Smart Contracts'], abstract: 'Novel permissioned blockchain architecture for decentralized healthcare records with HIPAA-compliant access control. Reduces data breach risk by 94% vs. centralized systems in real hospital deployment.', link: 'https://scholar.google.com/scholar?q=Blockchain+Secure+Data+Management+Healthcare' },
  { id: 17, title: 'Cloud-Native Microservices Architecture Patterns', authors: ['Prof. Suresh Nair', 'Divya Kumar'], journal: 'ACM Transactions on Software Engineering', year: '2024', branch: 'CSE', citations: 378, impact: 'High',   type: 'Journal',    keywords: ['Microservices', 'Cloud Computing', 'Kubernetes', 'DevOps'], abstract: 'Catalog of 32 cloud-native patterns with empirical evaluation on 15 production systems. Identifies anti-patterns causing 63% of microservice outages and provides mitigation strategies.', link: 'https://scholar.google.com/scholar?q=Cloud+Native+Microservices+Architecture+Patterns' },
  { id: 18, title: 'Cybersecurity Threat Detection Using Machine Learning', authors: ['Dr. Kavita Reddy', 'Vikram Singh'], journal: 'IEEE Security & Privacy', year: '2024', branch: 'CSE', citations: 512, impact: 'High',   type: 'Journal',    keywords: ['Cybersecurity', 'Intrusion Detection', 'ML', 'Anomaly Detection'], abstract: 'Ensemble ML system for zero-day threat detection achieving 97.3% detection rate with 0.01% false positives on CICIDS2023 dataset. Deploys in under 50ms inference latency.', link: 'https://scholar.google.com/scholar?q=Cybersecurity+Threat+Detection+Machine+Learning' },
  { id: 19, title: 'DevSecOps: Integrating Security in CI/CD Pipelines', authors: ['Dr. Priya Sharma', 'Arun Verma'], journal: 'IEEE Software', year: '2024', branch: 'CSE', citations: 298, impact: 'High',   type: 'Journal',    keywords: ['DevSecOps', 'CI/CD', 'SAST', 'DAST', 'Security Automation'], abstract: 'Framework for integrating SAST, DAST and SCA tools into CI/CD with minimal developer friction. Reduces security debt by 71% in case study of 8 enterprise pipelines.', link: 'https://scholar.google.com/scholar?q=DevSecOps+Security+CICD+Pipelines' },
  { id: 20, title: 'WebAssembly Performance for High-Performance Web Applications', authors: ['Dr. Ramesh Patel', 'Lakshmi Singh'], journal: 'ACM Web Conference', year: '2024', branch: 'CSE', citations: 234, impact: 'Medium', type: 'Conference', keywords: ['WebAssembly', 'WASM', 'Web Performance', 'Near-Native Speed'], abstract: 'Comprehensive benchmark of WASM vs. native and JavaScript across compute-intensive tasks. WASM achieves 82% of native C++ performance with 4.7× speedup over equivalent JS.', link: 'https://scholar.google.com/scholar?q=WebAssembly+Performance+Web+Applications' },
  { id: 21, title: 'Serverless Computing for Real-Time Data Processing', authors: ['Prof. Vijay Nair', 'Anjali Patel'], journal: 'IEEE Transactions on Cloud Computing', year: '2024', branch: 'CSE', citations: 312, impact: 'High',   type: 'Journal',    keywords: ['Serverless', 'FaaS', 'Real-Time', 'Event-Driven Architecture'], abstract: 'Serverless streaming pipeline achieving sub-10ms cold-start latency with predictive pre-warming. Reduces infrastructure cost by 68% vs. Kubernetes for bursty real-time workloads.', link: 'https://scholar.google.com/scholar?q=Serverless+Computing+Real+Time+Data+Processing' },
  { id: 22, title: 'Graph Database Systems for Knowledge Graph Reasoning', authors: ['Dr. Anita Rao', 'Karthik Sharma'], journal: 'VLDB', year: '2024', branch: 'CSE', citations: 267, impact: 'Medium', type: 'Conference', keywords: ['Knowledge Graphs', 'Graph Databases', 'SPARQL', 'Reasoning'], abstract: 'Distributed graph database with native reasoning support achieving 50× speedup on SPARQL queries vs. RDF triple stores. Evaluated on Wikidata-scale 10B+ triple datasets.', link: 'https://scholar.google.com/scholar?q=Graph+Database+Knowledge+Graph+Reasoning' },
  { id: 23, title: 'Container Orchestration Security in Kubernetes Clusters', authors: ['Dr. Meera Gupta', 'Arjun Kumar'], journal: 'IEEE Transactions on Dependable Systems', year: '2024', branch: 'CSE', citations: 289, impact: 'High',   type: 'Journal',    keywords: ['Kubernetes', 'Container Security', 'Pod Security', 'Runtime Defense'], abstract: 'Formal security model for Kubernetes with automated policy synthesis. Detects 94% of CVE-level misconfigurations and generates remediation policies with zero false negatives.', link: 'https://scholar.google.com/scholar?q=Container+Orchestration+Security+Kubernetes' },
  { id: 24, title: 'Progressive Web Apps: Performance and User Experience Analysis', authors: ['Prof. Suresh Verma', 'Divya Patel'], journal: 'WWW Conference', year: '2024', branch: 'CSE', citations: 198, impact: 'Medium', type: 'Conference', keywords: ['PWA', 'Web Performance', 'Core Web Vitals', 'Service Workers'], abstract: 'Large-scale study of 500 PWAs measuring Core Web Vitals, offline functionality and engagement. PWAs achieve 40% lower bounce rate and 2.3× better LCP vs. traditional web apps.', link: 'https://scholar.google.com/scholar?q=Progressive+Web+Apps+Performance+User+Experience' },
  { id: 25, title: 'Zero-Trust Network Architecture for Enterprise Security', authors: ['Dr. Rajiv Sharma', 'Pooja Reddy'], journal: 'IEEE Network', year: '2024', branch: 'CSE', citations: 356, impact: 'High',   type: 'Journal',    keywords: ['Zero Trust', 'Enterprise Security', 'Identity', 'Micro-Segmentation'], abstract: 'Reference architecture for zero-trust implementation in Fortune 500 enterprises. Deployment reduces lateral movement attacks by 97% with only 8% increase in authentication latency.', link: 'https://scholar.google.com/scholar?q=Zero+Trust+Network+Architecture+Enterprise+Security' },
  { id: 26, title: 'API Rate Limiting and Throttling for High-Availability Systems', authors: ['Dr. Neha Kumar', 'Vikram Patel'], journal: 'ACM SIGOPS', year: '2024', branch: 'CSE', citations: 178, impact: 'Medium', type: 'Conference', keywords: ['API Design', 'Rate Limiting', 'High Availability', 'Distributed Systems'], abstract: 'Adaptive token-bucket algorithm for multi-tier API rate limiting handling 10M req/s. Achieves 99.99% uptime with dynamic capacity planning under flash-crowd traffic patterns.', link: 'https://scholar.google.com/scholar?q=API+Rate+Limiting+High+Availability' },

  // ── ECE ──
  { id: 27, title: '5G NR Massive MIMO Beamforming for mmWave Communications', authors: ['Dr. Suresh Rajan', 'Priya Nair', 'Arun Verma'], journal: 'IEEE Transactions on Wireless Communications', year: '2024', branch: 'ECE', citations: 445, impact: 'High',   type: 'Journal',    keywords: ['5G', 'Massive MIMO', 'Beamforming', 'mmWave', 'Sub-THz'], abstract: 'Hybrid beamforming algorithm for 256-antenna 5G NR array achieving 98 Gbps throughput at 28 GHz. Reduces beam training overhead by 73% using AI-assisted channel prediction.', link: 'https://scholar.google.com/scholar?q=5G+NR+Massive+MIMO+Beamforming+mmWave' },
  { id: 28, title: 'VLSI Implementation of Neural Network Accelerators', authors: ['Prof. Kavita Singh', 'Rahul Krishnan'], journal: 'IEEE Journal of Solid-State Circuits', year: '2024', branch: 'ECE', citations: 389, impact: 'High',   type: 'Journal',    keywords: ['VLSI', 'Neural Network', 'Accelerator', 'ASIC', 'Low Power'], abstract: 'Energy-efficient inference accelerator in 7nm CMOS achieving 128 TOPS/W for transformer inference. 4× better efficiency than NVIDIA A100 for INT4 quantized inference.', link: 'https://scholar.google.com/scholar?q=VLSI+Neural+Network+Accelerator' },
  { id: 29, title: 'IoT Security: Lightweight Cryptography for Constrained Devices', authors: ['Dr. Anitha Reddy', 'Karthik Kumar'], journal: 'IEEE Internet of Things Journal', year: '2024', branch: 'ECE', citations: 312, impact: 'High',   type: 'Journal',    keywords: ['IoT Security', 'Lightweight Cryptography', 'Embedded', 'Side-Channel'], abstract: 'ASCON-based cryptographic suite for 8-bit MCUs consuming under 1.2 μJ per encryption. Provides 128-bit security with formal side-channel resistance proof on STM32 devices.', link: 'https://scholar.google.com/scholar?q=IoT+Security+Lightweight+Cryptography+Constrained+Devices' },
  { id: 30, title: 'FPGA-based Real-Time Digital Signal Processing for Radar Systems', authors: ['Dr. Vijay Patel', 'Sneha Krishnan'], journal: 'IEEE Transactions on Signal Processing', year: '2024', branch: 'ECE', citations: 278, impact: 'High',   type: 'Journal',    keywords: ['FPGA', 'DSP', 'Radar', 'Real-Time Processing', 'Xilinx'], abstract: 'Pipelined FPGA implementation of CFAR radar processing achieving 400 MHz clock with 0.1° angular resolution. 8× faster than GPU equivalent for 4D radar point cloud generation.', link: 'https://scholar.google.com/scholar?q=FPGA+Real+Time+Digital+Signal+Processing+Radar' },
  { id: 31, title: 'Software-Defined Networking for Next-Generation Mobile Networks', authors: ['Dr. Meera Gupta', 'Arun Sharma'], journal: 'IEEE Communications Magazine', year: '2024', branch: 'ECE', citations: 456, impact: 'High',   type: 'Journal',    keywords: ['SDN', '5G Core', 'Network Slicing', 'O-RAN', 'Virtualization'], abstract: 'O-RAN-compliant SDN controller with AI-driven network slicing achieving <1ms handover latency. Demonstrated on live 5G testbed with 32 simultaneous network slices and 99.999% uptime.', link: 'https://scholar.google.com/scholar?q=Software+Defined+Networking+5G+Mobile+Networks' },
  { id: 32, title: 'Medical Imaging with Deep Learning: From MRI to Pathology Slides', authors: ['Dr. Rajiv Menon', 'Divya Verma'], journal: 'npj Digital Medicine', year: '2024', branch: 'ECE', citations: 523, impact: 'High',   type: 'Journal',    keywords: ['Medical Imaging', 'CNN', 'Segmentation', 'Pathology AI', 'Radiology'], abstract: 'Universal medical imaging backbone pre-trained on 5M scans achieving 93.7% sensitivity for early cancer detection across CT, MRI and whole-slide pathology, validated in 3 hospitals.', link: 'https://scholar.google.com/scholar?q=Medical+Imaging+Deep+Learning+MRI+Pathology' },
  { id: 33, title: 'Neuromorphic Computing: Spiking Neural Networks for Edge AI', authors: ['Prof. Suresh Nair', 'Lakshmi Singh'], journal: 'Nature Electronics', year: '2024', branch: 'ECE', citations: 334, impact: 'High',   type: 'Journal',    keywords: ['Neuromorphic', 'SNN', 'Edge AI', 'Intel Loihi', 'Event-Driven'], abstract: 'Spiking neural network implementation on Intel Loihi 2 consuming 35μW for keyword spotting with 95.8% accuracy. 1000× more energy-efficient than equivalent CNN on ARM Cortex-M.', link: 'https://scholar.google.com/scholar?q=Neuromorphic+Computing+Spiking+Neural+Networks+Edge+AI' },
  { id: 34, title: 'Optical Fiber Communication: Coherent Transmission at 1.6 Tbps', authors: ['Dr. Priya Krishnan', 'Arjun Patel'], journal: 'Journal of Lightwave Technology', year: '2024', branch: 'ECE', citations: 245, impact: 'Medium', type: 'Journal',    keywords: ['Optical Fiber', 'Coherent Optics', 'WDM', 'DSP Modem', 'DP-64QAM'], abstract: '1.6 Tbps coherent optical transmission using DP-64QAM with AI-assisted nonlinearity compensation over 3000 km. Sets new single-span capacity record for transoceanic links.', link: 'https://scholar.google.com/scholar?q=Optical+Fiber+Communication+Coherent+Transmission+Tbps' },
  { id: 35, title: 'Antenna Arrays for Reconfigurable Intelligent Surfaces', authors: ['Dr. Anitha Reddy', 'Karthik Kumar'], journal: 'IEEE Transactions on Antennas and Propagation', year: '2024', branch: 'ECE', citations: 289, impact: 'Medium', type: 'Journal',    keywords: ['RIS', 'Smart Surfaces', 'Beamforming', 'Passive Array', 'Indoor Coverage'], abstract: 'Reconfigurable intelligent surface with 256 elements improving indoor 5G coverage by 18 dB. PIN-diode-based beam steering achieves <5μs reconfiguration time with 1-bit phase resolution.', link: 'https://scholar.google.com/scholar?q=Antenna+Arrays+Reconfigurable+Intelligent+Surfaces' },

  // ── EEE ──
  { id: 36, title: 'Grid-Scale Battery Energy Storage Systems for Renewable Integration', authors: ['Dr. Priya Reddy', 'Arun Sharma', 'Kavita Nair'], journal: 'Applied Energy', year: '2024', branch: 'EEE', citations: 512, impact: 'High',   type: 'Journal',    keywords: ['Battery Storage', 'Grid-Scale', 'Renewable Energy', 'LFP', 'BMS'], abstract: 'Optimal sizing and control strategy for 100 MWh grid-scale LFP battery storage. Improves renewable curtailment by 84% and reduces LCOE of solar-plus-storage to ₹2.1/kWh in Indian grid.', link: 'https://scholar.google.com/scholar?q=Grid+Scale+Battery+Energy+Storage+Renewable+Integration' },
  { id: 37, title: 'Power Quality Improvement using Active Power Filters', authors: ['Prof. Suresh Raman', 'Divya Krishnan'], journal: 'IEEE Transactions on Power Electronics', year: '2024', branch: 'EEE', citations: 389, impact: 'High',   type: 'Journal',    keywords: ['Power Quality', 'Active Filter', 'Harmonics', 'THD', 'PWM Inverter'], abstract: 'Three-phase shunt APF with predictive current control reducing THD from 28.7% to 1.3%. FPGA implementation achieves 40 kHz switching with <2μs response time for industrial loads.', link: 'https://scholar.google.com/scholar?q=Power+Quality+Active+Power+Filters' },
  { id: 38, title: 'Electric Vehicle Motor Drive Systems: A Comparative Analysis', authors: ['Dr. Rajesh Patel', 'Sneha Kumar'], journal: 'IEEE Transactions on Industry Applications', year: '2024', branch: 'EEE', citations: 445, impact: 'High',   type: 'Survey',     keywords: ['EV Motors', 'PMSM', 'Induction Motor', 'Motor Drive', 'FOC', 'DTC'], abstract: 'Systematic comparison of PMSM, SRM and IM drives for EV traction covering efficiency maps, thermal performance and cost. PMSM with FOC achieves 97.2% peak efficiency for Indian drive cycles.', link: 'https://scholar.google.com/scholar?q=Electric+Vehicle+Motor+Drive+Systems+Comparative' },
  { id: 39, title: 'Smart Grid Demand Response with AI-Driven Load Forecasting', authors: ['Dr. Neha Gupta', 'Vikram Reddy'], journal: 'Energy and AI', year: '2024', branch: 'EEE', citations: 312, impact: 'High',   type: 'Journal',    keywords: ['Smart Grid', 'Demand Response', 'Load Forecasting', 'LSTM', 'SCADA'], abstract: 'AI-driven demand response platform using LSTM forecasting with 1.2% MAPE. Reduces peak demand by 23% in pilot deployment across 50,000 residential smart meters in Bengaluru.', link: 'https://scholar.google.com/scholar?q=Smart+Grid+Demand+Response+AI+Load+Forecasting' },
  { id: 40, title: 'High-Voltage DC Transmission for Offshore Wind Farms', authors: ['Prof. Kumar Sharma', 'Anjali Singh'], journal: 'IET Generation, Transmission & Distribution', year: '2024', branch: 'EEE', citations: 267, impact: 'High',   type: 'Journal',    keywords: ['HVDC', 'Offshore Wind', 'VSC', 'Power Transmission', 'Converter'], abstract: 'VSC-HVDC link design for 2 GW offshore wind farm at 600 km distance. Optimized modular multilevel converter reduces switching losses by 31% vs. conventional 2-level VSC.', link: 'https://scholar.google.com/scholar?q=HVDC+Transmission+Offshore+Wind+Farms' },
  { id: 41, title: 'Microgrid Control and Energy Management in Island Mode', authors: ['Dr. Priya Verma', 'Karthik Patel'], journal: 'IEEE Systems Journal', year: '2024', branch: 'EEE', citations: 234, impact: 'Medium', type: 'Journal',    keywords: ['Microgrid', 'Islanding', 'Energy Management', 'Droop Control', 'DG'], abstract: 'Distributed energy management system for AC/DC hybrid microgrid with seamless islanding transition. Maintains frequency within ±0.05 Hz and voltage within ±1% during islanding events.', link: 'https://scholar.google.com/scholar?q=Microgrid+Control+Energy+Management+Island+Mode' },
  { id: 42, title: 'Permanent Magnet Synchronous Generator for Wind Turbines', authors: ['Dr. Anitha Kumar', 'Arjun Verma'], journal: 'Renewable Energy', year: '2024', branch: 'EEE', citations: 198, impact: 'Medium', type: 'Journal',    keywords: ['PMSG', 'Wind Energy', 'Generator Design', 'Axial Flux', 'Direct Drive'], abstract: 'Direct-drive axial-flux PMSG design achieving 96.8% efficiency at rated load for 3 MW wind turbines. Eliminates gearbox with 40% reduction in nacelle weight vs. conventional DFIG systems.', link: 'https://scholar.google.com/scholar?q=Permanent+Magnet+Synchronous+Generator+Wind+Turbines' },

  // ── MEC ──
  { id: 43, title: 'Additive Manufacturing of Functionally Graded Materials', authors: ['Dr. Suresh Nair', 'Priya Krishnan'], journal: 'Journal of Materials Processing Technology', year: '2024', branch: 'MEC', citations: 489, impact: 'High',   type: 'Journal',    keywords: ['3D Printing', 'FGM', 'Multi-Material', 'LPBF', 'Lattice Structures'], abstract: 'Laser powder bed fusion process for continuous gradient Ti-6Al-4V/Inconel 625 components. Achieves 98.7% density with 45% improvement in thermal fatigue life vs. monolithic alloy.', link: 'https://scholar.google.com/scholar?q=Additive+Manufacturing+Functionally+Graded+Materials' },
  { id: 44, title: 'Computational Fluid Dynamics for Turbine Blade Cooling Design', authors: ['Prof. Kavita Menon', 'Rahul Singh'], journal: 'International Journal of Heat and Mass Transfer', year: '2024', branch: 'MEC', citations: 334, impact: 'High',   type: 'Journal',    keywords: ['CFD', 'Turbine Blade', 'Cooling', 'RANS', 'Film Cooling', 'Conjugate HT'], abstract: 'LES-based conjugate heat transfer analysis of lattice-cooled turbine blade achieving 40°C reduction in metal temperature. Validated against experimental data with <3% error in Nusselt number.', link: 'https://scholar.google.com/scholar?q=CFD+Turbine+Blade+Cooling+Design' },
  { id: 45, title: 'AI-Driven Predictive Maintenance for Industrial Machinery', authors: ['Dr. Rajesh Verma', 'Neha Patel'], journal: 'Mechanical Systems and Signal Processing', year: '2024', branch: 'MEC', citations: 445, impact: 'High',   type: 'Journal',    keywords: ['Predictive Maintenance', 'Vibration Analysis', 'AI', 'IIoT', 'PHM'], abstract: 'Transformer-based PHM model for rotating machinery achieving 97.8% fault classification accuracy from vibration signals. Reduces unplanned downtime by 64% in cement plant deployment.', link: 'https://scholar.google.com/scholar?q=AI+Predictive+Maintenance+Industrial+Machinery' },
  { id: 46, title: 'Finite Element Analysis of Composite Aircraft Structures', authors: ['Dr. Priya Sharma', 'Arjun Gupta'], journal: 'Composite Structures', year: '2024', branch: 'MEC', citations: 289, impact: 'High',   type: 'Journal',    keywords: ['FEA', 'Composites', 'CFRP', 'Aerostructures', 'Damage Mechanics'], abstract: 'Progressive damage FEA of CFRP fuselage panels under combined loading. Predicts first-ply failure with 95% accuracy vs. test, enabling 18% weight reduction in structural design allowables.', link: 'https://scholar.google.com/scholar?q=Finite+Element+Analysis+Composite+Aircraft+Structures' },
  { id: 47, title: 'Robotics Process Automation in Smart Manufacturing', authors: ['Prof. Ramesh Kumar', 'Neha Sharma'], journal: 'Journal of Manufacturing Systems', year: '2024', branch: 'MEC', citations: 389, impact: 'High',   type: 'Journal',    keywords: ['RPA', 'Smart Factory', 'Industry 4.0', 'Collaborative Robots', 'Assembly'], abstract: 'Collaborative robot cell with AI vision achieving 0.02mm assembly accuracy at 1200 parts/hour. RPA integration reduces cycle time by 34% and eliminates 100% of repetitive ergonomic risks.', link: 'https://scholar.google.com/scholar?q=Robotics+Process+Automation+Smart+Manufacturing' },
  { id: 48, title: 'Topology Optimization for Lightweight Automotive Structures', authors: ['Dr. Anitha Reddy', 'Karthik Kumar'], journal: 'Structural and Multidisciplinary Optimization', year: '2024', branch: 'MEC', citations: 267, impact: 'Medium', type: 'Journal',    keywords: ['Topology Optimization', 'Lightweight Design', 'Automotive', 'SIMP', 'Crashworthiness'], abstract: 'Multi-objective topology optimization of EV battery tray achieving 32% mass reduction while meeting crash safety requirements. SIMP method with manufacturing constraints produces injection-mouldable designs.', link: 'https://scholar.google.com/scholar?q=Topology+Optimization+Lightweight+Automotive+Structures' },

  // ── CIVIL ──
  { id: 49, title: 'Machine Learning for Structural Health Monitoring of Bridges', authors: ['Dr. Priya Nair', 'Suresh Kumar', 'Anjali Singh'], journal: 'Engineering Structures', year: '2024', branch: 'CIVIL', citations: 423, impact: 'High',   type: 'Journal',    keywords: ['SHM', 'Bridge Monitoring', 'Machine Learning', 'Vibration', 'Damage Detection'], abstract: 'CNN-LSTM model for anomaly detection in bridge vibration data achieving 98.2% damage detection accuracy. Deployed on IoT sensor network of 12 bridges across Maharashtra with real-time alerts.', link: 'https://scholar.google.com/scholar?q=Machine+Learning+Structural+Health+Monitoring+Bridges' },
  { id: 50, title: 'Green Building Energy Efficiency: Passive Design Strategies', authors: ['Prof. Kavita Deshmukh', 'Rahul Verma'], journal: 'Energy and Buildings', year: '2024', branch: 'CIVIL', citations: 356, impact: 'High',   type: 'Journal',    keywords: ['Green Building', 'Passive Design', 'ECBC', 'Daylighting', 'Thermal Mass'], abstract: 'Parametric study of passive cooling strategies for tropical Indian climates achieving 48% reduction in cooling load. EnergyPlus simulations validated against measured data from 5 certified green buildings.', link: 'https://scholar.google.com/scholar?q=Green+Building+Energy+Efficiency+Passive+Design' },
  { id: 51, title: 'BIM-Integrated Construction Project Management', authors: ['Dr. Anitha Kumar', 'Karthik Sharma'], journal: 'Automation in Construction', year: '2024', branch: 'CIVIL', citations: 289, impact: 'High',   type: 'Journal',    keywords: ['BIM', '4D Scheduling', '5D Cost', 'Clash Detection', 'Digital Twin'], abstract: '5D BIM workflow integrating Revit, Navisworks and Power BI for real-time cost and schedule tracking. Reduces design RFIs by 67% and achieves 94% schedule compliance in high-rise project.', link: 'https://scholar.google.com/scholar?q=BIM+Construction+Project+Management' },
  { id: 52, title: 'Seismic Performance of RC Buildings with Base Isolation', authors: ['Dr. Suresh Rajan', 'Divya Patel'], journal: 'Soil Dynamics and Earthquake Engineering', year: '2024', branch: 'CIVIL', citations: 312, impact: 'High',   type: 'Journal',    keywords: ['Seismic', 'Base Isolation', 'LRB', 'Nonlinear Analysis', 'IS 1893'], abstract: 'Nonlinear time-history analysis of RC buildings with LRB isolation shows 78% reduction in floor acceleration. Comparative study of 6 isolation systems under IS 1893 zone V ground motions.', link: 'https://scholar.google.com/scholar?q=Seismic+Performance+RC+Buildings+Base+Isolation' },
  { id: 53, title: 'Sustainable Concrete with Industrial By-Products', authors: ['Prof. Kumar Verma', 'Sneha Singh'], journal: 'Construction and Building Materials', year: '2024', branch: 'CIVIL', citations: 245, impact: 'Medium', type: 'Journal',    keywords: ['Sustainable Concrete', 'Fly Ash', 'GGBS', 'UHPC', 'Carbon Footprint'], abstract: 'Ternary blended cement with 60% GGBS and fly ash achieving M80 strength with 45% reduction in embodied carbon. Life-cycle assessment over 100 years shows net-zero concrete is achievable.', link: 'https://scholar.google.com/scholar?q=Sustainable+Concrete+Industrial+By+Products' },
  { id: 54, title: 'Urban Flood Modelling with GIS and Machine Learning', authors: ['Dr. Neha Reddy', 'Arjun Kumar'], journal: 'Journal of Hydrology', year: '2024', branch: 'CIVIL', citations: 378, impact: 'High',   type: 'Journal',    keywords: ['Urban Flooding', 'SWMM', 'GIS', 'Random Forest', 'Flood Risk'], abstract: 'ML-enhanced urban flood model coupling SWMM with Random Forest achieving 91% accuracy in flood extent prediction. Deployed for Chennai flood early warning system with 72-hour lead time.', link: 'https://scholar.google.com/scholar?q=Urban+Flood+Modelling+GIS+Machine+Learning' },
];

const BRANCHES = ['All', 'CSE AI & DS', 'CSE', 'ECE', 'EEE', 'MEC', 'CIVIL'];
const IMPACTS   = ['All Impact', 'High', 'Medium'];
const TYPES     = ['All Types', 'Journal', 'Conference', 'Survey', 'Workshop'];
const SORT_OPTIONS = [
  { value: 'citations', label: 'Most Cited' },
  { value: 'year',      label: 'Most Recent' },
  { value: 'title',     label: 'A → Z' },
];
const PAGE_SIZE = 10;

/* ──────────────── sub-components ──────────────── */
const ImpactBadge = memo(({ impact }: { impact: string }) => {
  const m = IMPACT_META[impact as keyof typeof IMPACT_META] ?? IMPACT_META.Low;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${m.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {impact} Impact
    </span>
  );
});

const TypeBadge = memo(({ type }: { type: string }) => (
  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${TYPE_META[type] ?? TYPE_META['Journal']}`}>
    {type}
  </span>
));

/* ──────────────── paper card ──────────────── */
function PaperCard({ paper, idx }: { paper: typeof PAPERS[0]; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const [saved,    setSaved]    = useState(false);
  const meta = BRANCH_META[paper.branch] ?? BRANCH_META['CSE'];
  const BranchIcon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (idx % PAGE_SIZE) * 0.04, type: 'spring', stiffness: 90 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className={`relative bg-card-bg border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 ${
        expanded ? 'border-blue-500/50 shadow-lg shadow-blue-900/15' : 'border-card-border hover:border-slate-600'
      }`}>

        {/* top gradient accent */}
        <div className={`h-1 bg-gradient-to-r ${meta.gradient}`} />

        <div className="p-6">
          {/* ── header row ── */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* branch pill */}
              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${meta.color}`}>
                <BranchIcon className="w-3 h-3" />
                {paper.branch}
              </span>
              <ImpactBadge impact={paper.impact} />
              <TypeBadge type={paper.type} />
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {paper.year}
              </span>
            </div>

            {/* bookmark */}
            <button onClick={() => setSaved(s => !s)}
              className="shrink-0 p-1.5 rounded-lg hover:bg-surface transition-colors group/bm">
              {saved
                ? <BookmarkCheck className="w-4 h-4 text-blue-400" />
                : <Bookmark className="w-4 h-4 text-slate-600 group-hover/bm:text-text-muted transition-colors" />}
            </button>
          </div>

          {/* ── title ── */}
          <a href={paper.link} target="_blank" rel="noopener noreferrer"
            className="block group/title mb-3">
            <h3 className="text-lg font-bold text-heading leading-snug group-hover/title:text-blue-300 transition-colors">
              {paper.title}
              <ArrowUpRight className="inline ml-1.5 w-3.5 h-3.5 opacity-0 group-hover/title:opacity-100 transition-opacity text-blue-400" />
            </h3>
          </a>

          {/* ── authors & journal ── */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 shrink-0" />
              {paper.authors.join(' · ')}
            </span>
            <span className="hidden sm:block text-slate-700">|</span>
            <span className={`font-medium bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
              {paper.journal}
            </span>
          </div>

          {/* ── expandable abstract ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <div className="bg-surface border border-surface-border rounded-xl p-4 mb-4">
                  <p className="text-xs text-text-muted mb-1">Abstract</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{paper.abstract}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── keywords ── */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {paper.keywords.map((kw, i) => (
              <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${meta.color} opacity-75`}>
                {kw}
              </span>
            ))}
          </div>

          {/* ── footer row ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-card-border">
            {/* stats */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-text-secondary">{paper.citations.toLocaleString()}</span> citations
              </span>
            </div>

            {/* actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setExpanded(e => !e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  expanded
                    ? 'border-blue-500/40 bg-blue-600/10 text-blue-400'
                    : 'border-surface-border bg-surface text-text-muted hover:border-blue-500/50 hover:text-heading'
                }`}>
                {expanded
                  ? <><ChevronUp className="w-3.5 h-3.5" /> Hide Abstract</>
                  : <><ChevronDown className="w-3.5 h-3.5" /> Read Abstract</>}
              </button>
              <a href={paper.link} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${meta.gradient} text-white text-xs hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-[1.03]`}>
                <ExternalLink className="w-3.5 h-3.5" /> Read Paper
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────── featured card ──────────────── */
function FeaturedPaperCard({ paper }: { paper: typeof PAPERS[0] }) {
  const [saved, setSaved] = useState(false);
  const meta = BRANCH_META[paper.branch] ?? BRANCH_META['CSE'];
  const BranchIcon = meta.icon;

  return (
    <div className={`relative bg-card-bg border border-blue-500/35 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 mb-10`}>
      <div className={`h-1.5 bg-gradient-to-r ${meta.gradient}`} />
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Most Cited Paper
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${meta.color}`}>
              <BranchIcon className="w-3 h-3" /> {paper.branch}
            </span>
            <ImpactBadge impact={paper.impact} />
            <TypeBadge type={paper.type} />
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {paper.year}
            </span>
          </div>
          <button onClick={() => setSaved(s => !s)} className="shrink-0 p-2 rounded-xl hover:bg-surface transition-colors">
            {saved ? <BookmarkCheck className="w-5 h-5 text-blue-400" /> : <Bookmark className="w-5 h-5 text-text-muted" />}
          </button>
        </div>

        <a href={paper.link} target="_blank" rel="noopener noreferrer" className="block group/title mb-3">
          <h3 className="text-3xl font-bold text-heading leading-snug hover:text-blue-300 transition-colors">
            {paper.title}
            <ArrowUpRight className="inline ml-2 w-5 h-5 opacity-0 group-hover/title:opacity-100 transition-opacity text-blue-400" />
          </h3>
        </a>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 text-sm text-text-muted">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{paper.authors.join(' · ')}</span>
          <span className="text-slate-700">|</span>
          <span className={`font-medium bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>{paper.journal}</span>
        </div>

        <div className="bg-surface border border-surface-border rounded-xl p-5 mb-5">
          <p className="text-xs text-text-muted mb-2">Abstract</p>
          <p className="text-sm text-text-secondary leading-relaxed">{paper.abstract}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {paper.keywords.map((kw, i) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${meta.color}`}>{kw}</span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-card-border">
            <span className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-blue-400" />
                <span className="text-heading text-lg font-semibold">{paper.citations.toLocaleString()}</span> citations
              </span>
          <a href={paper.link} target="_blank" rel="noopener noreferrer"
            className={`px-6 py-3 bg-gradient-to-r ${meta.gradient} text-white rounded-xl text-sm hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center gap-2`}>
            <ExternalLink className="w-4 h-4" /> Read Full Paper
          </a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── main section ──────────────── */
export function PapersSection() {
  const [branch,     setBranch]     = useState('All');
  const [impact,     setImpact]     = useState('All Impact');
  const [paperType,  setPaperType]  = useState('All Types');
  const [search,     setSearch]     = useState('');
  const [sort,       setSort]       = useState('citations');
  const [page,       setPage]       = useState(1);

  const filtered = useMemo(() => {
    let list = PAPERS.filter(p => {
      const q  = search.toLowerCase();
      const mb = branch === 'All' || p.branch === branch;
      const mi = impact === 'All Impact' || p.impact === impact;
      const mt = paperType === 'All Types' || p.type === paperType;
      const mq = !q || p.title.toLowerCase().includes(q) ||
                 p.authors.some(a => a.toLowerCase().includes(q)) ||
                 p.keywords.some(k => k.toLowerCase().includes(q)) ||
                 p.journal.toLowerCase().includes(q);
      return mb && mi && mt && mq;
    });

    if (sort === 'citations') list = [...list].sort((a, b) => b.citations - a.citations);
    if (sort === 'year')      list = [...list].sort((a, b) => b.year.localeCompare(a.year));
    if (sort === 'title')     list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [branch, impact, paperType, search, sort]);

  const topPaper = useMemo(() => [...PAPERS].sort((a, b) => b.citations - a.citations)[0], []);
  const visible  = filtered.slice(0, page * PAGE_SIZE);
  const hasMore  = visible.length < filtered.length;
  const totalCitations = PAPERS.reduce((s, p) => s + p.citations, 0);

  const clearFilters = () => { setBranch('All'); setImpact('All Impact'); setPaperType('All Types'); setSearch(''); setPage(1); };
  const isFiltered   = branch !== 'All' || impact !== 'All Impact' || paperType !== 'All Types' || search;

  return (
    <div className="py-20 bg-gradient-to-b from-page-bg via-surface to-page-bg relative overflow-hidden">

      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A05_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



        {/* ════════ STATS STRIP ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {([
            { icon: FileText,   value: `${PAPERS.length}+`,              label: 'Research Papers',    sub: 'Across 6 branches'     },
            { icon: BookOpen,   value: '40+',                            label: 'Top Journals',       sub: 'IEEE, ACM, Nature & more' },
            { icon: Quote,      value: `${(totalCitations/1000).toFixed(1)}K+`, label: 'Total Citations', sub: 'Combined impact'      },
            { icon: Star,       value: '95%',                            label: 'High Impact',        sub: 'Papers rated High/Medium' },
          ] as const).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -4 }}
              className="bg-card-bg border border-card-border rounded-2xl p-5 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <s.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-base font-medium text-text-secondary mb-1">{s.label}</div>
              <div className="text-sm text-slate-600">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ FEATURED PAPER ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-text-muted">Featured Paper</span>
          </div>
          <FeaturedPaperCard paper={topPaper} />
        </motion.div>

        {/* ════════ FILTER BAR ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="space-y-4 mb-8">

          {/* search + sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by title, author, keyword or journal…"
                className="w-full pl-11 pr-10 py-3 bg-surface border border-surface-border rounded-xl text-text-secondary placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-surface text-sm transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-text-muted hover:text-heading transition-colors" />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-10 py-3 bg-surface border border-surface-border rounded-xl text-text-secondary text-sm focus:outline-none focus:border-blue-500 transition-all">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          {/* branch tabs */}
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map(b => {
              const meta = BRANCH_META[b];
              const Icon = meta?.icon;
              const count = b === 'All' ? PAPERS.length : PAPERS.filter(p => p.branch === b).length;
              return (
                <button key={b} onClick={() => { setBranch(b); setPage(1); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                    branch === b
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-surface text-text-secondary border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {b === 'All' ? 'All Papers' : b}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${branch === b ? 'bg-white/20 text-white' : 'bg-surface text-text-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* impact + type chips */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-600 flex items-center gap-1"><Filter className="w-3 h-3" />Impact:</span>
              {IMPACTS.map(i => (
                <button key={i} onClick={() => { setImpact(i); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                    impact === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-surface text-text-muted border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>{i}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-600 flex items-center gap-1"><FileText className="w-3 h-3" />Type:</span>
              {TYPES.map(t => (
                <button key={t} onClick={() => { setPaperType(t); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                    paperType === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-surface text-text-muted border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          {/* result count */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Showing <span className="text-blue-400">{Math.min(visible.length, filtered.length)}</span> of{' '}
              <span className="text-blue-400">{filtered.length}</span> papers
              {search && <> matching "<span className="text-heading font-medium">{search}</span>"</>}
            </p>
            {isFiltered && (
              <button onClick={clearFilters} className="text-xs text-text-muted hover:text-blue-400 transition-colors">
                Clear filters ×
              </button>
            )}
          </div>
        </motion.div>

        {/* ════════ PAPERS LIST ════════ */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 text-center">
              <Search className="w-14 h-14 mx-auto mb-4 text-slate-700" />
              <p className="text-base text-text-muted mb-2">No papers match your search.</p>
              <button onClick={clearFilters} className="text-sm text-blue-400 hover:underline">Clear all filters</button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-5">
              {visible.map((paper, idx) => (
                <PaperCard key={paper.id} paper={paper} idx={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ LOAD MORE ════════ */}
        {hasMore && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex justify-center mt-10">
            <motion.button onClick={() => setPage(p => p + 1)}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-heading hover:shadow-lg hover:shadow-blue-500/10 transition-all flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Load More Papers ({filtered.length - visible.length} remaining)
            </motion.button>
          </motion.div>
        )}

        {/* ════════ JOURNALS STRIP ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 bg-card-bg border border-card-border rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg text-heading">Featured Journals & Conferences</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {([
              { name: 'IEEE Trans.', sub: 'Transactions Series'  },
              { name: 'ACM',        sub: 'SIGPLAN / SIGGRAPH'   },
              { name: 'NeurIPS',    sub: 'Top ML Conference'    },
              { name: 'Nature',     sub: 'High-Impact Journals' },
              { name: 'Elsevier',   sub: 'Engineering Journals' },
              { name: 'ICML/ICLR', sub: 'ML Conferences'       },
            ] as const).map((j, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}
                className="border border-blue-500/25 bg-blue-500/5 rounded-xl p-4 text-center transition-all hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10">
                <div className="text-sm text-blue-400 mb-1">{j.name}</div>
                <div className="text-xs text-text-muted">{j.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ════════ BRANCH QUICK-NAV ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(BRANCH_META).map(([name, meta]) => {
            const Icon = meta.icon;
            const count = PAPERS.filter(p => p.branch === name).length;
            return (
              <motion.button key={name} onClick={() => { setBranch(name); setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}
                className="bg-card-bg border border-card-border rounded-2xl p-4 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                <div className={`w-10 h-10 mx-auto mb-2.5 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-heading font-medium mb-0.5">{name}</div>
                <div className="text-xs text-text-muted">{count} papers</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ════════ BOTTOM CTA ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 bg-gradient-to-br from-blue-900/25 to-blue-950/30 border border-blue-500/30 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,79,138,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-cyan-400" />
              <h3 className="text-3xl font-bold text-heading">Submit Your Research</h3>
            </div>
            <p className="text-text-muted max-w-xl text-base leading-relaxed">
              Published a paper? Get it featured in the Tectonix research library and
              reach thousands of engineering students across India.
            </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {['All Branches Welcome', 'Peer-Reviewed', 'Open Access Priority'].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <motion.a href="mailto:research@tectonix.com"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 justify-center">
                <FileText className="w-5 h-5" /> Submit a Paper
              </motion.a>
              <motion.a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-heading transition-all flex items-center gap-2 justify-center">
                <Globe className="w-4 h-4" /> Browse Google Scholar
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
