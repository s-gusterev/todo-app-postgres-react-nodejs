import { Button } from "@mui/material";

const MainButton = ({ color, variant, handleClick, text, disabled, type }) => {
  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      sx={{ textTransform: "uppercase" }}
      disabled={disabled}
      type={type}
    >
      {text}
    </Button>
  );
};
export default MainButton;
