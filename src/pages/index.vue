<template>
  <div style="background-color: bisque">
    <div class="main" style="background-color: bisque">
      <el-row type="flex" justify="center" style="margin-bottom: 10px">
        <span style="font-size: 50px;align-content: center">智能灯表情管理系统</span>
      </el-row>
      <el-row>
        <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
          <el-card class="el-card-define" style="margin-right: 0px">
            <template #header>
              <div class="card-header">灯光设置
              </div>
            </template>
            <div class="text item">
              <Lamplight></Lamplight>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
          <el-card class="el-card-define" style="margin-left: 0px">
            <template #header>
              <div class="card-header">设备信息
              </div>
            </template>

            <div class="text item">
              <Device></Device>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
          <el-card class="el-card-define">
            <template #header>
              <div class="card-header">
                <span>摄像头</span>
              </div>
            </template>

            <div class="text item">
              <Video></Video>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
          <el-card class="el-card-define" style="margin-left: 0px">
            <template #header>
              <div class="card-header">
                <span>操作记录</span>
              </div>
            </template>

            <div class="text item">
              <Operate></Operate>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>

</template>

<script>
import Video from "~/pages/Video.vue";
import Lamplight from "~/pages/Lamplight.vue";
import Device from "~/pages/Device.vue";
import Operate from "~/pages/Operate.vue";

export default {
  name: "index",
  components: {Video, Lamplight, Device, Operate}
}
</script>

<style scoped>
.main {
  border: 1px solid bisque;
  margin: 20px 20px 20px 20px;
  height: 96%;
  width: 96%;
  background-color: #FAFAFA;
  position: fixed;
}

.el-row {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
}

.el-row .el-card {
  min-width: 85%;
  width: 85%;
  height: 100%;
  margin-left: 100px;
  margin-right: 20px;
  transition: all .5s;
}

.el-card-define {
  padding: 5px;
}
</style>
<style>

</style>