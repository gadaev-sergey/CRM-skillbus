import {createHeader, createMain, createButtonAddClient, createTableLoading} from './elements.js';

export const BODY = document.querySelector('body'),
              HEADER = createHeader(),
              MAIN = createMain(),
              LOADING = createTableLoading(),
              BTN_ADD_CLIENT = createButtonAddClient()