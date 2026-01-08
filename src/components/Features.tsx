import { DollarSign, ShoppingCart, Store, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: DollarSign,
    title: "Advanced Financial",
    subtitle: "Management",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    iconBg: "bg-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Real-time Inventory &",
    subtitle: "Stock Tracking",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    iconBg: "bg-green-500"
  },
  {
    icon: Store,
    title: "Sales, CRM & Customer",
    subtitle: "Insights",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    iconBg: "bg-orange-500"
  },
  {
    icon: ShoppingCart,
    title: "Purchase & Vendor",
    subtitle: "Automation",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    iconBg: "bg-purple-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#003366] mb-4 text-4xl lg:text-5xl font-bold">
            The globally trusted Call Management software
          </h2>
          <h3 className="text-[#003366] text-4xl lg:text-5xl font-bold">
            for growing enterprises
          </h3>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-10 rounded-3xl border-2 ${feature.borderColor} ${feature.bgColor} transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className={`w-24 h-24 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-8 shadow-lg`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-[#003366] mb-0 leading-tight font-bold">
                  {feature.title}
                </h3>
                <h3 className="text-[#003366] leading-tight font-bold">
                  {feature.subtitle}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-700 text-lg">Learn More About SAP Business one</p>
          <button className="px-8 py-3 bg-[#003366] text-white rounded-md hover:bg-[#004080] transition-all duration-300 font-medium">
            Know More
          </button>
        </motion.div>
      </div>
    </section>
  );
}