import { motion } from "motion/react";
import { DollarSign, Users, Package, TrendingUp, Settings, Workflow, FileText, Headphones, Globe, Briefcase, ShoppingCart, UserCheck } from "lucide-react";

const featuresList = [
  { icon: DollarSign, label: "Financial & Accounting" },
  { icon: Users, label: "Sales & Customer Management" },
  { icon: Package, label: "Inventory & Stock Control" },
  { icon: TrendingUp, label: "Purchasing & Vendor Tracking" },
  { icon: UserCheck, label: "HR & Payroll" },
  { icon: Workflow, label: "Workflow Automation" }
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
                <span className="text-[] text-4xl lg:text-5xl font-bold">to Run Your</span>
              </h2>
              <h2 className="text-[#00bcd4] text-4xl lg:text-5xl font-bold">Business Smoothly</h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              From finance to operations, our ERP solutions are built to streamline every 
              core function of your business. Whether you're using <span className="font-semibold">SAP Business One</span> or 
              our flexible platform <span className="font-semibold">ERPWave</span>, we've got you covered with everything you 
              need — and more.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {featuresList.map((feature, index) => {
                const Icon = feature.icon;
                return (
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
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.button
              className="px-8 py-3.5 bg-[#00bcd4] text-white rounded-md hover:bg-[#00bcd4] transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
            </motion.button>
          </motion.div>

          {/* Right Content - Icon Tree */}
          <motion.div
            className="relative h-[500px] hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Central Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-5xl font-bold">A</span>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500">
                Strength • Reliability • Stability
              </div>
            </div>

            {/* Orbiting Icons */}
            {[
              { icon: FileText, angle: 0, color: "bg-blue-500" },
              { icon: Headphones, angle: 45, color: "bg-teal-500" },
              { icon: Package, angle: 90, color: "bg-[#00bcd4]" },
              { icon: Globe, angle: 135, color: "bg-blue-600" },
              { icon: Briefcase, angle: 180, color: "bg-indigo-500" },
              { icon: ShoppingCart, angle: 225, color: "bg-cyan-600" },
              { icon: Users, angle: 270, color: "bg-teal-600" },
              { icon: TrendingUp, angle: 315, color: "bg-blue-700" }
            ].map((item, index) => {
              const Icon = item.icon;
              const radius = 180;
              const x = Math.cos((item.angle * Math.PI) / 180) * radius;
              const y = Math.sin((item.angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {/* Connection Line */}
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      width: radius + 50,
                      height: radius + 50,
                      transform: `translate(-50%, -50%) rotate(${180 + item.angle}deg)`
                    }}
                  >
                    <line
                      x1="25"
                      y1={radius / 2 + 25}
                      x2={radius - 10}
                      y2={radius / 2 + 25}
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
