<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(aa,index) in imglist" :key="index">
        <img :src="aa.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
    
        <div class="item" v-for="(aaa,index) in gd" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{aaa.name}}</span>
            </div>
            <img :src="aaa.picUrl" alt="" />
            <span @click="playlist(aaa.id)"  class="iconfont icon-play"></span>
          </div>
          <p class="name">{{aaa.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        
        <div class="item" v-for="(zx,index) in xxx" :key="index">
          <div class="img-wrap">
            <img :src="zx.picUrl" alt="" />
            <span @click="paly(zx.id,zx.name)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{zx.name}}</div>
            <div class="singer">{{zx.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(mv,index) in mcmv" :key="index">
          <div class="img-wrap">
            <img :src="mv.picUrl" alt="" />
            <span @click="toMv(mv.id)" class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{mv.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{mv.name}}</div>
            <div class="singer">{{mv.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"home",data(){
        return{
            imglist:[],
            gd:[],
            xxx:[],
            mcmv:[]
        }
    },
    methods:{
      playlist(id){
         this.$router.push(`/playlist?id=${id}`);
    },
      toMv(id) {
     
      this.$router.push(`/mv?id=${id}`);
    },
        paly(id,name){
           axios({
            url:'https://autumnfish.cn/song/url',
            method: 'get',
            params:{
                id
            }

        }).then(rr=>{
            
       let aaaa= this.$parent.$parent.$parent.$parent
            let uuu=rr.data.data[0].url;
           aaaa.musicUrl=uuu;
            aaaa.musicname=name;
           
        }) 
        }
    },created(){
        axios({
            url:'https://autumnfish.cn/banner',
            method: 'get',

        }).then(rr=>{
            this.imglist=rr.data.banners;
        })
         
        axios({
            url:'https://autumnfish.cn/personalized',
            method: 'get',
            params:{
                limit:10
            }

        }).then(rrr=>{
            this.gd=rrr.data.result;
            //this.imglist=rr.data.banners;
        })

        axios({
            url:'https://autumnfish.cn/personalized/newsong',
            method: 'get',

        }).then(rrr=>{
            this.xxx=rrr.data.result;
            //this.gd=rrr.data.result;
            //this.imglist=rr.data.banners;
        })

        axios({
            url:'https://autumnfish.cn/personalized/mv',
            method: 'get',

        }).then(rrr=>{
            this.mcmv=rrr.data.result;
            //this.gd=rrr.data.result;
            //this.imglist=rr.data.banners;
        })
    }

}
</script>

<style>

</style>