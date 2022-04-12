import {ICONS, CLIENTS} from './data.js';
import {createElem, stringSplit, render, tabIndex} from './help.js';
import {BODY, MAIN, LOADING} from './const.js';
import {requestSettings, request} from './api.js';

export function createHeader() {
  const header = createElem('header', {
          classList: ['header']
        }),
        container = createElem('div', {
          classList: ['container', 'container--header']
        }, header),
        logo = createElem('a', {
          classList: ['logo'],
          href: 'index.html'
        }, container),
        logoImage = createElem('img', {
          classList: ['logo__img'],
          src: 'img/logo.svg',
          alt: 'Skillbus',
          width: '50',
          height: '50'
        }, logo),
        form = createElem('form', {
          classList: ['form-search']
        }, container),
        input = createElem('input', {
          classList: ['form-search__input'],
          placeholder: 'Введите запрос'
        }, form)

  let timeoutRender = null;

  input.addEventListener('input', () => {
    clearTimeout(timeoutRender)
    function valueRender() {
      CLIENTS.filterValue = input.value
      render(CLIENTS.arr)
      return
    }
    timeoutRender = setTimeout(valueRender, 300)
  })
  
  return header
}

export function createMain() {
  const main = createElem('main'),
        sectionTable = createElem('section', {}, main),
        container = createElem('div', {
          classList: ['container', 'container--main']
        }, sectionTable),
        title = createElem('h1', {
          classList: ['title'],
          textContent: 'Клиенты'
        }, container),
        tableWraper = createElem('div', {
          classList: ['table-wraper']
        }, container),
        table = createElem('table', {
          classList: ['table'],
        }, tableWraper),
        tableHead = createElem('thead', {
          classList: ['table-thead']
        }, table),
        tableBody = createElem('tbody', {
          classList: ['table-body'],
          id: 'tableBody'
        }, table),
        titleString = createElem('tr', {
          classList: ['table-string', 'table-string--title']
        }, tableHead),
        titleId = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        buttonId = createElem('button', {
          textContent: 'ID',
          classList: ['button', 'table-title', 'sorting'],
          id: 'id'
        }, titleId),
        iconFilterId = createElem('span', {
          classList: ['icon-filter'],
        }, buttonId),
        titleName = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        buttonName = createElem('button', {
          textContent: 'Фамилия Имя Отчество',
          classList: ['button', 'table-title'],
          id: 'fullName'
        }, titleName),
        iconFilterName = createElem('span', {
          classList: ['icon-filter'],
        }, buttonName),
        symbolFilterWraper = createElem('div', {
          classList: ['symbol-wraper']
        }, buttonName),
        symbolFilter = createElem('div', {
          classList: ['symbol-filter']
        }, symbolFilterWraper),
        symbolOne = createElem('div', {
          classList: ['symbol-filter--one'],
          textContent: 'А'
        }, symbolFilter),
        symbolTwo = createElem('div', {
          classList: ['symbol-filter--two'],
          textContent: '-'
        }, symbolFilter),
        symbolFree = createElem('div', {
          classList: ['symbol-filter--free'],
          textContent: 'Я'
        }, symbolFilter),
        titleDateCreate = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        buttonDateCreate = createElem('button', {
          textContent: 'Дата и время создания',
          classList: ['button', 'table-title'],
          id: 'createdAt'
        }, titleDateCreate),
        iconFilterDateCreate = createElem('span', {
          classList: ['icon-filter'],
        }, buttonDateCreate),
        titleDateChange = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        buttonDateChange = createElem('button', {
          textContent: 'Последние изменения',
          classList: ['button', 'table-title'],
          id: 'updatedAt'
        }, titleDateChange),
        iconFilterDateChange = createElem('span', {
          classList: ['icon-filter'],
        }, buttonDateChange),
        titleContacts = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        contacts = createElem('div', {
          textContent: 'Контакты',
          classList: ['table-title']
        }, titleContacts),
        titleAction = createElem('th', {
          classList: ['table-column', 'table-column--title']
        }, titleString),
        action = createElem('div', {
          textContent: 'Действия',
          classList: ['table-title']
        }, titleAction)

  function eventClickBtn(select) {
    select.addEventListener('click', () => {
      let dir = null

      if (select.classList.contains('sorting')) {
        select.classList.toggle('reverse')
      } else {
        document.querySelector('.sorting').classList.remove('reverse')
        document.querySelector('.sorting').classList.remove('sorting')
        select.classList.add('sorting')
      }

      if (select.classList.contains('reverse')) dir = true
      else dir = false

      render(CLIENTS.arr, true, select.id, dir)

    })

    return
  }

  eventClickBtn(buttonId)
  eventClickBtn(buttonName)
  eventClickBtn(buttonDateCreate)
  eventClickBtn(buttonDateChange)

  return {
    main,
    container,
    tableBody
  }
}

