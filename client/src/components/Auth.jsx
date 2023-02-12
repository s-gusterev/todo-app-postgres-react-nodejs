import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const [isLogin, setIslogin] = useState(true);

  const viewLogin = (status) => {
    setIslogin(status);
  };

  return (
    <div
      initial={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className='auth-container'
    >
      <div className='auth-container-box'>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className='auth-options'>
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Регистрация
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
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
