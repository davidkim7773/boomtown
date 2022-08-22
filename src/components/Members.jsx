import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const Members = (props) => {

  // Deconstruct membersUrl
  const { membersUrl } = props;

  // Initialize Members Component State
  const [membersData, setMembersData] = useState([]);
  const [clicked, setClicked] = useState(false);

  // Use Effect call on component mount
  useEffect(() => {
    fetchMembersData();
  }, []);

  // Helper Function to remove the random members part of the Members and Public Members URL
  function updateUrl (str) {
    const newStr = str.replace('{/member}', '');
    return newStr;
  }

  // Async Function to fetch membersData.
  async function fetchMembersData () {
    const res = await fetch(updateUrl(membersUrl), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    // Catch Errors
    if (!res.ok) {
      const errMsg = `An error has occured with fetchMembersData ${res.status}`;
      throw new Error(errMsg);s
    }

    const membersFetchData = await res.json();
    setMembersData(membersFetchData);
  }

  // New Array of objects holding the key value pairs we want.
  const finalMembersData = membersData.map((el) => {
    return {
      id: el.id,
      login: el.login,
      avatar_url: el.avatar_url,
      html_url: el.html_url,
      type: el.type,
      site_admin: el.site_admin
    }
  })

  // Create an array of components using a for loop.
  const membersComponentArr = [];
  // Use a for loop
  for (let i = 0; i < finalMembersData.length; i++) {
    // Declarative const
    const el = finalMembersData[i];
    membersComponentArr.push(
      <ul className='membersDataList' key={i}>
        <img src={el.avatar_url}/>
        <li><strong>ID: </strong>{String(el.id)}</li>
        <li><strong>Login: </strong>{el.login}</li>
        <li><strong>Type: </strong>{el.type}</li>
        <li><strong>Site Admin: </strong>{String(el.site_admin)}</li>
        <li><strong>Html URL: </strong>{el.html_url}</li>
      </ul>
    )
  }

   // Rendering Function for our components to appear depending on button Click
   function buttonRenderMembers () {
    if (clicked) return <div className='members-components'>{membersComponentArr}</div>
  }

  return (
    <div className='members'>
      <Button variant='outlined' onClick={() => setClicked((prevClicked) => !prevClicked)}>Members</Button>
      {buttonRenderMembers()}
    </div>
  )
}

export { Members }