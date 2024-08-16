import React from "react";
import "../index.css";
import Card from "./card";
import Entries from "./entries";
import Header from "./header";

function Profile({ Details ={} }) {
  return (
    <div className="m-0 p-0 w-screen min-h-screen flex-col gap-y-16 overflow-x-hidden justify-center items-center">
      <Header Department={"Pathology"} />

      <div className="identity flex flex-col lg:flex-row m-auto p-0 w-full lg:w-10/12 gap-8 lg:gap-16 mb-20">
        {/* Pass Details as a prop */}
        <div className="m-4">
          <Card Details={Details} />
        </div>
        <div className="details flex-1">
          <div className="text-center lg:text-right text-3xl font-semibold mt-5">
            <h1>UID</h1>
            <h1>{Details.UID || "123654987234"}</h1>
            <div className="border-2 mt-5"></div>
            <h1 className="flex flex-col lg:flex-row justify-between gap-5 items-center mt-5">
              <span className="w-full lg:w-auto mt-5 lg:mt-0">
                <h1 className="text-2xl font-medium">Last Scanned</h1>
                <h1>{Details.LastScanned || "15 minutes ago"}</h1>
              </span>
            </h1>
          </div>
        </div>
      </div>
      <Entries Details={Details}/>
    </div>
  );
}

export default Profile;
