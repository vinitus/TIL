// 중첩 object의 value 꺼내기

type EnumNotation<T extends Record<string | number | symbol, string | number>> = T[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type nestedKey<C extends object> = UnionToIntersection<
  C[keyof C] extends infer A ? (A extends string ? { [K in A]: string } : nestedKey<A extends object ? A : never>) : never
>;

const nested = {
  a: 'keyone',
  b: { c: 'keytwo', d: 'keythree' },
  c: { d: { e: 'keyfour' } },
} as const;

type result = nestedKey<typeof nested>;

const newobj: nestedKey<typeof nested> = {
  keyone: '1',
  keytwo: '2',
  keythree: '3',
  keyfour: '4',
  keyfive: '5', // << error
};
