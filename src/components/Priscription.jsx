import React, { useState } from "react";
import Header from "./header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Prescription() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [newPrescription, setNewPrescription] = useState({
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: ""
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPrescription((prev) => ({ ...prev, [name]: value }));
    };

    const addPrescription = () => {
        if (Object.values(newPrescription).some(value => value === "")) {
            setError("All fields are required.");
        } else {
            setPrescriptions([newPrescription, ...prescriptions]);
            setNewPrescription({
                medicineName: "",
                dosage: "",
                frequency: "",
                duration: "",
                instructions: ""
            });
            setError("");
        }
    };

    const generatePDF = (index) => {
        const input = document.getElementById(`prescription-${index}`);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save(`prescription-${index + 1}.pdf`);
            });
    };

    return (
        <div className="">
            <Header Department={"Pharmacy"} />
            <div className="ml-10 mb-4 w-2/4">
                <h2 className="text-xl font-semibold mb-2">Add New Prescription</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    name="medicineName"
                    value={newPrescription.medicineName}
                    onChange={handleInputChange}
                    placeholder="Medicine Name"
                    className="block mb-2 p-2 w-full border rounded"
                />
                <input
                    type="text"
                    name="dosage"
                    value={newPrescription.dosage}
                    onChange={handleInputChange}
                    placeholder="Dosage"
                    className="block mb-2 p-2 w-full border rounded"
                />
                <input
                    type="text"
                    name="frequency"
                    value={newPrescription.frequency}
                    onChange={handleInputChange}
                    placeholder="Frequency"
                    className="block mb-2 p-2 w-full border rounded"
                />
                <input
                    type="text"
                    name="duration"
                    value={newPrescription.duration}
                    onChange={handleInputChange}
                    placeholder="Duration"
                    className="block mb-2 p-2 w-full border rounded"
                />
                <input
                    type="text"
                    name="instructions"
                    value={newPrescription.instructions}
                    onChange={handleInputChange}
                    placeholder="Instructions"
                    className="block mb-2 p-2 w-full border rounded"
                />
                <button
                    onClick={addPrescription}
                    className="p-2 bg-green-600 text-white rounded-lg"
                >
                    Add Prescription
                </button>
            </div>
            <div className="overflow-x-auto overflow-y-scroll ml-10 ">
                {prescriptions.map((prescription, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Prescription {index + 1}</h3>
                        <div id={`prescription-${index}`}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">{prescription.medicineName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{prescription.frequency}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{prescription.duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{prescription.instructions}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={() => generatePDF(index)}
                            className="p-2 bg-blue-500 text-white rounded-lg mt-2"
                        >
                            Download PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Prescription;
