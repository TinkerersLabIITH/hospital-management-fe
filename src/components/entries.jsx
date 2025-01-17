import React, { useState } from "react";
import FilterIcon from "../assets/filter.svg";
import AddIcon from "../assets/add.svg";
import SearchIcon from "../assets/search.svg";
import AddEntry from "./addEntry";
import prescriptionPDF from "../assets/prescription.pdf";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

function Entries({ Details = {} }) {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown
  const navigate = useNavigate();

  const toggleAddEntry = () => {
    navigate("/prescription");
  };

  const handleAddEntry = async (newEntry) => {
    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setShowAddEntry(false);
  };

  const extractTextFromPDF = async (pdfUrl) => {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const totalPageCount = pdf.numPages;
      const countPromises = [];

      for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
        const page = await pdf.getPage(currentPage);
        countPromises.push(
          page.getTextContent().then((textContent) => {
            return textContent.items.map((item) => item.str).join(' ');  // Join text content items into a single string
          })
        );
      }

      // Wait for all promises to resolve and return the concatenated text
      const texts = await Promise.all(countPromises);
      return texts.join('');
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      return '';
    }
  };
  
  const translateText = async (text, targetLanguage) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_URI+'/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage })
      });
      
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return 'Translation failed';
    }
  };

  const handleLanguageChange = async (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
  
    try {
      // Extract text from the PDF
      const extractedText = await extractTextFromPDF(prescriptionPDF);
  
      // Translate the extracted text
      const translatedText = await translateText(extractedText, language);
  
      // Create a downloadable plain text file
      const textBlob = new Blob([translatedText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(textBlob);
      link.download = `prescription-${language}.txt`;
      link.click();
  
      // Cleanup URL object to prevent memory leaks
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error translating or generating text file:", error);
    }
  };    
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
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

        {showAddEntry && (
          <div className="mt-4">
            <AddEntry onAdd={handleAddEntry} />
          </div>
        )}

        <div className="max-h-80 overflow-y-scroll overflow-x-hidden mt-4">
          <table className="text-left w-full mt-2">
            <thead>
              <tr className="text-xs md:text-sm justify-between gap-4 p-2">
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th className="text-right">Property</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm md:text-normal bg-gray-100">
                <td className="p-2 md:p-4">0</td>
                <td>Test Name</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                  sunt.
                </td>
                <td>
                  <span className="p-2 pl-4 pr-4 bg-gray-400 text-black text-center rounded-3xl mt-2">
                    Resolved
                  </span>
                </td>
                <td className="text-right p-2 md:p-4">
                  <a
                    onClick={toggleDropdown}
                    className="underline cursor-pointer"
                  >
                    View PDF
                  </a>
                  {showDropdown && (
                    <div className="mt-2">
                      <select
                        className="bg-gray-200 p-2 rounded-lg"
                        onChange={handleLanguageChange}
                        value={selectedLanguage}
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>
                  )}
                </td>
              </tr>
              {entries.map((entry, index) => (
                <tr key={index} className="text-sm md:text-normal bg-gray-100">
                  <td className="p-2 md:p-4">{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.description}</td>
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
                      onClick={toggleDropdown}
                      className="underline cursor-pointer"
                    >
                      View PDF
                    </a>
                    {showDropdown && (
                      <div className="mt-2">
                        <select
                          className="bg-gray-200 p-2 rounded-lg"
                          onClick={handleLanguageChange}
                          value={selectedLanguage}
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                    )}
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