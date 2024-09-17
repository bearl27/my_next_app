'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: string;
  text: string;
  isSelf: boolean;
  timestamp: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const socket = useRef<WebSocket | null>(null)
  const lastMessageId = useRef<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8080/ws')
    socket.current.onmessage = (event: MessageEvent) => {
      const receivedMessage = JSON.parse(event.data)
      addMessageIfNew({
        id: receivedMessage.id,
        text: receivedMessage.text,
        isSelf: false,
        timestamp: receivedMessage.timestamp || Date.now()
      })
    }
    return () => {
      socket.current?.close()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessageIfNew = (newMessage: Message) => {
    if (newMessage.id !== lastMessageId.current) {
      setMessages(prev => [...prev, newMessage])
      lastMessageId.current = newMessage.id
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMessage && socket.current) {
      const messageId = Date.now().toString()
      const timestamp = Date.now()
      const messageToSend = { id: messageId, text: inputMessage, timestamp }
      socket.current.send(JSON.stringify(messageToSend))
      addMessageIfNew({ id: messageId, text: inputMessage, isSelf: true, timestamp })
      setInputMessage('')
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Real-time Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full rounded-md border p-4 mb-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex flex-col ${message.isSelf ? 'items-end' : 'items-start'} mb-2`}>
                <p className={`rounded-lg p-2 max-w-[70%] ${message.isSelf ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {message.text}
                </p>
                <span className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex space-x-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}