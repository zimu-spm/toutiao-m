import dayjs from 'dayjs'
import Vue from 'vue'
// 加载语言配置
import 'dayjs/locale/zh-cn'

// 相对时间 的插件（plugin）
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 全局过滤器：处理相对时间
Vue.filter('relTime', value => dayjs().to(dayjs(value)))
