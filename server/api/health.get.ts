export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const format = query.format || 'json';

    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'memomancy-web',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    if (format === 'simple') {
      return 'OK';
    }

    return {
      status: 200,
      data: healthData
    };
  } catch (error) {
    console.error('Health check error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Health check failed'
    });
  }
});