export function createButtonAddClient() {
  const buttonAddClient = createElem('button', {
          classList: ['button', 'btn-add-client', 'btn-secondary'],
          innerHTML: `${ICONS.addClient} Добавить клиента`
        })

  buttonAddClient.addEventListener('click', () => {
    BODY.append(createPoPupChange(true))
  })
  
  return buttonAddClient
}

export function createTableString(user) {
  let contactsAmount = null
  const titleString = createElem('tr', {
          classList: ['table-string', 'table-string--body']
        }),
        columnId = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        id = createElem('span', {
          classList: ['user-id'],
          textContent: user.id
        }, columnId),
        columnName = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        name = createElem('span', {
          classList: ['user-name'],
          textContent: `${user.surname} ${user.name} ${user.lastName}`,
        }, columnName),
        columnDateCreate = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        dateCreate = createElem('span', {
          textContent: stringSplit(user.createdAt).setFullDate,
          classList: ['user-date-create']
        }, columnDateCreate),
        timeCreate = createElem('span', {
          textContent: stringSplit(user.createdAt).setFullTime,
          classList: ['user-date-time', 'user-date-create__time']
        },dateCreate),
        columnDateChange = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        dateChange = createElem('span', {
          textContent: stringSplit(user.updatedAt).setFullDate,
          classList: ['user-date-change']
        }, columnDateChange),
        timeChange = createElem('span', {
          textContent: stringSplit(user.updatedAt).setFullTime,
          classList: ['user-date-time', 'user-date-change__time']
        }, dateChange),
        columnContacts = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        contacts = createElem('div', {
          classList: ['user-contacts']
        }, columnContacts),
        columnAction = createElem('th', {
          classList: ['table-column', 'table-column--body']
        }, titleString),
        action = createElem('div', {
          classList: ['user-action']
        }, columnAction),
        btnChange = createElem('button', {
          classList: ['button', 'user-action__btn', 'btn-change'],
          innerHTML: `${ICONS.pen}Изменить`
        }, action),
        btnDelete = createElem('button', {
          classList: ['button', 'user-action__btn', 'btn-delete'],
          innerHTML: `${ICONS.delete}Удалить`
        }, action)

  btnChange.addEventListener('click', async () => {
    btnChange.innerHTML = `${ICONS.loadingChange}Изменить`
    btnChange.classList.add('loading')
    const client = await requestSettings('GET', user.id)
    btnChange.classList.remove('loading')
    btnChange.innerHTML = `${ICONS.pen}Изменить`
    BODY.append(createPoPupChange(false, client))
  })

  btnDelete.addEventListener('click', async () => {
    btnDelete.innerHTML = `${ICONS.loadingDelete}Удалить`
    btnDelete.classList.add('loading')
    const client = await requestSettings('GET', user.id)
    btnDelete.classList.remove('loading')
    btnDelete.innerHTML = `${ICONS.delete}Удалить`
    BODY.append(createPoPupDelet(client))
  })

  if (user.contacts.length > 5) {
    contactsAmount = 4
    let contactsOpen = contactsAmount
    createContacts()
    const i = user.contacts.length - contactsOpen,
          contactLinkLimit = createElem('button', {
            textContent: `+${i}`,
            ariaLabel: 'Показать остальные социальные сети',
            classList: ['button', 'user-contacts__icon', 'user-contacts__close'],
          }, contacts)
    let tooltip = null,
        timeoutAddClass = null,
        timeoutRemoveTooltip = null

    contactLinkLimit.addEventListener('mouseover', () => {
      tooltip = createElem('div', {
              classList: ['tooltip'],
              textContent: 'Показать оставшиеся контакты'
            }, contactLinkLimit)
    })
    contactLinkLimit.addEventListener('mouseout', () => {
      tooltip.remove()
    })

    contactLinkLimit.addEventListener('click', () => {
      contactsAmount = user.contacts.length
      contacts.innerHTML = ''
      createContacts()
    })
  } else {
    contactsAmount = user.contacts.length
    createContacts()
  }

  function createContacts() {
    for (const contact of user.contacts) {
      let socialNetwork = null,
          socialLabel = null,
          url = contact.value,
          content = `${contact.type}: <span>${contact.value}</span>`,
          targetValue = '_blank',
          tooltip = null,
          timeoutAddClass = null,
          timeoutRemoveTooltip = null

      function validatePhone(tel) {
        const data = `${tel.substr(0, 2)} (${tel.substr(2, 3)}) ${tel.substr(5, 3)}-${tel.substr(8, 2)}-${tel.substr(10, 2)}`
        return data
      }
  
      switch (contact.type) {
        case 'Телефон':
          socialNetwork = ICONS.phone;
          socialLabel = 'Телефон';
          url = `tel:${contact.value}`;
          content = validatePhone(contact.value);
          targetValue = '_self'
          break;
        case 'Email':
          socialNetwork = ICONS.mail;
          socialLabel = 'Почта';
          url = `mailto:${contact.value}`;
          break;
        case 'Facebook':
          socialNetwork = ICONS.fb;
          socialLabel = 'Фейсбук';
          break;
        case 'Vk':
          socialNetwork = ICONS.vk;
          socialLabel = 'Вконтакте';
          break;
        default:
          socialNetwork = ICONS.user;
          socialLabel = 'Социальная сеть';
          break;
      }
  
      const contactLink = createElem('a', {
              innerHTML: socialNetwork,
              ariaLabel: socialLabel,
              classList: ['user-contacts__icon'],
              href: url,
              target: targetValue,
            }, contacts)
    
      contactLink.addEventListener('mouseover', () => {
        tooltip = createElem('div', {
          classList: ['tooltip'],
          innerHTML: content
        }, contactLink)
      })
      contactLink.addEventListener('mouseout', () => {
        tooltip.remove()
      })
  
      --contactsAmount
      if (contactsAmount === 0) break
  
    }
  }

  return titleString
}

