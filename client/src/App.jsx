import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import ModalMain from './components/Modal';
import { Container } from '@mui/material';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.Token;
  const userName = cookies.Name;
  const [tasks, SetTasks] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const apiUrl =
    import.meta.env.VITE_SERVERURL || 'https://test-api.onedieta.ru/todo-app';

  const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos/${userEmail}`);
      const json = await response.json();
      SetTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [authToken]);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      {showModalCreate && (
        <ModalMain
          mode='create'
          setShowModal={showModalCreate}
          handleClose={() => setShowModalCreate(false)}
          modeText='Добавить новое дело'
          getData={getData}
          task={tasks}
        />
      )}

      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader
            listName={'Список дел'}
            getData={getData}
            setShowModal={() => setShowModalCreate(true)}
          />
          <Container maxWidth='md'>
            <p className='user-email'>Привет, {userName} 👋</p>
            <AnimatePresence initial={false}>
              {sortedTasks?.length === 0 && (
                <motion.p
                  className='not-tasks'
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'block' }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, display: 'none' }}
                >
                  На сегодня дел нет или все выполнено
                </motion.p>
              )}
            </AnimatePresence>

            <ul className='list-todos'>
              <AnimatePresence initial={false}>
                {sortedTasks.map((task) => (
                  <ListItem key={task.id} task={task} getData={getData} />
                ))}
              </AnimatePresence>
            </ul>
          </Container>
        </>
      )}
      <p className='copyright'>
        <a href='https://github.com/s-gusterev' target='_blank'>
          © Сергей Густерёв
        </a>
      </p>
    </>
  );
};

export default App;
