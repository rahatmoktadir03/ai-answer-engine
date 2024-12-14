"use client";

import { useState } from "react";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [urls, setUrls] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !urls.trim()) {
      setError("Please provide both a question and URLs.");
      return;
    }

    setError(null);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          urls: urls.split(",").map((url) => url.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
      }

      const data = await response.json();
      const aiResponse =
        data.answer?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (err: unknown) {
      console.error(err);
      setError("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">AI Chat Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="question" className="block mb-2 font-medium">
          Your Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
        />
        <label htmlFor="urls" className="block mb-2 font-medium">
          URLs (comma-separated):
        </label>
        <input
          type="text"
          id="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="https://example.com, https://another.com"
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              message.role === "user"
                ? "bg-gray-800 text-right"
                : "bg-blue-700 text-left"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
