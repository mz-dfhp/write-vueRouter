import type { RouteRecordName, RouteRecordRaw, _RouteRecordProps } from '../types'
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

  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions)

  /**
   *
   * @param record
   * @param parent 父路由？？
   * @param originalRecord 原始路由记录？？
   */
  function addRoute(record: RouteRecordRaw, parent?: RouteRecordMatcher, originalRecord?: RouteRecordMatcher) {
    // 是否是根路由？？
    const isRootAdd = !originalRecord
    const mainNormalizedRecord = normalizeRouteRecord(record)
    // 定义了是否这条记录是另一条的别名。如果记录是原始记录，则该属性为 undefined
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record

    const options = mergeOptions(globalOptions, record)

    const normalizedRecords: (typeof mainNormalizedRecord)[] = [
      mainNormalizedRecord,
    ]

    let matcher: RouteRecordMatcher
    let originalMatcher: RouteRecordMatcher | undefined

    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord
      if (normalizedRecord.path === '*')
        throw new Error('捕获所有路由("*")现在必须使用带有自定义regexp的参数定义')
    }
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
export function normalizeRouteRecord(record: RouteRecordRaw): any {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: undefined,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in record
        ? record.components || null
        : record.component && { default: record.component },
  }
}

/**
 * 将 props 传递给路由组件
 * @param record
 */
function normalizeRecordProps(
  record: RouteRecordRaw,
): Record<string, _RouteRecordProps> {
  const propsObject = {} as Record<string, _RouteRecordProps>
  // 是否有props
  const props = record.props || false
  if ('component' in propsObject) {
    propsObject.default = props
  }
  else {
    for (const name in record.components)
      propsObject[name] = typeof props === 'boolean' ? props : props[name]
  }
  return propsObject
}

/**
 * @description 把 partialOptions[key] 给 defaults[key] 相同的 key  =>{ a:5, b:2, c:3 }
 * @param defaults { a:1, b:2, c:3 }
 * @param partialOptions { a:5, d:6 }
 * @returns
 */
function mergeOptions<T extends object>(
  defaults: T,
  partialOptions: Partial<T>,
): T {
  const options = {} as T
  for (const key in defaults)
    options[key] = key in partialOptions ? partialOptions[key]! : defaults[key]

  return options
}
