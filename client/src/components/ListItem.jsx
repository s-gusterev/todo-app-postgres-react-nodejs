import React, { useState, forwardRef } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";

import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
const ListItem = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);

  const apiUrl =
    import.meta.env.VITE_SERVERURL || "https://test-api.onedieta.ru/todo-app";

  const deleteItem = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos/${props.task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        console.log(`Дело ${props.task.title} удалено`);
        props.getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.li
        className="list-item"
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{props.task.title}</p>
          <ProgressBar progress={props.task.progress} />
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            РЕДАКТИРОВАТЬ
          </button>
          <button className="delete" onClick={deleteItem}>
            УДАЛИТЬ
          </button>
        </div>
      </motion.li>
      {showModal && (
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: 4,
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            mode="edit"
            setShowModal={setShowModal}
            task={props.task}
            getData={props.getData}
            modeText="Отредактировать дело"
          />
        </motion.div>
      )}
    </>
  );
});

export default ListItem;
