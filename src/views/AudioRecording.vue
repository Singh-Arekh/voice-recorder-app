<template>
    <div class="audio-recording">
      <h2>Start Recording</h2>
      <div>
        <button @click="startRecording" :disabled="isRecording">Start Recording</button>
        <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
        <button @click="mergeAudio" :disabled="chunks.length === 0">Merge Audio</button>
        <button @click="retrieveAudio" :disabled="!mergedAudioUrl">Retrieve Merged Audio</button>
      </div>
      
      <div v-if="audioUrl">
        <h3>Preview Recorded Audio</h3>
        <audio :src="audioUrl" controls></audio>
      </div>
  
      <div v-if="mergedAudioUrl">
        <h3>Preview Merged Audio</h3>
        <audio :src="mergedAudioUrl" controls></audio>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'AudioRecording',
    data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        chunks: [],
        audioUrl: null,
        mergedAudioUrl: null,
      };
    },
    methods: {
      startRecording() {
        this.isRecording = true;
        this.chunks = [];
        
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
              this.chunks.push(event.data);
            };
            this.mediaRecorder.start();
          })
          .catch((err) => {
            console.error('Error accessing microphone: ', err);
          });
      },
  
      stopRecording() {
        this.isRecording = false;
        this.mediaRecorder.stop();
        
        const audioBlob = new Blob(this.chunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        
        // Convert Blob to Base64 and send to backend
        const reader = new FileReader();
        reader.onloadend = () => {
          this.sendChunksToLambda(reader.result);
        };
        reader.readAsDataURL(audioBlob);
      },
  
      async sendChunksToLambda(audioData) {
        try {
          const chunkId = `chunk_${Date.now()}`;
          const payload = {
            chunkIds: [chunkId],
            [chunkId]: audioData.split(',')[1], // Extract base64-encoded audio from data URL
          };
  
          const response = await fetch('https://765f5j3xi7rzocv2eajuc6m5yy0jqbnc.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
          const data = await response.json();
          console.log('Audio chunk uploaded:', data);
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      },
  
      async mergeAudio() {
        try {
          const response = await fetch('https://d473bihai55q342qavcznqqysu0xsunp.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chunkIds: this.chunks.map((_, index) => `chunk_${index}`),
            }),
          });
  
          const data = await response.json();
          console.log('Merge response:', data);
          alert('Audio merged successfully!');
          this.mergedAudioUrl = data.audioUrl;  // Assuming the response contains the URL of merged audio
        } catch (error) {
          console.error('Error merging audio:', error);
        }
      },
  
      async retrieveAudio() {
        try {
          const response = await fetch('https://fwshbysc2lefzi6qw3klbda4oy0mwihu.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: 'merged-audio.wav',
            }),
          });
  
          const data = await response.json();
          this.mergedAudioUrl = data.audioUrl;  // Assuming the response contains the URL of the retrieved audio
        } catch (error) {
          console.error('Error retrieving audio:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .audio-recording {
    text-align: center;
    padding: 20px;
  }
  
  button {
    margin: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>
  