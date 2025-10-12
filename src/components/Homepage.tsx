import React, { useState, useEffect } from 'react';
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
  Zap,
  Globe,
  ChevronDown,
} from 'lucide-react';

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
      name: 'Mike Rodriguez',
      company: 'Apex Roofing Solutions',
      role: 'Senior Roofer',
      content:
        'RoofER Academy transformed my career. The AI coaching helped me master advanced techniques that increased my income by 40%.',
      rating: 5,
      image: '/api/placeholder/80/80',
    },
    {
      name: 'Sarah Chen',
      company: 'Metro Construction',
      role: 'Project Manager',
      content:
        'The certifications from RoofER Academy are recognized industry-wide. Our team completed the program and our efficiency improved dramatically.',
      rating: 5,
      image: '/api/placeholder/80/80',
    },
    {
      name: 'David Thompson',
      company: 'Roofing Excellence LLC',
      role: 'Business Owner',
      content:
        "Agnes AI is like having a personal mentor. The interactive training modules are the best investment I've made for my business.",
      rating: 5,
      image: '/api/placeholder/80/80',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
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

  const stats = [
    { number: '50,000+', label: 'Professionals Trained', icon: Users },
    { number: '98%', label: 'Completion Rate', icon: Trophy },
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '300+', label: 'Companies Trust Us', icon: Shield },
  ];

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Learning',
      description:
        'Agnes AI provides personalized coaching and real-time feedback tailored to your learning pace.',
      color: 'bg-purple-500',
    },
    {
      icon: Video,
      title: 'Interactive Video Training',
      description:
        'Immersive 3D roofing simulations and expert-led video content for hands-on learning.',
      color: 'bg-blue-500',
    },
    {
      icon: Target,
      title: 'Skill-Based Progression',
      description:
        'Master specific roofing techniques with our structured, competency-based curriculum.',
      color: 'bg-green-500',
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description:
        'Earn recognized certifications that advance your career and increase your earning potential.',
      color: 'bg-orange-500',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description:
        'Connect with roofing professionals worldwide and learn from industry experts.',
      color: 'bg-red-500',
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description:
        'Track your progress with detailed analytics and performance insights.',
      color: 'bg-yellow-500',
    },
  ];

  const learningPaths = [
    {
      title: 'Foundation & Safety',
      description:
        'Master the basics of roofing safety, tools, and fundamental techniques.',
      modules: 8,
      duration: '2-3 weeks',
      level: 'Beginner',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Advanced Installation',
      description:
        'Learn complex roofing systems, materials, and professional installation methods.',
      modules: 12,
      duration: '4-6 weeks',
      level: 'Intermediate',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Sales & Business',
      description:
        'Develop sales skills, customer relations, and business management expertise.',
      modules: 10,
      duration: '3-4 weeks',
      level: 'Advanced',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Master Craftsman',
      description:
        'Achieve expert-level skills in specialized roofing techniques and leadership.',
      modules: 15,
      duration: '6-8 weeks',
      level: 'Expert',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Animation */}
        <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 opacity-90 z-10" />
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-700" />

          {/* Animated Roof Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="roof-pattern"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 5 L 5 0 L 10 5 L 5 10 Z"
                    fill="currentColor"
                    opacity="0.2"
                  />
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
          className="relative z-20 text-center max-w-6xl mx-auto px-6"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 text-red-400 text-sm font-medium border border-red-600/30">
              <Bot className="w-4 h-4 mr-2" />
              Powered by Agnes AI
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Master Roofing with
            <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              AI-Powered Training
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join 50,000+ professionals who've transformed their careers with our
            industry-leading roofing training platform. Learn from experts,
            practice with AI, earn certifications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={onNavigateToTraining}
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-8 text-gray-400"
          >
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1" />
              <span>50k+ Students</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-1" />
              <span>Industry Certified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.section ref={statsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose RoofER Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of roofing education with cutting-edge
              technology and expert instruction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 ${feature.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured curricula designed to take you from beginner to expert,
              with AI guidance every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border"
              >
                <div
                  className={`h-32 bg-gradient-to-r ${path.color} rounded-xl mb-6 flex items-center justify-center`}
                >
                  <BookOpen className="w-12 h-12 text-white" />
                </div>

                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-3">
                  {path.level}
                </span>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {path.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {path.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Modules:</span>
                    <span className="text-gray-900 font-medium">
                      {path.modules}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900 font-medium">
                      {path.duration}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateToTraining}
                  className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Start Path
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section ref={testimonialsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how RoofER Academy has transformed careers across the
              industry.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full mx-auto md:mx-0 mb-4"
                  />
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-red-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-gray-500">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of roofing professionals who've already advanced
              their careers with RoofER Academy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateToTraining}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button className="flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                <Users className="w-5 h-5 mr-2" />
                Talk to Sales
              </button>
            </div>

            <div className="mt-8 text-gray-400">
              <p>
                ✓ 30-day money-back guarantee ✓ Industry-recognized certificates
                ✓ Lifetime access
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
