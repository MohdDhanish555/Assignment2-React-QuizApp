import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { StyledTextField } from "../pages/Home";
import { useContext, useState } from "react";
import { AppContext } from "../App";

type ResultsCardProps = {
  //   data: string;
  //   type: string;
  //   isAnswered: Boolean;
  //   index: number;
  id: number;
  question: string;
  questionType: string;
  answers: Array<any>;
};

const ResultsCard = ({
  id,
  question,
  questionType,
  answers,
}: ResultsCardProps) => {
  const [answer, setAnswer] = useContext(AppContext);

  
    
  


  return (
    <>
      <Paper
        elevation={24}
        sx={{
          padding: "1rem",
          margin: "1.5rem",
          backgroundColor: "#041C32",
          width: "600px",
        }}
        key={id}
      >
        <Typography variant="h6" fontWeight="bold" mb="1.5rem">
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
                  disabled
                  sx={{
                    marginBottom: "1rem",
                    width: "60%",
                  }}
                />
              );
            case "radio":
              return (
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="controlled-radio-buttons-group"
                    value={answer[id]?.data || ""}
                  >
                    {answers.map((option) => (
                      <FormControlLabel
                        key={option.option}
                        value={option.option}
                        control={
                          <Radio sx={{ color: "rgba(230, 195, 0,0.5)" }} />
                        }
                        label={option.option}
                        disabled
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            case "checkbox":
              return (
                <FormGroup>
                  {answers.map((option: any) => (
                    <FormControlLabel
                      key={option.option}
                      name={option.option}
                      control={
                        <Checkbox
                          checked={
                            answer[id]?.data.includes(option.option) || false
                          }
                          sx={{ color: "rgba(230, 195, 0,0.5)" }}
                        />
                      }
                      label={option.option}
                      disabled
                    />
                  ))}
                </FormGroup>
              );
          }
        })()}
      </Paper>
    </>
  );
};

export default ResultsCard;
