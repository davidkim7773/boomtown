import { useState, useEffect } from 'react';
import { OrganizationMain } from '../components/OrganizationMain';
import { Repos } from '../components/Repos'
import { Members } from '../components/Members'

const MainContainer = () => {

  const apiEndpoint = 'https://api.github.com/orgs/boomtownroi';

  // Set a default value of state; initialized if we want to prop drill down data to child components.
  const [data, setApiData] = useState({});
  const [repoUrl, setRepoUrl] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [membersUrl, setMembersUrl] = useState ('');
  const [publicMembersUrl, setPublicMembersUrl] = useState('');
  
  // Initial Data Fetch
  useEffect(() => {
    fetchApiData();
  }, []);

  //Async function to fetch initial api data
  async function fetchApiData() {
    const res = await fetch(apiEndpoint, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    //Catch Errors
    if (res.ok) {
      const newData = await res.json();
      setApiData(newData);
      setRepoUrl(newData.repos_url);
      setEventUrl(newData.events_url);
      setMembersUrl(newData.members_url);
      setPublicMembersUrl(newData.public_members_url);
    }
    // Catch errors
    else if (!res.ok) {
      const msg = `An error has occured with fetchData ${res.status}`
      throw new Error(msg)
    }
  }

  // Conditional Rendering Function
  function renderRepo () {
    if (repoUrl.length > 0) return <Repos repoUrl={repoUrl}/>
  }

  return (
    <div className='main-container'>
      <OrganizationMain
        apiData={data}
      />
      {renderRepo()}
      <Members
        membersApi={membersUrl}
      />
    </div>
  )
}

export { MainContainer };