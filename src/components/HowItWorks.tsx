import { UserPlus, Settings, Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in under 2 minutes. No credit card required for trial.",
    step: "01"
  },
  {
    icon: Settings,
    title: "Configure",
    description: "Set up your call flows, team members, and integrations with our intuitive dashboard.",
    step: "02"
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Go live with your new call management system and start handling calls efficiently.",
    step: "03"
  },
  {
    icon: CheckCircle2,
    title: "Optimize",
    description: "Use real-time analytics to continuously improve your call operations and customer satisfaction.",
    step: "04"
  }
];

interface HowItWorksProps {
  onStartTrialClick: () => void;
}

export function HowItWorks({ onStartTrialClick }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full mb-4">
            How It Works
          </div>
          <h2 className="text-[#003366] mb-4 text-4xl lg:text-5xl font-bold">
            Get Started in Minutes, Not Days
          </h2>
          <p className="text-gray-600">
            Our streamlined onboarding process ensures you're up and running quickly, with full support every step of the way.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300" 
               style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }}></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-cyan-300 rounded-full flex items-center justify-center text-cyan-600 z-10 group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-sm font-bold">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-6 mt-8 relative z-20 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-11 h-11 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-[#003366] mb-3 font-bold">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/*<motion.button 
            onClick={onStartTrialClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#00bcd4] text-white rounded-md hover:bg-cyan-500 transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>*/}
          {/*<p className="text-gray-500 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>*/}
        </motion.div>
      </div>
    </section>
  );
}