<template>
  <div>
    <div class="trainMain-wrapper">
      <div class="option" v-show="showOption">
        <el-row class="row">
          <el-col :span="8" class="label">
            <label class="text">数字总数</label>
          </el-col>
          <el-col :span="16">
            <el-input v-model="option.totalNum" placeholder="请输入数字总数"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="label">
            <label class="text">间隔时间</label>
          </el-col>
          <el-col :span="16">
            <el-input v-model="option.showTime" placeholder="请输入出现数字的间隔时间"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="label">
            <label class="text">出现对数</label>
          </el-col>
          <el-col :span="16">
            <el-radio-group v-model="option.group" class="radioGroup">
              <el-radio :label="1" class="radio"></el-radio>
              <el-radio :label="2" class="radio"></el-radio>
              <el-radio :label="3" class="radio"></el-radio>
              <el-radio :label="4" class="radio"></el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="24">
            <el-button type="primary" size="large" class="startTrain" @click="start">开始训练</el-button>
          </el-col>
        </el-row>
      </div>
      <!--暂停，下一个按钮-->
    </div>
    <div class="number-wrapper">
        <span class="number" v-show="!isLastNum && afterStart">{{showNum}}
        </span>
        <span class="icon-check_circle finish" v-show="isLastNum && !verifyed">
        </span>
      <i class="el-icon-check right" v-show="verifyed && right"></i>
      <i class="el-icon-close false" v-show="verifyed && !right"></i>
      <el-row class="row btnOption" v-show="showBtn">
          <el-button type="primary" size="large" class="pause" @click="pause" @keydown.space="pause"><i class="fa fa-pause"></i></el-button>
          <el-button type="primary" size="large" class="next" @click="next" @keydown.enter="next"><i class="fa fa-play"></i></el-button>
      </el-row>
      <el-progress :percentage="percentage" v-show="afterStart && !isLastNum" class="progressBar"></el-progress>
    </div>
    <div class="verify-area" v-show="isLastNum">
      <el-input type="textarea" :rows="4" placeholder="回顾" v-model="pastNum" class="pastNum"></el-input>
      <el-input type="textarea" :rows="4" placeholder="验证" v-model="myNum" class="myNum"></el-input>
      <span class="remainNum">{{option.totalNum-myNum.length}}</span>
    </div>
    <div class="verify-btn" v-show="isLastNum">
      <el-button type="primary" size="large" class="review" @click="review"><i class="fa fa-reply"></i></el-button>
      <el-button type="primary" size="large" class="reset" @click="reset"><i class="fa fa-repeat"></i></el-button>
      <el-button type="primary" size="large" class="verify" @click="verify"><i class="fa fa-play"></i></el-button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default{
    data: function () {
      return {
        showOption: true,
        showBtn: false,
        isLastNum: false,
        afterStart: false,
        percentage: 0, //完成百分比

        option: {
          totalNum: 0,
          showTime: 0,
          group: 1
        },
        showNum: '0',
        showNumTaskId: 0,
        position: 0, //当前数字所停留的位置
        showNumArr: [],
        paused: false, //暂停按钮状态

        pastNum: '',
        myNum: '',
        reviewed: false,
        verifyed: false,
        right: false //测试结果
      };
    },

    methods: {
      start: function () {
        debugger;
        this.option.showTime *= 1000;
        this.showOption = false;
        this.showBtn = true;
        this.afterStart = true;

        //根据选项生成数字
        this.showNumArr = this.createNum();
        this.showNum = this.showNumArr[this.position++];
        this.percentage = Math.floor((this.position / this.showNumArr.length) * 100);

        this.showNumTaskId = window.setInterval(this.showNumTask, this.option.showTime);
      },

      next: function () {
        this.showNum = this.showNumArr[this.position];
        window.clearInterval(this.showNumTaskId);
        if (++this.position > this.showNumArr.length) {
          //按钮消失
          this.showBtn = false;
          this.isLastNum = true;
        }
        this.percentage = Math.floor((this.position / this.showNumArr.length) * 100);
      },

      pause: function () {
        //已处于暂停状态
        if (this.paused === true) {
          //开启定时
          this.showNum = this.showNumArr[this.position++];
          this.percentage = Math.floor((this.position / this.showNumArr.length) * 100);
          this.showNumTaskId = window.setInterval(this.showNumTask, this.option.showTime);
          this.paused = false;
        }
        else {
          window.clearInterval(this.showNumTaskId);
          this.paused = true;
        }
      },

      showNumTask: function () {
        this.showNum = this.showNumArr[this.position];

        if (++this.position > this.showNumArr.length) {
          window.clearInterval(this.showNumTaskId);
          //按钮消失
          this.showBtn = false;
          this.isLastNum = true;
        }
        this.percentage = Math.floor((this.position / this.showNumArr.length) * 100);
      },

      createNum: function () {
        debugger;
        var num = '';
        var showNumArr = [];

        var totalNum = this.option.totalNum;
        var count = this.option.group * 2;

        for (var i = 0; i < totalNum; i++) {
          num += Math.floor(Math.random() * 10) + '';
        }

        for (var j = 0; j < Math.floor(totalNum / count); j++) {
          showNumArr.push(num.substring(count * j, count * j + count));
        }
        //截取剩余的字符串
        if (totalNum % count !== 0) {
          showNumArr.push(num.substring(count * Math.floor(totalNum / count)));
        }
        return showNumArr;
      },

      review: function () {
        if (this.reviewed === false) {
          this.reviewed = true;
          this.pastNum = this.showNumArr.join('');
        }
        else {
          this.reviewed = false;
          this.pastNum = '';
        }
      },

      verify: function () {
        this.verifyed = true;
        if (this.myNum === this.showNumArr.join('')) {
          this.right = true;
        }
        else {
          this.right = false;
        }
      },

      reset: function () {
        this.showOption = true;
        this.showBtn = false;
        this.isLastNum = false;
        this.afterStart = false;
        this.percentage = 0;
        this.option.totalNum = 0;
        this.option.showTime = 0;
        this.option.group = 1;
        this.showNum = '0';
        this.showNumTaskId = 0;
        this.position = 0;
        this.showNumArr = [];
        this.paused = false;
        this.pastNum = '';
        this.myNum = '';
        this.reviewed = false;
        this.verifyed = false;
        this.right = false;
      }
    }
  };
