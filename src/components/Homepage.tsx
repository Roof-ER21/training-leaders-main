import React, { useState, useEffect } from 'react';
import CompanyMission from './CompanyMission';
import TeamSection from './TeamSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Play,
  Award,
  Trophy,
  Users,
  Bot,
  Video,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  Shield,
  
  
  ChevronDown,
  GraduationCap,
  CheckCircle,
  Clock,
  BarChart3,
  Briefcase,
  FileCheck,
} from 'lucide-react';

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return count;
};

// Hero section animations
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface HomepageProps {
  onNavigateToTraining: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigateToTraining }) => {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 500], [0, -100]);
  const yText = useTransform(scrollY, [0, 500], [0, 200]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Marcus Johnson',
      company: 'Elite Storm Restoration',
      role: 'Senior Sales Representative',
      content:
        'The training transformed how I approach roofing sales. My close rate increased from 35% to 78% in just 3 months. The AI roleplay sessions with Agnes were game-changing.',
      rating: 5,
      image: '/api/placeholder/80/80',
      metric: '+123% Revenue Growth',
    },
    {
      name: 'Jennifer Martinez',
      company: 'Storm Pros Roofing',
      role: 'Lead Sales Consultant',
      content:
        'I went from struggling with objections to confidently handling any concern. The hail damage identification training gave me the expertise to be seen as the trusted advisor.',
      rating: 5,
      image: '/api/placeholder/80/80',
      metric: '89% Close Rate',
    },
    {
      name: 'Robert Chen',
      company: 'Premier Roofing Solutions',
      role: 'Business Owner',
      content:
        'I trained my entire 12-person team with Roof ER. Our company revenue doubled, and our customer satisfaction scores went through the roof. Best investment I ever made.',
      rating: 5,
      image: '/api/placeholder/80/80',
      metric: '2x Company Revenue',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const [statsRef, statsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [partnersRef, partnersInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Animated counters for stats
  const trainedCounter = useCounter(5000, 2000, statsInView);
  const modulesCounter = useCounter(50, 2000, statsInView);
  const hoursCounter = useCounter(200, 2000, statsInView);
  const rateCounter = useCounter(95, 2000, statsInView);

  const stats = [
    { number: trainedCounter, suffix: '+', label: 'Sales Professionals Trained', icon: Users },
    { number: modulesCounter, suffix: '+', label: 'Training Modules', icon: BookOpen },
    { number: hoursCounter, suffix: '+', label: 'Hours of Content', icon: Clock },
    { number: rateCounter, suffix: '%', label: 'Average Completion Rate', icon: Trophy },
  ];

  const trainingModules = [
    {
      icon: Target,
      title: 'Sales Fundamentals',
      description:
        'Master consultative selling, objection handling, and closing techniques specifically for roofing.',
      features: ['8 Core Modules', 'AI Roleplay', 'Real Scenarios'],
      color: 'bg-roofRed',
      borderColor: 'border-roofRed/20',
      hoverColor: 'group-hover:border-roofRed',
      progress: 100,
    },
    {
      icon: Shield,
      title: 'Hail Damage Assessment',
      description:
        'Learn professional techniques to identify, document, and present hail damage findings with confidence.',
      features: ['12 Expert Videos', 'Photo Analysis', 'Certification'],
      color: 'bg-blue-600',
      borderColor: 'border-blue-600/20',
      hoverColor: 'group-hover:border-blue-600',
      progress: 85,
    },
    {
      icon: Bot,
      title: 'AI Sales Coach',
      description:
        'Practice with Agnes AI for unlimited roleplay scenarios, objection handling, and personalized feedback.',
      features: ['24/7 Practice', 'Instant Feedback', 'Custom Scenarios'],
      color: 'bg-purple-600',
      borderColor: 'border-purple-600/20',
      hoverColor: 'group-hover:border-purple-600',
      progress: 92,
    },
    {
      icon: FileCheck,
      title: 'Insurance Claims Mastery',
      description:
        'Navigate insurance processes, documentation requirements, and maximize claim approvals.',
      features: ['Claims Process', 'Documentation', 'Negotiation'],
      color: 'bg-green-600',
      borderColor: 'border-green-600/20',
      hoverColor: 'group-hover:border-green-600',
      progress: 78,
    },
    {
      icon: Briefcase,
      title: 'Professional Presentation',
      description:
        'Deliver compelling presentations that build trust and showcase your expertise to homeowners.',
      features: ['Templates', 'Video Examples', 'Practice Tools'],
      color: 'bg-orange-600',
      borderColor: 'border-orange-600/20',
      hoverColor: 'group-hover:border-orange-600',
      progress: 88,
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description:
        'Track your progress, identify improvement areas, and measure your growth with detailed analytics.',
      features: ['Progress Tracking', 'Skill Analysis', 'Insights'],
      color: 'bg-indigo-600',
      borderColor: 'border-indigo-600/20',
      hoverColor: 'group-hover:border-indigo-600',
      progress: 95,
    },
  ];

  const certifications = [
    { name: 'HAAG Certified', logo: '/api/placeholder/120/60' },
    { name: 'NRCIA Partner', logo: '/api/placeholder/120/60' },
    { name: 'ICC Certified', logo: '/api/placeholder/120/60' },
    { name: 'OSHA Approved', logo: '/api/placeholder/120/60' },
    { name: 'Better Business Bureau', logo: '/api/placeholder/120/60' },
    { name: 'Roofing Alliance', logo: '/api/placeholder/120/60' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - TheRoofDocs Inspired */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Pattern */}
        <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-roofRed/10 via-transparent to-roofRed/5 z-10" />
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="roof-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#roof-pattern)" />
            </svg>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: yText }}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center max-w-7xl mx-auto px-6 py-20"
        >
          {/* Brand Logo + Subline */}
          <div className="mb-6 flex flex-col items-center">
            <img src="/brand/roofer-logo.png" alt="Roof ER — The Roof Docs" className="h-14 md:h-16 w-auto mb-1" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <div className="text-xs md:text-sm font-semibold tracking-wide text-gray-300">THE ROOF DOCS</div>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-white border border-white/10">AGNES 21 • AI-POWERED</div>
          </div>
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-black/40 text-white border border-white/10 text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
              <Bot className="w-5 h-5 mr-2" />
              Agnes 21 — AI Training
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
          >
            Master Roofing Excellence
            <span className="block text-roofRed mt-4">
              Professional Training for Tomorrow's Leaders
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Join 5,000+ roofing professionals who've transformed their careers with expert-led training,
            AI coaching, and industry-recognized certifications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <button
              onClick={onNavigateToTraining}
              className="group flex items-center px-10 py-5 bg-roofRed text-white font-bold text-lg rounded-xl hover:bg-roofRed-dark transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-roofRed/50"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Training Now
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>

            <button
              onClick={onNavigateToTraining}
              className="flex items-center px-10 py-5 border-3 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              <Video className="w-6 h-6 mr-3" />
              View Demo
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-base"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-roofRed" />
              <span className="font-semibold">5,000+ Trained</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-roofRed" />
              <span className="font-semibold">Industry Certified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </div>

      {/* Stats Section with Animated Counters */}
      <motion.section ref={statsRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-roofRed text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 animate-count-up">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Training Modules Section - Service Cards Style */}
      <motion.section ref={featuresRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Comprehensive Training Modules
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Expert-designed curriculum covering everything from sales fundamentals to advanced
              storm damage assessment and insurance claims.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className={`group bg-white rounded-2xl p-8 border-2 ${module.borderColor} ${module.hoverColor} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${module.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <module.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-roofRed transition-colors">
                  {module.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {module.description}
                </p>

                <div className="space-y-3 mb-6">
                  {module.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-500">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${module.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: featuresInView ? `${module.progress}%` : '0%' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={onNavigateToTraining}
              className="inline-flex items-center px-8 py-4 bg-roofRed text-white font-bold text-lg rounded-xl hover:bg-roofRed-dark transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <GraduationCap className="w-6 h-6 mr-3" />
              View All Modules
              <ArrowRight className="w-5 h-5 ml-3" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section ref={testimonialsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Real results from roofing professionals who transformed their careers with Roof ER Training.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-3xl p-12 md:p-16 shadow-xl border border-gray-100"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0 text-center md:text-left">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full mx-auto md:mx-0 mb-4 border-4 border-roofRed shadow-lg"
                  />
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                    {testimonials[currentTestimonial].metric}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="text-6xl text-roofRed mb-4 leading-none">"</div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                    {testimonials[currentTestimonial].content}
                  </blockquote>

                  <div>
                    <div className="font-black text-gray-900 text-2xl mb-1">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-roofRed font-bold text-lg mb-1">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-10 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-roofRed w-12'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certifications & Partners Section */}
      <motion.section ref={partnersRef} className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Industry Recognized & Certified
            </h3>
            <p className="text-lg text-gray-600">
              Trusted by leading roofing organizations and certification bodies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={partnersInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center h-28 group cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-full h-12 bg-gray-200 rounded mb-2 group-hover:bg-gray-300 transition-colors" />
                  <div className="text-xs font-semibold text-gray-600 group-hover:text-roofRed transition-colors">
                    {cert.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <TeamSection />

      {/* Mission / Values */}
      <CompanyMission />

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-roofRed-dark to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of roofing professionals who've increased their close rates,
              earned more income, and became trusted experts in their field.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={onNavigateToTraining}
                className="group flex items-center justify-center px-10 py-5 bg-roofRed text-white font-bold text-xl rounded-xl hover:bg-white hover:text-roofRed transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Your Journey Today
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={onNavigateToTraining}
                className="flex items-center justify-center px-10 py-5 border-3 border-white text-white font-bold text-xl rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Users className="w-6 h-6 mr-3" />
                Schedule Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-300 text-base font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                30-Day Money-Back Guarantee
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Industry-Recognized Certificates
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Lifetime Access
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
