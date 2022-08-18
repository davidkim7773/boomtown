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

}

export { OrganizationMain }