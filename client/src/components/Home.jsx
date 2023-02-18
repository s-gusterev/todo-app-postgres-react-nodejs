import { useContext } from 'react';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import { Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Home = ({ tasks, showModal, logout, onUpdateTask, onDeleteTask }) => {
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const user = useContext(CurrentUserContext);
  return (
    <>
      <ListHeader
        listName={'Список дел'}
        showModal={showModal}
        logout={logout}
      />
      <Container maxWidth='md' sx={{ flex: 1 }}>
        <p className='user-email'>Привет, {user.name} 👋</p>

        {tasks?.length === 0 && (
          <p className='not-tasks'>На сегодня дел нет или все выполнено</p>
        )}

        <ul className='list-todos'>
          {sortedTasks && (
            <AnimatePresence initial={false}>
              {sortedTasks?.map((task) => (
                <ListItem
                  key={task.id}
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </AnimatePresence>
          )}
        </ul>
      </Container>
      <Container>
        <p className='copyright'>
          <a href='https://github.com/s-gusterev' target='_blank'>
            © Сергей Густерёв
          </a>
        </p>
      </Container>
    </>
  );
};

export default Home;
