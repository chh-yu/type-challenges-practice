/*
  9 - 深度 Readonly
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys #deep
  
  ### 题目
  
  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。
  
  实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。
  
  您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。
  
  例如
  
  ```ts
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
  
  > 在 Github 上查看：https://tsch.js.org/9/zh-CN
*/


/* _____________ 你的代码 _____________ */

/**
 * 1. 试图通过[number]对数组进行循环处理，但这是不对的
 */
// type DeepReadonly<T> = {
//     readonly [key in keyof T]: T[key] extends Function 
//         ? T[key]
//         : T[key] extends any[]
//             ? DeepReadonly<T[key][number]>
//             : DeepReadonly<T[key]>
// }

/**
 * 2. 通过递归处理数组
 */
// type DeepReadonly<T> = {
//     readonly [key in keyof T]: T[key] extends Function 
//         ? T[key]
//         : T[key] extends [infer first, ...infer rest]
//             ? readonly [DeepReadonly<first>, ...DeepReadonly<rest>]
//             : DeepReadonly<T[key]>
// }

/**
 * 3. 发现是不需要递归处理数组的🤣
 */
// type DeepReadonly<T> = {
//     readonly [key in keyof T]: T[key] extends Function 
//         ? T[key]
//         : DeepReadonly<T[key]>
// }

/**
 * 4. Issues Recommented
 * https://github.com/type-challenges/type-challenges/issues/187
 * 
 * Highly praised comment:
 * 1) nice set up of the base case: recursion stops if T is no longer an object
 * type DeepReadonly<T> = keyof T extends never
 * 
 * Q: what is "extends never" used for?
 * A: https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367
 * 理解: In this case, 'keyof T' is used for geting union type 
 * that if there're any type inclued in the union type,
 * then it means T is a Object with some keys, so we can process it recursively.
 * Otherwise, T maybe is premitive type or object with no keys whitch means we can just return T.
 * 
 * 
 * 2）nice definition of the recursive cases: the value T[k] is always define recursively.
 * { readonly [k in keyof T]: DeepReadonly<T[k]> }
 * 
 */
type DeepReadonly<T> = keyof T extends never
    ? T
    : { readonly [k in keyof T]: DeepReadonly<T[k]> };


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9/answer/zh-CN
  > 查看解答：https://tsch.js.org/9/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

