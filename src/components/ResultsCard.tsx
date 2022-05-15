import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
import { useContext } from "react";
import { AppContext } from "../App";
import { ExpandMore, Check, Clear } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

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
  const { state }: any = useLocation();

  let accordianColor = "rgba(255,0,0,0.3)";
  let showCheckIcon = false;
  let showCorrectAnswer = true;
  state.correctAnswerId.map((answerId: number) => {
    if (answerId === id) {
      accordianColor = "rgba(0,255,0,0.3)";
      showCheckIcon = true;
      showCorrectAnswer = false;
    }
  });
  let correctAnswer: any[] = [];
  answers.map((option) => {
    if (option.isCorrect) {
      correctAnswer.push(option.option);
      console.log(correctAnswer);
    }
  });

  return (
    <>
      <Paper
        elevation={24}
        sx={{
          padding: ".3rem",
          margin: "1.5rem 0",
          backgroundColor: accordianColor,
          width: "600px",
        }}
        key={id}
      >
        <Accordion sx={{ backgroundColor: "#041C32" }}>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#fff"
              display="flex"
              alignItems="center"
              gap=".5rem"
            >
              {showCheckIcon ? (
                <Check color="success" />
              ) : (
                <Clear color="error" />
              )}
              {question}
            </Typography>
          </AccordionSummary>
          {(() => {
            switch (questionType) {
              case "textInput":
                return (
                  <AccordionDetails>
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
                    {showCorrectAnswer && (
                      <Box>
                        <Typography color="gray">Correct Answer</Typography>
                        <Typography>{correctAnswer}</Typography>
                      </Box>
                    )}
                  </AccordionDetails>
                );
              case "radio":
                return (
                  <AccordionDetails>
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
                    {showCorrectAnswer && (
                      <Box>
                        <Typography color="gray">Correct Answer</Typography>
                        <FormControlLabel
                          control={<Radio disabled checked />}
                          label={correctAnswer}
                        />
                      </Box>
                    )}
                  </AccordionDetails>
                );
              case "checkbox":
                return (
                  <AccordionDetails>
                    <FormGroup>
                      {answers.map((option: any) => (
                        <FormControlLabel
                          key={option.option}
                          name={option.option + "," + option.isCorrect}
                          control={
                            <Checkbox
                              checked={
                                answer[id]?.data.includes(
                                  option.option + "," + option.isCorrect
                                ) || false
                              }
                              sx={{
                                color: "rgba(230, 195, 0,0.5)",
                              }}
                            />
                          }
                          label={option.option}
                          disabled
                          // classes={{
                          //   root: classes.root,
                          //   label: classes.label,
                          // }}
                        />
                      ))}
                    </FormGroup>
                    {showCorrectAnswer && (
                      <Box>
                        <Typography color="gray">Correct Answer</Typography>
                        <FormControlLabel
                          control={<Checkbox disabled checked />}
                          label={correctAnswer}
                        />
                      </Box>
                    )}
                  </AccordionDetails>
                );
            }
          })()}
        </Accordion>
      </Paper>
    </>
  );
};

export default ResultsCard;
