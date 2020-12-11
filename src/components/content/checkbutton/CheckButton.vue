<template>
  <div class="checkbutton" :class="{check:isChecked}" >
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    checkclick(){
      this.product.checked= !this.product.checked
    }
  }
}
</script>
<style scoped>
.checkbutton{

border-radius: 50%;
border:2px solid #aaa;
}
.check{
  background-color: red;
  border-color: red;
}
</style>