const express = require('express');
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

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



app.post('/download', (req, res) => {
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

app.listen(5000, () => console.log('Server Started...'));