export function createTableLoading() {
  const string = createElem('tr', {
          classList: ['table-string--loading']
        }),
        column = createElem('th', {
          colSpan: '6',
          classList: ['table-column--loading'],
        }, string),
        loaging = createElem('div', {
          classList: ['loading', 'loading--table'],
          innerHTML: ICONS.circle
        }, column)

  return string
}

function createModal() {
  const modal = createElem('div', {
          classList: ['modal']
        }),
        wraper = createElem('div', {
          classList: ['modal__wraper']
        }, modal),
        btn = createElem('button', {
          classList: ['modal__btn-close', 'button'],
          innerHTML: ICONS.closeBtn,
          ariaLabel: 'Закрыть окно'
        }, wraper)

  BODY.classList.add('stop')
  tabIndex(true)

  btn.addEventListener('click', () => {
    modal.remove()
    BODY.classList.remove('stop')
    tabIndex(false)
  })

  document.addEventListener('click', function(missClick){
    if (!missClick.target.classList.contains('modal__wraper') && missClick.target.classList.contains('modal')){
      modal.remove()
      BODY.classList.remove('stop')
      tabIndex(false)
    }
  })

  document.addEventListener('keydown', function(event) {
    if (event.code == 'Escape') {
      modal.remove()
      BODY.classList.remove('stop')
      tabIndex(false)
    }
  });

  return {
    modal,
    wraper
  }
}

