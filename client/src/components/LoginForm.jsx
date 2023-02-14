import { useState } from 'react';
import { useRef } from 'react';
import useForm from './useForm';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm = () => {
  const formRef = useRef(null);
  const {
    formState,
    handleChange,
    validateForm,
    submitForm,
    error,
    disabledButtonState,
  } = useForm({
    email: { value: '', isValid: false, errorMessage: '' },
    password: { value: '', isValid: false, errorMessage: '' },
  });
  const apiUrl =
    `${import.meta.env.VITE_SERVERURL}/login` ||
    'https://test-api.onedieta.ru/todo-app/login';

  const [buttonText, setButtonText] = useState('Войти');
  const [disabledButton, setDisabledButton] = useState(false);

  const inputValues = {
    email: formState.email.value,
    password: formState.password.value,
  };

  function handleSubmit(event) {
    event.preventDefault();
    const sendButtonText = () => setButtonText('Входим...');
    setDisabledButton(false);
    if (formRef.current.checkValidity()) {
      validateForm(formRef);
      const buttonText = () => setButtonText('Войти');
      submitForm(apiUrl, inputValues, buttonText, sendButtonText);
    }
  }

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 450,
        padding: 3,
      }}
      ref={formRef}
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
          value={formState.email.value}
          onChange={handleChange}
          name='email'
          sx={{ marginBottom: 3 }}
          inputProps={{
            autoComplete: 'off',
          }}
        />
        <span className='error-input'>{formState.email.errorMessage}</span>
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
          value={formState.password.value}
          onChange={handleChange}
          name='password'
          sx={{ marginBottom: 5 }}
          inputProps={{
            minLength: 6,
          }}
        />
        <span className='error-input'>{formState.password.errorMessage}</span>{' '}
      </Box>

      <Button
        variant='contained'
        color='success'
        size='large'
        type='submit'
        disabled={
          !formState.email.isValid ||
          !formState.password.isValid ||
          disabledButton ||
          disabledButtonState
        }
      >
        {buttonText}
      </Button>

      {error && <p className='error-auth'>{error}</p>}
    </Box>
  );
};

export default LoginForm;
