'use client'

import { useEffect, useCallback } from 'react'

export interface ShortcutAction {
  key: string
  description: string
  action: () => void
  modifier?: 'ctrl' | 'cmd' | 'shift' | 'alt'
  category?: string
}

export function useKeyboardShortcuts(shortcuts: ShortcutAction[]) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // 忽略在输入框中的按键
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return
    }

    const { key, ctrlKey, metaKey, shiftKey, altKey } = event
    
    const shortcut = shortcuts.find(s => {
      const keyMatch = s.key.toLowerCase() === key.toLowerCase()
      
      if (!keyMatch) return false
      
      switch (s.modifier) {
        case 'ctrl':
          return ctrlKey && !metaKey && !shiftKey && !altKey
        case 'cmd':
          return metaKey && !ctrlKey && !shiftKey && !altKey
        case 'shift':
          return shiftKey && !ctrlKey && !metaKey && !altKey
        case 'alt':
          return altKey && !ctrlKey && !metaKey && !shiftKey
        default:
          return !ctrlKey && !metaKey && !shiftKey && !altKey
      }
    })
    
    if (shortcut) {
      event.preventDefault()
      shortcut.action()
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return { shortcuts }
}