import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
import CountUp from "react-countup";

import Footer from "./Footer";
import { TfiLock } from "react-icons/tfi";

import { FiEyeOff, FiShield } from "react-icons/fi";

import { FiEyeOff } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { io } from 'socket.io-client';
import CountUp from 'react-countup';


const Body = ({ toggleTheme, handleToggle }) => { // Receive toggleTheme and handleToggle as props
  const [dailyUsersCount, setDailyUsersCount] = useState(0);
  const [todaysUserCount, setTodaysUsersCount] = useState(0);

  useEffect(() => {

    const socket = io("https://mirage-o081.onrender.com/");

    socket.on("connect", () => {

    const socket = io('https://mirage-o081.onrender.com/');
    
    socket.on('connect', () => {
      // console.log('Successfully connected to Mirage test net server!', socket.id);


      // Get metrics once connected to server
      socket.emit("get_metrics");


      // Update daily users count and today's users count states
      socket.on("metrics", (data) => {

      // Update daily users count and todays users count states
      socket.on('metrics', (data) => {
        // console.log(data);

        setDailyUsersCount(data.total);
        setTodaysUsersCount(data.today);
      })
    })

    // Close socket connection
    return () => socket.disconnect();
  }, []);



  return (
    <div className={`font-sora ${toggleTheme ? "bg-custom-blue text-white" : "bg-white text-custom-blue"}`}>
      <div className="container">
        <div className="contain1">
          <button className="dark-mode-toggle" onClick={handleToggle}>
            {toggleTheme ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
          </button>
          <div className="header">
            Welcome to <br />

  return (
    <div className="bg-gradient-to-b from-[#4e5279] via-[#ebc5e4] to-[#cf8ba9]">
      <div className="flex justify-between -mb-4">
        <div className="m-5 p-3">
          <h1
            className="text-5xl font-manrope font-[600] mb-1"
            style={{ color: "rgba(255, 255, 245, 0.86)" }}
          >

            Mirage
          </h1>
          <h2
            className="text-2xl font-inter font-[600] mb-1"
            style={{ color: "rgba(255, 255, 245, 0.86)" }}
          >
            Your Conversations, Your Privacy. Secured.
          </h2>
          <div className="container p-2 w-2/3">
            <p
              className="text-xl font-inter font-[500]"
              style={{ color: "rgba(255, 255, 245, 0.86)" }}
            >
              At Mirage, privacy is not just a feature; it's our foundation. We
              are dedicated to safeguarding your personal conversations with
              end-to-end encryption, ensuring that only you and your chosen
              recipients have access to your messages.
            </p>
          </div>
        </div>

        <div className="mt-24 mr-10 py-5 px-8 mb-32 bg-[#2A2D47] rounded-xl shadow-md text-center font-semibold text-white w-1/3">
          <div className="">
            <h2>Daily Users: <CountUp start={0} end={dailyUsersCount}></CountUp></h2>
            <h2>Today's Users: <CountUp start={0} end={todaysUserCount}></CountUp></h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8 font-semibold">
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
      </div>

      <hr className="my-12" />
      <div className="">
        <div className="text-center font-inter font-[600]">
          <div className="flex justify-center">
            <img
              className="text-center"
              src="https://vite.dev/heart.svg"
              alt="heart"
            />
          </div>

          <p className="text-xl">Free & open source</p>
          <div className="w-2/3 ml-52">
            <p className="text-md">
              Mirage is MIT Licensed and will always be free and open source.
              This is made possible by our contributors and these companies:
            </p>
          </div>
        </div>

        <div className="text-center text-lg font-inter font-[500]">
          Thanks to the people who worked on this project :)
        </div>

        <div className="flex justify-center space-x-4">
          <a href="https://github.com/korrykatti/mirage/graphs/contributors">
            <img
              src="https://contrib.rocks/image?repo=korrykatti/mirage"
              alt="Mirage Contributors"
            />
          </a>
          <a href="https://github.com/KorryKatti/Mirage-web/graphs/contributors">
            <img
              src="https://contrib.rocks/image?repo=KorryKatti/Mirage-web"
              alt="Mirage-web Contributors"
            />
          </a>
        </div>
      </div>

      <hr className="my-10" />
      <Footer />
    </div>
  );
};

export default Body;
