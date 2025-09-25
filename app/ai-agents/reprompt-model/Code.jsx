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
  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!promptInput.trim()) {
      setError("Enter a prompt to improve");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const usetool = await useTool("reprompt-model", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/reprompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: promptInput }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const suggestion =
        data?.choices?.[0]?.["message"]?.["content"] || "No improved prompt generated.";

      setResults(suggestion);

      await saveChat({
        email,
        toolName: "reprompt-model",
        prompt: { user_input: promptInput },
        response: suggestion,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate improved prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Enter Your Raw Prompt</h4>

          <textarea
            placeholder="Paste the raw prompt you want to improve..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="p-3 border rounded-md w-full"
            rows={6}
          />

          <p className="text-rose-500">{error}</p>

          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full"
          >
            {loading ? "Improving..." : "Improve Prompt"}
          </button>
        </form>

        {results && (
          <div className="space-y-4 my-10">
            <h3>Improved Prompt Suggestions</h3>
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
