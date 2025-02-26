'use client'
import React, { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch('/api/stream')
      console.log(response)
      const reader = response.body?.getReader()

      if (reader) {
        const decoder = new TextDecoder()
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer = decoder.decode(value, { stream: true })
          console.log(buffer)
          setData(buffer)
        }
      }
    }

    fetchStream()
  }, [])

  return (
    <div>
      <>{data}</>
    </div>
  )
}
