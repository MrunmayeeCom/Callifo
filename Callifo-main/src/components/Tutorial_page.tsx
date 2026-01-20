import React, { useState } from 'react';
import {
  UserPlus,
  Settings,
  Shield,
  Mail,
  Lock,
  BarChart3,
  Phone,
  LayoutDashboard,
  Smartphone,
  PhoneCall,
  CreditCard,
  Play,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

import Callifologo from './assets/Callifologo.png';

import admin1 from "./assets/admin1.png";
import login_email from "./assets/login_email.png";
import login_otp from "./assets/login_otp.png";
import reset from "./assets/reset.png";
import callifo_dashboard from "./assets/callifo_dashboard.png";
import settings from "./assets/settings.png";
import app_info from "./assets/app_info.png";
import registered_sim from "./assets/registered_sim.png";
import dialer from "./assets/dialer.png";

import { TutorialVideo } from './TutorialVideo';
import { NewFooter} from './NewFooter';

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};


export const tutorialSections = [
  {
    sectionId: 1,
    sectionTitle: ' 🧑‍💼1: Admin Registration & Authentication',
    sectionDescription:
      'Initial system onboarding where the Admin registers, activates the license, and securely sets up credentials.',
    steps: [
      {
        number: 1,
        title: 'Employee Registration',
        description:
          'Allows the user to create a new employee account by entering company details, email, password as well as sim card selection.',
        icon: UserPlus,
        iconColor: 'rgb(59, 130, 246)',
        image: admin1,
      },
      {
        number: 2,
        title: 'Employee Login (Email & Password)',
        description:
          'Enables employees to securely sign in using their registered email and password.',
        icon: Mail,
        iconColor: 'rgb(34, 197, 94)',
        image: login_email,
      },
      {
        number: 3,
        title: 'Employee Login (Email & OTP)',
        description:
          'Provides an alternative login method using a one-time password sent to the employee’s email.',
        icon: Shield,
        iconColor: 'rgb(29, 78, 216)',
        image: login_otp,
      },
      {
        number: 4,
        title: 'Password Reset via OTP',
        description:
          'Allows employees to securely reset their password using email-based OTP verification.',
        icon: Lock,
        iconColor: 'rgb(96, 165, 250)',
        image: reset,
      },
    ],
  },

  {
    sectionId: 2,
    sectionTitle: '📊 2: Dashboard Overview',
    sectionDescription:
      'Monitor real-time call activity, system health, and performance from a centralized dashboard.',
    steps: [
      {
        number: 5,
        title: 'User Dashboard',
        description:
          'Displays a summarized view of total calls, incoming calls, outgoing calls, and missed calls.',
        icon: BarChart3,
        iconColor: 'rgb(99, 102, 241)',
        image: callifo_dashboard,
      },
    ],
  },
  {
  sectionId: 3,
  sectionTitle: '📱 6: Callifo Mobile Application',
  sectionDescription:
    'Access and manage Callifo mobile features including SIM configuration, dialing, and application information.',
  steps: [
    {
      number: 6,
      title: 'Settings Screen',
      description:
        'Provides access to SIM configuration, app management options, update checks, and quick actions such as downloading the latest APK or signing out.',
      icon: Settings,
      iconColor: 'rgb(59, 130, 246)',
      image: settings,
    },
    {
      number: 7,
      title: 'App Information Panel',
      description:
        'Displays detailed application metadata including app name, version, build number, package name, and update status.',
      icon: FileText,
      iconColor: 'rgb(16, 185, 129)',
      image: app_info,
    },
    {
      number: 8,
      title: 'Registered SIM Details',
      description:
        'Shows the registered office SIM details including slot information, carrier data, and call history, ensuring correct SIM usage.',
      icon: CheckCircle2,
      iconColor: 'rgb(34, 197, 94)',
      image: registered_sim,
    },
    {
      number: 9,
      title: 'Dialer Screen',
      description:
        'Allows users to manually enter phone numbers and place outgoing calls using the registered office SIM, with recent call indicators.',
      icon: PhoneCall,
      iconColor: 'rgb(239, 68, 68)',
      image: dialer,
    },
  ],
}
];

export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});
  const [popupSide, setPopupSide] = useState('right');


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const updated = { ...prev };
        tutorialSections.forEach((section) => {
          section.steps.forEach((step) => {
            if (step.multiImages && step.images) {
              const currentIndex = updated[step.number] ?? 0;
              updated[step.number] = (currentIndex + 1) % step.images.length;
            }
          });
        });
        return updated;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, white, rgb(236, 254, 255), white)', opacity: 0.8 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section with Left-Right Layout */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '6rem', 
              alignItems: 'center' 
            }}>
              {/* LEFT: Text Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={Callifologo} alt="Callifo Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                </div>
                
                <h1 style={{ fontSize: '3.25rem', fontWeight: 800,marginBottom: '1.5rem',lineHeight: '1.1',letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'rgb(6, 182, 212)',fontWeight: 900 }}>Explore Callifo</span>{' '}
                  <span style={{ color: 'rgb(30, 41, 59)' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem',color: 'rgb(75, 85, 99)',marginBottom: '2rem',lineHeight: '1.7',maxWidth: '42rem' }}>
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)', flexShrink: 0 }} />
                      <span style={{ fontSize: '1.1rem', color: 'rgb(55, 65, 81)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Video Card */}
