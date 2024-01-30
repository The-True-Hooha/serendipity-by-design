import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineGithub } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { RiCopyrightLine } from "react-icons/ri";

const Navbar = () => {
  //handles the side navbar for large and smaller screens
  const [navbar, setNavbar] = useState(false);
  const navMenu = () => {
    setNavbar(!navbar);
  };

  //handles the navbar dropdown on scroll effect
  const [scrollNavbar, setScrollNavbar] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 80) {
        setScrollNavbar(true);
      } else {
        setScrollNavbar(false);
      }
    });
  }, []);

  return (
    <header
      className={`${
        scrollNavbar ? "hidden opacity-0 " : ""
      } fixed w-full h-[65px] border z-10 shadow-md`}
    >
      <nav className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
        <div onClick={navMenu} className="">
          <BiMenu size={30} className="ml-2 rounded-sm cursor-pointer" />
        </div>

        <div className="font-agrandir text-[#084dcf]">
          <p className="text-[19px] md:text-[25px]">
            {" "}
            David Ogar |
            <span className=" text-[14px] md:text-[15px]">
              {" "}
              Serendipity by Design
            </span>
          </p>
        </div>

        <div className="pr-[20px]">
          <ul className="hidden md:flex lg:pl-[150px] font-oxygen text-[#084dcf] text-[17px]">
            <li className="md:ml-16 cursor-pointer">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="md:ml-16 cursor-pointer">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="md:ml-16 cursor-pointer">
              <Link href="/archive">
                <a>Archive</a>
              </Link>
            </li>
            <li className="md:ml-16 cursor-pointer">
              <Link href="/newsletter">
                <a>Newsletter</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={navbar ? "left-0 fixed top-0 w-full h-screen" : ""}>
          <div
            className={
              navbar
                ? "py-6 duration-500 px-4 fixed top-0 h-screen left-0 bg-black w-[55%] md:w-[18%]"
                : "py-6 px-4 top-0 left-[-100%] hidden"
            }
          >
            <div className="w-full justify-start text-[12px]">
              <div
                onClick={navMenu}
                className="flex items-center justify-between"
              >
                <AiOutlineClose size={25} className="text-white mt-2 border" />
                <Link href="/">
                  <p className="text-white text-[13px] mt-3 cursor-pointer hover:bg-[#1b1b1d] font-sora">
                    Serendipity by Design
                  </p>
                </Link>
              </div>
              <p className="text-white mt-[50px] text-[15px]">
                {" "}
                I own nothing. Just vibes and the will to make eba.
                <br />
                Software engineer in server-side engineering, building scalable
                tech.
                <span className="ml-1">
                  <br /> I spend my free time in reverse and autonomous
                  engineering, yes that includes ML.
                </span>
              </p>
            </div>
            <div className="grid w-full mt-[80px] divide-neutral-800 text-[18px] max-w-sm text-white grid-cols-1 shadow-md mx-auto text-start divide-y">
              <div className="p-2 hover:bg-[#1b1b1d] cursor-pointer">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </div>
              <div className="p-2 hover:bg-[#1b1b1d] cursor-pointer">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </div>
              <div className="p-2 hover:bg-[#1b1b1d] cursor-pointer">
                <Link href="/archive">
                  <a>Archive</a>
                </Link>
              </div>
              <div className="p-2 hover:bg-[#1b1b1d] cursor-pointer">
                <Link href="/newsletter">
                  <a>Newsletter</a>
                </Link>
              </div>
            </div>
            <div className="text-white font-oxygen pt-[50px]">
              <p className="cursor-pointer font-mono  text-[12px] hover:underline">
                <a
                  href="mailto:owogogahhero@outlook"
                  target="_blank"
                  rel="noreferrer"
                >
                  owogogahhero@outlook.com
                </a>
              </p>
              <p className="flex mt-3 cursor-pointer hover:underline">
                <AiOutlineGithub size={15} className="mr-2 mt-1" />
                <a
                  href="https://github.com/The-True-Hooha"
                  rel="noreferrer"
                  target="_blank"
                >
                  The-True-Hooha
                </a>{" "}
              </p>
              <p className="mt-2 flex cursor-pointer hover:underline">
                <FaLinkedinIn size={15} className="mr-2 mt-1" />
                <a
                  href="https://www.linkedin.com/in/david-ogar/"
                  rel="noreferrer"
                  target="_blank"
                >
                  David Ogar
                </a>{" "}
              </p>
              <p className="flex mt-2 cursor-pointe hover:underline">
                <FaTwitter size={15} className="mr-2 mt-1" />
                <a
                  href="https://twitter.com/TheTrueHooha_I"
                  rel="noreferrer"
                  target="_blank"
                >
                  the_real_owogogah
                </a>{" "}
              </p>
              <p className="flex text-[14px] font-oxygen mt-8">
                <RiCopyrightLine className="mt-1 mr-1" />
                2022. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

//todo: try to refactor line 48 - 49
