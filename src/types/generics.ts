import { UseBoundStore } from 'zustand'

export type MayArray<T> = T | Array<T>

export type MayDeepArray<T> = T | Array<MayDeepArray<T>>

export type MayFunction<T, PS extends any[] = []> = T | ((...Params: PS) => T)

export type ArrayItem<T extends ReadonlyArray<any>> = T extends Array<infer P> ? P : never

export type ZustandStore<T extends UseBoundStore<any>> = T extends UseBoundStore<infer R> ? R : never

export type ExactPartial<T, U> = {
  [P in Extract<keyof T, U>]?: T[P]
} & {
  [P in Exclude<keyof T, U>]: T[P]
}

export type ExactRequired<T, U> = {
  [P in Extract<keyof T, U>]-?: T[P]
} & {
  [P in Exclude<keyof T, U>]: T[P]
}

/**
 * extract only string and number
 */
export type SKeyof<O> = Extract<keyof O, string>

export type GetValue<T, K> = K extends keyof T ? T[K] : undefined
/**
 * @example
 * type A = { a: number; b: string; c?: string }
 * type B = { a: string; c: string; d?: boolean }
 *
 * type D = SOR<A, B> // { a: number | string; b: string | undefined; c: string | undefined; d: boolean | undefined } // ! if use SOR, you lost union type guard feature, try NOT to use this trick
 */
export type SOR<T, U> = { [K in keyof T | keyof U]: GetValue<T, K> | GetValue<U, K> }

export type Fallback<T, FallbackT> = T extends undefined ? FallbackT : T

/**
 * @example
 * type A = { a: number; b: string; c?: string }
 * type B = { a: string; c: string; d?: boolean }
 *
 * type D = Cover<A, B> // { a: string; b: string; c: string; d?: boolean}
 */
export type Cover<O, T> = { [K in keyof O | keyof T]: Fallback<GetValue<T, K>, GetValue<O, K>> }
