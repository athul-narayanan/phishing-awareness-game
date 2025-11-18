import { useNavigate } from "react-router-dom";
import { videos } from "../../constants/constants";

export default function LearnPhishing() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-950 text-white flex justify-center px-4">
            <div className="w-full max-w-full mt-10 bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800">

                <h2 className="text-3xl font-bold mb-10 text-purple-400">
                    Phishing Awareness
                </h2>

                <p className="text-gray-300 text-lg font-bold leading-relaxed mb-10">
                    The application teaches you phishing attacks and how to identify them.
                    Watch Videos and then try quiz and game to check your understanding
                </p>

                <div className="grid max-w-full grid-cols-1 lg:grid-cols-2 gap-10">

                    {videos.map(video => (
                        <div key={video.title} className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                            <iframe
                                className="w-full aspect-video"
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ))}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <button
                        onClick={() => navigate("/quiz")}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Start Quiz
                    </button>

                    <button
                        onClick={() => navigate("/game")}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Start Game
                    </button>
                </div>


            </div>
        </div>
    );
}
