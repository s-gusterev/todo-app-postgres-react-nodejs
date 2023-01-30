import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const singOut = () => {
    console.log("Exit");
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
