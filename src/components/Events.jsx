import { useState, useEffect } from 'react' ;

const Events = (props) => {

  // Deconstruct Events Url
  const { eventsUrl } = props;

  // Initialize Events Component State
  const [eventsData, setEventsData] = useState([]);

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

  console.log('eventsData', eventsData);
}

export { Events }