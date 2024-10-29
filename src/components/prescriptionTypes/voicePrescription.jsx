import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

function VoicePrescription() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (recognition) {
            recognition.lang = "en-US"; // Set language

            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                setTranscript((prevTranscript) => prevTranscript + " " + speechToText);

                resetTimeout();
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                stopRecording();
            };

            recognition.onend = () => {
                if (isRecording) {
                    setTimeout(() => {
                        recognition.start();
                    }, 1000);
                }
            };
        }

        return () => clearTimeout(timeoutId);
    }, [recognition, timeoutId, isRecording]);

    const resetTimeout = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            stopRecording();
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (recognition) {
            recognition.stop();
        }
    };

    const handleVoiceInput = () => {
        if (!recognition) {
            alert("Speech Recognition API not supported in this browser.");
            return;
        }

        if (!isRecording) {
            setIsRecording(true);
            recognition.start();
        } else {
            stopRecording();
        }
    };

    const handleClearText = () => {
        setTranscript("");
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Prescription", 10, 10);
        doc.text(transcript || "No prescription text provided.", 10, 20);
        doc.save("prescription.pdf");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Voice Prescription</h2>
            <button
                onClick={handleVoiceInput}
                className={`p-2 ${isRecording ? "bg-red-600" : "bg-blue-600"} text-white rounded-lg mb-4`}
            >
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            <button
                onClick={handleClearText}
                className="p-2 bg-gray-500 text-white rounded-lg mb-4 ml-2"
            >
                Clear Text
            </button>
            <button
                onClick={handleGeneratePDF}
                className="p-2 bg-green-600 text-white rounded-lg mb-4 ml-2"
            >
                Generate PDF
            </button>
            <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Prescription Text</h3>
                <textarea
                    className="w-full border rounded-lg p-2 text-gray-700"
                    rows="6"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)} // Allow manual editing
                    placeholder="Your prescription text will appear here..."
                />
            </div>
        </div>
    );
}

export default VoicePrescription;
