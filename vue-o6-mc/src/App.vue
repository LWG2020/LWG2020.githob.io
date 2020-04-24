<template>
  <div id="app">
  <el-container style="height: 735px; border: 1px solid #eee">
    <el-header style="text-align: center; font-size: 12px">
       <el-input size="mini" style="width: 200px;" placeholder="请输入内容" auto-complete='no'  v-model="input" @change="topinput"></el-input>
      
    </el-header>
 
     <el-container>
    
    <el-aside width="200px" >
  <el-menu :default-openeds="['1', '4']">
    
        <el-menu-item-group>
          <router-link to='/home'><el-menu-item index="1-1">发现音乐</el-menu-item></router-link>
          <router-link to='/home2'><el-menu-item index="1-2">最新音乐</el-menu-item></router-link>
          <router-link to='/home3'><el-menu-item index="1-3">推荐歌单</el-menu-item></router-link>
          <router-link to='/home4'><el-menu-item index="1-4">最新MV</el-menu-item></router-link>
        </el-menu-item-group>
    </el-menu>
   
  </el-aside>
   <el-main class='main'>
     <router-view></router-view>
    </el-main>
     
  </el-container>
   <el-footer class="player">
     
      <audio :src='musicUrl'   style="width:100%;background-color:#B3C0D1;" autoplay controls >{{musicname}}</audio>
    </el-footer>
</el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    musicUrl:'1111111111',
    musicname:'aaaaaaaa',
      input: ''
     
    }
  },
   methods: {
     topinput:function(){
       if(this.input==''){
         alert("请输入内容");
       }else{
         this.$router.push(`/topinput?input=${this.input}`);
       }
     },
     aaaaa:function(){
       alert("12332")
     }
      
    }
}
</script>

<style>


 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-footer {
   background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
