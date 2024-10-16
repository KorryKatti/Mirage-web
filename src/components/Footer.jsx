import React from 'react';
import { BsTwitterX, BsGithub } from "react-icons/bs";
import { WiCloudUp } from "react-icons/wi";

const Footer = () => {
  return (
    <div className="  text-custom-blue p-6 rounded-lg shadow-lg mt-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col items-center mb-4 md:mb-0">
      <svg 
          className="text-center mb-2" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="50" 
          height="50" 
          fill="rgb(255, 71, 126)" // Heart color
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <p className="text-xl font-bold  sm:text-lg">Free & Open Source</p>

      </div>

      <div className="flex flex-col md:flex-row md:text-sm items-center space-y-2 md:space-y-0 md:space-x-6">
        <a 
          href="https://x.com/dunkelkron" 
          className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition duration-300"
        >
          <BsTwitterX className="text-xl md:sm" />
          <span>x.com/dunkelkron</span>
        </a>
        <span className="text-gray-500 hidden md:block">|</span>
        <a 
          href="https://github.com/korrykatti" 
          className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition duration-300"
        >
          <BsGithub className="text-xl" />
          <span>github.com/korrykatti</span>
        </a>
        <span className="text-gray-500 hidden md:block">|</span>
        <a 
          href="https://korrykatti.github.io" 
          className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition duration-300"
        >
          <WiCloudUp className="text-xl" />
          <span>korrykatti.github.io</span>
        </a>
      </div>

      <div className="text-gray-400 mt-4 md:mt-0 text-center md:text-right sm:text-xs">
        Mirage is open source under the
        <a
          href="https://github.com/korrykatti/mirage/blob/main/LICENSE"
          className="text-blue-300 hover:underline ml-1 transition duration-300"
        >
          MIT license
        </a>.
      </div>
    </div>
  );
};

export default Footer;
