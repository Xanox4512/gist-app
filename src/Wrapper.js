const axios = require('axios');

export default class GitHubWrapper {
  constructor() {
    this.token =  localStorage.getItem('token')
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
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
}