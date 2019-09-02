import { WithRouterProps, DefaultQuery, WithRouterProps, SingletonRouter } from 'next/router'
import { NextFC, NextContext } from 'next'

interface CostomRouterProps<T> {
  query: T
}
interface WithRouter<Q> extends WithRouterProps<Q> {
  router: SingletonRouter<Q> & CostomRouterProps<Q>
}
export type NextPageProps<IP = {}, Q = {}> = IP & WithRouter<Q>

export type NextPage<IP = {}, Q = {}> = NextFC<
  NextPageProps<IP, Q>,
  IP,
  NextContext<Q & DefaultQuery>
>
