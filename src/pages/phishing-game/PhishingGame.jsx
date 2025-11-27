import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { game_levels } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";

export default function PhishingGame() {
    const [level, setLevel] = useState(0);
    const [found, setFound] = useState(0);
    const [usedChances, setUsedChances] = useState(0);
    const [gameState, setGameState] = useState("playing");
    const { data, loading, fetchData, error } = useFetch("/score", "POST", false);

    const navigate = useNavigate();
    const current = game_levels[level];

    const handleSelect = (index) => {
        if (gameState !== "playing") return;
        const part = current.emailBody[index];

        if (part.isSuspicious) {
            if (!part.clicked) {
                part.clicked = true;
                setFound((f) => f + 1);
                setUsedChances((c) => c + 1);
            }
        } else {
            setUsedChances((c) => c + 1);
        }
    };

    if (gameState === "playing") {
        if (found === current.count) {
            setGameState("completed-level");
        } else if (usedChances >= current.chances) {
            setGameState("failed");
        }
    }

    useEffect(() => {
        if (gameState == "failed" || level === game_levels.length - 1) {
            const saved = JSON.parse(localStorage.getItem("quiz_user"));
            if (saved) {
                fetchData({
                    "firstname": saved.firstname,
                    "lastname": saved.lastname,
                    "email": saved.email,
                    "kind": "game",
                    "score": (level * 2).toString()
                })
            }
        }
    }, [gameState])

    if (gameState === "failed") {
        return (
            <>
                {loading && <Loader loading={loading} text="Saving your score" />}
                <div className="bg-gray-950 min-h-screen flex justify-center px-4">
                    <div className="w-full max-w-full mt-10 bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
                        <p className="text-xl text-gray-400 mb-8">You reached the allowed mistakes.</p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => {
                                    game_levels.forEach((l) => l.emailBody.forEach((p) => (p.clicked = false)));
                                    setLevel(0);
                                    setFound(0);
                                    setUsedChances(0);
                                    setGameState("playing");
                                }}
                                className="flex-1 bg-purple-600 py-3 rounded-xl text-white font-bold hover:bg-purple-700 transition"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 bg-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                            >
                                Back to Learning
                            </button>

                            <button
                                onClick={() => navigate("/scores")}
                                className="flex-1 bg-purple-800 text-white py-3 rounded-xl font-bold hover:bg-purple-900 transition"
                            >
                                View Your Scores
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (gameState === "completed-level") {
        const last = level === game_levels.length - 1;
        return (
            <>
                {loading && <Loader loading={loading} text="Saving your score" />}
                <div className="bg-gray-950 min-h-screen flex justify-center px-4">
                    <div className="w-full max-w-full mt-10 bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800 text-white text-center">

                        <h2 className="text-3xl font-bold mb-4">
                            {last ? "Game Completed" : "Level Completed"}
                        </h2>

                        <p className={`text-xl font-bold mb-8 ${last ? "text-green-400" : "text-purple-400"}`}>
                            {last ? "🎉 You completed all levels!" : "Great! You found all indicators."}
                        </p>

                        <p className="text-gray-300 mb-8">{current.explanation}</p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">

                            {!last && (
                                <button
                                    onClick={() => {
                                        game_levels[level].emailBody.forEach((p) => (p.clicked = false));
                                        setLevel((l) => l + 1);
                                        setFound(0);
                                        setUsedChances(0);
                                        setGameState("playing");
                                    }}
                                    className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    Next Level
                                </button>
                            )}

                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 bg-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                            >
                                Back to Learning
                            </button>

                            {last && (
                                <button
                                    onClick={() => navigate("/scores")}
                                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                                >
                                    View Your Scores
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }



    return (
        <div className="max-w-full mx-auto p-4 pt-8 bg-gray-950 min-h-screen">
            <div className="flex justify-between items-center mb-6 text-white">
                <div className="flex items-center gap-2">
                    <span className="bg-gray-800 px-4 py-1 rounded-full text-sm font-mono">
                        Level {level + 1}/{game_levels.length}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-gray-400">Found:</span>
                    <span className="text-green-400 font-bold text-xl">{found}/{current.count}</span>
                    <span className="mx-3">|</span>
                    <span className="text-gray-400">Remaining Chances:</span>
                    <span className="text-red-400 font-bold text-xl">{current.chances - usedChances}/{current.chances}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-2xl overflow-hidden text-gray-800 flex flex-col min-h-[500px] border-t-8 border-purple-600">
                    <div className="bg-gray-100 p-3 border-b flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <ArrowLeft size={18} className="text-black" />
                            <ArrowRight size={18} className="text-gray-400" />
                            <RotateCcw size={18} className="text-black" />
                        </div>
                        <div className="ml-4 bg-white px-3 py-1 rounded-md text-xs text-gray-500 flex-1 text-center border shadow-sm flex items-center justify-center gap-2">
                            https://mail.google.com/mail/u/0/#inbox/FMfcgzQcqtXwqNxfhKVsjCQFfmVbTQrV
                        </div>
                    </div>

                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold mb-4">{current.subject}</h3>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">?</div>
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900">{current.senderName || current.sender}</div>
                                <div className="text-sm text-gray-500">{current.senderEmail}</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 flex-1 bg-gray-50 font-sans whitespace-pre-line leading-relaxed">
                        {current.emailBody.map((part, idx) => (
                            <span
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`
                  cursor-pointer transition-all px-1 rounded
                  ${part.clicked ? "bg-green-300 text-green-900 border-b-2 border-green-600" : ""}
                  ${!part.clicked && usedChances >= current.chances ? "opacity-40" : ""}
                `}
                            >
                                {part.text}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg text-white mb-4">
                        <h3 className="font-bold mb-4">Instructions</h3>
                        <p className="text-gray-300 text-sm">Click on all phishing indicators in the email. Selecting incorrectly will cost you a chance.</p>
                        <p className="mt-3 text-xs text-gray-400">Find {current.count} phishing items</p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
                        <h3 className="font-bold mb-4">Status</h3>
                        <p className="text-green-400 mb-2">Correct Selections: {found}/{current.count}</p>
                        <p className="text-red-400">Remaining Chances: {current.chances - usedChances}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
