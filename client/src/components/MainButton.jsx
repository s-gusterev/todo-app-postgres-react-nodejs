import { Button, Box } from "@mui/material";

const MainButton = ({ color, variant, handleClick, text }) => {
  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      sx={{ textTransform: "uppercase" }}
    >
      {text}
    </Button>
  );
};
export default MainButton;
