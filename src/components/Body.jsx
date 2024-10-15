import React, { useState } from "react";
import Footer from "./Footer";
import './Body.css'
import { TfiLock } from "react-icons/tfi";
import { FiEyeOff } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const Body = () => {
  const [toggleTheme, setToggleTheme] = useState(false);

  const handleToggle = () => {
    setToggleTheme(!toggleTheme); // Toggle the theme
  };

  return (
    // <div className={`font-sora ${toggleTheme ? "bg-custom-blue text-white" : "bg-white text-black"}`}>
    <div className="bg-white text-custom-blue" >
      <button className="dark-mode-toggle" onClick={handleToggle}>
        {toggleTheme ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
      </button>

      <div class="container">
        <div class="contain1">
          <div class="header">
            Welcome to <br />
            Mirage
          </div>
          <div class="description">
            Experience privacy at its core. Mirage is a privacy-based chat app
            that makes sure your conversations stay secure and encrypted.
          </div>

          <a
            href="LoginPage.html"
            class="cta-button"
          >Get Started</a
          >
          <a href="#" class="cta-button" onclick="openModal()"
          >See How Mirage Works</a
          >
        </div>
        <div>
          <div class="contributors">
            <div class="contributors-text">
              Thanks to the people who worked on this project :)
            </div>
            <div class="contributors-images">
              <a href="https://github.com/korrykatti/mirage/graphs/contributors">
                <img
                  src="https://contrib.rocks/image?repo=korrykatti/mirage"
                  alt="Mirage Contributors"
                />
              </a>
            </div>
            <div class="contributors-images1">
              <a
                href="https://github.com/KorryKatti/Mirage-web/graphs/contributors"
              >
                <img
                  src="https://contrib.rocks/image?repo=KorryKatti/Mirage-web"
                  alt="Mirage-web Contributors"
                />
              </a>
            </div>
          </div>

          <div class="stats">
            <p>Daily Users: 1,234</p>
            <p>Today's Users: 456</p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center space-x-4 mt-8 font-semibold">
        <button className="bg-[#91264f] hover:bg-[#a63279] hover:-translate-y-1 hover:scale-110 delay-150 text-white py-2 px-4 rounded border-2 border-transparent hover:border-white transition-all duration-300 ease-in-out">
          Get started
        </button>
        <button className="bg-[#cf8ba9] hover:bg-[#ebc5e4] hover:-translate-y-1 hover:scale-110 delay-150 text-black py-2 px-4 rounded border-2 border-transparent hover:border-black transition-all duration-300 ease-in-out">
          How it works?
        </button>
      </div>

      <div className="mt-12 mx-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#2A2D47] p-3 rounded-lg shadow-lg text-white ">
          <h3 className="text-xl font-bold flex">
            Complete Security{" "}
            <span className="text-2xl m-1">
              <TfiLock />
            </span>
          </h3>
          <p className="ml-2">Every message is encrypted to protect your privacy.</p>
        </div>
        <div className="bg-[#2A2D47] p-3 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold flex">
            No Data Tracking{" "}
            <span className="text-2xl m-1">
              <FiEyeOff />
            </span>
          </h3>
          <p className="ml-2">
            We respect your personal space. Your data stays with you, always.
          </p>
        </div>
        <div className="bg-[#2A2D47] p-3 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold flex">
            Built for Trust{" "}
            <span className="text-2xl m-1">
              <FiShield />
            </span>{" "}
          </h3>
          <p className="ml-2">
            With Mirage, you can trust that your conversations remain
            confidential—no third parties, no breaches.
          </p>
        </div>
      </div> */}



      <hr />
      <Footer />
    </div>
  );
};

export default Body;
