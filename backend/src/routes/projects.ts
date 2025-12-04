import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db/connection';
import { Project } from '../types';

/**
 * GET /api/projects
 * Fetch all projects from the database
 */
export async function getProjects(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const result = await db.query(
      'SELECT id, title, description, tech_stack, link FROM projects ORDER BY created_at DESC'
    );

    // Transform database results to match frontend expected format
    const projects: Project[] = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      techStack: row.tech_stack,
      link: row.link,
    }));

    reply.code(200).send(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    reply.code(500).send({
      error: 'Failed to fetch projects',
      message: 'An error occurred while retrieving projects from the database',
    });
  }
}
