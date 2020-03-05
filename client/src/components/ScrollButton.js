import React from 'react';
const alias = "unsplash-downloader-";

const ScrollButton = ({ searchValue, setSearchValue }) => {
  const [showBtn, setShowBtn ] = React.useState(false);
  window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }
  return (
    <button style={{
        visibility: showBtn ? 'visible' : 'hidden',
        opacity: showBtn ? '1' : '0',
      }} onClick={() => window.scrollTo(0, 0) } className={`${alias}scroll-to-top`} >Scroll to top</button> 
  )
}

export default ScrollButton;
 