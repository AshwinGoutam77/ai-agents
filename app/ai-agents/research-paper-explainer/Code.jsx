"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import Markdown from "react-markdown";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import "../tools.css";
import Cookies from "js-cookie";
const PaperExplainer = ({ token }) => {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("Beginner-Friendly");
  const [length, setLength] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email"); // read fresh each time
    if (!email) {
      setError("Please login first.");
      return;
    }

    setError("");
    setResult("");

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    try {
      const usetool = await useTool("system-improvement", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("style", style);
      formData.append("length", length);

      const res = await fetch(
        "https://api.devwings.com/research-paper/explain",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
      }
      const data = await res.json();
      await saveChat({
        email,
        toolName: "research-paper-explainer",
        prompt: formData,
        response: data,
      });
      setResult(data.explanation || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to explain the paper. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Research Paper Explainer</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            {/* Style Dropdown */}
            <div>
              <label className="block font-medium mb-1">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option>Beginner-Friendly</option>
                <option>Technical</option>
                <option>Code-Oriented</option>
                <option>Mathematical</option>
              </select>
            </div>

            {/* Length Dropdown */}
            <div>
              <label className="block font-medium mb-1">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Explaining..." : "Explain Paper"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}
          {result && !loading && (
            <div className="bg-gray-50 border rounded p-6 mt-6 whitespace-pre-line">
              <Markdown>{result}</Markdown>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PaperExplainer;
