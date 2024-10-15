import React, { useState } from "react";
import ManualPrescription from "./manualprescription"; // Ensure this file exports the component correctly
import PaperPrescription from "./paperprescription"; // Create this component for paper prescriptions
import Header from "./header";

function Prescription() {
    const [isManual, setIsManual] = useState(true); // State to toggle between manual and paper prescriptions

    const handleToggle = (option) => {
        setIsManual(option === 'manual');
    };

    return (
        <div>
            <Header Department={"Pharmacy"} />
            <div className="mb-4 w-full p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-2">Select Prescription Type</h2>
                <button
                    onClick={() => handleToggle('manual')}
                    className={`p-2 ${isManual ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded-lg mr-2`}
                >
                    Manual Prescription
                </button>
                <button
                    onClick={() => handleToggle('paper')}
                    className={`p-2 ${!isManual ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded-lg`}
                >
                    Paper Prescription
                </button>
            </div>

            {isManual ? (
                <ManualPrescription />
            ) : (
                <PaperPrescription /> // Render the PaperPrescription component here
            )}
        </div>
    );
}

export default Prescription;
