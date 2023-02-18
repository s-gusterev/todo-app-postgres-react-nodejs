import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slider from '@mui/material/Slider';
import MainButton from './MainButton';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/restApi';

const Modal = ({
  mode,
  showModal,
  task,
  modeText,
  handleClose,
  onSubmit,
  onUpdateTask,
}) => {
  const token = localStorage.getItem('jwt');
  const user = useContext(CurrentUserContext);
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : user.email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
    user_id: editMode ? task.user_id : user.user_id,
  });
  const [buttonText, setButtonText] = useState('Сохранить');
  const [disabledButton, setDisabledButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    setDisabledButton(true);
    setButtonText('Сохранение');
    onSubmit(data);
  };

  const editData = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    setButtonText('Сохранение');
    api
      .putTasks(task.id, data, token)
      .then((res) => {
        const updatedTask = { ...task, ...res };
        onUpdateTask(updatedTask);
        handleClose();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={showModal} onClose={handleClose}>
      <DialogTitle>{modeText}</DialogTitle>
      <form onSubmit={editMode ? editData : handleSubmitPost}>
        <DialogContent
          sx={{
            width: 500,
            maxWidth: '100%',
            paddingInline: '28px',
          }}
        >
          <TextField
            required
            autoFocus
            margin='dense'
            id='title'
            label='Название дела'
            type='text'
            fullWidth
            variant='standard'
            value={data.title || ''}
            onChange={handleChange}
            name='title'
            inputProps={{
              maxLength: 30,
            }}
          />
          <DialogContentText mt={3}>Установите прогресс дела</DialogContentText>
          <Slider
            defaultValue={0}
            aria-label='Default'
            valueLabelDisplay='auto'
            name='progress'
            value={data.progress || 0}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <MainButton
            color='secondary'
            variant='contained'
            handleClick={() => {}}
            text={buttonText}
            disabled={!data.title || disabledButton}
            type='submit'
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default Modal;
