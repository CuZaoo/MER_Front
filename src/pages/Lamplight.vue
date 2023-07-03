<template>
  <div>
    <!--    灯光设置-->
    <el-row>
      <el-col>
        <span>
      灯光开关
      </span>
        <el-switch
            style="float: right; padding: 3px 0"
            :value="light_switch"
            active-color="#C0CCDA"
            inactive-color="#13ce66"
            @change="setLightSwitchVisible"
        >
        </el-switch>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>
      灯光颜色
      </span>
        <el-button style="float: right;" @click="setLightColorVisible">设置颜色</el-button>
        <lightcolor ref="LightColorVisible" @toLightColor="getLightColor"></lightcolor>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-row>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span>灯光亮度</span></el-col>
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <div>
              <el-slider
                  v-model="light_power"
                  :step="10"
                  :min="10"
                  :max="100"
                  @change="setSliderValueChanged"
                  show-stops>
              </el-slider>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12">
        <el-button @click="saveSetting" type="primary">保存设置</el-button>
        <el-button @click="setRestoreDefault" type="info">恢复默认设置</el-button>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import lightcolor from "~/pages/Lightcolor.vue";
import {io} from 'socket.io-client';

export default {
  name: "Lamplight",
  computed: {
    lightcolor() {
      return lightcolor
    }
  },
  components: {lightcolor},
  data() {
    return {
      light_switch: true,
      light_power: 100,
      light_color: {
        "生气": {"flag": false, "color": "#FFFFFF"},
        "厌恶": {"flag": false, "color": "#990cdf"},
        "恐惧": {"flag": false, "color": "#100cdf"},
        "开心": {"flag": false, "color": "#0cdf82"},
        "伤心": {"flag": false, "color": "#e3df96"},
        "惊讶": {"flag": false, "color": "#8bc8f9"},
        "自然": {"flag": true, "color": "#8bf9f9"},
      },
      socket: null,
    }
  },
  methods: {
    setLightColorVisible() {
      this.$refs.LightColorVisible.setVisible(true)
    },
    setLightSwitchVisible(val) {
      //   发送信号给硬件，控制灯光开关
      this.$confirm('确认更改状态？').then(_ => {
            this.light_switch = val
            console.log("灯光状态")
            console.log(val)
            localStorage.setItem('switch', JSON.stringify({switch:val}));
            let obj = {"light_switch": !val}
            this.socket_smp.emit('light', obj);
          }).catch(_ => {
            this.light_switch = !val
            return;
          });

    },
    getLightColor(value) {
      this.light_color = value
      console.log(this.light_color)
    },
    saveSetting() {
      // // // 发送到后端
        this.$confirm('确认保存？').then(_ => {
            console.log(this.light_color)
            let obj = {"user_id": "645077cd919c8a230e58db5c", "color": this.light_color, "power": this.light_power}
            console.log(obj)
            this.socket_smp.emit('save_light_color_power', obj);
            this.socket.emit('save_light_color_power', obj);
            this.socket.on("save_light_color_power_end", (data) => {
            data = eval('(' + data + ')');
            console.log(data)
            location.reload();
            }, (error) => {
            console.log(error)
            location.reload();
            })

            // this.socket.disconnect()
            //   发送到硬件
        }).catch(_ => {
        });

    },
    setRestoreDefault() {
      // // 发送到后端
      this.$confirm('确认恢复默认设置？').then(_ => {
            let obj = {"user_id": "645077cd919c8a230e58db5c"}
            console.log(obj)
            this.socket_smp.emit('restore_light_color_power', obj)
            this.socket.emit('restore_light_color_power', obj);
            this.socket.on("restore_light_color_power_end", (data) => {
            data = eval('(' + data + ')');
            location.reload();
            console.log(data)
            }, (error) => {
            console.log(error)
            location.reload();
            })
        }).catch(_ => {
        });



    },
    setSliderValueChanged(value) {
      this.socket_smp.emit('change_light_power', obj);
    },
    initialization() {
      console.log("initialization")
      if (this.socket.disconnected) {
        this.socket.connect()
      }
      console.log(this.socket.connected)
      this.socket.emit('initialize');
      this.socket.on("initialize_end", (data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      })
      // this.socket.disconnect();
    },
    GetInformation() {
      console.log("get_light_color_power")
      if (this.socket.disconnected) {
        console.log("disconnected")
        this.socket = io('http://192.168.230.177:5000');
        this.socket.open()
        console.log(this.socket.connected)
      }
      console.log(this.socket.connected)
      let obj = {"user_id": "645077cd919c8a230e58db5c"}
      this.socket.emit('get_light_color_power', obj);
      this.socket.on("get_light_color_power_end", (data) => {
        data = eval('(' + data + ')');
        console.log("颜色")
        console.log(data.result.color["恐惧"].color)
        let r = data.result.color["恐惧"].color
        let g = data.result.color["惊讶"].color
        //data.result.color["恐惧"].color = g
        //data.result.color["惊讶"].color = r
        console.log(data.result.color["恐惧"].color)
        this.$refs.LightColorVisible.emos = data.result.color
        this.light_power = data.result.power
      }, (error) => {
        console.log(error)
      })
      // this.socket.close();
    },
  },
  mounted() {
    this.socket = io('http://192.168.230.177:5000');
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
    this.socket_smp = io('http://192.168.230.80:5001');
    this.socket_smp.on('connect', () => {
      console.log('connected to server2');
    });
    var data1 = JSON.parse(localStorage.getItem('switch'));
    console.log("状态:")

    if (data1 !== null){
        this.light_switch = data1.switch
        console.log(data1)
        console.log(data1.switch)
    }

     //vue:
    this.GetInformation()
  },
  beforeDestroy() {
    // 关闭 Socket

    this.socket.close();
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>