"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import ReactMarkdown from "react-markdown";

const DocumentChat = ({ token }) => {
  const [projectName, setProjectName] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]); // {role: "user"|"bot", text: "..."}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to newest message whenever messages or loading changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Step 1: Create session + initial feed
  const createSession = async () => {
    if (!projectName.trim()) return;

    try {
      setError("");
      setLoading(true);

      // Create session
      const res = await fetch(
        "https://api.devwings.com/understanding-documents/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: JSON.stringify({ project_name: projectName }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error: ${res.status} ${text}`);
      }

      const data = await res.json();
      setSessionId(data.session_id);

      // Immediately hit feed API with project name as initial message
      await initialFeed(data.session_id, projectName);
    } catch (err) {
      console.error(err);
      setError("Failed to create session. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const initialFeed = async (sessionId, projectName) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.devwings.com/understanding-documents/sessions/${sessionId}/feed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: projectName,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Feed API Error: ${res.status} ${text}`);
      }

      const data = await res.json();
      const botMessage = { role: "bot", text: data.ai_response || "" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Failed to initialize feed.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Send user chat message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.devwings.com/understanding-documents/sessions/${sessionId}/feed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: input,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error: ${res.status} ${text}`);
      }

      const data = await res.json();
      const botMessage = { role: "bot", text: data.ai_response || "" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">
            Document Understanding Chat
          </h1>

          {/* Step 1: Enter Project Name */}
          {!sessionId && (
            <div className="bg-white shadow p-6 rounded-xl space-y-4">
              <label className="block font-medium mb-1">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter project name..."
              />
              <button
                onClick={createSession}
                disabled={loading || !projectName.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Start Session"}
              </button>
              {error && <p className="text-rose-500">{error}</p>}
            </div>
          )}

          {/* Step 2: Chat UI */}
          {sessionId && (
            <div className="mt-8 bg-white shadow rounded-xl p-6">
              <div className="h-[60vh] overflow-y-auto space-y-4 border-b pb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 max-w-md  ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-l"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {/* Loader */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 italic">
                      typing...
                    </div>
                  </div>
                )}

                {/* Scroll target */}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow border rounded p-2"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
              {error && <p className="text-rose-500 mt-2">{error}</p>}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DocumentChat;
