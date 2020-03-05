global.fetch = require('node-fetch');
const config = require('universal-config');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const express = require('express');
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

const unsplash = new Unsplash({
  accessKey: config.get('APPLICATION_ID'),
  secret: config.get('SECRET'),
  callbackUrl: config.get('CALLBACK_URL')
});

const app = express();

app.use(express.json());

function download(image_url, image_name) {
  return new Promise((resolve, reject) => {
    const path = Path.resolve(__dirname, 'files', `${image_name}.jpg`);

    Axios({
        url: image_url,
        method: 'GET',
        responseType: 'stream'
    }).then((response) => {
        response.data.pipe(Fs.createWriteStream(path));

    
        response.data.on('end', () => {
            resolve('File downloaded');
        });

        response.data.on('error', (err) => {
            reject(err);
        });
      })
	  .catch((error) => {
		  reject(`${error}`);
	  });
    });
}

app.get('/api/photos', (req, res) => {
  unsplash.photos.listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(data => res.json(data))
});

app.get('/api/photos/search', (req, res) => {
  unsplash.search.photos(req.query.searchValue, req.query.start, req.query.count)
    .then(toJson)
    .then(data => res.json(data))
});

app.post('/api/download', (req, res) => {
  const image_url = req.body.image_url;
  const image_name = req.body.image_name;
  const downloadResponse = download(image_url, image_name);
  downloadResponse.then((response) => {
    console.log(response);
    res.json({msg: 'File downloaded'});
  }).catch((err) => {
    console.log(err);
    res.json({msg: err});
  });
});

app.listen(5000, () => console.log('Server Started on port 5000'));