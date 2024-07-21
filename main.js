function getAllUsersName() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onloadend = () => {
        if (request.status >= 200 && request.status < 300) {
            const data = request.response;
            console.log(data);
            createUsersList(data);
        } else {
            console.error('Failed to load data. Status: ' + request.status);
        }
    };

    request.onerror = () => {
        console.error('Network error occurred.');
    };
}


function createUsersList (data) {
    const usersList = document.getElementById('users_list')
    data.forEach(user => {
        let liElement = document.createElement('li')
        liElement.setAttribute('user_Id',user.id)
        liElement.classList.add('user_name')
        liElement.innerHTML = user.name
        usersList.appendChild(liElement)
        liElement.addEventListener('click', ()=> {
            document.getElementById('users_posts').innerHTML = ''
            getAllPOstsOfTheUSer(user.id)
        })
    })
}

getAllUsersName()

function getAllPOstsOfTheUSer (user_id) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`)
    request.responseType = 'json'
    request.setRequestHeader('Accept', 'application/json')
    request.setRequestHeader('Content-Type', 'application/json')    
    request.send()
    request.onloadend = () => {
        if(request.status >= 200 && request.status < 300){
            const userPosts = request.response
            createPost(userPosts)
        } else {
            console.error('Failed to load data. Status: ' + request.status);
        }
    }
}

function createPost (userPosts) {
    const postsList = document.getElementById('users_posts')
    userPosts.forEach(post => {
        let liElement = document.createElement('li')
        let paraElement = document.createElement('p')
        paraElement.classList.add('post-title')
        let spanELement = document.createElement('span')
        spanELement.classList.add('post-content', 'hidden')
        paraElement.innerHTML = post.title
        spanELement.innerHTML = post.body
        let hrElement = document.createElement('hr')
        liElement.appendChild(paraElement)
        liElement.appendChild(hrElement)
        liElement.appendChild(spanELement)
        postsList.appendChild(liElement)
        liElement.addEventListener('click', ()=> {
            spanELement.classList.toggle('hidden')
        })
    })
}

getAllPOstsOfTheUSer (1)