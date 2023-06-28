import React from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/job-vacancy`);
  };

  return (
    <>
      <div className="pb-10 border-b bg-blend-multiply" style={{ background: "url('/banner.png') no-repeat center/cover" }}>
        <div className="px-6 pt-32 lg:pt-48">
          <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
            <div className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              <h3 className="mb-5 ">
                <Typewriter
                  options={{
                    strings: ["Find A Job ", "Apply Online", "Get Hired !!!"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h3>
            </div>
            <div>
              <p className="font-sans text-gray-600 text-lg md:text-xl leading-8">
                Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time, contract, and internships.
              </p>
            </div>
            <div className="max-w-[650px] flex">
              <input
                type="text"
                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-l-lg"
                placeholder="Search by job title..."
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-r-lg transition duration-300 hover:opacity-95"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;