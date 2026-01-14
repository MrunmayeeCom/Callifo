import { motion } from "motion/react";
import { Award, MapPin, CheckCircle } from "lucide-react";

interface PartnersProps {
  onBecomePartnerClick: () => void;
}

export function Partners({ onBecomePartnerClick }: PartnersProps) {
  const partners = [
    {
      name: "IZAAP Technologies Private Limited",
      badge: "GOLD",
      location: "CHENNAI, IN",
      description: "An award-winning CallFlow Gold Partner with over 10 years of expertise CallFlow consultation, customization, API integration, mobile apps integration, to enhance your digital experience.",
      icons: ["🏆", "👥", "🎯"]
    },
    {
      name: "Corporate Intellect Solutions",
      badge: "GOLD",
      location: "DELHI, MUMBAI, BANGALORE, GUJRAT, HYDERABAD, IN",
      description: "CIS is a proficient IT Consulting empowering organizations with expert guidance and customized CallFlow solutions, driving efficient digital transformations to achieve their business goals",
      icons: ["💼", "🔧", "📊"]
    },
    {
      name: "Rajlaxmi Solutions Private Limited",
      badge: "GOLD",
      location: "MUMBAI, DELHI, BANGALORE, CHENNAI, HYDERABAD, KOLKATTA, I...",
      description: "Leading CallFlow implementation partner specializing in enterprise solutions and seamless integrations for medium to large businesses.",
      icons: ["⚡", "🌟", "🔗"]
    },
    {
      name: "All CAD Services Private Limited",
      badge: "GOLD",
      location: "JAIPUR, CHENNAI, DUBAI, SHARJAH, ABU DHABI, IN, DUBAI, ABU DHA...",
      description: "Global partner delivering comprehensive CallFlow solutions with expertise in multi-location deployments and international support.",
      icons: ["🌍", "🏢", "💡"]
    },
    {
      name: "TechVision Consulting Group",
      badge: "SILVER",
      location: "PUNE, NAGPUR, IN",
      description: "Emerging partner with strong focus on SME sector and innovative CallFlow implementations tailored for growing businesses.",
      icons: ["🚀", "💻", "📈"]
    },
    {
      name: "Digital Solutions Hub",
      badge: "SILVER",
      location: "AHMEDABAD, SURAT, IN",
      description: "Certified CallFlow partner providing end-to-end implementation services with focus on customer training and support excellence.",
      icons: ["🎓", "🤝", "✨"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00bcd4] to-[#0097a7] pt-24 pb-16">
      {/* Hero Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
          Find a CallFlow Partner in your area!
        </h1>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="bg-white shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={onBecomePartnerClick}
              className="flex-1 py-5 text-center text-[#003366] hover:bg-gray-50 transition-colors text-lg font-medium border-b-2 border-transparent hover:border-[#00bcd4]"
            >
              Become a partner
            </button>
            <button className="flex-1 py-5 text-center bg-white text-[#003366] border-b-4 border-[#00bcd4] text-lg font-medium">
              Partner directory
            </button>
          </div>
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-6 text-center">
            CallFlow Partners can help you create and manage your CallFlow!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Our partners are there to make your CallFlow experience more pleasant and productive – from choosing a subscription plan to product 
            implementation, customization, and employee training. CallFlow partners can also help you set up an integration with a third-party app or 
            service. Browse our Partner Directory to find a CallFlow partner in your area and contact them directly or use the form below to get a price 
            estimate for your CallFlow implementation project.
          </p>
        </div>
      </motion.div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-[#00bcd4]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#003366] mb-2 flex items-start gap-2">
                    {partner.name}
                    <div className="flex gap-1 mt-1">
                      {partner.icons.map((icon, idx) => (
                        <span key={idx} className="text-xl">{icon}</span>
                      ))}
                    </div>
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                      partner.badge === "GOLD" 
                        ? "bg-yellow-400 text-yellow-900" 
                        : "bg-gray-300 text-gray-800"
                    }`}>
                      {partner.badge}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{partner.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {partner.description}
              </p>
              <div className="flex items-center gap-2 text-[#00bcd4] text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Partner</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-[#003366] mb-4">
            Ready to Partner with Us?
          </h3>
          <p className="text-gray-600 mb-6">
            Join our growing network of partners and help businesses transform their call management experience.
          </p>
          <button
            onClick={onBecomePartnerClick}
            className="px-8 py-4 bg-[#00bcd4] text-white rounded-lg hover:bg-[#0097a7] transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Become a Partner Today
          </button>
        </div>
      </motion.div>
    </div>
  );
}
