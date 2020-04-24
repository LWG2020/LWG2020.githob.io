<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span @click="gqtype=0" :class="{active:gqtype==0}" class="item ">全部</span>
      <span @click="gqtype=7" :class="{active:gqtype==7}" class="item">华语</span>
      <span @click="gqtype=96" :class="{active:gqtype==96}" class="item">欧美</span>
      <span @click="gqtype=8" :class="{active:gqtype==8}" class="item">日本</span>
      <span @click="gqtype=16" :class="{active:gqtype==16}" class="item">韩国</span>
    </div>
    <!-- 底部的table -->
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
        <tr class="el-table__row" v-for="(zm,index) in mzlist" :key="index">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="zm.album.picUrl" alt="" />
              <span class="iconfont icon-play" @click="play(zm.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{zm.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{zm.artists[0].name}}</td>
          <td>{{zm.album.name}}</td>
          <td>{{zm.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"home2",
    data(){
        return{
          mzlist:[],
          gqtype:0
        }
    },
    methods:{
      play(id){
         axios({
            url:'https://autumnfish.cn/song/url',
            method: 'get',
            params:{
                id
            }

        }).then(rr=>{
          let uuu=rr.data.data[0].url;
            let pp=this.$parent.$parent.$parent.$parent;
            pp.musicUrl=uuu;
            })
      },
      gq(type1){
        axios({
                url: 'https://autumnfish.cn/top/song',
                method: 'get',
                params:{
                  type:type1,
                }
              }).then(rr=>{
                this.mzlist=rr.data.data;
                for (let index = 0; index < this.mzlist.length; index++) {
                let sj= this.mzlist[index].duration;
              
                let mm= parseInt(sj/1000/60);
                if(mm<10){
                  mm='0'+mm;
                };
                let ms=parseInt((sj/1000)%60);
                if(ms<10){
                  ms='0'+ms;
                };
                  this.mzlist[index].duration=mm+':'+ms;
              
                }
              
              
                
              })
      }
    },
    watch:{
      gqtype(){
        this.gq(this.gqtype)
      }
    },
    created(){
      this.gq(0)
    }

}
</script>

<style>

</style>