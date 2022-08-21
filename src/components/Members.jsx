import { useState, useEffect } from 'react';

const Members = (props) => {

  const { membersApi } = props;

  console.log(updateUrl(membersApi));
  // Initialize Members Component State
  const [ membersData, setMembersData ] = useState({});

  // Helper Function to remove the random members part of the Members and Public Members URL
  function updateUrl (str) {
    const newStr = str.replace('{/member}', '');
    return newStr;
  }

}

export { Members }