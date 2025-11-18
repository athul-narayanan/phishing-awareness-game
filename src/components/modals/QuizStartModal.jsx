import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizStartModal({location}) {
  const [open, setOpen] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quiz_user"));
    if (saved) {
      setFirstname(saved.firstname);
      setLastname(saved.lastname);
      setEmail(saved.email);
      setOpen(false);
      setConfirmOpen(true);
    }
  }, []);

  const saveUser = () => {
    const user = { firstname, lastname, email };
    localStorage.setItem("quiz_user", JSON.stringify(user));
    setOpen(false);
    navigate(location)
  };

  const confirmUser = () => {
    setConfirmOpen(false);
    navigate(location)
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col max-h-[85vh] overflow-y-auto animate-[fadeIn_0.25s_ease,scaleIn_0.25s_ease]">

            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <h1 className="text-2xl font-extrabold text-center text-black">Welcome</h1>
              <h2 className="text-lg font-semibold text-center text-black mt-1">Enter Your Details</h2>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-2.5 text-base border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-2.5 text-base border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-base border rounded-lg"
                />
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={saveUser}
                className="w-full bg-purple-600 text-white py-2.5 text-base rounded-lg font-semibold"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col max-h-[85vh] overflow-y-auto text-center animate-[fadeIn_0.25s_ease,scaleIn_0.25s_ease]">

            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <h1 className="text-2xl font-extrabold text-black">Confirm</h1>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-black">
                Continue as <span className="font-bold">{firstname} {lastname}</span>?
              </h2>
              <p className="text-gray-600 mt-1 text-base">{email}</p>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    localStorage.removeItem("quiz_user");
                    setConfirmOpen(false);
                    setOpen(true);
                  }}
                  className="px-5 py-2 border text-black rounded-lg"
                >
                  No
                </button>

                <button
                  onClick={confirmUser}
                  className="px-5 py-2 bg-purple-600 text-white text-base rounded-lg"
                >
                  Continue
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn { 
            0% { opacity: 0; } 
            100% { opacity: 1; }
          }
          @keyframes scaleIn { 
            0% { transform: scale(0.96); } 
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}
