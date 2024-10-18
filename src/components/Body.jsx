import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { TfiLock } from "react-icons/tfi";
import { FiEyeOff, FiShield } from "react-icons/fi";
import { io } from "socket.io-client";
import CountUp from "react-countup";

const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [dailyUsersCount, setDailyUsersCount] = useState(0);
  const [todaysUserCount, setTodaysUsersCount] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const socket = io("https://mirage-o081.onrender.com/");

    socket.on("connect", () => {
      socket.emit("get_metrics");
      socket.on("metrics", (data) => {
        setDailyUsersCount(data.total);
        setTodaysUsersCount(data.today);
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#4e5279] via-[#ebc5e4] to-[#cf8ba9] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-manrope font-[600] text-white">Mirage</h1>
          <h2 className="text-2xl font-inter font-[500] text-white">
            Your Conversations, Your Privacy. Secured.
          </h2>
          <div className="container p-2 w-2/3 ">
            <p className="text-xl font-inter font-[600] bg-gradient-to-r from-[#E7E7E7] to-[#C9C9C9] bg-clip-text text-transparent">
              At Mirage, privacy is not just a feature;
              <span className="block font-bold mt-2">it's our foundation.</span>
            </p>
            <p className="text-xl font-inter font-[600] mt-4 bg-gradient-to-r from-[#E7E7E7] to-[#C9C9C9] bg-clip-text text-transparent">
              We are dedicated to safeguarding your personal conversations with
              <span className="font-bold"> end-to-end encryption</span>,
              ensuring that only you and your chosen recipients have access to
              your messages.
            </p>
          </div>
        </div>

        {/* Daily Users Section */}
        <div className="mt-12 py-8 px-6 bg-[#2A2D47] font-manrope font-[600] rounded-lg shadow-lg text-center text-white w-1/4">
          <h2 className="text-2xl">
            Daily Users: <CountUp start={0} end={dailyUsersCount} />
          </h2>
          <h2 className="text-2xl mt-4">
            Today's Users: <CountUp start={0} end={todaysUserCount} />
          </h2>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex justify-center space-x-6 mt-8">
        <button className="bg-[#91264f] hover:bg-[#a63279] hover:scale-105 transition-transform text-white py-3 px-6 rounded-lg shadow-md font-semibold">
          Get Started
        </button>
        <button className="bg-[#cf8ba9] hover:bg-[#ebc5e4] hover:scale-105 transition-transform text-black py-3 px-6 rounded-lg shadow-md font-semibold"
        onClick={openModal}
        >
          How it works?
        </button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-8">
        {/* Feature 1 */}
        <div className="bg-[#2A2D47] p-6 rounded-lg shadow-lg text-white text-center space-y-4">
          <h3 className="text-2xl font-bold flex items-center justify-center">
            Complete Security <TfiLock className="ml-2 text-2xl" />
          </h3>
          <p>Every message is encrypted to protect your privacy.</p>
        </div>
        {/* Feature 2 */}
        <div className="bg-[#2A2D47] p-6 rounded-lg shadow-lg text-white text-center space-y-4">
          <h3 className="text-2xl font-bold flex items-center justify-center">
            No Data Tracking <FiEyeOff className="ml-2 text-2xl" />
          </h3>
          <p>
            We respect your personal space. Your data stays with you, always.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-[#2A2D47] p-6 rounded-lg shadow-lg text-white text-center space-y-4">
          <h3 className="text-2xl font-bold flex items-center justify-center">
            Built for Trust <FiShield className="ml-2 text-2xl" />
          </h3>
          <p>
            With Mirage, your conversations remain confidential—no third
            parties, no breaches.
          </p>
        </div>
      </div>

      <hr className="my-12" />

      {/* Open Source Section */}
      <div className="text-center  text-white space-y-6 font-inter font-[600] bg-gradient-to-r to-[grey] from-[black] bg-clip-text text-transparent">
        <div className="flex justify-center">
          <img className="w-12 rounded-2xl shadow-inner" src="https://vite.dev/heart.svg" alt="heart" />
        </div>
        <p className="text-2xl">Free & open source</p>
        <p className="w-3/4 mx-auto text-md">
          Mirage is MIT Licensed and will always be free and open source. This
          is made possible by our contributors and these companies:
        </p>
        <p className="text-lg">
          Thanks to the people who worked on this project :)
        </p>

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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "onClick={closeModal}>
          <div className=" bg-white rounded-lg px-4 pb-4">
            <span className="close cursor-pointer flex justify-end font-bold text-2xl -mt-1" onClick={closeModal}>
              &times;
            </span>
            <iframe
              width="600"
              height="430"
              src="https://www.youtube.com/embed/j50sctgjxe0"
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
