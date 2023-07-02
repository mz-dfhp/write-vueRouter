export interface RouteRecordMatcher {
  record: any
  parent: RouteRecordMatcher | undefined
  children: RouteRecordMatcher[]
  alias: RouteRecordMatcher[]
}
