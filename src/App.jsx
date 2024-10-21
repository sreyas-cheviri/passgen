import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setnumberAllowed] = useState(true);
  const [charAllowed, setcharAllowed] = useState(true);
  const [password, setpassword] = useState(" ");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*:>?,.'`~;|<";
    for (let i of Array.from({length})) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [setpassword, length, numberAllowed, charAllowed]);

  const copypasstocpliboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-6xl md:text-8xl m-10 md:m-20  items-center flex justify-center">🔑</h1>
  
      <div className="flex flex-col p-1 items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center font-bold shadow-md rounded-lg px-6 py-6 md:px-8 md:py-8 my-4 bg-amber-400">
          <h2 className="text-lg md:text-xl lg:text-2xl mb-4"> Your Password</h2>
          
          <div className="flex shadow mb-4 mt-4 rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 md:py-4 px-3 text-sm md:text-base"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copypasstocpliboard}
              className="bg-black text-white px-2 py-2 md:px-3 md:py-3 text-sm md:text-base shrink-0 hover:bg-slate-600"
            >
              COPY
            </button>
          </div>
  
          <div className="flex text-sm gap-x-2 flex-col md:flex-row md:gap-4">
            <div className=" items-center  gap-x-1 w-full">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer accent-black w-full"
              />
              <label className="text-black ml-1 text-sm md:text-base"> Length: {length}</label>
            </div>
  
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0 w-full">
              <div className="flex items-center gap-x-1 w-full md:w-auto">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberinput"
                  className="accent-black"
                  onChange={() => setnumberAllowed((prev) => !prev)}
                />
                <label className="text-black text-sm md:text-base">Numbers {numberAllowed}</label>
              </div>
  
              <div className="flex items-center gap-x-1 w-full md:w-auto">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charinput"
                  className="accent-black"
                  onChange={() => setcharAllowed((prev) => !prev)}
                />
                <label className="text-black text-sm md:text-base">Characters {charAllowed}</label>
              </div>
            </div>
          </div>
        </div>
        <button 
        onClick={passwordGenerator }
        className="mx-1 bg-white rounded py-2 px-10 font-bold hover:bg-amber-400 ">Generate new password</button>
      </div>
    </>
  );
}

export default App;
