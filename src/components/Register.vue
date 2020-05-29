<template>
  <div>    
    <h1>Register</h1>        
    <v-card class="register" @submit.prevent="register_user" width="400px"> 
    
    <p v-if="checkError" style="color: red">{{checkError}} </p>
     <v-text-field label="Username" required v-model="input.username" prepend-icon="mdi-username"/>
     <v-text-field label="Password" required 
     v-model="input.password" type="password" prepend-icon="mdi-lock"/>
     <v-text-field label="Name" required v-model="input.name" prepend-icon="mdi-name"/>     
     
     <hr/>
     <v-btn button type="submit" class="mb-3" success @click='register_user()'>Register</v-btn>
   </v-card>
  </div>
</template>

<script>
// import {mapState} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      input: {
        name: "",
        username: "",
        password: ""        
      }
    }
  },  
  computed: {
    checkError() {
      return this.$store.getters.isError
      // return this.error.msg;
    }
  },
  methods: {    
    async register_user() {
      await this.$store.dispatch('register', this.input)     
      .then(() => {
        this.$router.push('/login')
      })
      .catch(error => {
        this.$router.push('/register') 
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
