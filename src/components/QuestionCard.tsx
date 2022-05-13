import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";
import { StyledTextField } from "../pages/Home";
import CheckBoxOptions from "./CheckBoxOptions";
import RadioOptions from "./RadioOptions";

type QuestionProps = {
  id: number;
  question: string;
  questionType: string;
  answers: Array<any>;
};

const QuestionCard = ({
  id,
  question,
  questionType,
  answers,
}: QuestionProps) => {
  const [answer, setAnswer] = useContext(AppContext);
  console.log(answer)  
  return (
    <Box key={id} m="1rem 0">
      <Typography variant="h5" fontWeight="bold" mb="1.5rem">
        {question}
      </Typography>
      {(() => {
        switch (questionType) {
          case "textInput":
            return (
              <StyledTextField
                id="outlined-basic"
                variant="outlined"
                value={answer[id]?.data || ""}
                onChange={(event) => {
                  setAnswer({
                    ...answer,
                    [id]: {
                      data: event.target.value,
                      type: questionType,
                      is_ans: event.target.value ? true : false,
                    },
                  });
                }}
                sx={{
                  marginTop: "1.5rem",
                  marginBottom: "2.5rem",
                  width: "60%",
                }}
              />
            );
          case "radio":
            return (
              <RadioOptions
                options={answers}
                value={answer[id]?.data || ""}
                handleChange={(event: any) =>
                  setAnswer({
                    ...answer,
                    [id]: {
                      data: event.target.value,
                      type: questionType,
                      is_ans: event.target.value ? true : false,
                    },
                  })
                }
              />
            );
          case "checkbox":
            return (
              <CheckBoxOptions
              options={answers.map((ans: any) => {
                return {
                  option: ans.option,
                  value: answer[id]?.data.includes(ans.option) || false,
                };
              })}
                handleChange={(event: any) => {
                  let currentArray: any = [];
                  if (Array.isArray(answer[id]?.data)) {
                    currentArray = [...answer[id]?.data];
                  }
                  if (event.target.checked) {
                    currentArray.push(event.target.name);
                  } else {
                    const indexOfName = currentArray.indexOf(event.target.name);
                    currentArray.splice(indexOfName, 1);
                  }
                  setAnswer({
                    ...answer,
                    [id]: {
                      data: currentArray,
                      type: questionType,
                      is_ans: currentArray.length? true : false
                    },
                  });
                }}
              />
            );
          default:
            return <div>Not found</div>;
        }
      })()}
    </Box>
  );
};

export default QuestionCard;
