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
}
