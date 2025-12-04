import { db } from './connection';

/**
 * Initialize database tables
 * This script creates the necessary tables if they don't exist
 */
async function initializeDatabase() {
  console.log('🚀 Starting database initialization...');

  try {
    // Create projects table
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT[] NOT NULL,
        link VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Projects table created');

    // Create messages table
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Messages table created');

    // Insert sample projects if table is empty
    const projectsCount = await db.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projectsCount.rows[0].count) === 0) {
      await db.query(`
        INSERT INTO projects (title, description, tech_stack, link)
        VALUES
          (
            'E-Commerce Platform',
            'A full-featured e-commerce platform with product management, shopping cart, and secure payment integration. Built with modern web technologies for optimal performance.',
            ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
            'https://github.com/example/ecommerce'
          ),
          (
            'Real-Time Chat Application',
            'A scalable real-time chat application with support for group chats, file sharing, and end-to-end encryption. Implemented WebSocket for instant messaging.',
            ARRAY['React', 'TypeScript', 'Socket.io', 'MongoDB', 'Redis'],
            'https://github.com/example/chat-app'
          ),
          (
            'Task Management System',
            'An intuitive project management tool with kanban boards, team collaboration features, and time tracking. Designed for agile development teams.',
            ARRAY['Next.js', 'Fastify', 'PostgreSQL', 'Tailwind CSS'],
            'https://github.com/example/task-manager'
          ),
          (
            'Social Media Analytics Dashboard',
            'A comprehensive analytics dashboard for social media metrics with data visualization, trend analysis, and automated reporting features.',
            ARRAY['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
            'https://github.com/example/analytics'
          ),
          (
            'Weather Forecast App',
            'A beautiful weather application with real-time forecasts, location-based services, and interactive weather maps. Responsive design for all devices.',
            ARRAY['React Native', 'TypeScript', 'OpenWeather API', 'Redux'],
            'https://github.com/example/weather-app'
          ),
          (
            'Blogging Platform',
            'A feature-rich blogging platform with markdown support, SEO optimization, and content management. Includes comment system and social sharing.',
            ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'AWS S3'],
            'https://github.com/example/blog-platform'
          );
      `);
      console.log('✅ Sample projects inserted');
    }

    console.log('🎉 Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
