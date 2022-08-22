import { useState, useEffect } from 'react';

const PublicMembers = (props) => {

  // Deconstruct Props Object
  const { publicMembersUrl } = props;

  // Initialize Public Members State
  const [publicMembersData, setPublicMembersData] = useState([]);
  const [clicked, setClicked] = useState(false);

  // Use Effect call on component mount
  useEffect(() => {
    fetchPublicMembersData();
  }, []);

  // Helper Function to remove the random members part of the Members and Public Members URL
  function updateUrl (str) {
    const newStr = str.replace('{/member}', '');
    return newStr;
  }

  // Async Function to fetch membersData.
  async function fetchPublicMembersData () {
    const res = await fetch(updateUrl(publicMembersUrl), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    // Catch Errors
    if (!res.ok) {
      const errMsg = `An error has occured with fetchPublicMembersData ${res.status}`;
      throw new Error(errMsg);s
    }

    const publicMembersFetchData = await res.json();
    setPublicMembersData(publicMembersFetchData);
  }

  // New Array of objects holding the key value pairs we want.
  const finalPublicMembersData = publicMembersData.map((el) => {
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
  const publicMembersComponentArr = [];
  // Use a for loop
  for (let i = 0; i < finalPublicMembersData.length; i++) {
    // Declarative const
    const el = finalPublicMembersData[i];
    publicMembersComponentArr.push(
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
  function buttonRenderPublicMembers () {
    if (clicked) return <div className='publicMembers-components'>{publicMembersComponentArr}</div>
  }
  return (
    <div className='publicMembers'>
      <button onClick={() => setClicked((prevClicked) => !prevClicked)}>Public Members</button>
      {buttonRenderPublicMembers()}
    </div>
  )
}

export { PublicMembers };