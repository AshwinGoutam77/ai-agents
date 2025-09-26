"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import Loader from "@/components/ui/Loader";
import Cookies from "js-cookie";
import { useTool } from "../../../hooks/useTool";
import { saveChat } from "@/hooks/useChatHistory";
import Markdown from "react-markdown";

const BlogSummarizer = () => {
  const [blogContent, setBlogContent] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSummary(null);

    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!blogContent.trim()) {
      setError("Please enter blog content.");
      return;
    }

    setLoading(true);
    try {
      // Usage limit check
      const usetool = await useTool("blog-summarizer", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      // Call internal API
      const res = await fetch("/api/blog-summarizer", {
        method: "POST",
        body: JSON.stringify({ blogContent }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.summary);

      // Save chat history
      await saveChat({
        email,
        toolName: "blog-summarizer",
        prompt: { blogContent },
        response: data,
      });
    } catch (err) {
      console.error("Blog summarizer error:", err);
      setError("Failed to summarize blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Blog Content Summarizer</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow p-6 rounded-xl"
          >
            <div>
              <label className="block font-medium mb-1">Blog Content</label>
              <textarea
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="w-full border rounded p-2"
                rows="8"
                placeholder="Paste your blog content here..."
                required
              />
            </div>

            <p className="text-rose-500">{error}</p>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Summarizing..." : "Generate Summary"}
            </button>
          </form>

          <div className="mt-10">
            {loading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            {summary && !loading && (
              <>
                <h2 className="text-xl font-semibold mb-4">Summary:</h2>
                <div className="bg-gray-50 border rounded p-6 whitespace-pre-line">
                  <Markdown>{summary}</Markdown>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogSummarizer;
