import { useState, useEffect } from 'react';

const Repos = (props) => {

  // Deconstruct props ojbect with repoUrl
  const { repoUrl } = props;

  // Initalize Repo Component State;
  const [repoData, setRepoData] = useState([]);
  const [clicked, setClicked] = useState(false);
  
  // Repo Date Fetch
  useEffect(() => {
    fetchRepoData();
  }, []);

    // Async Function to fetch repo data
  async function fetchRepoData () {
      const res = await fetch(repoUrl, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });

      // Catch errors
      if (!res.ok) {
        const errMsg = `An error has occured with fetchRepoData ${res.status}`
        throw new Error(errMsg);
      }

      const repoFetchData = await res.json();
      setRepoData(repoFetchData);
    }

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
  })

  // Create an array of components using a forloop
  const repoComponentArr = [];

  // For loop through data array to create an array of components to display.
  for (let i = 0; i < finalRepoData.length; i++) {

    // Declare Constant for declarative code
  const el = finalRepoData[i];
    repoComponentArr.push(
      <ul className='repoDataList' key={i}>
        <li><strong>ID: </strong>{String(el.id)}</li>
        <li><strong>Name: </strong>{el.name}</li>
        <li><strong>HTML: </strong>{el.html_url}</li>
        <li><strong>Description: </strong>{el.description}</li>
        <li><strong>Language: </strong>{el.language}</li>
        <li><strong>Created At: </strong>{el.created_at}</li>
        <li><strong>Updated At: </strong>{el.updated_at}</li>
        <li><strong>Pushed At: </strong>{el.pushed_at}</li>
      </ul>
    )
  }

  // Rendering Function for our components to appear depending on button Click
  function buttonRenderRepos () {
      if (clicked) return <div className='repo-components'>{repoComponentArr}</div>
    }

  return (
    <div className='repos'>
      <button onClick={() => setClicked((prevClicked) => !prevClicked)}>Repos</button>
      {buttonRenderRepos()}
    </div>
  )
}

export { Repos }