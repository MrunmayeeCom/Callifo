import { motion } from "motion/react";
// Import the image from your local assets folder
import featureImage from "../assets/Screenshot 2026-01-12 123851.png";

const featuresList = [
  { label: "Financial & Accounting" },
  { label: "Sales & Customer Management" },
  { label: "Inventory & Stock Control" },
  { label: "Purchasing & Vendor Tracking" },
  { label: "HR & Payroll" },
  { label: "Workflow Automation" }
];

export function FeaturesTree() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-[#003366] mb-2 leading-tight">
                <span className="text-4xl lg:text-5xl font-bold">End-to-End Features </span>
                <span className="text-4xl lg:text-5xl font-bold">to Run Your</span>
              </h2>
              <h2 className="text-[#00bcd4] text-4xl lg:text-5xl font-bold">Business Smoothly</h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              From finance to operations, our ERP solutions are built to streamline every 
              core function of your business. Whether you're using <span className="font-semibold">SAP Business One</span> or 
              our flexible platform <span className="font-semibold">ERPWave</span>, we've got you covered with everything you 
              need — and more.
            </p>

            <div className="space-y-4">
              {featuresList.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#003366] border-b-8 border-b-transparent"></div>
                  <span className="text-gray-800 text-lg">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            
          </motion.div>

          {/* Right Content - Using your imported local image */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[600px] overflow-hidden rounded-2xl shadow-xl border border-gray-100">
              <img 
                src={featureImage} 
                alt="Callifo ERP Features" 
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}