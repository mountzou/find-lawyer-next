'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AutoCompleteUI from './HomeAutoComplete';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomeSearch = ({ associationsData = [], specialtiesData = [] }) => {
  const [showHeading, setShowHeading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to get URL parameters

  const combinedOptions = useMemo(() => [
    ...associationsData.map((association) => ({
      ...association,
      name: association.associationName,
      type: 'association',
    })),
    ...specialtiesData.map((specialty) => ({
      ...specialty,
      name: specialty.specialtyName,
      type: 'specialty',
    })),
  ], [associationsData, specialtiesData]);

  // Check URL parameters when the component mounts
  useEffect(() => {
    const association = searchParams.get('association');
    const specialty = searchParams.get('specialty');
    
    // If either association or specialty parameter is present, treat it as "scrolled"
    if (association || specialty) {
      setShowHeading(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowHeading(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [searchParams]);

  const handleArrowClick = () => {
    setShowHeading(true);
    window.scrollTo(0, 0);
  };

  const handleSelectionChange = (newValue) => {
    setSelectedOption(newValue);
    if (!newValue) return;

    const { type, associationSlug, specialtySlug } = newValue;
    if (type === 'association') {
      router.push(`/dikigorikos-syllogos/${associationSlug}`);
    } else if (type === 'specialty') {
      router.push(`/eidikotita/${specialtySlug}`);
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${showHeading ? 'vh-100' : ''}`}>
      {showHeading ? (
        <>
          <h1>Αναζήτηση δικηγόρου</h1>
          <AutoCompleteUI
            label="Αναζήτηση δικηγορικού συλλόγου ή ειδικότητας"
            options={combinedOptions}
            selectedValue={selectedOption}
            onChange={handleSelectionChange}
          />
        </>
      ) : (
        <>
          <i
            className="bi bi-arrow-bar-up mt-4"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={handleArrowClick}
          />
          <small className="mb-4">This is a dummy message.</small>
        </>
      )}
    </div>
  );
};

export default HomeSearch;
