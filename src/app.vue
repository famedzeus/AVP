<template>
  <div>
    <div id="game" v-if="downloaded == true" @mousemove="setPosition" @mousedown="startDragPosition" @mouseup="stopDragPosition">
      <Scene ref="game" id="game"></Scene>
    </div>
    <div class="placeholder" v-else>Downloading ...</div>
  </div>
</template>

<script>
// import Game from './components/Game.vue'
import Phaser from "phaser";
import Scene from "./components/Scene.vue";

export default {
  name: "App",
  components: { Scene },
  data() {
    return {
      game: null,
      draggingPosition:false,
      gameConfig: {
        disableContextMenu:true,
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
    setPosition(event) {
      if(this.draggingPosition == true){
        this.$refs["game"].setPosition(event);
      }
    },
    startDragPosition($event){
      console.log($event.cancelable)
      $event.stopPropagation()
      if($event.button == 2){
        this.draggingPosition = true
      }
    },
    stopDragPosition(){
      this.draggingPosition = false
    },
    windowResize(w){
      this.game.scale.setGameSize(window.innerWidth-4,window.innerHeight-4)
    }
  },
  created(){
    window.addEventListener("resize", this.windowResize)
  },
  mounted() {
    let vm = this;
    this.gameConfig.width = window.innerWidth-4;
    this.gameConfig.height = window.innerHeight-4;
    this.$store.dispatch("setGameConfig", this.gameConfig);
    this.game = new Phaser.Game(this.gameConfig);
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.parentIsWindow = true;    
    this.$store.dispatch("setGame", this.game);
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
canvas {
  padding:0;
  margin:0;
}
</style>
