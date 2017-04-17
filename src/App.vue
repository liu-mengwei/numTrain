<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <span class="title">数字记忆训练</span>
        <span class="fa fa-gamepad"></span>
        <div class="tab-item">
          <router-link to="progress">进步曲线</router-link>
        </div>
        <div class="tab-item">
          <router-link to="read">读数</router-link>
        </div>
        <div class="tab-item">
          <router-link to="associate">联结</router-link>
        </div>
        <div class="tab-item">
          <router-link to="trainMain">标准</router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "./common/stylus/base.css";
  @import "./common/font-awesome-4.7.0/css/font-awesome.min.css"

  #app
    .header
      width: 100%
      background-color: #20A0FF
      .container
        padding: 0 300px
        .title
          line-height: 90px
          color: white
          font-size 20px
          font-weight: 800
        .fa
          line-height: 90px
          color: white
          font-size 25px
        .tab-item
          float: right
          text-align: center
          font-size: 20px
          line-height: 90px
          padding: 0 20px
          cursor: pointer
          position: relative
          &.active
            border-bottom: 2px solid white
          a
            opacity: 0.5
            color: white
            text-decoration: none
          a:hover
            opacity: 1
          .router-link-active
            color: white
            font-weight: 800
            opacity: 1
            height: 100%
            &:before
              content: "";
              display: block;
              position: absolute;
              bottom: -1px;
              left: 0;
              width: 100%;
              height: 4px;
              background: #99d2fc;


</style>
