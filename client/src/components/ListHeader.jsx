import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const singOut = () => {
    console.log("Exit");
    removeCookie("Email");
    removeCookie("Token");
    removeCookie("Name");
    window.location.reload();
  };

  return (
    <header className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ДОБАВИТЬ НОВОЕ ДЕЛО
        </button>
        <button className="signout" onClick={singOut}>
          ВЫХОД
        </button>
      </div>
      <AnimatePresence>
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
              key="modal"
              mode="create"
              setShowModal={setShowModal}
              task={null}
              getData={getData}
              modeText="Создать новое дело"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ListHeader;
