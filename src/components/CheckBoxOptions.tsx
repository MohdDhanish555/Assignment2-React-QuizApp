import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

type CheckboxOptionsProps = {
  options: any;
  handleChange: any;
};

const CheckboxOptions = ({ options, handleChange }: CheckboxOptionsProps) => {
  return (
    <FormGroup>
      {options.map((currentOption: any) => (
        <FormControlLabel
          key={currentOption.option}
          name={currentOption.option + "," + currentOption.isCorrect}
          onChange={handleChange}
          control={
            <Checkbox
              checked={currentOption.value || false}
              sx={{ color: "rgba(230, 195, 0,0.5)" }}
            />
          }
          label={currentOption.option}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxOptions;
