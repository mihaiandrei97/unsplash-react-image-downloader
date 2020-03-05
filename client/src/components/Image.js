import React from 'react';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const alias = "unsplash-downloader-";

const Image = ({ image }) => {

  const [ downloadedImage, setDownloadedImage ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);

  const buildLoading = () => {
    return <div className={`${alias}loading-wrapper`}>
      <Loader
        type="Puff"
        color="#fff"
        height={100}
        width={100}
        style={{textAlign: 'center'}}
      />
      <p style={{color: '#fff'}}>Downloading Image</p>
    </div>
  }

  const downloadImage = () => {
    console.log(image.id, image.links.download);
    setLoading(true);
    axios.post(`/api/download`, {
        image_url: image.links.download,
        image_name: image.id
      })
      .then(res => {
        setDownloadedImage(true);
        setLoading(false);
      })
  }

  return (
    <div className={`${alias}gallery-item`}>
      <img className={`${alias}single-photo`} src={ image.urls.small } alt={ image.alt_description } />
      <p className={`${alias}size`}>{image.width} x {image.height}</p>
      { !downloadedImage ? <button className={`${alias}download`} onClick={ downloadImage }>Download image</button>: <button className={`${alias}download`} style={{backgroundColor: '#F5AA0A', visibility: 'visible', opacity: '1'}}>Downloaded</button> }
      { loading ? buildLoading() : ''}
    </div>
  );
}

export default Image;
