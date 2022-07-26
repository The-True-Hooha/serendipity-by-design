import React from "react";
import Image from "next/image";
import AboutMeImage from "../public/assets/images/aboutme.jpg";

export default function About() {
  return (
    <div className="lg:py-[190px] lg:px-[300px] py-[100px] px-[30px]">
      <div className="">
        <h2 className="font-oxygen font-bold text-[40px] text-[#2a2f36]">
          About me
        </h2>
      </div>

      <div className="group w-2/3 mt-[60px] flex justify-center relative overflow-hidden rounded-2xl cursor-pointer">
        <Image className="" alt={"about me"} src={AboutMeImage} />
        <div className="absolute bg-black w-full h-full opacity-70 transition-opacity duration-500 group-hover:opacity-0">
          <p className="text-white font-extrabold mt-[200px] text-center flex-row text-lg">
            好奇心にあふれています
          </p>
          <p className="text-white text-center font-mono text-[11px] flex-row text-lg">
            local japanese proverb.
          </p>
        </div>
      </div>
      <div className="pt-[40px] font-sora lg:max-w-[700px] text-justify text-[18px]">
        <h2>
          Hi, I&apos;m David, a software engineer currently building tech
          solutions as an{" "}
          <span className="text-blue-700">open-source contributor.</span><br/> My
          main focus these days are scaling web products, design patterns and
          the better ways to utilize my creativity and problem solving skill to
          help build better products.{" "}
        </h2>

        <p className="mt-6">
          Most of my work involves server-side applications, in
          monolithic or microservice based architectures and cloud services.{" "}
          
            <br/>I spend my free time learning about Autonomous and Reverse
            Engineering, and building enterprise solutions for AI.
          
        </p>
        <p className="mt-3">
          I created this blog to have a detailed resource where I could collate
          all of my documentations and learning progress.
        </p>
        <p className="mt-1"> I enjoy are traveling, cooking and photography.</p>
        <h2 className="mt-10">
          Check out my{" "}
          <span className="text-blue-700 font-semibold hover:underline">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://owogogah.vercel.app/"
            >
              portfolio
            </a>
          </span>{" "}
          to know more about my work experience.
        </h2>
      </div>
    </div>
  );
}