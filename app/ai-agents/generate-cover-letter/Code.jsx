"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";
import "../tools.css";

const CoverLetterGenerator = ({ token }) => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [outputFormat, setOutputFormat] = useState("both");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!file) {
      setError("Please select a resume file (.docx).");
      return;
    }

    if (!jobTitle.trim() || !jobDescription.trim()) {
      setError("Please enter job title and description.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const usetool = await useTool("cover-letter-generator", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_title", jobTitle.trim());
      formData.append("job_description", jobDescription.trim());
      formData.append("output_format", outputFormat);

      const res = await fetch(
        "https://api.devwings.com/cover-letter/generate-cover-letter/",
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
      setResult(data);

      await saveChat({
        email,
        toolName: "cover-letter-generator",
        prompt: { jobTitle, jobDescription, fileName: file.name, outputFormat },
        response: data,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Cover Letter Generator</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* Resume Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Resume (.docx or .pdf)
              </label>
              <input
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileChange}
                className="w-full"
              />
              {file && (
                <p className="mt-2 text-gray-600 text-sm">{file.name}</p>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="block font-medium mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter job title..."
                required
              />
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

            {/* Output Format */}
            <div>
              <label className="block font-medium mb-1">Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="both">Both</option>
              </select>
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}

          {result && !loading && (
            <div className="mt-10 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Preview</h2>
              <div className="bg-gray-50 border rounded p-6 whitespace-pre-line">
                {result.preview}
              </div>

              {result.public_urls?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Download Files</h3>
                  <div className="flex flex-wrap gap-4">
                    {result.public_urls.map((url, idx) => {
                        const fileExtension = url.split('.').pop();
                      return (
                        <a
                          key={idx}
                          href={`https://api.devwings.com${url
                            .split("/")
                            .pop()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                         {`Download ${fileExtension.toUpperCase()} File `}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CoverLetterGenerator;
