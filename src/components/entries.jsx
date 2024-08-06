import React from "react";
import SortIcon from "../assets/sort.svg";
import FilterIcon from "../assets/filter.svg";
import AddIcon from "../assets/add.svg";
import SearchIcon from "../assets/search.svg";

function Entries() {
  return (
    <div className="w-10/12 m-auto">
      <h1 className="text-5xl font-bold mb-5">Entries</h1>
      <div className="flex-col border-2 border-gray-300 p-5 rounded-lg mb-10">
        <div className="flex-col">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <img src={FilterIcon} className="bg-gray-200 p-2 rounded-lg " />
              <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg border-b-2 border-r-2 border-gray-300">
                <img src={SearchIcon} />
                <input
                  type="text"
                  className="bg-gray-200 text-black border-none focus:outline-none"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div>
              <button className="p-2 bg-indigo-800 text-white rounded-lg flex justify-between items-center gap-5">
                {" "}
                <img src={AddIcon} />
                <span className="mr-2">Add</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-y-scroll overflow-x-hidden">
          <table className="text-left w-full mt-2">
            <thead>
              <tr className="text-sm justify-between gap-16 p-2">
                <th>
                  <div className="flex items-center gap-2">
                    # <img src={SortIcon} alt="" />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Name <img src={SortIcon} alt="" />
                  </div>
                </th>
                <th className="">Description </th>
                <th>
                  <div className="flex items-center gap-2">
                    Status <img src={SortIcon} alt="" />
                  </div>
                </th>
                <th className="text-right">Property </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-normal bg-gray-100 relative">
                <td className="p-4">1</td>
                <td className="">Test Name</td>
                <td className="flex-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                  sunt.
                </td>
                <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                  Pending
                </td>
                <td className="text-right p-4">
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
              <tr className="text-normal bg-gray-100 relative">
                <td className="p-4">2</td>
                <td className="">Test Name</td>
                <td className="flex-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                  sunt.
                </td>
                <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                  Pending
                </td>
                <td className="text-right p-4">
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
              <tr className="text-normal bg-gray-100 relative">
                <td className="p-4">3</td>
                <td className="">Test Name</td>
                <td className="flex-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                  sunt.
                </td>
                {/* <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute"> */}
                {!1 && (
                  <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                    Pending
                  </td>
                )}
                {1 && (
                  <td className="p-2 pl-4 pr-4 bg-gray-400 z-10 text-black text-center rounded-3xl absolute mt-2">
                    Resolved
                  </td>
                )}
                {/* </td> */}
                <td className="text-right p-4">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Entries;
