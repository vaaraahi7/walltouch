// Simple toast implementation until react-hot-toast is installed

interface ToastOptions {
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

class SimpleToast {
  private container: HTMLElement | null = null

  private createContainer() {
    if (this.container) return this.container

    this.container = document.createElement('div')
    this.container.id = 'toast-container'
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(this.container)
    return this.container
  }

  private createToast(message: string, type: 'success' | 'error' | 'info' = 'info', options: ToastOptions = {}) {
    const container = this.createContainer()
    const toast = document.createElement('div')
    
    const bgColor = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    }[type]

    toast.style.cssText = `
      background: ${bgColor};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      pointer-events: auto;
      max-width: 300px;
      word-wrap: break-word;
    `
    
    toast.textContent = message
    container.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
    }, 10)

    // Remove after duration
    const duration = options.duration || 4000
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast)
        }
      }, 300)
    }, duration)
  }

  success(message: string, options?: ToastOptions) {
    this.createToast(message, 'success', options)
  }

  error(message: string, options?: ToastOptions) {
    this.createToast(message, 'error', options)
  }

  info(message: string, options?: ToastOptions) {
    this.createToast(message, 'info', options)
  }
}

const toast = new SimpleToast()

export default toast
