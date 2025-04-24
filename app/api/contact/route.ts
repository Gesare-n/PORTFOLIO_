import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate form inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Log the submission (for demonstration purposes)
    console.log("Contact form submission:", { name, email, message })

    // In a real application, you would send this data to an email service or database
    // For now, we'll just return a success response
    return NextResponse.json({ message: "Message received successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
