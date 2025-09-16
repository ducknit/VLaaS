// src/LandingPage.jsx

import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// All Icon components are now fully defined
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
);

// The component name is LandingPage and it accepts a `setUser` prop
const LandingPage = ({ setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Define the login handler using the hook
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info using the access token
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        // Set the user state in the parent App component
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    },
    onError: () => {
      console.error('Login Failed');
    },
  });

  // techStack and navLinks data restored
  const techStack = [
    { name: 'React', logo: 'https://placehold.co/100x40/282c34/61dafb?text=React' },
    { name: 'Node.js', logo: 'https://placehold.co/100x40/333333/8cc84b?text=Node.js' },
    { name: 'Docker', logo: 'https://placehold.co/100x40/0db7ed/ffffff?text=Docker' },
    { name: 'Firebase', logo: 'https://placehold.co/100x40/ffca28/000000?text=Firebase' },
    { name: 'AWS', logo: 'https://placehold.co/100x40/232f3e/ff9900?text=AWS' },
    { name: 'MongoDB', logo: 'https://placehold.co/100x40/47a248/ffffff?text=MongoDB' },
  ];

  const navLinks = ['Features', 'How It Works', 'Pricing', 'Contact'];

  return (
    <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-normal">
      {/* Header */}
      <header className="fixed w-full z-30 top-0 text-white bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="flex-shrink-0 mr-4">
              <a href="#_self" className="flex items-center">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                <span className="ml-3 text-2xl font-bold tracking-wider">VLaaS</span>
              </a>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-end flex-wrap items-center">
                {navLinks.map(link => (
                    <li key={link}><a href="#_self" className="font-medium text-gray-400 hover:text-indigo-400 px-5 py-3 flex items-center transition duration-150 ease-in-out">{link}</a></li>
                ))}
                <li>
                  <button
                    onClick={() => login()}
                    className="ml-3 inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign Up / Sign In
                  </button>
                </li>
              </ul>
            </nav>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <a key={link} href="#_self" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{link}</a>
              ))}
            </div>
             <div className="px-5 pb-3">
              <button
                onClick={() => login()}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up / Sign In
              </button>
             </div>
          </div>
        )}
      </header>

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
          <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20 pb-12 md:pt-32 md:pb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">Virtual Labs,</span> Real Skills.
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-400 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                An isolated, browser-based platform for programming labs. Zero setup, instant execution, and automated grading for the modern student and instructor.
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <a href="#_self" className="w-full sm:w-auto mb-4 sm:mb-0 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started Free
                </a>
                <a href="#_self" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-full text-white bg-gray-800 hover:bg-gray-700">
                  Request a Demo
                </a>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto mt-16 md:mt-20" data-aos="fade-up">
              <div className="relative bg-gray-800 rounded-2xl shadow-2xl p-2">
                 <div className="absolute top-2 left-2 flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <img src="https://placehold.co/1200x600/1f2937/9ca3af?text=//+In-browser+Code+Editor+Snapshot" alt="VLaaS Platform" className="w-full h-auto object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-800 py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white">The All-in-One Lab Solution</h2>
              <p className="text-lg text-gray-400 mt-2">Everything you need to run programming labs efficiently and securely.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 bg-opacity-20 mb-4">
                  <CodeIcon />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Student Portal</h3>
                <p className="text-gray-400">In-browser code editor with instant execution, debugging tools, and auto-grading feedback.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 bg-opacity-20 mb-4">
                  <DashboardIcon />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Instructor Dashboard</h3>
                <p className="text-gray-400">Upload lab sheets, define test cases, and monitor student progress in real-time.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 bg-opacity-20 mb-4">
                  <SecurityIcon />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Secure Execution</h3>
                <p className="text-gray-400">Each submission runs in a sandboxed Docker container, ensuring security and isolation.</p>
              </div>
               {/* Feature 4 */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 bg-opacity-20 mb-4">
                  <CloudIcon />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Cloud Integrated</h3>
                <p className="text-gray-400">Leverages scalable cloud infrastructure for reliability and performance on demand.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-12">
                   <h2 className="text-4xl font-extrabold text-white">Powered by Modern Technology</h2>
                   <p className="text-lg text-gray-400 mt-2">We use a robust, industry-standard tech stack you can trust.</p>
                 </div>
                 <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                     {techStack.map(tech => (
                         <div key={tech.name} className="flex items-center p-4 rounded-lg">
                             <img src={tech.logo} alt={tech.name} className="h-10 grayscale hover:grayscale-0 transition-all duration-300" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/100x40/374151/9ca3af?text=${tech.name}`}}/>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-indigo-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Revolutionize Your Labs?</h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
              Eliminate setup hassles and empower your students with a seamless coding experience. Join the future of programming education today.
            </p>
            <a href="#_self" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-gray-100">
              Start Your Free Trial
            </a>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center md:order-2">
                    {/* Social links can be added here */}
                </div>
                <div className="mt-8 md:mt-0 md:order-1 text-sm text-gray-400 text-center">
                    &copy; 2025 VLaaS. All rights reserved.
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;