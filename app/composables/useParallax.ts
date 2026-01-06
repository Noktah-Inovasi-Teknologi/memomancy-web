import { onMounted, onUnmounted } from 'vue'

interface ParallaxOptions {
  selector?: string
  speed?: number
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { selector = '[data-parallax]', speed = 0.2 } = options

  let sections: HTMLElement[] = []
  let sectionOffsets: number[] = []
  let ticking = false
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null

  const updateParallax = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    sections.forEach((section, index) => {
      const originalTop = sectionOffsets[index]
      if (originalTop === undefined) return

      // Calculate section position relative to viewport
      const sectionTop = originalTop - scrollY
      const sectionBottom = sectionTop + section.offsetHeight

      // Only apply parallax to visible sections or sections that have been scrolled past
      const isInViewport = sectionBottom > 0 && sectionTop < windowHeight
      const hasBeenPassed = scrollY > originalTop

      if (hasBeenPassed || isInViewport) {
        // Calculate parallax offset with smooth progression
        const scrolledPast = Math.max(0, scrollY - originalTop)
        const parallaxOffset = scrolledPast * speed

        // Apply transform with hardware acceleration
        section.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`
        section.style.willChange = 'transform'
      } else {
        // Reset sections below viewport
        section.style.transform = 'translate3d(0, 0, 0)'
        section.style.willChange = 'auto'
      }
    })

    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(updateParallax)
    }
  }

  const handleResize = () => {
    // Debounce resize events
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      sectionOffsets = sections.map(section => section.offsetTop)
      requestTick()
    }, 150)
  }

  onMounted(() => {
    // Find all parallax sections
    const nodeList = document.querySelectorAll<HTMLElement>(selector)
    sections = Array.from(nodeList)

    // Store original positions
    sectionOffsets = sections.map(section => section.offsetTop)

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', requestTick, { passive: true })

    // Add resize listener with debouncing
    window.addEventListener('resize', handleResize, { passive: true })

    // Initial update
    updateParallax()
  })

  onUnmounted(() => {
    // Clean up event listeners
    window.removeEventListener('scroll', requestTick)
    window.removeEventListener('resize', handleResize)

    // Clear resize timeout
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    // Reset all transforms
    sections.forEach((section) => {
      section.style.transform = ''
      section.style.willChange = 'auto'
    })
  })
}
