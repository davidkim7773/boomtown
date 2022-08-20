import { useState, useEffect } from 'react';

const Repos = (props) => {

  // Deconstruct props ojbect with repoUrl
  const { repoUrl } = props;
  // Initalize Repo Component State;
  const [repoData, setRepoData] = useState({});

  async function fetchRepoData () {
    const res = await fetch(repoUrl);
    // Catch errors
    if (!res.ok) {
      const msg = `An error has occured with fetchRepoData ${res.status}`
      throw new Error(msg);
    }
    const repoFetchData = await res.json();
    setRepoData(repoFetchData);
  }
  console.log('repo', repoUrl)
  console.log('repo', repoData);
  
  useEffect(() => {
    fetchRepoData();
  }, []);


}

export { Repos }