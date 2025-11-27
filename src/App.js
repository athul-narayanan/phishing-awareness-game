import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LearnPhishing from "./pages/learn-phishing/LearnPhishing";
import PhishingQuiz from "./pages/phishing-quiz/PhishingQuiz";
import PhishingGame from "./pages/phishing-game/PhishingGame";
import Scores from "./pages/score/score";

export default function App() {
  return (
    <div style={{boxSizing: "border-box"}} className="min-h-screen bg-gray-950 text-white flex flex-col">
      <BrowserRouter>
        <Header />

        <div className="flex-grow flex justify-center px-1 py-0">
          <div className="w-full max-w-full px-0 lg:px-[10%]">
            <Routes>
              <Route path="/" element={<LearnPhishing />} />
              <Route path="/quiz" element={<PhishingQuiz/>}/>
              <Route path="/game" element={<PhishingGame/>}/>
              <Route path="/scores" element={<Scores/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
