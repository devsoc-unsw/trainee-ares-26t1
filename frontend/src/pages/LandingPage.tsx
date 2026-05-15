import { useState } from "react";
import { testApi } from "../api/api";
import { Link } from "react-router-dom";
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
      <div className="flex flex-col items-center justify-center gap-10 h-[70vh]">
        <WoodContainer>
            <h1 className="text-theme-black text-center text-5xl">Meowmentum :3</h1>
        </WoodContainer>
        <Link to='/login' className="bg-theme-yellow text-theme-black border-transparent shadow-xl rounded-2xl mt-10 p-5 text-xl w-[20vw] flex justify-center">
          Login / Sign Up
        </Link>
      </div>
    </WoodContainer>
  );
}

export default LandingPage;
