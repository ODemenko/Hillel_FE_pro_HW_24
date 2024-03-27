document.querySelector('.save_btn').addEventListener('click', event => {
    const id = event.target.getAttribute('data-id');
    const user = collectData();
    const isValid = validateUser(user);
    
    if (!isValid) {
        alert('enter data');
    } else {
        if (!id) {
            user.id = generateUserId();
            saveUser(user);

            const parent = document.querySelector('#grid');
            const userRow = createUserRow(user);
            parent.appendChild(userRow);       
        } else {
            user.id = id;
            const userIndex = getUserIndexById(id);
            if (userIndex === -1) {
                return;
            }

            users[userIndex] = user;

            const userRow = document.querySelector(`.row[data-id="${id}"]`);
            userRow.innerHTML = '';
            createUserRowContent(userRow, user);
            saveUser(user, false);
        }

        clearFormData();
    }


    document.querySelector('#form').classList.add('hidden');
});

function clearFormData() {
    const formElements = document.forms[0].elements;
    for (let item of formElements) {
        if (item.type === 'button') {
            item.removeAttribute('data-id');
        } else {
            item.value = '';
        }
    }
}

function editUserData(user) {
    document.querySelector('#form').classList.remove('hidden');

    const formElements = document.forms[0].elements;
    formElements.save_btn.setAttribute('data-id', user.id);

    for (let key in user) {
        if (key === 'id') {
            continue;
        }
        formElements[key].value = user[key];
    }
}

function collectData() {
    const form = document.forms[0].elements;
    
    const name = form.name.value;
    const login = form.login.value;
    const email = form.email.value;
    const age = form.age.value;

    const user = {
        name,
        login,
        age,
        email,
    };
    
    return user;
}

function validateUser(user) {
    let isValid = true;

    for(let value in user) {
        if (user[value] === '') {
            isValid = false;
            break;
        }
    };
    
    return isValid;
}

function generateUserId() {
    return Date.now().toString();
}

function saveUser(user, isNew = true) {
    if (isNew) {
        users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteUserAndRow(userId) {
    deleteUser(userId);
    const userRow = document.querySelector(`.user_row[data-id="${userId}"]`);
    if (userRow) {
        userRow.parentNode.removeChild(userRow);
        alert('User deleted successfully');
    } else {
        alert('Error: User row not found');
    }
}

function deleteUser(userId) {
    const userIndex = getUserIndexById(userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

