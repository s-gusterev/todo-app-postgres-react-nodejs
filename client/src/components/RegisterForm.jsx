import { useState } from 'react';
import { useRef } from 'react';
import useForm from './useForm';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const RegisterForm = () => {
  const formRef = useRef(null);
  const {
    formState,
    handleChange,
    validateForm,
    submitForm,
    error,
    disabledButtonState,
  } = useForm({
    name: { value: '', isValid: false, errorMessage: '' },
    email: { value: '', isValid: false, errorMessage: '' },
    password: { value: '', isValid: false, errorMessage: '' },
    'confirm-password': { value: '', isValid: false, errorMessage: '' },
  });
  const apiUrl =
    `${import.meta.env.VITE_SERVERURL}/signup` ||
    'https://test-api.onedieta.ru/todo-app/signup';

  const [buttonText, setButtonText] = useState('Зарегистрироваться');
  const [disabledButton, setDisabledButton] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const inputValues = {
    name: formState.name.value,
    email: formState.email.value,
    password: formState.password.value,
    'confirm-password': formState.password.value,
  };

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function validatePassword() {
    const errors = {};
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTimeout(() => {
        setFormErrors({});
      }, 2000);
      return;
    }

    setFormErrors({});

    const sendButtonText = () => setButtonText('Регистрируемся...');
    setDisabledButton(false);
    if (formRef.current.checkValidity()) {
      validateForm(formRef);
      const buttonText = () => setButtonText('Зарегистрироваться');
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
          value={formState.name.value}
          onChange={handleChange}
          name='name'
          sx={{ marginBottom: 3 }}
          inputProps={{
            autoComplete: 'off',
            minLength: 3,
            maxLength: 20,
          }}
        />
        <span className='error-input'>{formState.name.errorMessage}</span>
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
          inputRef={passwordRef}
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
          sx={{ marginBottom: 3 }}
          inputProps={{
            minLength: 6,
          }}
        />
        <span className='error-input'>{formState.password.errorMessage}</span>{' '}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <TextField
          inputRef={confirmPasswordRef}
          required
          margin='dense'
          id='сonfirm-password'
          label='Подтвердите пароль'
          type='password'
          fullWidth
          variant='standard'
          value={formState['confirm-password'].value}
          onChange={handleChange}
          name='confirm-password'
          sx={{ marginBottom: 3 }}
          inputProps={{
            minLength: 6,
          }}
        />
        <span className='error-input'>
          {formState['confirm-password'].errorMessage}
        </span>
      </Box>
      <Button
        variant='contained'
        color='success'
        size='large'
        type='submit'
        disabled={
          !formState.name.isValid ||
          !formState.email.isValid ||
          !formState.password.isValid ||
          !formState['confirm-password'].isValid ||
          disabledButton ||
          disabledButtonState
        }
      >
        {buttonText}
      </Button>
      {error && <p className='error-auth'>{error}</p>}
      {formErrors.confirmPassword && (
        <p className='error-auth'>{formErrors.confirmPassword}</p>
      )}
    </Box>
  );
};

export default RegisterForm;
