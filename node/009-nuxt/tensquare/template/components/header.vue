<template>
  <header>
    <div class="wrapper sui-container">
      <div class="sui-navbar">
        <div class="navbar-inner">
          <a href="/headline" class="sui-brand">
            <img src="~/assets/img/asset-logo-black.png" alt="十次方" />
          </a>
          <ul class="sui-nav">
            <!-- 传统html形式导航条 -->
            <!-- 
            <li class="active">
              <a href="/headline">首页</a>
            </li>
            <li>
              <a href="/headline">头条</a>
            </li>
            <li>
              <a href="/qa">问答</a>
            </li>
            <li>
              <a href="/activity">活动</a>
            </li>
            <li>
              <a href="/makeFriends">交友</a>
            </li>
            <li>
              <a href="/spit">吐槽</a>
            </li>
            <li>
              <a href="/recruit">招聘</a>
            </li>
            -->
             <!-- 
                 router-link形式导航条
                    1.可以很方便的处理激活样式需求,添加active-class="active"属性即可(active为样式名称)
                    2.exact属性表示只有访问地址为/的时候才激活该样式
              -->
            <router-link tag="li" to="/" active-class="active" exact><a>首页</a></router-link>
            <!-- <router-link tag="li" to="/headline" active-class="active" ><a>头条</a></router-link> -->
            <router-link tag="li" to="/qa" active-class="active" ><a>问答</a></router-link>
            <router-link tag="li" to="/activity" active-class="active" ><a>活动</a></router-link>
            <router-link tag="li" to="/makeFriends" active-class="active" ><a>交友</a></router-link>
            <router-link tag="li" to="/spit" active-class="active" ><a>吐槽</a></router-link>
            <router-link tag="li" to="/recruit" active-class="active" ><a>招聘</a></router-link>
          </ul>
          <form class="sui-form sui-form pull-left">
            <input type="text" placeholder="输入关键词..." />
            <span class="btn-search fa fa-search"></span>
          </form>
          <div class="sui-nav pull-right info">
            <li>
              <a href="~/assets/person-loginsign.html" target="_blank">注册</a>
            </li>
            <li>
              <a href="~/assets/person-loginsign.html" target="_blank" class="sui-btn btn-login">登录</a>
            </li>
            <li>
              <router-link to="/manage">
                  <img src="~/assets/img/widget-photo.png" alt="用户头像" />
              </router-link>  
            </li>  
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import '~/assets/css/page-sj-person-homepage.css'
export default {};
</script>>