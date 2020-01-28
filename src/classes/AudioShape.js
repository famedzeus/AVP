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
    
    this.source.connect(this.processor);
    this.processor.connect(this.context.destination);
    console.log("Source/processor connect")

    this.processor.onaudioprocess = (e) => this.initReadAudio(e)

  }

  initReadAudio(e){

    this.audioInitialised = true

    let audio = e.inputBuffer.getChannelData(0)
        
    // Get mean volume
    let peak = 0
    let trough = 0
    audio.forEach(byte => {
      if(byte > trough){
        trough = byte
      }
      if(byte < peak){
        peak = byte
      }
    })

    this.audioVolume = Math.floor(trough*100000) - Math.floor(peak*100000)
    // vm.graphics.scene.drawRect(5, 0, vm.audioVolume, 100);

    if(peak != 0 && trough != 0){
      // console.log("Peak:"+Math.floor(peak*100000)+" Trough:"+Math.floor(trough*100000))
      // console.log(Math.floor(trough*100000) - Math.floor(peak*100000))
    }
    
    // vm.emitterProps.particleCreateProps.scaleX += 1+vm.audioVolume/5
    // vm.emitterProps.particleCreateProps.scaleY += 1+vm.audioVolume/5
    // vm.emitterProps.particleCreateProps.rotation += 1+vm.audioVolume/4

  }

  getAudioVolume(){
    return this.audioVolume
  }  

  getAudioInputLevel(){
    return this.gainNode.gain.value
  }

  setAudioInputLevel(v){
    this.gainNode.gain.value = v
  }

}