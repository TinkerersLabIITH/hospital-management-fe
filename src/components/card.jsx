import React from "react";
import "../index.css";
import Image from "../assets/th.jpeg";
import Icon from "../assets/Icon.svg";

function Card({ PatientDetails = {}}) {
  return (
    <div className="id bg-blue-200 rounded-2xl p-10">
      <div className="box flex gap-2 ">
        <div className="image mr-8 border-2 border-gray-400 rounded-2xl w-48 h-48">
          <img
            src={PatientDetails.img || Image}
            className="w-48 h-48 rounded-2xl"
          />
        </div>
        <div className="profiledetails">
          <h1 className="text-5xl font-bold">
            {PatientDetails.name || "Captain Malhotra"}
          </h1>
          <table className="text-left mt-4">
            <tbody>
              <tr className="text-xl">
                <th className="font-normal">Age</th>
                <th className="font-normal">Sex</th>
              </tr>
              <tr className="text-2xl font-medium">
                <td className="gap-16">{PatientDetails.Age || "20 Years"}</td>
                <td>{PatientDetails.sex || "Male"}</td>
              </tr>
              <tr className="text-xl">
                <td className="font-normal">Relationship :</td>
                <td>{PatientDetails.relationship || "Self"}</td>
              </tr>
              <tr className="text-xl">
                <td className="font-normal">Number :</td>
                <td>{PatientDetails.contactNumber || "00000 00000"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <table className="text-left mt-6 text-large">
          <tbody>
            <tr>
              <td className="font-normal">
                Rank :{" "}
                <span className="font-semibold">
                  {PatientDetails.Rank || "Captain"}
                </span>{" "}
                <span className="ml-16">
                  Service :{" "}
                  <span className="font-semibold">
                    {PatientDetails.Service || "Air Force"}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td className="font-normal">
                Arm/Corp/Branch/Trade :{" "}
                <span className="font-semibold">
                  {PatientDetails.authLevel || "Placeholder"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <button>
          <img
            src={Icon}
            className="border-2 rounded-full p-1 mt-5 bg-blue-100 border-gray-400"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
