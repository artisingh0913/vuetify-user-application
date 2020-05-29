<template>
  <v-app>    
    <Navg/>
    <!-- <v-app-bar/> -->
    <v-divider></v-divider>
    <v-content>      
      <v-container fill-height align-center> 
        <v-row
        justify="center"
        no-gutters
        >         
          <!-- align-center justify-center -->
          <router-view/>   
        </v-row>     
      </v-container>
    </v-content>
    <!-- <v-footer app> -->
    <Footer/>
  <!-- </v-footer> -->
  </v-app>
</template>

<script>
import Navg from './components/Navg';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Navg,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
