<template>
  <div class="bottom-bar">
    <div class="check">
    <check-button class="check-button" :is-checked="selectall"
    @click.native="checkclick"/>
    <span >全选</span> </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">去结算：{{checklength}}</div>
    </div>
 
</template>
<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
export default {
  name:'CartBottomBar', 
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return '￥'+ this.$store.state.cartlist.filter(item=>item.checked)
      .reduce((preValue,item) => {
        return preValue + item.realPrice * item.count},0).toFixed(2)
    },
    checklength(){
      return this.$store.state.cartlist.filter(item=>item.checked).length
    },
   selectall(){
    //  return !(this .$store.state.cartlist.filter(item=>!item.checked).length)
    if(this.$store.state.cartlist.length)
       return !this.$store.state.cartlist.find(item=>!item.checked)
    
    // for(let item of this.$store.state.cartlist){
    //  if(!item.checked) {
    //    return false
    //  }else{
    //    return true
    //  }
    // }
   }
  
  },
  methods:{
    checkclick(){
      if(this.selectall){
        return this.$store.state.cartlist.forEach(item=>item.checked = false)
      }else{
        return this.$store.state.cartlist.forEach(item=>item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar{
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
   background-color: #eee;
}

.check{
   display: flex;
  align-items: center;
   margin-left: 10px;
   width: 70px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
  .calculate{
    background-color: red;
    margin-left: 30px;
    color: #fff;
    width: 90px;
    text-align: center;
  }
</style>