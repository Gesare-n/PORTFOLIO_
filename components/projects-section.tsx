"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Gamepad2Icon as GameController2 } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Douse: Autonomous Fire Suppression",
    description:
      "Designed and implemented an automated fire suppression system using IoT technologies to detect and suppress fires in real time.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      presentation: "https://www.canva.com/design/DAGjqQO2U7M/GcKq8xIad-zmTUjGkJGy1A/edit",
      paper: "https://drive.google.com/file/d/1oDuvhuteOLcCFzRdMrX7LqHNhpLOgYXI/view?usp=sharing",
      github: null,
      live: null,
    },
    tags: ["IoT", "Engineering", "Hardware"],
    category: "IoT",
  },
  {
    id: 2,
    title: "Project Management System",
    description:
      "This app is designed to help administrators, students, and instructors streamline and enhance their performance throughout the project development process.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/moringa-school-mgmt",
      live: "https://66bdd80c0f4773ae207ec798--famous-pavlova-721275.netlify.app/",
      presentation: null,
      paper: null,
    },
    tags: ["React", "JavaScript", "Web Development"],
    category: "Web",
  },
  {
    id: 3,
    title: "Afyalink - CLI Application",
    description:
      "Created a command-line interface application to monitor and manage health data for diabetes patients, improving health data tracking and patient care.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/AFYALINK_APP",
      live: null,
      presentation: null,
      paper: null,
    },
    tags: ["Python", "CLI", "Healthcare"],
    category: "Software",
  },
  {
    id: 4,
    title: "E-commerce Website - Game Haven",
    description:
      "Developed an online platform for purchasing games, featuring a user-friendly interface and secure payment system.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/Game-Haven",
      live: null,
      presentation: null,
      paper: null,
    },
    tags: ["Web Development", "E-commerce", "JavaScript"],
    category: "Web",
  },
  {
    id: 5,
    title: "Chanjo Health",
    description:
      "Developed an application ensuring every child's immunization is up-to-date through a robust SMS notification system.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/Immunization-App",
      live: null,
      presentation: null,
      paper: null,
    },
    tags: ["Healthcare", "Mobile", "SMS"],
    category: "Software",
  },
  {
    id: 6,
    title: "Car Rental Platform",
    description:
      "Built an app that simplifies car renting for business owners and individuals, featuring a user-friendly interface and efficient booking system.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/Car-Renting-Platform",
      live: null,
      presentation: null,
      paper: null,
    },
    tags: ["Web Development", "Booking System", "JavaScript"],
    category: "Web",
  },
  {
    id: 7,
    title: "Skyglide Adventure",
    description: "An endless runner game where players navigate through obstacles in a dynamic environment.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      live: "https://n-gesare-o.itch.io/skyglide-adventure",
      github: null,
      presentation: null,
      paper: null,
    },
    tags: ["Unity", "C#", "Game Development"],
    category: "Game",
  },
  {
    id: 8,
    title: "Roller Splat",
    description: "A puzzle game where players control a ball to paint all the tiles in each level.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/-Roller-Splat---/tree/main",
      gameplay: "https://drive.google.com/file/d/1iuU32S5jGQWN_a1n2G6cPzVV8uKnlDBR/view?usp=sharing",
      presentation: null,
      paper: null,
    },
    tags: ["Unity", "C#", "Game Development"],
    category: "Game",
  },
  {
    id: 9,
    title: "Whack a Food",
    description: "A fun game inspired by the classic whack-a-mole, but with food items.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/Challenge5-whack-a-food/tree/main",
      gameplay: "https://drive.google.com/file/d/1Q5pZEPwwA59nzqPucuJSo2lFknpEYAxL/view?usp=sharing",
      presentation: null,
      paper: null,
    },
    tags: ["Unity", "C#", "Game Development"],
    category: "Game",
  },
  {
    id: 10,
    title: "Helix Jump",
    description: "A challenging game where players navigate a ball through a spiral tower.",
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "https://github.com/Gesare-n/CHALLENGE7/tree/main",
      gameplay: "https://drive.google.com/file/d/1egE8o0n6dcPiUJRmGjknO4cpk_u7j8EC/view?usp=sharing",
      presentation: null,
      paper: null,
    },
    tags: ["Unity", "C#", "Game Development"],
    category: "Game",
  },
]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Web", "Game", "IoT", "Software"]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work across web development, game design, and IoT solutions
          </p>
        </motion.div>

        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden project-card">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.title}</CardTitle>
                    {project.category === "Game" && <GameController2 className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {project.links.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.links.live && (
                    <Button size="sm" asChild>
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.links.gameplay && (
                    <Button size="sm" asChild>
                      <a href={project.links.gameplay} target="_blank" rel="noopener noreferrer">
                        <GameController2 className="h-4 w-4 mr-2" />
                        Gameplay
                      </a>
                    </Button>
                  )}
                  {project.links.presentation && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.presentation} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Presentation
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
