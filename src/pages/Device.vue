<template>
  <div>
        操作系统：{{info.platform}}
        <el-divider></el-divider>
        硬件类型：{{info.machine}}
        <el-divider></el-divider>
        硬件处理器：{{info.processor}}
        <el-divider></el-divider>
        硬件Python版本：{{info.python_version}}
  </div>
</template>

<script>
import {io} from "socket.io-client";
export default {
  name: "Device",
  data(){
    return{
        info:{"machine":"未知","platform":"未知","processor":"","python_version":"未知"}
    }
  },
  methods:{
    GetDeviceInformation(){
      console.log("获取设备信息内部")
      this.socket.emit('get_device_info');
      this.socket.on("get_device_info_end", (data) => {
        data = eval('(' + data + ')');
        console.log(data)
        this.info = data.result
        console.log(this.info)
      }, (error) => {
        console.log(error)
      })
    }
  },
  mounted() {
    console.log("获取设备信息")
    this.socket = io('http://192.168.230.80:5001');
    this.socket.on('connect', () => {
      console.log('connected to server');
    });

    this.GetDeviceInformation()
  }
}
</script>

<style scoped>

</style>