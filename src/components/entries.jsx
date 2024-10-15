import React, { useState } from "react";
import FilterIcon from "../assets/filter.svg";
import AddIcon from "../assets/add.svg";
import SearchIcon from "../assets/search.svg";
import AddEntry from "./addEntry";
import { useNavigate } from "react-router-dom"; // Updated import

function Entries({ Details = {} }) {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const toggleAddEntry = () => {
    // Navigate to /prescription page when the button is clicked
    navigate('/prescription');
  };

  const handleAddEntry = (newEntry) => {
    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setShowAddEntry(false); // Hide the form after adding the entry
  };

  return (
    <div className="w-full md:w-10/12 m-auto p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-5 text-center md:text-left">
        Entries
      </h1>
      <div className="flex flex-col border-2 border-gray-300 p-5 rounded-lg mb-10">
        <div className="flex gap-4 md:gap-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={FilterIcon}
              className="bg-gray-200 p-2 rounded-lg"
              alt="Filter"
            />
            <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg border-b-2 border-r-2 border-gray-300 flex-1">
              <img src={SearchIcon} alt="Search" />
              <input
                type="text"
                className="bg-gray-200 text-black border-none focus:outline-none w-2/4"
                placeholder="Search..."
              />
            </div>
          </div>

          {Details.authLevel === "Doctor" && (
            <button
              className="p-2 bg-indigo-800 text-white rounded-lg flex items-center gap-2"
              onClick={toggleAddEntry}
            >
              <img src={AddIcon} alt="Add" />
              <span className="hidden sm:inline-block">Add</span>
            </button>
          )}
        </div>

        {/* Conditionally render AddEntry form */}
        {showAddEntry && (
          <div className="mt-4">
            <AddEntry onAdd={handleAddEntry} />
          </div>
        )}

        <div className="max-h-80 overflow-y-scroll overflow-x-hidden mt-4">
          <table className="text-left w-full mt-2">
            <thead>
              <tr className="text-xs md:text-sm justify-between gap-4 p-2">
                <th>
                  <div className="flex items-center md:gap-2">#</div>
                </th>
                <th>
                  <div className="flex items-center md:gap-2">Name</div>
                </th>
                <th>Description</th>
                <th>
                  <div className="flex items-center md:gap-2">Status</div>
                </th>
                <th className="text-right">Property</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm md:text-normal bg-gray-100">
                <td className="p-2 md:p-4">0</td>
                <td>Test Name</td>
                <td className="flex-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                  sunt.
                </td>
                <td className="flex justify-start items-center">
                  <span className="p-2 pl-4 pr-4 bg-gray-400 text-black text-center rounded-3xl mt-2">Resolved</span>
                </td>
                <td className="text-right p-2 md:p-4">
                  <a
                    href="https://static.e-publishing.af.mil/production/1/jbmcguire-dix-lakehurst/publication/afi21-101_amcsup_jbmdlsup/afi21-101_amcsup_jbmdlsup.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    PDF
                  </a>
                </td>
              </tr>
              {entries.map((entry, index) => (
                <tr key={index} className="text-sm md:text-normal bg-gray-100">
                  <td className="p-2 md:p-4">{index + 1}</td>
                  <td>{entry.name}</td>
                  <td className="flex-1">{entry.description}</td>
                  <td>
                    <span
                      className={`p-2 pl-4 pr-4 text-center rounded-3xl mt-2 ${
                        entry.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-400 text-black"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="text-right p-2 md:p-4">
                    <a
                      href={entry.property || "https://static.e-publishing.af.mil/production/1/jbmcguire-dix-lakehurst/publication/afi21-101_amcsup_jbmdlsup/afi21-101_amcsup_jbmdlsup.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Entries;
