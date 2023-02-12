import { useState } from 'react';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const apiUrl =
    import.meta.env.VITE_SERVERURL || 'https://test-api.onedieta.ru/todo-app';
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonText, setButtonText] = useState('Войти');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Входим...');
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
      setButtonText('Войти');
    } else {
      setCookie('Email', data.email);
      setCookie('Token', data.token);
      setCookie('Name', data.name);

      window.location.reload();
    }
  };

  return (
    <form>
      <h2>Войти</h2>

      <TextField
        required
        autoFocus
        margin='dense'
        id='email'
        label='E-mail'
        type='email'
        fullWidth
        variant='standard'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name='email'
        sx={{ marginBottom: 2 }}
      />

      <TextField
        required
        autoFocus
        margin='dense'
        id='password'
        label='Пароль'
        type='password'
        fullWidth
        variant='standard'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name='password'
        sx={{ marginBottom: 5 }}
      />

      <Button
        variant='contained'
        color='success'
        size='large'
        onClick={(e) => handleSubmit(e)}
        type='submit'
      >
        {buttonText}
      </Button>

      {error && <p className='error-auth'>{error}</p>}
    </form>
  );
};

export default LoginForm;
