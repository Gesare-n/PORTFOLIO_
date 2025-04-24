"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Heart, Code, Lightbulb, Terminal, Cpu, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function AboutSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    console.log("Image failed to load")
    setImageLoaded(false)
  }

  return (
    <section id="about" className="py-20 cyber-grid">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-cyber mb-4 cyber-text">ABOUT_SYSTEM</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            <span className="command-line">EXECUTING self.description()</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="cyber-border p-[2px] rounded-md"
          >
            <div className="bg-card p-6 rounded-md">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="relative w-48 h-48 overflow-hidden rounded-lg cyber-border p-[2px]">
                  {mounted && (
                    <div className="w-full h-full relative overflow-hidden">
                      <Image
                        src="/images/profile.png"
                        alt="Nicole Gesare Onyiego"
                        width={192}
                        height={192}
                        className={`object-cover transition-opacity duration-500 ${
                          imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-4xl font-cyber text-white">NGO</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50"></div>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary animate-ping"></div>
                  <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-secondary animate-pulse"></div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <h3 className="text-2xl font-cyber text-primary">Nicole Gesare Onyiego</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/20 text-xs font-mono">
                      <Cpu className="h-3 w-3 mr-1" /> Mechatronics Engineer
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/20 text-xs font-mono">
                      <Code className="h-3 w-3 mr-1" /> Developer
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/20 text-xs font-mono">
                      <Zap className="h-3 w-3 mr-1" /> Creator
                    </span>
                  </div>

                  <div className="typing-container">
                    <p className="terminal-text text-sm md:text-base text-muted-foreground font-mono mb-2">
                      Status: Online | Location: Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-md border-l-2 border-primary">
                  <p className="text-muted-foreground font-mono">
                    <span className="command-response">
                      As a multidisciplinary creator at the intersection of engineering and digital art, I blend
                      technical precision with creative vision to build experiences that transcend conventional
                      boundaries.
                    </span>
                  </p>
                </div>

                <p className="text-muted-foreground font-mono">
                  <span className="command-response">
                    My journey through mechatronics engineering, game development, and web creation has equipped me with
                    a unique perspective on problem-solving. I don't just build products—I craft experiences that tell
                    stories and create meaningful connections.
                  </span>
                </p>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-md">
                  <p className="font-mono text-sm">
                    <span className="text-primary">&gt; Mission:</span> Leveraging interdisciplinary approaches to
                    develop impactful solutions that enhance sustainability and improve user experiences.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-muted-foreground">Mechatronics Engineering</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Interests</h4>
                    <p className="text-sm text-muted-foreground">IoT, Game Dev, Web Design</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-3 cyber-border p-[1px]">
                <TabsTrigger value="experience" className="font-mono">
                  EXPERIENCE
                </TabsTrigger>
                <TabsTrigger value="education" className="font-mono">
                  EDUCATION
                </TabsTrigger>
                <TabsTrigger value="interests" className="font-mono">
                  INTERESTS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-6">
                <Card className="cyber-border p-[1px]">
                  <CardContent className="pt-6 bg-card">
                    <div className="space-y-4">
                      <div className="timeline-item pl-6 pb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <div className="absolute left-1.5 top-3 w-0.5 h-full bg-primary/30"></div>
                        <h4 className="font-bold text-primary">Vice Chairperson</h4>
                        <p className="text-sm text-secondary">Innovators Club, Dedan Kimathi University</p>
                        <p className="text-sm text-muted-foreground">July 2023 - Present | Nyeri, Kenya</p>
                        <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                          <li>Led various innovation projects, including IoT-based solutions</li>
                          <li>Mentored students in STEM fields</li>
                        </ul>
                      </div>

                      <div className="timeline-item pl-6 pb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <div className="absolute left-1.5 top-3 w-0.5 h-full bg-primary/30"></div>
                        <h4 className="font-bold text-primary">Frontend Developer and Web Designer</h4>
                        <p className="text-sm text-secondary">Songa Technologies</p>
                        <p className="text-sm text-muted-foreground">December 2024 - Present | Remote</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Card className="cyber-border p-[1px]">
                  <CardContent className="pt-6 bg-card">
                    <div className="space-y-4">
                      <div className="timeline-item pl-6 pb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <div className="absolute left-1.5 top-3 w-0.5 h-full bg-primary/30"></div>
                        <h4 className="font-bold text-primary">Bachelor of Science in Mechatronics Engineering</h4>
                        <p className="text-sm text-secondary">Dedan Kimathi University of Technology</p>
                        <p className="text-sm text-muted-foreground">September 2022 - Present | Nyeri, Kenya</p>
                      </div>

                      <div className="timeline-item pl-6 pb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <div className="absolute left-1.5 top-3 w-0.5 h-full bg-primary/30"></div>
                        <h4 className="font-bold text-primary">Software Development</h4>
                        <p className="text-sm text-secondary">Moringa School</p>
                        <p className="text-sm text-muted-foreground">February 2024 - August 2024 | Nairobi, Kenya</p>
                      </div>

                      <div className="timeline-item pl-6 pb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <div className="absolute left-1.5 top-3 w-0.5 h-full bg-primary/30"></div>
                        <h4 className="font-bold text-primary">IoT Certification Program</h4>
                        <p className="text-sm text-secondary">HUBiquitous - WAZIUP</p>
                        <p className="text-sm text-muted-foreground">April 2024 - July 2024</p>
                      </div>

                      <div className="timeline-item pl-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                        <h4 className="font-bold text-primary">Game Development</h4>
                        <p className="text-sm text-secondary">Maliyo Games</p>
                        <p className="text-sm text-muted-foreground">September 2023 - December 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interests" className="mt-6">
                <Card className="cyber-border p-[1px]">
                  <CardContent className="pt-6 bg-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">Game Development</h4>
                          <p className="text-sm text-muted-foreground">
                            Creating interactive experiences with Unity and C#
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">IoT Solutions</h4>
                          <p className="text-sm text-muted-foreground">
                            Building smart systems that solve real-world problems
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">Web Development</h4>
                          <p className="text-sm text-muted-foreground">
                            Creating responsive and interactive web applications
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">Mentorship</h4>
                          <p className="text-sm text-muted-foreground">Guiding high school students in STEM fields</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
