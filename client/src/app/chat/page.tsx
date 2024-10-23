'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Comment from "@/feature/chat/comment"

interface Message {
  id: string;
  text: string;
  isSelf: boolean;
  timestamp: number;
}

interface ReceivedMessage {
  id: string;
  text: string;
  timestamp: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const socket = useRef<WebSocket | null>(null)
  const lastMessageId = useRef<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const connectWebSocket = () => {
      socket.current = new WebSocket('ws://localhost:8080/ws')

      socket.current.onopen = () => {
        setIsConnected(true)
        //console.log('WebSocket connected')
      }

      socket.current.onmessage = (event: MessageEvent) => {
        const receivedMessage: ReceivedMessage = JSON.parse(event.data)
        addMessageIfNew({
          id: receivedMessage.id,
          text: receivedMessage.text,
          isSelf: false,
          timestamp: receivedMessage.timestamp || Date.now()
        })
      }

      socket.current.onclose = () => {
        setIsConnected(false)
        //console.log('WebSocket disconnected. Trying to reconnect...')
        setTimeout(connectWebSocket, 5000)
      }

      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }
    }

    connectWebSocket()

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
    if (inputMessage && socket.current && isConnected) {
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
          <p className={`text-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full rounded-md border p-4 mb-4 overflow-y-auto">
            {messages.map((message) => (
              <Comment
                key={message.id}
                id={message.id}
                text={message.text}
                isSelf={message.isSelf}
                timestamp={formatTimestamp(message.timestamp)}
              />
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
              disabled={!isConnected}
            />
            <Button type="submit" disabled={!isConnected}>Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}