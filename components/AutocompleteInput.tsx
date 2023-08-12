import React, { useState, useEffect, useRef } from 'react';

export default function AutocompleteInput({ onChange, value, options, defaultValue }) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [inputDisabled, setInputDisabled] = useState(false);

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setShowDropdown(true);
    setInputDisabled(false);
  
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    onChange(inputValue);
    setSelectedOptionIndex(-1);
  };

  const handleDropdownToggle = (event) => {
    console.log(filteredOptions.length, inputValue, showDropdown, inputDisabled)
    if (filteredOptions.length >= 1 || !inputValue) {
        event.stopPropagation();
      setShowDropdown(!showDropdown);
    }else {
      setInputDisabled(true);
    }
  };

  const handleOptionClick = (selectedOption) => {
    setInputValue(selectedOption);
    setFilteredOptions([]);
    setShowDropdown(false);
    setInputDisabled(false);
    setSelectedOptionIndex(-1);
    onChange(selectedOption);
  };

  const handleClear = () => {
    setInputValue('');
    setFilteredOptions([]);
    setShowDropdown(false);
    setInputDisabled(false);
    setSelectedOptionIndex(-1);
    onChange('');
  };

  useEffect(() => {
    if (selectedOptionIndex !== -1) {
      setInputValue(filteredOptions[selectedOptionIndex]);
    } else {
      setInputValue(inputValue); 
    }
  }, [selectedOptionIndex, filteredOptions, inputValue]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (showDropdown) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedOptionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedOptionIndex(prevIndex => (prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex));
      } else if (event.key === 'Enter' && selectedOptionIndex !== -1) {
        handleOptionClick(filteredOptions[selectedOptionIndex]);
      }
    }
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleDropdownToggle}
        disabled={inputDisabled}
        className="border rounded p-2 w-full text-black"
        placeholder="🔎 Search..."
        ref={inputRef}
      />

      <button
        onClick={handleDropdownToggle}
        className="absolute right-0 top-0 h-full px-3 focus:outline-none text-gray-300"
      >
        {showDropdown ? '🔺' : '🔻'}
      </button>

      <button
        onClick={handleClear}
        className="absolute right-10 top-0 h-full px-3 focus:outline-none text-gray-300"
      >
        Clear
      </button>

      {showDropdown && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-2 text-black">
          {(filteredOptions.length > 0 ? filteredOptions : options).map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedOptionIndex === index ? 'bg-blue-300' : ''}`}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && inputValue.length > 0 && (
            <li className="p-2 text-gray-500">No options</li>
          )}
        </ul>
      )}
    </div>
  );
}
