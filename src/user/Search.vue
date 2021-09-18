<template>
  <div class="container-fluid">
    <div class="card elc-card mt-3">
      <div class="card-header text-left"><h3>User Search</h3></div>
      <div class="card-body text-left">
        <button class="btn elc-btn-outline-info-sm" @click="selectUser('new')"><i class="fa fa-plus"></i> Add New User</button>
        <div class="row mt-2">
          <div class="col-6 text-left">
            <button class="btn elc-btn-outline-info-sm" @click="back"><i class="fa fa-chevron-left"></i> Back</button>
          </div>
          <div class="col-6 text-right">
            <button class="btn elc-btn-outline-info-sm" @click="next">Back <i class="fa fa-chevron-right"></i></button>
          </div>
        </div>
        <table class="table table-hover mt-2">
          <thead>
            <tr>
              <th>User Name</th>
              <th>In Game Name</th>
              <th>Is Active</th>
              <th>Is Super User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,idx) in arr" :key="idx" @click="selectUser(item.id)">
              <td>{{ item.username}}</td>
              <td>{{ item.in_game_name}}</td>
              <td>{{ item.is_active == true ? 'YES' : 'NO'}}</td>
              <td>{{ item.is_superuser == true ? 'YES' : 'NO'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NetClient from '@/util/NetClient.js'

export default {
  mounted () {
      this.search()
  },
  data () {
    return {
      isDirty: false,
      arr: [],
      model: {
        skip: 0,
        limit: 20
      }

    }
  },
  methods: {
    selectUser (_id) {
      this.$router.push({name: 'User', params: { uid: _id}})
    },
    search () {
      this.arr = []
      NetClient.doGet('users', this.model).then(msg => {
        if(typeof msg.length != 'undefined') this.arr = msg
      })
    },
    next () {
      // don;t go next if current list is not to limit
      if(this.arr.length < this.model.limit) return

      this.model.skip += this.model.limit
      this.search()

    },
    back () {
      this.model.skip -= this.model.limit
      if(this.model.skip < 0) this.model.skip = 0
      this.search()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
