<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        height="250"
        :row-class-name="tableRowClassName">
      <el-table-column
          prop="time"
          label="日期"
      >
      </el-table-column>
      <el-table-column
          prop="ops"
          label="操作记录"
      >
      </el-table-column>

    </el-table>
    <el-row>
      <el-col>
        <el-pagination
            @current-change="current_page_changes"
            @prev-click="prev_click"
            @next-click="next_click"
            :hide-on-single-page="pag_hide"
            :total="total"
            layout="prev, pager, next">
        </el-pagination>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import {io} from "socket.io-client";

export default {
  name: "Operate",
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getTableData() {
      // 初始化请求数据
      let obj = {"user_id": "6434d7dc1601d52a799e6169", "current_page": this.current_page, "page_size": this.page_size}
      this.socket.emit('get_history_ops', obj);
      this.socket.on("get_history_ops_end", (data) => {
        data = eval('(' + data + ')');
        console.log("table row");
        console.log(data)
        this.tableData = data.result
        this.total = data.len
        console.log(this.total)
      }, (error) => {
        console.log(error)
      })
    },
    current_page_changes(val) {
      console.log(val)
      this.current_page = val
      this.getTableData()
    },
    prev_click(val){
      console.log(val)
      this.current_page = val
      this.getTableData()
    },
    next_click(val){
      console.log(val)
      this.current_page = val
      this.getTableData()
    }
  },
  data() {
    return {
      pag_hide: false,
      current_page: 1,
      page_size: 4,
      total: 10,
      tableData: []
    }
  },
  mounted() {
    this.socket = io('http://192.168.230.177:5000');
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
    this.getTableData();

  }

}
</script>

<style scoped>

</style>