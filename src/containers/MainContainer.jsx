import { useState, useEffect } from 'react';
import { Repos } from '../components/Repos';
import { Members } from '../components/Members';
import { Events } from '../components/Events';
import { PublicMembers } from '../components/PublicMembers';
import { AboutMe } from '../components/AboutMe';

const MainContainer = () => {

  const apiEndpoint = 'https://api.github.com/orgs/boomtownroi';

  // Set a default value of state; initialized if we want to prop drill down data to child components.
  const [data, setApiData] = useState({});
  const [repoUrl, setRepoUrl] = useState('');
  const [eventsUrl, setEventsUrl] = useState('');
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
      setEventsUrl(newData.events_url);
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
  function conditionalRenderFunc () {
    if (repoUrl.length > 0) {
    return (
      <div className='main-components'>
        <Repos repoUrl={repoUrl}/>
        <Events eventsUrl={eventsUrl}/>
        <Members membersUrl={membersUrl}/>
        <PublicMembers publicMembersUrl={publicMembersUrl}/>
      </div>
      )
    }
  }

  return (
    <div className='main-container'>
      {conditionalRenderFunc()}
    </div>
  )
}

export { MainContainer };