import { WithRouterProps, DefaultQuery } from 'next/router'
import { NextFC, NextContext } from 'next'

interface CostomRouterProps<T> {
  query: T
}
interface WithRouter<T> extends WithRouterProps<T> {
  router: SingletonRouter<T> & CostomRouterProps<T>
}
export type NextPageProps<IP = {}, Q = {}> = T & WithRouter<U>

export type NextPage<IP = {}, Q = {}> = NextFC<
  NextPageProps<IP, Q>,
  IP,
  NextContext<Q & DefaultQuery>
>

export interface JsxChildren {
  children: JSX.Element[] | JSX.Element
}
