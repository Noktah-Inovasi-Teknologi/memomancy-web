import { onMounted, onUnmounted } from 'vue'

interface ParallaxOptions {
  contentSelector?: string
  mediaSelector?: string
  contentSpeed?: number
  mediaSpeed?: number
}

type ParallaxType = 'content' | 'media' | null

interface SectionInfo {
  element: HTMLElement
  type: ParallaxType
  wrapper?: HTMLElement
  media?: HTMLElement
}

/**
 * Enhanced parallax effect that handles transitions between different section types.
 *
 * Handles three transition scenarios:
 * - para-before → nonpara-after: Parallax section followed by non-parallax section
 * - para-before → para-after: Parallax section followed by another parallax section
 * - nonpara-before → para-after: Non-parallax section followed by parallax section
 *
 * Usage:
 * - Add data-parallax to sections with text/div content
 * - Add data-parallax-media to sections with images/videos (applies to first child)
 * - Sections without either attribute are treated as non-parallax
 */
export const useParallax = (options: ParallaxOptions = {}) => {
  const {
    contentSelector = '[data-parallax]',
    mediaSelector = '[data-parallax-media]',
    contentSpeed = 0.25,
    mediaSpeed = 0.3
  } = options

  let allSections: SectionInfo[] = []
  let ticking = false

  const wrapContent = (section: HTMLElement): HTMLElement => {
    const computedStyle = window.getComputedStyle(section)

    const wrapper = document.createElement('div')
    wrapper.className = 'parallax-content-wrapper'

    wrapper.style.cssText = `
      will-change: transform;
      display: ${computedStyle.display};
      flex-direction: ${computedStyle.flexDirection};
      gap: ${computedStyle.gap};
      align-items: ${computedStyle.alignItems};
      justify-content: ${computedStyle.justifyContent};
      width: 100%;
      height: 100%;
    `

    while (section.firstChild) {
      wrapper.appendChild(section.firstChild)
    }

    section.appendChild(wrapper)
    section.style.overflow = 'hidden'

    return wrapper
  }

  const setupMediaSection = (section: HTMLElement): HTMLElement | undefined => {
    const media = section.firstElementChild as HTMLElement
    if (media) {
      section.style.overflow = 'hidden'
      media.style.willChange = 'transform'
    }
    return media
  }

  const updateParallax = () => {
    const windowHeight = window.innerHeight

    allSections.forEach((sectionInfo, index) => {
      const { element, type, wrapper, media } = sectionInfo
      const rect = element.getBoundingClientRect()
      const isVisible = rect.bottom > 0 && rect.top < windowHeight

      if (!isVisible) return

      // Calculate progress: 0 when section enters from bottom, 1 when exits from top
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height)

      // Get previous and next section types for transition handling
      const prevSection = index > 0 ? allSections[index - 1] : null
      const nextSection = index < allSections.length - 1 ? allSections[index + 1] : null

      if (type === 'content' && wrapper) {
        // Content parallax: content moves slower than scroll
        let speed = contentSpeed

        // Adjust based on neighboring sections
        if (prevSection?.type === 'media') {
          // Coming from media section - slightly faster parallax at top
          speed = contentSpeed * 1.2
        }
        if (nextSection?.type === 'media') {
          // Going to media section - ease out the parallax
          speed = contentSpeed * 0.8
        }

        const offset = (0.5 - progress) * rect.height * speed
        wrapper.style.transform = `translate3d(0, ${-offset}px, 0)`
      }
      else if (type === 'media' && media) {
        // Media parallax: media moves opposite to create depth
        let speed = mediaSpeed

        // Adjust based on neighboring sections
        if (prevSection?.type === 'content') {
          // Coming from content section
          speed = mediaSpeed * 1.1
        }
        if (nextSection?.type === 'content') {
          // Going to content section
          speed = mediaSpeed * 0.9
        }

        const offset = (progress - 0.5) * rect.height * speed
        media.style.transform = `translate3d(0, ${-offset}px, 0) scale(1.15)`
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

  const collectSections = () => {
    // Get all parallax-enabled sections in document order
    const contentSections = Array.from(document.querySelectorAll<HTMLElement>(contentSelector))
    const mediaSections = Array.from(document.querySelectorAll<HTMLElement>(mediaSelector))

    // Combine and sort by document position
    const allParallaxElements = [...contentSections, ...mediaSections].sort((a, b) => {
      const position = a.compareDocumentPosition(b)
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
      return 0
    })

    // Create sets for quick lookup
    const contentSet = new Set(contentSections)
    const mediaSet = new Set(mediaSections)

    allParallaxElements.forEach(element => {
      let type: ParallaxType = null
      let wrapper: HTMLElement | undefined
      let media: HTMLElement | undefined

      if (contentSet.has(element)) {
        type = 'content'
        wrapper = wrapContent(element)
      } else if (mediaSet.has(element)) {
        type = 'media'
        media = setupMediaSection(element)
      }

      if (type !== null) {
        allSections.push({ element, type, wrapper, media })
      }
    })
  }

  onMounted(() => {
    collectSections()

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick, { passive: true })

    updateParallax()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', requestTick)
    window.removeEventListener('resize', requestTick)

    // Clean up
    allSections.forEach(({ element, type, wrapper, media }) => {
      if (type === 'content' && wrapper) {
        while (wrapper.firstChild) {
          element.appendChild(wrapper.firstChild)
        }
        wrapper.remove()
        element.style.overflow = ''
      } else if (type === 'media' && media) {
        media.style.transform = ''
        media.style.willChange = 'auto'
        element.style.overflow = ''
      }
    })

    allSections = []
  })
}
