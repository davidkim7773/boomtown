import { useState, useEffect } from 'react';

const Repos = (props) => {

  // Deconstruct props ojbect with repoUrl

  const { repoUrl } = props;
  
  // Deconstruct Repo Data that we need.

  const { id, name, html_url, description, language, created_at, updated_at, pushed_at } = repoData
  // Initalize Repo Component State;
  const [repoData, setRepoData] = useState({});

  // Repo Date Fetch
  useEffect(() => {
    fetchRepoData();
  }, []);

  async function fetchRepoData () {
    const res = await fetch(repoUrl, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    // Catch errors
    if (!res.ok && res === undefined) {
      const msg = `An error has occured with fetchRepoData ${res.status}`
      throw new Error(msg);
    }
    const repoFetchData = await res.json();
    setRepoData(repoFetchData);
  }
  console.log('repos', repoData);


  return (
    <div className='repos'>
      <h1>test</h1>
    </div>
  )
}

export { Repos }