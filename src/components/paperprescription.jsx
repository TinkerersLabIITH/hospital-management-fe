import React, { useRef, useState } from "react";
import jsPDF from 'jspdf';

function PaperPrescription() {
    const canvasRef = useRef([]);
    const [drawing, setDrawing] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([true]); // Track if each page is empty

    const startDrawing = (e) => {
        const canvas = canvasRef.current[currentPage];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        
        const { offsetX, offsetY } = e.nativeEvent.type === 'touchstart'
            ? e.nativeEvent.touches[0]
            : e.nativeEvent;

        ctx.moveTo(offsetX, offsetY);
        setDrawing(true);

        // Mark current page as not empty
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

        const { offsetX, offsetY } = e.nativeEvent.type === 'touchmove'
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

    const downloadPDF = () => {
        const pdf = new jsPDF();

        pages.forEach((isEmpty, index) => {
            if (!isEmpty) {
                const canvas = canvasRef.current[index];
                const imgData = canvas.toDataURL("image/png");
                
                // Add header for each page
                pdf.setFontSize(12);
                pdf.text("Prescription - Page " + (index + 1), 14, 20);
                
                // Add the image to the PDF
                pdf.addImage(imgData, "PNG", 10, 30, 190, 0);

                if (index < pages.length - 1) {
                    pdf.addPage();
                }
            }
        });

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
        canvasRef.current.forEach(canvas => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear each canvas
        });
        setPages(pages.map(() => true)); // Mark all pages as empty
        setCurrentPage(0); // Reset to the first page
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
                        onTouchStart={startDrawing}  // Handle touch start
                        onTouchMove={draw}            // Handle touch move
                        onTouchEnd={stopDrawing}      // Handle touch end
                        onTouchCancel={stopDrawing}    // Handle touch cancel
                        width={600}
                        height={400}
                        className={`border border-gray-300 mb-4 ${index !== currentPage ? 'hidden' : ''}`}
                    />
                ))}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={downloadPDF}
                    className="p-2 bg-blue-600 text-white rounded-lg"
                >
                    Download
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
                    Clear PDF
                </button>
                <button
                    onClick={addPage}
                    className="p-2 bg-green-600 text-white rounded-lg"
                >
                    Add Next Page
                </button>
            </div>
        </div>
    );
}

export default PaperPrescription;
