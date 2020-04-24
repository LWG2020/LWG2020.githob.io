<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="list.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{list.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="list.creator.avatarUrl" alt="" />
          <span class="name">{{list.creator.nickname}}</span>
          <span class="time">2020-2-26 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(tt,index) in list.tags" :key="index">{{tt}}</li>
        
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">
           {{list.description}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(dq,index) in list.tracks" :key="index">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="dq.al.picUrl" alt="" />
                  <span @click="paly(dq.id)" class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{dq.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{dq.ar[0].name}}</td>
              <td>{{dq.al.name}}</td>
              <td>{{dq.dt}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      list:{}
    };
  },
  methods: {
    paly(id){
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
           
        }) 
    }
  },
  created(){
      
      axios({
          url:"https://autumnfish.cn/playlist/detail",
          method:'get',
          params:{
              id:this.$route.query.id
          }
      }).then(rr=>{
          this.list=rr.data.playlist;
           for (let index = 0; index <this.list.tracks.length; index++) {
                let sj= this.list.tracks[index].dt;
              
                let mm= parseInt(sj/1000/60);
                if(mm<10){
                  mm='0'+mm;
                };
                let ms=parseInt((sj/1000)%60);
                if(ms<10){
                  ms='0'+ms;
                };
                  this.list.tracks[index].dt=mm+':'+ms;
              
                }
      })
  }
}
</script>
<style scoped>

</style>