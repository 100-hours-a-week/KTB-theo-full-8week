
/*

curl -X 'POST' \
  'http://localhost:8080/user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test@test.com",
  "password": "1q2w3e4r!Q",
  "nickname": "nickname",
  "profileImage": "https://www.test.com"
}'

curl -X 'GET' \
  'http://localhost:8080/user/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIbWFjU0hBMjU2IiwidHlwIjoiSldUIn0.eyJpYXQiOjE3NjIyNTg5MDIxNTUsImlzcyI6IktUQi01V0VFSyIsInN1YiI6InRva2VuIiwiZXhwIjoxNzYyMjU5NTAyMTU1fQ.k6JuahFvW53rQJfynvFBIgKJILwzN94mdtNxQQEN40c'
*/
const API_SERVER_URL = "http://localhost:8080/";
export class Api {
    #method = 'GET';
    #url = '';
    #headers = { 'Content-Type': 'application/json' };
    #body = {};
    #quertString = {};

    get(method = 'GET') {
        this.#method = method;
        return this;
    }

    post(method = 'POST') {
        this.#method = method;
        return this;
    }

    put(method = 'PUT') {
        this.#method = method;
        return this;
    }

    delete(method = 'DELETE') {
        this.#method = method;
        return this;
    }

    url(url = '') {
        this.#url = url;
        return this;
    }

    headers(headers = { 'Content- Type': 'application/json' }) {
        this.#headers = structuredClone(headers);
        return this;
    }

    body(body = {}) {
        this.#body = structuredClone(body);
        return this;
    }

    queryString(queryString = {}) {
        this.#quertString = { ...queryString };
        return this;
    }
    print() {
        console.log({
            method: this.#method,
            url: this.#url,
            headers: this.#headers,
            body: this.#body,
            queryString: this.#quertString
        });
        return this;
    }


    buildURL() {
        if (!this.#url) {
            throw new Error('URL이 필요합니다.');
        }
        const url = new URL(this.#url, API_SERVER_URL);
        for (var key in this.#quertString) {
            url.searchParams.append(key, this.#quertString[key]);
        }
        return url.toString();
    }

    buildOptions() {
        const options = {
            method: this.#method,
            headers: this.#headers,
        }
        if (this.#method === 'GET') {
            return options;
        }

        options.body = JSON.stringify(this.#body);
        return options;

    }

    async request() {
        const url = this.buildURL();
        const options = this.buildOptions();

        if (this.#method === 'GET') {
        }
        const response = await fetch(url, options);
        return await response.json();
    }
}

const api_test = new Api();
api_test
    .get()
    .url("/api/auth/login")
    .body({
        email: "test@test.com",
        password: "1q2w3e4r!Q",
        nickname: "nickname",
        profileImage: "https://www.test.com"
    })
    .queryString({
        id: 1,
        page: 2
    });

const login = new Api()
    .post()
    .url(`/auth/access/token`)
    .body({
        email: "test@test.com", password: "1q2w3e4r!Q"
    });

// console.log(login.buildURL());
// console.log(login.buildOptions());
// const response = await login.request();
// console.log(response);