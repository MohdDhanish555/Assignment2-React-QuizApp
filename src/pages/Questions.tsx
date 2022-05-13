import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import RightBar from "../components/RightBar";
import questions from "../questions.json";
import { AppContext } from "../App";

export const TOTAL_QUESTIONS = questions.length;
let correct = 0;
let wrong = 0;
const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useContext(AppContext);

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
            question.answerOptions.map((option) => {
              if (answer[question.id].type === "checkbox") {
                let flag = true
                answer[question.id].data?.map((value: any) => {
                  if (value == option.option) {
                    if (!option.isCorrect) {
                      flag = false
                    }
                  } else {
                    flag = false
                  }
                });
                if (flag) {
                  correct = correct + 1
                  console.log("id :",question.id)
                }
              } else if (answer[question.id].data === option.option) {
                if (option.isCorrect) {
                  (correct = correct + 1);
                  console.log("id :", question.id);
                  
                } 
              }
            });
          }
        });
      }
      console.log(correct, wrong);
      Navigate("/results", { state: { correct } });
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

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
        <Box height="100vh">
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
        </Box>
      )}
    </>
  );
};

export default Questions;
