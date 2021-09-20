<template>

</template>
<script>
import NetClient from '@/util/NetClient.js'

export default {
  props: ['bankID'],
  watch : {
    'bankID' : function(n,o) {
      this.loadBank()
    }
  }
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
      user: this.emptyUser(),
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
        id: ''
      }
    },
    loadBank () {
      if(this.bankID.length < 10)
      {
        this.user = this.emptyBank()
      } else {
        NetClient.doGet('users/'+this.bankID, {}).then(msg => {
          this.bank = msg
        })
      }
    },
    save () {

      if(this.bank.id.length < 10)
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
