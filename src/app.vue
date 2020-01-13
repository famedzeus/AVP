<template>
  <div>
    <div id="game" v-if="downloaded == true">
      <Scene></Scene>
    </div>
    <div class="placeholder" v-else>Downloading ...</div>
  </div>
</template>

<script>
// import Game from './components/Game.vue'
import Phaser from "phaser";
import Scene from './components/Scene.vue'

export default {
  name: "App",
  components:{Scene},
  data() {
    return {
      game: null,
      gameConfig: {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "game",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 300 },
            debug: false
          }
        }
      },
      containerId: "",
      downloaded: false
    };
  },
  methods: {
  },
  mounted() {
    let vm = this
    this.$store.dispatch("setGameConfig", this.gameConfig)
    this.game = new Phaser.Game(this.gameConfig)
    this.$store.dispatch("setGame", this.game)
  },
  watch: {
    game(g) {
      if (g) {
        this.downloaded = true;
      }
    }
  }
};
</script>


<style>
  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
</style>
