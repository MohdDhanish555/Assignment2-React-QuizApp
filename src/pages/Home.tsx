import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root ": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e6c300",
    },
    "&:hover": {
      "& fieldset": {
        borderColor: "#e6c300",
      },
    },
    "&:disabled": {
      "& fieldset": {
        borderColor: "#fff",
      },
    },
  },
});

const Home = () => {
  const [name, setName] = useState("");
  const Navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={24}
        sx={{
          background: "#041C32",
          // #041C32
          width: "450px",
          padding: "1rem 2rem",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#000",
            textTransform: "uppercase",
            backgroundColor: "rgba(230, 195, 0,0.9)",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          Quiz App
        </Typography>
        <Box
          component="form"
          onSubmit={() => Navigate("/questions", { state: { name } })}
        >
          <StyledTextField
            required
            id="outlined-required"
            label="Enter Your Name"
            fullWidth
            sx={{ margin: "2rem 0" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="male"
          >
            <FormControlLabel
              value="male"
              control={<Radio sx={{ color: "rgba(230, 195, 0,0.5)" }} />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio sx={{ color: "rgba(230, 195, 0,0.5)" }} />}
              label="Female"
            />
          </RadioGroup>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ margin: "1.5rem 0" }}
          >
            Start Test
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
