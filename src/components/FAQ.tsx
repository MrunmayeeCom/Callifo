import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqCategories = [
  {
    category: "General",
    icon: "📋",
    questions: [
      {
        question: "What is CallFlow and how does it work?",
        answer: "CallFlow is an AI-powered call management system that streamlines your customer communication. It uses intelligent routing, real-time analytics, and seamless integrations to help your team handle calls more efficiently and effectively."
      },
      {
        question: "Do I need to install any software?",
        answer: "No installation required! CallFlow is a cloud-based solution that works directly in your web browser. Simply sign up, configure your settings, and you're ready to start managing calls."
      },
      {
        question: "Can I try CallFlow before purchasing?",
        answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial."
      },
      {
        question: "How quickly can I get started?",
        answer: "Most customers are up and running within 24 hours. Our setup wizard guides you through the process, and our support team is available to help you get started quickly."
      }
    ]
  },
  {
    category: "Technical",
    icon: "⚙️",
    questions: [
      {
        question: "What integrations does CallFlow support?",
        answer: "CallFlow integrates with popular CRM systems (Salesforce, HubSpot), helpdesk platforms (Zendesk, Freshdesk), communication tools (Slack, Microsoft Teams), and many more. We also offer a REST API for custom integrations."
      },
      {
        question: "Is my data secure with CallFlow?",
        answer: "Absolutely. We use bank-level encryption (256-bit SSL), are PCI compliant, and follow strict security protocols. All data is encrypted both in transit and at rest. We're also GDPR and HIPAA compliant."
      },
      {
        question: "What are the system requirements?",
        answer: "CallFlow works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend using the latest version of your browser. Mobile apps are available for iOS and Android."
      },
      {
        question: "Do you offer API access?",
        answer: "Yes, all Professional and Enterprise plans include full API access. Our comprehensive API documentation makes it easy to integrate CallFlow with your existing systems and workflows."
      }
    ]
  },
  {
    category: "Billing & Pricing",
    icon: "💳",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual subscriptions. Enterprise customers can request invoice billing."
      },
      {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle."
      },
      {
        question: "Do you offer discounts for annual billing?",
        answer: "Yes! Save 20% when you choose annual billing. Quarterly billing also saves you 10% compared to monthly pricing."
      },
      {
        question: "What happens if I exceed my call limit?",
        answer: "We'll notify you before you reach your limit. You can either upgrade your plan or purchase additional call credits. We never interrupt your service."
      }
    ]
  },
  {
    category: "Support",
    icon: "🎧",
    questions: [
      {
        question: "What kind of customer support do you provide?",
        answer: "Starter plans include email support (response within 24 hours). Professional plans get priority 24/7 support via email, chat, and phone. Enterprise customers get a dedicated account manager."
      },
      {
        question: "Do you offer training for new users?",
        answer: "Yes! All plans include access to our comprehensive knowledge base, video tutorials, and webinars. Enterprise customers receive personalized onboarding and training sessions."
      },
      {
        question: "Is there a setup fee?",
        answer: "No setup fees for Starter and Professional plans. Enterprise customers may have custom setup requirements that are discussed during the sales process."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your current billing period."
      }
    ]
  }
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setActiveQuestion(null);
    } else {
      setActiveCategory(category);
      setActiveQuestion(null);
    }
  };

  const toggleQuestion = (questionId: string) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about CallFlow and our services
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqCategories.map((category, categoryIndex) => {
            const categoryId = `category-${categoryIndex}`;
            const isCategoryOpen = activeCategory === categoryId;

            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryId)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-gray-900 text-xl">{category.category}</span>
                    <span className="text-gray-500 text-sm">({category.questions.length} questions)</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </button>

                {/* Questions */}
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-4 space-y-2">
                        {category.questions.map((item, questionIndex) => {
                          const questionId = `${categoryId}-q${questionIndex}`;
                          const isQuestionOpen = activeQuestion === questionId;

                          return (
                            <div
                              key={questionIndex}
                              className="bg-gray-50 rounded-xl overflow-hidden"
                            >
                              {/* Question */}
                              <button
                                onClick={() => toggleQuestion(questionId)}
                                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                              >
                                <span className="text-gray-800">{item.question}</span>
                                <motion.div
                                  animate={{ rotate: isQuestionOpen ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-shrink-0 ml-3"
                                >
                                  <ChevronDown className="w-4 h-4 text-cyan-600" />
                                </motion.div>
                              </button>

                              {/* Answer */}
                              <AnimatePresence>
                                {isQuestionOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                                      {item.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center p-8 bg-[#003366] rounded-2xl text-white"
        >
          <h3 className="text-white mb-2">Still have questions?</h3>
          <p className="text-gray-300 mb-6">
            Our support team is here to help you 24/7
          </p>
          <button className="px-8 py-3 bg-[#00bcd4] text-white rounded-md hover:bg-cyan-500 transition-all duration-300 hover:scale-105 font-medium">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}