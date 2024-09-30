import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import {
  District,
  Province,
  SubDistrict,
} from "../../shared/interface/address";

const SelectFormField = ({
  id,
  label,
  name,
  selectedValue,
  items,
  onChange,
}) => {
  return (
    <FormControl size="medium" fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        labelId={`select-${name}-label`}
        id={id}
        value={selectedValue || ""}
        label={label}
        name={name}
        disabled={!items}
        onChange={onChange}
      >
        {items ? (
          items.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item.name_th}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={0} value={""}></MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectFormField;
