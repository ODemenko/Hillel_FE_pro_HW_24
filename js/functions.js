function showUsers(usersList) {
    const parent = document.querySelector('#grid');
    parent.addEventListener('click', gridClickHandler);

    usersList.forEach(user => {
        const userRow = createUserRow(user);
        parent.appendChild(userRow);
    });
};


function createUserRow(user) {
    const userRow = document.createElement('div');
    userRow.classList.add('user_row');
    userRow.classList.add('row');
    userRow.setAttribute('data-id', user.id)

    createUserRowContent(userRow, user);

    return userRow; 
}

function createUserRowContent(userRow, user) {
    createElement('div', { className: 'user_id' }, user.id, userRow);
    createElement('div', { className: 'user_name' }, user.name, userRow);

    const divButtons = createElement('div', { className: 'user_buttons' }, '', userRow)
    createElement('input', { type: 'button', value: 'View', 'data-action': 'view' }, '', divButtons);
    createElement('input', { type: 'button', value: 'Edit', 'data-action': 'edit' }, '', divButtons,);
    createElement('input', { type: 'button', value: 'Delete', 'data-action': 'delete' }, '', divButtons,);
}


function createElement(tagName, attributes, content, parent, eventHandlers) {
    const element = document.createElement(tagName);
    //for (let className of classList) {
    //    element.classList.add(className); 
    //}
    for (let key in attributes) {
    //    if (key === 'className') {
    //        element.setAttribute('class', attributes[key]); 
    //    } else {
    //        element.setAttribute(key, attributes[key]);
    //    };
        const attribute = key === 'className' ? 'class' : key;
        element.setAttribute(attribute, attributes[key]);

    }

    for (let event in eventHandlers) {
        element.addEventListener(event, eventHandlers[event]);
    }

    element.textContent = content;
    
    parent.appendChild(element);

    return element;
};


function gridClickHandler(event) {
    if (event.target.nodeName === 'INPUT') {
        const dataAction = event.target.getAttribute('data-action');
        //const userId = event.target.parentNode.parentNode.getAttribute('data-id');
        const userId = event.target.closest('.user_row').getAttribute('data-id');
        const user = getUserById(userId);
        if (dataAction === 'view') {
            //alert('VIEW button clicked' + userId);
            showUserData(user);
        } else if (dataAction === 'edit') {
            //alert('EDIT button clicked' + userId);
            editUserData(user);
        } else if (dataAction === 'delete') {
            //alert('DELETE button clicked' + userId);
            const confirmation = confirm('Are you sure you want to delete this user?');
            if (confirmation) {
                deleteUserAndRow(userId);
            }
        }
    }
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

function getUserIndexById(id) {
    return users.findIndex(user => user.id === id);
}

function showUserData(user) {
    document.querySelector('#view').classList.remove('hidden');
    document.querySelector('#view').innerHTML = `
        <div>
            <p>Name: ${user.name}</p>
            <p>Login: ${user.login}</p>
            <p>Email: ${user.email}</p>
            <p>Age: ${user.age}</p>
            <input type="button" value="Close" class="view_close_button" />
        </div>
    `;

    document.querySelector('.view_close_button').addEventListener('click', () => {
        document.querySelector('#view').classList.add('hidden');
        document.querySelector('#view').innerHTML = '';
    })
}



