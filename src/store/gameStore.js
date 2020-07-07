import gameScene from '../scenes/scene'
import axios from "axios";

export default {
    state: {
        game:null,
        gameConfig: {
        },
        visual:[],
        layerProps:[]
    },
    getters: {
        getGame: state => {
            return state.game
        },
        getGameConfig: state => {
            return state.gameConfig
        },
        getLayerProps: (state,selectedLayer) => {
            return state.layerProps[selectedLayer-1]
        },
        getVisual: state => {
          return state.visual
        }
    },
    mutations: {
        setGame(state, payload) {
            state.game = payload
        },
        setGameConfig(state, payload) {
            state.gameConfig = payload
        }
    },
    actions: {
        setGame(context, game) {
            context.commit('setGame', game)
        },
        setGameConfig(context, config) {
            context.commit('setGameConfig', config)
        },
        fetchDefaultVisual(context, name){
          return axios.get('assets/presets/default.json')
        }
    }

}
