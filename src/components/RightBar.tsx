import {
  Box,
  Paper,
  Pagination,
  Avatar,
  PaginationItem,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { TOTAL_QUESTIONS } from "../pages/Questions";
import AlbumIcon from "@mui/icons-material/Album";

type RightBarProps = {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const RightBar = ({ currentQuestion, setCurrentQuestion }: RightBarProps) => {
  const [answer, setAnswer] = useContext(AppContext);
  // VALUE PASSED FROM Home.tsx
  const { state }: any = useLocation();

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentQuestion(value);
  }

  return (
    <Box>
      <Box
        width="250px"
        bgcolor="#041c32"
        color="#fff"
        p="0.5rem .9rem"
        mb="2rem"
        position="fixed"
        top="0"
        right="2.5rem"
        borderRadius="0 0 5px 5px"
        display="flex"
        alignItems="center"
        gap="1rem"
      >
        <Avatar sx={{ bgcolor: "rgba(230, 195, 0,.8)" }}>
          {state.name.replace(/\s+/g, "")[0].toUpperCase()}
        </Avatar>
        {state.name}
      </Box>
      <Paper
        elevation={24}
        sx={{
          background: "#041c32",
          borderRadius: "5px",
          position: "fixed",
          top: "5rem",
          right: "2.5rem",
          width: "250px",
          padding: "1.5rem",
        }}
      >
        <Pagination
          count={TOTAL_QUESTIONS}
          variant="outlined"
          page={currentQuestion}
          color="primary"
          onChange={handleChange}
          boundaryCount={TOTAL_QUESTIONS / 2}
          size="large"
          hidePrevButton
          hideNextButton
          renderItem={(item) => {
            let paginationItemColor = "rgba(255,255,255,.3)";
            Object.entries(answer).map(([tempIndex, ans]: any) => {
              if (ans?.is_ans) {
                if (item.page?.toLocaleString() === tempIndex) {
                  paginationItemColor = "rgba(173,255,47,0.5)";
                }
              }
            });

            return (
              <PaginationItem
                sx={{
                  backgroundColor: paginationItemColor,
                  margin: ".3rem",
                  " &:hover": {
                    backgroundColor: paginationItemColor,
                    opacity: ".7"
                  },
                }}
                {...item}
              />
            );
          }}
        />
        <Typography
          sx={{
            backgroundColor: "rgba(230, 195, 0,.1)",
            padding: ".5rem",
            marginTop: "1.5rem",
            borderRadius: "5px",
            display: "flex",
            gap: "1rem",
          }}
        >
          <AlbumIcon sx={{ color: "rgba(173,255,47,0.6)" }} /> Answered
        </Typography>
        <Typography
          sx={{
            backgroundColor: "rgba(230, 195, 0,.1)",
            padding: ".5rem",
            marginTop: ".5rem",
            borderRadius: "5px",
            display: "flex",
            gap: "1rem",
          }}
        >
          <AlbumIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
          Not Answered
        </Typography>
      </Paper>
    </Box>
  );
};

export default RightBar;
