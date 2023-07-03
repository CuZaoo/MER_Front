<template>
  <el-dialog
      title="灯光颜色设置"
      :visible.sync="visible"
      width="30%"
      :append-to-body="true"
      center>
    <el-row v-for="(item,key,index) in emos" :key="key">
      <el-col :xs="8" :sm="6" :md="12" :lg="12" :xl="12" :offset="4">
        <el-checkbox v-model="item.flag" :label="key" border></el-checkbox>
      </el-col>
      <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6">
        <el-color-picker
            v-model="item.color"
            :predefine="predefineColors">
        </el-color-picker>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="saveLightColor">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "lightcolor",
  data() {
    return {
      emos: {
        "生气": {"flag": true, "color": "#ffffff"},
        "厌恶": {"flag": true, "color": "#ffffff"},
        "恐惧": {"flag": true, "color": "#ffffff"},
        "开心": {"flag": true, "color": "#ffffff"},
        "伤心": {"flag": true, "color": "#ffffff"},
        "惊讶": {"flag": true, "color": "#ffffff"},
        "自然": {"flag": true, "color": "#ffffff"},
      },
      visible: false,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
    };
  },
  methods: {
    setVisible(visible) {
      this.visible = visible
    },
    saveLightColor() {
      console.log("saveLightColor")
      this.visible = false
      this.$emit("toLightColor", this.emos)
      this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: '点击<strong>保存设置</strong>完成配置'
        });
    }
  }
}
</script>

<style scoped>

</style>