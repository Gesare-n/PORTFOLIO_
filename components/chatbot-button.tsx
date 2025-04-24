"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample responses for the chatbot
const botResponses = {
  greeting: [
    "SYSTEM ONLINE. How may I assist you with Nicole's portfolio?",
    "INTERFACE ACTIVATED. Welcome to Nicole's digital space. What would you like to know?",
    "CONNECTION ESTABLISHED. I'm Nicole's portfolio assistant. How can I help you today?",
  ],
  projects:
    "PROJECT DATABASE ACCESSED: Nicole has worked on various projects including IoT solutions like Douse (fire suppression system), web applications like the Project Management System, and games like Skyglide Adventure. You can check them out in the Projects section!",
  skills:
    "SKILL MATRIX LOADED: Nicole's skills include software development (JavaScript, React, Python), game development (Unity, C#), CAD (SolidWorks, AutoCAD), and design (Figma). She's a multidisciplinary creator!",
  contact:
    "CONTACT PROTOCOLS INITIALIZED: You can reach Nicole via email at nicolegesare00@gmail.com or phone at +254 114 714 247. She's based in Nairobi, Kenya.",
  experience:
    "EXPERIENCE DATA RETRIEVED: Nicole has experience as Vice Chairperson at the Innovators Club at Dedan Kimathi University and as a Frontend Developer at Songa Technologies.",
  education:
    "EDUCATION RECORDS FOUND: Nicole is studying Mechatronics Engineering at Dedan Kimathi University. She's also completed programs at Moringa School (Software Development), HUBiquitous (IoT), and Maliyo Games (Game Development).",
  fallback:
    "PROCESSING ERROR: I don't have enough data to answer that query. Please explore Nicole's portfolio sections or reach out to her directly through the contact form for more information!",
}

// Function to get a random greeting
const getRandomGreeting = () => {
  const index = Math.floor(Math.random() * botResponses.greeting.length)
  return botResponses.greeting[index]
}

// Function to get a response based on the query
const getBotResponse = (query) => {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("hi") || lowerQuery.includes("hello") || lowerQuery.includes("hey")) {
    return getRandomGreeting()
  } else if (lowerQuery.includes("project")) {
    return botResponses.projects
  } else if (lowerQuery.includes("skill") || lowerQuery.includes("technology")) {
    return botResponses.skills
  } else if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("phone")) {
    return botResponses.contact
  } else if (lowerQuery.includes("experience") || lowerQuery.includes("work")) {
    return botResponses.experience
  } else if (lowerQuery.includes("education") || lowerQuery.includes("study") || lowerQuery.includes("university")) {
    return botResponses.education
  } else {
    return botResponses.fallback
  }
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: getRandomGreeting(),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot typing
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        text: getBotResponse(input),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full h-12 w-12 shadow-lg cyber-glow">
        {isOpen ? <X /> : <Bot />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 w-80 md:w-96 z-50"
          >
            <Card className="shadow-xl cyber-border p-[1px]">
              <CardHeader className="bg-primary/10 pb-4">
                <CardTitle className="text-lg flex items-center font-cyber">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                    <AvatarFallback className="bg-primary text-primary-foreground">NG</AvatarFallback>
                  </Avatar>
                  PORTFOLIO_ASSISTANT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 bg-card">
                <ScrollArea className="h-80 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm font-mono">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-primary/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-muted border-primary/50 font-mono"
                    />
                    <Button size="icon" onClick={handleSendMessage} className="cyber-glow">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
