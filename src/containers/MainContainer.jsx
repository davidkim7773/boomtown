import { useState, useEffect } from 'react';
import { OrganizationMain } from '../components/OrganizationMain';
import { Repos } from '../components/Repos'

const MainContainer = () => {

  const apiEndpoint = 'https://api.github.com/orgs/boomtownroi';

  // Set a default value of state; initialized if we want to prop drill down data to child components.
  const [data, setApiData] = useState({});
  const [repo, setRepoUrl] = useState('');

  // Initial Data Fetch
  useEffect(() => {
    fetchApiData();
  }, []);

  async function fetchApiData() {
    const res = await fetch(apiEndpoint, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });

    if (res.ok) {
      const newData = await res.json();
      setApiData(newData)
      setRepoUrl(newData.repos_url)
    }
    // Catch errors
    else if (!res.ok) {
      const msg = `An error has occured with fetchData ${res.status}`
      throw new Error(msg)
    }
  }

  // Conditional Rendering Function
  function renderRepo () {
    if (repo.length > 0) return <Repos repoUrl={repo}/>
  }

  return (
    <div className='main-container'>
      <OrganizationMain
        apiData={data}
      />
      {renderRepo()}
    </div>
  )

}

export { MainContainer };