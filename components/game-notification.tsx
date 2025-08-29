"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"

interface GameNotificationProps {
  message: string
  type?: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function GameNotification({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: GameNotificationProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-green-400 bg-green-900/20 text-green-400"
      case "error":
        return "border-red-400 bg-red-900/20 text-red-400"
      case "info":
        return "border-blue-400 bg-blue-900/20 text-blue-400"
      default:
        return "border-yellow-400 bg-yellow-900/20 text-yellow-400"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return "🎉"
      case "error":
        return "⚠️"
      case "info":
        return "ℹ️"
      default:
        return "🦈"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <Card className={`${getTypeStyles()} border-2 shadow-lg max-w-sm`}>
        <div className="p-4 flex items-center space-x-3">
          <div className="text-2xl">{getIcon()}</div>
          <div className="flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      </Card>
    </div>
  )
}

// 全局通知管理器
let notificationCallback: ((notification: any) => void) | null = null

export function setNotificationCallback(callback: (notification: any) => void) {
  notificationCallback = callback
}

export function showGameNotification(message: string, type: "success" | "error" | "info" = "success") {
  if (notificationCallback) {
    notificationCallback({ message, type, id: Date.now() })
  }
}
