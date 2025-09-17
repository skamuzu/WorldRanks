"use client";

import {  useContext, useRef, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import Image from "next/image";

const DropDown = () => {
  const { isOpen, setIsOpen, sortBy, setSortBy} = useContext(AppContext);
  const dropdownRef = useRef<HTMLDivElement>(null)
 
  

  const sort = [
    "Name (Ascending)",
    "Name (Descending)",
    "Area",
    "Population",
    "Region"
  ]

  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e?.target as Node) 
      ) {
        setIsOpen(false);
      }
    }

     document.addEventListener("mousedown", handleButtonClick);
    return () => {
      document.removeEventListener("mousedown", handleButtonClick);
    };
  }
  ,[setIsOpen]);

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-3 px-4 gap-3 border-1 border-gray-400 rounded-lg w-4/5 mt-2 justify-between font-bold text-lg"
      >
        {sortBy}
        <Image
          src={"/Expand_down.svg"}
          alt="dropdown"
          width={25}
          height={25}
          className="text-white"
        />
      </button>
      {isOpen && (
        <div className="absolute z-10  w-4/5 origin-top-right bg-[#1c1d1f] border border-gray-200 rounded-xl shadow-lg">
          {sort.map((s) => 
            <div className="hover:bg-[rgb(64,64,64)] hover:text-white outline-0 rounded-xl font-bold m-1"  key={s}>
            <button className="border-0 p-3 px-5 w-full flex justify-start outline-0" onClick={()=>{setSortBy(s);setIsOpen(false);}}>{s}</button>
          </div>
          )}
         
        </div>
      )}
    </div>
  );
};

export default DropDown;
