import React from 'react';
import { BsTwitterX, BsGithub } from "react-icons/bs";
import { WiCloudUp } from "react-icons/wi";

const Footer = () => {
  return (
    <div className="footer text-center py-2 mt-4">
      <div className="space-y-2">
      <div className="flex flex-col md:flex-row justify-center space-x-4">
          <a href="https://x.com/dunkelkron" className="flex items-center space-x-2 text-gray-800">
            <BsTwitterX />
            <span>x.com/dunkelkron</span>
          </a>
          <span>|</span>
          <a href="https://github.com/korrykatti" className="flex items-center space-x-2 text-gray-800">
            <BsGithub />
            <span>github.com/korrykatti</span>
          </a>
          <span>|</span>
          <a href="https://korrykatti.github.io" className="flex items-center space-x-2 text-gray-700">
            <WiCloudUp />
            <span>korrykatti.github.io</span>
          </a>
        </div>
        
        <div className="text-gray-600">
          Mirage is open source under the
          <a
            href="https://github.com/korrykatti/mirage/blob/main/LICENSE"
            className="text-blue-900 hover:underline ml-1"
          >
            MIT license
          </a>.
        </div>
      </div>
    </div>
  );
};

export default Footer;
