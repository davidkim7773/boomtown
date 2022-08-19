import { useState, useEffect } from 'react';

const OrganizationMain = () => {
  const apiEndpoint = 'https://api.github.com/orgs/boomtownroi';

  // Set a default value of state
  const [data, setData] = useState({});

  // Create a function to run everytime the component mounts on the dom.
  const fetchData = () => {
    fetch(apiEndpoint)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(console.log('Issue with fetchData'))
  };

  console.log('test', data)
  useEffect(() => {
    fetchData()
  }, [])

  // Use Helper function to clean up Created_at and updated_at
  
  const dateFunc = (str) => {
    const newDate = new Date(str);
    const year = newDate.getFullYear();
    const month = newDate.getMonth()
    const day = newDate.getDate();
    const hyphenDate = [month, day, year].join('-')
    return String(hyphenDate);
  }  

  // Deconstruct data object 
  const { id, name, html_url, is_verified, created_at, updated_at } = data;

  return(
    <div className='organization-info'>
      <ul className='list'>
        <li>Id: {id}</li>
        <li>Company Name: {name}</li>
        <li>URL: {html_url}</li>
        <li>Verified: {String(is_verified)}</li>
        <li>Created At: {dateFunc(created_at)}</li>
        <li>Updated At: {dateFunc(updated_at)}</li>
      </ul>
    </div>
  )
}

export { OrganizationMain }