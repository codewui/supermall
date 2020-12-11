import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartlist: []
    },
    mutations: {
        addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.checked = true
            state.cartlist.push(payload)
        }
    },
    getters: {
        cartlength(state) {
            return state.cartlist.length
        },
        cartlist(state) {
            return state.cartlist
        }
    },
    actions: {
        addCart(context, payload) {
            let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid)
                // for (let item of state.cartlist) {
                //     if (item.iid === payload.iid) {
                //         oldProduct = item;
                //     }
                // }
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
            } else {
                payload.count = 1
                context.commit('addToCart', payload)
            }

        }
    }
})

export default store