</script>


<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/style.css"
  @import "../../common/font-awesome-4.7.0/css/font-awesome.css"

  .trainMain-wrapper
    padding-top: 70px
    padding: 70px 600px 0 600px
    .option
      text-align: center
      padding-right: 75px
      .row
        margin-bottom: 30px
        .label
          text-align: right
          .text
            line-height: 36px
            font-size: 15px
            font-weight: 600
            margin-right: 10px
      .radioGroup
        line-height: 35px
        .radio
          margin: 0 21px
      .startTrain
        position: relative
        width: 363px
        height: 50px
        left: 39px

  .number-wrapper
    padding: 0 300px
    text-align: center
    margin-bottom: 50px
    .number
      font-size: 300px
      font-weight: 800
    .finish
      color: #00c850
      font-size: 150px
    .right
      color: #00c850
      font-size: 150px
    .false
      color: red
      font-size: 150px
    .btnOption
      .pause
        width: 10%
      .next
        width: 10%
    .progressBar
      margin-top: 50px
      margin-left: 40px

  .verify-area
    position: relative
    text-align: center
    .pastNum, .myNum
      width: 30%
      display: inline-block
    .pastNum
      margin-right: 20px
    .myNum
      margin-left: 20px
    .remainNum
      position: absolute
      bottom: 0
      font-size: 20px
      color: gray
      opacity: 0.5
    textarea
      font-size: 20px

  .verify-btn
    margin-top: 20px
    text-align: center
    .review, .verify
      width: 5%
    .reset
      width: 5%
      margin: 0 5px
</style>
