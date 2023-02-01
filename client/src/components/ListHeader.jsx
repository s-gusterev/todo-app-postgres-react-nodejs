import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const singOut = () => {
    console.log("Exit");
    removeCookie("Email");
    removeCookie("Token");
    window.location.reload();
  };

  return (
    <header className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={singOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal
          mode="create"
          setShowModal={setShowModal}
          task={null}
          getData={getData}
        />
      )}
    </header>
  );
};

export default ListHeader;
