import { motion } from "motion/react";
import { Award, MapPin, CheckCircle } from "lucide-react";

interface PartnersProps {
  onBecomePartnerClick: () => void;
}

export function Partners({ onBecomePartnerClick }: PartnersProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 py-20 md:py-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">
              Find a Callifo Partner in Your Area
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              Connect with certified partners who specialize in implementation, training, and integration
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="w-full bg-white border-b border-gray-200 sticky top-0 z-40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 md:gap-12">
            <button
              onClick={onBecomePartnerClick}
              className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all font-semibold text-sm md:text-base"
            >
              Become a Partner
            </button>
            <button className="py-4 text-teal-600 border-b-2 border-teal-600 font-semibold text-sm md:text-base">
              Partner Directory
            </button>
          </div>
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.div 
        className="w-full py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Browse Our Partner Network
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our partners are there to make your Callifo experience more pleasant and productive – from choosing a subscription plan to product 
              implementation, customization, and employee training. Callifo partners can also help you set up integrations with third-party apps and 
              services. Find a partner near you or submit a request for a personalized implementation estimate.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="w-full py-16 md:py-20 bg-gray-50 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-10 md:p-14 text-center">
            <Award className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Partner with Us?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our growing network of partners and help businesses transform their call management experience.
            </p>
            <button
              onClick={onBecomePartnerClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Become a Partner Today
              <span>→</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
