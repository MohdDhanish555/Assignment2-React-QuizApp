import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ResultsCard from "../components/ResultsCard";
import questions from "../questions.json";
import { TOTAL_QUESTIONS } from "./Questions";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  const { state }: any = useLocation();

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-around" m="2rem">
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#fff">
              Your Response
            </Typography>
            {questions.map((question) => (
              <Box key={question.id}>
                <ResultsCard
                  id={question.id}
                  question={question.question}
                  questionType={question.questionType}
                  answers={question.answerOptions}
                />
              </Box>
            ))}
          </Box>
          <Box>
            <Paper
              elevation={24}
              sx={{
                bgcolor: "#041C32",
                borderRadius: "5px",
                p: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="white">
                Total Score
              </Typography>
              <Box>
                <Typography variant="h3" color="primary">
                  {state.correct}/{TOTAL_QUESTIONS}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundImage: `conic-gradient(yellowgreen 0deg, yellowgreen ${
                    (state.correct * 360) / TOTAL_QUESTIONS
                  }deg, 
            red ${(state.correct * 360) / TOTAL_QUESTIONS}deg)`,
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                  border: "1px solid white",
                }}
              ></Box>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Results;
