import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import RightBar from "../components/RightBar";
import questions from "../questions.json";
import { AppContext } from "../App";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const TOTAL_QUESTIONS = questions.length;
let correct = 0;
let correctAnswerId : number[] = []

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useContext(AppContext);
  const [open, setOpen] = useState(true);

  const { state }: any = useLocation();

  // LOADING CONDITION

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // HANDLING PREV & NEXT BUTTON
  const Navigate = useNavigate();

  function handlePrevButton() {
    setCurrentQuestion((prev) => prev - 1);
  }

  function handleNextButton() {
    if (currentQuestion === TOTAL_QUESTIONS) {
      {
        questions.map((question) => {
          if (answer[question.id]?.is_ans) {
            if (answer[question.id]?.type === "checkbox") {
              let totalCorrect = 0;
              question.answerOptions.map((option) => {
                if (option.isCorrect) {
                  totalCorrect = totalCorrect + 1;
                }
              });
              let selectedCorrect = 0;
              let wrongAnswer = false;
              answer[question.id]?.data.map((data: any) => {
                const myOption = data.split(",");
                if (myOption[1] == "true") {
                  selectedCorrect = selectedCorrect + 1;
                } else {
                  wrongAnswer = true;
                }
              });
              if (totalCorrect === selectedCorrect && !wrongAnswer) {
                correct = correct + 1;
                correctAnswerId.push(question.id);
              }
            } else {
              question.answerOptions.map((option) => {
                if (answer[question.id].data === option.option) {
                  if (option.isCorrect) {
                    correct = correct + 1;
                    correctAnswerId.push(question.id)
                  }
                }
              });
            }
          }
        });
      }
      console.log(correct);
      Navigate("/results",{ state: { correct , wrong : TOTAL_QUESTIONS - correct , correctAnswerId } , replace : true });
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  // SNACKBAR
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {questions.map(
            (question) =>
              currentQuestion === question.id && (
                <Box
                  key={question.id}
                  display="flex"
                  flexDirection="column"
                  height="500px"
                  width="600px"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      color: "#000",
                      backgroundColor: "rgba(230, 195, 0,.9)",
                      padding: ".5rem",
                      borderRadius: "5px",
                    }}
                  >
                    Question {currentQuestion}
                  </Typography>
                  <Paper
                    elevation={24}
                    sx={{
                      background: "#041C32",
                      // #041C32
                      padding: "1rem 2rem",
                      borderRadius: "5px",
                    }}
                  >
                    <QuestionCard
                      id={question.id}
                      question={question.question}
                      questionType={question.questionType}
                      answers={question.answerOptions}
                    />
                  </Paper>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={handlePrevButton}
                      disabled={currentQuestion === 1}
                    >
                      Prev
                    </Button>
                    <Button variant="outlined" onClick={handleNextButton}>
                      {currentQuestion === TOTAL_QUESTIONS ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </Box>
              )
          )}
          <RightBar
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Good Luck {state.name} !!
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};

export default Questions;
