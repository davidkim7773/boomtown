import { useState, useEffect } from 'react' ;

const Events = (props) => {

  // Deconstruct Events Url
  const { eventsUrl } = props;

  // Initialize Events Component State
  const [eventsData, setEventsData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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
  const finalEventData = eventsData.map((el) => {
    return {
      id: el.id,
      type: el.type,
      repo_name: el.repo.name,
      repo_url: el.repo.url,
      created_at: el.created_at
    }
  })

  console.log('finalEventData', finalEventData);
}

export { Events }