import React, { useState, useEffect, useRef } from 'react';

export default function AutocompleteInput({ onChange, value, options, defaultValue }) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(value !== '' ? value : defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [inputDisabled, setInputDisabled] = useState(false);

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setShowDropdown(true);
    setInputDisabled(false);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    onChange(inputValue);
    setSelectedOptionIndex(-1);
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (filteredOptions.length >= 1 || !inputValue) {
      setShowDropdown(!showDropdown);
    } else {
      setInputDisabled(true);
    }
  };

  const handleOptionClick = (selectedOption) => {
    setInputValue(selectedOption);
    setFilteredOptions(options);
    setShowDropdown(false);
    setInputDisabled(false);
    setSelectedOptionIndex(-1);
    onChange(selectedOption);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setInputValue('');
    setFilteredOptions(options);
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
        setSelectedOptionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedOptionIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === 'Enter' && selectedOptionIndex !== -1) {
        handleOptionClick(filteredOptions[selectedOptionIndex]);
      } else if (event.key === 'Escape') {
        setShowDropdown(!showDropdown);
      }
    }
  };

  return (
    <div className="relative rounded-md" onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleDropdownToggle}
        disabled={inputDisabled}
        className="border rounded p-2 w-full text-black dark:text-white"
        placeholder="🔎 Search..."
        ref={inputRef}
      />

      <button
        onClick={handleDropdownToggle}
        className={`absolute right-0 top-0 h-full px-3 focus:outline-none text-gray-300 transition-transform transform ${
          showDropdown ? 'rotate-180' : ''
        }`}
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
        <ul className="absolute z-10 w-full text-black dark:text-white bg-white dark:bg-slate-600 border border-gray-300 mt-2 shadow-md max-h-48 overflow-y-auto">
          {(filteredOptions.length > 0 ? filteredOptions : options).map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selectedOptionIndex === index ? 'bg-gray-200 dark:bg-gray-500' : ''
              }`}
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