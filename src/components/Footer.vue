<template>

    <v-footer>
        <!--dark padless -->
    <!-- <v-card   
        class="indigo lighten-1 white--text text-center"
    > -->
    <v-row
      justify="center"
      no-gutters
    >
    <!-- flat tile -->
      <v-card-text class="indigo lighten-2 py-4 text-center white--text">
        <v-btn v-for="icon in icons" :key="icon" 
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <!-- <v-card-text class="white--text pt-0"> -->
      <v-card-text class="primary lighten-2 py-4 text-center white--text">
        Get connected to us on above Social Media websites.
      </v-card-text>

      <v-divider></v-divider>

      <!-- <v-card-text class="white--text"> -->
    <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
    >
        {{ new Date().getFullYear() }} — <strong></strong>
        <router-link to="/"> <v-btn button>Home</v-btn></router-link>
        <router-link to="/about"> <v-btn button>About</v-btn></router-link>
      <!-- </v-card-text> -->
    </v-col>
    <!-- </v-card> -->
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer",
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
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