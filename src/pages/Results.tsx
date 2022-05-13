import { Box, Typography } from "@mui/material";
import ResultsCard from "../components/ResultsCard";
import questions from "../questions.json";
import { TOTAL_QUESTIONS } from "./Questions";
import { useLocation } from "react-router-dom";


const Results = () => {
  const { state }: any = useLocation();
  console.log({ state })
  console.log(state.correct)
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="#fff">
        My Responses
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
      <Box>
        <div
          id="pieChart"
          style={{
            backgroundImage: `conic-gradient(green 0deg, green ${
              (state.correct * 360) / TOTAL_QUESTIONS
            }deg, 
          red ${(state.correct * 360) / TOTAL_QUESTIONS}deg)`,
          }}
        ></div>
      </Box>
    </Box>
  );
};

export default Results;
