import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db/connection';
import { ContactFormData } from '../types';

/**
 * POST /api/contact
 * Submit a contact form message
 */
export async function submitContact(
  request: FastifyRequest<{ Body: ContactFormData }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { name, email, message } = request.body;
    console.log('Contact form data received:', { name, email, messageLength: message?.length });

    // Validate required fields
    if (!name || !email || !message) {
      reply.code(400).send({
        error: 'Validation error',
        message: 'Name, email, and message are required fields',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      reply.code(400).send({
        error: 'Validation error',
        message: 'Invalid email format',
      });
      return;
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 255) {
      reply.code(400).send({
        error: 'Validation error',
        message: 'Name must be between 2 and 255 characters',
      });
      return;
    }

    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 5000) {
      reply.code(400).send({
        error: 'Validation error',
        message: 'Message must be between 10 and 5000 characters',
      });
      return;
    }

    // Insert message into database
    await db.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name.trim(), email.trim(), message.trim()]
    );

    reply.code(201).send({
      success: true,
      message: 'Message received successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    reply.code(500).send({
      error: 'Server error',
      message: 'An error occurred while processing your message',
    });
  }
}
