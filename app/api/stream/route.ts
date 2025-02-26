import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch('http://localhost:8080/streaming/rates?pair=USDJPY', {
    headers: {
      token: '10dc303535874aeccc86a8251e6992f5'
    }
  })
  const reader = response.body?.getReader()
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
      controller.close()
    }
  })

  return new NextResponse(stream)
}
