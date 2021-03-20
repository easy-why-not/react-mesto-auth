export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                 return res.json();
            }
        })
        // .then(checkResponse)

}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
        .then((data) => {
            // console.log(data)
            if (data.token){
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse);
}

const checkResponse = (response) => response.ok ? response.json() : Promise.reject('Ошибка на сервере');