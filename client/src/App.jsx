import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.Token;
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
    if (authToken) {
      getData();
    }
  }, []);

  // Сортировка по дате

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"ToDo App"} getData={getData} />
          <p className="user-email">Welcom back {userEmail}</p>
          <ul className="list-todos">
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </ul>
        </>
      )}
      <p className="copyright">Creative Coding</p>
    </div>
  );
};

export default App;
