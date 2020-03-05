import React from 'react';
import Background from '../assets/background.png';
import Search from '../assets/search.png';
const alias = "unsplash-downloader-";

const Header = ({ searchValue, setSearchValue }) => {
  const [ inputValue, setInputValue ] = React.useState('');

  React.useEffect( () => {
      setInputValue(searchValue);
  }, [searchValue]);

  return (
    <header style={{
        backgroundImage:`url(${Background})`,
        width: '100%',
        height: '300px'    
    }}>
        <div className={`${alias}title-wrapper`}>
            <h2 className={`${alias}title`}>Unsplash React Image Downloader</h2>
        </div>
        <div className={`${alias}form`}>
            <input className={`${alias}input`} placeholder="Search for high-resolutions photos" value={ inputValue } onChange={(e) => setInputValue(e.target.value)}/>
            <span className={`${alias}search`} onClick={() => setSearchValue(inputValue)}><img alt="search-icon" className={`${alias}icon`} src={Search} /></span>
        </div>

    </header>
  )
}

export default Header;
