<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span @click="area='全部'" :class="{active:area=='全部'}" class="title ">全部</span>
          </li>
          <li class="tab">
            <span @click="area='内地'" :class="{active:area=='内地'}" class="title">内地</span>
          </li>
          <li class="tab">
            <span @click="area='港台'" :class="{active:area=='港台'}" class="title">港台</span>
          </li>
          <li class="tab">
            <span @click="area='欧美'" :class="{active:area=='欧美'}" class="title">欧美</span>
          </li>
          <li class="tab">
            <span @click="area='日本'" :class="{active:area=='日本'}" class="title">日本</span>
          </li>
          <li class="tab">
            <span @click="area='韩国'" :class="{active:area=='韩国'}" class="title">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span @click="type='全部'" :class="{active:type=='全部'}" class="title ">全部</span>
          </li>
          <li class="tab">
            <span @click="type='官方版'" :class="{active:type=='官方版'}" class="title">官方版</span>
          </li>
          <li class="tab">
            <span @click="type='原声'" :class="{active:type=='原声'}" class="title ">原声</span>
          </li>
          <li class="tab">
            <span @click="type='现场版'" :class="{active:type=='现场版'}" class="title">现场版</span>
          </li>
          <li class="tab">
            <span @click="type='网易出品'" :class="{active:type=='网易出品'}" class="title">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span @click="order='上升最快'" :class="{active:order=='上升最快'}" class="title ">上升最快</span>
          </li>
          <li class="tab">
            <span @click="order='最热'" :class="{active:order=='最热'}" class="title">最热</span>
          </li>
          <li class="tab">
            <span @click="order='最新'" :class="{active:order=='最新'}" class="title ">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" @click="toMv(mv.id)" v-for="(mv,index) in mvlists" :key="index">
          <div class="img-wrap">
            <img :src="mv.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{mv.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{mv.name}}</div>
            <div class="singer">{{mv.artistName}}</div>
          </div>
        </div>
       
      </div>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"home4",
  data() {
    return {
      // 总条数
      total: 1,
      // 页码
      page: 1,
      // 页容量
      limit: 1000000,
      mvlists:[],
      area:"全部",
      type:'全部',
      order:'最热'
    };
  },
  methods: {
    toMv(id) {
     
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      this.mvs(val,this.area,this.type,this.order,111);
      console.log(`当前页: ${val}`);
    },
    mvs(off,aa,tt,oo,bb){
        axios({
        url:"https://autumnfish.cn/mv/all",
        method:'get',
        params:{
          limit:8,
          area:aa,
          type:tt,
          order:oo,
          offset:(off-1)*8,

        }
    }).then(rr=>{
      this.mvlists=rr.data.data;
      if(bb!=111){
          this.total=rr.data.count/8;
      
      }
      

    })
    }
  },
  watch:{
    area(){
      this.mvs(this.page,this.area,this.type,this.order)
    },
     type(){
     this.mvs(this.page,this.area,this.type,this.order)
    },
     order(){
      this.mvs(this.page,this.area,this.type,this.order)
    }

  },
  created(){
    this.mvs(1,'全部','全部','最热')

  }

}
</script>

<style>

</style>