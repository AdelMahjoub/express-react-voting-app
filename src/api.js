import axios from 'axios';

// GET all polls
export function getAllPolls(callback) {
  axios.get('/api/polls')
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback([]);
    });
}

// GET all polls of a specific user
export function getUserPolls(userId, callback) {
  axios.get(`/api/polls/users/${userId}`)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback([]);
    });
}

// GET request, returns authenticated user polls
export function dashboardPolls(callback) {
  axios.get(`/api/dashboard`)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback([]);
    });
}


// GET request, get a poll by id
export function getPollById(pollId, callback) {
  axios.get(`/api/polls/${pollId}`)
    .then(res => {
      return callback(res.data);
    })
}

// GET request, vote in a poll
export function vote(pollId, optionsId, callback) {
  axios.get(`/api/polls/vote/${pollId}/${optionsId}`)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback({errors: ['Unexpected error, please try again']});
    }) 
}

// GET request, delete a poll
export function deletePoll(pollId, callback) {
  axios.get(`/api/polls/delete/${pollId}`)
    .then(res => {
      return callback(res.data);
    });
}

// POST request, update a poll
export function updatePoll(data, callback) {
  axios.post('/api/polls/update', data)
    .then(res => {
      callback(res.data);
    })
}

// POST request, add a poll
export function addPoll(data, callback) {
  axios.post('/api/polls/add', data)
    .then(res => {
      callback(res.data);
    })
}

// POST signup credentials
export function signup(email, password, callback) {
  axios.post('/api/signup', {email, password})
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback({errors: ['Unexpected error']});
    });
}

// POST credentials to login
export function login(email, password, callback) {
  axios.post('/api/login', {email, password})
    .then(res => {
      return callback(res.data);
    })
    .catch(err => {
      return callback(false)
    })
}

// GET request to logout
export function logout(callback) {
  axios.get('/api/logout')
    .then(res => {
      callback();
    })
    .catch(err => {
      callback();
    });
}

// GET request, test if use is authenticated
export function isAuth(callback) {
  axios.get('/api/check-user')
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback(false);
    })
}