import { useState } from "react";

function App() {
  const [helloString, setHelloString] = useState<string>("");

  const testApi = async () => {
    try {
      const res = await fetch("http://localhost:5000/hi", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      setHelloString(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Meowmentum :3</h1>
      <button onClick={testApi}>Click Me to check api!</button>
      <p>{helloString ? helloString : "Nothing is here"}</p>
    </div>
  );
}

export default App;
