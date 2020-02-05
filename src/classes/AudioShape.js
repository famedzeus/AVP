export class AudioShape {

  constructor(){

    this.audioInitialised = false
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => this.initAudioSuccess(stream));

  }

  initAudioSuccess(stream){

    this.context = new AudioContext();
    this.source = this.context.createMediaStreamSource(stream);
    this.processor = this.context.createScriptProcessor(256, 1, 1);
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 0.5

    this.maxPeak = 0;
    this.maxTrough = 0;
    
    this.source.connect(this.processor);
    this.processor.connect(this.context.destination);
    console.log("Source/processor connect")

    this.processor.onaudioprocess = (e) => this.initReadAudio(e)

  }

  initReadAudio(e){

    this.audioInitialised = true

    let audio = e.inputBuffer.getChannelData(0)
        
    // Get mean volume
    this.peak = 0
    this.trough = 0
    audio.forEach(byte => {
      if(byte > this.peak){
        this.peak = byte
      }
      if(byte < this.trough){
        this.trough = byte
      }
    })

    // update maxe peak and trough detected
    if(this.peak > this.maxPeak){
      this.maxPeak = this.peak
    }
    if(this.trough < this.maxTrough){
      this.maxTrough = this.trough
    }

    this.audioVolume = this.peak - this.trough
    // this.audioVolume = Math.floor(this.audioVolume*1000)


    // vm.graphics.scene.drawRect(5, 0, vm.audioVolume, 100);

    if(this.peak != 0 && this.trough != 0){
      // console.log("Peak:"+Math.floor(peak*100000)+" Trough:"+Math.floor(trough*100000))
      // console.log(Math.floor(trough*100000) - Math.floor(peak*100000))
    }
    
    // vm.layerProps.particleCreateProps.scaleX += 1+vm.audioVolume/5
    // vm.layerProps.particleCreateProps.scaleY += 1+vm.audioVolume/5
    // vm.layerProps.particleCreateProps.rotation += 1+vm.audioVolume/4

  }

  resetMaxes(){
    this.maxTrough = 0
    this.maxPeak = 0
  }

  getAudioVolume(){
    return this.audioVolume
  }  

  getAudioInputLevel(){
    return this.gainNode.gain.value
  }

  getRangeDetection(){
    // let bottom = -this.trough
    // let top = this.peak + bottom
    // return {bottom:0, top}
    return {bottom:this.maxTrough, 
            top:this.maxPeak, 
            range: (this.maxPeak - this.maxTrough),
            audioVolume: Math.floor((this.audioVolume/(this.maxPeak - this.maxTrough)) * 100)
    }
  }

  setAudioInputLevel(v){
    this.gainNode.gain.value = v
  }

}