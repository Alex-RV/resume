import React, { useState } from 'react';
import AutocompleteInput from '../components/AutocompleteInput';
import Container from '../components/Container';

export default function Windborne() {
    const options = [
        'San Francisco',
        'Oakland',
        'San Leandro',
        'Lake Merritt',
        'Stanford',
        'Berkeley',
        'Palo Alto',
        'Fremont',
        'Mountain View',
        'Sunnyvale'
      ];

  const [selectedValue, setSelectedValue] = useState('');
  const [selectionRequired, setSelectionRequired] = useState(false);

  const handleAutocompleteChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectionRequired(false);

    if (selectedValue) {
        setSelectionRequired(false);
        alert(`Selected value: ${selectedValue}`);
    } else {
        setSelectionRequired(true);
    }
  };

  return (
    <Container>
      <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          WindBorne :
        </h1>
        <h1 className="text-2xl font-semibold mb-12 text-black dark:text-white">Autocomplete Input Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="autocomplete" className="block font-medium mb-2 text-black dark:text-white">
              Select a location:
            </label>
            <AutocompleteInput
                options={options}
                value={selectedValue}
                onChange={handleAutocompleteChange}
                defaultValue={null} 
                sortingOption={'includes'}/>
          </div>
          {selectionRequired && <p className='text-red-700 mb-1'>Chose the option first</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}
