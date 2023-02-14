import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const [isLogin, setIslogin] = useState(true);

  const viewLogin = (status) => {
    setIslogin(status);
  };

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className='auth-options'>
          <button
            className={`${
              !isLogin ? 'auth-button' : 'auth-button auth-button_cursor'
            }`}
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin ? 'transparent' : '#1976d2',
              color: !isLogin ? '#000' : '#fff',
            }}
          >
            Регистрация
          </button>
          <button
            className={`${
              !isLogin ? 'auth-button auth-button_cursor' : 'auth-button'
            }`}
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: !isLogin ? '#1976d2' : 'transparent',
              color: !isLogin ? '#fff' : '#000',
            }}
          >
            Вход
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
