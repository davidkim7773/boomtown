import { useState, useEffect } from 'react';

const Repos = (props) => {

  // Deconstruct props ojbect with repoUrl
  const { repoUrl } = props;

  // Initalize Repo Component State;
  const [repoData, setRepoData] = useState({});

  // Repo Date Fetch
  useEffect(() => {
    fetchRepoData();
  }, []);

  // Construct a new array of Objects to hold distinguish the data that we want.
  const finalRepoData = repoData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      html_url: el.html_url,
      description: el.description,
      language: el.language,
      created_at: el.created_at,
      updated_at: el.updated_at,
      pushed_at: el.pushed_at
    }
  });

  // Async Function to fetch repo data
  async function fetchRepoData () {
    const res = await fetch(repoUrl, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    // Catch errors
    if (!res.ok) {
      const msg = `An error has occured with fetchRepoData ${res.status}`
      throw new Error(msg);
    }
    const repoFetchData = await res.json();
    setRepoData(repoFetchData);
  }

  // Deconstruct finalRepoData that we need.
  const { id, name, html_url, description, language, created_at, updated_at, pushed_at } = finalRepoData;
  
  return (
    <div className='repos'>
      <h1>test</h1>
    </div>
  )
}

export { Repos }