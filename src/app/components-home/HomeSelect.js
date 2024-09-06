'use client';

import React from 'react';
import Select from 'react-select';

const HomeSelect = ({ label, name, options, selectedValue }) => {

  const transformedOptions = options.map((option) => ({
    value: option.slug || option.associationSlug || option.specialtySlug,
    label: option.name || option.associationName || option.specialtyName,
  }));

  const selectedOption = transformedOptions.find(
    (option) => option.value === selectedValue
  );

  return (
    <div className="form-group">
      <label htmlFor={name} className="mb-2">{label}</label>
      <Select
        id={name}
        name={name}
        defaultValue={selectedOption}
        options={transformedOptions}
        isClearable={true}
        placeholder={`Όλοι ${label}`}
        classNamePrefix="react-select"
        instanceId={name}
      />
    </div>
  );
};

export default HomeSelect;
