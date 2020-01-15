<template>
  <div class="slidecontainer">
    <input type="range" :min="min" :max="max" :value="value" class="slider" id="myRange" @change="change">
    <!-- <p>Value: <span id="demo"></span></p> -->
  </div>  
</template>

<script>

export default {
  name: "Slider",
  props: {
    prop:String,
    min:Number,
    max:Number,
    value:String,
    audio:Boolean
  },
  data() {
    return {
      // value:''
    };
  },
  mounted() {
    let vm = this;
        
  },
  methods: {
    change(el){
      // this.value = el.target.value
      this.$emit('change',{prop:this.prop,value:el.target.value,audio:this.audio})
    }
  }
};
</script>

<style scoped>

  .slidecontainer {
    width: 100%;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 20px;
    background: #4CAF50;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 10px;
    height: 20px;
    background: #4CAF50;
    cursor: pointer;
  }

</style>