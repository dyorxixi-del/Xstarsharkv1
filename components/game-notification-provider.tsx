"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GameNotification, setNotificationCallback } from "./game-notification"

interface Notification {
  id: number
  message: string
  type: "success" | "error" | "info"
}

export function GameNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setNotificationCallback((notification: Notification) => {
      setNotifications((prev) => [...prev, notification])
    })
  }, [])

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <>
      {children}
      {notifications.map((notification) => (
        <GameNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
          duration={4000}
        />
      ))}
    </>
  )
}
