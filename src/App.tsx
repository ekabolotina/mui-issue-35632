import React from "react";
import Rating from "@mui/material/Rating";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";

export default function App() {
  const wrapperRef = React.useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [content, setContent] = React.useState<number | null>(null);

  const handleClickOutside = (event: unknown) => {
    // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  // Close the popper. handling click outside
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const open = Boolean(anchorEl);

  return (
      <>
        <Rating
            ref={wrapperRef}
            onChangeActive={(event: any, value) => {
              console.log(value, event.target);
              setAnchorEl(event.target);
              setContent(value);
            }}
        />
        <Popper open={open} anchorEl={anchorEl} placement="right-end">
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            The content of the Popper. {content}
          </Box>
        </Popper>
      </>
  );
}
