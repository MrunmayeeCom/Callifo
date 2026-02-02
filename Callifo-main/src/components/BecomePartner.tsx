import { motion } from "motion/react";
import { Award, Users, TrendingUp, Globe, CheckCircle, Target } from "lucide-react";
import { useState } from "react";
import { submitPartnerApplication } from "../api/partnerProgram";

interface BecomePartnerProps {
  onBackToDirectory: () => void;
}

export function BecomePartner({ onBackToDirectory }: BecomePartnerProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    website: "",
    companySize: "",
    partnerType: "",
    experience: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mapping functions to match API requirements
  const mapPartnerType = (type: string) => {
    if (type === "distributor") {
      return "distributor";
    }
    // All other types (reseller, implementation, technology, referral) are channel partners
    return "channel_partner";
  };

  const mapExperience = (exp: string) => {
    switch (exp) {
      case "0-1":
        return "0-1";
      case "1-3":
        return "1-3";
      case "3-5":
        return "3-5";
      case "5-10":
        return "5-10";
      case "10+":
        return "10+";
      default:
        return "0-1";
    }
  };

  const mapBusinessType = (partnerType: string) => {
    switch (partnerType) {
      case "technology":
        return "Technology";
      case "reseller":
        return "Reseller";
      case "implementation":
        return "Consulting";
      case "referral":
        return "Other";
      default:
        return "Other";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.companyName || !formData.contactName || !formData.email || 
        !formData.phone || !formData.country || !formData.city || 
        !formData.companySize || !formData.partnerType || !formData.experience) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        contactInformation: {
          fullName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
        },

        companyInformation: {
          companyName: formData.companyName,
          website: formData.website || "",
          country: formData.country,
          city: formData.city,
        },

        businessDetails: {
          businessType: mapBusinessType(formData.partnerType),
          yearsInBusiness: mapExperience(formData.experience),
          numberOfEmployees: formData.companySize,
          existingClients: 0,
        },

        partnershipDetails: {
          joinAs: mapPartnerType(formData.partnerType),
          motivation: formData.message || "No additional information provided",
        },

        source: "callifo",
      };

      console.log("Submitting partner application:", payload);

      await submitPartnerApplication(payload);

      alert("Thank you for your interest! We'll review your application and get back to you within 48 hours.");
      
      // Reset form
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        website: "",
        companySize: "",
        partnerType: "",
        experience: "",
        message: ""
      });

    } catch (error: any) {
      console.error("Partner application failed:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Submission failed. Please try again.";
      
      alert(`Application submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Grow Your Business",
      description: "Join 96,700+ professional community and grow your revenue with new projects"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Access to Leads",
      description: "Get qualified leads from businesses actively looking for CallFlow solutions"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Recurring Revenue",
      description: "Earn ongoing commissions and build long-term client relationships"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with partners worldwide and share best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#003366] pt-24 pb-16">
      {/* Hero Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Become a CallFlow Partner
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join our global network of partners and help businesses transform their communication
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div 
          className="bg-white rounded-t-xl shadow-lg mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row">
            <button className="flex-1 py-5 text-center bg-white text-[#003366] border-b-4 border-[#00bcd4] text-lg font-medium rounded-tl-xl">
              Become a partner
            </button>
            <button
              onClick={onBackToDirectory}
              className="flex-1 py-5 text-center text-[#003366] hover:bg-gray-50 transition-colors text-lg font-medium border-b-2 border-transparent hover:border-[#00bcd4] rounded-tr-xl"
            >
              Partner directory
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <div className="text-[#00bcd4] mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-200 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Program Details */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-10 h-10 text-[#00bcd4]" />
            <h2 className="text-3xl font-bold text-[#003366]">A product people fall in love with</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            CallFlow is more than just a call management system – it's a complete business transformation platform. Our partners help 
            organizations unlock the full potential of our solution through expert implementation, customization, and ongoing support. 
            Join our ecosystem and be part of revolutionizing how businesses communicate.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#00bcd4] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#003366] mb-1">Marketing Support</h4>
                <p className="text-gray-600 text-sm">Co-branded materials and marketing resources</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#00bcd4] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#003366] mb-1">Training & Certification</h4>
                <p className="text-gray-600 text-sm">Comprehensive partner training programs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#00bcd4] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#003366] mb-1">Technical Support</h4>
                <p className="text-gray-600 text-sm">Dedicated partner success team</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Stories */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">Partner Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { stat: "96,700+", label: "Active Partners", color: "from-blue-500 to-cyan-500" },
            { stat: "$2.5M+", label: "Avg. Annual Revenue", color: "from-purple-500 to-pink-500" },
            { stat: "150+", label: "Countries Worldwide", color: "from-green-500 to-emerald-500" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${item.color} rounded-xl p-8 text-center`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
            >
              <div className="text-4xl font-bold text-white mb-2">{item.stat}</div>
              <div className="text-white/90">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Partner FAQ Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Partner with Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white">
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#00bcd4]">No Upfront Costs</h3>
              <p className="text-gray-200">Join our partner program at no cost and start earning from day one.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#00bcd4]">Flexible Partnership Models</h3>
              <p className="text-gray-200">Choose the partnership level that works best for your business.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#00bcd4]">Dedicated Partner Portal</h3>
              <p className="text-gray-200">Access resources, track leads, and manage opportunities in one place.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#00bcd4]">Growing Market</h3>
              <p className="text-gray-200">Tap into the expanding call management solutions market.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Application Form */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-2 text-center">Start Your Application</h2>
          <p className="text-gray-600 text-center mb-8">Fill out the form below and we'll get back to you within 48 hours</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="Your country"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="Your city"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Company Size *</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Partner Type *</label>
                <select
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                >
                  <option value="">Select type</option>
                  <option value="reseller">Reseller Partner</option>
                  <option value="distributor">Distributor</option>
                  <option value="implementation">Implementation Partner</option>
                  <option value="technology">Technology Partner</option>
                  <option value="referral">Referral Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#003366] mb-2">Additional Information</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00bcd4] focus:outline-none transition-colors resize-none"
                placeholder="Tell us why you want to become a partner and what makes your company unique..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-[#00bcd4] text-white rounded-lg hover:bg-[#0097a7] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              <button
                type="button"
                onClick={onBackToDirectory}
                className="px-8 py-4 bg-gray-100 text-[#003366] rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                Back to Directory
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}