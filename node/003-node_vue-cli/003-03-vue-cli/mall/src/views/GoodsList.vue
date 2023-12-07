<template>
<div>
    <NavHeader></NavHeader>
    <NavBread><span>Goods</span></NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd v-for="(item,index) in priceFilter" :key="index" >
                  <a href="javascript:void(0)" :class="{cur:selected}" >{{item.startPrice}}-{{item.endPrice}}</a>
              </dd>
              <!-- <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd> -->
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(goods,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'/static/'+goods.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">{{goods.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavFooter></NavFooter>
</div>
</template>>
<script>
  import '../assets/css/base.css'
  import '../assets/css/login.css'
  import '../assets/css/product.css'
  import '../assets/css/checkout.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default {
    data() {
      return {
        goodsList: [],
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00',
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00',
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00',
          }
        ],
        selected: false
      }
    },
    components: {
      NavHeader:NavHeader,
      NavFooter:NavFooter,
      NavBread:NavBread
    },
    mounted :function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList: function(){
        axios.get('/goods')
          .then(response => {
            this.goodsList = response.data.result
          })
          .catch(error => {
            console.log(error)
          })
      },
      addSelectClass: function(){
        this.selected = true
      }
    }
  }
</script>>