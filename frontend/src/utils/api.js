import { authorization, baseUrl } from "./constants";

class Api {
  constructor(address, token) {
    this._baseUrl = address;
    this._token = token;
  }

  // выгрузить карточки с сервера
  getInitialsCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) =>{
    return   res.json()}
    );
  }



  //Редактирование данных профиля
  editUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then((res) =>{
    console.log(res);
     return  res.json() }
    );
  }

  //добавить карточку
  postCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) =>{
       
       return res.json()}
    );
  }

  //Удалить карточку
  removeCard(item) {
    return fetch(`${this._baseUrl}/cards/${item}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) =>{
      return  res.json() }
    );
  }

  //Обновление аватара
  editAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then((res) =>{
      return   res.json() }
    );
  }

  changeLikeCardStatus(item, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${item}`, {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }).then((res) =>{
        return   res.json() }
      );
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${item}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) =>{
        return  res.json() }
      );
    }
  }
}

const api = new Api(baseUrl, authorization);

export default api;