function createPoPupChange(add, client) {
  const poPupWraper = createModal(),
        poPup = createElem('div', {
          classList: ['po-pup']
        }),
        title = createElem('h2', {
          classList: ['po-pup__title'],
          textContent: add ? 'Новый клиент' : 'Изменить данные'
        }, poPup),
        id = add ? null : createElem('div', {
          classList: ['user-id', 'po-pup__id'],
          textContent: `ID: ${client.id}`
        }, poPup),
        form = createElem('div', {
          classList: ['po-pup__form', 'form']
        }, poPup),
        labelSurname = createElem('label', {
          classList: ['label'],
        }, form),
        labelSurnameWraper = createElem('span', {
          classList: ['po-pup__label'],
          textContent: 'Фамилия'
        }, labelSurname),
        requiredSurname = createElem('span', {
          classList: ['po-pup__label', 'po-pup__label--required'],
          textContent: '*'
        }, labelSurnameWraper),
        inputSurname = createElem('input', {
          classList: ['input', 'po-pup__input'],
          value: client ? client.surname : null,
          required: true,
          name: 'surname'
        }, labelSurname),
        labelName = createElem('label', {
          classList: ['label']
        }, form),
        labelNameWraper = createElem('span', {
          classList: ['po-pup__label'],
          textContent: 'Имя'
        }, labelName),
        requiredName = createElem('span', {
          classList: ['po-pup__label', 'po-pup__label--required'],
          textContent: '*'
        }, labelNameWraper),
        inputName = createElem('input', {
          classList: ['input', 'po-pup__input'],
          value: client ? client.name : null,
          required: true,
          name: 'name'
        }, labelName),
        labelLastName = createElem('label', {
          classList: ['label']
        }, form),
        labelLastNameWraper = createElem('span', {
          classList: ['po-pup__label'],
          textContent: 'Отчество'
        }, labelLastName),
        inputLastName = createElem('input', {
          classList: ['input', 'po-pup__input'],
          value: client ? client.lastName : null,
          name: 'lastName'
        }, labelLastName),
        addContact = createElem('div', {
          classList: ['add-contact']
        }, form),
        contactList = createElem('ul', {
          classList: ['contact-list']
        }, addContact),
        addContactBtnAdd = createElem('button', {
          classList: ['button', 'add-contact__btn-add'],
          innerHTML: `${ICONS.plus}Добавить контакт`
        }),
        buttonSubmit = createElem('button', {
          classList: ['button', 'btn-primary', 'po-pup__btn-save'],
          textContent: 'Сохранить',
          type: 'submit'
        }, form),
        buttonDelete = createElem('button', {
          classList: ['button', 'po-pup__btn-last'],
          textContent: add ? 'Отмена' : 'Удалить клиента'
        }, form)


  poPupWraper.wraper.prepend(poPup)
  inputAnim(inputSurname)
  inputAnim(inputName)
  inputAnim(inputLastName)

  let i = 0

  addContactBtnAdd.addEventListener('click', (e) => {
    e.preventDefault()
    const contactItem = add ? createContactElem() : createContactElem(client.contacts)
    contactList.append(contactItem)
    i++
    overflowCheck(addContactBtnAdd, addContact)
  })

  buttonDelete.addEventListener('click', () => {
    poPupWraper.modal.remove()
    BODY.classList.remove('stop')
    tabIndex(false)
    if (!add) {
      BODY.append(createPoPupDelet(client))
    }
  })

  buttonSubmit.addEventListener('click', async (e) => {
    e.preventDefault()
    const data = {
            surname: inputSurname.value,
            name: inputName.value,
            lastName: inputLastName.value,
            contacts: []
          }

    poPup.querySelectorAll('.contact-item').forEach((e) => {
      const contact = {
        type: e.querySelector('select').value,
        value: e.querySelector('input').value
      }
      data.contacts.push(contact)
    })

    const responseSubmit = add ? await request(data) : await requestSettings('PATCH', client.id, data)

    if (responseSubmit.errors) {
      const errorElem = document.querySelector('.error')
      if (errorElem) errorElem.remove()
      createErrorsMessage(responseSubmit.errors)
    }
    else {
      poPupWraper.modal.remove()
      BODY.classList.remove('stop')
      tabIndex(false)
  
      const response = await request()
  
      MAIN.tableBody.innerHTML = ''
      MAIN.tableBody.append(LOADING)
      CLIENTS.arr = response
      render(CLIENTS.arr)
    }
  })

  if (client) {
    for (const contact of client.contacts) {
      const contactItem = createContactElem(contact)
      contactList.append(contactItem)
      i++
    }
  }

  overflowCheck(addContactBtnAdd, addContact)

  function overflowCheck(el, parent) {
    if (i > 9) el.remove()
    else parent.append(el)
  }

  function createContactElem(contact) {
    const valueTel = 'Телефон',
          valueEmail = 'Email',
          valueFacebook = 'Facebook',
          valueVk = 'Vk',
          valueAnother = 'Другое',
          contactItem = createElem('li', {
            classList: ['contact-item']
          }),
          select = createElem('select', {
            classList: ['contact__select'],
            name: 'select'
          }, contactItem),
          optionTel = createElem('option', {
            classList: ['contact__option'],
            textContent: valueTel,
            value: valueTel,
            selected: contact && contact.type === valueTel ? true : false
          }, select),
          optionEmail = createElem('option', {
            classList: ['contact__option'],
            textContent: valueEmail,
            value: valueEmail,
            selected: contact && contact.type === valueEmail ? true : false
          }, select),
          optionFacebook = createElem('option', {
            classList: ['contact__option'],
            textContent: valueFacebook,
            value: valueFacebook,
            selected: contact && contact.type === valueFacebook ? true : false
          }, select),
          optionVk = createElem('option', {
            classList: ['contact__option'],
            textContent: valueVk,
            value: valueVk,
            selected: contact && contact.type === valueVk ? true : false
          }, select),
          optionAnother = createElem('option', {
            classList: ['contact__option'],
            textContent: valueAnother,
            value: valueAnother,
            selected: contact && contact.type === valueAnother ? true : false
          }, select),
          input = createElem('input', {
            classList: ['contact__input'],
            placeholder: 'Введите данные контакта',
            value: contact && contact.value ? contact.value : null
          }, contactItem),
          btnClose = createElem('button', {
            classList: ['button', 'contact__btn-close'],
            ariaLabel: 'Удалить контакт',
            innerHTML: ICONS.btnDelete
          }, contactItem)

    btnClose.setAttribute('tooltip', 'Удалить контакт')

    btnClose.addEventListener('click', () => {
      contactItem.remove()
      i--
      overflowCheck(addContactBtnAdd, addContact)
    })

    return contactItem
  }

  function inputAnim(input) {
    if (input.value) input.parentNode.classList.add('label-open')
    input.addEventListener('input', () => {
      input.value.length > 0 ?
      input.parentNode.classList.add('label-open') :
      input.parentNode.classList.remove('label-open')
    })
  }

  function createErrorsMessage(errors) {
    const errorWraper = createElem('div', {
      classList: ['error']
    })
    for (const error of errors) {
      const errorMessage = createElem('p', {
        classList: ['error__text'],
        textContent: error.message
      }, errorWraper)
    }
    buttonSubmit.before(errorWraper)
  }

  return poPupWraper.modal
}

