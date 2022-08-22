import { useState, useEffect } from 'react' ;
import Button from '@mui/material/Button';

const Events = (props) => {

  // Deconstruct Events Url
  const { eventsUrl } = props;

  // Initialize Events Component State
  const [eventsData, setEventsData] = useState([]);
  const [clicked, setClicked] = useState(false);
  
  // Use Effect call on component mount
  useEffect(() => {
    fetchEventsData()
  }, []);

  //Fetch function to run 
  async function fetchEventsData () {
    const res = await fetch(eventsUrl, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    // Catch Errors
    if (!res.ok) {
      const errMsg = `An error has occured with fetchEventsData ${res.status}`;
      throw new Error(errMsg);
    }

    const eventsFetchData = await res.json();
    setEventsData(eventsFetchData);
  };

  // New Array of objects holding the key value pairs we want.
  const finalEventsData = eventsData.map((el) => {
    return {
      id: el.id,
      type: el.type,
      repo_name: el.repo.name,
      repo_url: el.repo.url,
      created_at: el.created_at
    }
  })

  // Create an array of components using a forLoop.
  const eventsComponentArr = [];
  
  // Use a For loop
  for (let i = 0; i < finalEventsData.length; i++) {
    // Declarative const
    const el = finalEventsData[i];
    eventsComponentArr.push(
      <ul className='eventsDataList' key={i}>
        <li><strong>ID: </strong>{el.id}</li>
        <li><strong>Type: </strong>{el.type}</li>
        <li><strong>Repo Name: </strong>{el.repo_name}</li>
        <li><strong>Repo URL: </strong>{el.repo_url}</li>
        <li><strong>Created At: </strong>{el.created_at}</li>
      </ul>
    )
  }

   // Rendering Function for our components to appear depending on button Click
   function buttonRenderEvents () {
    if (clicked) return <div className='events-components'>{eventsComponentArr}</div>
  }
  
  return (
    <div className='events'>
      <Button className='events-button' variant='outlined' onClick={() => setClicked((prevClicked) => !prevClicked)}>Events</Button>
      {buttonRenderEvents()}
    </div>
  )
}

export { Events }