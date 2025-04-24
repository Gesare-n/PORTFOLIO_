"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Heart, Code, Lightbulb } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Self-motivated and innovative Mechatronics Engineering student with a passion for creating impactful
            solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Nicole Gesare Onyiego</h3>
            <p className="mb-4 text-muted-foreground">
              As a multidisciplinary creator—game developer, artist, and web developer—I design experiences that don't
              just showcase my work, but tell a story about who I am. I merge interactivity, aesthetics, and
              personalization to reflect my diverse passions and evolving skillset.
            </p>
            <p className="mb-6 text-muted-foreground">
              I'm passionate about leveraging interdisciplinary opportunities to develop impactful solutions that
              enhance sustainability and improve consumer experiences.
            </p>

            <div className="flex flex-wrap gap-4">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="timeline-item pl-6 pb-6">
                        <h4 className="font-bold">Vice Chairperson</h4>
                        <p className="text-sm text-primary">Innovators Club, Dedan Kimathi University</p>
                        <p className="text-sm text-muted-foreground">July 2023 - Present | Nyeri, Kenya</p>
                        <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                          <li>Led various innovation projects, including IoT-based solutions</li>
                          <li>Mentored students in STEM fields</li>
                        </ul>
                      </div>

                      <div className="timeline-item pl-6 pb-6">
                        <h4 className="font-bold">Frontend Developer and Web Designer</h4>
                        <p className="text-sm text-primary">Songa Technologies</p>
                        <p className="text-sm text-muted-foreground">December 2024 - Present | Remote</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="timeline-item pl-6 pb-6">
                        <h4 className="font-bold">Bachelor of Science in Mechatronics Engineering</h4>
                        <p className="text-sm text-primary">Dedan Kimathi University of Technology</p>
                        <p className="text-sm text-muted-foreground">September 2022 - Present | Nyeri, Kenya</p>
                      </div>

                      <div className="timeline-item pl-6 pb-6">
                        <h4 className="font-bold">Software Development</h4>
                        <p className="text-sm text-primary">Moringa School</p>
                        <p className="text-sm text-muted-foreground">February 2024 - August 2024 | Nairobi, Kenya</p>
                      </div>

                      <div className="timeline-item pl-6 pb-6">
                        <h4 className="font-bold">IoT Certification Program</h4>
                        <p className="text-sm text-primary">HUBiquitous - WAZIUP</p>
                        <p className="text-sm text-muted-foreground">April 2024 - July 2024</p>
                      </div>

                      <div className="timeline-item pl-6">
                        <h4 className="font-bold">Game Development</h4>
                        <p className="text-sm text-primary">Maliyo Games</p>
                        <p className="text-sm text-muted-foreground">September 2023 - December 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interests" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">Game Development</h4>
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
                          <h4 className="font-bold">IoT Solutions</h4>
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
                          <h4 className="font-bold">Web Development</h4>
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
                          <h4 className="font-bold">Mentorship</h4>
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
