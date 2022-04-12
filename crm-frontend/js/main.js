import {CLIENTS} from './data.js';
import {BODY, HEADER, MAIN, LOADING, BTN_ADD_CLIENT} from './const.js';
import {request, requestSettings} from './api.js';
import {render} from './help.js';

(() => {
  window.addEventListener('DOMContentLoaded', async function(){
    BODY.append(HEADER, MAIN.main)
    MAIN.tableBody.append(LOADING)

    const response = await request()

    MAIN.container.append(BTN_ADD_CLIENT)

    CLIENTS.arr = [...response]

    render(CLIENTS.arr)
  })
})()
