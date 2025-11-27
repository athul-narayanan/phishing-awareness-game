import React, { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Scores() {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);

  const { data, loading, error, fetchData } = useFetch("/score", "GET", false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quiz_user"));
    if (saved && saved.email) {
      setFirstname(saved.firstname || "");
      setLastname(saved.lastname || "");
      setEmail(saved.email);
      setSearchEmail(saved.email);
      fetchData(null, { email: saved.email });
    } else {
      setShowModal(true);
    }
  }, []);

  const handleModalSubmit = () => {
    if (!email) return;
    const payload = { firstname, lastname, email };
    localStorage.setItem("quiz_user", JSON.stringify(payload));
    setShowModal(false);
    setSearchEmail(email);
    fetchData(null, { email });
  };

  const handleSearch = () => {
    if (!searchEmail) return;
    fetchData(null, { email: searchEmail });
  };

  const scores = useMemo(() => {
    if (!data || !data.scores) return [];
    return data.scores;
  }, [data]);

  const { quizLabels, quizScores, gameLabels, gameScores } = useMemo(() => {
    if (!scores.length) return { quizLabels: [], quizScores: [], gameLabels: [], gameScores: [] };

    const quiz = scores.filter((s) => s.kind === "quiz").map((s, idx) => ({
      label: `#${idx + 1}`,
      score: Number(s.score),
    }));

    const game = scores.filter((s) => s.kind === "game").map((s, idx) => ({
      label: `#${idx + 1}`,
      score: Number(s.score),
    }));

    return {
      quizLabels: quiz.map((x) => x.label),
      quizScores: quiz.map((x) => x.score),
      gameLabels: game.map((x) => x.label),
      gameScores: game.map((x) => x.score),
    };
  }, [scores]);

  const quizChart = {
    labels: quizLabels,
    datasets: [
      {
        label: "Quiz Score",
        data: quizScores,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const gameChart = {
    labels: gameLabels,
    datasets: [
      {
        label: "Game Score",
        data: gameScores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#e5e7eb" } },
      tooltip: { intersect: false, mode: "index" },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(55, 65, 81, 0.4)" } },
      y: { ticks: { color: "#9ca3af", stepSize: 1 }, grid: { color: "rgba(55, 65, 81, 0.4)" }, beginAtZero: true },
    },
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="bg-gray-950 min-h-screen text-white px-4 pt-8 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Your Scores</h2>
              <p className="text-gray-400 text-sm mt-1">View your phishing awareness score over time.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Enter email to view scores"
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">
                Search
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/60 text-red-200 px-4 py-3 rounded-xl text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl w-full">
              <h3 className="text-xl font-bold mb-4">Scores Over Time</h3>
              <div className="bg-gray-950/40 rounded-xl p-4 mb-6 w-full">
                <div className="w-full" style={{ height: "200px" }}>
                  <Line data={quizChart} options={chartOptions} />
                </div>
              </div>
              <div className="bg-gray-950/40 rounded-xl p-4 w-full">
                <div className="w-full" style={{ height: "200px" }}>
                  <Line data={gameChart} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl flex flex-col">
              <div className="overflow-y-auto custom-scrollbar max-h-80 pr-1">
                <h3 className="text-xl font-bold mb-2">Quiz Attempts</h3>
                <table className="w-full text-sm mb-6">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-800">
                      <th className="py-2 text-left">Attempt</th>
                      <th className="py-2 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizScores.map((score, idx) => (
                      <tr key={idx} className="border-b border-gray-800/60">
                        <td className="py-2 text-gray-300">#{idx + 1}</td>
                        <td className="py-2 text-right font-semibold text-purple-400">{score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="text-xl font-bold mb-2">Game Attempts</h3>
                <table className="w-full text-sm mb-6">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-800">
                      <th className="py-2 text-left">Attempt</th>
                      <th className="py-2 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameScores.map((score, idx) => (
                      <tr key={idx} className="border-b border-gray-800/60">
                        <td className="py-2 text-gray-300">#{idx + 1}</td>
                        <td className="py-2 text-right font-semibold text-blue-400">{score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                onClick={() => setShowAiModal(true)}
                className="mt-4 group cursor-pointer flex flex-col items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-400/50 rounded-2xl p-4 w-full transition-all duration-200"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-purple-600/20 group-hover:bg-purple-600/30 border border-purple-500/30 group-hover:border-purple-400 shadow-md group-hover:shadow-purple-600/30 text-3xl transition-all duration-200">
                  🧠
                </div>
                <span className="text-sm font-semibold text-purple-300 group-hover:text-purple-400">
                  AI Recommendation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Enter Your Details</h3>
            <p className="text-gray-400 text-sm mb-4">
              We could not find your details. Please enter your name and email to view and save your scores.
            </p>
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <input type="text" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleModalSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">Save & View Scores</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-4 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAiModal && data?.recommendation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl aiModal flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <h3 className="text-xl font-bold text-white">AI Recommendation</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-white transition">✕</button>
            </div>

            <div className="p-4 overflow-y-auto text-gray-300 text-sm whitespace-pre-line">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {data.recommendation}
              </ReactMarkdown>
            </div>

            <div className="p-4 border-t border-gray-800 flex justify-end">
              <button onClick={() => setShowAiModal(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
       canvas {
    width: 100% !important;
  }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(75,85,99,0.9);
        border-radius: 999px;
      }
      `}</style>
    </>
  );
}
