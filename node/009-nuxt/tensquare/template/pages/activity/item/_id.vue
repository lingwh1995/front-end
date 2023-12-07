<template>
  <div class="wrapper activities">
    <h1>{{activity.name}}}</h1>
    <div class="img-text">
      <div class="left-img">
        <img src="~/assets/img/widget-acti.png" alt />
      </div>
      <div class="right-txt">
        <p>开始时间： {{activity.starttime}}</p>
        <p>结束时间： {{activity.endtime}}</p>
        <p>举办地点： {{activity.city}}</p>
        <p>主办方：infoQ</p>
        <p>
          报名截止：
          <span class="big">85</span>天
          <span class="big">15</span>时
          <span class="big">16</span>分
          <span class="big">10</span>秒
        </p>
        <div class="join">
          <button class="sui-btn btn-danger">立即报名</button>
          <span class="will">报名即将开始</span>
        </div>
      </div>
    </div>
    <div class="simple-text">
      <div class="left-content">
        <div class="content-item">
          <div class="tit">
            <span>大会介绍</span>
          </div>
          <div class="text">
              <!-- vue渲染html -->
            <div v-html="activity.summary"/>
          </div>
        </div>
        <div class="content-item">
          <div class="tit">
              <!-- vue渲染html -->
            <span>议题简介</span>
          </div>
          <div class="text">
            <div v-html="activity.detail"/>
          </div>
        </div>
      </div>
      <div class="right-intro">
        <div class="content-item">
          <div class="tit">
            <span>活动组织者</span>
          </div>
          <div class="text">
            <p>主办方： infoQ</p>
          </div>
        </div>
        <div class="content-item">
          <div class="tit">
            <span>相关链接</span>
          </div>
          <div class="text">
            <p>活动官网： infoQ.com</p>
          </div>
        </div>
        <div class="content-item">
          <div class="tit">
            <span>分享扩散</span>
          </div>
          <div>
            <share :config="config"/>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '~/assets/css/page-sj-activity-detail.css'
import activityApi from '~/api/activity/activity-api'

export default {
    name: 'activity-detail',
    data() {
      return {
        config: {
            title:'i am share title!',
            sites:['qzone', 'qq', 'weibo','wechat', 'douban'],
            url:'http://vue-social-share.surge.sh/',
            description:'A Vue 2.x social share component!'
        }
      }
    },
    asyncData({params}){
        console.log(params)
        return activityApi.findActivityById(params.id).
            then(res => {
                console.log(res.data.data)
                return {activity:res.data.data}
            })
    }
}
</script>