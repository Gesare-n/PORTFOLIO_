"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="#home" className="text-2xl font-cyber text-primary cyber-text">
              NG_
            </Link>
            <p className="text-sm text-gray-400 mt-2 font-mono">Game Developer | Artist | Web Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <p className="text-sm text-gray-400 font-mono">
              &copy; {currentYear} <span className="text-primary">Nicole Gesare Onyiego</span>. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
