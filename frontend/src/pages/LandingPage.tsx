import { useNavigate } from "react-router-dom";
import WoodContainer from "../components/WoodContainer";
import FormButton from "../components/menu/LandingButton";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen jusitfy-center items-center ml-2 md:ml-[12vw]">
      <WoodContainer>
        <div className="flex flex-col items-center justify-center gap-5 md:gap-10 w-[70vw] h-[30vh] md:h-[70vh]">
          <WoodContainer>
            <h1 className="text-theme-black text-center text-2xl md:text-5xl">
              Meowmentum :3
            </h1>
          </WoodContainer>
          <FormButton
            text="Login / Register"
            onClick={() => navigate("/login")}
          />
        </div>
      </WoodContainer>
    </div>
  );
};

export default LandingPage;
