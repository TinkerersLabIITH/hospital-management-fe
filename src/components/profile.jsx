import React from "react";
import "../index.css";
import Card from "./card";
import Entries from "./entries";

function Profile({ PatientDetails }) {

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
        {/* Pass PatientDetails as a prop */}
        <Card PatientDetails={PatientDetails} />
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
      <Entries/>
    </div>
  );
}

export default Profile;
