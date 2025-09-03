import { describe, it, expect } from 'vitest'
import {
  phoneNumber,
  phoneLink,
  whatsappLink,
  emailAddress,
  emailLink,
  instagramName,
  instagramLink,
  tiktokName,
  tiktokLink,
  facebookName,
  facebookLink,
  youtubeName,
  youtubeLink,
  address,
  socialMediaStats
} from '../../app/data/commonInformations'

describe('commonInformations', () => {
  it('should have correct phone number format', () => {
    expect(phoneNumber).toBe('+62 851-7301-7749')
    expect(phoneLink).toBe('tel:+6285173017749')
  })

  it('should have valid WhatsApp link', () => {
    expect(whatsappLink).toBe('https://wa.me/6285173017749')
    expect(whatsappLink).toMatch(/^https:\/\/wa\.me\/\d+$/)
  })

  it('should have valid email information', () => {
    expect(emailAddress).toBe('core@memomancy.com')
    expect(emailLink).toBe('mailto:core@memomancy.com')
    expect(emailAddress).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('should have correct social media handles', () => {
    expect(instagramName).toBe('@memomancy')
    expect(tiktokName).toBe('@memomancy')
    expect(facebookName).toBe('Memomancy')
    expect(youtubeName).toBe('Memomancy')
  })

  it('should have valid social media links', () => {
    expect(instagramLink).toBe('https://instagram.com/memomancy')
    expect(tiktokLink).toBe('https://tiktok.com/@memomancy')
    expect(facebookLink).toBe('https://facebook.com/memomancy')
    expect(youtubeLink).toBe('https://youtube.com/@memomancy')
  })

  it('should have address information', () => {
    expect(address).toBeTruthy()
    expect(typeof address).toBe('string')
    expect(address).toContain('Jawa Timur')
  })

  it('should have social media stats with correct structure', () => {
    expect(socialMediaStats).toBeDefined()
    expect(socialMediaStats.instagram).toEqual({
      followers: '2.5K',
      metric: 'Followers'
    })
    expect(socialMediaStats.tiktok).toEqual({
      followers: '5.8K',
      metric: 'Followers'
    })
    expect(socialMediaStats.facebook).toEqual({
      followers: '1.2K',
      metric: 'Likes'
    })
    expect(socialMediaStats.youtube).toEqual({
      followers: '950',
      metric: 'Subscribers'
    })
  })

  it('should have all social platforms in stats', () => {
    const platforms = Object.keys(socialMediaStats)
    expect(platforms).toContain('instagram')
    expect(platforms).toContain('tiktok')
    expect(platforms).toContain('facebook')
    expect(platforms).toContain('youtube')
    expect(platforms).toHaveLength(4)
  })
})