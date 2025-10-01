"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import ReactMarkdown from "react-markdown";
import Cookies from "js-cookie";
import "../tools.css";

const NotesGenerator = ({ token }) => {
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState("");
  const [style, setStyle] = useState("Cornell");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Handle single file upload (PDF only)
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === "application/pdf") {
      setFile(newFile);
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  // Remove file
  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!file && !rawText.trim()) {
      setError("Please upload a file or enter raw text.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      const usetool = await useTool("notes-generator", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("raw_text", rawText.trim());
      formData.append("style", style);

      const res = await fetch("https://api.devwings.com/notes/generate-notes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
      }

      const data = await res.json();
      setResult(data.notes || "");

      // Save chat history
      await saveChat({
        email,
        toolName: "notes-generator",
        prompt: {
          fileName: file?.name || null,
          rawText,
          style,
        },
        response: data,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Notes Generator</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload File (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full"
              />
              {file && (
                <div className="mt-3 flex items-center justify-between bg-gray-100 px-3 py-2 rounded text-sm">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {/* Raw Text Input */}
            <div>
              <label className="block font-medium mb-1">
                Or Enter Raw Text
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Enter text to generate notes..."
              />
            </div>

            {/* Style Selector */}
            <div>
              <label className="block font-medium mb-1">Select Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="Cornell">Cornell Method</option>
                <option value="Outline">Outline Method</option>
                <option value="Charting">Charting Method</option>
                <option value="Boxing">Boxing Method</option>
                <option value="Sentence">Sentence Method</option>
                <option value="Flow-Based">Flow-Based Notes</option>
                <option value="T-Notes">T-Notes Method</option>
                <option value="Pattern">Pattern Notes</option>
                <option value="Household/Task">Household/Task Notes</option>
              </select>
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Notes"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}

          {result && !loading && (
            <div className="mt-10 bg-white border rounded-xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Generated Notes</h2>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-800">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default NotesGenerator;
