import React from "react";
import "../index.css";
import Image from "../assets/th.jpeg";
import Icon from "../assets/Icon.svg";
import FilterIcon from "../assets/filter.svg";
import AddIcon from "../assets/add.svg";
import SearchIcon from "../assets/search.svg";
import SortIcon from "../assets/sort.svg";
import Card from "./card";

function Profile({ PatientDetails }) {
  console.log(`Name: ${PatientDetails.name}`);
  console.log(`authLevel: ${PatientDetails.authLevel}`);
  return (
    <div className="m-0 p-0 w-screen min-h-screen flex-col gap-y-16 overflow-x-hidden justify-center items-center">
      <div className="bg-gray-300 overflow-x-hidden mb-20">
        <header className="flex justify-between items-center font-semibold text-4xl w-11/12 m-auto p-10 mb-12">
          <div className="flex-col gap-0.5 justify-center">
            <h1>14 Airforce Hospital</h1>
            <h2 className="font-normal text-3xl">Dundigal</h2>
          </div>
          <div className="flex-col justify-center align-center">
            <h1>Department of Pathology</h1>
          </div>
        </header>
      </div>

      <div className="identity flex m-auto p-0 w-10/12 gap-16 mb-20">
        <Card/>
        <div className="details flex-1">
          <div className="text-right text-3xl font-semibold mt-5">
            <h1>UID</h1>
            <h1>{PatientDetails.UID || "123654987234"}</h1>
            <div className="border-2 mt-5"></div>
            <h1 className="flex justify-between gap-5 items-center mt-5">
              <span>
                <div className="border-2 p-5 text-left flex-1 rounded-xl">
                  <h4 className="text-sm font-medium">Updates</h4>
                  <div>
                    <ul className="text-xl">
                      <li>{PatientDetails.Updates || "New test added"}</li>
                    </ul>
                  </div>
                </div>
              </span>
              <span>
                <h1 className="text-2xl font-medium">Last Scanned</h1>
                <h1>{PatientDetails.LastScanned || "15 minutes ago"}</h1>
              </span>
            </h1>
          </div>
        </div>
      </div>

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
          <div>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                  <tr className="text-normal bg-gray-100 relative">
                    <td className="p-4">2</td>
                    <td className="">Test Name</td>
                    <td className="flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                  <tr className="text-normal bg-gray-100 relative">
                    <td className="p-4">3</td>
                    <td className="">Test Name</td>
                    <td className="flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                  <tr className="text-normal bg-gray-100 relative">
                    <td className="p-4">4</td>
                    <td className="">Test Name</td>
                    <td className="flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                  <tr className="text-normal bg-gray-100 relative">
                    <td className="p-4">5</td>
                    <td className="">Test Name</td>
                    <td className="flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                  <tr className="text-normal bg-gray-100 relative">
                    <td className="p-4">6</td>
                    <td className="">Test Name</td>
                    <td className="flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, sunt.
                    </td>
                    <td className="p-2 pl-4 pr-4 bg-yellow-100 z-10 text-yellow-700 text-center rounded-3xl mt-2 absolute">
                      Pending
                    </td>
                    <td className="text-right p-4">Value</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
