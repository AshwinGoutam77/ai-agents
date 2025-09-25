"use client";
import Header from "@/app/components/Header";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import AgentsHero from "@/app/components/AgentsHero";
import Container from "@/app/components/Container";
import Cookies from "js-cookie";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "@/hooks/useTool";
const Code = ({ token }) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [suggestionType, setSuggestionType] = useState("");
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

    if (!projectDescription.trim()) {
      setError("Enter project description");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const usetool = await useTool("system-improvement", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.devwings.com/ai/Ai-features", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_description: projectDescription,
          suggestion_type: parseInt(suggestionType, 10),
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setResults(data.suggestions || "No suggestions returned.");
      await saveChat({
        email,
        toolName: "system-improvement",
        prompt: {
          project_description: projectDescription,
          suggestion_type: suggestionType,
        },
        response: data,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AgentsHero />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Enter Project Info</h4>

          {/* Project Description */}
          <textarea
            placeholder="Paste project description here..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="p-3 border rounded-md w-full"
            rows={6}
          />

          {/* Suggestion Type */}
          <select
            value={suggestionType}
            onChange={(e) => setSuggestionType(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="" defaultValue={""}>
              Select Suggestion Type
            </option>
            <option value="1">AI Features</option>
            <option value="2">Non-AI Features</option>
            <option value="3">Both</option>
          </select>

          <p className="text-rose-500">{error}</p>

          {/* <Secondarybtn
            disabled={loading}
            text={loading ? "Generating..." : "Generate Suggestions"}
            isIcon={false}
            type="submit"
          /> */}
          <button className=" bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full">
            {loading ? "Generating..." : "Generate Suggestions"}
          </button>
        </form>

        {/* Results */}
        {results ? (
          <div className="space-y-4 my-10">
            <h3>Generated Feature Suggestions</h3>
            <div className="p-4 rounded-lg shadow bg-white whitespace-pre-line max-h-[700px] overflow-auto pb-4">
              <ReactMarkdown>{results}</ReactMarkdown>
            </div>
          </div>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Code;
