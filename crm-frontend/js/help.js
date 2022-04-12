import {CLIENTS} from './data.js';
import {MAIN, LOADING, BODY} from './const.js';
import {createTableString} from './elements.js';
import {requestSearch} from './api.js';

export function createElem(el, options, parent) {
  const elem = document.createElement(el)
  for (const key in options) {
    if (key === 'classList') {
      for (const e of options[key]) elem.classList.add(e)
      continue
    }
    if (key === 'dataset') elem.dataset[options[key].dataName] = options[key].dataValue
    if (key === 'style') elem.style[options[key].dataName] = options[key].dataValue
    elem[key] = options[key]
  }
  if (parent) parent.append(elem)
  return elem
}

export function stringSplit(dateValue) {
  const date = new Date(dateValue),
        day = date.getDate() < 10 ?
        '0' + (date.getDate()):
        date.getDate(),
        month = date.getMonth() + 1 < 10 ?
                '0' + (date.getMonth() + 1):
                date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes() + 1 < 10 ?
                  '0' + (date.getMinutes() + 1):
                  date.getMinutes() + 1,
        data = {
          setFullDate: `${day}.${month}.${year}`,
          setFullTime: `${hours}:${minutes}`
        }
  return data
}

function sortUsers(copyArr, prop, dir) {
  return copyArr.sort((a,b) => {
    if (prop === 'fullName') return (dir ? a.surname + a.name + a.lastName > b.surname + b.name + b.lastName : a.surname + a.name + a.lastName < b.surname + b.name + b.lastName) ? -1 : 1
    else return (dir ? a[prop] > b[prop] : a[prop] < b[prop]) ? -1 : 1
  })
}

async function filterUsers(copyArr, config) {
  if (config) {
    if (CLIENTS.filterValue) {
      return copyArr = copyArr.filter(item => {
        const str = `${item.surname} ${item.name} ${item.lastName}`
        return str.toLowerCase().includes(CLIENTS.filterValue.toLowerCase())
      })
    } else return copyArr
    
  }

  if (CLIENTS.filterValue) {
    const response = await requestSearch(CLIENTS.filterValue)
    return CLIENTS.filterArr = [...response]
  } else return copyArr
}

export async function render(arr, config = false, prop = 'id', dir = false) {
  let copyArr = [...arr]

  MAIN.tableBody.innerHTML = ''
  MAIN.tableBody.append(LOADING)
  
  copyArr = await filterUsers(copyArr, config)
  sortUsers(copyArr, prop, dir)
  
  MAIN.tableBody.innerHTML = ''

  for (const user of copyArr) {
    MAIN.tableBody.append(createTableString(user))
  }
}

export function tabIndex(config) {
  BODY.querySelectorAll('a').forEach((e) => {
    config ? e.tabIndex = '-1' : e.tabIndex = '0'
  })
  BODY.querySelectorAll('button').forEach((e) => {
    config ? e.tabIndex = '-1' : e.tabIndex = '0'
  })
  BODY.querySelectorAll('input').forEach((e) => {
    config ? e.tabIndex = '-1' : e.tabIndex = '0'
  })
}