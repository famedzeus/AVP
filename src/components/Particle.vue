<template>
  <div>
    <a href="#" @click="test">Test </a>
  </div>
</template>

<script>

import { EmitterOp } from 'phaser'

export default {
  name: "Emitter",
  props: {
    sceneInstance: Object
  },
  data() {
    return {
      updateEmitter:null,
      emitterOp:Object,
      emitter:Object,
      game: this.$store.getters.getGame
    };
  },
  mounted() {
    let vm = this;
    var particles = this.sceneInstance.add.particles("star");

    var bunny = this.sceneInstance.add.image(400, 300, 'star');
    var bunny2 = this.sceneInstance.add.image(430, 300, 'star');
    bunny.alpha = 0.9;
    bunny.tint = 0xff0000;
    bunny.scaleX = 13;

    // this.emitter = particles.createEmitter(
    //   {
    //   //   x:400,
    //   //   y:200,
    //   //   // y:{
    //   //   //   onEmit:function(particle,key,t,value){
    //   //   //     return Math.random()*300
    //   //   //   }
    //   //   // },
    //   //   speed:100,
    //      alpha:{start:1,end:0},
    //   //   tint:[0xffffff,0xff0000,0xffff00],
    //   //   // tint:{start:0xffffff,end:0xff0000},
    //   //   // rotate:{
    //   //   //   onEmit:function(particle,key,t,value){
    //   //   //     return Math.random()*360
    //   //   //   }
    //   //   // },
    //   //   // scaleX:4,
    //   //   // scaleY:4,
    //   //   // scaleX:{
    //   //   //   onEmit:function(particle,key,t,value){
    //   //   //     return Math.random()*30
    //   //   //   }
    //   //   // },
    //   }
    // );
    // this.emitter.setPosition(400, 300);
    // this.emitter.setSpeed(200);
    // this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    // this.emitter.rotate.propertyValue = 0;
    // this.emitter.scaleX.propertyValue = 5;
    // this.emitter.speedX.propertyValue = 125;
    
    // this.test()

  },
  desroyed(){
    clearInterval(this.updateEmitter)
  },
  methods: {
    test(){
      this.updateEmitter = setInterval(() => {
        this.emitter.forEachAlive(function (particle) {
          let p = particle  
          particle.alpha = 0
          
          // if (particle.body.velocity.y > 100) {
          //   if (particle.animations.sprite.rotation >= 0 && particle.animations.sprite.rotation < Math.PI) {
          //     particle.animations.sprite.rotation += Math.PI / 40;
          //     if (particle.animations.sprite.rotation > Math.PI) {
          //       particle.animations.sprite.rotation = Math.PI;
          //     }
          //   }
          // }
        });

      },1)
    }

  }
};
</script>
