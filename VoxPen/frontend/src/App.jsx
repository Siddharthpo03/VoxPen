import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import TranscriptBox from "./components/TranscriptBox";
import Footer from "./components/Footer";
import History from "./components/History";
import Auth from "./components/Auth";

function App() {
  const [transcript, setTranscript] = useState("");

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!session) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/upload`,
          formData,
        );

        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [session]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      {!session ? (
        <Auth />
      ) : (
        <>
          <Navbar />

          <div className="flex flex-col sm:flex-row items-center justify-between px-6 mt-6 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl shadow-lg">
              <p className="text-zinc-400 text-sm">Logged in as</p>

              <p className="text-purple-400 font-semibold break-all">
                {session.user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Logout
            </button>
          </div>

          <Hero />

          <UploadBox
            setTranscript={setTranscript}
            loading={loading}
            setLoading={setLoading}
            session={session}
            setHistory={setHistory}
          />

          <TranscriptBox
            transcript={transcript}
            loading={loading}
            history={history}
          />

          <History history={history} />

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
