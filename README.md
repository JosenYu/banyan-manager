# vue-i18n

[国际化](https://blog.csdn.net/u012302552/article/details/80989964)

npm install vue-i18n

```js
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "zh", // 语言标识
  messages: {
    zh: require("./assets/lang/zh"),
    en: require("./assets/lang/en")
  }
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
```

```html
<h1>{{ $t("i18n.aaa") }}</h1>
```

```js
export { i18n };
const i18n = {
  aaa: "啊"
};
```
