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
} from 'lucide-react';
import { motion } from 'motion/react';

import Callifologo from './assets/Callifologo.png';

import admin1 from "./assets/admin1.png";
import login_email from "./assets/login_email.png";
import login_otp from "./assets/login_otp.png";
import reset from "./assets/reset.png";
import callifo_dashboard from "./assets/callifo_dashboard.png";
import call_logs from "./assets/call_logs.png";
import call_analytics from "./assets/call_analytics.png";
import sim_management from "./assets/sim_management.png";
import sidebar from "./assets/sidebar.png";
import sim_setup from "./assets/sim_setup.png";
import mobile_dashboard from "./assets/mobile_dashboard.png";
import dialer from "./assets/dialer.png";

import { TutorialVideo } from './Tutorialvideo.tsx';
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
        title: 'Admin Registration',
        description:
          'Allows a company to create a new admin account by entering company details, domain, email, and password.',
        icon: UserPlus,
        iconColor: 'rgb(59, 130, 246)',
        image: admin1,
      },
      {
        number: 2,
        title: 'Admin Login (Email & Password)',
        description:
          'Enables admins to securely sign in using their registered email and password.',
        icon: Mail,
        iconColor: 'rgb(34, 197, 94)',
        image: login_email,
      },
      {
        number: 3,
        title: 'Admin Login (Email & OTP)',
        description:
          'Provides an alternative login method using a one-time password sent to the admin’s email.',
        icon: Shield,
        iconColor: 'rgb(29, 78, 216)',
        image: login_otp,
      },
      {
        number: 4,
        title: 'Password Reset via OTP',
        description:
          'Allows admins to securely reset their password using email-based OTP verification.',
        icon: Lock,
        iconColor: 'rgb(96, 165, 250)',
        image: reset,
      },
    ],
  },

  {
    sectionId: 2,
    sectionTitle: '📊 2: Admin Dashboard Overview',
    sectionDescription:
      'Monitor real-time call activity, system health, and performance from a centralized dashboard.',
    steps: [
      {
        number: 5,
        title: 'Admin Dashboard',
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
    sectionTitle: '📞3: Call Monitoring & Analytics',
    sectionDescription:
      'Analyze and track call data with advanced filters, visual charts, and performance metrics.',
    steps: [
      {
        number: 6,
        title: 'Call Logs',
        description:
          'Shows a detailed list of all call records with filters for time range, phone number, and call type.',
        icon: Phone,
        iconColor: 'rgb(20, 184, 166)',
        image: call_logs,
      },
      {
        number: 7,
        title: 'Call Analytics',
        description:
          'Presents graphical insights on call trends, durations, peak hours, and call distributions.',
        icon: BarChart3,
        iconColor: 'rgb(79, 70, 229)',
        image: call_analytics,
      },
    ],
  },

  {
    sectionId: 4,
    sectionTitle: '💳 4: SIM Management & Setup',
    sectionDescription:
      'Configure, assign, and manage SIMs used for calling and backend synchronization.',
    steps: [
      {
        number: 8,
        title: 'SIM Management',
        description:
          'Track SIM numbers and manage their status such as active, assigned, or inactive.',
        icon: CreditCard,
        iconColor: 'rgb(249, 115, 22)',
        image: sim_management,
      },
      {
        number: 9,
        title: 'SIM Setup / Office SIM Selection',
        description:
          'Select and register a SIM as the official office SIM for backend sync and auto-login.',
        icon: Settings,
        iconColor: 'rgb(13, 148, 136)',
        image: sim_setup,
      },
    ],
  },

  {
    sectionId: 5,
    sectionTitle: '🧭5: Navigation & System Access',
    sectionDescription:
      'Navigate seamlessly across all modules using the system sidebar and navigation panel.',
    steps: [
      {
        number: 10,
        title: 'Sidebar / Navigation Panel',
        description:
          'Provides quick access to dashboard, call management, SIM management, and system settings.',
        icon: LayoutDashboard,
        iconColor: 'rgb(168, 85, 247)',
        image: sidebar,
      },
    ],
  },

  {
    sectionId: 6,
    sectionTitle: '📱6: Callifo Mobile Application',
    sectionDescription:
      'Access Callifo features directly from the mobile application for on-the-go call management.',
    steps: [
      {
        number: 11,
        title: 'Callifo Mobile Dashboard',
        description:
          'Displays daily call status, backend sync information, and recent calls for the selected SIM.',
        icon: Smartphone,
        iconColor: 'rgb(34, 197, 94)',
        image: mobile_dashboard,
      },
      {
        number: 12,
        title: 'Dialer Screen',
        description:
          'Allows users to manually dial numbers and place calls using the registered office SIM.',
        icon: PhoneCall,
        iconColor: 'rgb(239, 68, 68)',
        image: dialer,
      },
    ],
  },
]
export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
             {/*<div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>*/}
       {/* LEFT: Text Content */}
<motion.div
  variants={slideUp}
  initial="hidden"
  animate="visible">
  {/* LOGO ABOVE TITLE */}
  <img
    src={Callifologo}
    alt="Callifo Logo"
    style={{
      width: '7.5rem',        
      height: 'auto',
      objectFit: 'contain',
      marginBottom: '1.25rem',
    }}
  />

  <h1
    style={{
      fontSize: '3.25rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
    }}
  >
    <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>
      Explore Callifo
    </span>{' '}
    <span style={{ color: 'rgb(30, 41, 59)' }}>
      with Detailed Step-by-Step Tutorials
    </span>
  </h1>

  <p
    style={{
      fontSize: '1.25rem',
      color: 'rgb(75, 85, 99)',
      marginBottom: '2rem',
      lineHeight: '1.7',
      maxWidth: '42rem',
    }}
  >
    Learn how to streamline operations, boost productivity, and scale faster
    with comprehensive tutorials covering setup, configuration, and advanced
    features.
  </p>

  {/* FEATURES */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
    {[
      'Quick start guides for instant setup',
      'Advanced feature walkthroughs',
      'How it works steps for smooth onboarding',
    ].map((feature) => (
      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CheckCircle
          style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)' }}
        />
        <span style={{ fontSize: '1.1rem', color: 'rgb(55, 65, 81)' }}>
          {feature}
        </span>
      </div>
    ))}
  </div>
</motion.div>


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
      <div key={section.sectionId} style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1e293b' }}>
          {section.sectionTitle}
        </h3>
        <p style={{ color: '#475569', marginBottom: '2.5rem' }}>
          {section.sectionDescription}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {section.steps.map((step) => {
            const Icon = step.icon;
            const isHovered = hoveredCard === step.number;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredCard(step.number)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
                  transition: 'transform 0.3s',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                }}
              >
                {/* ✅ IMAGE FIX — FULLY READABLE */}
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '380px',       
                    maxHeight: '520px',
                    objectFit: 'contain',     
                    background: '#f8fafc',
                    padding: '1.75rem',       
                    display: 'block',
                    transition: 'filter 0.3s',
                    filter: isHovered
                      ? 'brightness(0.35) blur(2px)'
                      : 'none',
                  }}
                />

                {/* ✅ HOVER OVERLAY (UNCHANGED STYLE) */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.85)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '2.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        background: step.iconColor,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <Icon color="white" size={28} />
                    </div>

                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {step.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.92)',
                        lineHeight: '1.6',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
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