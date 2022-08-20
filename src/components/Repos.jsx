import { useState, useEffect } from 'react';

const Repos = (props) => {

  // Deconstruct props ojbect with repoUrl
  const { repoUrl } = props;
  // Initalize Repo Component State;
  const [repoData, setRepoData] = useState({});

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
  
  useEffect(() => {
    fetchRepoData();
  }, []);

  return (
    <div className='repos'>
      <h1>test</h1>
    </div>
  )
}

export { Repos }