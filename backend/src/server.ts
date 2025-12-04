import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import { db } from './db/connection';
import { getProjects } from './routes/projects';
import { submitContact } from './routes/contact';

// Load environment variables
dotenv.config();

const PORT = parseInt(process.env.PORT || '3000');
const HOST = '0.0.0.0';

/**
 * Create and configure Fastify server
 */
async function createServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });

  // Register CORS plugin
  await server.register(cors, {
    origin: true, // Allow all origins in development (configure for production)
    credentials: true,
  });

  // Health check endpoint
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // API Routes
  server.get('/api/projects', getProjects);
  server.post('/api/contact', submitContact);

  // 404 handler
  server.setNotFoundHandler((request, reply) => {
    reply.code(404).send({
      error: 'Not Found',
      message: 'The requested resource does not exist',
      path: request.url,
    });
  });

  // Global error handler
  server.setErrorHandler((error, request, reply) => {
    server.log.error(request.raw.url);
    server.log.error(error);
    reply.code(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  });

  return server;
}

/**
 * Start the server
 */
async function start() {
  try {
    // Test database connection
    const dbConnected = await db.testConnection();
    if (!dbConnected) {
      throw new Error('Failed to connect to database');
    }

    // Create and start server
    const server = await createServer();
    await server.listen({ port: PORT, host: HOST });

    console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🚀 Server running successfully!            ║
║                                               ║
║   📍 URL: http://localhost:${PORT}            ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}           ║
║   📊 Health check: http://localhost:${PORT}/health
║                                               ║
╚═══════════════════════════════════════════════╝
    `);

    // Graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        console.log(`\n${signal} received, shutting down gracefully...`);
        try {
          await server.close();
          await db.close();
          console.log('✅ Server closed successfully');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
start();
