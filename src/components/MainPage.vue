<template>
  <div class="hello">
    
    <!-- <img style="vertical-align:bottom" alt="Vue logo" src="./logo.png"/> -->
    <h1 title="Welcome to Vuex Page"></h1>
    <h2 title="List of all Registered Users"></h2>
    
    <!-- https://vuetifyjs.com/en/components/data-tables/#examples -->

    <v-data-table
    :headers="headers"    
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <!-- <span class="headline">{{ formTitle }}</span> -->
              <span class="headline">List of All Users</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editUser_ip.id" label="User ID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editUser_ip.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editUser_ip.password" label="Password"></v-text-field>
                  </v-col>                  
                </v-row>
                <v-row v-for="user in users" :key="user.id">
                    <v-col>{{user.id}}</v-col>
                    <v-col>{{user.username}}</v-col>
                    <v-col>{{user.password}}</v-col>                    
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ user }">
      <v-icon
        small
        class="mr-2"
        @click="editUser(user)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteUser(user)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {    
  name: 'Welcome',
  data() {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'List of all Registered Users',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Id', value: 'id' },
          { text: 'Name', value: 'username' },
          { text: 'Password', value: 'password' }
        ],
        users: [],
        editUser_ip: {
            id: '',
            name: '',
            password: ''
        },
        defaultuser: {
            id: '',
            name: '',
            password: ''
        }
      }
  },
  computed: mapState(
    ['users']
  ), 
  mounted() {
    this.$store.dispatch('loadUsers');
  },
  methods: {
    deleteItem: function(item){
      console.log(item)
    // axios.post('/vueitems/'+item.id).then((response) => {
    //     this.getVueItems();
    //     this.hasError = false,
    //     this.hasDeleted = true
    //   });
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
