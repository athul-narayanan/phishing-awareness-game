import {useState} from "react"
import { useNavigate } from "react-router-dom";
import { videos } from "../../constants/constants";
import QuizStartModal from "../../components/modals/QuizStartModal"

export default function LearnPhishing() {
    const navigate = useNavigate();
    const [isStartQuizOpen, setStartQuizOpen] = useState(false)
    const [location, setLocation] = useState("")

    const onStartGame = (location)=>{
        setStartQuizOpen(true) 
        setLocation(location)
    }

    return (
        <>
            {isStartQuizOpen && <QuizStartModal location={location}/>}
            <div className="bg-gray-950 text-white flex justify-center px-4">
                <div className="w-full max-w-full mt-10 bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800">

                    <h2 className="text-3xl font-bold mb-10 text-purple-400">
                        Phishing Awareness
                    </h2>

                    <p className="text-gray-300 text-lg font-bold leading-relaxed mb-10">
                       Learn how phishing attacks work and how to recognize them. 
                       Watch the videos, then put your skills to the test with quizzes 
                       and games designed to measure your security awareness.
                    </p>

                    <div className="grid max-w-full grid-cols-1 lg:grid-cols-2 gap-10">

                        {videos.map(video => (
                            <div key={video.title} className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                                <iframe
                                    className="w-full aspect-video"
                                    src={video.url}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        ))}

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <button
                            onClick={() => {
                                onStartGame("/quiz")
                            }}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Start Quiz
                        </button>

                        <button
                            onClick={() => 
                                onStartGame("/game")
                            }
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}
