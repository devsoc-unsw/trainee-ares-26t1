import { Link } from "react-router-dom";
import WoodContainer from "../components/WoodContainer";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <WoodContainer>
      <form className="flex flex-col p-5 w-[30vw] h-[50vh] items-center justify-center gap-5">
        <div>
          <label>Email:</label>
          <input name="email" type="string" required className="flex border-1 rounded-md"/>
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required className="flex border-1 rounded-md"/>
        </div>
        <div className="flex justify-center pt-3">
          <button type="submit" className="flex justify-center border-2 rounded-xl w-[10vw]">Login</button>
        </div>
      </form>
      </WoodContainer>
      <Link to="/register" className="mt-5 underline hover:decoration-sky-500">Create Account</Link>
    </div>
  );
}

export default LoginPage;
