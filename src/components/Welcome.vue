<template>
  <div class="hello">
    
    <!-- <img style="vertical-align:bottom" alt="Vue logo" src="./logo.png"/> -->
    <v-toolbar-title>List of all Registered Users</v-toolbar-title>
    <v-toolbar-side-icon>
      <v-flex>
      <AddUser/>
    </v-flex>
    </v-toolbar-side-icon>
    <!-- style="vertical-align:right" -->
    
    <p v-if="error" style="color: red">{{error}} </p>
      <!-- <v-spacer></v-spacer> -->
    <!-- <router-link to="/addUser"> <v-btn button>ADD USER
      <v-icon dark>mdi-plus</v-icon></v-btn></router-link>     -->
    <table>      
      <thead>
      <tr>
        <td style="font-weight:bold">ID</td> 
        <td style="font-weight:bold">Name</td>
        <td style="font-weight:bold">State</td>
        <td style="font-weight:bold">Username</td>
        <td style="font-weight:bold">Password</td>
        <td style="font-weight:bold"> Edit </td>
        <td style="font-weight:bold"> Delete </td>
      </tr>
     </thead>
     <tbody>
      <tr v-for="user in users" :key="user.ID">        
        <td>{{user.ID}}</td>
        <td>{{user.Name}}</td>
        <td>{{user.state}}</td>
        <td>{{user.username}}</td>
        <td>{{user.password}}</td>        
        <td><v-flex><EditUser :updateUser="user"/></v-flex></td>
        <td><v-icon class="mr-2" @click="deleteUser(user.ID)"> mdi-delete </v-icon></td>        
      </tr>
     </tbody> 
    </table>
    
  </div>
</template>

<script>
import {mapState} from "vuex";
import AddUser from './AddUser'
import EditUser from './EditUser'

export default {    
  name: 'Welcome',
  components: {
    AddUser,
    EditUser
  },
  data(){
    return {
        defaultuser: {
            id: '',
            name: '',
            password: ''
        }
    }
  },
  computed: mapState(
    ['users', 'error']
  ), 
  mounted() {
    this.$store.dispatch('loadUsers');
  },
  methods: {
    deleteUser: function(id){
      console.log(id)
      this.$store.dispatch('deleteUser', id)
      .then(() => {
        this.$store.dispatch('loadUsers');
        // this.$router.push('/welcome')
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/welcome')         
      });
    }
  }
  // watch, method, 
  
};
</script>

<!-- Add "scoped" to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}
</style>
