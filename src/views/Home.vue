<template>
  <div class="home">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main"></div>
    <input type="file" name="file" id="file" @change="handleFileChange" />
    <button @click="handleUpload">Upload</button>
  </div>
</template>
<style lang="stylus" scoped>
#main
  width 100%
  height 400px
</style>
<script>
// @ is an alias to /src
import echarts from "echarts";
import { aaa, aaa2 } from "@/api/upload";
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      fileName: ""
    };
  },
  methods: {
    // 改变 input-file 文件
    handleFileChange(e) {
      const [file] = e.target.files;
      // 如果没有文件内容 则返回
      if (!file) return;
      this.fileName = file.name;
      // console.log("input文件信息", file);
      this.slice(file);
    },
    // 点击上传
    handleUpload() {
      aaa2(this.fileName).then(() => {
        // console.log(result);
      });
    },
    /**
     * 切片文件,并且上传切片
     * @param file 文件对象
     * @param size 单个文件切分大小 (默认1m)
     */
    slice(file, piece = 1024 * 1024 * 1) {
      let start = 0; // 每次上传的开始字节
      let end = start + piece; // 每次上传的结尾字节
      const TOTAL = Math.ceil(file.size / piece); // 切片总数
      let chunks = []; // 切片集合
      while (start < file.size) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        let blob = file.slice(start, end);
        chunks.push(blob);
        start = end;
        end = start + piece;
      }
      chunks.forEach((element, index) => {
        let fd = new FormData();
        fd.append("files", element);
        fd.append("name", file.name);
        fd.append("total", TOTAL);
        fd.append("cur", index);
        // console.log(fd.get("files"));
        aaa(fd).then(() => {
          // console.log(result);
        });
      });
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 定义窗口大小变更通知事件
    window.onresize = () => {
      myChart.resize();
    };
  }
};
</script>
