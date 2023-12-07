<template>
  <div class="wrapper activities">
    <div class="activity-card-list" v-infinite-scroll="loadMore">
      <div class="top-title">
        <h4 class="latest">最新活动</h4>
        <div class="clearfix"></div>
      </div>
      <div class="activity-list">
        <ul class="activity">
          <li class="activity-item" v-for="(activity,index) in activities" :key="index">
            <div class="activity-inner">
              <!-- :href拼接参数示例 -->
              <a :href="'/gathering'+activity.id"></a>
              <div class="img">
                <a :href="'/activity/item/'+activity.id" target="_blank">
                  <img :src="activity.image" alt="" />
                </a>
              </div>
              <div class="text">
                <p class="title">{{activity.name}}</p>
                <div class="fl goin">
                  <p>时间：{{activity.enrolltime}}</p>
                  <p>城市：{{activity.city}}</p>
                </div>
                <div class="fr btn">
                  <span class="sui-btn btn-bao">立即报名</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import '~/assets/css/page-sj-activity-index.css'
import activityApi from '~/api/activity/activity-api'
export default {
  data() {
    return {
      pageNo: 1
    }
  },
  asyncData(){
    return activityApi.getPageableList(1,12,{state:0}).then(res => {
      //console.log(res.data.data.rows)
      return {activities:res.data.data.rows}
    })
  },
  methods: {
    loadMore(){
      console.log('触发了loadmore方法......')
      this.pageNo++
      console.log(this.pageNo)
      activityApi.getPageableList(this.pageNo,12,{state:0}).then(res => {
        this.activities = this.activities.concat(res.data.data.rows)
      })
    }
  }
};
</script>