"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, Eye } from "lucide-react"
import { useState } from "react"

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState("cv")

  // Replace these with your actual file URLs when they're publicly accessible
  const files = {
    cv: {
      title: "Curriculum Vitae",
      description: "Comprehensive overview of my academic and professional journey",
      downloadUrl: "/files/nicole_gesare_cv.pdf", // Replace with actual file path
      viewUrl: "https://docs.google.com/document/d/1q4fvua7h-Z21vqQhKjlNF6TCiMmpf5dPPFNyaACkpIY/edit?tab=t.0",
    },
    resume: {
      title: "Professional Resume",
      description: "Concise summary of my skills and professional experience",
      downloadUrl: "/files/nicole_gesare_resume.pdf", // Replace with actual file path
      viewUrl: "https://docs.google.com/document/d/1yUQnsWJ-r-Rv5vyJey-5pVUCR78RP5PvqYY3oIfDsFc/edit?tab=t.0",
    },
  }

  return (
    <section id="resume" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-cyber mb-4 cyber-text">CREDENTIALS_</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            <span className="command-line">EXECUTING document.retrieve()</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* CV Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`cursor-pointer ${activeTab === "cv" ? "scale-105" : "opacity-80"}`}
            onClick={() => setActiveTab("cv")}
          >
            <Card
              className={`h-full cyber-border p-[1px] transition-all duration-300 ${activeTab === "cv" ? "cyber-glow" : ""}`}
            >
              <CardHeader className="bg-card">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Curriculum Vitae
                  </CardTitle>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-cyber text-primary">CV</span>
                  </div>
                </div>
                <CardDescription className="font-mono">
                  Comprehensive documentation of my professional journey
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-card pt-4">
                <ul className="space-y-2 text-sm font-mono">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Detailed academic background
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Complete project history
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Publications and research
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Technical skills breakdown
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-card pt-4 flex flex-wrap gap-2">
                <Button size="sm" className="cyber-button" asChild>
                  <a href={files.cv.viewUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    View CV
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="cyber-button" asChild>
                  <a href={files.cv.downloadUrl} download="Nicole_Gesare_CV.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className={`cursor-pointer ${activeTab === "resume" ? "scale-105" : "opacity-80"}`}
            onClick={() => setActiveTab("resume")}
          >
            <Card
              className={`h-full cyber-border p-[1px] transition-all duration-300 ${activeTab === "resume" ? "cyber-glow" : ""}`}
            >
              <CardHeader className="bg-card">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Professional Resume
                  </CardTitle>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-cyber text-secondary">RE</span>
                  </div>
                </div>
                <CardDescription className="font-mono">
                  Concise summary of my skills and professional experience
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-card pt-4">
                <ul className="space-y-2 text-sm font-mono">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Core competencies
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Professional experience
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Key achievements
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▹</span> Industry-relevant skills
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-card pt-4 flex flex-wrap gap-2">
                <Button size="sm" className="cyber-button" asChild>
                  <a href={files.resume.viewUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    View Resume
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="cyber-button" asChild>
                  <a href={files.resume.downloadUrl} download="Nicole_Gesare_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-muted/20 p-6 rounded-md max-w-2xl mx-auto cyber-border">
            <h3 className="text-xl font-cyber mb-4 text-primary">Need a custom format?</h3>
            <p className="text-muted-foreground font-mono mb-4">
              If you require my credentials in a different format or need additional information, please don't hesitate
              to reach out.
            </p>
            <Button asChild className="cyber-button">
              <a href="#contact">
                <ExternalLink className="mr-2 h-4 w-4" />
                Contact Me
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
