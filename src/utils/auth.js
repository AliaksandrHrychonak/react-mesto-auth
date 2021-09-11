export const BASE_URL = 'https://auth.nomoreparties.co';

export const registration = ( email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    console.log(email);
    console.log(password);
    if (res.status === 201){
      return res.json();
    }
    if (res.status === 400) {
        console.log('err');
        return false
    }
  })
  .catch((err) => console.log(err))
}; 

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if (res.status === 200){
        return res.json();
      }
      if (res.status === 400) {
          console.log('400');
          return false
      }
      if (res.status === 401) {
        console.log('401');
        return false
    }
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch((err) => console.log(err))
  }; 

  export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      }
    })
    .then((res) => {
      if (res.status === 200){
        return res.json();
      }
      if (res.status === 401) {
        console.log('401');
        return false
    }
    })
    .then(data => data)
    .catch((err) => console.log(err))
  }
