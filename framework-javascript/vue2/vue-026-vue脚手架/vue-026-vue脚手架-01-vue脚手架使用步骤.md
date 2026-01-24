# 1.安装node环境
## 1.1.手动安装node
    NODE_HOME
    %NODE_HOME%\node_global
    %NODE_HOME%\node_cache
## 1.2.使用nvm安装node
    安装nvm curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    查看可以安装的node版本 nvm list-remote
    安装制定版本的node版本 nvm install v18.20.8
    使用指定版本的node版本 nvm use 18.20.8
    查看当前使用的node版本 nvm list node

# 2.配置node开发环境
##  2.1.本地全局仓库管理
        安装时命令中带有 -g 的语句都会把下载的文件安装到本地全局仓库中
        获取本地全局仓库的位置:
            npm config get prefix
        设置本地全局仓库的地址:
            npm config set prefix 这里写具体的文件夹位置(一般这个文件夹放在node的安装目录中的 node_global\node_modules 中)
##  2.2.设置远程仓库
        设置远程仓库为taobao:
            npm config set registry https://registry.npm.taobao.org
        设置远程仓库为设置远程仓库为tencent:
            npm config set registry https://mirrors.cloud.tencent.com/npm/
        查看远程仓库的地址:
            npm config get registry
##  2.3.管理npm仓库地址:使用nrm
        安装nrm: npm install -g nrm 或 npm i -g nrm
        查看镜像仓库列表: nrm ls 或 nrm list
        切换仓库镜像源: nrm use taobao 或 npmn use npm

# 3.安装npm
# 4.全局安装@vue/cli(安装vue脚手架)
    安装最新版本    npm install -g @vue/cli
    安装指定版本    npm install -g @vue/cli@4.0
    报错的话使用    npm install -g @vue/cli --force
# 5.切换到项目所在目录，使用命令行创建项目
    vue create xxx
# 6.启动项目
    npm run server