<template>
  <div class="about">
    <ul>
      <li>
        <a href="javascirpt:;" @click="fakeException(403)">请求403</a>
        <a href="javascirpt:;" @click="fakeException(404)">请求404</a>
        <a href="javascirpt:;" @click="fakeException(500)">请求500</a>
      </li>
    </ul>
  </div>
</template>
<script>
// 根据业务模块命名，和 /api/* 一一对应
import { fetchException } from "./service";

export default {
  name: "About",
  components: {},
  data() {
    return {};
  },
  methods: {
    fakeException(status) {
      fetchException(status)
        .then(response => {
          // 业务逻辑
          console.log(response);
        })
        .catch(err => {
          // 此处捕获未在 request.js 中处理的异常
          console.log(err);
        });
    }
  },
  created: function() {}
};
</script>
<style scoped lang="scss">
.about {
  padding: 20px;
}
</style>
