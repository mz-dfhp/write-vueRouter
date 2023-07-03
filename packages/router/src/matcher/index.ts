import type { RouteRecordName, RouteRecordRaw } from '../types'
import type { RouteRecordMatcher } from './pathMatcher'

export interface RouterMatcher {
  addRoute: (route: RouteRecordRaw, parent?: RouteRecordMatcher, originalRecord?: RouteRecordMatcher) => void
  resolve: () => void
  removeRoute: () => void
  getRoutes: () => void
  getRecordMatcher: () => void
}

/**
 * @description 路由匹配器
 * @param routes 路由表
 * @param globalOptions
 * @returns
 */
export function createRouterMatcher(routes: Readonly<RouteRecordRaw[]>, globalOptions: any): RouterMatcher {
  // 路由记录列表
  const matchers: RouteRecordMatcher[] = []
  const matcherMap = new Map<RouteRecordName, RouteRecordMatcher>()

  globalOptions = {
    ...{ strict: false, end: true, sensitive: false },
    ...globalOptions,
  }

  /**
   *
   * @param route
   * @param parent 父路由？？
   * @param originalRecord 原始路由记录？？
   */
  function addRoute(route: RouteRecordRaw, parent?: RouteRecordMatcher, originalRecord?: RouteRecordMatcher) {
    // 是否是根路由？？
    const isRootAdd = !originalRecord
    const mainNormalizedRecord = normalizeRouteRecord(record)
  }
  function resolve() {}
  function removeRoute() {}
  function getRoutes() {}
  function getRecordMatcher() { }

  // 主入口 添加初始路由

  routes.forEach(route => addRoute(route))

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}

/**
 * @description 创建一个标准化RouteRecordRaw
 * @param record
 * @returns
 */
export function normalizeRouteRecord(record: RouteRecordRaw) {
  return {}
}

/**
 * 将 props 传递给路由组件
 * @param record
 */
function normalizeRecordProps(
  record: RouteRecordRaw,
) {
  return {}
}
