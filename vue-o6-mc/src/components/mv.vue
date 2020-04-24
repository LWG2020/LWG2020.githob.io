<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="rrmv.url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvxx.cover" alt="" />
          </div>
          <span class="name">{{mvxx.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvxx.name}}</h2>
          <span class="date">发布：{{mvxx.publishTime}}</span>
          <span class="number">播放：{{mvxx.playCount}}次</span>
          <p class="desc">
           {{mvxx.desc}}
          </p>
        </div>
      </div>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(mv,index) in xgmv" :key="index">
            <div class="img-wrap">
              <img :src="mv.cover" alt="" />
              <span @click="toMv(mv.id)" class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{mv.playCount}}</div>
              </div>
              <span class="time">{{mv.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{mv.name}}</div>
              <div class="singer">{{mv.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"mv",
  data() {
    return {
      rrmv:{},
      mvxx:{},
      xgmv:[]

    };
  },
  methods: {
     toMv(id) {
     
      this.$router.push(`/mv?id=${id}`);
    },
    mvvv(){
        axios({
      url:"https://autumnfish.cn/mv/url",
      method: 'get',
      params:{
        id:this.$route.query.id
      }

    }).then(rr=>{
      this.rrmv=rr.data.data;
     
    })

    axios({
      url:"https://autumnfish.cn/mv/detail",
      method: 'post',
      params:{
        mvid:this.$route.query.id
      }

    }).then(rr=>{
      this.mvxx=rr.data.data;
     
    })

    axios({
      url:"https://autumnfish.cn/simi/mv",
      method: 'get',
      params:{
        mvid:this.$route.query.id
      }

    }).then(rr=>{
      this.xgmv=rr.data.mvs;
      for (let index = 0; index < this.xgmv.length; index++) {
                let sj= this.xgmv[index].duration;
              
                let mm= parseInt(sj/1000/60);
                if(mm<10){
                  mm='0'+mm;
                };
                let ms=parseInt((sj/1000)%60);
                if(ms<10){
                  ms='0'+ms;
                };
                  this.xgmv[index].duration=mm+':'+ms;
              
                }
    })

    axios({
      url:"https://autumnfish.cn/comment/mv",
      method: 'get',
      params:{
        id:this.$route.query.id
      }

    }).then(rr=>{
      console.log(rr.data)
      //this.rrmv=rr.data.data;
     
    })
    }
  },
  watch:{
    $route(){
        this.mvvv()
      },
  },
  created(){
    this.mvvv()
  }

}
</script>

<style>

</style>