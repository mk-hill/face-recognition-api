const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '084b162d2cb445c09c89aea2e2bef79f',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to get from api'));
};

const handleImage = db => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => {
      console.log(err);
      res.status(400).json('unable to get entries');
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
