import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const RegisterForm = ({
  onSubmit,
  error,
  disabledButtonSubmit,
  buttonText,
}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    'confirm-password': '',
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

  const formValidity =
    data.name.isValid &&
    data.email.isValid &&
    data.password.isValid &&
    data['confirm-password'].isValid;

  const passwordValidity =
    data.password.value !== data['confirm-password'].value
      ? 'Пароли не совпадают'
      : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: data.name.value,
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
          <h2>Регистрация</h2>
          <Box sx={{ position: 'relative' }}>
            <TextField
              required
              autoFocus
              margin='dense'
              id='name'
              label='Имя'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleChange}
              name='name'
              sx={{ marginBottom: 3 }}
              inputProps={{
                autoComplete: 'off',
                minLength: 3,
                maxLength: 20,
              }}
            />
            <span className='error-input'>{data.name.errorMessage}</span>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <TextField
              required
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
              sx={{ marginBottom: 3 }}
              inputProps={{
                minLength: 6,
              }}
            />
            <span className='error-input'>{data.password.errorMessage}</span>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <TextField
              required
              margin='dense'
              id='сonfirm-password'
              label='Подтвердите пароль'
              type='password'
              fullWidth
              variant='standard'
              onChange={handleChange}
              name='confirm-password'
              sx={{ marginBottom: 3 }}
              inputProps={{
                minLength: 6,
              }}
            />
            <span className='error-input'>
              {data['confirm-password'].errorMessage}
            </span>
          </Box>
          <Button
            variant='contained'
            color='success'
            size='large'
            type='submit'
            disabled={!formValidity || disabledButtonSubmit || passwordValidity}
          >
            {buttonText}
          </Button>
          {error && <p className='error-auth'>{error}</p>}
          {passwordValidity && <p className='error-auth'>{passwordValidity}</p>}
        </Box>
        <div className='auth-options'>
          <div
            className='auth-button'
            style={{
              backgroundColor: 'transparent',
              color: '#000',
            }}
          >
            Регистрация
          </div>
          <Link
            to='/login'
            className='auth-button'
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
            }}
          >
            Вход
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
