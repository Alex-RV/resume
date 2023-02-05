import React, { useState } from 'react'
import Container from '../components/Container';

export default function ip() {
    const [dataIP, setDataIP] = useState('')
    
    function getIP() {
        let data  = ''
        fetch('https://api.ipify.org?format=json')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            data=myJson.ip
        setDataIP(data)
        });
      }
  return (
    <Container>
        <div className="flex flex-col items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold justify-start text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          IP : {dataIP}
        </h1>
        <button role="button"className='button-ip' onClick={() =>getIP()}>Get my IP</button>
    </div>
    </Container>
    
  )
}
