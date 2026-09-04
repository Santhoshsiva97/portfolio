import React from 'react';
import { Github, Mail, Code2, Server, Database, Briefcase, GraduationCap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SS.</h1>
          <div className="flex gap-8 text-sm font-bold text-gray-600">
            <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-start gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            Santhosh Sivakumar {/*[cite: 1] */}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
            Software Engineer II {/*[cite: 1] */}
          </h2>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl font-medium">
          7+ years of experience in software development and product lifecycle maintenance. {/*[cite: 1] */} Handled multiple roles like Full stack, Frontend, and backend engineer across scalable projects. {/*[cite: 1] */} Highly adaptable, eager to learn, and passionate about delivering disruptive products. {/*[cite: 1] */}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="mailto:santhoshsiva2409@gmail.com" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold">
            <Mail size={20} /> Contact Me {/*[cite: 1] */}
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 transition-all font-semibold shadow-sm">
            <Github size={20} /> GitHub Profile
          </a>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-black mb-12 text-center text-gray-900">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow bg-slate-50">
              <Code2 className="text-blue-600 mb-6" size={40} />
              <h4 className="text-xl font-bold mb-4 text-gray-900">Frontend</h4>
              <ul className="text-gray-600 space-y-2 font-medium">
                <li>ReactJS & NextJS {/*[cite: 1] */}</li>
                <li>HTML5 & CSS3 {/*[cite: 1] */}</li>
              </ul>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow bg-slate-50">
              <Server className="text-indigo-600 mb-6" size={40} />
              <h4 className="text-xl font-bold mb-4 text-gray-900">Backend</h4>
              <ul className="text-gray-600 space-y-2 font-medium">
                <li>NodeJS & ExpressJS {/*[cite: 1] */}</li>
                <li>TypeScript & JavaScript {/*[cite: 1] */}</li>
                <li>Python {/*[cite: 1] */}</li>
              </ul>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow bg-slate-50">
              <Database className="text-emerald-600 mb-6" size={40} />
              <h4 className="text-xl font-bold mb-4 text-gray-900">Database & Cloud</h4>
              <ul className="text-gray-600 space-y-2 font-medium">
                <li>PostgreSQL & MongoDB {/*[cite: 1] */}</li>
                <li>GraphQL & SQL {/*[cite: 1] */}</li>
                <li>AWS & Heroku {/*[cite: 1] */}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-black mb-12 text-center text-gray-900">Professional Experience</h3>
          
          <div className="space-y-8">
            {/* Esko */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Switch Apps - Workflow Automation {/*[cite: 1] */}</h4>
                  <p className="text-blue-600 font-bold text-lg mt-1 flex items-center gap-2">
                    <Briefcase size={18}/> Software Engineer II @ Esko R&D {/*[cite: 1] */}
                  </p>
                </div>
                <span className="text-gray-600 font-bold bg-slate-100 px-4 py-2 rounded-xl text-sm">May 2023 - Present {/*[cite: 1] */}</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-gray-600 space-y-3 mb-8 leading-relaxed font-medium">
                <li>Designed and maintained automated workflows enhancing production efficiency and reducing manual intervention by 60%. {/*[cite: 1] */}</li>
                <li>Built/migrated over 50+ apps in the Appstore and managed lifecycle releases on time. {/*[cite: 1] */}</li>
                <li>Engineered intelligent prepress tasks including file validation, preflight, webhooks, and RESTful APIs. {/*[cite: 1] */}</li>
                <li>Reduced job onboarding time from 45 minutes to under 10 minutes. {/*[cite: 1] */}</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                {['NodeJS', 'TypeScript', 'AWS', 'Jenkins', 'GitHub'].map(tech => (
                  <span key={tech} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">{tech}</span>
                ))}
              </div>
            </div>

            {/* Softsquare 1 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Johnson Controls - Contract App {/*[cite: 1] */}</h4>
                  <p className="text-blue-600 font-bold text-lg mt-1 flex items-center gap-2">
                    <Briefcase size={18}/> Software Engineer @ Softsquare {/*[cite: 1] */}
                  </p>
                </div>
                <span className="text-gray-600 font-bold bg-slate-100 px-4 py-2 rounded-xl text-sm">June 2019 - April 2023 {/*[cite: 1] */}</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-gray-600 space-y-3 mb-8 leading-relaxed font-medium">
                <li>Contributed to a large scale business application for contract creation, pricing, booking, and approvals. {/*[cite: 1] */}</li>
                <li>Built highly scalable apps and optimized responsive UI using React.js and GraphQL. {/*[cite: 1] */}</li>
                <li>Developed server-side logic, managed MVC structure, and handled PostgreSQL DB maintenance. {/*[cite: 1] */}</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                {['ReactJS', 'GraphQL', 'NodeJS', 'PostgreSQL', 'Heroku'].map(tech => (
                  <span key={tech} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100">{tech}</span>
                ))}
              </div>
            </div>
            
            {/* Softsquare 2 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-gray-900">Examination Portal {/*[cite: 1] */}</h4>
                <p className="text-blue-600 font-bold text-lg mt-1 flex items-center gap-2">
                  <Briefcase size={18}/> Software Engineer @ Softsquare {/*[cite: 1] */}
                </p>
              </div>
              <ul className="list-disc list-outside ml-5 text-gray-600 space-y-3 mb-8 leading-relaxed font-medium">
                <li>Built a full stack application containing Candidate and Admin portals for modern recruitment. {/*[cite: 1] */}</li>
                <li>Developed generic higher order components and scalable responsive web pages. {/*[cite: 1] */}</li>
                <li>Managed server logic, MVC architecture, Jira ticketing, and CI/CD workflows. {/*[cite: 1] */}</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                {['ReactJS', 'NodeJS', 'SQL', 'Express', 'Git'].map(tech => (
                  <span key={tech} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education */}
      <section className="bg-white py-20 border-t border-gray-100">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-black mb-8 flex items-center justify-center gap-3 text-gray-900">
              <GraduationCap size={32} className="text-blue-600" /> Education Background
            </h3>
            <div className="inline-block text-left bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100">
              <p className="text-xl font-bold text-gray-900">Bachelor of Engineering (Electronics and Communication) {/*[cite: 1] */}</p>
              <p className="text-gray-600 font-medium mt-2">KIOT, Tamil Nadu — Graduated May 2015 {/*[cite: 1] */}</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-black mb-6">Ready to collaborate?</h3>
          <p className="text-slate-400 mb-10 text-lg">Currently available for full-time roles and freelance projects. Let's build something scalable and disruptive.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg font-medium">
            <a href="mailto:santhoshsiva2409@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Mail size={24}/> santhoshsiva2409@gmail.com {/*[cite: 1] */}
            </a>
            <span className="hidden md:block text-slate-700">|</span>
            <p className="flex items-center gap-2 text-slate-300">
              +91 7010736585 {/*[cite: 1] */}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}