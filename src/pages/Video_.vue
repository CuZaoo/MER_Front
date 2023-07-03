<template>
  <div>
    <video ref="video" autoplay></video>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <<img ref="img" />
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      isStreaming: false,
      stream: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:5000');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('image', (data) => {
      this.$refs.img.src = `data:image/jpeg;base64,${data}`;
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        this.stream = stream;
        this.$refs.video.srcObject = stream;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    start() {
      if (!this.isStreaming) {
        this.isStreaming = true;
        const video = this.$refs.video;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const draw = () => {
          if (!this.isStreaming) {
            return;
          }

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL('image/jpeg', 0.7);
          this.socket.emit('image', dataURL);

          requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
      }
    },
    stop() {
      this.isStreaming = false;
      this.$refs.video.pause();
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
    },
  },
};
</script>
