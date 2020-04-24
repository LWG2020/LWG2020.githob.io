<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{input}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(dq,index) in sss" :key="index" @click="play(dq.id)">
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{dq.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{dq.artists[0].name}}</td>
              <td>{{dq.album.name}}</td>
              <td>{{dq.duration}}</td>
            </tr>
            

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
       <div class="items">
          <div class="item" v-for="(dd,index) in ddd" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{dd.playCount}}</span>
              </div>
              <img :src="dd.coverImgUrl" alt="" />
              <span @click="playlist(dd.id)"  class="iconfont icon-play"></span>
            </div>
            <p class="name">{{dd.name}}</p>
          </div>
          
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV"  name="1004">
        <div class="items mv">
          <div class="item" v-for="(mm,index) in mmm" :key="index">
            <div class="img-wrap">
              <img :src="mm.cover" alt="" />
              <span @click="toMv(mm.id)" class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div  class="iconfont icon-play"></div>
                <div class="num">{{mm.playCount}}</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{mm.name}}</div>
              <div class="singer">{{mm.artistName}}</div>
            </div>
          </div>
          
        </div>
      </el-tab-pane>
        <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="1"
        :limit="limit"
      >
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"topinput",
    data(){
      return{
        input:'',
         activeIndex: "1",
         sss:[],
         count:0,
         type:1,
         ddd:[],
         mmm:[],
         // 总条数
      total: 1,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      lim:20
      }
    },
    methods:{
      playlist(id){
         this.$router.push(`/playlist?id=${id}`);
    },
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
      toMv(id) {
     
      this.$router.push(`/mv?id=${id}`);
    },
      handleCurrentChange(val) {
        this.ss(val)
     
      console.log(`当前页: ${val}`);
    },
      ss(off){
       this.activeIndex
         axios({
        url:"https://autumnfish.cn/search",
        method:"get",
        params:{
            keywords:this.$route.query.input,
            type:parseInt(this.activeIndex),
            limit:this.lim,
            offset:(off-1)*this.lim
        }
      }).then(rr=>{
        if(this.activeIndex=='1'){
             this.sss=rr.data.result.songs;
              this.count=rr.data.result.songCount;
              this.total=rr.data.result.songCount/20;
              for (let index = 0; index <this.sss.length; index++) {
                let sj= this.sss[index].duration;
              
                let mm= parseInt(sj/1000/60);
                if(mm<10){
                  mm='0'+mm;
                };
                let ms=parseInt((sj/1000)%60);
                if(ms<10){
                  ms='0'+ms;
                };
                  this.sss[index].duration=mm+':'+ms;
              
                }
                console.log(rr.data)
        }else if(this.activeIndex=='1000'){
          this.ddd=rr.data.result.playlists;
          this.count=rr.data.result.playlistCount;
         this.total=rr.data.result.playlistCount/10;
          console.log(rr.data)
        }else if(this.activeIndex=='1004'){
          this.mmm=rr.data.result.mvs;
          this.count=rr.data.result.mvCount;
          this.total=rr.data.result.mvCount/8
          console.log(rr.data)
        }
       
                
                
      })
      }
    },
    watch:{
      $route(){
        //跳转到该页面后需要进行的操作
         console.log(this.$route)
      this.input=this.$route.query.input;
      this.ss(1)
      },
      activeIndex(){

        if(this.activeIndex=='1'){
          this.lim=20;
        }else if(this.activeIndex=='1000'){
          this.lim=10;
        }else if(this.activeIndex=='1004'){
          this.lim=8;
        }
        this.total=1
        
      this.ss(1)
        
        
      }
    },
    created(){
       this.input=this.$route.query.input;
     
        this.ss(1)
    }
     
    

}
</script>

<style>

</style>