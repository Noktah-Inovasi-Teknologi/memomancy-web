import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('/api/media', async () => {
  await setup({
    // test context options
  })

  // Helper function to create a File object from public images
  function createFileFromPublicImage(imageName: string): File {
    const imagePath = join(process.cwd(), 'public', 'images', `${imageName}.png`)
    const imageBuffer = readFileSync(imagePath)
    const uint8Array = new Uint8Array(imageBuffer)
    return new File([uint8Array], `${imageName}.png`, { type: 'image/png' })
  }

  describe('POST /api/media', () => {
    it('should upload single media file', async () => {
      const formData = new FormData()
      const testFile = createFileFromPublicImage('x7')
      formData.append('uploadMedia[]', testFile)

      const response = await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.message).toBe('Files uploaded successfully')
      expect(response.files).toHaveLength(1)
      
      const uploadedFile = response.files[0]
      expect(uploadedFile).toHaveProperty('pathname')
      expect(uploadedFile).toHaveProperty('contentType', 'image/png')
      expect(uploadedFile.pathname).toMatch(/^media\//)
    })

    it('should upload multiple media files', async () => {
      const formData = new FormData()
      
      // Upload x8, x9, x10
      const testFiles = ['x8', 'x9', 'x10'].map(createFileFromPublicImage)
      testFiles.forEach(file => {
        formData.append('uploadMedia[]', file)
      })

      const response = await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.message).toBe('Files uploaded successfully')
      expect(response.files).toHaveLength(3)
      
      response.files.forEach((file: any) => {
        expect(file).toHaveProperty('pathname')
        expect(file).toHaveProperty('contentType', 'image/png')
        expect(file.pathname).toMatch(/^media\//)
      })
    })

    it('should handle mixed file types', async () => {
      const formData = new FormData()
      
      // Create different "file types" by using different images
      const jpegFile = new File([new Uint8Array(readFileSync(join(process.cwd(), 'public', 'images', 'x11.png')))], 'test.jpg', { type: 'image/jpeg' })
      const pngFile = createFileFromPublicImage('x12')
      
      formData.append('uploadMedia[]', jpegFile)
      formData.append('uploadMedia[]', pngFile)

      const response = await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.files).toHaveLength(2)
      
      // Should handle different content types
      const contentTypes = response.files.map((file: any) => file.contentType)
      expect(contentTypes).toContain('image/jpeg')
      expect(contentTypes).toContain('image/png')
    })

    it('should return error when no files uploaded', async () => {
      const formData = new FormData()
      // No files added

      const response = await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(400)
      expect(response.message).toBe('No files uploaded')
    })

    it('should return error when form data is empty', async () => {
      try {
        await $fetch('/api/media', {
          method: 'POST',
          body: null
        })
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.statusCode).toBe(400)
      }
    })

    it('should handle large number of files', async () => {
      const formData = new FormData()
      
      // Upload all available test images (x1 to x13)
      const imageNumbers = Array.from({ length: 13 }, (_, i) => i + 1)
      const testFiles = imageNumbers.map(num => createFileFromPublicImage(`x${num}`))
      
      testFiles.forEach(file => {
        formData.append('uploadMedia[]', file)
      })

      const response = await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      expect(response.status).toBe(200)
      expect(response.message).toBe('Files uploaded successfully')
      expect(response.files).toHaveLength(13)
      
      // Verify all files were processed
      response.files.forEach((file: any, index: number) => {
        expect(file).toHaveProperty('pathname')
        expect(file).toHaveProperty('contentType', 'image/png')
        expect(file.pathname).toMatch(/^media\//)
      })
    })
  })

  describe('GET /api/media', () => {
    it('should get all media files', async () => {
      // First upload some test files
      const formData = new FormData()
      const testFile = createFileFromPublicImage('x13')
      formData.append('uploadMedia[]', testFile)

      await $fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      // Now test GET endpoint
      const response = await $fetch('/api/media', {
        method: 'GET'
      })

      expect(Array.isArray(response)).toBe(true)
      expect(response.length).toBeGreaterThan(0)
      
      // Check structure of media objects
      if (response.length > 0) {
        const mediaItem = response[0]
        expect(mediaItem).toHaveProperty('id')
        expect(mediaItem).toHaveProperty('name')
        expect(mediaItem).toHaveProperty('type')
        expect(mediaItem).toHaveProperty('blobPath')
        expect(mediaItem).toHaveProperty('createdAt')
      }
    })
  })
})