import { Link, useNavigate } from "react-router-dom";
import WoodContainer from "../components/WoodContainer";
import { useState } from "react";
import { authLogin } from "../api/api";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      const res = (await authLogin(email, password)) as any;
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[85vw] md:w-screen">
      <WoodContainer>
        <form className="flex flex-col p-5 w-[70vw] h-[50vh] md:w-[30vw] md:h-[65vh] items-center justify-center gap-5 md:gap-10">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-theme-black gap-10 text-center text-2xl md:text-5xl">
              Meowmentum :3
            </h1>
            <h2 className="text-center">Login to Account</h2>
          </div>
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
          <div className="flex flex-col justify-center pt-3 gap-5">
            <button
              type="submit"
              className="flex justify-center border-2 rounded-xl w-[20vw] md:w-[10vw]"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
            <h3 className="text-center">Or</h3>
            <Link
              to="/register"
              className="underline hover:decoration-sky-500 text-center"
            >
              Create Account
            </Link>
          </div>
        </form>
      </WoodContainer>
    </div>
  );
};

export default LoginPage;
