<template>
  <div> 
    <v-app-bar
      
      color="primary"
      dark
    >
    <!-- app -->
      <div class="d-flex align-center">
        <v-toolbar-title>Hello {{currentUser}}, Welcome to Vuex</v-toolbar-title>        
      </div>

      <v-spacer></v-spacer>

      <router-link to="/"> <v-btn button>Home</v-btn></router-link>
      <router-link to="/about"> <v-btn button>About</v-btn></router-link>
      <router-link to="/login"><v-btn button v-if="isNotLoggedIn">Login</v-btn></router-link>
      <router-link to="/welcome"><v-btn button v-if="isLoggedIn">Users</v-btn></router-link>
      <router-link to="/"><v-btn button @click="logout_user" v-if="isLoggedIn">Logout</v-btn></router-link>
      <router-link to="/register" > <v-btn button v-if="isNotLoggedIn">Register</v-btn></router-link>

    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',   // name of the component
    computed: {
        currentUser() {
         return this.$store.getters.currentUser;
        },
        isLoggedIn : function(){ 
          // console.log("isloggedin", this.$store.getters.notLoggedIn)
          return this.$store.getters.notLoggedIn},
        isNotLoggedIn : function(){ 
          // console.log("isNotloggedin", !this.$store.getters.notLoggedIn)
          return !this.$store.getters.notLoggedIn}
    },   
    methods: {
      logout_user() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })        
      }
    }
}
</script>

<style lang="scss">
    .vnb {
        .button-red {
            background: #FF3B30;

            &:hover {
                background: darken(#FF3B30, 10%);
            }
        }
    }
</style>