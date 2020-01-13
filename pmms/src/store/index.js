import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store ({
    state:{  
        user:'',
        role:''
    },  
    mutations:{  
        set_user(user,role) {  
            state.user = user  
            state.role = role  
        }, 
        get_user() {  
            return user
        }, 
        del_user() {  
            state.user = ''
        } 
    } 
})

export default store