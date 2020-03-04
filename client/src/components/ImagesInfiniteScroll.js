import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const alias = "unsplash-downloader-";

const ImagesInfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [paginate, setPaginate] = useState({
    start: 1,
    count: 30
  });
  
  useEffect(() => {
    axios.get(`/api/photos?start=${paginate.start}&count=${paginate.count}`)
      .then((res) => {
        
        setItems([...items, ...res.data]);
      })
  }, [paginate])

  const fetchImages = () => {
    setPaginate({
      count: paginate.count,
      start: paginate.start + 1
    })
  }

  const buildInfiniteScroll = () => {

    return <InfiniteScroll
      dataLength={ items.length }
      className={`${alias}images`}
      // next={ fetchImages }
      hasMore={ true }
      loader={<h4 className={`${alias}loading`}>Loading...</h4>}
    >
      {
        items.map((image, index) => {
          return <div key={ index } className={`${alias}gallery-item`}><img key={ index } className={`${alias}single-photo`} src={ image.urls.small } alt="" /></div>
        })
      }
    </InfiniteScroll> 
  }

  console.log(items);
  return (
    <div className={`${alias}infinite-scroll-wrapper`}> 
      { buildInfiniteScroll() }
    </div>
  )
}

export default ImagesInfiniteScroll;
