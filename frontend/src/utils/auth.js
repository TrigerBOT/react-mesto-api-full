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

export const authorize = (password, email) => {
  return fetch(`${baseUrl}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new BadRequest("Данные переданы не полностью или с ошибкой");
      }
      if (res.status === 401) {
        throw new Unauthorized("пользователь с email не найден");
      }
      return res.json();
    })
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);

        return data;
      }
    });
};
export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Unauthorized(err.message);
        });
      }
      return res.json();
    })
    .then((data) => data);
};
