import { useState } from 'react';

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [outputText, setOutputText] = useState('');
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
          const dataUrl = reader.result;
          
          const response = await fetch('/api/upload-pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              responseType: "arraybuffer",
              responseEncoding: "binary",
            },
            body: JSON.stringify({ dataUrl }),
          });
  
          const data = await response.json();
          const text = data && data.text ? data.text : [];
          setOutputText(text.join('\n'));
        };
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <input className='text-black' type="file" onChange={handleFileChange} />
        <button className='text-black' onClick={handleUpload}>Upload</button>
        <pre className='text-black'>{outputText}</pre>
      </div>
    );
  }
  