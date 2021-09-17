import axios from 'axios'

var NetClient = {
  router: null,
  creds: {
    access_token: '',
    token_type: ''
  },
  init: function(_router) {
    this.router = _router

    this.creads = JSON.parse(window.localStorage.getItem('creds'))
    if(null == this.dreds) this.creds = { access_token: '', token_type: ''}

  },
  doGet: function (_svc, _params) {
    var nc = this
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        params: _params,
        baseURL: process.env.VUE_APP_HOST_NAME,
        url: _svc,
        headers: { 'Authorization': nc.creds.token_type + ' ' + nc.creds.access_token }
      }).then(axresp => {
        var msg = axresp.data

        console.log(axresp)

        if(typeof msg == 'undefined')
        {
          reject(new Error('Invalid response from server. No data element found'))
          return
        }

        resolve(msg)
      }).catch(err => {
        if(typeof err.response.status != 'undefined')
        {
          if(err.response.status == 401) nc.router.push({name: 'Login'})
        }

      })
    })
  },
  doPost: function (_svc, _req) {
    return this.doPostPut('post',_svc,_req)
  },
  doPut: function (_svc, _req) {
      return this.doPostPut('put',_svc,_req)
  },
  doPostPut: function (_method, _svc, _req) {
    var nc = this
    return new Promise(function (resolve, reject) {
      axios({
        method: _method,
        baseURL: process.env.VUE_APP_HOST_NAME,
        url: _svc,
        headers: { 'Authorization': nc.creds.token_type + ' ' + nc.creds.access_token },
        data: _req
      }).then(axresp => {
        var msg = axresp.data

        if(typeof msg == 'undefined')
        {
          reject(new Error('Invalid response from server. No data element found'))
          return
        }

        resolve(msg)
      }).catch(err => {
        console.log('error in response!')
        reject(err)
      })
    })
  },


}

export default NetClient
