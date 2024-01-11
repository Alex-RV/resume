import React, { useState } from "react";
import convertPDFToText from "./api/upload-pdf";
import { PDFDocument } from "pdf-lib";
import Head from "next/head";

export default function ToText() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    console.log("File", selectedFile);
    if (selectedFile) {
      try {
        const uploadedPdfBuffer = await selectedFile.arrayBuffer();

        // Load the PDF into pdf-lib
        const pdfDoc = await PDFDocument.load(uploadedPdfBuffer);

        // Serialize the loaded PDF
        const compressedPdfBytes = await pdfDoc.save();

        const sizeLimitMB = 2;
        const sizeLimitBytes = sizeLimitMB * 1024 * 1024;
        console.log(compressedPdfBytes.length);

        if (compressedPdfBytes.length > sizeLimitBytes) {
          alert(
            `The compressed PDF is larger than ${sizeLimitMB}MB. Please upload a smaller PDF.`
          );
          return;
        }

        const compressedPdfBlob = new Blob([compressedPdfBytes], {
          type: "application/pdf",
        });

        const compressedPdfFile = new File(
          [compressedPdfBlob],
          selectedFile.name,
          {
            type: "application/pdf",
            lastModified: selectedFile.lastModified,
          }
        );

        

        let text;
        try {
            const reader = new FileReader();
            reader.readAsDataURL(compressedPdfFile);
            reader.onloadend = async () => {
              const dataUrl = reader.result;
              console.log("dataUrl", dataUrl)
              
              const response = await fetch('/api/upload-pdf', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  responseType: "arraybuffer",
                  responseEncoding: "binary",
                },
                body: JSON.stringify({ dataUrl }),
              });
      
              const data = await response.json();
              text = data && data.text ? data.text : [];
              console.log("TEXT", text);
            };
        } catch (err) {
          throw new Error("Error converting PDF to text: " + err);
        }

        

      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred: " + error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a PDF file to upload.");
      setLoading(false);
    }
  };

  return (
    <div className="container w-full min-w-full bg-slate-100">
      <Head>
        <title>PDF to Text Converter</title>
        <meta name="description" content="Convert your PDF to text" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center mt-8 mx-10 md:mx-32 lg:mx-3">
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Upload your PDF file</h2>
        </div>

        <label className="cursor-pointer filled-button w-1/5">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span>Select a file</span>
        </label>

        {selectedFile && (
          <p className="mt-4 text-gray-600">Selected: {selectedFile.name}</p>
        )}

        {loading && <div>Loading...</div>}

        <button
          onClick={handleUpload}
          className="w-1/3 bg-light-blue hover:bg-blue text-white font-bold py-2 px-4 rounded mt-4"
        >
          Convert to Text
        </button>
      </div>
    </div>
  );
}
