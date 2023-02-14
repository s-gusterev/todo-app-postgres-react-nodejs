import { useState } from 'react';
import { useCookies } from 'react-cookie';

function useForm(initialState) {
  const [formState, setFormState] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [buttonState, setButtonState] = useState('');
  const [error, setError] = useState('');
  const [disabledButtonState, setDisabledButtonState] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function handleChange(event) {
    const { name, value, validity, validationMessage } = event.target;
    setFormState({
      ...formState,
      [name]: {
        value,
        isValid: validity.valid,
        errorMessage: validity.valid ? '' : validationMessage,
      },
    });
  }

  function validateForm(formRef) {
    const form = formRef.current;
    if (!form) {
      throw new Error('Form reference is invalid.');
    }
    const formValidity = form.checkValidity();
    setIsFormValid(formValidity);
    setErrorMessage(form.validationMessage);
  }

  function submitForm(submissionUrl, formState, buttonText, sentButtonText) {
    const originalButtonText = buttonText;
    setDisabledButtonState(true);
    setButtonState(sentButtonText);

    fetch(submissionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.detail) {
          setError(data.detail);
          setButtonState(originalButtonText);
          setDisabledButtonState(false);
          setTimeout(() => {
            setError(null);
          }, 3000);
        } else {
          setCookie('Email', data.email);
          setCookie('Token', data.token);
          setCookie('Name', data.name);
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  }

  return {
    formState,
    handleChange,
    validateForm,
    submitForm,
    errorMessage,
    error,
    buttonState,
    disabledButtonState,
  };
}
export default useForm;
