import React, { useState } from "react";
import WoodContainer from "../components/WoodContainer";
import { authRegister } from "../api/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      await authRegister(email, password);
      
      // Assuming that register does not log the user in
      navigate("/login");
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              type="password"
              required
              className="flex border-1 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="flex justify-center border-2 rounded-xl w-[20vw] md:w-[10vw]"
              onClick={(e) => handleRegister(e)}
            >
              Register
            </button>
          </div>
        </form>
      </WoodContainer>
    </div>
  );
};

export default RegisterPage;