<motion.div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }}
  animate={{ y: [0, -14, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  <div
    style={{
      background: 'white',
      borderRadius: '1.75rem',
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      border: '1px solid rgb(243, 244, 246)',
      width: '100%',
      maxWidth: '640px', // 🔥 INCREASED SIZE
    }}
  >
    {/* VIDEO PREVIEW */}
    <div
      style={{
        position: 'relative',
        height: '300px', // 🔥 TALLER VIDEO AREA
        background:
          'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(207, 250, 254))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '5.5rem',
              height: '5.5rem',
              background: 'rgb(6, 182, 212)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: 'none',
              cursor: 'pointer',
              margin: '0 auto 1.75rem',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgb(8, 145, 178)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgb(6, 182, 212)')
            }
          >
            <Play
              style={{
                width: '2.75rem',
                height: '2.75rem',
                color: 'white',
                marginLeft: '0.25rem',
              }}
              fill="white"
            />
          </button>

          <p
            style={{
              marginTop: '1.25rem',
              color: 'rgb(55, 65, 81)',
              fontWeight: 600,
              fontSize: '1.15rem',
            }}
          >
            Getting Started with Callifo
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgb(107, 114, 128)',
              marginTop: '0.25rem',
            }}
          >
            Duration: 5:32
          </p>
        </div>
      </div>
    </div>

    {/* VIDEO INFO */}
    <div style={{ padding: '2.25rem' }}>
      <h3
        style={{
          fontSize: '1.5rem',
          color: 'rgb(30, 41, 59)',
          marginBottom: '0.75rem',
          fontWeight: 700,
        }}
      >
        Welcome to Callifo Tutorial
      </h3>

      <p
        style={{
          color: 'rgb(75, 85, 99)',
          marginBottom: '1.75rem',
          lineHeight: '1.65',
        }}
      >
        Learn how to set up your account, configure tracking parameters, and
        start monitoring your assets in just a few minutes.
      </p>

      <button
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'rgb(30, 41, 59)',
          color: 'white',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 12px 18px -6px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgb(15, 23, 42)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgb(30, 41, 59)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Watch Full Tutorial Series
        <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>
    </div>
  </div>
</motion.div>
 </div>
          </div>
        </section>
        {/* Tutorial Section Header */}
<section
  style={{
    padding: '3rem 1rem 2.5rem',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)',
  }}
>
  <div
    style={{
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: '2.4rem',
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: '0.75rem',
      }}
    >
      Complete Step-by-Step Tutorial
    </h2>

    <p
      style={{
        fontSize: '1rem',
        color: '#475569',
        maxWidth: '720px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      Master Callifo with our comprehensive guide covering every feature
      from sign-up to advanced functionality
    </p>
  </div>
</section>
<section style={{ padding: '3rem 1rem' }}>
  <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
    {tutorialSections.map((section) => (
      <div key={section.sectionId} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1e293b' }}>
          {section.sectionTitle}
        </h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          {section.sectionDescription}
        </p>

        <div
  style={{
    display: 'flex',
    gap:  '6rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: '2rem',
    paddingInline: '6rem', 
  }}
>
  {section.steps.map((step, stepIndex) => {
    const Icon = step.icon;
    const isHovered = hoveredCard === step.number;

    const images = step.multiImages ? step.images : [step.image];
    const isSingleImage = !step.multiImages;

    return (
      <div
        key={step.number}
        onMouseEnter={() => setHoveredCard(step.number)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          position: 'relative',
          width: '340px',
          perspective: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Staggered Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: (stepIndex * 0.12),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: false, margin: '-80px', amount: 0.3 }}
          style={{ height: '100%' }}
        >
          {/* 🔥 ADD THIS WRAPPER HERE */}
<div
  style={{
    position: 'relative',
    overflow: 'visible',
  }}
></div>
        <motion.div
          animate={{
            rotateY: isHovered ? -8 : 0,
            rotateX: isHovered ? 4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          style={{
            borderRadius: 0,
            overflow: 'visible',
            boxShadow: 'none',
              //? '0 40px 80px rgba(0,0,0,0.55)'
              //: '0 25px 50px rgba(0,0,0,0.35)',
            //background: '#000',
            //border: '8px solid #000',
          }}
        >
          <motion.img
            key={activeImageIndex[step.number] ?? 0}
            src={images[activeImageIndex[step.number] ?? 0]}
            alt={step.title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '680px',
              objectFit: 'cover',
              background: 'transparent',
              display: 'block',
            }}
          />
        {/* Carousel Navigation Dots - Removed, now fully automatic */}
        </motion.div>


        {/* 🟨 POPUP DESCRIPTION */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 99999,
              pointerEvents: 'none',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            {/* 🔢 STEP NUMBER BADGE */}
    <div
      style={{
        position: 'absolute',
        top: '-14px',
        left: '-14px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: step.iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.05rem',
        fontWeight: 800,
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
      }}
    >
      {step.number}
    </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: step.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Icon color="white" size={22} />
            </div>

            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              {step.title}
            </h4>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
              }}
            >
              {step.description}
            </p>

            {step.details && (
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem' }}>
                {step.details.map((d, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.75)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
        </motion.div>
      </div>
    );
  })}
</div>




                
                
      </div>    ))}
  </div>
</section>
           
{/* CTA SECTION */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  }}
>
  <button
    onClick={() =>
      (window.location.href =
        'https://admin-callifo.onrender.com/')
    }
    style={{
      padding: '1.25rem 3.5rem',   
      background: 'rgb(30, 41, 59)',
      color: 'white',
      borderRadius: '1rem',        
      border: 'none',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.3,             
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgb(15, 23, 42)';
      e.currentTarget.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgb(30, 41, 59)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    Go to Dashboard
    <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
  </button>
</div>
<NewFooter/>
</div>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}