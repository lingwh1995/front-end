<template>
    <div>
    <div class="myhome-personinfo" style="background-color:#AEDD81">
      <div class="wrapper">
        <div class="person-baseinfo">
          <!--头像信息-->
          <div class="photo">
            <img src="~/assets/img/widget-myphoto.jpg" alt class="person" />
            <div class="share">
              <span>
                <img src="~/assets/img/asset-QQ.png" alt width="34" height="28" />
              </span>
              <span>
                <img src="~/assets/img/asset-weixin.png" alt width="28" height="28" />
              </span>
              <span>
                <img src="~/assets/img/asset-weibo.png" alt width="28" height="28" />
              </span>
            </div>
          </div>
          <!--文字信息-->
          <div class="info">
            <h1>
              Web爱好者
              <span class="allinfo">
                <a href="~/assets/person-myfile.html" target="_blank">查看完整档案</a>
              </span>
            </h1>
            <ul class="fill">
              <li>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span class="edit-item">填写现居城市</span>
                <form action class="sui-form form-inline">
                  <input type="text" placeholder="现居城市" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
              <li>
                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                <span class="edit-item">填写毕业院校</span>
                <form action class="sui-form form-inline">
                  <input type="text" placeholder="院校名称" />
                  <input type="text" placeholder="所学专业" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
              <li>
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                <span class="edit-item">填写所在公司/组织</span>
                <form action class="sui-form form-inline">
                  <input type="text" placeholder="公司/组织名称" />
                  <input type="text" placeholder="职位头衔" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
              <li>
                <i class="fa fa-link" aria-hidden="true"></i>
                <span class="edit-item">填写个人网站</span>
                <form action class="sui-form form-inline">
                  <input type="text" placeholder="个人网站" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <!--右侧编辑-->
        <div class="edit-info">
          <h4>
            个人简介
            <span class="addedit">
              <img src="~/assets/img/widget-edit.png" width="12" height="12" />编辑
            </span>
          </h4>
          <div class="info-box">
            <div class="edit-intro">暂时没有个人简介</div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--两列布局-->
    <div class="wrapper myhome">
      <div class="left-list">
        <div class="myhome-list">
          <ul class="home-list">
            <router-link to="/manage" tag="li" active-class="active" exact><a>我的主页</a></router-link>
            <router-link to="/manage/myanswer" tag="li" active-class="active"><a>我的回答</a></router-link>
            <router-link to="/manage/myquestion" tag="li" active-class="active"><a>我的提问</a></router-link>
            <router-link to="/manage/myshare" tag="li" active-class="active"><a>我的分享</a></router-link>
          </ul>
          <ul class="home-list bottom">
            <router-link to="/manage/dynamic" tag="li" active-class="active"><a>个人动态</a></router-link>
            <router-link to="/manage/myfocus" tag="li" active-class="active"><a>我的关注</a></router-link>
            <router-link to="/manage/mycollect" tag="li" active-class="active"><a>我的收藏</a></router-link>
            <router-link to="/manage/myreaded" tag="li" active-class="active"><a>浏览记录</a></router-link>
            <router-link to="/manage/account" tag="li" active-class="active"><a>账户设置</a></router-link>
          </ul>
        </div>
      </div>
      <div class="right-content">
        <nuxt-child/>
      </div>
      <div class="clearfix"></div>
    </div>
    </div>
</template>