// Simple store implementation until zustand is installed
import { useState, useEffect } from 'react'

type StoreListener<T> = (state: T) => void

export class SimpleStore<T> {
  private state: T
  private listeners: Set<StoreListener<T>> = new Set()

  constructor(initialState: T) {
    this.state = initialState
  }

  getState = (): T => {
    return this.state
  }

  setState = (partial: Partial<T> | ((state: T) => Partial<T>)): void => {
    const nextState = typeof partial === 'function' ? partial(this.state) : partial
    this.state = { ...this.state, ...nextState }
    this.listeners.forEach(listener => listener(this.state))
  }

  subscribe = (listener: StoreListener<T>): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  useStore = (): T => {
    const [state, setState] = useState(this.state)

    useEffect(() => {
      const unsubscribe = this.subscribe(setState)
      return unsubscribe
    }, [])

    return state
  }
}

export function createStore<T>(initialState: T) {
  return new SimpleStore(initialState)
}
