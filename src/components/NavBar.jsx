import Button from '@mui/material/Button';

const NavBar = (props) => {

  // Deconstruct Is Open 
  const { isOpen, setIsOpen } = props;

  // Function to change Booelean state
  function toggleAboutMe () {
      setIsOpen(!isOpen)
  }

  console.log('isopen', isOpen)

  return (
    <div className='navBar'>
      <img className='navBar-img' src='https://avatars.githubusercontent.com/u/1214096?v=4/'/>
      <div className='button-div'>
      <Button className='about-me-button' variant='text' onClick={() => toggleAboutMe()}>About Me</Button>
      </div>
    </div>
  )
}

export { NavBar }