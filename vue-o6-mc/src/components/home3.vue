<template>
  <div>
      <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card" >
      <div class="icon-wrap">
        <img :src="top.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
         {{top.name}}
        </div>
        <div class="info">
          {{top.description}}
        </div>
      </div>
      <img :src="top.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span @click="cat='全部'" :class="{active:cat=='全部'}" class="item">全部</span>
        <span @click="cat='欧美'" :class="{active:cat=='欧美'}" class="item">欧美</span>
        <span @click="cat='华语'" :class="{active:cat=='华语'}"  class="item">华语</span>
        <span @click="cat='流行'" :class="{active:cat=='流行'}" class="item">流行</span>
        <span @click="cat='说唱'" :class="{active:cat=='说唱'}" class="item">说唱</span>
        <span @click="cat='摇滚'" :class="{active:cat=='摇滚'}" class="item">摇滚</span>
        <span @click="cat='民谣'" :class="{active:cat=='民谣'}" class="item">民谣</span>
        <span @click="cat='电子'" :class="{active:cat=='电子'}" class="item">电子</span>
        <span @click="cat='轻音乐'" :class="{active:cat=='轻音乐'}" class="item">轻音乐</span>
        <span @click="cat='影视原声'" :class="{active:cat=='影视原声'}" class="item">影视原声</span>
        <span @click="cat='ACG'" :class="{active:cat=='ACG'}" class="item">ACG</span>
        <span @click="cat='怀旧'" :class="{active:cat=='怀旧'}" class="item">怀旧</span>
        <span @click="cat='治愈'" :class="{active:cat=='治愈'}" class="item">治愈</span>
        <span @click="cat='旅行'" :class="{active:cat=='旅行'}" class="item">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(itme,index) in playlists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{itme.playCount}}</span>
              </div>
              <img :src="itme.coverImgUrl" alt="" />
              <span @click="playlist(itme.id)"  class="iconfont icon-play"></span>
            </div>
            <p class="name">{{itme.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="page"
      background
      layout=" prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"home3",
    data() {
    return {
      // 总条数
      total:10,
      // 页码
      page:1,
      playlists:[],
      cat:'全部',
      top:{},
      currentPage1: 1,
    };
  },
  methods: {
    playlist(id){
         this.$router.push(`/playlist?id=${id}`);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.flei(val);

        console.log(`当前页: ${val}`);
      },
    flei(value){
     
      
      axios({
      url:'https://autumnfish.cn/top/playlist',
      method: 'get',
       params:{
         offset:(value-1)*20,
        limit:20,
        cat:this.cat
      }
    }).then(rr=>{
      this.playlists=rr.data.playlists;
      this.total=rr.data.total%20==0?rr.data.total/20:(rr.data.total/20);
        console.log(rr.data.playlists)
    })
    },
    topp(){
      axios({
      url:'https://autumnfish.cn/top/playlist/highquality',
      method: 'get',
       params:{
        limit:1,
        cat:this.cat
      }
    }).then(rr=>{
      this.top=rr.data.playlists[0];
       
    })

    }
  },
  watch:{
    cat(){
      this.flei(1);
      this.topp();
     
    }
  },
  created(){
    this.flei(1);
      this.topp();
  }

}
</script>

<style>

</style>