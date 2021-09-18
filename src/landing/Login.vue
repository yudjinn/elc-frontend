<template>
  <div class="container-fluid elc-landing">
    <div class="row mt-5">
      <div class="col-xs-12 col-md-6 offset-md-3">
        <div class="card mt-5 elc-card">
          <div class="card-body text-left">
            <div class="text-center h2 elc-dark-blue">New World Bank Login</div>
            <div class="form-group">
              <label class="control-label">Username</label>
              <input class="form-control" type="text" v-model="model.username"/>
            </div>
            <div class="form-group" v-show="status=='login'">
              <label class="control-label">Password</label>
              <input class="form-control" type="password" v-model="model.password"/>
            </div>

            <div class="text-center mb-2">
                <button v-show="status=='login'" class="btn elc-btn-info text-uppercase" @click="login()">Login</button>
                <button v-show="status=='reset'" class="btn elc-btn-info text-uppercase" @click="sendReset()">Send Reset Link</button><br/>
                <a href="#" v-show="status=='login'" class="elc-dark-blue" @click="forgot()">Forgot Password?</a><br/>
                <button v-show="status=='reset'" class="btn elc-btn-outline-info" @click="back()">Cancel</button><br/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NetClient from '@/util/NetClient.js'
import axios from 'axios'

export default {
  data () {
    return {
      status: 'login',
      resp: [],
      model: {
          username: '',
          password: ''
        }
      }
  },
  methods: {
    back () {
      this.status = 'login'
    },
    forgot () {

      this.status = 'reset'
    },
    sendReset () {

    },
    login () {
      var data = new FormData()
      data.append('username',this.model.username)
      data.append('password', this.model.password)

      axios({
        method: 'post',
        baseURL: process.env.VUE_APP_HOST_NAME,
        url: 'login/access-token',
        data: data,

      }).then(axresp => {
        var msg = axresp.data

        if(typeof msg.access_token != 'undefined') NetClient.creds.access_token = msg.access_token
        if(typeof msg.token_type != 'undefined') NetClient.creds.token_type = msg.token_type

        NetClient.doGet('company/', {}).then(msg => {
          NetClient.company = msg

          NetClient.doGet('/users/me', {}).then(msg => {
            NetClient.user = msg
            this.$router.push({ name: 'UserSearch'})
          })
        })
      }).catch(err => {
        console.log('error in response!' + err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elc-landing {
  min-height: 100vh;
  background-image: url('../assets/img/nw-mask.jpg');
  background-repeat: no-repeat;
	background-size: contain;

}

</style>
