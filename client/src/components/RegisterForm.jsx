import { useState } from 'react';
import { useCookies } from 'react-cookie';

const RegisterForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const apiUrl =
    import.meta.env.VITE_SERVERURL || 'https://test-api.onedieta.ru/todo-app';
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Подтвердите пароль');
      return;
    }
    const response = await fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
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
      <h2>Регистрация</h2>
      <input
        type='name'
        placeholder='Имя'
        name='name'
        onChange={(e) => setName(e.target.value)}
        required
        value={name}
      />
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
        name='password'
        placeholder='Пароль'
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />
      <input
        type='password'
        name='confirm-password'
        placeholder='Подтвердите пароль'
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        value={confirmPassword}
      />
      <input
        type='submit'
        className='create'
        disabled={!email || !password || !name || !confirmPassword}
        onClick={(e) => handleSubmit(e)}
      />
      {error && <p className='error-auth'>{error}</p>}
    </form>
  );
};

export default RegisterForm;
