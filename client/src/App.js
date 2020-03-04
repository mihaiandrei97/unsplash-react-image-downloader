import React from 'react';
import ImagesInfiniteScroll from './components/ImagesInfiniteScroll';
import './App.css';

const alias = "unsplash-downloader-";
const App = () => {
  return (
    <div className={`${alias}wrapper`}>
      App
      <ImagesInfiniteScroll />
    </div>
  );
}

export default App;
