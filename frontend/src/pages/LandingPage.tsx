import { Link } from "react-router-dom";
import WoodContainer from "../components/WoodContainer";

const LandingPage = () => {
  return (
    <div className="flex h-screen jusitfy-center items-center ml-2 md:ml-[12vw]">
      <WoodContainer>
        <div className="flex flex-col items-center justify-center gap-5 md:gap-10 w-[70vw] h-[30vh] md:h-[70vh]">
          <WoodContainer>
            <h1 className="text-theme-black text-center text-2xl md:text-5xl">
              Meowmentum :3
            </h1>
          </WoodContainer>
          <Link
            to="/login"
            className="bg-theme-yellow hover:bg-theme-yellow/80 text-theme-black border-transparent shadow-xl rounded-2xl mt-10 p-2 md:p-5 text-xl md:w-[20vw] flex justify-center"
          >
            Login / Register
          </Link>
        </div>
      </WoodContainer>
    </div>
  );
};

export default LandingPage;
