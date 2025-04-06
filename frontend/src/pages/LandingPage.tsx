import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Image, Smile, CreditCard, ChevronDown, ArrowRight, Sun, Moon, Sparkles, Download, Layers, Users, Code, MessageSquare, Palette, Shuffle, Star, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

// Theme store
interface ThemeStore {
  isDark: boolean;
}

const useThemeStore = create<ThemeStore>(() => ({
  isDark: true, // Always dark theme
}));

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const ExampleCard = ({ title, image, angle, style, beforeImage }: {
  title: string,
  image: string,
  angle: string,
  style: string,
  beforeImage: string
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      className="relative overflow-hidden rounded-xl shadow-lg group bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64">
        <img
          src={isHovered ? image : beforeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
            <div className="flex gap-2">
              <span className="bg-purple-500/80 px-3 py-1 rounded-full text-xs text-white">{angle}</span>
              <span className="bg-indigo-500/80 px-3 py-1 rounded-full text-xs text-white">{style}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover overlay with before/after indicator */}
      <div className="absolute top-4 right-4 bg-gray-900/90 rounded-full px-3 py-1 text-xs text-white">
        {isHovered ? 'After AI' : 'Before AI'}
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      variants={fadeIn}
      className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-100">{question}</span>
        <ChevronDown className={`h-5 w-5 text-purple-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-400">{answer}</p>
      )}
    </motion.div>
  );
};

const Testimonial = ({ text, author, role, image }: { text: string, author: string, role: string, image: string }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{text}"</p>
    </motion.div>
  );
};

const Step = ({ number, title, description }: { number: number, title: string, description: string }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="flex gap-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

// Add these example images
const EXAMPLE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52",
  examples: [
    {
      before: "https://example.com/sketch1.jpg",
      after: "https://example.com/result1.jpg",
      style: "Realistic"
    },

  ],
  features: {
    sketch: "https://example.com/sketch-feature.jpg",
    angles: "https://example.com/angles-feature.jpg",
    emotions: "https://example.com/emotions-feature.jpg",
    styles: "https://example.com/styles-feature.jpg"
  }
};

// Add these example image sets at the top of the file
const TRANSFORMATION_EXAMPLES = {
  realistic: [
    {
      title: "Professional Portrait",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      angle: "Front View",
      style: "Business"
    },
    {
      title: "Natural Expression",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      angle: "3/4 View",
      style: "Casual"
    },
    {
      title: "Dramatic Lighting",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      angle: "Side Profile",
      style: "Artistic"
    }
  ],
  cartoon: [
    {
      title: "Anime Style",
      image: "https://i.pinimg.com/564x/4c/5c/2a/4c5c2a01c66c7bb2602b1c678c3a1ba1.jpg",
      angle: "Front View",
      style: "Japanese Anime"
    },
    {
      title: "Disney Style",
      image: "https://i.pinimg.com/564x/8d/c7/8c/8dc78c8df8b3c4d967d6c89f3a8658fd.jpg",
      angle: "3/4 View",
      style: "Animation"
    },
    {
      title: "Comic Book",
      image: "https://i.pinimg.com/564x/2d/f7/2a/2df72a178b7e0c7a0069625f8f95a6c3.jpg",
      angle: "Action Pose",
      style: "Superhero"
    }
  ],
  artistic: [
    {
      title: "Oil Painting",
      image: "https://i.pinimg.com/564x/9c/d2/8c/9cd28c6b0a3c17d7b8d0e6cb6689fbb9.jpg",
      angle: "Classic",
      style: "Traditional"
    },
    {
      title: "Watercolor",
      image: "https://i.pinimg.com/564x/7d/6e/b5/7d6eb5728b7f6c6932e3e6c3b3e4b1c8.jpg",
      angle: "Portrait",
      style: "Soft"
    },
    {
      title: "Digital Art",
      image: "https://i.pinimg.com/564x/3d/6b/4f/3d6b4f9c7c8d9c9b9c8d9c9b9c8d9c9b.jpg",
      angle: "Modern",
      style: "Contemporary"
    }
  ]
};

// Example showcase categories
const SHOWCASE_FEATURES = {
  sketchToFace: [
    {
      title: "Sketch to Realistic Face",
      before: "https://i.pinimg.com/564x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg", // Replace with sketch image
      after: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      description: "Transform simple sketches into photorealistic faces"
    }
  ],
  multiAngle: [
    {
      title: "Generate Multiple Angles",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Front
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // Side
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2"  // 3/4
      ],
      description: "Create faces from any angle - front, side, or 3/4 view"
    }
  ],
  emotions: [
    {
      title: "Emotion Control",
      images: [
        "https://example.com/happy.jpg",
        "https://example.com/sad.jpg",
        "https://example.com/surprised.jpg"
      ],
      description: "Generate faces with different emotions - happy, sad, surprised, and more"
    }
  ],
  cartoonStyles: [
    {
      title: "Cartoon Styles",
      images: [
        "https://example.com/anime.jpg",
        "https://example.com/pixar.jpg",
        "https://example.com/comic.jpg"
      ],
      description: "Convert faces into various cartoon styles"
    }
  ]
};

const FEATURE_IMAGES = {
  sketchToFace: {
    sketches: [
      "https://i.pinimg.com/564x/sketch1.jpg",
      "https://i.pinimg.com/564x/sketch2.jpg",
    ],
    results: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ]
  },
  angles: [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // front
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2",    // side
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // 3/4
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce"  // back
  ],
  emotions: [
    "https://images.unsplash.com/photo-1545167622-3a6ac756afa4", // happy
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2", // serious
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // surprised
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"  // thoughtful
  ],
  cartoonStyles: [
    "https://i.pinimg.com/564x/anime1.jpg",
    "https://i.pinimg.com/564x/disney1.jpg",
    "https://i.pinimg.com/564x/comic1.jpg"
  ]
};

// Add these new example images
const DEMO_IMAGES = {
  sketch: "https://i.pinimg.com/564x/8d/c7/8c/8dc78c8df8b3c4d967d6c89f3a8658fd.jpg",
  realistic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  angles: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // front
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // side
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2"  // 3/4
  ],
  emotions: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // happy
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // serious
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2"  // surprised
  ],
  cartoon: [
    "https://i.pinimg.com/564x/4c/5c/2a/4c5c2a01c66c7bb2602b1c678c3a1ba1.jpg", // anime
    "https://i.pinimg.com/564x/8d/c7/8c/8dc78c8df8b3c4d967d6c89f3a8658fd.jpg", // disney
    "https://i.pinimg.com/564x/2d/f7/2a/2df72a178b7e0c7a0069625f8f95a6c3.jpg"  // comic
  ]
};

type TransformationTab = 'realistic' | 'cartoon' | 'artistic';

// Add FeedbackModal component before the LandingPage component
const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/takefeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, rating }),
      });

      if (response.ok) {
        onClose();
        setName('');
        setDescription('');
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-6 text-white">Share Your Feedback</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 rounded-full transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-32"
              placeholder="Tell us about your experience..."
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !name || !description || rating === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Feedback
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export function LandingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = React.useState<TransformationTab>('realistic');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const isDark = true;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-100">
      {/* Navigation - Enhanced styling */}
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-800/60 backdrop-blur-sm bg-gray-900/60 sticky top-0 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <Layers className="h-10 w-10 text-purple-500 absolute" />
            <Sparkles className="h-10 w-10 text-indigo-400 opacity-70 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text">
            Sketch2Face AI
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center gap-10"
        >
          {['Features', 'Examples', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-purple-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFeedbackOpen(true)}
            className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all relative group flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              Feedback
              <MessageSquare className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>

        {user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all relative overflow-hidden group"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative z-10 flex items-center">
              Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        ) : (
          <motion.div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-lg font-medium border border-purple-500/50 hover:border-purple-400 text-purple-400 transition-all"
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Sign Up
            </motion.button>
          </motion.div>
        )}
      </nav>

      {/* Add FeedbackModal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Hero Section with enhanced visuals */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="pt-24 pb-32 px-4 relative overflow-hidden"
      >
        {/* Abstract background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Enhanced Text Content */}
            <motion.div variants={fadeInLeft} className="text-left">
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              >
                <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text">
                  Transform Sketches
                </span>
                <span className="block mt-2">
                  Into Stunning <span className="text-purple-400">Reality</span>
                </span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-10 text-gray-400 leading-relaxed"
              >
                Create photorealistic faces from simple sketches using our advanced AI. Control angles, emotions, and styles with unprecedented precision.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    Start Creating
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                <motion.a
                  href="#demo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-medium border-2 border-purple-500/30 hover:border-purple-500 transition-colors flex items-center text-purple-400 hover:text-purple-300 relative group"
                >
                  <span className="absolute inset-0 w-0 bg-purple-500/10 transition-all duration-300 ease-out group-hover:w-full rounded-xl"></span>
                  <span className="relative flex items-center">
                    Watch Demo
                    <MessageSquare className="ml-2 h-5 w-5" />
                  </span>
                </motion.a>
              </motion.div>

              {/* Made by Kunal Patil */}
              <motion.div
                variants={fadeIn}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400">Made by</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="kunal.png"
                      alt="Kunal Patil"
                      className="w-6 h-6 rounded-full object-cover border-2 border-purple-500/20"
                    />
                    <span className="text-white font-semibold">
                      Kunal Patil
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeIn}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-6"
              >
                <p className="text-sm text-gray-500">Trusted by industry leaders:</p>
                <div className="flex gap-6 items-center">
                  {['Adobe', 'Canva', 'Figma', 'Pixar'].map((company, i) => (
                    <motion.span
                      key={company}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="text-gray-400 text-sm font-medium"
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Enhanced Animated Features Demo */}
            <motion.div
              variants={fadeInRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl -z-10 opacity-60"></div>
              <AnimatedFeatureShowcase />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-800/50 to-gray-800/80 backdrop-blur-md"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Transforming Creative Workflows</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of artists, designers, and developers who use Sketch2Face AI daily</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "3M+", label: "Generated Faces", icon: Users },
              { number: "98%", label: "Accuracy Rate", icon: Layers },
              { number: "50K+", label: "Happy Users", icon: Smile },
              { number: "4.9/5", label: "User Rating", icon: Sparkles }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-500 group"
              >
                <div className="mx-auto h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  {React.createElement(stat.icon, { className: "h-6 w-6 text-purple-400" })}
                </div>
                <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Features Section with Animation */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-28 px-4 relative"
      >
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-900/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our advanced platform offers everything you need to create stunning face visualizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Pencil}
              title="Sketch Upload"
              description="Upload your hand-drawn sketches or use our intuitive drawing canvas to create outlines"
            />
            <FeatureCard
              icon={Image}
              title="Multiple Angles"
              description="Generate faces from different viewpoints - front, side, 3/4 view, or custom angles"
            />
            <FeatureCard
              icon={Smile}
              title="Emotion Control"
              description="Add personality with various emotional expressions from happy to serious and everything in between"
            />
            <FeatureCard
              icon={Download}
              title="High-Res Export"
              description="Download your generated images in various formats and resolutions for any use case"
            />
            <FeatureCard
              icon={Layers}
              title="Style Variations"
              description="Choose from realistic, cartoon, artistic, and other style variations for your generations"
            />
            <FeatureCard
              icon={Users}
              title="Batch Processing"
              description="Generate multiple variations or process several sketches at once with our batch tools"
            />
            <FeatureCard
              icon={Code}
              title="API Integration"
              description="Integrate our face generation technology directly into your apps with our developer API"
            />
            <FeatureCard
              icon={CreditCard}
              title="Flexible Credits"
              description="Pay only for what you need with our credit-based system or choose a subscription plan"
            />
          </div>
        </div>
      </motion.section>

      {/* Enhanced Examples Section */}
      <motion.section
        id="examples"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-28 px-4 relative bg-gray-800/30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Stunning Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our AI can create from simple sketches
            </p>
          </motion.div>

          {/* Style Tabs */}
          <motion.div variants={fadeIn} className="flex justify-center mb-10 space-x-4">
            {(['realistic', 'cartoon', 'artistic'] as TransformationTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Examples Grid */}
          <motion.div
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TRANSFORMATION_EXAMPLES[activeTab].map((example, index) => (
              <ExampleCard
                key={index}
                title={example.title}
                image={example.image}
                angle={example.angle}
                style={example.style}
                beforeImage={DEMO_IMAGES.sketch} // Using sketch as before image for all
              />
            ))}
          </motion.div>

          {/* View more button */}
          <motion.div variants={fadeIn} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gray-800/70 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500 transition-all"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Pricing Section */}
      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-28 px-4 relative"
      >
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900/10 to-transparent -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find the perfect plan for your creative needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              className="border rounded-xl p-8 text-center bg-gray-800/30 border-gray-700 hover:border-gray-500 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="mb-8 relative">
                <h3 className="text-2xl font-semibold mb-2">Starter</h3>
                <p className="text-4xl font-bold mb-4">$9.99<span className="text-sm text-gray-500">/month</span></p>
                <p className="text-gray-400 mb-4">Perfect for beginners and casual users</p>
              </div>

              <ul className="text-left mb-8 space-y-4 relative">
                {[
                  "50 generations/month",
                  "Basic emotions & angles",
                  "Standard resolution (1024×1024)",
                  "Email support"
                ].map(feature => (
                  <li key={feature} className="flex items-center">
                    <span className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <span className="text-purple-400 text-xs">✓</span>
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium relative"
              >
                Get Started
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="border rounded-xl p-8 text-center relative transform scale-105 shadow-xl z-10 bg-gray-800/30 border-purple-500/50 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent rounded-xl"></div>

              <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2 flex justify-center">
                <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>

              <div className="mb-8 pt-4 relative">
                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                <p className="text-4xl font-bold mb-4">$19.99<span className="text-sm text-gray-500">/month</span></p>
                <p className="text-gray-400 mb-4">Best for creators and professionals</p>
              </div>

              <ul className="text-left mb-8 space-y-4 relative">
                {[
                  "200 generations/month",
                  "All emotions & angles",
                  "High resolution (2048×2048)",
                  "Priority support",
                  "Batch processing"
                ].map(feature => (
                  <li key={feature} className="flex items-center">
                    <span className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <span className="text-purple-400 text-xs">✓</span>
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all font-medium relative"
              >
                Get Started
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="border rounded-xl p-8 text-center bg-gray-800/30 border-gray-700 hover:border-gray-500 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="mb-8 relative">
                <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">$49.99<span className="text-sm text-gray-500">/month</span></p>
                <p className="text-gray-400 mb-4">For teams and high-volume users</p>
              </div>

              <ul className="text-left mb-8 space-y-4 relative">
                {[
                  "Unlimited generations",
                  "All features & styles",
                  "Ultra HD resolution (4096×4096)",
                  "24/7 dedicated support",
                  "API access & custom integrations",
                  "Team management tools"
                ].map(feature => (
                  <li key={feature} className="flex items-center">
                    <span className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <span className="text-purple-400 text-xs">✓</span>
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium relative"
              >
                Contact Sales
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Testimonials with Animation */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-28 px-4 relative bg-gray-800/30"
      >
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-purple-900/10 to-transparent -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied creators who have transformed their workflow with Sketch2Face AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              text="This tool has completely transformed my character design process. What used to take days now takes minutes, and the results are incredible!"
              author="Sarah Johnson"
              role="Graphic Designer"
              image="/api/placeholder/80/80"
            />
            <Testimonial
              text="As a concept artist, I need to iterate quickly. Sketch2Face AI lets me visualize my character ideas instantly and explore different variations."
              author="Michael Chen"
              role="Concept Artist"
              image="/api/placeholder/80/80"
            />
            <Testimonial
              text="The realistic face generation is mind-blowing. I've used it for storyboarding and client presentations with amazing feedback every time."
              author="Jessica Williams"
              role="Film Director"
              image="/api/placeholder/80/80"
            />
          </div>

          {/* Additional testimonial CTA */}
          <motion.div variants={fadeIn} className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Read all customer stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-28 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: 1,
                title: "Upload or Draw",
                description: "Start with a sketch using our canvas or upload your own drawing",
                icon: Pencil
              },
              {
                number: 2,
                title: "Customize Options",
                description: "Select angles, emotions, styles and other parameters",
                icon: Shuffle
              },
              {
                number: 3,
                title: "Generate & Export",
                description: "Our AI creates your image which you can download in various formats",
                icon: Download
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center text-center p-6 relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mb-6 relative">
                  <span className="text-white text-xl font-bold">{step.number}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 animate-ping opacity-20"></div>
                </div>

                <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(step.icon, { className: "h-8 w-8 text-purple-400" })}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-16 right-0 transform translate-x-1/2">
                    <ArrowRight className="h-8 w-8 text-purple-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className={`py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeIn} className="text-center max-w-2xl mx-auto mb-12">
            Everything you need to know about Sketch2Face AI
          </motion.p>

          <div className="space-y-4">
            <FAQItem
              question="How accurate are the generated faces?"
              answer="Our AI model has been trained on millions of faces to ensure highly accurate and realistic results that match your input sketches with up to 98% accuracy."
            />
            <FAQItem
              question="What file formats are supported?"
              answer="We support PNG, JPG, and SVG formats for sketch uploads. You can also use our built-in drawing tool to create sketches directly in the browser."
            />
            <FAQItem
              question="Can I use the generated images commercially?"
              answer="Yes! All generated images come with full commercial usage rights. You own the rights to any images you generate using our platform."
            />
            <FAQItem
              question="How many variations can I generate?"
              answer="Depending on your plan, you can generate multiple variations of each sketch. Pro and Enterprise plans allow for unlimited variations per sketch."
            />
            <FAQItem
              question="Is there a free trial available?"
              answer="Yes! New users receive 5 free generations to test our service. No credit card required for the trial."
            />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-12 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-8 w-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Sketch2Face AI</h3>
              </div>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Transform your sketches into photorealistic faces with the power of AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#examples" className="hover:text-indigo-600">Examples</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600">Pricing</a></li>
                <li><a href="#faq" className="hover:text-indigo-600">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/about" className="hover:text-indigo-600">About</a></li>
                <li><a href="/blog" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="/careers" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-indigo-600">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-indigo-600">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} Sketch2Face AI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="https://twitter.com" className="text-gray-400 hover:text-indigo-600">
                  Twitter
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-indigo-600">
                  LinkedIn
                </a>
                <a href="https://github.com" className="text-gray-400 hover:text-indigo-600">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this new component for animated features
const AnimatedFeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  type Feature = {
    title: string;
    before?: string;
    after?: string;
    images?: string[];
    icon: React.ElementType;
  };

  const features: Feature[] = [
    {
      title: "Sketch to Reality",
      before: DEMO_IMAGES.sketch,
      after: DEMO_IMAGES.realistic,
      icon: Pencil
    },
    {
      title: "Multiple Angles",
      images: DEMO_IMAGES.angles,
      icon: Image
    },
    {
      title: "Emotion Control",
      images: DEMO_IMAGES.emotions,
      icon: Smile
    },
    {
      title: "Cartoon Styles",
      images: DEMO_IMAGES.cartoon,
      icon: Palette
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            {React.createElement(features[activeFeature].icon, { className: "h-6 w-6 text-purple-400" })}
            <h3 className="text-xl font-semibold text-white">{features[activeFeature].title}</h3>
          </div>

          {features[activeFeature].before ? (
            // Sketch to Reality
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-purple-400 mb-2">Sketch</p>
                <img
                  src={features[activeFeature].before}
                  alt="Before"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-purple-400 mb-2">Result</p>
                <img
                  src={features[activeFeature].after}
                  alt="After"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          ) : features[activeFeature].images && (
            // Multiple images showcase
            <div className="grid grid-cols-3 gap-3">
              {features[activeFeature].images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <img
                    src={img}
                    alt={`Example ${index + 1}`}
                    className="rounded-lg w-full h-32 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feature Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveFeature(index)}
            className={`w-2 h-2 rounded-full transition-all ${activeFeature === index
              ? 'bg-purple-500 w-6'
              : 'bg-gray-600 hover:bg-gray-500'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

