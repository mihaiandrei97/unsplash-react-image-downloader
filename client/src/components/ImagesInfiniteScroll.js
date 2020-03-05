import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Image from './Image';

const alias = "unsplash-downloader-";

const ImagesInfiniteScroll = ( { searchValue } ) => {
  const [defaultItems, setDefaultItems] = useState([]);
  const [paginate, setPaginate] = useState({
    start: 1,
    count: 30
  });
  const [searchedItems, setSearchedItems] = useState([]);
  const [paginateSearchedItems, setPaginateSearchedItems] = useState({
    start: 1,
    count: 30
  });

  useEffect(() => {
    axios.get(`/api/photos?start=${paginate.start}&count=${paginate.count}`)
      .then((res) => {
        setDefaultItems(defaultItems => [...defaultItems, ...res.data]);
      })
  }, [paginate])

  useEffect(() => {
    setSearchedItems([]);
    setPaginateSearchedItems(paginateSearchedItems => ({
      ...paginateSearchedItems,
      start: 1
    }));
  }, [searchValue])

  useEffect(() => {
    if( searchValue !== '') {
      axios.get(`/api/photos/search?start=${paginateSearchedItems.start}&count=${paginateSearchedItems.count}&searchValue=${searchValue}`)
      .then((res) => {
        console.log(res.data.results);
        setSearchedItems(searchedItems => [...searchedItems, ...res.data.results]);
      })
    }
    
  }, [paginateSearchedItems])



  const increasePagination = (type) => {
    if(type === 'default') {
      setPaginate({
        count: paginate.count,
        start: paginate.start + 1
      })
    } else if( type === 'search') {
      setPaginateSearchedItems({
        count: paginateSearchedItems.count,
        start: paginateSearchedItems.start + 1
      })
    }
    
  }

  const buildLoading = () => {
    return <div className={`${alias}loading-wrapper`}>
      <Loader
        type="Puff"
        color="#fff"
        height={100}
        width={100}
        style={{textAlign: 'center'}}
      />
      <p style={{color: '#fff'}}>Loading Images</p>
    </div>
  }

  const buildInfiniteScroll = (items, type) => {

    return (
      <InfiniteScroll
        dataLength={ items.length }
        className={`${alias}images`}
        next={ () => increasePagination(type) }
        hasMore={ true }
        loader={ buildLoading() }>
        {
          items.map((image, index) => {
            return <Image  key={ index }  image={image} />
          })
        }
      </InfiniteScroll> 
    )
  }


  return (
    <div className={`${alias}infinite-scroll-wrapper`}> 
      { searchValue === '' && searchedItems.length === 0 ? buildInfiniteScroll(defaultItems, 'default') : buildInfiniteScroll(searchedItems, 'search')}
    </div>
  )
}

export default ImagesInfiniteScroll;
