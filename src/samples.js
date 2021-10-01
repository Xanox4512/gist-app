const axios = require('axios');

class GithHubWrapper {
  constructor(token) {
    this.token = token
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
        'X-Custom-Header': this.token,
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + this.token
      }
    })
  }

  getRequest(path) {
    return this.client.get(path)
  }
  postRequest(path, payload) {
    return this.client.post(path, payload)
  }
  postRequest2(path) {
    return this.client.post(path)
  }
  putRequest(path) {
    return this.client.put(path)
  }
  deleteRequest(path){
    return this.client.delete(path)
  }
  root() {
    return this.getRequest('/')
  }
  createGist(payload) {
    return this.postRequest('/gists', payload)
  }
  editGist(gistId, payload){
    return this.postRequest(`/gists/${gistId}`, payload)
  }
  deleteGist(gistId){
    return this.deleteRequest(`/gists/${gistId}`)
  }
  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`)
  }
  getGists() {
    return this.getRequest(`/gists`)
  }

}
let token = "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"
let ghWrapper = new GithHubWrapper(token)
let IdArray = [5, 5, 5, 5, 'test']
let gistPayload = {
  "description": "Hello World Examples",
  "public": false,
  "files": {
    "hello_world_python.txt": {
      "content": "Run `python hello_world.py` to print Hello World"
    }
  }
}

// ghWrapper.putRequest('/gists/5393b01e7110554df8e3366d9380cd31/star').then((response) => console.log(response))
// ghWrapper.postRequest2('/gists/8e8116ceaae404db456d9a36880d612e/forks').then((response) => console.log(response))

// ghWrapper.deleteGist('25b669994879908ccc4805397a0328f').then((response) => {
//   console.log(response.data);
// }, (error) => {
//   console.log(error);
// });

//ghWrapper.createGist(gistPayload).then((response) => console.log(response.data))
// ghWrapper.getGist('a25e589fd179d11e857c9a2e418d0f16').then((gist) => {
//   for(const [key,value] of Object.entries(gist.data.files)){
//     const newGist = {
//         filename: value.filename,
//         content: value.content,
//         description:gist.data.description,
//         id: gist.data.id,
//         language: value.language
//     }
//     console.log(newGist)
// }
// })


// ghWrapper.getGists().then((gist) => {
//     const ids = []
//     for(const [key,value] of Object.entries(gist.data)){
//       ids.push(value.id)
//     }
//     console.log(ids)
// })

let array = ['michal', 'grzesiek']
console.log(array)