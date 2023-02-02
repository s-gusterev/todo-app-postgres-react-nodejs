import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task, modeText }) => {
  const apiUrl =
    import.meta.env.VITE_SERVERURL || "https://test-api.onedieta.ru/todo-app";
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : "50",
    date: editMode ? task.date : new Date(),
  });

  const [buttonText, setButtonText] = useState("Сохранить");
  const handleChange = (e) => {
    console.log("Change");

    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    setButtonText("Сохранение...");
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    setButtonText("Сохранение...");
    try {
      const response = await fetch(`${apiUrl}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="modal">
        <div className="form-title-container">
          <h3>{modeText}</h3>
          <button
            className="close-modal"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <form>
          <input
            type="text"
            required
            maxLength={30}
            placeholder=" Название"
            name="title"
            value={data.title || ""}
            onChange={handleChange}
          />
          <label htmlFor="range">
            Перетащите ползунок для отображения прогресса задачи
          </label>
          <p className="progress-text">{data.progress} %</p>
          <input
            id="range"
            type="range"
            required
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className="edit"
            type="submit"
            onClick={editMode ? editData : postData}
            disabled={!data.title}
            value={buttonText}
          />
        </form>
      </div>
      <div className="overlay" onClick={() => setShowModal(false)}></div>
    </>
  );
};

export default Modal;
