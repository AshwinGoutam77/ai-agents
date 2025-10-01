"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";
import "../tools.css";
import ReactMarkdown from "react-markdown";

const ATSAnalyzer = ({ token }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setError("Please select a valid PDF file.");
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

    if (!file) {
      setError("Please upload a PDF resume.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      const usetool = await useTool("ats-analyzer", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.devwings.com/ats-analyzer/analyze", {
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
      setResult(data.analysis || "No analysis found.");

      // Save chat history
      await saveChat({
        email,
        toolName: "ats-analyzer",
        prompt: { fileName: file.name },
        response: data,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-5xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">ATS Resume Analyzer</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Resume (PDF)
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
                    className="text-red-500 hover:text-red-700 text-xs ml-3"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}

          {result && !loading && (
            <div className="mt-10 p-6 border rounded-xl bg-white shadow">
              <h2 className="text-2xl font-semibold mb-4">ATS Analysis</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ATSAnalyzer;
