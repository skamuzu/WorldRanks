"use client";
import { Search } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const SearchBar = () => {
  const {search, setSearch} = useContext(AppContext)
  return (
    <div className="relative">
          <input
            type="text"
            placeholder={` Search by Name, Region, Subregion`}
            className="p-3 pl-12 flex-1 w-95 border-0 outline-0 bg-[#282b30] placeholder:text-white rounded-xl "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        <Search className="absolute top-1/2 -translate-y-1/2 left-3"/>
        </div>
  )
}

export default SearchBar