import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm = ({ onSubmit, error, disabledButtonSubmit, buttonText }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value, validity, validationMessage } = event.target;
    setData({
      ...data,
      [name]: {
        value,
        isValid: validity.valid,
        errorMessage: validity.valid ? '' : validationMessage,
      },
    });
  };

  const formValidity = data.email.isValid && data.password.isValid;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email: data.email.value,
      password: data.password.value,
    });
  };

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 450,
            padding: 3,
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>Войти</h2>
          <Box sx={{ position: 'relative' }}>
            <TextField
              required
              autoFocus
              margin='dense'
              id='email'
              label='E-mail'
              type='email'
              fullWidth
              variant='standard'
              onChange={handleChange}
              name='email'
              sx={{ marginBottom: 3 }}
              inputProps={{
                autoComplete: 'off',
              }}
            />
            <span className='error-input'>{data.email.errorMessage}</span>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <TextField
              required
              margin='dense'
              id='password'
              label='Пароль'
              type='password'
              fullWidth
              variant='standard'
              onChange={handleChange}
              name='password'
              sx={{ marginBottom: 5 }}
              inputProps={{
                minLength: 6,
              }}
            />
            <span className='error-input'>{data.password.errorMessage}</span>
          </Box>

          <Button
            variant='contained'
            color='success'
            size='large'
            type='submit'
            disabled={!formValidity || disabledButtonSubmit}
          >
            {buttonText}
          </Button>

          {error && <p className='error-auth'>{error}</p>}
        </Box>
        <div className='auth-options'>
          <div
            className='auth-button'
            style={{
              backgroundColor: 'transparent',
              color: '#000',
            }}
          >
            Вход
          </div>
          <Link
            to='/signup'
            className='auth-button'
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
            }}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
