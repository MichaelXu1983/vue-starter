const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const path = require("path");
const microService = "http://rap2api.taobao.org/app/mock";
const failService = "http://120.79.26.168:8001";
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",

  outputDir: "dist",

  assetsDir: "public",

  indexPath: "index.html",

  filenameHashing: true,

  // 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。如果你试图修改这些插件的选项，请确认运行 vue inspect
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: "src/index/main.js",
  //     // 模板来源
  //     template: "public/index.html",
  //     // 在 dist/index.html 的输出
  //     filename: "index.html",
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "Index Page",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: "src/subpage/main.js"
  // },

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
  crossorigin: "use-credentials",
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  // eslint-disable-next-line no-unused-vars
  chainWebpack: config => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    //config.optimization.splitChunks({
    //     cacheGroups: {}
    //});
    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    // config.module
    //   .rule('eslint')
    //   .exclude
    //   .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
    //   .end()
  },

  // 配置高于 chainWebpack 中关于 css loader 的配置
  css: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    requireModuleExtension: true,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中（注意：开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容）
    extract: false,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          localIdentName: "[name]-[hash]"
        },
        localsConvention: "camelCaseOnly"
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "@/global.scss";`
      },
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: "#fff"
        },
        modifyVars: {
          hack: `true; @import "${resolve("/src/theme.less")}";`
        }
      },

      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 18,
            propList: ["*"]
          })
        ]
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: {
      // 参考：https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      "/api": {
        target: `${microService}/248666/`, // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          "^/api": "" // rewrite path
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          "dev.localhost:3000": "http://localhost:8000"
        }
      },
      "/fail": {
        target: `${failService}/api/`, // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          "^/fail": "" // rewrite path
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          "dev.localhost:3000": "http://localhost:8000"
        }
      }
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require("os").cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  pwa: {
    name: "VueStarter"
  },

  // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
  pluginOptions: {
    // foo: {
    // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    // }
  }
};
