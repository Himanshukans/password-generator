import { useCallback, useState, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);

    // "Copied" animation logic
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [password]);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-[#050505] overflow-x-hidden p-4">
        {/* Dynamic Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[130px] animate-pulse"></div>

        <div className="relative w-full max-w-[400px] mx-auto shadow-[0_0_60px_rgba(34,_211,_238,_0.2)] rounded-[2.5rem] px-5 md:px-8 py-10 bg-[#0f0f0f] border border-white/5 text-white">
          <h1 className="text-4xl font-black text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent italic tracking-tighter">
            Password Generator
          </h1>

          {/* input & button group */}
          <div className="relative flex items-center p-1 rounded-2xl mb-2 bg-gradient-to-r from-cyan-500 to-purple-600 group shadow-lg hover:shadow-cyan-500/20 transition-all">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-4 px-5 bg-[#0a0a0a] rounded-xl text-cyan-400 font-mono text-xl"
              placeholder="Generating..."
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className={`px-6 font-black uppercase text-xs tracking-widest transition-all duration-300 cursor-pointer ${isCopied ? "text-green-400" : "text-white/80"}`}
            >
              {isCopied ? "DONE" : "COPY"}
            </button>
          </div>

          {/* strength text */}
          <p
            className={`text-[10px] uppercase tracking-[0.3em] mb-8 font-bold ml-2 ${length < 10 ? "text-red-500" : length < 15 ? "text-yellow-500" : length < 20 ? "text-green-500" : "text-blue-500"}`}
          >
            Security:{" "}
            {length < 10
              ? "Weak"
              : length < 15
                ? "Medium"
                : length < 20
                  ? "Hard"
                  : "Very-Hard"}
          </p>

          <div className="space-y-8">
            {/* slider section */}
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  Length Control
                </label>

                {/* Grout of Button & Number */}
                <div className="flex items-center gap-2 bg-[#0a0a0a] p-1 rounded-xl border border-white/5">
                  {/* minus button */}
                  <button
                    onClick={() => setLength((prev) => Math.max(6, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 active:scale-90 text-cyan-400 font-bold transition-all"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="text-2xl font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(34, 211, 238, 0.5)] min-w-[30px] text-center">
                    {length}
                  </span>

                  {/* plus button */}
                  <button
                    onClick={() => setLength((prev) => Math.min(50, prev + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 active:scale-90 text-cyan-400 font-bold transition-all"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>

            {/* options grid */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setNumberAllowed((prev) => !prev)}
                className={`group flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${numberAllowed ? "bg-cyan-500/10 border-cyan-500/50" : "bg-white/5 border-white/5"}`}
              >
                <label className="cursor-pointer text-xs uppercase font-bold tracking-tighter">
                  Numbers
                </label>
                <div
                  className={`w-2 h-2 rounded-full ${numberAllowed ? "bg-cyan-400 animate-ping" : "bg-gray-600"}`}
                ></div>
              </div>

              {/* special char checkbox */}
              <div
                onClick={() => setCharAllowed((prev) => !prev)}
                className={`group flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${charAllowed ? "bg-purple-500/10 border-purple-500/50" : "bg-white/5 border-white/5"}`}
              >
                <label className="cursor-pointer text-xs uppercase font-bold tracking-tighter">
                  Symbols
                </label>
                <div
                  className={`w-2 h-2 rounded-full ${charAllowed ? "bg-purple-400 animate-ping" : "bg-gray-600"}`}
                ></div>
              </div>
            </div>

            {/* Refresh button */}
            <button
              onClick={passwordGenerator}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.4em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              Refresh Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
