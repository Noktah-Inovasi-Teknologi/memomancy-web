import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Health API Route', async () => {
  await setup({
    // test context is available in tests
  })

  it('should return health status with default format', async () => {
    const response = await $fetch('/api/health')
    
    expect(response).toHaveProperty('status', 200)
    expect(response).toHaveProperty('data')
    expect(response.data).toHaveProperty('status', 'ok')
    expect(response.data).toHaveProperty('service', 'memomancy-web')
    expect(response.data).toHaveProperty('version', '1.0.0')
    expect(response.data).toHaveProperty('timestamp')
    expect(response.data).toHaveProperty('uptime')
    expect(response.data).toHaveProperty('environment')
  })

  it('should return simple OK format when requested', async () => {
    const response = await $fetch('/api/health?format=simple')
    
    expect(response).toBe('OK')
  })

  it('should have valid timestamp format', async () => {
    const response = await $fetch('/api/health')
    
    const timestamp = response.data.timestamp
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    
    // Verify it's a valid date
    const date = new Date(timestamp)
    expect(date.getTime()).toBeGreaterThan(0)
  })

  it('should return numeric uptime', async () => {
    const response = await $fetch('/api/health')
    
    expect(typeof response.data.uptime).toBe('number')
    expect(response.data.uptime).toBeGreaterThanOrEqual(0)
  })

  it('should handle query parameters correctly', async () => {
    const jsonResponse = await $fetch('/api/health?format=json')
    const simpleResponse = await $fetch('/api/health?format=simple')
    
    expect(jsonResponse).toHaveProperty('data')
    expect(simpleResponse).toBe('OK')
  })
})