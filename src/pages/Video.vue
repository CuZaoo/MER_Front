<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-bottom: 20px">
      <el-col :xs="6" :sm="6" :md="12" :lg="12" :xl="12">
        <span class="ff">原图像</span>
      </el-col>
      <el-col :xs="6" :sm="6" :md="12" :lg="12" :xl="12">
        <span class="ff">处理图像</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12" style="margin-bottom: 10px">
        <video ref="camera" width="320" height="240" style="border: bisque 1px solid" autoplay
               :poster="video_src"></video>
      </el-col>
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
        <!--        <el-image :src="src" style="width: 320px;height: 240px;border: bisque 1px solid">-->
        <!--        </el-image>-->
        <img ref="processedImg" :src="img_src" style="border: bisque 1px solid" width="320" height="240"/>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-bottom: 0px">
      <el-col :xs="8" :sm="6" :md="14" :lg="14" :xl="12">
        <el-button @click="startCamera" type="primary">打开摄像头</el-button>
        <el-button @click="screenshotAndProcess" type="warning">截图并处理</el-button>
        <el-button @click="stopCamera" type="info">关闭摄像头</el-button>
      </el-col>
    </el-row>
    <div>
    </div>
  </div>
</template>

<script>
import {io} from 'socket.io-client';
import video_src from '../assets/video.png'
import img_src from '../assets/result.png'

export default {
  data() {
    return {
      socket: null,
      cameraStream: null,
      processedStream: null,
      isCameraStarted: false,
      img_src: img_src,
      video_src: video_src
    };
  },
  methods: {
    startCamera() {
      console.log("打开摄像头")
      this.isCameraStarted = true;
      navigator.mediaDevices.getUserMedia({video: true})
          .then((stream) => {
            this.$refs.camera.srcObject = stream;
            this.cameraStream = stream;
            this.socket = io('http://192.168.230.177:5000');
            this.socket.on('connect', () => {
              console.log('connected to server');
            });
            this.socket.on('processed', (data) => {
              console.log('ssssssssssssss')
              this.$refs.processedImg.src = data;
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },

    stopCamera() {
      this.isCameraStarted = false;
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.$refs.processedImg.src = img_src;
      this.socket.disconnect();
    },
    screenshotAndProcess() {
      if (!this.isCameraStarted) return;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = this.$refs.camera.videoWidth;
      canvas.height = this.$refs.camera.videoHeight;
      ctx.drawImage(this.$refs.camera, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
      this.socket.emit('frame', dataUrl);
      // this.$socket.emit('frame',dataUrl);
      // this.$api.post("/frame", {"data_url":dataUrl}, (data) => {
      //   console.log(data)
      //   this.$refs.processedImg.src = data;
      // })
      // setTimeout(captureFrame, 1000 / 30); // 30 FPS
    }
  },
};
</script>

