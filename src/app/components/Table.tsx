"use client";

import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Table = () => {
  const { data, setData, fetchAllData } = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllData(); // make sure this returns an array
      setData(result);
    };
    loadData();
  }, []);


  return (
    <table className="w-full table-fixed border-collapse ">
      <thead className="border-b ">
        <tr>
          <th className="w-1/8 pb-4 text-left">Flag</th>
          <th className="w-1/5 pb-4 text-left">Name</th>
          <th className="w-1/5 pb-4 text-left">Population</th>
          <th className="w-1/5 pb-4 text-left">Area (km²)</th>
          <th className="w-1/5 pb-4 text-left">Region</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) &&
          data.map((item, idx) => (
            <tr key={idx} className="pb-2">
              <td className="w-1/8 text-6xl p-2">{item.flag}</td>
              <td className="w-1/5">{item.name.common}</td>
              <td className="w-1/5">{item.population}</td>
              <td className="w-1/5">{item.area}</td>
              <td className="w-1/5">{item.region}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
