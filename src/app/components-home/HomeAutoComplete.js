'use client';

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoCompleteUI = ({ label, options, selectedValue, onChange }) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      value={selectedValue || null}
      onChange={(_, newValue) => onChange(newValue)}
      isOptionEqualToValue={(option, value) =>
        option.associationSlug === value?.associationSlug || 
        option.specialtySlug === value?.specialtySlug
      }
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      style={{ width: 500, marginTop: '16px' }}
    />
  );
};

export default AutoCompleteUI;
