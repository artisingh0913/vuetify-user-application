<template>
  <v-row justify="center">
    <v-dialog v-model="dialog">
      <!-- persistent max-width="600px" -->
      
      <template v-slot:activator="{ on }">
        <!-- <v-btn  v-on="on" >Add</v-btn> -->
        <v-btn v-on="on" color="red" dark small absolute top right fab>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <!-- <v-icon large v-on="on" color="primary" dark justify="right-corner">mdi-account-plus</v-icon> -->
        <!-- color="primary" dark -->
        <!-- @click="dialog = true" -->
      </template>

      <v-card>
        <!-- @submit.prevent="add_user" width="400px" -->
        <v-card-title>
          <span class="headline">Enter New User Information</span>
        </v-card-title>
        
        <!-- <p class="error" v-if="checkError" style="color: red">{{checkError}} </p> -->

        <v-card-text> 
          <v-container>
          <v-text-field label="Name" required v-model="input.name"/>
          <v-text-field label="State" required v-model="input.state"/>
          <v-text-field label="UserName" required v-model="input.username"/>     
          <v-text-field label="Password" required v-model="input.password"/>     
          <!-- <hr/> -->
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog=false">Close</v-btn>
          <v-btn text @click='add_user'>Add User</v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import {mapState} from "vuex";

export default {
  name: "AddUser",
  // props: {
  //   value: Boolean
  // },
  data() {
    return {
      dialog: false,
      input: {
        name: "",
        state: "",
        username: "",
        password: ""        
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
    },
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  methods: {    
    add_user: function() {
      this.$store.dispatch('adduser', this.input)     
      .then(() => {
        this.$store.dispatch('loadUsers')        
        this.dialog = false
        this.input.name = ""
        this.input.state = ""
        this.input.username = ""
        this.input.password = ""
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
