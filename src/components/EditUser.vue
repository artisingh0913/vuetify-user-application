<template>
  <v-row justify="center">
    <v-dialog v-model="openEdit" persistent max-width="600px">      
      <template v-slot:activator="{ on }">
        <v-icon class="mr-2" v-on="on">mdi-account-edit</v-icon>
      </template>

      <v-card>        
        <v-card-title>
          <span class="headline">Update User Information</span>
        </v-card-title>
        
        <p class="error" v-if="checkError" style="color: red">{{checkError}} </p>

        <v-card-text> 
          <v-container>
          <v-text-field label="Name" required v-model="updateUser.Name"/>
          <v-text-field label="State" required v-model="updateUser.state"/>
          <v-text-field label="UserName" required v-model="updateUser.username"/>     
          <v-text-field label="Password" required v-model="updateUser.password"/>     
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="openEdit=false">Close</v-btn>
          <v-btn text @click='edit_user'>Update</v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import {mapState} from "vuex";

export default {
  name: "EditUser",
  props: {
    updateUser: {
        ID: '',
        Name: '',
        state: '',
        username: '',
        password: ''
      }  
  },
  data() {
    return {
      openEdit: false,
      editUser_ip: {
        ID: '',
        name: '',
        state: '',
        username: '',
        password: ''
      }    
    }
  },  
  computed: {
    checkError() {
      return this.$store.getters.isError
      // return this.error.msg;
    },
    succstatus() {
        return this.$getters.isSuccess
    }
  },
  methods: {    
    edit_user: function() {
      let user_data = {
        id : this.updateUser.ID,
        name : this.updateUser.Name,
        state : this.updateUser.state,
        username : this.updateUser.username,
        password : this.updateUser.password
      }
      console.log(user_data)
      this.$store.dispatch('edituser', user_data)     
      .then(() => {
        this.$store.dispatch('loadUsers')        
        this.openEdit = false
      })
      .catch(error => {
        // this.$router.push('/adduser') 
        // throw new Error(`API ${error}`);
        console.log(error)
      });
    }
  },  
};
</script>

<!-- Add "scoped" to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}
</style>
