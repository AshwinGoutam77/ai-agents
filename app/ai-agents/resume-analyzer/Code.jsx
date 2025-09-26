"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";
import ReactMarkdown from "react-markdown";
import "../tools.css";

const ResumeAnalyzerAdvanced = ({ token }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!resumeFile) {
      setError("Please select a resume file.");
      return;
    }

    if (!jdFile && !jdText.trim()) {
      setError("Please provide a job description file or text.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      // Check tool usage
      const usetool = await useTool("resume-analyzer-advanced", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("resume_file", resumeFile);
      if (jdFile) formData.append("jd_file", jdFile);
      formData.append("jd_text", jdText.trim());

      const res = await fetch(
        "https://api.devwings.com/resume-analyzer/analyze/",
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
      setResult(data.result);

      await saveChat({
        email,
        toolName: "resume-analyzer-advanced",
        prompt: {
          resumeFile: resumeFile.name,
          jdFile: jdFile?.name || null,
          jdText,
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
        <div className="max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Advanced Resume Analyzer</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* Resume Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full"
              />
              {resumeFile && (
                <p className="mt-1 text-gray-600 text-sm">{resumeFile.name}</p>
              )}
            </div>

            {/* JD File Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Job Description (PDF, optional)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setJdFile(e.target.files[0])}
                className="w-full"
              />
              {jdFile && (
                <p className="mt-1 text-gray-600 text-sm">{jdFile.name}</p>
              )}
            </div>

            {/* JD Text */}
            <div>
              <label className="block font-medium mb-1">Or Enter Job Description</label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="w-full border rounded p-2"
                rows={4}
                placeholder="Paste job description text..."
              />
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
          {loading && <div className="flex justify-center mt-6">Loading...</div>}

          {result && !loading && (
            <div className="mt-6 bg-gray-50 border rounded p-6 whitespace-pre-line">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResumeAnalyzerAdvanced;
