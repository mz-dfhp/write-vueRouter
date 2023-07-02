import type { App } from 'vue'
import { RouterLink } from './RouterLink'
import { RouterView } from './RouterView'

import { createRouterMatcher } from './matcher'

export interface RouterOptions {
  history: any
  routes: any[]
}

export interface Router {
  install(app: App): void
}

/**
 * @description 创建一个可以被Vue应用使用的Router实例。
 * @param options - {@link RouterOptions}
 */
export function createRouter(options: RouterOptions): Router {
  // 核心 路由匹配器 后续都是它对路由表 进行增删改查
  const matcher = createRouterMatcher(options.routes, options)
  const routerHistory = options.history
  if (!routerHistory)
    throw new Error('调用 createRouter()传入对象 缺少 history')

  const router: Router = {
    // app.use 插件
    // 约定返回一个 install 方法 该方法会被调用 传入 Vue 应用实例
    install(app: App) {
      // 注册全局组件 RouterLink RouterView 两个组件
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)

      // 全局属性的对象
      app.config.globalProperties.$router = router
    },
  }
  return router
}
