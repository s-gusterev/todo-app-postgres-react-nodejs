import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import CurrentUserContext from './contexts/CurrentUserContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Modal from './components/Modal';
import { api } from './utils/restApi';

const App = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('auth')) || null
  );
  const [currentUser, setCurrentUser] = useState({
    name: '',
    user_id: '',
    email: '',
    token: '',
  });
  const [errorApi, setErrorApi] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonText, setButtonText] = useState('Отправить');

  // Функция показа ошибок

  const showError = (error) => {
    setErrorApi(error);
    setTimeout(() => setErrorApi(null), 3000);
  };

  // Функция разблокировка кнопок

  const disableBlockingButton = (boolen) => {
    setDisabledButton(boolen);
    setTimeout(() => setDisabledButton(false), 1000);
  };

  // Функция проверки авторизации

  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .getUser(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              user_id: res.user_id,
              email: res.email,
              token: res.token,
            });
          }
          setIsLoggedIn(true);
          showError(null);
          setDisabledButton(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('auth');
    }
  };

  // Вход в систему

  const login = (password, email) => {
    setDisabledButton(true);
    setButtonText('Отправка...');
    api
      .login(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('auth', true);
        tokenCheck();
        console.log(data);
        if (data.error) {
          showError(data.error);
          disableBlockingButton(false);
          setButtonText('Отправить');
          localStorage.removeItem('jwt');
          localStorage.removeItem('auth');
        }
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          showError(err.message);
          disableBlockingButton(false);
          setButtonText('Отправить');
        }
        console.log(err);
      });
  };

  // Регистрация

  const signup = (name, password, email) => {
    setDisabledButton(true);
    setButtonText('Отправка...');
    api
      .signup(name, password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('auth', true);
        tokenCheck();
      })
      .catch((err) => {
        if (err.statusCode >= 400) {
          showError(err.message);
          disableBlockingButton(false);
          setButtonText('Отправить');
        }
        console.log(err);
      });
  };

  // Выход из системы

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    setButtonText('Отправить');
    setTasks(null);
  };

  const postData = (title, progress) => {
    api
      .postTasks(title, progress)
      .then((res) => {
        setTasks([res, ...tasks]);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обновление списка задач

  const handleUpdateTasks = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
  };

  // Удаление задачи

  const deleteTasks = (task) => {
    api
      .deleteTasks(task)

      .then(() => {
        setTasks((state) => state.filter((c) => c.id !== task));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Проверка токена

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      const jwt = localStorage.getItem('jwt');
      api
        .getTasks(jwt)
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          console.log(error);
          if (error.statusCode === 401) {
            navigate('/login');
          }
        });
    }
    tokenCheck();
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? (
              <Home
                tasks={tasks}
                showModal={() => setShowModal(true)}
                logout={logout}
                onUpdateTask={handleUpdateTasks}
                onDeleteTask={deleteTasks}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={
            <LoginForm
              onSubmit={login}
              error={errorApi}
              disabledButtonSubmit={disabledButton}
              buttonText={buttonText}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <RegisterForm
              onSubmit={signup}
              error={errorApi}
              disabledButtonSubmit={disabledButton}
              buttonText={buttonText}
            />
          }
        />
      </Routes>
      {showModal && (
        <Modal
          mode='create'
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          modeText='Добавить новое дело'
          onSubmit={postData}
        />
      )}
    </CurrentUserContext.Provider>
  );
};

export default App;
