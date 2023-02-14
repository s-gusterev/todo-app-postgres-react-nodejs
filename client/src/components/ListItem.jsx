import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalMain from './Modal';
import ProgressBar from './ProgressBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const apiUrl =
    import.meta.env.VITE_SERVERURL || 'https://test-api.onedieta.ru/todo-app';

  const deleteItem = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos/${task.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.li
        className='list-item'
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className='info-container'>
          <CheckCircleIcon color='success' sx={{ padding: 1 }} />
          <p className='task-title'>{task.title}</p>
          <ProgressBar progress={task.progress} />
        </div>
        <div className='button-container'>
          <Button
            variant='contained'
            color='success'
            size='small'
            sx={{ marginRight: 2 }}
            onClick={() => setShowModal(true)}
          >
            РЕДАКТИРОВАТЬ
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            sx={{ marginRight: 2 }}
            onClick={deleteItem}
          >
            УДАЛИТЬ
          </Button>
        </div>
      </motion.li>
      {showModal && (
        <ModalMain
          mode='edit'
          setShowModal={showModal}
          handleClose={() => setShowModal(false)}
          modeText='Редактировать дело'
          getData={getData}
          task={task}
        />
      )}
    </>
  );
};

export default ListItem;
