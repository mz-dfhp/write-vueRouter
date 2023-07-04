export interface RouteMeta extends Record<string | number | symbol, unknown> {}

export type RouteRecordName = string | symbol

export interface RouteRecordRaw {
  path: string
  redirect?: string
  alias?: string | string[]
  name: RouteRecordName
  meta?: RouteMeta
  children?: RouteRecordRaw[]
  beforeEnter?: () => void
  component?: never
  components?: any // 一个路径可以显示多个组件
  props?: never
}

export type _RouteRecordProps = boolean
| Record<string, any>
| ((to: any) => Record<string, any>)
