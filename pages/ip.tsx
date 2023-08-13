import React, { useState, useEffect } from 'react'
import Container from '../components/Container';
import AutocompleteInput from '../components/AutocompleteInput';

function LiElement({ text, element }) {
  return (
    <li className='flex flex-row gap-3 items-start max-w-2xl w-full mx-auto'>
      <h1 className="text-[1rem] sm:text-[2rem] text-black dark:text-white">{text}</h1>
      <h1 className="text-[1rem] sm:text-[2rem] font-bold text-black dark:text-gray-100">{element}</h1>
    </li>
  );
}

export default function Ip() {
  const options = ['San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford','San Francisco', 'Oakland', 'San Leandro', 'Lake Merrit', 'Stanford',];
  const [selectedValue, setSelectedValue] = useState('');

  const handleAutocompleteChange = (value) => {
    setSelectedValue(value);
  };
    const [dataIP, setDataIP] = useState('')
    const [country_code, setCountry_code] = useState('')
    const [country_name, setCountry_name] = useState('')
    const [city, setCity] = useState('')
    const [postal, setPostal] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [IPv4, setIPv4] = useState('')
    const [state, setState] = useState('')
    const [ip, setIP] = useState('')
    const [version, setVersion] = useState('')
    const [org, setOrg] = useState('')
    useEffect(() => {

        let data,country_code,country_name,city,postal,latitude,longitude,IPv4,state,version,ip,org  = ''
        fetch('https://ipapi.co/json/')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

          version=myJson.version
          ip=myJson.ip
          org=myJson.org
        setVersion(version)
        setIP(ip)
        setOrg(org)
        });
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
    <Container 
    title="IP – Alex Rabov"
    description="Find out information about your IP">
        <div className="flex flex-col items-start max-w-2xl w-full mx-auto mb-16">
        <ul className=" justify-start flex-col tracking-tight mb-16 ">
          <LiElement text={"IP: "} element={ip}/>
          <LiElement text={"Country Code: "} element={country_code}/>
          <LiElement text={"Country Name: "} element={country_name}/>
          <LiElement text={"City: "} element={city}/>
          <LiElement text={"Postal: "} element={postal}/>
          <LiElement text={"Latitude: "} element={latitude}/>
          <LiElement text={"Longitude: "} element={longitude}/>
          <LiElement text={`${version}: `} element={dataIP}/>
          <LiElement text={"State: "} element={state}/>
          <LiElement text={"Provider: "} element={org}/>
        </ul>
    </div>
    

    <AutocompleteInput
        options={options}
        value={selectedValue}
        onChange={handleAutocompleteChange}
        defaultValue={null}      
        />
    </Container>
    
  )
}