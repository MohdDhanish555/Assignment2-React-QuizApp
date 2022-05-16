import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

type RadioProps = {
  options: Array<any>;
  value: any;
  handleChange: any;
};

const RadioOptions = ({ options, value, handleChange }: RadioProps) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.option}
            value={option.option}
            control={<Radio sx={{ color: "rgba(230, 195, 0,0.5)" }} />}
            label={option.option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioOptions
