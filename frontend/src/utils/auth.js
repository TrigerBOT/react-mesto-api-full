import BadRequest from "../errors/BadRequest";
import Unauthorized from "../errors/Unauthorized";
import { baseUrl } from "./constants";

export const register = (password, email) => {
  return fetch(`${baseUrl}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        if (err.error) {
          throw new BadRequest(err.error);
        } else {
          throw new BadRequest(err.message);
        }
      });
    }
    return res.json();
  });
};

  

export const authorize = (password, email) => fetch(`${baseUrl}/sign-in`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ password, email }),
})
.then((res) => {
  	return res.json()
})
	.then((res) => {
		if (res.jwt) {
			localStorage.setItem('jwt', res.jwt);
      console.log(res)
			return res;
		}
	})
.catch(err => {
	if (err.status === 400) {
		throw new BadRequest('Не передано одно из полей');
	} else if (err.status === 401) {
		throw new Unauthorized('Пользователь с таким email не найден');
	}

	throw Error(`Произошла ошибка: ${err.status}`);
});




export const getContent = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
  })
    .then((res) => {
      
      return res.json() 
    }).catch((err) => {
      throw new Unauthorized(err.message)
    })

};

// Bearer 