"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie"; 
const AlternatePaperSEO = ({ token }) => {
  const [file, setFile] = useState(null);
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topics, setTopics] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    const email = Cookies.get("user_email"); // get fresh user email
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!file) {
      setError("Please upload a file.");
      return;
    }
    if (!standard || !subject || !difficulty || !topics.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadUrl("");

    try {
      // Check if user can use this tool
      const usetool = await useTool("alternate-paper", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("standard", standard);
      formData.append("subject", subject);
      formData.append("difficulty", difficulty);
      formData.append("topics", topics);

      const response = await fetch(
        "https://api.devwings.com/alternate-paper/seo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${response.status} ${text}`);
      }

      const data = await response.json();
      setDownloadUrl(data.download_url || "");

      // Save the chat/activity
      await saveChat({
        email,
        toolName: "alternate-paper",
        prompt: { standard, subject, difficulty, topics, fileName: file.name },
        response: data,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate alternate paper. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Generate Alternate Paper</h4>

          {/* File Upload */}
          <input
            type="file"
            accept=".docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded p-2"
          />

          {/* Standard */}
          <input
            type="text"
            placeholder="Enter Standard (e.g., 10TH)"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="p-3 border rounded-md"
          />

          {/* Subject */}
          <input
            type="text"
            placeholder="Enter Subject (e.g., MATH)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-3 border rounded-md"
          />

          {/* Difficulty */}
          <input
            type="text"
            placeholder="Enter Difficulty (e.g., EASY)"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-3 border rounded-md"
          />

          {/* Topics */}
          <input
            type="text"
            placeholder="Enter Topics (e.g., NUMBER SYSTEM)"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="p-3 border rounded-md"
          />

          {error && <p className="text-rose-500">{error}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Alternate Paper"}
          </button>
        </form>

        {/* Download link */}
        {downloadUrl && (
          <div className="my-6">
            <h4>Your Alternate Paper is ready:</h4>
            <a
              href={`https://api.devwings.com${downloadUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download Here
            </a>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AlternatePaperSEO;