function createPoPupDelet(client) {
  const poPupWraper = createModal(),
        poPup = createElem('div', {
          classList: ['po-pup', 'po-pup--delet']
        }),
        title = createElem('h2', {
          classList: ['po-pup__title', 'po-pup__title--center'],
          textContent: 'Удалить клиента'
        }, poPup),
        desc = createElem('p', {
          classList: ['po-pup__desc'],
          textContent: 'Вы действительно хотите удалить данного клиента?'
        }, poPup),
        buttonSubmit = createElem('button', {
          classList: ['button', 'btn-primary', 'po-pup__btn-save', 'po-pup__btn-delet'],
          textContent: 'Удалить'
        }, poPup),
        buttonDelete = createElem('button', {
          classList: ['button', 'po-pup__btn-last'],
          textContent: 'Отмена'
        }, poPup)

  poPupWraper.wraper.prepend(poPup)

  buttonDelete.addEventListener('click', () => {
    poPupWraper.modal.remove()
    BODY.classList.remove('stop')
    tabIndex(false)
  })

  buttonSubmit.addEventListener('click', async () => {
    await requestSettings('DELETE', client.id)

    poPupWraper.modal.remove()
    BODY.classList.remove('stop')
    tabIndex(false)

    const response = await request()

    MAIN.tableBody.innerHTML = ''
    MAIN.tableBody.append(LOADING)
    CLIENTS.arr = response
    render(CLIENTS.arr)
  })

  return poPupWraper.modal
}