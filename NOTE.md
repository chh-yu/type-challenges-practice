# NOTE
- `keyof`获取对象所有键值
- `T[number]`获取数组T所有元素
- 内置类型`PropertyKey`等价于`keyof any`等价于`string | number | symbol`
- Conditional types in which the checked type is a naked type parameter are called distributive conditional types. Distributive conditional types are automatically distributed over union types during instantiation. An instantiation of T extends U ? X : Y with the type argument A | B | C for T is resolved as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
[参考](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)
- `type MyAwaited<T extends Promise<any>> = T extends Promise<infer K>? K extends Promise<any> ?MyAwaited<K> : K : never`
	这里的infer K理解为：如果 T 继承了 Promise<infer K> 类型，则返回类型 K extends Promise<any> ? MyAwaited<K> : K，否则返回 any。其中 K 是什么呢？R 被定义在 extends Promise<infer K> 中，即 K 是从传入参数类型中推导出来的。
- 实现`Equal<T, U>`
`<T>() => T extends X等价于<T>() => (T extends X)`
[参考1](https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript%EF%BC%89%E3%80%82)
[参考2](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- as使用技巧
`type MyOmit<T, K extends keyof T> = { [key in keyof T as key extends K ? never : key]: T[key] };`
In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type.
[参考2](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
- [-readonly](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)
- [what is "extends never" used for?](https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367)
In the [issue recommented](https://github.com/type-challenges/type-challenges/issues/187) for [00009-medium-deep-readonly](./src/00009-medium-deep-readonly.ts),
'keyof T' is used for geting union type that if there're any type inclued in the union type,
then it means T is a Object with some keys, so we can process it recursively.
Otherwise, T maybe is premitive type or object with no keys whitch means we can just return T.