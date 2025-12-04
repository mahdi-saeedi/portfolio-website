import React from 'react';
import Card from '../components/Card';

/**
 * About page with skills and experience
 */
const About: React.FC = () => {
  // Skills data
  const skills = {
    frontend: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Next.js'],
    backend: ['Node.js', 'Express', 'Fastify', 'Python', 'Django', 'REST APIs', 'GraphQL', 'Microservices'],
    database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx', 'Linux'],
  };

  // Experience data
  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Company Inc.',
      period: '2021 - Present',
      description: 'Led development of cloud-based SaaS platform serving 10,000+ users. Built microservices architecture with React frontend and Node.js backend.',
      achievements: [
        'Reduced application load time by 60%',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Mentored 5 junior developers',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Solutions LLC',
      period: '2019 - 2021',
      description: 'Developed e-commerce platform with React and Node.js. Integrated payment gateways and implemented real-time inventory management.',
      achievements: [
        'Built RESTful APIs handling 1M+ requests daily',
        'Improved database query performance by 40%',
        'Implemented automated testing increasing code coverage to 85%',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'Startup Ventures',
      period: '2018 - 2019',
      description: 'Contributed to multiple web applications using modern JavaScript frameworks. Collaborated with designers to create responsive user interfaces.',
      achievements: [
        'Developed 15+ responsive web pages',
        'Participated in agile development processes',
        'Learned and applied best coding practices',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <div className="w-20 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with {new Date().getFullYear() - 2018}+ years of experience
            building scalable web applications. I love turning complex problems into simple,
            beautiful, and intuitive solutions.
          </p>
        </div>

        {/* Bio Section */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              My journey into software development began during my computer science studies,
              where I discovered my passion for creating solutions that make a real impact.
              Since then, I've had the privilege of working with startups, established companies,
              and everything in between.
            </p>
            <p>
              I specialize in building full-stack web applications using modern technologies
              like React, TypeScript, Node.js, and PostgreSQL. I'm particularly interested in
              creating scalable architectures, optimizing performance, and delivering exceptional
              user experiences.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open-source projects,
              writing technical blog posts, or exploring new technologies. I believe in
              continuous learning and staying updated with the latest industry trends.
            </p>
          </div>
        </Card>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Skills */}
            <Card>
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Backend Skills */}
            <Card>
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Database Skills */}
            <Card>
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Database & Storage
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.database.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* DevOps Skills */}
            <Card>
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                DevOps & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Work Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exp.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Key Achievements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
