import React from 'react';
import ImagesInfiniteScroll from './components/ImagesInfiniteScroll';
import './App.css';
import Header from './components/Header';
import ScrollButton from './components/ScrollButton';

const alias = "unsplash-downloader-";

const App = () => {
  const [ searchValue, setSearchValue ] = React.useState('');
  return (
    <div className={`${alias}wrapper`}>
      <Header searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <ImagesInfiniteScroll searchValue={ searchValue }/>
      <ScrollButton />
    </div>
  );
}

export default App;
