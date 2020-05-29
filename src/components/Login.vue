<template>
  <div>    
    <h1>Login</h1>
    
        <!-- class="login"   class="mx-auto mt-5"-->
    <v-card class="login" @submit.prevent="login_user" width="400px"> 
     
     <p v-if="checkError" style="color: red">{{checkError}} </p>
     <!-- <label>User name</label> -->
     <!-- <v-text aria-label="username">Username</v-text> 
     <input required v-model="username" type="text" placeholder="username"/> -->
     <v-text-field label="Username" required v-model="input.username" prepend-icon="mdi-username"/>
     
     <!-- <label>Password</label> -->
     <!-- <v-label aria-label="password">Password</v-label> 
     <input required v-model="password" type="password" placeholder="password"/> -->
     <v-text-field label="Password" required 
     v-model="input.password" type="password" prepend-icon="mdi-lock"/>
     <!-- prepend-icon="mdi-lock"     
     :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
     @click:append="showPassword = !showPassword"
     :type="showPassword ? 'text' : 'password'" -->
     
     <hr/>
     <v-btn button type="submit" class="mb-3" success @click='login_user()'>Login</v-btn>
   </v-card>
  </div>
</template>

<script>
// import {mapState} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      error:{msg:""}
    }
  },  
  computed: {
    checkError() {
      return this.$store.getters.isError
      // return this.error.msg;
    }
  },
  methods: {    
    async login_user() {
      await this.$store.dispatch('login', this.input)
      // let username = this.input.username
      // let password = this.input.password
      // this.$store.dispatch('login', {username, password})
      // res.data
      // res.error
      .then(() => {
        this.$router.push('/welcome')
      })
      .catch(error => {
        this.$router.push('/login') 
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
