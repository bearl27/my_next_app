'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"

export default function TimedButton() {
  const [timeLeft, setTimeLeft] = useState(5)
  const [buttonState, setButtonState] = useState<'countdown' | 'active' | 'inactive'>('countdown')
  const [points, setPoints] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          } else {
            return 0
          }
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeLeft, isRunning])

  useEffect(() => {
    if (timeLeft === 0) {
      setButtonState('active')
    }
  }, [timeLeft])

  const handleClick = () => {
    if (buttonState === 'active') {
      setPoints((prevPoints) => prevPoints + 1)
      setButtonState('inactive')
    }
  }

  const handleReset = () => {
    setTimeLeft(5)
    setButtonState('countdown')
    setIsRunning(true)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleClick}
        disabled={buttonState !== 'active'}
        variant="ghost"
        className={`w-40 h-40 text-2xl font-bold rounded-full transition-all duration-300 ${
          buttonState === 'countdown' ? '!bg-primary hover:!bg-primary/90' :
          buttonState === 'active' ? '!bg-secondary hover:!bg-secondary/90' :
          '!bg-muted hover:!bg-muted/90'
        }`}
      >
        {buttonState === 'countdown' ? timeLeft :
         buttonState === 'active' ? 'Click!' : 'Inactive'}
      </Button>
      <p className="text-xl">Points: {points}</p>
      <Button
        onClick={handleReset}
        variant="outline"
        className="mt-4"
      >
        Reset
      </Button>
    </div>
  )
}