import WoodContainer from "../components/WoodContainer";
import ToDoList from "../components/menu/ToDoList";

const ViewTasksPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-1/2">
        <WoodContainer>
          <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-theme-white">Tasks</h1>
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <ToDoList
                name="Buy cat foodhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                price={9.99}
                expireDate={new Date()}
              ></ToDoList>
              <ToDoList
                name="cat"
                price={9.99}
                expireDate={new Date("2026-05-21")}
              ></ToDoList>
              <ToDoList
                name="Buy cat food"
                price={9.99}
                expireDate={new Date()}
              ></ToDoList>
              <ToDoList
                name="Buy cat food"
                price={9.99}
                expireDate={new Date()}
              ></ToDoList>
              <ToDoList
                name="Buy cat food"
                price={9.99}
                expireDate={new Date()}
              ></ToDoList>
              <ToDoList
                name="Buy cat food"
                price={9.99}
                expireDate={new Date()}
              ></ToDoList>
            </div>
          </div>
        </WoodContainer>
      </div>
    </div>
  );
};

export default ViewTasksPage;
