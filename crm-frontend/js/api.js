import {URL, API_CLIENTS} from './data.js';

export async function request(user) {
  const response = user ?
        await fetch(`http://${URL}${API_CLIENTS}`, {
          method: 'POST',
          body: JSON.stringify({
            name: user.name,
            surname: user.surname,
            lastName: user.lastName,
            contacts: user.contacts
          })
        }) :
        await fetch(`http://${URL}${API_CLIENTS}`),
        data = await response.json();

  return data
}

export async function requestSearch(query) {
  const response = await fetch(`http://${URL}${API_CLIENTS}?search=${query}`),
        data = await response.json();

  return data
}

export async function requestSettings(method, id, user) {
  const response = user ?
        await fetch(`http://${URL}${API_CLIENTS}/${id}`, {
          method: method,
          body: JSON.stringify({
            name: user.name,
            surname: user.surname,
            lastName: user.lastName,
            contacts: user.contacts
          })
        }) :
        await fetch(`http://${URL}${API_CLIENTS}/${id}`, {
          method: method
        }),
        data = await response.json();

  return data
}