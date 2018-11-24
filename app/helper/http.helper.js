const axios = require('axios')
const httpHelper = require('http')
const https = require('https')
const _ = require('lodash')
const qs = require('querystring')
const { HttpRequestError, HttpResponseError } = require('../error')

const build = (serviceName, baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
    httpAgent: new httpHelper.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true })
  })
  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    throw new HttpRequestError(serviceName, error)
  })

  // 响应拦截器
  instance.interceptors.response.use(response => {
    return response
  }, error => {
    throw new HttpResponseError(serviceName, error)
  })
  const get = async (path, headers) => {
    const config = {}
    if (_.isPlainObject(headers)) {
      config.headers = headers
    }
    return instance.get(path, config)
  }
  const post = async (path, body, headers) => {
    const config = {
      'Content-type': 'application/json;charset=utf-8'
    }
    if (_.isPlainObject(headers)) {
      config.headers = { ...headers }
    }
    return axios.post(path, qs.stringify(body), config)
  }
  const put = async (path, body, headers) => {
    const config = {
      'Content-type': 'application/json;charset=utf-8'
    }
    if (_.isPlainObject(headers)) {
      config.headers = { ...headers }
    }
    return axios.put(path, qs.stringify(body), config)
  }
  const del = async (path, headers) => {
    const config = {}
    if (_.isPlainObject(headers)) {
      config.headers = headers
    }
    return instance.delete(path, config)
  }
  return {
    get,
    post,
    put,
    delete: del
  }
}

module.exports = {
  build
}
