<template>
  <div class="container-fluid">
    <div class="card elc-card mt-3">
      <div class="card-header text-left"><h3>Banks</h3></div>
      <div class="card-body text-left">
        <button class="btn elc-btn-outline-info-sm" @click="selectBank('new')"><i class="fa fa-plus"></i> Add New Bank</button>
        <table class="table table-hover mt-2">
          <thead><tr><th>Bank Name</th><th>Bank Status</th></tr></thead>
          <tbody>
            <tr v-for="(item,idx) in arr" :key="idx" @click="selectBank(item.id)">
              <td>{{ item.name}}</td>
              <td>{{ item.status}}</td>
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
    this.loadBanks()
  },
  data () {
    return {
      isDirty: false,
      arr: []
    }
  },
  methods: {
    loadBanks () {
      NetClient.doGet('/bank',null).then(msg => {
        this.arr = msg
      }).catch(err => {
        console.log(err)
        this.arr = []
      })
    },
    selectBank (_id) {
      this.$router.push({ name: 'Bank', params: { id: _id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
