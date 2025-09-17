"use client";
import DropDown from "./DropDown";
import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../contexts/AppContext";

const continents = [
  {
    name: "Americas",
  },
  {
    name: "Antartica",
  },
  {
    name: "Africa",
  },
  {
    name: "Asia",
  },
  {
    name: "Europe",
  },
  {
    name: "Oceania",
  },
];

const status = ["Independent", "Member of the United Nations"];

const Filters = () => {
  const { sortBy, search, setSearch } = useContext(AppContext);

  
  const toggleRegion = (name: string) => {
    setRegions(
      (prev) =>
        prev.includes(name)
          ? prev.filter((r) => r !== name) // remove if already selected
          : [...prev, name] // add if not selected
    );
  };

  const toggleState = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]
    );
  };

  
  const { data, setData, allData } = useContext(AppContext);
  const [regions, setRegions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const filteredAndSorted = useMemo(() => {
  let filtered = [...allData];

  // --- Filtering ---
  if (regions.length > 0) {
    filtered = filtered.filter((country) =>
      regions.includes(country.region)
    );
  }

  if (selected.length > 0) {
    filtered = filtered.filter((country) => {
      const isIndependent =
        selected.includes("Independent") && country.independent === true;
      const isUn =
        selected.includes("Member of the United Nations") &&
        country.unMember === true;
      return isIndependent || isUn;
    });
  }

  // --- Sorting ---
  switch (sortBy) {
    case "Name (Ascending)":
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
      break;
    case "Name (Descending)":
      filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
      break;
    case "Area":
      filtered.sort((a, b) => b.area - a.area);
      break;
    case "Population":
      filtered.sort((a, b) => b.population - a.population);
      break;
    case "Region":
      filtered.sort((a, b) => a.region.localeCompare(b.region));
      break;
  }

  if (search.length > 0) {
    filtered = filtered.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
  }

  return filtered;
}, [allData, regions, selected, sortBy, search]);

// ✅ Correct: update context with useEffect
useEffect(() => {
  setData(filteredAndSorted);
}, [filteredAndSorted, setData]);



  return (
    <div className="flex flex-col flex-2 gap-3">
      <div className="mb-8">
        <h3 className="text-gray-500 text-lg font-bold">Sort by</h3>
        <DropDown />
      </div>
      <div className="mb-8">
        <h3 className="text-gray-500 text-lg font-bold">Region</h3>
        <ul className="flex flex-wrap w-1/2 gap-1 text-gray-300 outline-0">
          {continents.map((continent) => (
            <li key={continent.name}>
              <button
                className={`text-lg outline-0 ${
                  regions.includes(continent.name) && "bg-gray-500"
                } font-bold rounded-md py-1 px-2`}
                onClick={() => toggleRegion(continent.name)}
              >
                {continent.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-gray-500 text-lg font-bold">Status</h3>

        <div className="text-lg flex flex-col gap-2 mb-2">
          {status.map((s) => (
            <div className="flex items-center gap-2" key={s}>
              <input
                className="outline-0"
                type="checkbox"
                name="member"
                style={{ width: "20px", height: "20px" }}
                checked={selected.includes(s)}
                onChange={() => toggleState(s)}
              />
              <label htmlFor="member">{s}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
