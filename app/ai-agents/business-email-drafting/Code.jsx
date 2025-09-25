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

const BusinessEmail = () => {
  const [emailPrompt, setEmailPrompt] = useState("");
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

    if (!emailPrompt.trim()) {
      setError("Enter your email request");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const usetool = await useTool("business-email", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/business-email-drafting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: emailPrompt }),
        // credentials: "omit",
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const suggestion =
        data?.choices?.[0]?.["message"]?.["content"] || "No email generated.";

      setResults(suggestion);

      await saveChat({
        email,
        toolName: "business-email",
        prompt: { user_input: emailPrompt },
        response: suggestion,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Enter Your Email Request</h4>

          <textarea
            placeholder="Describe the email you want to generate..."
            value={emailPrompt}
            onChange={(e) => setEmailPrompt(e.target.value)}
            className="p-3 border rounded-md w-full"
            rows={6}
          />

          <p className="text-rose-500">{error}</p>

          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {results && (
          <div className="space-y-4 my-10">
            <h3>Generated Business Email</h3>
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

export default BusinessEmail;
