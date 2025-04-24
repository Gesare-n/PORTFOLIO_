"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Success
      toast({
        title: "Message received!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium block mb-1 text-secondary">
          YOUR_NAME
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="bg-muted border-primary/50 font-mono"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-1 text-secondary">
          YOUR_EMAIL
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="bg-muted border-primary/50 font-mono"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium block mb-1 text-secondary">
          YOUR_MESSAGE
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={5}
          required
          className="bg-muted border-primary/50 font-mono"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full cyber-button" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            TRANSMITTING...
          </>
        ) : (
          "CONTINUE_"
        )}
      </Button>
    </form>
  )
}
