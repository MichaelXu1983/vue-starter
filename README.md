# Vue 入门脚手架

## 目录简介

1. [介绍](#介绍)
2. [开发环境搭建](#开发环境搭建)
   - [安装nvm](#安装nvm)
   - [安装node.js](#安装node.js)
   - [安装nrm](#安装nrm)
   - [安装yarn](#安装yarn)
   - [安装代码编辑器](#安装代码编辑器)
   - [安装vue命令行工具](#安装vue命令行工具)
3. [项目环境搭建](#项目环境搭建)
   - [初始化项目](#初始化项目)
   - [自定义配置](#自定义配置)
   - [新增常用实践目录](#新增常用实践目录)
   - [封装HTTP请求](#封装HTTP请求)
   - [编写公共组件](#编写公共组件)
   - [编写权限组件](#编写权限组件)
   - [其他处理](#其他处理)
4. [开发与构建命令](#开发与构建命令)
   - [依赖配置](#依赖配置)
   - [命令说明](#命令说明)
5. [开发流程](#开发流程)  
   - [概述](#概述)
   - [载入组件](#载入组件)
   - [设置路由](#设置路由)
   - [设置菜单](#设置菜单)
   - [配置测试接口](#配置测试接口)
   - [创建 http 请求](#创建http请求)
   - [调用 http 请求](#调用http请求)
   - [使用 vuex(可选)](#使用vuex)
     - [触发 action](#触发action)
     - [创建 store](#创建store)
     - [定义 sotre 计算属性](#定义sotre计算属性)
     - [创建 modules](#创建modules)
   - [发布](#发布)

## <a name="介绍">介绍</a>

本项目是基于 ES2015+ & @vue/cli(v4.2.3) & webpack(v4) & vuex(v3.1.2) & vue-router(v3.1.6) & ESLint(recommended) & Less(v3.11.1) & Jest & Cypress 按照官方文档，遵循目前项目经验的常用实践，搭建的入门脚手架，不定期迭代新功能。大家可以直接克隆使用，也可以按照搭建方法一步一步自己搭建。

**Vue 和 React 对比**
| | Vue | React |
| --- | --- | --- |
| 运行时性能 | 自动优化，省事而不灵活 | 通过`PureComponent`和`shouldComponentUpdate`手动优化，灵活而复杂   |
| HTML & CSS | Templates（参考 Web Components），类似原始 html 页面，易于接受，但不利于手动渲染 DOM | JSX（XML 语法编写 JavaScript），不易接受，但可使用 JavaScript 原始功能手动灵活渲染 DOM |
| 规模 | 生态主要由官方维护 | 生态主要由社区维护 |
| 原生渲染 | 结合阿里巴巴 Weex | 结合自家 React Native |

## <a name="开发环境搭建">开发环境搭建</a>  

### <a name="开发环境搭建">开发环境搭建</a>  

#### <a name="安装nvm">安装nvm</a>  
node.js 版本管理工具，最新版本号请到 https://github.com/nvm-sh/nvm 查看

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

#### <a name="安装node.js">安装node.js</a>   
其他版本号，请查看 https://nodejs.org/zh-cn/download/releases/

```bash
nvm install 8.16.0
```

#### <a name="安装nrm">安装nrm</a>   
npm 源管理工具，可以帮助你轻松、快速地在不同的 npm 源之间进行切换

```bash
# 安装 nrm
npm install -g nrm

# 列出 npm 源列表
nrm ls

# 默认为国外源，这里切换为淘宝源，加快包下载速度
nrm use taobao
```

#### <a name="安装yarn">安装yarn</a>   
yarn 是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载

```bash
# 安装 yarn
npm install -g yarn

# 默认为国外源，修改为淘宝源
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

#### <a name="安装代码编辑器">安装代码编辑器</a>   
手动搜索 Visual Studio Code 下载并安装，并在编辑器内装上以下插件：

- Vetur —— 语法高亮、智能感知、Emmet 等
- Auto Close Tag：自动闭合标签
- Auto Rename Tag：自动重命名标签，配合上面的插件使用
- Path Intellisense：文件路径提示补全

#### <a name="安装vue命令行工具">安装vue命令行工具</a>   
Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)，可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本

```bash
npm install -g @vue/cli
```

## <a name="项目环境搭建">项目环境搭建</a>  

#### <a name="初始化项目">初始化项目</a>   
Vue CLI 4 可以通过图形化界面初始化项目，并安装 Babel、PWA、Router、Vuex、Less、Linter、Jest、Cypress 等插件，相对命令行更加便捷和高效，命令如下：
```bash
vue create vue-starter  // 生成一个名为 vue-starter 的项目
cd vue-starter          // 进入 vue-starter 项目根目录
vue ui                  // 启动图形化配置界面
```  

以下为我的图形化配置界面的配置：
<center class="half">
<img src="doc/vue-ui-screenshot/0.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/1.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/2.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/3.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/4.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/5.png" alt="vue-ui-screenshot" width="100" align="bottom" />  
</center>
<br />
<center class="half">
<img src="doc/vue-ui-screenshot/6.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/7.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/8.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/9.png" alt="vue-ui-screenshot" width="100" align="bottom" />
<img src="doc/vue-ui-screenshot/10.png" alt="vue-ui-screenshot" width="100" align="bottom" />
</center>

#### <a name="自定义配置">自定义配置</a>   
虽然使用 `vue ui` 可以进行可视化配置，但在实际开发中，肯定有需要自定义配置的部分，可以参考[全局CLI配置](https://cli.vuejs.org/config/#global-cli-config)，本工程配置见 [`vue.config.js`](/vue.config.js)。  

配置好了之后，可以通过命令输出查看一下，如下：  
```bash
# 参考：https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config

# 将配置输出到 output.js 文件
vue inspect > output.js 

# 只审查第一条规则
vue inspect module.rules.0

# 列出所有规则和插件的名字
vue inspect --rules
[
  'vue',
  'images',
  'svg',
  'media',
  'fonts',
  'pug',
  'css',
  'postcss',
  'scss',
  'sass',
  'less',
  'stylus',
  'js',
  'eslint'
]

vue inspect --plugins
[
  'vue-loader',
  'define',
  'case-sensitive-paths',
  'friendly-errors',
  'html',
  'pwa',
  'preload',
  'prefetch',
  'cors',
  'copy'
]
```  

#### <a name="新增常用实践目录">新增常用实践目录</a>   
```bash
|── dist                                    # 部署目录
|── .github                                 # github 维护规范
|── docs                                    # 相关文档
|── public                                  # 静态资源目录，只部署不打包
├── src                                     # 源代码
│   ├── api                                 # 所有 HTTP 请求
│   │   ├── home.js                         # 首页（根据业务模块命名，和 /views/* 一一对应）
│   ├── assets                              # 图片样式等静态资源，会打包
│   ├── components                          # 业务通用组件
│   ├── router                              # 路由
│   │   ├── asyncComponents.js              # 异步载入的组件
│   │   ├── components.js                   # 同步载入的组件（设置会被编译到本app.js中的组件）
│   │   ├── index.js                        # 路由入口
│   │   ├── menu.js                         # 菜单设置（设置所有一级、二级、三级菜单）
│   │   ├── routes.js                       # 路由设置（设置所有路由对应组件别名）
│   ├── store                               # 全局 store 管理
│   │   ├── modules                         # 模块
│   │   │   ├──  user.js                    # 用户（定义 user 模块）
│   │   ├── getters.js                      # 定义 store 计算属性（定义 store 计算属性，以逗号分割增加）
│   │   ├── index.js                        # 组装 store 并导出（组装 user 并导出）
│   ├── utils                               # 工具库
│   │   ├── auth.js                         # 操作 token
│   │   ├── index.js                        # 工具方法
│   │   ├── request.js                      # 全局 http 请求方法封装
│   ├── views                               # 页面视图
│   │   ├── home                            # 响应路由切换的 vue 组件（根据业务模块命名，和 /api/* 一一对应）
│   ├── App.vue                             # Vue 模板入口
│   ├── main.js                             # Vue 入口 JS
│   ├── registerServiceWorker.js            # PWA配置（离线缓存、消息推送、后台自动更新等任务）
├── tests                                   # 测试工具
├── .browserslistrc                         # 项目的目标浏览器范围配置
├── .eslintrc.js                            # ESLint 配置
├── .gitignore                              # git 提交时需要忽略的文件配置
├── babel.config.js                         # babel 配置
├── cypress.json                            # cypress 配置
├── jest.config.js                          # jest 配置
├── package-lock.json                       # 包快照（锁定包及其依赖包版本号，建议提交）
├── package.json                            # 包配置
├── README.md                               # 项目自述
└── vue.config.js                           # 配置相关
```  
