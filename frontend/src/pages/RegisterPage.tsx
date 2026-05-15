import WoodContainer from "../components/WoodContainer";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <WoodContainer>
      <form className="flex flex-col p-5 w-[30vw] h-[50vh] items-center justify-center gap-5">
        <div>
          <label>Name:</label>
          <input name="name" type="string" className="flex border-1 rounded-md"/>
        </div>
        <div>
          <label>Email:</label>
          <input name="email" type="string" required className="flex border-1 rounded-md"/>
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required className="flex border-1 rounded-md"/>
        </div>
        <div className="flex justify-center pt-3">
          <button type="submit" className="flex justify-center border-2 rounded-xl w-[10vw]">Sign Up</button>
        </div>
      </form>
      </WoodContainer>
    </div>
  );
}

export default RegisterPage;
