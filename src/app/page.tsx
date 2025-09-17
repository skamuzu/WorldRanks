"use client";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Table from "./components/Table";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

export default function Home() {

  const {data} = useContext(AppContext)
  return (
    <div>
      <div className="flex flex-col md:flex-row text-white md:justify-between md:items-center justify-start">
        <h2 className="text-xl font-bold ">Found {data.length} countries</h2>
        <SearchBar/>
      </div>
      <div>
        <div className="flex mt-12">
          <Filters/>
          <div className="flex-5">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}
