<template>
  <div class="container-fluid">
    <div class="card elc-card mt-3">
      <div class="card-header text-left"><h3>User {{ user.in_game_name}}</h3></div>
      <div class="card-body text-left">
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">ID</label>
              <input class="form-control" v-model="user.id"  type="text" disabled/>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Company ID</label>
              <input class="form-control" v-model="user.company_id"  type="text" disabled/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Username</label>
              <input class="form-control" v-model="user.username"  type="text" @keyup="isDirty=true"/>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">In Game Name</label>
              <input class="form-control" v-model="user.in_game_name"  type="text" @keyup="isDirty=true"/>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Discord Name</label>
              <input class="form-control" v-model="user.discord_name"  type="text" @keyup="isDirty=true"/>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Discord ID</label>
              <input class="form-control" v-model="user.discord_id"  type="text" @keyup="isDirty=true"/>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Rank {{ user.rank}}</label>
              <select id="rel" class="form-control" v-model="user.rank" @change="isDirty=true">
                <option v-for="item in rank.keys" :key="item" :value="item">{{ rank[item] }}</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group ml-4">
              <input class="form-check-input" type="checkbox" v-model="user.is_active" id="is_active" @click="isDirty=true"/>
              <label class="form-check-label" for="is_active">Active</label>
            </div>
            <div class="form-group ml-4">
              <input class="form-check-input" type="checkbox" v-model="user.is_superuser" id="is_superuser" @click="isDirty=true"/>
              <label class="form-check-label" for="is_superuser">Super User</label>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Password</label>
              <input class="form-control" v-model="password"  type="password" @keyup="isDirty=true"/>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <label class="control-label">Confirm</label>
              <input class="form-control" v-model="password2"  type="password" @keyup="isDirty=true"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-6 text-center">
            <button v-show="showCancel==true" class="btn elc-btn-outline-info" @click="cancel()">Cancel</button>
            <button v-show="showSwitchCompany==true" class="btn elc-btn-outline-info" @click="setCompany()">Set Company</button>
          </div>
          <div class="col-xs-12 col-md-6 text-center">
            <button class="btn elc-btn-success" :disabled="isDirty==false" @click="save()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
{
  "username": "admin",
  "in_game_name": "BNK_ADMIN",
  "discord_name": null,
  "discord_id": null,
  "is_active": true,
  "is_superuser": true,
  "company_id": null,
  "rank": null,
  "id": "27acfa9e-10d0-11ec-a0e3-a29b1c4a62f6",
  "updated_dt": "2021-09-08T18:11:14.653283",
  "created_dt": "2021-09-08T18:11:14.653290"
}
-->
<script>
import NetClient from '@/util/NetClient.js'
import RankEnum from '@/util/RankEnum.js'


export default {
  mounted () {
      this.loadUser()
  },
  computed: {
      showCancel () {
        return this.user.id.length < 10
      },
      showSwitchCompany () {
        return this.user.company_id != NetClient.user.company_id
      },
      showRemoveCompany () {
        if(null == this.user.company_id) return false
        return this.user.id.length > 10 && this.user.company_id.length > 10
      }
  },
  data () {
    return {
      isDirty: false,
      user: this.emptyUser(),
      rank: RankEnum,
      password: '',
      password2: ''
    }
  },
  methods: {
    cancel () {
        this.$router.push({ name: 'UserSearch'})
    },
    setCompany () {
      var req = 'company/' + NetClient.user.company_id + '/' + this.user.id + '/' + this.user.rank

      NetClient.doPost(req,{ name: 'DoNothing'}).then(msg => {
        console.log(msg)
      })
    },

    emptyUser ()  {
      return {
        username: '<New User>',
        in_game_name: '',
        discord_name: null,
        discord_id: null,
        is_active: false,
        is_superuser: false,
        company_id: NetClient.user.company_id,
        rank: 1,
        id: '',
        updated_dt: '',
        created_dt: ''
      }
    },
    loadUser () {
      if(this.$route.params.uid == 'new')
      {
        this.user = this.emptyUser()
      } else {
        NetClient.doGet('users/'+this.$route.params.uid, {}).then(msg => {
          this.user = msg
          if(null == this.user.rank) this.user.rank = 1
        })
      }
    },
    save () {
      if(this.password.length > 0)
      {
        if(this.password != this.password2) return

        this.user.password = this.password

      }

      if(this.user.id.length < 10)
      {
        NetClient.doPost('users',this.user).then(msg => {
          this.user = msg
          this.isDirty = false
        })
      } else {
        NetClient.doPut('users/'+this.user.id,this.user).then( msg=> {
          this.user = msg
          this.isDirty = false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
