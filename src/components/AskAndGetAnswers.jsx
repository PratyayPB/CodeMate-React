import React, { useState, useRef, useEffect } from "react";
import { Bot, Mic, Minus } from "lucide-react";
import { useChat } from "../hooks/useChat";

const AskAndGetAnswers = () => {
  const [inputVal, setInputVal] = useState("");
  const { messages, isLoading, sendMessage } = useChat();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    sendMessage(inputVal);
    setInputVal("");
  };

  return (
    <section
      id="ask-and-get-answers-section"
      className="flex self-center items-center justify-center w-full max-w-[85vw] mx-auto py-12 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-[2.5rem] bg-[#222222] p-8 sm:p-12 md:p-16 shadow-2xl w-full">
        {/* Header */}
        <div className="mb-10 max-w-4xl">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-white uppercase leading-tight">
            ASK & GET ANSWERS
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#999999] mt-4">
            Ask MateBot — built on real student journeys and experiences. Get
            instant insights from our collective intelligence.
          </p>
        </div>

        {/* Interactive Chat Mockup Container */}
        <div className="mx-auto rounded-[1.25rem] border border-[#333333] bg-[#2a2a2a] overflow-hidden flex flex-col h-[500px]">
          {/* Mockup Header Bar */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#3a3a3a]">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[#f98833]" />
              <div className="text-[11px] font-bold text-white tracking-[0.15em] ">
                MateBot
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#d04242]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#6a6a6a]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#8a8a8a]" />
            </div>
          </div>

          {/* Chat Messages Log */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-8 py-6 flex flex-col space-y-4"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col mb-4 self-start w-full">
                <div className="mb-2">
                  <span className="text-xs text-[#777777] font-mono font-medium">
                    MateBot \\
                  </span>
                </div>
                <div className="bg-[#3a3a3a] rounded-2xl p-5 max-w-[85%] shadow-sm">
                  <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                    MateBot online. I am synced with CodeMate's Network. What do
                    you want to know?
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isAI = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex flex-col w-full ${isAI ? "items-start" : "items-end"}`}
                  >
                    <div className="mb-1">
                      <span className="text-[10px] text-[#777777] font-mono font-medium uppercase">
                        {isAI ? "MateBot \\\\" : "User \\\\"}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl p-4 max-w-[85%] shadow-sm ${isAI ? "bg-[#3a3a3a] text-white" : "bg-[#f98833] text-black"}`}
                    >
                      <p className="text-sm sm:text-base font-medium leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            {isLoading && (
              <div className="flex flex-col w-full items-start">
                <div className="mb-1">
                  <span className="text-[10px] text-[#777777] font-mono font-medium uppercase">
                    MateBot \\
                  </span>
                </div>
                <div className="bg-[#3a3a3a] rounded-2xl p-4 shadow-sm flex items-center gap-1.5 h-[52px]">
                  <div
                    className="h-1.5 w-1.5 bg-[#888888] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-1.5 w-1.5 bg-[#888888] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-1.5 w-1.5 bg-[#888888] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Footer Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 pb-8 flex items-center gap-4 border-t border-[#3a3a3a] pt-4 mt-auto bg-[#2a2a2a]"
          >
            <button
              type="button"
              className="bg-[#3a3a3a] text-[#f98833] hover:text-[#ff9c2a] hover:bg-[#444444] transition-colors p-3.5 rounded-xl flex-shrink-0 shadow-sm"
              aria-label="Use Microphone"
            >
              <Mic className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="[ DROP YOUR QUERY ]"
                className="w-full bg-[#3a3a3a] border border-transparent rounded-xl px-5 py-4 text-white placeholder-[#777777] text-sm focus:outline-none focus:border-[#f98833]/50 font-mono tracking-wide shadow-sm disabled:opacity-50"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="bg-[#f98833] text-black hover:bg-[#ffa050] disabled:bg-[#a6591f] disabled:cursor-not-allowed transition-colors text-xs font-bold px-6 py-4 rounded-xl flex items-center gap-2 flex-shrink-0 tracking-wider shadow-sm"
            >
              <span>ENTER</span>
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Small Bottom Left Button */}
        <button className="absolute bottom-6 left-6 bg-[#3a3a3a] p-2.5 rounded-lg text-[#777777] hover:text-white transition-colors shadow-sm">
          <Minus className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default AskAndGetAnswers;
