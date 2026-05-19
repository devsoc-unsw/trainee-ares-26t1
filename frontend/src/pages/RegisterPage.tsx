import { useState } from "react";
import WoodContainer from "../components/WoodContainer";
import { authRegister } from "../api/api";

const RegisterPage = () => {
  const [registerRes, setRegisterRes] = useState("");
  const handleRegiser = async () => {
    try {
      const data = await authRegister();
      setRegisterRes(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[85vw] md:w-screen">
      <WoodContainer>
        <form className="flex flex-col p-5 w-[70vw] h-[30vh] md:w-[30vw] md:h-[50vh] items-center justify-center gap-5 md:gap-10">
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="string"
              required
              className="flex border-1 rounded-md"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              type="password"
              required
              className="flex border-1 rounded-md"
            />
          </div>
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="flex justify-center border-2 rounded-xl w-[20vw] md:w-[10vw]"
              onClick={handleRegiser}
            >
              Login
            </button>
          </div>
        </form>
      </WoodContainer>
    </div>
  );
};

export default RegisterPage;
