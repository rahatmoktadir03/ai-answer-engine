"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Link,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Globe,
  MessageSquare,
  ExternalLink,
  Trash2,
  Share2,
} from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
  sources?: string[];
  timestamp: Date;
}

export default function ChatInterface() {
  const [question, setQuestion] = useState("");
  const [urls, setUrls] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !urls.trim()) {
      setError("Please provide both a question and URLs.");
      return;
    }

    setError(null);
    setLoading(true);

    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          urls: urls.split(",").map(url => url.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
      }

      const data = await response.json();
      const aiResponse =
        data.answer?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      const aiMessage: Message = {
        role: "ai",
        content: aiResponse,
        sources: urls.split(",").map(url => url.trim()),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: unknown) {
      console.error(err);
      setError("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const shareConversation = async () => {
    if (messages.length === 0) {
      setError("No conversation to share");
      return;
    }

    try {
      const conversationText = messages
        .map(msg => {
          const timestamp = formatTime(msg.timestamp);
          const role = msg.role === "user" ? "You" : "AI";
          let text = `[${timestamp}] ${role}: ${msg.content}`;

          if (msg.sources && msg.sources.length > 0) {
            text += `\n\nSources:\n${msg.sources.map(source => `• ${source}`).join("\n")}`;
          }

          return text;
        })
        .join("\n\n---\n\n");

      const fullText = `Insight Conversation\n\n${conversationText}`;

      if (navigator.share && navigator.canShare({ text: fullText })) {
        await navigator.share({
          title: "Insight Conversation",
          text: fullText,
        });
      } else {
        await navigator.clipboard.writeText(fullText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to share conversation: ", err);
      setError("Failed to share conversation");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-lg bg-gray-900/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Insight
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 rounded-lg border border-gray-600 hover:border-red-500 hover:bg-red-500/10 transition-all duration-200"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={shareConversation}
                className="p-2 rounded-lg border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 relative"
                title="Share conversation"
              >
                {shareSuccess ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URLs Input */}
            <div className="space-y-2">
              <label
                htmlFor="urls"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <Globe className="w-4 h-4" />
                Source URLs (comma-separated)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="urls"
                  value={urls}
                  onChange={e => setUrls(e.target.value)}
                  placeholder="https://example.com, https://another.com"
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
                <Link className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Question Input */}
            <div className="space-y-2">
              <label
                htmlFor="question"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <MessageSquare className="w-4 h-4" />
                Your Question
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="question"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Ask your question..."
                  className="w-full p-4 pr-14 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim() || !urls.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages */}
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-4xl rounded-2xl p-6 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-full ${
                          message.role === "user"
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-blue-600 to-purple-600"
                        }`}
                      >
                        {message.role === "user" ? (
                          <MessageSquare className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium">
                        {message.role === "user" ? "You" : "AI Assistant"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(message.content, index)}
                        className="p-1 rounded hover:bg-white/10 transition-colors"
                        title="Copy message"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-white leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Sources:
                      </h4>
                      <div className="space-y-2">
                        {message.sources.map((source, sourceIndex) => (
                          <a
                            key={sourceIndex}
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors group"
                          >
                            <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                            <span className="truncate">{source}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Message */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="max-w-4xl rounded-2xl p-6 bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                    <span className="text-gray-300">
                      Analyzing sources and generating response...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {messages.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Ask Your First Question
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Provide some URLs as sources and ask a question to get started
              with our AI-powered answer engine.
            </p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
