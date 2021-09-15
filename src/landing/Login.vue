<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-xs-12 col-md-6 offset-md-3">
        <div class="card mt-5 nw-card">
          <div class="card-body text-left">
            <div class="text-center h2 nw-dark-blue">New World Bank Login</div>
            <div class="form-group">
              <label class="control-label">Username</label>
              <input class="form-control" type="text" v-model="model.userName"/>
            </div>
            <div class="form-group" v-show="status=='login'">
              <label class="control-label">Password</label>
              <input class="form-control" type="password" v-model="model.password"/>
            </div>

            <div class="text-center mb-2">
                <button v-show="status=='login'" class="btn nw-btn-info text-uppercase" @click="login()">Login</button>
                <button v-show="status=='reset'" class="btn nw-btn-info text-uppercase" @click="sendReset()">Send Reset Link</button><br/>
                <a href="#" v-show="status=='login'" class="nw-dark-blue" @click="forgot()">Forgot Password?</a><br/>
                <button v-show="status=='reset'" class="btn nw-btn-outline-info" @click="back()">Cancel</button><br/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      status: 'login',
      resp: [],
      model: {
          userName: '',
          password: '',
          mfaCode: ''
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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
