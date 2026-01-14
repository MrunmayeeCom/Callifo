import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface HeroProps {
  onStartTrialClick: () => void;
}

export function Hero({ onStartTrialClick }: HeroProps) {
  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            
            <motion.h1 
              className="text-[#1a1a1a] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[#00bcd4] font-bold text-5xl lg:text-6xl">Smarter</span>
              <span className="text-[#003366] font-bold text-5xl lg:text-6xl"> Call Management Solutions</span>
              <br />
              <span className="text-[#003366] font-bold text-5xl lg:text-6xl">for </span>
              <span className="text-[#00bcd4] font-bold text-5xl lg:text-6xl">Growing Businesses</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Streamline operations, boost productivity, and scale faster with intelligent automation, real-time analytics, 
              and seamless integrations—trusted by SMEs and enterprises across industries.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button 
                onClick={onStartTrialClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#00bcd4] text-white rounded-md hover:bg-[#00bcd4] transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
                alt="Professional dashboard"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}