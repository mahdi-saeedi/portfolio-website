import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * Home page with hero section
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I'm{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  Mahdi Saeedi
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                Full-Stack Developer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                I'm passionate about building innovative web applications with modern technologies.
                Specialized in React, TypeScript, Node.js, and cloud solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/projects">
                  <Button size="lg">
                    View My Work
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Mahdi Saeedi"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400 dark:bg-primary-600 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 dark:bg-blue-600 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                5+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Years Experience
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Projects Completed
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                20+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Core Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
              <div
                key={tech}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-center"
              >
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
