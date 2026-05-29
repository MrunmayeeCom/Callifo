import { Clock, Check, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export const TutorialVideo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'white',
        borderRadius: '1.25rem',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        border: '1px solid rgb(226, 232, 240)',
        width: '100%',
        maxWidth: '480px',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 30px 60px -10px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.1)',
      }}
      className="video-card-enhanced"
    >
      {/* Shimmer effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.1), transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
        className="shimmer-effect"
      />

      {/* VIDEO PREVIEW */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          background: 'linear-gradient(135deg, rgb(219, 234, 254), rgb(207, 250, 254), rgb(186, 230, 253))',
          overflow: 'hidden',
        }}
      >
        {/* Animated floating particles */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(103, 58, 183, 0.1) 0%, transparent 50%)',
          }}
          className="floating-particles"
        />

        {/* Decorative dots pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Play Button */}
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: '0 25px 50px -10px rgba(6, 182, 212, 0.7)',
              }}
              whileTap={{ scale: 1.05 }}
              style={{
                width: '4.5rem',
                height: '4.5rem',
                background: 'rgb(6, 182, 212)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '4px',
                boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.5)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
              }}
              className="play-button-enhanced"
            >
              {/* Pulsing rings */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'rgb(6, 182, 212)',
                  zIndex: -1,
                }}
                className="pulse-ring-1"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'rgb(6, 182, 212)',
                  zIndex: -1,
                }}
                className="pulse-ring-2"
              />

              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </motion.button>
          </div>

          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              color: '#0F172A',
              fontWeight: 600,
              fontSize: '17px',
              marginBottom: '0.4rem',
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            Getting Started with Callifo
          </p>

          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              color: '#1e293b',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Clock size={14} />
            Duration: 5:32
          </p>
        </div>
      </div>

      {/* VIDEO INFO */}
      <div style={{ padding: '1.5rem', position: 'relative' }}>
        <h3
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: '20px',
            color: '#0F172A',
            marginBottom: '0.65rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Welcome to Callifo Tutorial
        </h3>

        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            color: '#475569',
            marginBottom: '1.25rem',
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          Learn how to set up your account, configure tracking parameters, and start monitoring your assets in just
          a few minutes.
        </p>

        {/* Feature tags */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {['Easy Setup', 'HD Quality', 'Subtitles'].map((feature) => (
            <span
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgb(240, 249, 255)',
                border: '1px solid rgb(186, 230, 253)',
                color: 'rgb(3, 105, 161)',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <Check size={12} />
              {feature}
            </span>
          ))}
        </div>

        {/* Watch button */}
        <motion.button
          whileHover={{
            y: -2,
            boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.3)',
          }}
          whileTap={{ y: 0 }}
          style={{
            fontFamily: '"Poppins", sans-serif',
            width: '100%',
            padding: '0.85rem 1rem',
            background: 'linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%)',
            color: 'white',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.2)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="watch-button-enhanced"
        >
          {/* Button shimmer effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              pointerEvents: 'none',
            }}
            className="button-shimmer"
          />

          <span style={{ position: 'relative', zIndex: 1 }}>Watch Full Tutorial Series</span>
          <ExternalLink size={18} style={{ position: 'relative', zIndex: 1 }} className="button-icon" />
        </motion.button>
      </div>

      <style jsx>{`
        .shimmer-effect {
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .video-card-enhanced:hover .shimmer-effect {
          animation: shimmer 0.8s ease;
        }

        .floating-particles {
          animation: float-rotate 20s linear infinite;
        }

        @keyframes float-rotate {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        .pulse-ring-1 {
          animation: pulse-ring 2s ease-in-out infinite;
        }

        .pulse-ring-2 {
          animation: pulse-ring 2s ease-in-out infinite 0.5s;
        }

        @keyframes pulse-ring {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .play-button-enhanced:hover {
          background: rgb(8, 145, 178);
        }

        .watch-button-enhanced:hover .button-shimmer {
          animation: button-shimmer 0.6s ease;
        }

        @keyframes button-shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .watch-button-enhanced:hover .button-icon {
          animation: icon-slide 0.3s ease forwards;
        }

        @keyframes icon-slide {
          to {
            transform: translateX(4px);
          }
        }
      `}</style>
    </motion.div>
  )
}

export default TutorialVideo