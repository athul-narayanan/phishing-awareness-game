import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Lock } from 'lucide-react';
import { questions } from "../../constants/constants"
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';

export default function PhishingQuiz() {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('playing');
    const [selectedType, setSelectedType] = useState(null);
    const navigate = useNavigate()
    const { data, loading, fetchData, error } = useFetch("/score", "POST", false)

    const currentEmail = questions[index];
    const isLastQuestion = (index + 1) % 10 == 0

    const handleAnswer = (type) => {
        setSelectedType(type);
        setGameState('answer');
        if (type === currentEmail.type) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (isLastQuestion) {
            setGameState('completed');
            const saved = JSON.parse(localStorage.getItem("quiz_user"));
            if (saved) {
                fetchData({
                    "firstname": saved.firstname,
                    "lastname": saved.lastname,
                    "email": saved.email,
                    "kind": "quiz",
                    "score": score.toString()
                })
            }
        } else {
            setIndex(prev => prev + 1);
            setGameState('playing');
            setSelectedType(null);
        }
    };

    if (gameState === 'completed') {
        return (
            <>
                {loading && <Loader loading={loading} text="Saving your score" />}
                <div className="bg-gray-950 text-white flex justify-center px-4">
                    <div className="w-full max-w-full mt-10 bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800">
                        <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
                        <p className="text-gray-400 text-xl mb-8 mx-1">
                            You scored <span className="text-purple-400 font-bold">{score}</span> out of <span className="text-white font-bold">{10}</span>
                        </p>
                        {score <= 5 && (
                            <p className="py-2 text-red-300 font-semibold">
                                Your score indicates risk. Review the phishing basics and try again!
                            </p>
                        )}

                        {score >= 6 && score < 10 && (
                            <p className="py-2 text-yellow-300 font-semibold">
                                Good progress! Keep practicing to strengthen your phishing awareness.
                            </p>
                        )}

                        {score === 10 && (
                            <p className="py-2 text-green-400 font-semibold">
                                Excellent! You’re a cyber champion
                            </p>
                        )}

                        <div className="w-full bg-gray-700 rounded-full h-4 mb-8">
                            <div
                                className="bg-gradient-to-r from-purple-600 to-blue-500 h-4 rounded-full transition-all duration-1000"
                                style={{ width: `${(score / 10) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                        >
                            Back to Learning
                        </button>

                        <button
                            onClick={() => navigate("/scores")}
                            className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                        >
                            View Your Scores
                        </button>
                    </div>
                    </div>
                    <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-in forwards;
                    }
                `}</style>
                </div>
            </>
        );
    }

    return (
        <div className="max-w-full mx-auto p-4 pt-8 bg-gray-950 min-h-screen">
            <div className="flex justify-between items-center mb-6 text-white">
                <div className="flex items-center gap-2">
                    <span className="bg-gray-800 px-4 py-1 rounded-full text-sm font-mono">
                        Question {index + 1}/{10}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">Current Score:</span>
                    <span className="text-purple-400 font-bold text-xl">{score}</span>
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
                            <Lock className="w-3 h-3" /> https://mail.google.com/mail/u/0/#inbox/FMfcgzQcqtXwqNxfhKVsjCQFfmVbTQrV
                        </div>
                    </div>


                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold mb-4">{currentEmail.subject}</h3>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                                {currentEmail.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900">{currentEmail.sender}</div>
                                <div className="text-sm text-gray-500">{currentEmail.senderEmail}</div>
                                <div className="text-xs text-gray-400 mt-1">To: rachellechan@gmail.com</div>
                            </div>
                        </div>
                    </div>


                    <div className="p-6 flex-1 bg-gray-50 font-sans whitespace-pre-line leading-relaxed">
                        {currentEmail.emailBody.map((part, idx) => (
                            <span
                                key={idx}
                                className={`
                                    transition-all duration-500
                                    ${(gameState === 'answer' && currentEmail.type === 'phishing' && part.isSuspicious)
                                        ? "bg-red-200 text-red-900 px-1 rounded border-b-2 border-red-400 cursor-help"
                                        : ""}
                                `}
                                title={gameState === 'answer' ? part.reason : ""}
                            >
                                {part.text}
                            </span>
                        ))}
                    </div>
                </div>


                <div className="lg:col-span-1 flex flex-col gap-4">


                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
                        <h3 className="text-white font-bold mb-4">Test Your Knowledge:</h3>
                        <p className="rounded-xl border border-gray-800 shadow-lg py-4"> Is This Email Phishing or Legitimate?</p>
                        <div className="space-y-3">
                            <button
                                disabled={gameState === 'answer'}
                                onClick={() => handleAnswer('legitimate')}
                                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                                    ${gameState === 'playing'
                                        ? 'bg-gray-800 text-green-400 border border-green-500 hover:bg-green-900/30'
                                        : selectedType === 'legitimate'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <CheckCircle className="w-5 h-5" /> Legitimate
                            </button>

                            <button
                                disabled={gameState === 'answer'}
                                onClick={() => handleAnswer('phishing')}
                                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                                    ${gameState === 'playing'
                                        ? 'bg-gray-800 text-red-400 border border-red-500 hover:bg-red-900/30'
                                        : selectedType === 'phishing'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <AlertTriangle className="w-5 h-5" /> Phishing
                            </button>
                        </div>
                    </div>


                    {gameState === 'answer' && (
                        <div className={`p-6 rounded-xl border shadow-lg animate-slide-up ${(selectedType === currentEmail.type)
                            ? "bg-green-900/20 border-green-500/50"
                            : "bg-red-900/20 border-red-500/50"
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                {selectedType === currentEmail.type ? (
                                    <span className="text-green-400 font-bold flex items-center gap-2"><CheckCircle className="w-5 h-5" /> You Did it</span>
                                ) : (
                                    <span className="text-red-400 font-bold flex items-center gap-2"><XCircle className="w-5 h-5" /> Sorry, You are wrong</span>
                                )}
                            </div>

                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                {currentEmail.explanation}
                            </p>

                            {currentEmail.type === 'phishing' && (
                                <div className="text-xs text-red-300 bg-red-900/30 p-2 rounded mb-4">
                                    <span className="font-bold">Guidance:</span> Look the email in the left. Suspicious part is highlighted.
                                </div>
                            )}

                            <button
                                onClick={nextQuestion}
                                className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold hover:bg-gray-200 flex items-center justify-center gap-2"
                            >
                                {isLastQuestion ? "View Results" : "Next Question"} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in forwards;
                }
            `}</style>
        </div>
    );
}