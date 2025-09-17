"use client";

import { useState, createContext } from "react";

type CountryData = {
  flag: string;
  region: string;
  area: number;
  name: { common: string };
  population: number;
  independent: boolean;
  unMember: boolean;
};

type AppContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: CountryData[];
  setData: React.Dispatch<React.SetStateAction<CountryData[]>>;
  fetchAllData: () => Promise<CountryData[]>|null;
  allData: CountryData[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>
};

export const AppContext = createContext<AppContextType>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error("setIsOpen called outside of AppProvider");
  },
  data: [],
  setData: () => {
    throw new Error("setData called outside of AppProvider");
  },
  fetchAllData: () => null,
  allData: [],
  sortBy: "Population",
  setSortBy: () => undefined,
  search: "",
  setSearch: () => undefined
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CountryData[]>([]);
  const[allData, setAllData] = useState<CountryData[]>([]);
  const [sortBy, setSortBy] = useState("Population");
  const [search, setSearch] = useState("")

  const fetchAllData = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flag,population,area,region,independent,unMember"
    );
    const response: CountryData[] = await res.json();
    setAllData(response)
    return response
  };

  return (
    <AppContext.Provider value={{ isOpen, setIsOpen, data, setData, fetchAllData, allData, sortBy, setSortBy, search, setSearch }}>
      {children}
    </AppContext.Provider>
  );
}
