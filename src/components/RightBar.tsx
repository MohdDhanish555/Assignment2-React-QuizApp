import { Box, Paper, Pagination, Avatar, PaginationItem } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { TOTAL_QUESTIONS } from "../pages/Questions";

type RightBarProps = {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const RightBar = ({ currentQuestion, setCurrentQuestion }: RightBarProps) => {
  // VALUE PASSED FROM Home.tsx
  const { state }: any = useLocation();
  const [answer, setAnswer] = useContext(AppContext);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentQuestion(value);
  }

  return (
    <Box>
      <Box
        width="200px"
        bgcolor="#041c32"
        color="#fff"
        p=".5rem"
        mb="2rem"
        position="fixed"
        top="0"
        right="0"
        borderRadius="5px"
        display="flex"
        alignItems="center"
        gap="1rem"
      >
        <Avatar>{state.name.replace(/\s+/g, "")[0]}</Avatar>
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
          padding: "2rem",
        }}
      >
        <Pagination
          count={TOTAL_QUESTIONS}
          variant="outlined"
          page={currentQuestion}
          color="primary"
          onChange={handleChange}
          boundaryCount={TOTAL_QUESTIONS/2}
          size="large"
          hidePrevButton
          hideNextButton
          renderItem={(item) => {
            let colorTheme = "gray"
            if (item.page === currentQuestion) {
              if (answer[currentQuestion]?.is_ans) {
                colorTheme = "green"
              }
            }
            // else {
            //   Object.entries(answer).map(([index, ans]: any) => {
            //     if (ans?.is_ans) {
            //       if (item.page === index) {
            //         return colorTheme = "green";
            //       }
            //     }
            //   });
            // }
     

            return (
              <PaginationItem
                sx={{
                  backgroundColor: colorTheme? colorTheme : "gray"
                }}
                {...item}
              />
            );
          }}
        />
      </Paper>
    </Box>
  );
};

export default RightBar;
