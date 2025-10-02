"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import Cookies from "js-cookie";

const BgRemover = ({ token }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("transparent"); // default
  const [solidColor, setSolidColor] = useState("#ffffff");
  const [blurStrength, setBlurStrength] = useState("medium");
  const [gradient, setGradient] = useState({ top: "FF9013", bottom: "F5F1DC" });

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResult("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!file) {
      setError("Please upload an image.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      // Usage check
      const usetool = await useTool("bg-remover", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      let url = "https://api.devwings.com/bg-remover/";

      // Decide endpoint based on user choice
      if (mode === "transparent") {
        url += "transparent";
      } else if (mode === "solid") {
        url += `solid?colour=${encodeURIComponent(solidColor)}`;
      } else if (mode === "blur") {
        url += `blur?strength=${blurStrength}`;
      } else if (mode === "gradient") {
        url += `gradient?top_colour=${gradient.top}&bottom_colour=${gradient.bottom}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        console.log(res,"this is the api response");
        
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
      }

      // API returns image → convert to blob URL
      const blob = await res.blob();
      const imgUrl = URL.createObjectURL(blob);
      setResult(imgUrl);

      // Save history
      await saveChat({
        email,
        toolName: "bg-remover",
        prompt: { fileName: file.name, mode },
        response: { imageUrl: imgUrl },
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-5xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Background Remover</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
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

            {/* Mode Selector */}
            <div>
              <label className="block font-medium mb-1">Choose Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="border rounded p-2"
              >
                <option value="transparent">Remove Background</option>
                <option value="solid">Solid Color Background</option>
                <option value="blur">Blur Background</option>
                <option value="gradient">Gradient Background</option>
              </select>
            </div>

            {/* Mode Options */}
            {mode === "solid" && (
              <div>
                <label className="block font-medium mb-1">Pick Color</label>
                <input
                  type="color"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                />
              </div>
            )}

            {mode === "blur" && (
              <div>
                <label className="block font-medium mb-1">Blur Strength</label>
                <select
                  value={blurStrength}
                  onChange={(e) => setBlurStrength(e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            )}

            {mode === "gradient" && (
              <div className="flex gap-4">
                <div>
                  <label className="block font-medium mb-1">Top Color</label>
                  <input
                    type="color"
                    value={`#${gradient.top}`}
                    onChange={(e) =>
                      setGradient((g) => ({
                        ...g,
                        top: e.target.value.replace("#", ""),
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Bottom Color</label>
                  <input
                    type="color"
                    value={`#${gradient.bottom}`}
                    onChange={(e) =>
                      setGradient((g) => ({
                        ...g,
                        bottom: e.target.value.replace("#", ""),
                      }))
                    }
                  />
                </div>
              </div>
            )}

            {error && <p className="text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Apply Effect"}
            </button>
          </form>

          {/* Result */}
          {loading && (
            <div className="flex justify-center mt-6">Loading.......</div>
          )}

          {result && !loading && (
            <div className="mt-10 p-6 border rounded-xl bg-white shadow text-center">
              <h2 className="text-2xl font-semibold mb-4">Processed Image</h2>
              <img src={result} alt="Processed Result" className="mx-auto rounded-xl shadow-lg" />
              <a
                href={result}
                download="processed.png"
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BgRemover;
