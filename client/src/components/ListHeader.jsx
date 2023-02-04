import { useCookies } from "react-cookie";
import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import MainButton from "./MainButton";

const ListHeader = ({ listName, getData, setShowModal }) => {
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
      </Container>
    </AppBar>
  );
};

export default ListHeader;
