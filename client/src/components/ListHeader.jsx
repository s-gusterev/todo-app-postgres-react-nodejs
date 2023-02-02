import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import { Button, Box } from "@mui/material";
import MainButton from "./MainButton";

const ListHeader = ({ listName, getData, setShowModal }) => {
  // const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const singOut = () => {
    console.log("Exit");
    removeCookie("Email");
    removeCookie("Token");
    removeCookie("Name");
    window.location.reload();
  };

  return (
    <AppBar position="relative" sx={{ width: "100vw" }}>
      <Container
        sx={{
          flexDirection: { xl: "row", md: "row", sm: "row", xs: "column" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>{listName}</h1>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
          <MainButton
            color="secondary"
            variant="contained"
            handleClick={setShowModal}
            text="Добавить новое дело"
          />
          <MainButton
            color="info"
            variant="contained"
            handleClick={singOut}
            text="Выход"
          />
        </Box>
        {/* <AnimatePresence>
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
        </AnimatePresence> */}
      </Container>
    </AppBar>
  );
};

export default ListHeader;
