import { useState, useEffect } from 'react';

const OrganizationMain = (props) => {

  // Deconstruct Props Obj
  const { apiData } = props;

  function dateFunc(str) {
    const newDate = new Date(str);
    const year = newDate.getFullYear();
    const month = newDate.getMonth()
    const day = newDate.getDate();
    const hyphenDate = [month, day, year].join('-')
    return String(hyphenDate);
  };

  // Deconstruct data object 
  const { id, name, html_url, is_verified, created_at, updated_at } = apiData;

  return(
    <div className='organization-info'>
      <ul className='list'>
        <li>Id: {id}</li>
        <li>Company Name: {name}</li>
        <li>URL: {html_url}</li>
        <li>Verified: {String(is_verified)}</li>
        <li>Created At: {dateFunc(created_at)}</li>
        <li>Updated At: {dateFunc(updated_at)}</li>
      </ul>
    </div>
  )
}

export { OrganizationMain }