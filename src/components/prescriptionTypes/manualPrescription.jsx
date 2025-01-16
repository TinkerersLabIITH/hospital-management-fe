import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import Tesseract from "tesseract.js";

function ManualPrescription() {
    const canvasRef = useRef([]);
    const [drawing, setDrawing] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([true]);
    const [extractedText, setExtractedText] = useState("");

    const startDrawing = (e) => {
        const canvas = canvasRef.current[currentPage];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.beginPath();

        const { offsetX, offsetY } = e.nativeEvent.type === "touchstart"
            ? e.nativeEvent.touches[0]
            : e.nativeEvent;

        ctx.moveTo(offsetX, offsetY);
        setDrawing(true);

        setPages((prev) => {
            const newPages = [...prev];
            newPages[currentPage] = false;
            return newPages;
        });
    };

    const draw = (e) => {
        if (!drawing) return;

        const canvas = canvasRef.current[currentPage];
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        const { offsetX, offsetY } = e.nativeEvent.type === "touchmove"
            ? e.nativeEvent.touches[0]
            : e.nativeEvent;

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current[currentPage];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.closePath();
        setDrawing(false);
    };

    const extractTextFromCanvas = async () => {
        const canvas = canvasRef.current[currentPage];
        if (!canvas || pages[currentPage]) {
            alert("Canvas is empty or no drawing found!");
            return;
        }

        try {
            const dataUrl = canvas.toDataURL("image/png");
            const { data: { text } } = await Tesseract.recognize(dataUrl, "eng");

            setExtractedText((prevText) => prevText + "\n" + text.trim());
        } catch (error) {
            console.error("Error extracting text:", error);
            alert("Failed to extract text from the canvas.");
        }
    };

    const downloadPDF = () => {
        if (!extractedText.trim()) {
            alert("No extracted text available for PDF!");
            return;
        }

        const pdf = new jsPDF();
        pdf.setFontSize(12);

        // Add extracted text to the PDF
        pdf.text("Prescription", 10, 10);
        pdf.text(extractedText.trim(), 10, 20);

        // Save the PDF
        pdf.save("prescription.pdf");
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current[currentPage];
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the current canvas
        setPages((prev) => {
            const newPages = [...prev];
            newPages[currentPage] = true; // Mark current page as empty
            return newPages;
        });
    };

    const clearAllPages = () => {
        canvasRef.current.forEach((canvas) => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear each canvas
        });
        setPages(pages.map(() => true)); // Mark all pages as empty
        setCurrentPage(0); // Reset to the first page
        setExtractedText(""); // Clear extracted text
    };

    const addPage = () => {
        setPages((prev) => [...prev, true]); // Add a new page and mark it as empty
        setCurrentPage((prev) => prev + 1); // Move to the new page
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Write Prescription</h2>
            <div className="overflow-auto">
                {pages.map((_, index) => (
                    <canvas
                        key={index}
                        ref={(el) => (canvasRef.current[index] = el)}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing} // Handle touch start
                        onTouchMove={draw} // Handle touch move
                        onTouchEnd={stopDrawing} // Handle touch end
                        onTouchCancel={stopDrawing} // Handle touch cancel
                        width={600}
                        height={400}
                        className={`border border-gray-300 mb-4 ${index !== currentPage ? "hidden" : ""}`}
                    />
                ))}
            </div>
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={extractTextFromCanvas}
                    className="p-2 bg-blue-600 text-white rounded-lg"
                >
                    Extract Text
                </button>
                <button
                    onClick={downloadPDF}
                    className="p-2 bg-green-600 text-white rounded-lg"
                >
                    Download PDF
                </button>
                <button
                    onClick={clearCanvas}
                    className="p-2 bg-red-600 text-white rounded-lg"
                >
                    Clear Page
                </button>
                <button
                    onClick={clearAllPages}
                    className="p-2 bg-orange-600 text-white rounded-lg"
                >
                    Clear All
                </button>
                <button
                    onClick={addPage}
                    className="p-2 bg-purple-600 text-white rounded-lg"
                >
                    Add Next Page
                </button>
            </div>
            <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Extracted Text</h3>
                <textarea
                    className="w-full border rounded-lg p-2 text-gray-700"
                    rows="6"
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder="Your extracted text will appear here..."
                />
            </div>
        </div>
    );
}

export default ManualPrescription;