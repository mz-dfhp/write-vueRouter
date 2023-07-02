import type { RouteRecordName } from 'src/types'
import type { RouteRecordMatcher } from './pathMatcher'

export interface RouterMatcher {
  addRoute: () => void
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
export function createRouterMatcher(routes: any, globalOptions: any): RouterMatcher {
  // 路由记录列表
  const matchers: RouteRecordMatcher[] = []
  const matcherMap = new Map<RouteRecordName, RouteRecordMatcher>()

  globalOptions = {
    ...{ strict: false, end: true, sensitive: false },
    ...globalOptions,
  }

  function addRoute() {}
  function resolve() {}
  function removeRoute() {}
  function getRoutes() {}
  function getRecordMatcher() { }

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}
