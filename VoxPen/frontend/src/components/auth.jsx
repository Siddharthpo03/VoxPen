import { useState } from "react";
import { supabase } from "../lib/supabase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      setLoading(true);

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        alert("Login successful!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Signup successful! Check your email.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16 px-6">
      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <div className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            className="bg-purple-600 hover:bg-purple-700 py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>

          <div className="text-center text-zinc-400">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: "pointer" }}
              className="text-purple-400 ml-2 hover:text-purple-300 transition-colors"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
