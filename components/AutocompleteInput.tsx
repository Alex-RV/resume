import React, { useState, useEffect, useRef } from 'react';

interface SortingOptions {
  sortingOption: 'alphabetical' | 'includes';
}

export default function AutocompleteInput({
  onChange,
  value,
  options,
  defaultValue,
  sortingOption,
}: {
  onChange: (value: string) => void;
  value: string;
  options: string[];
  defaultValue: string;
  sortingOption: SortingOptions['sortingOption'];
}) {
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

    let filteredOptions;

    if (sortingOption === 'alphabetical') {
      filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      ).sort();
    } else if (sortingOption === 'includes') {
      filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    setFilteredOptions(filteredOptions);
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
    setInputDisabled(true);
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
    <div className="relative w-full" onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleDropdownToggle}
        disabled={inputDisabled}
        className={`w-full p-2 border rounded focus:outline-none ${
          showDropdown
            ? 'border-blue-400 dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white'
            : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black dark:text-white'
        }`}
        placeholder="🔎 Search..."
        ref={inputRef}
      />

      <button
        onClick={handleDropdownToggle}
        disabled={inputDisabled}
        className={`absolute right-0 top-0 h-full px-3 text-gray-500 transition-transform transform ${
          showDropdown ? 'rotate-180' : ''
        }`}
      >
        🔻
      </button>

      <button
        onClick={handleClear}
        className={`absolute right-10 top-0 h-full px-3 text-gray-500 focus:outline-none ${
          showDropdown ? 'hover:text-gray-700' : ''
        }`}
      >
        Clear
      </button>

      {showDropdown && (
        <ul className={`absolute z-10 w-full py-2 mt-2 rounded-md shadow-lg max-h-48 overflow-y-auto ${
          options.length === 0 ? '' : 'border dark:border-gray-600 border-gray-300'
        } ${
          showDropdown
            ? 'bg-white dark:bg-gray-700 text-black dark:text-white'
            : 'bg-white dark:bg-gray-700 text-black dark:text-white'
        }`}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selectedOptionIndex === index ? 'bg-gray-200 dark:bg-gray-500' : ''
              }`}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && inputValue.length > 0 && (
            <li className="px-4 py-2 text-gray-500">No options</li>
          )}
        </ul>
      )}
    </div>
  );
}