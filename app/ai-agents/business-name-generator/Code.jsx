"use client";

import Header from "@/app/components/Header";
import { useState } from "react";
import Container from "@/app/components/Container";
import Cookies from "js-cookie";
import Loader from "@/components/ui/Loader";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";

const Code = () => {
  const [count, setCount] = useState(10);
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Auto");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a business description.");
      return;
    }

    const parsedCount = parseInt(count, 10) || 10;
    const keywordArray = keywords
      ? keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [];

    const payload = {
      count: parsedCount,
      keywords: keywordArray,
      description: description.trim(),
      style,
    };

    // Log everything before hitting the API
    console.log("📌 Name Generator - preparing to hit API with:", {
      email,
      payload,
    });

    setLoading(true);
    try {
      // Check tool usage/limits
      const usetool = await useTool("business-name-generator", email);
      console.log("🔎 useTool response:", usetool);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      // Call internal API (include Authorization if token provided)
      const res = await fetch("/api/business-name-generator", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error: ${res.status} ${text}`);
      }

      const data = await res.json();
      console.log("✅ API response:", data);

      const suggestions = data.suggestions || [];
      setResult(suggestions);

      // Save chat history
      try {
        await saveChat({
          email,
          toolName: "business-name-generator",
          prompt: {
            count: parsedCount,
            keywords: keywordArray,
            description: description.trim(),
            style,
          },
          response: data,
        });
      } catch (saveErr) {
        // non-fatal — log but don't block user
        console.error("⚠️ saveChat failed:", saveErr);
      }
    } catch (err) {
      console.error("Name generator error:", err);
      setError("Failed to generate names. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Business Name Generator</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            {/* Count */}
            <div>
              <label className="block font-medium mb-1">Number of Names</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full border rounded p-2"
                min="1"
                max="50"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block font-medium mb-1">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. tech, smart, future"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">
                Business Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Describe your business or idea..."
                required
              />
            </div>

            {/* Style */}
            <div>
              <label className="block font-medium mb-1">
                Choose Name Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option>Auto</option>
                <option>Brandable Names</option>
                <option>Evocative</option>
                <option>Short Phrase</option>
                <option>Compound Words</option>
                <option>Alternate Spelling</option>
                <option>Non-English Words</option>
                <option>Real Words</option>
                <option>Playful & Pun</option>
                <option>Minimalist</option>
                <option>Luxury & Elegant</option>
                <option>Tech & Innovative</option>
                <option>Nature-Inspired</option>
                <option>Emotional</option>
              </select>
            </div>

            <p className="text-rose-500">{error}</p>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate Names"}
              </button>
            </div>
          </form>

          {/* Results */}
          <div className="mt-10">
            {loading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            {result && !loading && (
              <div className="bg-gray-50 border rounded p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Suggested Business Names:
                </h2>
                <ul className=" pl-5 space-y-2">
                  {result.map((name, idx) => (
                    <li key={idx} className="font-medium">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default Code;
