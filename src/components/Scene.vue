<template>
  <div>
    <div v-if="sceneInstance">
        <Emitter :scene-instance="sceneInstance"></Emitter>
        <!-- <Emitter :scene-instance="sceneInstance"></Emitter>
        <Emitter :scene-instance="sceneInstance"></Emitter>
        <Emitter :scene-instance="sceneInstance"></Emitter>
        <Emitter :scene-instance="sceneInstance"></Emitter>
        <Emitter :scene-instance="sceneInstance"></Emitter> -->
    </div>
  </div>
</template>

<script>
import Emitter from "./Emitter.vue";

export default {
  name: "Scene",
  components: { Emitter },
  data() {
    return {
      game: this.$store.getters.getGame,
      sceneInstance: null
    };
  },
  mounted() {
    let vm = this;
    this.game.scene.add(
      "scene,",
      {
        preload: function preload() {
          this.load.image("sky", "assets/sky.png");
          this.load.image("star", "assets/star.png");
        },
        create: function create() {
          vm.createScene(this);
        }
      },
      true,
      null
    );
  },
  methods: {
    createScene(scene) {
      this.sceneInstance = scene;
    }
  }
};
</script>
