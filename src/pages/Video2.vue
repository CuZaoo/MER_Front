<template>
  <div>
    <el-row>
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
        <video ref="originalVideo" width="320" height="240" autoplay poster="../assets/logo.png"></video>
      </el-col>
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
        <el-image :src="src" style="width: 320px;height: 240px">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12" :offset="6">
        <el-button @click="startCamera">打开摄像头</el-button>
        <el-button @click="stopCamera">关闭摄像头</el-button>
      </el-col>
    </el-row>
    <div>


    </div>

  </div>
</template>

<script>
import {io} from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      cameraStream: null,
      processedStream: null,
      isCameraStarted: false,
      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    };
  },
  methods: {
    startCamera() {
      this.isCameraStarted = true;
      navigator.mediaDevices.getUserMedia({video: true})
          .then((stream) => {
            this.$refs.camera.srcObject = stream;
            this.cameraStream = stream;
            this.socket = io('http://localhost:5000');
            this.socket.on('connect', () => {
              console.log('connected to server');
            });
            this.socket.on('processed', (data) => {
              console.log('processed')


              this.$refs.processed.src = data;
              // console.log(this.$refs.processed)
            });
            const captureFrame = () => {
              if (!this.isCameraStarted) return;
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = this.$refs.camera.videoWidth;
              canvas.height = this.$refs.camera.videoHeight;
              ctx.drawImage(this.$refs.camera, 0, 0);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
              this.socket.emit('frame', dataUrl);
              setTimeout(captureFrame, 1000 / 30); // 30 FPS
            }
            captureFrame();
          })
          .catch((err) => {
            console.error(err);
          });
    },

    stopCamera() {
      this.isCameraStarted = false;
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.socket.disconnect();
    },
  },
};
</script>
