"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";
import "../tools.css";

const ResumeAnalyzer = ({ token }) => {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [shortlistCount, setShortlistCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (files.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setError("");
    setResult([]);
    setLoading(true);

    try {
      const usetool = await useTool("hr-resume-analyzer", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("job_description", jobDescription.trim());
      formData.append("shortlist_count", shortlistCount);

      const res = await fetch(
        "https://api.devwings.com/resume/resume-analyzer",
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
      setResult(data.shortlisted || []);

      // Save chat history
      await saveChat({
        email,
        toolName: "hr-resume-analyzer",
        prompt: {
          jobDescription,
          shortlistCount,
          fileNames: files.map((f) => f.name),
        },
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
          <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Resumes (PDF, multiple allowed)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                className="w-full"
              />
              {files.length > 0 && (
                <p className="mt-2 text-gray-600 text-sm">
                  {files.map((file) => file.name).join(", ")}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="block font-medium mb-1">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border rounded p-2"
                rows="3"
                placeholder="Enter job description..."
                required
              />
            </div>

            {/* Shortlist Count */}
            <div>
              <label className="block font-medium mb-1">Shortlist Count</label>
              <select
                value={shortlistCount}
                onChange={(e) =>
                  setShortlistCount(parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2"
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resumes"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}

          {result.length > 0 && !loading && (
            <div className="mt-10 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Shortlisted Candidates</h2>
              {result.map((candidate, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl p-6 shadow hover:shadow-lg bg-white transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{candidate.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Score: {candidate.score}%
                    </span>
                  </div>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${candidate.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {candidate.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> {candidate.phone}
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {candidate.linkedin}
                    </a>
                  </p>
                  {candidate.github && (
                    <p>
                      <strong>GitHub:</strong>{" "}
                      <a
                        href={candidate.github}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.github}
                      </a>
                    </p>
                  )}
                  <p>
                    <strong>Skills:</strong> {candidate.skills}
                  </p>

                  <button
                    className="mt-2 text-blue-600 hover:underline text-sm"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === idx ? null : idx)
                    }
                  >
                    {expandedIndex === idx ? "Hide Reason" : "Why This Candidate?"}
                  </button>
                  {expandedIndex === idx && (
                    <p className="mt-2 text-gray-700 border-l-4 border-blue-300 pl-4">
                      {candidate.why}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResumeAnalyzer;
