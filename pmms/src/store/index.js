import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = new Vuex.Store ({
    state:{  
        user:'',
        role:''
    },
    mutations:{  
        setUser(state,user){
            state.user = user
        },
        setRole(state,role){
            state.role = role
        }
    }
})
export default state