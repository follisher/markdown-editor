<template> 
  <li id="{{randomId}}" class="book-single">
    <div class="book-cover"><img :src="item.image" alt=""></div>
    <h4 class="book-title">{{item.title}}</h4>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      randomId: 'input-' + Math.random()
    }
  }
}
</script>
<style lang='scss'>
  .book-single{
    float:left;
    .book-cover{
      width:90px;
      img{
        width:90px;
      }
    }
  }
</style>