<template>
  <div class="container-fluid">
    <div class="card elc-card mt-3">
      <div class="card-header text-left"><h3>Bank {{ bank.name}}</h3></div>
      <div class="card-body text-left">
        <div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label class="control-label">ID</label>
                <input class="form-control" v-model="bank.id"  type="text" disabled/>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label class="control-label">Company ID</label>
                <input class="form-control" v-model="bank.company_id"  type="text" disabled/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label class="control-label">Name</label>
                <input class="form-control" v-model="bank.name"  type="text" @keyup="isDirty=true" :disalbled="isDisabled"/>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label class="control-label">Status</label>
                <input class="form-control" v-model="bank.status"  type="text" @keyup="isDirty=true" :disabled="isDisabled"/>
              </div>
            </div>
          </div>
          <div class="row" v-show="isDisabled==false">
            <div class="col-xs-12 col-md-6 text-center">
              <button v-show="showCancel==true" class="btn elc-btn-outline-info" @click="cancel()">Cancel</button>
            </div>
            <div class="col-xs-12 col-md-6 text-center">
              <button class="btn elc-btn-success" :disabled="isDirty==false" @click="save()">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NetClient from '@/util/NetClient.js'

export default {
  mounted () {
    this.loadBank()
  },
  computed: {
      showCancel () {
        return this.bank.id.length < 10
      },
      isDisabled () {
        return NetClient.user.rank < 3
      }
  },
  data () {
    return {
      isDirty: false,
      bank: this.emptyBank(),
      nc: NetClient
    }
  },
  methods: {
    cancel () {
        this.$router.push({ name: 'BankSearch'})
    },
    emptyBank ()  {
      return {
        name: '<New Bank>',
        status: 'ACTIVE',
        company_id: NetClient.user.company_id,
        id: this.$route.params.id
      }
    },
    loadBank () {
      if(this.bank.id.length < 10)
      {
        this.user = this.emptyBank()
      } else {
        NetClient.doGet('bank/'+this.bank.id, {}).then(msg => {
          this.bank = msg
        })
      }
    },
    save () {

      if(this.$route.params.id.length < 10)
      {
        NetClient.doPost('bank',this.bank).then(msg => {
          this.user = msg
          this.isDirty = false
        })
      } else {
        NetClient.doPut('bank/'+this.bank.id,this.bank).then( msg=> {
          this.bank = msg
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
