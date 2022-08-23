import Button from '@mui/material/Button';

const NavBar = (props) => {

  // Deconstruct Is Open 
  const { isOpen, setIsOpen } = props;

  // Function to change Booelean tate
  function toggleAboutMe () {
      setIsOpen(!isOpen)
  }

  console.log('isopen', isOpen)

  return (
    <div className='navBar'>
      <Button className='about-me-button' variant='text' onClick={() => toggleAboutMe()}>About Me</Button>
    </div>
  )
}

export { NavBar }