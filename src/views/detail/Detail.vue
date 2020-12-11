<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll" :probe-type='3'>
     
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
     <DetailBottomBar @addcart="addtocart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import { debounce } from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'
  import {backTopMixin} from 'common/mixin'
  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll,
      DetailCommentInfo,
     GoodsList,
     DetailBottomBar,
     
    },
    mixins:[itemListenerMixin],
    mixins:[backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        //console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo=data.rate.list[0]
        }
        
      })
      getRecommend().then(res=>{
        // console.log(res);
        this.recommend=res.data.list
      })
      this.getThemeTopY = debounce(res=>{
      this.$refs.scroll.refresh()

      
      },100)
    },
    mounted(){}, 
    methods: {
      imageLoad() {
          this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
       //console.log(position);
        const positoinY = -position.y       
        let length = this.themeTopYs.length 
        for(let i = 0; i < length-1;i++){
            if(this.currentIndex !== i && (positoinY >= this.themeTopYs[i] 
            && positoinY <this.themeTopYs[i+1])){
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
              
        } 
      }
       this.isShowBackTop = (-position.y) > 1000     
    },
    addtocart(){
      const product ={}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      product.iid = this.iid; 
      this.$store.dispatch('addCart',product)
    }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
 
    background-color: #fff;

  }
</style>
