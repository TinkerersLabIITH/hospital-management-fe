import React from "react";
import Header from "./header";
import Entries from "./entries";

function Priscription() {
    return (
        <div className="">
            <Header Department={"Pharmacy"} />
            <div className="overflow-x-auto overflow-y-scroll">
                <table className="min-w-full divide-y divide-gray-200 ml-10">
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
                            <td className="px-6 py-4 whitespace-nowrap">Paracetamol</td>
                            <td className="px-6 py-4 whitespace-nowrap">500 mg</td>
                            <td className="px-6 py-4 whitespace-nowrap">3 times a day</td>
                            <td className="px-6 py-4 whitespace-nowrap">5 days</td>
                            <td className="px-6 py-4 whitespace-nowrap">After meals</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Amoxicillin</td>
                            <td className="px-6 py-4 whitespace-nowrap">250 mg</td>
                            <td className="px-6 py-4 whitespace-nowrap">2 times a day</td>
                            <td className="px-6 py-4 whitespace-nowrap">7 days</td>
                            <td className="px-6 py-4 whitespace-nowrap">Before meals</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Priscription;
