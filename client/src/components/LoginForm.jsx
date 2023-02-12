import { useState } from 'react';
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const apiUrl =
    import.meta.env.VITE_SERVERURL || 'https://test-api.onedieta.ru/todo-app';
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('Token', data.token);
      setCookie('Name', data.name);

      window.location.reload();
    }
    console.log(data);
  };

  return (
    <form>
      <h2>Войти</h2>
      <input
        type='email'
        placeholder='Email'
        name='email'
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />
      <input
        type='password'
        name='name'
        placeholder='Пароль'
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />
      <input
        type='submit'
        className='create'
        disabled={!email || !password}
        onClick={(e) => handleSubmit(e)}
      />
      {error && <p className='error-auth'>{error}</p>}
    </form>
  );
};

export default LoginForm;
