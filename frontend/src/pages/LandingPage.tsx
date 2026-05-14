import { useState } from "react";
import { testApi } from "../api/api";
import WoodContainer from "../components/WoodContainer";

const LandingPage = () => {
  const [helloString, setHelloString] = useState<string>("");

  const handleClick = async () => {
    try {
      const data = await testApi();
      setHelloString(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WoodContainer>
    <div className="flex flex-col items-center justify-center gap-6">
      <WoodContainer>
        <h1 className="text-theme-black text-center">Meowmentum :3</h1>
      </WoodContainer>
      <button className="bg-theme-yellow text-theme-black" onClick={handleClick}>Click Me to check api!</button>
      <p>{helloString ? helloString : "Nothing is here"}</p>
    </div>
    </WoodContainer>
  );
}

export default LandingPage;
