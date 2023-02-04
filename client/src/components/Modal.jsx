import { useState } from "react";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Slider from "@mui/material/Slider";
import MainButton from "./MainButton";

const ModalMain = ({
  mode,
  setShowModal,
  getData,
  task,
  modeText,
  handleClose,
}) => {
  const apiUrl =
    import.meta.env.VITE_SERVERURL || "https://test-api.onedieta.ru/todo-app";
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
  });
  const [buttonText, setButtonText] = useState("Сохранить");
  const [isFetch, setIsFetch] = useState(false);

  const handleChange = (e) => {
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
      setIsFetch(true);
      const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        handleClose();
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
      setIsFetch(true);
      const response = await fetch(`${apiUrl}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        handleClose();
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={setShowModal} onClose={handleClose}>
      <DialogTitle>{modeText}</DialogTitle>
      <form onSubmit={editMode ? editData : postData}>
        <DialogContent
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Название дела"
            type="text"
            fullWidth
            variant="standard"
            value={data.title || ""}
            onChange={handleChange}
            name="title"
            maxLength={30}
          />
          <DialogContentText mt={3}>Установите прогресс дела</DialogContentText>
          <Slider
            defaultValue={0}
            aria-label="Default"
            valueLabelDisplay="auto"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <MainButton
            color="secondary"
            variant="contained"
            handleClick={() => {}}
            text={buttonText}
            disabled={isFetch || !data.title}
            type="submit"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default ModalMain;
