import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
const ListItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickDeleteTask = () => {
    onDeleteTask(task.id);
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
            onClick={handleClickDeleteTask}
          >
            УДАЛИТЬ
          </Button>
        </div>
      </motion.li>
      {showModal && (
        <Modal
          mode='edit'
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          modeText='Редактировать дело'
          task={task}
          onUpdateTask={onUpdateTask}
        />
      )}
    </>
  );
};

export default ListItem;
