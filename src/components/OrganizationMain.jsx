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

  // Deconstruct data object 
  const { id, name, html_url, is_verified, created_at, updated_at } = data;

  return(
    <div className='organization-info'>
      <p>{id}</p>
      <p>{name}</p>
      <p>{html_url}</p>
      <p>{String(is_verified)}</p>
      <p>{created_at}</p>
      <p>{updated_at}</p>
    </div>
  )
}

export { OrganizationMain }