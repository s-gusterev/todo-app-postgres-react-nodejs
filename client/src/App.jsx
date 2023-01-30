import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

const App = () => {
  const userEmail = "frontend.sg@gmail.com";
  const [tasks, SetTasks] = useState(null);
  const apiUrl = import.meta.env.VITE_SERVERURL;
  const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos/${userEmail}`);
      const json = await response.json();
      SetTasks(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Сортировка по дате

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listName={"ToDo App"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
