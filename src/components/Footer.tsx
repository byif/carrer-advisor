import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Carrer Advisor</h3>
            <p className="text-gray-400">
              Helping students navigate their tech career journey with confidence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#careers" className="hover:text-white">Careers</a></li>
              <li><a href="#internships" className="hover:text-white">Internships</a></li>
              <li><a href="#resources" className="hover:text-white">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@AIcareerguide.com" className="hover:text-white">
                  contact@AIcareerguide.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" className="hover:text-indigo-400">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="hover:text-indigo-400">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="hover:text-indigo-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Developed by Navin Reddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;