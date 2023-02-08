import React, { useState, useEffect } from 'react'
import Container from '../components/Container';



export default function Ip() {
    const [dataIP, setDataIP] = useState('')
    const [country_code, setCountry_code] = useState('')
    const [country_name, setCountry_name] = useState('')
    const [city, setCity] = useState('')
    const [postal, setPostal] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [IPv4, setIPv4] = useState('')
    const [state, setState] = useState('')
    useEffect(() => {
      let data,country_code,country_name,city,postal,latitude,longitude,IPv4,state  = ''
        
        fetch('https://geolocation-db.com/json/')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

          country_code=myJson.country_code
          country_name=myJson.country_name
          city=myJson.city
          postal=myJson.postal
          latitude=myJson.latitude
          longitude=myJson.longitude
          IPv4=myJson.IPv4
          state=myJson.state
        setDataIP(data)
        setCountry_code(country_code)
        setCountry_name(country_name)
        setCity(city)
        setPostal(postal)
        setLatitude(latitude)
        setLongitude(longitude)
        setIPv4(IPv4)
        setState(state)
        });
            fetch('https://api.ipify.org?format=json')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {

                data=myJson.ip
            setDataIP(data)
            });
    }, [])
  return (
    <Container>
        <div className="flex flex-col items-start max-w-2xl w-full mx-auto mb-16">
        <ul className="font-bold justify-start flex-col text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          <li>IP : {dataIP}</li>
          <li>Country Code : {country_code}</li>
          <li>Country Name : {country_name}</li>
          <li>City : {city}</li>
          <li>Postal : {postal}</li>
          <li>Latitude : {latitude}</li>
          <li>Longitude : {longitude}</li>
          <li>IPv4 : {IPv4}</li>
          <li>State : {state}</li>
        </ul>
        {/* <button role="button"className='button-ip' onClick={() =>getIPData()}>Get my IP</button> */}
    </div>
    </Container>
    
  )
}
