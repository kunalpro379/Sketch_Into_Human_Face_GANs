import { useState, useRef, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import * as Tabs from '@radix-ui/react-tabs';
import * as Select from '@radix-ui/react-select';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Upload, Smile, ChevronDown, LogOut, Play, Download, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PricingModal } from '../components/PricingModal';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

const EMOTIONS = ['Happy', 'Sad', 'Angry', 'Neutral'];
const ANGLES = ['Front View', 'Side View', '3/4 View'];

// Add animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
};

// Add theme store
interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

// Update the API URL constant at the top of the file
const API_URL = "https://kunalpro379-s2fnew.hf.space";

export function Dashboard() {
  const { isDark } = useThemeStore();
  const [selectedEmotion, setSelectedEmotion] = useState(EMOTIONS[0]);
  const [selectedAngle, setSelectedAngle] = useState(ANGLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isServiceReady, setIsServiceReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const decrementCredits = useAuthStore((state) => state.decrementCredits);

  // Update health check function
  const checkServiceHealth = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setIsServiceReady(true); // If we can reach the endpoint, consider it ready
      setError(null);
    } catch (error) {
      setIsServiceReady(false);
      setError('Service is unavailable');
    }
  };

  // Check health on component mount and periodically
  useEffect(() => {
    checkServiceHealth();
    const interval = setInterval(checkServiceHealth, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Update handleGenerate function
  const handleGenerate = async (imageData: string) => {
    if (!isServiceReady) {
      setError('Service is not ready yet, please wait...');
      return;
    }

    if (!user || user.credits <= 0) {
      setShowPricing(true);
      return;
    }

    if (!hasDrawn) {
      setError('Please draw something first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Convert base64 to blob
      const base64Data = imageData.split(',')[1] || imageData;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      // Create FormData and append file
      const formData = new FormData();
      formData.append('file', blob, 'sketch.png');

      const response = await fetch(`${API_URL}/generate-from-sketch`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to generate image: ${response.statusText}`);
      }

      // Handle the response
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);
      decrementCredits();

    } catch (error) {
      console.error('Error generating image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCanvasGenerate = async () => {
    try {
      const canvasData = await canvasRef.current?.exportImage('png');
      if (!canvasData) {
        setError('Please draw something first');
        return;
      }
      await handleGenerate(canvasData);
    } catch (error) {
      console.error('Error exporting canvas:', error);
      setError('Failed to export canvas. Please try again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        await handleGenerate(base64Data);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      setError('Failed to read file. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Update handleStroke function
  const handleStroke = async () => {
    setHasDrawn(true);
    try {
      const canvasData = await canvasRef.current?.exportImage('png');
      if (!canvasData || !user || user.credits <= 0) return;

      // Add a small delay before generating to avoid too many requests
      debouncedGenerate(canvasData);
    } catch (error) {
      console.error('Error with real-time generation:', error);
    }
  };

  // Update the debounce time to be longer for the API
  const debouncedGenerate = useCallback(
    debounce(async (imageData: string) => {
      await handleGenerate(imageData);
    }, 2000), // Increased to 2 seconds to be more conservative with the API
    []
  );

  // Update canvas change handler to prevent unnecessary path exports
  const handleCanvasChange = async () => {
    if (!hasDrawn) return; // Skip if no drawing has occurred yet

    try {
      const canvasData = await canvasRef.current?.exportImage('png');
      if (!canvasData || !user || user.credits <= 0) return;

      debouncedGenerate(canvasData);
    } catch (error) {
      console.error('Error with real-time generation:', error);
    }
  };

  // Update the ReactSketchCanvas component
  <ReactSketchCanvas
    ref={canvasRef}
    strokeWidth={4}
    strokeColor="black"
    canvasColor="white"
    className="aspect-square"
    onStroke={handleStroke}
    width="100%"
    height="100%"
    style={{
      border: 'none',
      borderRadius: '0.75rem',
      background: 'white',
    }}
  />

  // Update clear canvas handler
  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setHasDrawn(false);
    setGeneratedImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
    >
      {/* Add Error Message Toast at the top level */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-[300px] max-w-md"
          >
            <div className="bg-red-900/90 backdrop-blur border border-red-500/20 text-red-100 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
              <span className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </span>
              <button
                onClick={() => setError(null)}
                className="ml-4 text-red-200 hover:text-red-100"
              >
                <AlertCircle className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.h1
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text flex items-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-purple-400" />
            Sketch2Face AI
          </motion.h1>
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-sm bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20"
            >
              Credits: <span className="font-semibold text-purple-400">{user?.credits}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Canvas Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          <Tabs.Root defaultValue="draw" className="space-y-6">
            <Tabs.List className="flex gap-2 border-b border-gray-700">
              {['draw', 'upload'].map((tab) => (
                <motion.div key={tab} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Tabs.Trigger
                    value={tab}
                    className="px-6 py-3 text-gray-400 hover:text-purple-400 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 capitalize"
                  >
                    {tab} Sketch
                  </Tabs.Trigger>
                </motion.div>
              ))}
            </Tabs.List>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div>
                <Tabs.Content value="draw" className="outline-none">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-gray-700 rounded-xl overflow-hidden shadow-lg bg-gray-900/50"
                  >
                    <ReactSketchCanvas
                      ref={canvasRef}
                      strokeWidth={4}
                      strokeColor="black"
                      canvasColor="white"
                      className="aspect-square"
                      onStroke={handleStroke}
                      width="100%"
                      height="100%"
                      style={{
                        border: 'none',
                        borderRadius: '0.75rem',
                        background: 'white',
                      }}
                    />
                  </motion.div>
                  <motion.div className="mt-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClear}
                      className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300"
                    >
                      Clear
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => canvasRef.current?.undo()}
                      className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300"
                    >
                      Undo
                    </motion.button>
                  </motion.div>
                </Tabs.Content>

                <Tabs.Content value="upload" className="outline-none">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-900/50">
                    <Upload className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-300">
                      Drag and drop your sketch here, or{' '}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        browse files
                      </button>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports PNG, JPG up to 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </Tabs.Content>

                {/* Controls */}
                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Emotion Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Emotion
                    </label>
                    <Select.Root value={selectedEmotion} onValueChange={setSelectedEmotion}>
                      <Select.Trigger className="w-full flex items-center justify-between border border-gray-700 rounded-lg px-3 py-2 bg-gray-800/50 text-gray-300">
                        <Select.Value />
                        <Select.Icon>
                          <ChevronDown className="h-4 w-4" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                          <Select.Viewport>
                            {EMOTIONS.map((emotion) => (
                              <Select.Item
                                key={emotion}
                                value={emotion}
                                className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer text-gray-300"
                              >
                                <Smile className="h-4 w-4 mr-2 text-purple-400" />
                                <Select.ItemText>{emotion}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>

                  {/* Generate Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCanvasGenerate}
                    disabled={isGenerating || !isServiceReady}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center shadow-xl disabled:cursor-not-allowed transform transition-all duration-200"
                  >
                    {!isServiceReady ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Connecting...
                      </>
                    ) : isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Face
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Panel - Generated Result */}
              <motion.div
                className="border border-gray-700 rounded-xl p-6 shadow-xl bg-gray-800/50 backdrop-blur-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-4 text-gray-200">Generated Result</h3>
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square flex items-center justify-center bg-gray-900/50 rounded-lg"
                    >
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative group"
                    >
                      <img
                        src={generatedImage} // Direct URL now
                        alt="Generated face"
                        className="aspect-square w-full object-cover rounded-lg ring-1 ring-gray-700"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(generatedImage, '_blank')}
                        className="absolute bottom-4 right-4 bg-purple-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-purple-600"
                      >
                        <Download className="h-5 w-5 text-white" />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500"
                    >
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                        <p>Generated image will appear here</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Tabs.Root>
        </motion.div>
      </main>

      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </motion.div>
  );
}