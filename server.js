const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@glop.com',
      password: 'aliens',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Jane',
      email: 'jane@glab.com',
      password: 'notaliens',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      res.json(user);
      found = true;
    }
  });
  if (!found) {
    res.status(404).json('user does not exist');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      res.json(user.entries);
      found = true;
    }
  });
  if (!found) {
    res.status(404).json('user does not exist');
  }
});

app.listen(3000, () => {
  console.log('running on port 3000');
});
