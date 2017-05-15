<template>
  <div class="hello">
    hello
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  methods:{
    // showAni(i){
    //   Velocity(i.target,{
    //     opacity:0
    //   })
    // }
     handleChange (val) {
      this.bottomNav = val
    }
  },
  mounted(){
    // console.log($('.aaa'))
    // $('.aaa').velocity('transition.slideLeftBigIn',{
    //   stagger: 300
    // })
    // Velocity(document.getElementsByClassName('bbb'),'transition.slideLeftBigIn',{
    //   stagger: 500
    // })
    // Velocity(document.getElementsByClassName('aaa'),'transition.slideRightBigIn',{
    //   stagger: 500
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
