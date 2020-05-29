import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = "http://localhost:8080";

export default new Vuex.Store({
  state: {
    users: [],
    username: "Guest",
    token: localStorage.getItem('token') || '',
    status: '',
    input: {},
    error: ""
  },
  mutations: {
    SAVE_USERS(state, users) {
      state.users = users;  
      state.error = ""    
    },
    LOGGED_USER(state, logged_user) {
      state.username = logged_user.user
      state.token = logged_user.token
      state.status = "authorized"
      state.error = ""
    },
    AUTH_PROCESS(state){
      state.status = "auth_in_process"
      state.error = ""
      state.token = ''
    },
    CLEAR_USER(state) {
      state.username = "Guest" 
      state.status = ''
      state.token = ''  
      state.error = ''
    },
    LOGGED_ERR(state, err){
      state.status = "not_authorized"
      state.error = err
    },
    LOAD_ERR(state, err) {
      state.error = err
    } ,
    USER_ADDED(state) {
      state.status = "user added"
      state.error = ''
      // state.users.push(data)
    },
    REGISTER_USER(state) {
      state.status = "registrating"
      state.error = ''
    },
    ADD_USER(state) {
      state.status = "adding user"
      state.error = ''
    },
    EDIT_USER(state) {
      state.status = "editing user"
      state.error = ''
    },
    USER_UPDATED(state) {
      state.status = "User Detail Updated.."
      state.error = ''
    },
    DELETE_USER(state) {
      state.status = "deleting user"
      state.error = ""
    },
    USER_DELETED(state) {
      state.status = "deleted user"
      state.error = ""
    },
    DELETE_ERR(state) {
      state.status = "delete error"
      state.error = "Failed to Delete!!!"
    }
  },
  actions: {
    loadUsers({commit}) {
        Vue.axios.get('users')
        .then(response => {
          commit('SAVE_USERS', response.data);
        })
        .catch(error => {
          commit('LOAD_ERR', error)
          console.log(error)
          // throw new Error(`API ${error}`);
        });
      },
      logout({commit}) {        
        return new Promise((resolve) => {          
          commit('CLEAR_USER')
          localStorage.removeItem("token") 
          axios.defaults.headers.common['Authorization']
          resolve()          
        })               
      },
      login({commit}, data) {
        // {username, pwd}  auth_data
        commit('AUTH_PROCESS')
        const auth_data = {"username": "", "password" : ""}
        auth_data.username = data.username
        auth_data.password = data.password        
        console.log(auth_data)

        return new Promise((resolve, reject) => {
          // Vue.axios.get('/login', auth_data)
          // Vue.axios.post('/login', {username:username, password: pwd})

          // TODO: try-catch statement, await axios.de

        Vue.axios({url: '/login', data: auth_data, method: 'POST'})
        .then(response => {          
          localStorage.setItem('token', response.data.token)
          axios.defaults.headers.common['Authorization'] = response.token
          commit('LOGGED_USER', response.data)
          resolve(response)
        })        
        .catch(error => {
          commit('LOGGED_ERR', "Incorrect username or password!!!")
          localStorage.removeItem('token')   
          console.log(error)                         
          reject("Incorrect username or password!!!")
        });
        })
      },
      register({commit}, data) {        
        commit('REGISTER_USER')
        const user_data = {"name": "", "username": "", "password" : ""}
        user_data.name = data.name
        user_data.username = data.username
        user_data.password = data.password        
        console.log(user_data)

        return new Promise((resolve, reject) => {
        Vue.axios({url: '/register', data: user_data, method: 'POST'})
        .then(response => {                    
          commit('USER_REGISTERED', response.data)
          resolve(response)
        })        
        .catch(error => {
          commit('LOGGED_ERR', "Registration Failed")
          localStorage.removeItem('token') 
          console.log(error)                           
          reject("Registration Failed")
        });
        })
      },
      adduser({commit}, data) {        
        commit('ADD_USER')
        const user_data = {"name": "", "state": "", "username": "", "password" : ""}
        user_data.name = data.name
        user_data.state = data.state
        user_data.username = data.username
        user_data.password = data.password        
        console.log(user_data)

        return new Promise((resolve, reject) => {
        Vue.axios({url: '/users', data: user_data, method: 'POST'})
        .then(response => {                    
          commit('USER_ADDED')
          resolve(response)
        })
        .catch(error => {
          commit('LOGGED_ERR', "Adding User Failed")
          localStorage.removeItem('token') 
          console.log(error)                           
          reject("Adding User Failed")
        });
        })
      },
      edituser({commit}, data) {        
        commit('EDIT_USER')
        const user_data = {"id": "", "name": "", "state": "", "username": "", "password" : ""}
        user_data.id = data.id
        user_data.name = data.name
        user_data.state = data.state
        user_data.username = data.username
        user_data.password = data.password        
        console.log(user_data)

        return new Promise((resolve, reject) => {
        Vue.axios({url: '/users', data: user_data, method: 'PUT'})
        .then(response => {                    
          commit('USER_UPDATED')
          resolve(response)
        })
        .catch(error => {
          commit('LOGGED_ERR', "Editing User Failed")          
          console.log(error)                           
          reject("Editing User Failed")
        });
        })
      },
      deleteUser({commit}, userid) {        
        commit('DELETE_USER')        
        console.log(userid)

        return new Promise((resolve, reject) => {
        Vue.axios({url: '/users?id='+userid, method: 'DELETE'})
        .then(response => {                    
          commit('USER_DELETED')
          resolve(response)
        })
        .catch(error => {
          commit('DELETE_ERR')          
          console.log(error)                           
          reject("Failed to Delete User...!!!")
        });
        })
      }
  },  
  getters: {    
    notLoggedIn: state => state.token,
    loggedStatus: state => state.status,
    currentUser: state => state.username,
    isError: state => state.error,
    isSuccess: state => state.status
  }
})


/*
PROBLEM: Access to XMLHttpRequest at 'http://localhost:8080/users' from origin 'http://localhost:8081' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the 
requested resource.

So, there was no response from the server
FIX: Added code to server to handle CORS
*/