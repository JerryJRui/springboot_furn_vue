import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入css
import '@/assets/css/global.css'
// 引入ElementPlus
import ElementPlus from 'element-plus'
// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
createApp(App).use(store).use(router).use(ElementPlus,{
    locale: zhCn}).mount('#app')

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
