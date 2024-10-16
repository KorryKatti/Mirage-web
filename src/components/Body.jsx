import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import CountUp from 'react-countup';
import Footer from "./Footer";
import './Body.css';
import { TfiLock } from "react-icons/tfi";
import { FiEyeOff, FiShield } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const Body = () => {
  const [dailyUsersCount, setDailyUsersCount] = useState(0);
  const [todaysUserCount, setTodaysUsersCount] = useState(0);
  
  useEffect(() => {
    const socket = io('https://mirage-o081.onrender.com/');
    
    socket.on('connect', () => {
      // Get metrics once connected to server
      socket.emit('get_metrics');

      // Update daily users count and today's users count states
      socket.on('metrics', (data) => {
        setDailyUsersCount(data.total);
        setTodaysUsersCount(data.today);
      });
    });

    // Close socket connection
    return () => socket.disconnect();
  }, []);

  const [toggleTheme, setToggleTheme] = useState(false);

  const handleToggle = () => {
    setToggleTheme(!toggleTheme); // Toggle the theme
  };

  return (
    <div className={`font-sora ${toggleTheme ? "bg-custom-blue text-white" : "bg-white text-custom-blue"}`}>
      <button className="dark-mode-toggle" onClick={handleToggle}>
        {toggleTheme ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
      </button>

      <div className="container">
        <div className="contain1">
          <div className="header">
            Welcome to <br />
            Mirage
          </div>
          <div className="description">
            Experience privacy at its core. Mirage is a privacy-based chat app
            that makes sure your conversations stay secure and encrypted.
          </div>

          <a href="LoginPage.html" className="cta-button">Get Started</a>
          <a href="#" className="cta-button" onClick={() => openModal()}>See How Mirage Works</a>
        </div>

        <div>
          <div className="contributors">
            <div className="contributors-text">
              Thanks to the people who worked on this project :)
            </div>
            <div className="contributors-images">
              <a href="https://github.com/korrykatti/mirage/graphs/contributors">
                <img
                  src="https://contrib.rocks/image?repo=korrykatti/mirage"
                  alt="Mirage Contributors"
                />
              </a>
            </div>
            <div className="contributors-images1">
              <a href="https://github.com/KorryKatti/Mirage-web/graphs/contributors">
                <img
                  src="https://contrib.rocks/image?repo=KorryKatti/Mirage-web"
                  alt="Mirage-web Contributors"
                />
              </a>
            </div>
          </div>

          <div className="stats">
            <h2>Daily Users: <CountUp start={0} end={dailyUsersCount}></CountUp></h2>
            <h2>Today's Users: <CountUp start={0} end={todaysUserCount}></CountUp></h2>
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



        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Body;
