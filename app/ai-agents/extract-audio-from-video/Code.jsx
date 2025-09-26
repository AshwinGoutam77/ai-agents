"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";
import "../tools.css";

const AudioExtractor = ({ token }) => {
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!file && !youtubeUrl.trim()) {
      setError("Please upload a video or provide a YouTube URL.");
      return;
    }

    setError("");
    setAudioUrl("");
    setLoading(true);

    try {
      const usetool = await useTool("audio-extractor", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("youtube_url", youtubeUrl.trim());

      const res = await fetch("https://api.devwings.com/audio/extract-audio", {
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
      // Assuming the API returns a public URL like { "audio_file_url": "/downloads/audio123.mp3" }
      setAudioUrl(data.audio_path);

      await saveChat({
        email,
        toolName: "audio-extractor",
        prompt: { file: file?.name, youtubeUrl },
        response: data,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to extract audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Audio Extractor</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />
              {file && (
                <p className="mt-1 text-gray-600 text-sm">{file.name}</p>
              )}
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block font-medium mb-1">Or YouTube URL</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full border rounded p-2"
              />
            </div>

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Extracting..." : "Extract Audio"}
            </button>
          </form>

          {loading && (
            <div className="flex justify-center mt-6">Loading...</div>
          )}

          {audioUrl && !loading && (
            <div className="mt-6 bg-gray-50 border rounded p-6 space-y-4">
              <h2 className="text-xl font-semibold">Audio Extracted!</h2>
              <audio controls src={audioUrl} className="w-full"></audio>
              <a
                href={audioUrl}
                download
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download Audio
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AudioExtractor;
