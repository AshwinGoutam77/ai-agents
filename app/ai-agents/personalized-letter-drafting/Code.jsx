"use client";
import Header from "@/app/components/Header";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Container from "@/app/components/Container";
import Cookies from "js-cookie";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import "../tools.css";
import Loader from "@/components/ui/Loader";

const Code = () => {
  const [letterDescription, setLetterDescription] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const email = Cookies.get("user_email"); // read fresh each time
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!letterDescription.trim()) {
      setError("Enter letter description");
      return;
    }
    if (letterDescription.trim().length < 30) {
      setError("Letter description must be at least 30 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // ✅ check usage limit
      const usetool = await useTool("personalized-letter-drafting", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      // ✅ Call our new API route instead of hitting external API directly
      const response = await fetch("/api/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: letterDescription }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      // Extract model output text
      const suggestion =
        data?.choices?.[0]?.message?.content || "No suggestions returned.";

      setResults(suggestion);

      // ✅ save chat history
      await saveChat({
        email,
        toolName: "personalized-letter-drafting",
        prompt: { letter_description: letterDescription },
        response: suggestion,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Enter Letter Info</h4>

          {/* Letter Description */}
          <textarea
            placeholder="Paste letter description here..."
            value={letterDescription}
            onChange={(e) => setLetterDescription(e.target.value)}
            className="p-3 border rounded-md w-full"
            rows={6}
          />

          <p className="text-rose-500">{error}</p>

          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full"
          >
            {loading ? "Generating..." : "Generate Letter"}
          </button>
        </form>

        {/* Results */}
        {results && (
          <div className="space-y-4 my-10">
            <h3>Generated Letter</h3>
            <div className="p-4 rounded-lg shadow bg-white whitespace-pre-line max-h-[700px] overflow-auto pb-4">
              <ReactMarkdown>{results}</ReactMarkdown>
            </div>
          </div>
        )}

        <Loader />
      </Container>
    </div>
  );
};

export default Code;
