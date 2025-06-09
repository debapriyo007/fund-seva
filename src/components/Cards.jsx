import React from "react";
import { FaDonate, FaHandHoldingUsd, FaQrcode } from "react-icons/fa";

const Cards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12 px-4">
      {[
        {
          icon: <FaDonate className="text-3xl text-indigo-400 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />,
          title: "Create Request",
          desc: "Explain your funding need",
        },
        {
          icon: <FaQrcode className="text-3xl text-purple-400 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />,
          title: "Generate QR",
          desc: "A QR code just for your request",
        },
        {
          icon: <FaHandHoldingUsd className="text-3xl text-pink-400 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />,
          title: "Receive Support",
          desc: "People scan & donate directly",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center max-w-[200px] p-5 rounded-xl bg-gray-800/70 backdrop-blur-sm shadow-md border border-gray-700 hover:shadow-xl  transform hover:scale-105 transition duration-300 cursor-pointer group"
        >
          <div className="p-5 rounded-full bg-gray-900 shadow-lg flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h3 className="font-extrabold text-lg text-white mb-2">{item.title}</h3>
          <p className="text-center text-gray-300 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;


