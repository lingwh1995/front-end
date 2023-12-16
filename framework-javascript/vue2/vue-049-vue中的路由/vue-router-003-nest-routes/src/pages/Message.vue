<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <a href="#">{{message.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return {
      messages:[
        {id:'001',title:'message001'},
        {id:'002',title:'message002'},
        {id:'003',title:'message003'}
      ]
    }
  }
}
</script>

<style>

</style>