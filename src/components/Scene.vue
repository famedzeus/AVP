<template>
  <div>
    <div v-if="sceneInstance">
        <Layer :scene-instance="sceneInstance"></Layer>
        <!-- <Layer :scene-instance="sceneInstance"></Layer>
        <Layer :scene-instance="sceneInstance"></Layer>
        <Layer :scene-instance="sceneInstance"></Layer>
        <Layer :scene-instance="sceneInstance"></Layer>
        <Layer :scene-instance="sceneInstance"></Layer> -->
    </div>
  </div>
</template>

<script>



import Layer from "./Layer.vue";


export default {
  name: "Scene",
  components: { Layer },
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
