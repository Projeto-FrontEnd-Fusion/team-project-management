import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, Chip, TextField } from "@mui/material";

interface Skill {
  id: number;
  name: string;
};
interface AutocompleteSkillsProps {
  name: string;
  label: string;
  skills: Skill[];
};

const AutocompleteSkills = ( {name, label, skills} : AutocompleteSkillsProps ) => {

  const { control, formState: { errors } } = useFormContext();

  return(
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple 
          options={skills}
          getOptionLabel={(option) => option.name}
          value={skills.filter(skill => (field.value || []).includes(skill.id))}
          onChange={(_, value) => field.onChange(value.map((v) => v.id))}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label={`Escolha suas ${label}`}
              error={!!errors.skills}
              helperText={errors.skills ? "Escolha uma opção válida!" : ""}
              sx={{
                "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiSvgIcon-root, & .MuiOutlinedInput-root fieldset, & .MuiInputLabel-root.Mui-focused": {
                  color: "gray",
                  borderColor: "gray",
                },
                "& .MuiOutlinedInput-root:hover fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "gray",
                }
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                sx={{
                  backgroundColor: "#333333",
                  color: "#16a34a",
                  fontWeight: "bold",
                }}
                {...getTagProps({index})}
              />
            ))
          }
        />
      )} 
    />
  )
};

export default AutocompleteSkills;