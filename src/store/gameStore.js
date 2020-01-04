import gameScene from '../scenes/scene'

export default {
    state: {
        game:null,
        gameConfig: {
        }
    },
    getters: {
        getGame: state => {
            return state.game
        },
        getGameConfig: state => {
            return state.gameConfig
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
        }
    }

}
