import { useState } from 'react'
import { Play, ExternalLink, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import introVideo from './assets/callifo_intro.mp4'

export function TutorialVideo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* VIDEO CARD */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="
          w-full
          max-w-[520px]
          rounded-3xl
          overflow-hidden
          bg-white
          shadow-2xl
        "
      >
        {/* TOP PREVIEW */}
        <div
          onClick={() => setOpen(true)}
          className="
            h-[260px]
            flex
            flex-col
            items-center
            justify-center
            text-center
            cursor-pointer
            bg-gradient-to-br
            from-blue-100
            via-cyan-100
            to-emerald-100
          "
        >
          <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center shadow-xl mb-4 hover:bg-cyan-600 transition">
            <Play className="w-9 h-9 text-white fill-white ml-1" />
          </div>

          <h4 className="text-base font-semibold text-slate-800">
            Getting Started with Callifo
          </h4>
          <p className="text-sm text-slate-500 mt-1">
            Duration: 5:32
          </p>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Welcome to Callifo Tutorial
          </h3>

          <p className="text-slate-600 leading-relaxed text-sm">
            Learn how to set up your account, configure tracking parameters, and
            start monitoring your assets in just a few minutes.
          </p>

          <a
            href="/tutorials"
            className="
              mt-4
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-slate-900
              text-white
              text-sm
              font-semibold
              hover:bg-slate-800
              transition
            "
          >
            Watch Full Tutorial Series
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="
                relative
                w-full
                max-w-5xl
                bg-black
                rounded-2xl
                overflow-hidden
                shadow-2xl
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  top-4
                  right-4
                  z-10
                  bg-black/60
                  p-2
                  rounded-full
                  text-white
                  hover:bg-black
                "
              >
                <X className="w-5 h-5" />
              </button>

              {/* HTML5 VIDEO */}
              <video
                src={introVideo}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}