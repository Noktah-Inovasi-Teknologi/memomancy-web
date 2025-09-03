import { describe, it, expect, beforeEach } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('/api/events', async () => {
  await setup({
    // test context options
  })

  const mockEventData = {
    name: 'Test Event',
    description: 'Test Event Description',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-02'),
    location: 'Test Location',
    eventType: 'Conference',
    outdoor: 'Indoor',
    capacity: 100,
    region: 'surabaya',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Helper function to create a File object from public images
  function createFileFromPublicImage(imageName: string): File {
    const imagePath = join(process.cwd(), 'public', 'images', `${imageName}.png`)
    const imageBuffer = readFileSync(imagePath)
    const uint8Array = new Uint8Array(imageBuffer)
    return new File([uint8Array], `${imageName}.png`, { type: 'image/png' })
  }

  describe('POST /api/events', () => {
    it('should create event without media files', async () => {
      const formData = new FormData()
      
      // Add event data
      formData.append('name', mockEventData.name)
      formData.append('description', mockEventData.description)
      formData.append('startDate', mockEventData.startDate.toISOString())
      formData.append('endDate', mockEventData.endDate.toISOString())
      formData.append('location', mockEventData.location)
      formData.append('eventType', mockEventData.eventType)
      formData.append('outdoor', mockEventData.outdoor)
      formData.append('capacity', mockEventData.capacity.toString())
      formData.append('region', mockEventData.region)
      formData.append('createdAt', mockEventData.createdAt.toISOString())
      formData.append('updatedAt', mockEventData.updatedAt.toISOString())

      const response = await $fetch('/api/events', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.eventId).toBeDefined()
      expect(response.message).toBe('Event created successfully with media')
      expect(response.mediaCount).toBe(0)
      expect(response.uploadedFiles).toHaveLength(0)
    })

    it('should create event with single media file', async () => {
      const formData = new FormData()
      
      // Add event data
      formData.append('name', mockEventData.name + ' - Single Media')
      formData.append('description', mockEventData.description)
      formData.append('startDate', mockEventData.startDate.toISOString())
      formData.append('endDate', mockEventData.endDate.toISOString())
      formData.append('location', mockEventData.location)
      formData.append('eventType', mockEventData.eventType)
      formData.append('outdoor', mockEventData.outdoor)
      formData.append('capacity', mockEventData.capacity.toString())
      formData.append('region', mockEventData.region)
      formData.append('createdAt', mockEventData.createdAt.toISOString())
      formData.append('updatedAt', mockEventData.updatedAt.toISOString())

      // Add a single test image
      const testFile = createFileFromPublicImage('x1')
      formData.append('media_0', testFile)

      const response = await $fetch('/api/events', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.eventId).toBeDefined()
      expect(response.mediaCount).toBe(1)
      expect(response.uploadedFiles).toHaveLength(1)
      expect(response.uploadedFiles[0]).toHaveProperty('pathname')
      expect(response.uploadedFiles[0]).toHaveProperty('contentType')
    })

    it('should create event with multiple media files', async () => {
      const formData = new FormData()
      
      // Add event data
      formData.append('name', mockEventData.name + ' - Multiple Media')
      formData.append('description', mockEventData.description)
      formData.append('startDate', mockEventData.startDate.toISOString())
      formData.append('endDate', mockEventData.endDate.toISOString())
      formData.append('location', mockEventData.location)
      formData.append('eventType', mockEventData.eventType)
      formData.append('outdoor', mockEventData.outdoor)
      formData.append('capacity', mockEventData.capacity.toString())
      formData.append('region', mockEventData.region)
      formData.append('createdAt', mockEventData.createdAt.toISOString())
      formData.append('updatedAt', mockEventData.updatedAt.toISOString())

      // Add multiple test images (x2, x3, x4)
      const testFiles = ['x2', 'x3', 'x4'].map(createFileFromPublicImage)
      testFiles.forEach((file, index) => {
        formData.append(`media_${index}`, file)
      })

      const response = await $fetch('/api/events', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.eventId).toBeDefined()
      expect(response.mediaCount).toBe(3)
      expect(response.uploadedFiles).toHaveLength(3)
      
      response.uploadedFiles.forEach((file: any) => {
        expect(file).toHaveProperty('pathname')
        expect(file).toHaveProperty('contentType', 'image/png')
        expect(file).toHaveProperty('id')
      })
    })

    it('should fail when missing required fields', async () => {
      const formData = new FormData()
      formData.append('name', 'Test Event')
      // Missing other required fields

      try {
        await $fetch('/api/events', {
          method: 'POST',
          body: formData
        })
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.statusCode).toBe(400)
        expect(error.statusMessage).toMatch(/Missing required field/)
      }
    })

    it('should handle empty form data', async () => {
      try {
        await $fetch('/api/events', {
          method: 'POST',
          body: null
        })
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.statusCode).toBe(400)
        expect(error.statusMessage).toBe('No form data received')
      }
    })
  })

  describe('GET /api/events', () => {
    let createdEventId: number

    beforeEach(async () => {
      // Create a test event with media for GET tests
      const formData = new FormData()
      formData.append('name', mockEventData.name + ' - For GET Test')
      formData.append('description', mockEventData.description)
      formData.append('startDate', mockEventData.startDate.toISOString())
      formData.append('endDate', mockEventData.endDate.toISOString())
      formData.append('location', mockEventData.location)
      formData.append('eventType', mockEventData.eventType)
      formData.append('outdoor', mockEventData.outdoor)
      formData.append('capacity', mockEventData.capacity.toString())
      formData.append('region', mockEventData.region)
      formData.append('createdAt', mockEventData.createdAt.toISOString())
      formData.append('updatedAt', mockEventData.updatedAt.toISOString())

      // Add test images x5 and x6
      const testFiles = ['x5', 'x6'].map(createFileFromPublicImage)
      testFiles.forEach((file, index) => {
        formData.append(`media_${index}`, file)
      })

      const createResponse = await $fetch('/api/events', {
        method: 'POST',
        body: formData
      })
      createdEventId = createResponse.eventId
    })

    it('should get all events', async () => {
      const response = await $fetch('/api/events', {
        method: 'GET'
      })

      expect(response.status).toBe(200)
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.count).toBeGreaterThan(0)
      
      // Check that events have mediaCount property
      if (response.data.length > 0) {
        expect(response.data[0]).toHaveProperty('mediaCount')
      }
    })

    it('should get specific event by id with media files', async () => {
      const response = await $fetch('/api/events', {
        method: 'GET',
        query: { id: createdEventId }
      })

      expect(response.status).toBe(200)
      expect(response.data).toBeDefined()
      expect(response.data.id).toBe(createdEventId)
      expect(response.data.name).toContain('For GET Test')
      expect(response.data.mediaFiles).toBeDefined()
      expect(Array.isArray(response.data.mediaFiles)).toBe(true)
      expect(response.data.mediaFiles).toHaveLength(2) // x5 and x6
      
      // Check media file properties
      response.data.mediaFiles.forEach((media: any) => {
        expect(media).toHaveProperty('id')
        expect(media).toHaveProperty('blobPath')
        expect(media).toHaveProperty('type')
        expect(media).toHaveProperty('eventId', createdEventId)
      })
    })

    it('should return 404 for non-existent event', async () => {
      try {
        await $fetch('/api/events', {
          method: 'GET',
          query: { id: 99999 }
        })
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.statusCode).toBe(404)
        expect(error.statusMessage).toBe('Event not found')
      }
    })
  })
})