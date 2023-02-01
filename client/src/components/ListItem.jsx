import { useState } from "react";
import Modal from "./Modal";

import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const apiUrl =
    import.meta.env.VITE_SERVERURL || "https://test-api.onedieta.ru/todo-app";

  const deleteItem = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos/${task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        console.log(`Дело ${task.title} удалено`);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li className="list-item">
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress} />
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            EDIT
          </button>
          <button className="delete" onClick={deleteItem}>
            DELETE
          </button>
        </div>
      </li>
      {showModal && (
        <Modal
          mode="edit"
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </>
  );
};

export default ListItem;
