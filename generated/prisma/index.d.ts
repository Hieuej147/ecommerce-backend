
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model StockReservation
 * 
 */
export type StockReservation = $Result.DefaultSelection<Prisma.$StockReservationPayload>
/**
 * Model StockReservationItem
 * 
 */
export type StockReservationItem = $Result.DefaultSelection<Prisma.$StockReservationItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model ConversationThread
 * 
 */
export type ConversationThread = $Result.DefaultSelection<Prisma.$ConversationThreadPayload>
/**
 * Model AgentRun
 * 
 */
export type AgentRun = $Result.DefaultSelection<Prisma.$AgentRunPayload>
/**
 * Model AgentEvent
 * 
 */
export type AgentEvent = $Result.DefaultSelection<Prisma.$AgentEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProductStatus: {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const ReservationStatus: {
  RESERVED: 'RESERVED',
  RELEASED: 'RELEASED'
};

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus]


export const OrderStatus: {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED',
  PAYMENT_FAILED: 'PAYMENT_FAILED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const OrderPaymentStatus: {
  UNPAID: 'UNPAID',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type OrderPaymentStatus = (typeof OrderPaymentStatus)[keyof typeof OrderPaymentStatus]


export const PaymentStatus: {
  CREATED: 'CREATED',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const ConversationThreadStatus: {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  DELETING: 'DELETING'
};

export type ConversationThreadStatus = (typeof ConversationThreadStatus)[keyof typeof ConversationThreadStatus]


export const AgentRunStatus: {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
  STOPPED: 'STOPPED'
};

export type AgentRunStatus = (typeof AgentRunStatus)[keyof typeof AgentRunStatus]


export const AgentRunKind: {
  ROOT: 'ROOT',
  SUBAGENT: 'SUBAGENT'
};

export type AgentRunKind = (typeof AgentRunKind)[keyof typeof AgentRunKind]

}

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type ReservationStatus = $Enums.ReservationStatus

export const ReservationStatus: typeof $Enums.ReservationStatus

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type OrderPaymentStatus = $Enums.OrderPaymentStatus

export const OrderPaymentStatus: typeof $Enums.OrderPaymentStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type ConversationThreadStatus = $Enums.ConversationThreadStatus

export const ConversationThreadStatus: typeof $Enums.ConversationThreadStatus

export type AgentRunStatus = $Enums.AgentRunStatus

export const AgentRunStatus: typeof $Enums.AgentRunStatus

export type AgentRunKind = $Enums.AgentRunKind

export const AgentRunKind: typeof $Enums.AgentRunKind

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockReservation`: Exposes CRUD operations for the **StockReservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockReservations
    * const stockReservations = await prisma.stockReservation.findMany()
    * ```
    */
  get stockReservation(): Prisma.StockReservationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockReservationItem`: Exposes CRUD operations for the **StockReservationItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockReservationItems
    * const stockReservationItems = await prisma.stockReservationItem.findMany()
    * ```
    */
  get stockReservationItem(): Prisma.StockReservationItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversationThread`: Exposes CRUD operations for the **ConversationThread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversationThreads
    * const conversationThreads = await prisma.conversationThread.findMany()
    * ```
    */
  get conversationThread(): Prisma.ConversationThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentRun`: Exposes CRUD operations for the **AgentRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentRuns
    * const agentRuns = await prisma.agentRun.findMany()
    * ```
    */
  get agentRun(): Prisma.AgentRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentEvent`: Exposes CRUD operations for the **AgentEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentEvents
    * const agentEvents = await prisma.agentEvent.findMany()
    * ```
    */
  get agentEvent(): Prisma.AgentEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Product: 'Product',
    StockReservation: 'StockReservation',
    StockReservationItem: 'StockReservationItem',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Payment: 'Payment',
    ConversationThread: 'ConversationThread',
    AgentRun: 'AgentRun',
    AgentEvent: 'AgentEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "product" | "stockReservation" | "stockReservationItem" | "order" | "orderItem" | "payment" | "conversationThread" | "agentRun" | "agentEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      StockReservation: {
        payload: Prisma.$StockReservationPayload<ExtArgs>
        fields: Prisma.StockReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          findFirst: {
            args: Prisma.StockReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          findMany: {
            args: Prisma.StockReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          create: {
            args: Prisma.StockReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          createMany: {
            args: Prisma.StockReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          delete: {
            args: Prisma.StockReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          update: {
            args: Prisma.StockReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          deleteMany: {
            args: Prisma.StockReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockReservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          upsert: {
            args: Prisma.StockReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          aggregate: {
            args: Prisma.StockReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockReservation>
          }
          groupBy: {
            args: Prisma.StockReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockReservationCountArgs<ExtArgs>
            result: $Utils.Optional<StockReservationCountAggregateOutputType> | number
          }
        }
      }
      StockReservationItem: {
        payload: Prisma.$StockReservationItemPayload<ExtArgs>
        fields: Prisma.StockReservationItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockReservationItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockReservationItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          findFirst: {
            args: Prisma.StockReservationItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockReservationItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          findMany: {
            args: Prisma.StockReservationItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>[]
          }
          create: {
            args: Prisma.StockReservationItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          createMany: {
            args: Prisma.StockReservationItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockReservationItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>[]
          }
          delete: {
            args: Prisma.StockReservationItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          update: {
            args: Prisma.StockReservationItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          deleteMany: {
            args: Prisma.StockReservationItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockReservationItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockReservationItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>[]
          }
          upsert: {
            args: Prisma.StockReservationItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationItemPayload>
          }
          aggregate: {
            args: Prisma.StockReservationItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockReservationItem>
          }
          groupBy: {
            args: Prisma.StockReservationItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockReservationItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockReservationItemCountArgs<ExtArgs>
            result: $Utils.Optional<StockReservationItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      ConversationThread: {
        payload: Prisma.$ConversationThreadPayload<ExtArgs>
        fields: Prisma.ConversationThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          findFirst: {
            args: Prisma.ConversationThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          findMany: {
            args: Prisma.ConversationThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>[]
          }
          create: {
            args: Prisma.ConversationThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          createMany: {
            args: Prisma.ConversationThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>[]
          }
          delete: {
            args: Prisma.ConversationThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          update: {
            args: Prisma.ConversationThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          deleteMany: {
            args: Prisma.ConversationThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>[]
          }
          upsert: {
            args: Prisma.ConversationThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationThreadPayload>
          }
          aggregate: {
            args: Prisma.ConversationThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversationThread>
          }
          groupBy: {
            args: Prisma.ConversationThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationThreadCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationThreadCountAggregateOutputType> | number
          }
        }
      }
      AgentRun: {
        payload: Prisma.$AgentRunPayload<ExtArgs>
        fields: Prisma.AgentRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findFirst: {
            args: Prisma.AgentRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findMany: {
            args: Prisma.AgentRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          create: {
            args: Prisma.AgentRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          createMany: {
            args: Prisma.AgentRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          delete: {
            args: Prisma.AgentRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          update: {
            args: Prisma.AgentRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          deleteMany: {
            args: Prisma.AgentRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          upsert: {
            args: Prisma.AgentRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          aggregate: {
            args: Prisma.AgentRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentRun>
          }
          groupBy: {
            args: Prisma.AgentRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentRunCountArgs<ExtArgs>
            result: $Utils.Optional<AgentRunCountAggregateOutputType> | number
          }
        }
      }
      AgentEvent: {
        payload: Prisma.$AgentEventPayload<ExtArgs>
        fields: Prisma.AgentEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          findFirst: {
            args: Prisma.AgentEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          findMany: {
            args: Prisma.AgentEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>[]
          }
          create: {
            args: Prisma.AgentEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          createMany: {
            args: Prisma.AgentEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>[]
          }
          delete: {
            args: Prisma.AgentEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          update: {
            args: Prisma.AgentEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          deleteMany: {
            args: Prisma.AgentEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>[]
          }
          upsert: {
            args: Prisma.AgentEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentEventPayload>
          }
          aggregate: {
            args: Prisma.AgentEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentEvent>
          }
          groupBy: {
            args: Prisma.AgentEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentEventCountArgs<ExtArgs>
            result: $Utils.Optional<AgentEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    product?: ProductOmit
    stockReservation?: StockReservationOmit
    stockReservationItem?: StockReservationItemOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    payment?: PaymentOmit
    conversationThread?: ConversationThreadOmit
    agentRun?: AgentRunOmit
    agentEvent?: AgentEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    reservationItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservationItems?: boolean | ProductCountOutputTypeCountReservationItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReservationItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationItemWhereInput
  }


  /**
   * Count Type StockReservationCountOutputType
   */

  export type StockReservationCountOutputType = {
    items: number
  }

  export type StockReservationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | StockReservationCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * StockReservationCountOutputType without action
   */
  export type StockReservationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationCountOutputType
     */
    select?: StockReservationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockReservationCountOutputType without action
   */
  export type StockReservationCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type ConversationThreadCountOutputType
   */

  export type ConversationThreadCountOutputType = {
    runs: number
  }

  export type ConversationThreadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | ConversationThreadCountOutputTypeCountRunsArgs
  }

  // Custom InputTypes
  /**
   * ConversationThreadCountOutputType without action
   */
  export type ConversationThreadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThreadCountOutputType
     */
    select?: ConversationThreadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationThreadCountOutputType without action
   */
  export type ConversationThreadCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
  }


  /**
   * Count Type AgentRunCountOutputType
   */

  export type AgentRunCountOutputType = {
    events: number
  }

  export type AgentRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | AgentRunCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * AgentRunCountOutputType without action
   */
  export type AgentRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRunCountOutputType
     */
    select?: AgentRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentRunCountOutputType without action
   */
  export type AgentRunCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    reorderPoint: number | null
    priceAmountMinor: number | null
    stockQuantity: number | null
  }

  export type ProductSumAggregateOutputType = {
    reorderPoint: number | null
    priceAmountMinor: bigint | null
    stockQuantity: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    externalId: string | null
    sku: string | null
    slug: string | null
    name: string | null
    categorySlug: string | null
    description: string | null
    reorderPoint: number | null
    priceAmountMinor: bigint | null
    currency: string | null
    stockQuantity: number | null
    status: $Enums.ProductStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    externalId: string | null
    sku: string | null
    slug: string | null
    name: string | null
    categorySlug: string | null
    description: string | null
    reorderPoint: number | null
    priceAmountMinor: bigint | null
    currency: string | null
    stockQuantity: number | null
    status: $Enums.ProductStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    externalId: number
    sku: number
    slug: number
    name: number
    categorySlug: number
    description: number
    images: number
    reorderPoint: number
    priceAmountMinor: number
    currency: number
    stockQuantity: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    reorderPoint?: true
    priceAmountMinor?: true
    stockQuantity?: true
  }

  export type ProductSumAggregateInputType = {
    reorderPoint?: true
    priceAmountMinor?: true
    stockQuantity?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    externalId?: true
    sku?: true
    slug?: true
    name?: true
    categorySlug?: true
    description?: true
    reorderPoint?: true
    priceAmountMinor?: true
    currency?: true
    stockQuantity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    externalId?: true
    sku?: true
    slug?: true
    name?: true
    categorySlug?: true
    description?: true
    reorderPoint?: true
    priceAmountMinor?: true
    currency?: true
    stockQuantity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    externalId?: true
    sku?: true
    slug?: true
    name?: true
    categorySlug?: true
    description?: true
    images?: true
    reorderPoint?: true
    priceAmountMinor?: true
    currency?: true
    stockQuantity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    externalId: string | null
    sku: string | null
    slug: string
    name: string
    categorySlug: string
    description: string
    images: JsonValue | null
    reorderPoint: number
    priceAmountMinor: bigint
    currency: string
    stockQuantity: number
    status: $Enums.ProductStatus
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    sku?: boolean
    slug?: boolean
    name?: boolean
    categorySlug?: boolean
    description?: boolean
    images?: boolean
    reorderPoint?: boolean
    priceAmountMinor?: boolean
    currency?: boolean
    stockQuantity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reservationItems?: boolean | Product$reservationItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    sku?: boolean
    slug?: boolean
    name?: boolean
    categorySlug?: boolean
    description?: boolean
    images?: boolean
    reorderPoint?: boolean
    priceAmountMinor?: boolean
    currency?: boolean
    stockQuantity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    sku?: boolean
    slug?: boolean
    name?: boolean
    categorySlug?: boolean
    description?: boolean
    images?: boolean
    reorderPoint?: boolean
    priceAmountMinor?: boolean
    currency?: boolean
    stockQuantity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    externalId?: boolean
    sku?: boolean
    slug?: boolean
    name?: boolean
    categorySlug?: boolean
    description?: boolean
    images?: boolean
    reorderPoint?: boolean
    priceAmountMinor?: boolean
    currency?: boolean
    stockQuantity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "sku" | "slug" | "name" | "categorySlug" | "description" | "images" | "reorderPoint" | "priceAmountMinor" | "currency" | "stockQuantity" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservationItems?: boolean | Product$reservationItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      reservationItems: Prisma.$StockReservationItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: string | null
      sku: string | null
      slug: string
      name: string
      categorySlug: string
      description: string
      images: Prisma.JsonValue | null
      reorderPoint: number
      priceAmountMinor: bigint
      currency: string
      stockQuantity: number
      status: $Enums.ProductStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservationItems<T extends Product$reservationItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$reservationItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly externalId: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly categorySlug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly images: FieldRef<"Product", 'Json'>
    readonly reorderPoint: FieldRef<"Product", 'Int'>
    readonly priceAmountMinor: FieldRef<"Product", 'BigInt'>
    readonly currency: FieldRef<"Product", 'String'>
    readonly stockQuantity: FieldRef<"Product", 'Int'>
    readonly status: FieldRef<"Product", 'ProductStatus'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.reservationItems
   */
  export type Product$reservationItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    where?: StockReservationItemWhereInput
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    cursor?: StockReservationItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockReservationItemScalarFieldEnum | StockReservationItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model StockReservation
   */

  export type AggregateStockReservation = {
    _count: StockReservationCountAggregateOutputType | null
    _min: StockReservationMinAggregateOutputType | null
    _max: StockReservationMaxAggregateOutputType | null
  }

  export type StockReservationMinAggregateOutputType = {
    reservationId: string | null
    status: $Enums.ReservationStatus | null
    createdAt: Date | null
    releasedAt: Date | null
  }

  export type StockReservationMaxAggregateOutputType = {
    reservationId: string | null
    status: $Enums.ReservationStatus | null
    createdAt: Date | null
    releasedAt: Date | null
  }

  export type StockReservationCountAggregateOutputType = {
    reservationId: number
    status: number
    createdAt: number
    releasedAt: number
    _all: number
  }


  export type StockReservationMinAggregateInputType = {
    reservationId?: true
    status?: true
    createdAt?: true
    releasedAt?: true
  }

  export type StockReservationMaxAggregateInputType = {
    reservationId?: true
    status?: true
    createdAt?: true
    releasedAt?: true
  }

  export type StockReservationCountAggregateInputType = {
    reservationId?: true
    status?: true
    createdAt?: true
    releasedAt?: true
    _all?: true
  }

  export type StockReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservation to aggregate.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockReservations
    **/
    _count?: true | StockReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockReservationMaxAggregateInputType
  }

  export type GetStockReservationAggregateType<T extends StockReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateStockReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockReservation[P]>
      : GetScalarType<T[P], AggregateStockReservation[P]>
  }




  export type StockReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationWhereInput
    orderBy?: StockReservationOrderByWithAggregationInput | StockReservationOrderByWithAggregationInput[]
    by: StockReservationScalarFieldEnum[] | StockReservationScalarFieldEnum
    having?: StockReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockReservationCountAggregateInputType | true
    _min?: StockReservationMinAggregateInputType
    _max?: StockReservationMaxAggregateInputType
  }

  export type StockReservationGroupByOutputType = {
    reservationId: string
    status: $Enums.ReservationStatus
    createdAt: Date
    releasedAt: Date | null
    _count: StockReservationCountAggregateOutputType | null
    _min: StockReservationMinAggregateOutputType | null
    _max: StockReservationMaxAggregateOutputType | null
  }

  type GetStockReservationGroupByPayload<T extends StockReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockReservationGroupByOutputType[P]>
            : GetScalarType<T[P], StockReservationGroupByOutputType[P]>
        }
      >
    >


  export type StockReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    status?: boolean
    createdAt?: boolean
    releasedAt?: boolean
    items?: boolean | StockReservation$itemsArgs<ExtArgs>
    _count?: boolean | StockReservationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    status?: boolean
    createdAt?: boolean
    releasedAt?: boolean
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    status?: boolean
    createdAt?: boolean
    releasedAt?: boolean
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectScalar = {
    reservationId?: boolean
    status?: boolean
    createdAt?: boolean
    releasedAt?: boolean
  }

  export type StockReservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"reservationId" | "status" | "createdAt" | "releasedAt", ExtArgs["result"]["stockReservation"]>
  export type StockReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | StockReservation$itemsArgs<ExtArgs>
    _count?: boolean | StockReservationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StockReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StockReservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StockReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockReservation"
    objects: {
      items: Prisma.$StockReservationItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      reservationId: string
      status: $Enums.ReservationStatus
      createdAt: Date
      releasedAt: Date | null
    }, ExtArgs["result"]["stockReservation"]>
    composites: {}
  }

  type StockReservationGetPayload<S extends boolean | null | undefined | StockReservationDefaultArgs> = $Result.GetResult<Prisma.$StockReservationPayload, S>

  type StockReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockReservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockReservationCountAggregateInputType | true
    }

  export interface StockReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockReservation'], meta: { name: 'StockReservation' } }
    /**
     * Find zero or one StockReservation that matches the filter.
     * @param {StockReservationFindUniqueArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockReservationFindUniqueArgs>(args: SelectSubset<T, StockReservationFindUniqueArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockReservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockReservationFindUniqueOrThrowArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, StockReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindFirstArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockReservationFindFirstArgs>(args?: SelectSubset<T, StockReservationFindFirstArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindFirstOrThrowArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, StockReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockReservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockReservations
     * const stockReservations = await prisma.stockReservation.findMany()
     * 
     * // Get first 10 StockReservations
     * const stockReservations = await prisma.stockReservation.findMany({ take: 10 })
     * 
     * // Only select the `reservationId`
     * const stockReservationWithReservationIdOnly = await prisma.stockReservation.findMany({ select: { reservationId: true } })
     * 
     */
    findMany<T extends StockReservationFindManyArgs>(args?: SelectSubset<T, StockReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockReservation.
     * @param {StockReservationCreateArgs} args - Arguments to create a StockReservation.
     * @example
     * // Create one StockReservation
     * const StockReservation = await prisma.stockReservation.create({
     *   data: {
     *     // ... data to create a StockReservation
     *   }
     * })
     * 
     */
    create<T extends StockReservationCreateArgs>(args: SelectSubset<T, StockReservationCreateArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockReservations.
     * @param {StockReservationCreateManyArgs} args - Arguments to create many StockReservations.
     * @example
     * // Create many StockReservations
     * const stockReservation = await prisma.stockReservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockReservationCreateManyArgs>(args?: SelectSubset<T, StockReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockReservations and returns the data saved in the database.
     * @param {StockReservationCreateManyAndReturnArgs} args - Arguments to create many StockReservations.
     * @example
     * // Create many StockReservations
     * const stockReservation = await prisma.stockReservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockReservations and only return the `reservationId`
     * const stockReservationWithReservationIdOnly = await prisma.stockReservation.createManyAndReturn({
     *   select: { reservationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, StockReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockReservation.
     * @param {StockReservationDeleteArgs} args - Arguments to delete one StockReservation.
     * @example
     * // Delete one StockReservation
     * const StockReservation = await prisma.stockReservation.delete({
     *   where: {
     *     // ... filter to delete one StockReservation
     *   }
     * })
     * 
     */
    delete<T extends StockReservationDeleteArgs>(args: SelectSubset<T, StockReservationDeleteArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockReservation.
     * @param {StockReservationUpdateArgs} args - Arguments to update one StockReservation.
     * @example
     * // Update one StockReservation
     * const stockReservation = await prisma.stockReservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockReservationUpdateArgs>(args: SelectSubset<T, StockReservationUpdateArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockReservations.
     * @param {StockReservationDeleteManyArgs} args - Arguments to filter StockReservations to delete.
     * @example
     * // Delete a few StockReservations
     * const { count } = await prisma.stockReservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockReservationDeleteManyArgs>(args?: SelectSubset<T, StockReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockReservations
     * const stockReservation = await prisma.stockReservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockReservationUpdateManyArgs>(args: SelectSubset<T, StockReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservations and returns the data updated in the database.
     * @param {StockReservationUpdateManyAndReturnArgs} args - Arguments to update many StockReservations.
     * @example
     * // Update many StockReservations
     * const stockReservation = await prisma.stockReservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockReservations and only return the `reservationId`
     * const stockReservationWithReservationIdOnly = await prisma.stockReservation.updateManyAndReturn({
     *   select: { reservationId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockReservationUpdateManyAndReturnArgs>(args: SelectSubset<T, StockReservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockReservation.
     * @param {StockReservationUpsertArgs} args - Arguments to update or create a StockReservation.
     * @example
     * // Update or create a StockReservation
     * const stockReservation = await prisma.stockReservation.upsert({
     *   create: {
     *     // ... data to create a StockReservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockReservation we want to update
     *   }
     * })
     */
    upsert<T extends StockReservationUpsertArgs>(args: SelectSubset<T, StockReservationUpsertArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationCountArgs} args - Arguments to filter StockReservations to count.
     * @example
     * // Count the number of StockReservations
     * const count = await prisma.stockReservation.count({
     *   where: {
     *     // ... the filter for the StockReservations we want to count
     *   }
     * })
    **/
    count<T extends StockReservationCountArgs>(
      args?: Subset<T, StockReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockReservationAggregateArgs>(args: Subset<T, StockReservationAggregateArgs>): Prisma.PrismaPromise<GetStockReservationAggregateType<T>>

    /**
     * Group by StockReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockReservationGroupByArgs['orderBy'] }
        : { orderBy?: StockReservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockReservation model
   */
  readonly fields: StockReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockReservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends StockReservation$itemsArgs<ExtArgs> = {}>(args?: Subset<T, StockReservation$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockReservation model
   */
  interface StockReservationFieldRefs {
    readonly reservationId: FieldRef<"StockReservation", 'String'>
    readonly status: FieldRef<"StockReservation", 'ReservationStatus'>
    readonly createdAt: FieldRef<"StockReservation", 'DateTime'>
    readonly releasedAt: FieldRef<"StockReservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockReservation findUnique
   */
  export type StockReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation findUniqueOrThrow
   */
  export type StockReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation findFirst
   */
  export type StockReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation findFirstOrThrow
   */
  export type StockReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation findMany
   */
  export type StockReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservations to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation create
   */
  export type StockReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a StockReservation.
     */
    data: XOR<StockReservationCreateInput, StockReservationUncheckedCreateInput>
  }

  /**
   * StockReservation createMany
   */
  export type StockReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockReservations.
     */
    data: StockReservationCreateManyInput | StockReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockReservation createManyAndReturn
   */
  export type StockReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * The data used to create many StockReservations.
     */
    data: StockReservationCreateManyInput | StockReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockReservation update
   */
  export type StockReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a StockReservation.
     */
    data: XOR<StockReservationUpdateInput, StockReservationUncheckedUpdateInput>
    /**
     * Choose, which StockReservation to update.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation updateMany
   */
  export type StockReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockReservations.
     */
    data: XOR<StockReservationUpdateManyMutationInput, StockReservationUncheckedUpdateManyInput>
    /**
     * Filter which StockReservations to update
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to update.
     */
    limit?: number
  }

  /**
   * StockReservation updateManyAndReturn
   */
  export type StockReservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * The data used to update StockReservations.
     */
    data: XOR<StockReservationUpdateManyMutationInput, StockReservationUncheckedUpdateManyInput>
    /**
     * Filter which StockReservations to update
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to update.
     */
    limit?: number
  }

  /**
   * StockReservation upsert
   */
  export type StockReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the StockReservation to update in case it exists.
     */
    where: StockReservationWhereUniqueInput
    /**
     * In case the StockReservation found by the `where` argument doesn't exist, create a new StockReservation with this data.
     */
    create: XOR<StockReservationCreateInput, StockReservationUncheckedCreateInput>
    /**
     * In case the StockReservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockReservationUpdateInput, StockReservationUncheckedUpdateInput>
  }

  /**
   * StockReservation delete
   */
  export type StockReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter which StockReservation to delete.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation deleteMany
   */
  export type StockReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservations to delete
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to delete.
     */
    limit?: number
  }

  /**
   * StockReservation.items
   */
  export type StockReservation$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    where?: StockReservationItemWhereInput
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    cursor?: StockReservationItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockReservationItemScalarFieldEnum | StockReservationItemScalarFieldEnum[]
  }

  /**
   * StockReservation without action
   */
  export type StockReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
  }


  /**
   * Model StockReservationItem
   */

  export type AggregateStockReservationItem = {
    _count: StockReservationItemCountAggregateOutputType | null
    _avg: StockReservationItemAvgAggregateOutputType | null
    _sum: StockReservationItemSumAggregateOutputType | null
    _min: StockReservationItemMinAggregateOutputType | null
    _max: StockReservationItemMaxAggregateOutputType | null
  }

  export type StockReservationItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type StockReservationItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type StockReservationItemMinAggregateOutputType = {
    reservationId: string | null
    productId: string | null
    quantity: number | null
  }

  export type StockReservationItemMaxAggregateOutputType = {
    reservationId: string | null
    productId: string | null
    quantity: number | null
  }

  export type StockReservationItemCountAggregateOutputType = {
    reservationId: number
    productId: number
    quantity: number
    _all: number
  }


  export type StockReservationItemAvgAggregateInputType = {
    quantity?: true
  }

  export type StockReservationItemSumAggregateInputType = {
    quantity?: true
  }

  export type StockReservationItemMinAggregateInputType = {
    reservationId?: true
    productId?: true
    quantity?: true
  }

  export type StockReservationItemMaxAggregateInputType = {
    reservationId?: true
    productId?: true
    quantity?: true
  }

  export type StockReservationItemCountAggregateInputType = {
    reservationId?: true
    productId?: true
    quantity?: true
    _all?: true
  }

  export type StockReservationItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservationItem to aggregate.
     */
    where?: StockReservationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservationItems to fetch.
     */
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockReservationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockReservationItems
    **/
    _count?: true | StockReservationItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockReservationItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockReservationItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockReservationItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockReservationItemMaxAggregateInputType
  }

  export type GetStockReservationItemAggregateType<T extends StockReservationItemAggregateArgs> = {
        [P in keyof T & keyof AggregateStockReservationItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockReservationItem[P]>
      : GetScalarType<T[P], AggregateStockReservationItem[P]>
  }




  export type StockReservationItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationItemWhereInput
    orderBy?: StockReservationItemOrderByWithAggregationInput | StockReservationItemOrderByWithAggregationInput[]
    by: StockReservationItemScalarFieldEnum[] | StockReservationItemScalarFieldEnum
    having?: StockReservationItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockReservationItemCountAggregateInputType | true
    _avg?: StockReservationItemAvgAggregateInputType
    _sum?: StockReservationItemSumAggregateInputType
    _min?: StockReservationItemMinAggregateInputType
    _max?: StockReservationItemMaxAggregateInputType
  }

  export type StockReservationItemGroupByOutputType = {
    reservationId: string
    productId: string
    quantity: number
    _count: StockReservationItemCountAggregateOutputType | null
    _avg: StockReservationItemAvgAggregateOutputType | null
    _sum: StockReservationItemSumAggregateOutputType | null
    _min: StockReservationItemMinAggregateOutputType | null
    _max: StockReservationItemMaxAggregateOutputType | null
  }

  type GetStockReservationItemGroupByPayload<T extends StockReservationItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockReservationItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockReservationItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockReservationItemGroupByOutputType[P]>
            : GetScalarType<T[P], StockReservationItemGroupByOutputType[P]>
        }
      >
    >


  export type StockReservationItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    productId?: boolean
    quantity?: boolean
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservationItem"]>

  export type StockReservationItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    productId?: boolean
    quantity?: boolean
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservationItem"]>

  export type StockReservationItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservationId?: boolean
    productId?: boolean
    quantity?: boolean
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservationItem"]>

  export type StockReservationItemSelectScalar = {
    reservationId?: boolean
    productId?: boolean
    quantity?: boolean
  }

  export type StockReservationItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"reservationId" | "productId" | "quantity", ExtArgs["result"]["stockReservationItem"]>
  export type StockReservationItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockReservationItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockReservationItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | StockReservationDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $StockReservationItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockReservationItem"
    objects: {
      reservation: Prisma.$StockReservationPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      reservationId: string
      productId: string
      quantity: number
    }, ExtArgs["result"]["stockReservationItem"]>
    composites: {}
  }

  type StockReservationItemGetPayload<S extends boolean | null | undefined | StockReservationItemDefaultArgs> = $Result.GetResult<Prisma.$StockReservationItemPayload, S>

  type StockReservationItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockReservationItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockReservationItemCountAggregateInputType | true
    }

  export interface StockReservationItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockReservationItem'], meta: { name: 'StockReservationItem' } }
    /**
     * Find zero or one StockReservationItem that matches the filter.
     * @param {StockReservationItemFindUniqueArgs} args - Arguments to find a StockReservationItem
     * @example
     * // Get one StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockReservationItemFindUniqueArgs>(args: SelectSubset<T, StockReservationItemFindUniqueArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockReservationItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockReservationItemFindUniqueOrThrowArgs} args - Arguments to find a StockReservationItem
     * @example
     * // Get one StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockReservationItemFindUniqueOrThrowArgs>(args: SelectSubset<T, StockReservationItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservationItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemFindFirstArgs} args - Arguments to find a StockReservationItem
     * @example
     * // Get one StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockReservationItemFindFirstArgs>(args?: SelectSubset<T, StockReservationItemFindFirstArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservationItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemFindFirstOrThrowArgs} args - Arguments to find a StockReservationItem
     * @example
     * // Get one StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockReservationItemFindFirstOrThrowArgs>(args?: SelectSubset<T, StockReservationItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockReservationItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockReservationItems
     * const stockReservationItems = await prisma.stockReservationItem.findMany()
     * 
     * // Get first 10 StockReservationItems
     * const stockReservationItems = await prisma.stockReservationItem.findMany({ take: 10 })
     * 
     * // Only select the `reservationId`
     * const stockReservationItemWithReservationIdOnly = await prisma.stockReservationItem.findMany({ select: { reservationId: true } })
     * 
     */
    findMany<T extends StockReservationItemFindManyArgs>(args?: SelectSubset<T, StockReservationItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockReservationItem.
     * @param {StockReservationItemCreateArgs} args - Arguments to create a StockReservationItem.
     * @example
     * // Create one StockReservationItem
     * const StockReservationItem = await prisma.stockReservationItem.create({
     *   data: {
     *     // ... data to create a StockReservationItem
     *   }
     * })
     * 
     */
    create<T extends StockReservationItemCreateArgs>(args: SelectSubset<T, StockReservationItemCreateArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockReservationItems.
     * @param {StockReservationItemCreateManyArgs} args - Arguments to create many StockReservationItems.
     * @example
     * // Create many StockReservationItems
     * const stockReservationItem = await prisma.stockReservationItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockReservationItemCreateManyArgs>(args?: SelectSubset<T, StockReservationItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockReservationItems and returns the data saved in the database.
     * @param {StockReservationItemCreateManyAndReturnArgs} args - Arguments to create many StockReservationItems.
     * @example
     * // Create many StockReservationItems
     * const stockReservationItem = await prisma.stockReservationItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockReservationItems and only return the `reservationId`
     * const stockReservationItemWithReservationIdOnly = await prisma.stockReservationItem.createManyAndReturn({
     *   select: { reservationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockReservationItemCreateManyAndReturnArgs>(args?: SelectSubset<T, StockReservationItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockReservationItem.
     * @param {StockReservationItemDeleteArgs} args - Arguments to delete one StockReservationItem.
     * @example
     * // Delete one StockReservationItem
     * const StockReservationItem = await prisma.stockReservationItem.delete({
     *   where: {
     *     // ... filter to delete one StockReservationItem
     *   }
     * })
     * 
     */
    delete<T extends StockReservationItemDeleteArgs>(args: SelectSubset<T, StockReservationItemDeleteArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockReservationItem.
     * @param {StockReservationItemUpdateArgs} args - Arguments to update one StockReservationItem.
     * @example
     * // Update one StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockReservationItemUpdateArgs>(args: SelectSubset<T, StockReservationItemUpdateArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockReservationItems.
     * @param {StockReservationItemDeleteManyArgs} args - Arguments to filter StockReservationItems to delete.
     * @example
     * // Delete a few StockReservationItems
     * const { count } = await prisma.stockReservationItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockReservationItemDeleteManyArgs>(args?: SelectSubset<T, StockReservationItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockReservationItems
     * const stockReservationItem = await prisma.stockReservationItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockReservationItemUpdateManyArgs>(args: SelectSubset<T, StockReservationItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservationItems and returns the data updated in the database.
     * @param {StockReservationItemUpdateManyAndReturnArgs} args - Arguments to update many StockReservationItems.
     * @example
     * // Update many StockReservationItems
     * const stockReservationItem = await prisma.stockReservationItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockReservationItems and only return the `reservationId`
     * const stockReservationItemWithReservationIdOnly = await prisma.stockReservationItem.updateManyAndReturn({
     *   select: { reservationId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockReservationItemUpdateManyAndReturnArgs>(args: SelectSubset<T, StockReservationItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockReservationItem.
     * @param {StockReservationItemUpsertArgs} args - Arguments to update or create a StockReservationItem.
     * @example
     * // Update or create a StockReservationItem
     * const stockReservationItem = await prisma.stockReservationItem.upsert({
     *   create: {
     *     // ... data to create a StockReservationItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockReservationItem we want to update
     *   }
     * })
     */
    upsert<T extends StockReservationItemUpsertArgs>(args: SelectSubset<T, StockReservationItemUpsertArgs<ExtArgs>>): Prisma__StockReservationItemClient<$Result.GetResult<Prisma.$StockReservationItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockReservationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemCountArgs} args - Arguments to filter StockReservationItems to count.
     * @example
     * // Count the number of StockReservationItems
     * const count = await prisma.stockReservationItem.count({
     *   where: {
     *     // ... the filter for the StockReservationItems we want to count
     *   }
     * })
    **/
    count<T extends StockReservationItemCountArgs>(
      args?: Subset<T, StockReservationItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockReservationItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockReservationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockReservationItemAggregateArgs>(args: Subset<T, StockReservationItemAggregateArgs>): Prisma.PrismaPromise<GetStockReservationItemAggregateType<T>>

    /**
     * Group by StockReservationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockReservationItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockReservationItemGroupByArgs['orderBy'] }
        : { orderBy?: StockReservationItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockReservationItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockReservationItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockReservationItem model
   */
  readonly fields: StockReservationItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockReservationItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockReservationItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservation<T extends StockReservationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockReservationDefaultArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockReservationItem model
   */
  interface StockReservationItemFieldRefs {
    readonly reservationId: FieldRef<"StockReservationItem", 'String'>
    readonly productId: FieldRef<"StockReservationItem", 'String'>
    readonly quantity: FieldRef<"StockReservationItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * StockReservationItem findUnique
   */
  export type StockReservationItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter, which StockReservationItem to fetch.
     */
    where: StockReservationItemWhereUniqueInput
  }

  /**
   * StockReservationItem findUniqueOrThrow
   */
  export type StockReservationItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter, which StockReservationItem to fetch.
     */
    where: StockReservationItemWhereUniqueInput
  }

  /**
   * StockReservationItem findFirst
   */
  export type StockReservationItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter, which StockReservationItem to fetch.
     */
    where?: StockReservationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservationItems to fetch.
     */
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservationItems.
     */
    cursor?: StockReservationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservationItems.
     */
    distinct?: StockReservationItemScalarFieldEnum | StockReservationItemScalarFieldEnum[]
  }

  /**
   * StockReservationItem findFirstOrThrow
   */
  export type StockReservationItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter, which StockReservationItem to fetch.
     */
    where?: StockReservationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservationItems to fetch.
     */
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservationItems.
     */
    cursor?: StockReservationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservationItems.
     */
    distinct?: StockReservationItemScalarFieldEnum | StockReservationItemScalarFieldEnum[]
  }

  /**
   * StockReservationItem findMany
   */
  export type StockReservationItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter, which StockReservationItems to fetch.
     */
    where?: StockReservationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservationItems to fetch.
     */
    orderBy?: StockReservationItemOrderByWithRelationInput | StockReservationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockReservationItems.
     */
    cursor?: StockReservationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservationItems.
     */
    distinct?: StockReservationItemScalarFieldEnum | StockReservationItemScalarFieldEnum[]
  }

  /**
   * StockReservationItem create
   */
  export type StockReservationItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * The data needed to create a StockReservationItem.
     */
    data: XOR<StockReservationItemCreateInput, StockReservationItemUncheckedCreateInput>
  }

  /**
   * StockReservationItem createMany
   */
  export type StockReservationItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockReservationItems.
     */
    data: StockReservationItemCreateManyInput | StockReservationItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockReservationItem createManyAndReturn
   */
  export type StockReservationItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * The data used to create many StockReservationItems.
     */
    data: StockReservationItemCreateManyInput | StockReservationItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReservationItem update
   */
  export type StockReservationItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * The data needed to update a StockReservationItem.
     */
    data: XOR<StockReservationItemUpdateInput, StockReservationItemUncheckedUpdateInput>
    /**
     * Choose, which StockReservationItem to update.
     */
    where: StockReservationItemWhereUniqueInput
  }

  /**
   * StockReservationItem updateMany
   */
  export type StockReservationItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockReservationItems.
     */
    data: XOR<StockReservationItemUpdateManyMutationInput, StockReservationItemUncheckedUpdateManyInput>
    /**
     * Filter which StockReservationItems to update
     */
    where?: StockReservationItemWhereInput
    /**
     * Limit how many StockReservationItems to update.
     */
    limit?: number
  }

  /**
   * StockReservationItem updateManyAndReturn
   */
  export type StockReservationItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * The data used to update StockReservationItems.
     */
    data: XOR<StockReservationItemUpdateManyMutationInput, StockReservationItemUncheckedUpdateManyInput>
    /**
     * Filter which StockReservationItems to update
     */
    where?: StockReservationItemWhereInput
    /**
     * Limit how many StockReservationItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReservationItem upsert
   */
  export type StockReservationItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * The filter to search for the StockReservationItem to update in case it exists.
     */
    where: StockReservationItemWhereUniqueInput
    /**
     * In case the StockReservationItem found by the `where` argument doesn't exist, create a new StockReservationItem with this data.
     */
    create: XOR<StockReservationItemCreateInput, StockReservationItemUncheckedCreateInput>
    /**
     * In case the StockReservationItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockReservationItemUpdateInput, StockReservationItemUncheckedUpdateInput>
  }

  /**
   * StockReservationItem delete
   */
  export type StockReservationItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
    /**
     * Filter which StockReservationItem to delete.
     */
    where: StockReservationItemWhereUniqueInput
  }

  /**
   * StockReservationItem deleteMany
   */
  export type StockReservationItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservationItems to delete
     */
    where?: StockReservationItemWhereInput
    /**
     * Limit how many StockReservationItems to delete.
     */
    limit?: number
  }

  /**
   * StockReservationItem without action
   */
  export type StockReservationItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservationItem
     */
    select?: StockReservationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservationItem
     */
    omit?: StockReservationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    subtotalAmountMinor: number | null
    totalAmountMinor: number | null
  }

  export type OrderSumAggregateOutputType = {
    subtotalAmountMinor: bigint | null
    totalAmountMinor: bigint | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    customerName: string | null
    customerEmail: string | null
    externalId: string | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.OrderPaymentStatus | null
    subtotalAmountMinor: bigint | null
    totalAmountMinor: bigint | null
    currency: string | null
    recipientName: string | null
    phone: string | null
    line1: string | null
    line2: string | null
    city: string | null
    province: string | null
    postalCode: string | null
    countryCode: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    customerName: string | null
    customerEmail: string | null
    externalId: string | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.OrderPaymentStatus | null
    subtotalAmountMinor: bigint | null
    totalAmountMinor: bigint | null
    currency: string | null
    recipientName: string | null
    phone: string | null
    line1: string | null
    line2: string | null
    city: string | null
    province: string | null
    postalCode: string | null
    countryCode: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    customerName: number
    customerEmail: number
    externalId: number
    status: number
    paymentStatus: number
    subtotalAmountMinor: number
    totalAmountMinor: number
    currency: number
    recipientName: number
    phone: number
    line1: number
    line2: number
    city: number
    province: number
    postalCode: number
    countryCode: number
    idempotencyKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    subtotalAmountMinor?: true
    totalAmountMinor?: true
  }

  export type OrderSumAggregateInputType = {
    subtotalAmountMinor?: true
    totalAmountMinor?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    customerName?: true
    customerEmail?: true
    externalId?: true
    status?: true
    paymentStatus?: true
    subtotalAmountMinor?: true
    totalAmountMinor?: true
    currency?: true
    recipientName?: true
    phone?: true
    line1?: true
    line2?: true
    city?: true
    province?: true
    postalCode?: true
    countryCode?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    customerName?: true
    customerEmail?: true
    externalId?: true
    status?: true
    paymentStatus?: true
    subtotalAmountMinor?: true
    totalAmountMinor?: true
    currency?: true
    recipientName?: true
    phone?: true
    line1?: true
    line2?: true
    city?: true
    province?: true
    postalCode?: true
    countryCode?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    customerName?: true
    customerEmail?: true
    externalId?: true
    status?: true
    paymentStatus?: true
    subtotalAmountMinor?: true
    totalAmountMinor?: true
    currency?: true
    recipientName?: true
    phone?: true
    line1?: true
    line2?: true
    city?: true
    province?: true
    postalCode?: true
    countryCode?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    customerName: string
    customerEmail: string
    externalId: string | null
    status: $Enums.OrderStatus
    paymentStatus: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint
    totalAmountMinor: bigint
    currency: string
    recipientName: string
    phone: string
    line1: string
    line2: string
    city: string
    province: string
    postalCode: string
    countryCode: string
    idempotencyKey: string
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    externalId?: boolean
    status?: boolean
    paymentStatus?: boolean
    subtotalAmountMinor?: boolean
    totalAmountMinor?: boolean
    currency?: boolean
    recipientName?: boolean
    phone?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    province?: boolean
    postalCode?: boolean
    countryCode?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    externalId?: boolean
    status?: boolean
    paymentStatus?: boolean
    subtotalAmountMinor?: boolean
    totalAmountMinor?: boolean
    currency?: boolean
    recipientName?: boolean
    phone?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    province?: boolean
    postalCode?: boolean
    countryCode?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    externalId?: boolean
    status?: boolean
    paymentStatus?: boolean
    subtotalAmountMinor?: boolean
    totalAmountMinor?: boolean
    currency?: boolean
    recipientName?: boolean
    phone?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    province?: boolean
    postalCode?: boolean
    countryCode?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    externalId?: boolean
    status?: boolean
    paymentStatus?: boolean
    subtotalAmountMinor?: boolean
    totalAmountMinor?: boolean
    currency?: boolean
    recipientName?: boolean
    phone?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    province?: boolean
    postalCode?: boolean
    countryCode?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "customerName" | "customerEmail" | "externalId" | "status" | "paymentStatus" | "subtotalAmountMinor" | "totalAmountMinor" | "currency" | "recipientName" | "phone" | "line1" | "line2" | "city" | "province" | "postalCode" | "countryCode" | "idempotencyKey" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      customerName: string
      customerEmail: string
      externalId: string | null
      status: $Enums.OrderStatus
      paymentStatus: $Enums.OrderPaymentStatus
      subtotalAmountMinor: bigint
      totalAmountMinor: bigint
      currency: string
      recipientName: string
      phone: string
      line1: string
      line2: string
      city: string
      province: string
      postalCode: string
      countryCode: string
      idempotencyKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerEmail: FieldRef<"Order", 'String'>
    readonly externalId: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly paymentStatus: FieldRef<"Order", 'OrderPaymentStatus'>
    readonly subtotalAmountMinor: FieldRef<"Order", 'BigInt'>
    readonly totalAmountMinor: FieldRef<"Order", 'BigInt'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly recipientName: FieldRef<"Order", 'String'>
    readonly phone: FieldRef<"Order", 'String'>
    readonly line1: FieldRef<"Order", 'String'>
    readonly line2: FieldRef<"Order", 'String'>
    readonly city: FieldRef<"Order", 'String'>
    readonly province: FieldRef<"Order", 'String'>
    readonly postalCode: FieldRef<"Order", 'String'>
    readonly countryCode: FieldRef<"Order", 'String'>
    readonly idempotencyKey: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    unitPriceAmountMinor: number | null
    lineTotalAmountMinor: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    unitPriceAmountMinor: bigint | null
    lineTotalAmountMinor: bigint | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    productName: string | null
    quantity: number | null
    unitPriceAmountMinor: bigint | null
    lineTotalAmountMinor: bigint | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    productName: string | null
    quantity: number | null
    unitPriceAmountMinor: bigint | null
    lineTotalAmountMinor: bigint | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    productName: number
    quantity: number
    unitPriceAmountMinor: number
    lineTotalAmountMinor: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    unitPriceAmountMinor?: true
    lineTotalAmountMinor?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    unitPriceAmountMinor?: true
    lineTotalAmountMinor?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    quantity?: true
    unitPriceAmountMinor?: true
    lineTotalAmountMinor?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    quantity?: true
    unitPriceAmountMinor?: true
    lineTotalAmountMinor?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    quantity?: true
    unitPriceAmountMinor?: true
    lineTotalAmountMinor?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint
    lineTotalAmountMinor: bigint
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPriceAmountMinor?: boolean
    lineTotalAmountMinor?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPriceAmountMinor?: boolean
    lineTotalAmountMinor?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPriceAmountMinor?: boolean
    lineTotalAmountMinor?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPriceAmountMinor?: boolean
    lineTotalAmountMinor?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "productName" | "quantity" | "unitPriceAmountMinor" | "lineTotalAmountMinor", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      productName: string
      quantity: number
      unitPriceAmountMinor: bigint
      lineTotalAmountMinor: bigint
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly productName: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly unitPriceAmountMinor: FieldRef<"OrderItem", 'BigInt'>
    readonly lineTotalAmountMinor: FieldRef<"OrderItem", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    userId: string | null
    amountMinor: bigint | null
    currency: string | null
    provider: string | null
    providerSessionId: string | null
    providerPaymentId: string | null
    status: $Enums.PaymentStatus | null
    processedEventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    userId: string | null
    amountMinor: bigint | null
    currency: string | null
    provider: string | null
    providerSessionId: string | null
    providerPaymentId: string | null
    status: $Enums.PaymentStatus | null
    processedEventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    orderId: number
    userId: number
    amountMinor: number
    currency: number
    provider: number
    providerSessionId: number
    providerPaymentId: number
    status: number
    processedEventId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentSumAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    amountMinor?: true
    currency?: true
    provider?: true
    providerSessionId?: true
    providerPaymentId?: true
    status?: true
    processedEventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    amountMinor?: true
    currency?: true
    provider?: true
    providerSessionId?: true
    providerPaymentId?: true
    status?: true
    processedEventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    amountMinor?: true
    currency?: true
    provider?: true
    providerSessionId?: true
    providerPaymentId?: true
    status?: true
    processedEventId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    orderId: string
    userId: string
    amountMinor: bigint
    currency: string
    provider: string
    providerSessionId: string | null
    providerPaymentId: string | null
    status: $Enums.PaymentStatus
    processedEventId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    amountMinor?: boolean
    currency?: boolean
    provider?: boolean
    providerSessionId?: boolean
    providerPaymentId?: boolean
    status?: boolean
    processedEventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    amountMinor?: boolean
    currency?: boolean
    provider?: boolean
    providerSessionId?: boolean
    providerPaymentId?: boolean
    status?: boolean
    processedEventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    amountMinor?: boolean
    currency?: boolean
    provider?: boolean
    providerSessionId?: boolean
    providerPaymentId?: boolean
    status?: boolean
    processedEventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    orderId?: boolean
    userId?: boolean
    amountMinor?: boolean
    currency?: boolean
    provider?: boolean
    providerSessionId?: boolean
    providerPaymentId?: boolean
    status?: boolean
    processedEventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "userId" | "amountMinor" | "currency" | "provider" | "providerSessionId" | "providerPaymentId" | "status" | "processedEventId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      userId: string
      amountMinor: bigint
      currency: string
      provider: string
      providerSessionId: string | null
      providerPaymentId: string | null
      status: $Enums.PaymentStatus
      processedEventId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly orderId: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly amountMinor: FieldRef<"Payment", 'BigInt'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly provider: FieldRef<"Payment", 'String'>
    readonly providerSessionId: FieldRef<"Payment", 'String'>
    readonly providerPaymentId: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly processedEventId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
  }


  /**
   * Model ConversationThread
   */

  export type AggregateConversationThread = {
    _count: ConversationThreadCountAggregateOutputType | null
    _min: ConversationThreadMinAggregateOutputType | null
    _max: ConversationThreadMaxAggregateOutputType | null
  }

  export type ConversationThreadMinAggregateOutputType = {
    id: string | null
    userId: string | null
    agentId: string | null
    title: string | null
    status: $Enums.ConversationThreadStatus | null
    archivedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationThreadMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    agentId: string | null
    title: string | null
    status: $Enums.ConversationThreadStatus | null
    archivedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationThreadCountAggregateOutputType = {
    id: number
    userId: number
    agentId: number
    title: number
    status: number
    archivedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationThreadMinAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    title?: true
    status?: true
    archivedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationThreadMaxAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    title?: true
    status?: true
    archivedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationThreadCountAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    title?: true
    status?: true
    archivedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationThread to aggregate.
     */
    where?: ConversationThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationThreads to fetch.
     */
    orderBy?: ConversationThreadOrderByWithRelationInput | ConversationThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversationThreads
    **/
    _count?: true | ConversationThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationThreadMaxAggregateInputType
  }

  export type GetConversationThreadAggregateType<T extends ConversationThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateConversationThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversationThread[P]>
      : GetScalarType<T[P], AggregateConversationThread[P]>
  }




  export type ConversationThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationThreadWhereInput
    orderBy?: ConversationThreadOrderByWithAggregationInput | ConversationThreadOrderByWithAggregationInput[]
    by: ConversationThreadScalarFieldEnum[] | ConversationThreadScalarFieldEnum
    having?: ConversationThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationThreadCountAggregateInputType | true
    _min?: ConversationThreadMinAggregateInputType
    _max?: ConversationThreadMaxAggregateInputType
  }

  export type ConversationThreadGroupByOutputType = {
    id: string
    userId: string
    agentId: string
    title: string
    status: $Enums.ConversationThreadStatus
    archivedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationThreadCountAggregateOutputType | null
    _min: ConversationThreadMinAggregateOutputType | null
    _max: ConversationThreadMaxAggregateOutputType | null
  }

  type GetConversationThreadGroupByPayload<T extends ConversationThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationThreadGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationThreadGroupByOutputType[P]>
        }
      >
    >


  export type ConversationThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    agentId?: boolean
    title?: boolean
    status?: boolean
    archivedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    runs?: boolean | ConversationThread$runsArgs<ExtArgs>
    _count?: boolean | ConversationThreadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationThread"]>

  export type ConversationThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    agentId?: boolean
    title?: boolean
    status?: boolean
    archivedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversationThread"]>

  export type ConversationThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    agentId?: boolean
    title?: boolean
    status?: boolean
    archivedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversationThread"]>

  export type ConversationThreadSelectScalar = {
    id?: boolean
    userId?: boolean
    agentId?: boolean
    title?: boolean
    status?: boolean
    archivedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "agentId" | "title" | "status" | "archivedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["conversationThread"]>
  export type ConversationThreadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | ConversationThread$runsArgs<ExtArgs>
    _count?: boolean | ConversationThreadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationThreadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConversationThreadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConversationThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConversationThread"
    objects: {
      runs: Prisma.$AgentRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      agentId: string
      title: string
      status: $Enums.ConversationThreadStatus
      archivedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversationThread"]>
    composites: {}
  }

  type ConversationThreadGetPayload<S extends boolean | null | undefined | ConversationThreadDefaultArgs> = $Result.GetResult<Prisma.$ConversationThreadPayload, S>

  type ConversationThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationThreadCountAggregateInputType | true
    }

  export interface ConversationThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConversationThread'], meta: { name: 'ConversationThread' } }
    /**
     * Find zero or one ConversationThread that matches the filter.
     * @param {ConversationThreadFindUniqueArgs} args - Arguments to find a ConversationThread
     * @example
     * // Get one ConversationThread
     * const conversationThread = await prisma.conversationThread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationThreadFindUniqueArgs>(args: SelectSubset<T, ConversationThreadFindUniqueArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConversationThread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationThreadFindUniqueOrThrowArgs} args - Arguments to find a ConversationThread
     * @example
     * // Get one ConversationThread
     * const conversationThread = await prisma.conversationThread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationThread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadFindFirstArgs} args - Arguments to find a ConversationThread
     * @example
     * // Get one ConversationThread
     * const conversationThread = await prisma.conversationThread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationThreadFindFirstArgs>(args?: SelectSubset<T, ConversationThreadFindFirstArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationThread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadFindFirstOrThrowArgs} args - Arguments to find a ConversationThread
     * @example
     * // Get one ConversationThread
     * const conversationThread = await prisma.conversationThread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConversationThreads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversationThreads
     * const conversationThreads = await prisma.conversationThread.findMany()
     * 
     * // Get first 10 ConversationThreads
     * const conversationThreads = await prisma.conversationThread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationThreadWithIdOnly = await prisma.conversationThread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationThreadFindManyArgs>(args?: SelectSubset<T, ConversationThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConversationThread.
     * @param {ConversationThreadCreateArgs} args - Arguments to create a ConversationThread.
     * @example
     * // Create one ConversationThread
     * const ConversationThread = await prisma.conversationThread.create({
     *   data: {
     *     // ... data to create a ConversationThread
     *   }
     * })
     * 
     */
    create<T extends ConversationThreadCreateArgs>(args: SelectSubset<T, ConversationThreadCreateArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConversationThreads.
     * @param {ConversationThreadCreateManyArgs} args - Arguments to create many ConversationThreads.
     * @example
     * // Create many ConversationThreads
     * const conversationThread = await prisma.conversationThread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationThreadCreateManyArgs>(args?: SelectSubset<T, ConversationThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConversationThreads and returns the data saved in the database.
     * @param {ConversationThreadCreateManyAndReturnArgs} args - Arguments to create many ConversationThreads.
     * @example
     * // Create many ConversationThreads
     * const conversationThread = await prisma.conversationThread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConversationThreads and only return the `id`
     * const conversationThreadWithIdOnly = await prisma.conversationThread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConversationThread.
     * @param {ConversationThreadDeleteArgs} args - Arguments to delete one ConversationThread.
     * @example
     * // Delete one ConversationThread
     * const ConversationThread = await prisma.conversationThread.delete({
     *   where: {
     *     // ... filter to delete one ConversationThread
     *   }
     * })
     * 
     */
    delete<T extends ConversationThreadDeleteArgs>(args: SelectSubset<T, ConversationThreadDeleteArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConversationThread.
     * @param {ConversationThreadUpdateArgs} args - Arguments to update one ConversationThread.
     * @example
     * // Update one ConversationThread
     * const conversationThread = await prisma.conversationThread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationThreadUpdateArgs>(args: SelectSubset<T, ConversationThreadUpdateArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConversationThreads.
     * @param {ConversationThreadDeleteManyArgs} args - Arguments to filter ConversationThreads to delete.
     * @example
     * // Delete a few ConversationThreads
     * const { count } = await prisma.conversationThread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationThreadDeleteManyArgs>(args?: SelectSubset<T, ConversationThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversationThreads
     * const conversationThread = await prisma.conversationThread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationThreadUpdateManyArgs>(args: SelectSubset<T, ConversationThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationThreads and returns the data updated in the database.
     * @param {ConversationThreadUpdateManyAndReturnArgs} args - Arguments to update many ConversationThreads.
     * @example
     * // Update many ConversationThreads
     * const conversationThread = await prisma.conversationThread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConversationThreads and only return the `id`
     * const conversationThreadWithIdOnly = await prisma.conversationThread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConversationThread.
     * @param {ConversationThreadUpsertArgs} args - Arguments to update or create a ConversationThread.
     * @example
     * // Update or create a ConversationThread
     * const conversationThread = await prisma.conversationThread.upsert({
     *   create: {
     *     // ... data to create a ConversationThread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversationThread we want to update
     *   }
     * })
     */
    upsert<T extends ConversationThreadUpsertArgs>(args: SelectSubset<T, ConversationThreadUpsertArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConversationThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadCountArgs} args - Arguments to filter ConversationThreads to count.
     * @example
     * // Count the number of ConversationThreads
     * const count = await prisma.conversationThread.count({
     *   where: {
     *     // ... the filter for the ConversationThreads we want to count
     *   }
     * })
    **/
    count<T extends ConversationThreadCountArgs>(
      args?: Subset<T, ConversationThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversationThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationThreadAggregateArgs>(args: Subset<T, ConversationThreadAggregateArgs>): Prisma.PrismaPromise<GetConversationThreadAggregateType<T>>

    /**
     * Group by ConversationThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationThreadGroupByArgs['orderBy'] }
        : { orderBy?: ConversationThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConversationThread model
   */
  readonly fields: ConversationThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversationThread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    runs<T extends ConversationThread$runsArgs<ExtArgs> = {}>(args?: Subset<T, ConversationThread$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConversationThread model
   */
  interface ConversationThreadFieldRefs {
    readonly id: FieldRef<"ConversationThread", 'String'>
    readonly userId: FieldRef<"ConversationThread", 'String'>
    readonly agentId: FieldRef<"ConversationThread", 'String'>
    readonly title: FieldRef<"ConversationThread", 'String'>
    readonly status: FieldRef<"ConversationThread", 'ConversationThreadStatus'>
    readonly archivedAt: FieldRef<"ConversationThread", 'DateTime'>
    readonly createdAt: FieldRef<"ConversationThread", 'DateTime'>
    readonly updatedAt: FieldRef<"ConversationThread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConversationThread findUnique
   */
  export type ConversationThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter, which ConversationThread to fetch.
     */
    where: ConversationThreadWhereUniqueInput
  }

  /**
   * ConversationThread findUniqueOrThrow
   */
  export type ConversationThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter, which ConversationThread to fetch.
     */
    where: ConversationThreadWhereUniqueInput
  }

  /**
   * ConversationThread findFirst
   */
  export type ConversationThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter, which ConversationThread to fetch.
     */
    where?: ConversationThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationThreads to fetch.
     */
    orderBy?: ConversationThreadOrderByWithRelationInput | ConversationThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationThreads.
     */
    cursor?: ConversationThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationThreads.
     */
    distinct?: ConversationThreadScalarFieldEnum | ConversationThreadScalarFieldEnum[]
  }

  /**
   * ConversationThread findFirstOrThrow
   */
  export type ConversationThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter, which ConversationThread to fetch.
     */
    where?: ConversationThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationThreads to fetch.
     */
    orderBy?: ConversationThreadOrderByWithRelationInput | ConversationThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationThreads.
     */
    cursor?: ConversationThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationThreads.
     */
    distinct?: ConversationThreadScalarFieldEnum | ConversationThreadScalarFieldEnum[]
  }

  /**
   * ConversationThread findMany
   */
  export type ConversationThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter, which ConversationThreads to fetch.
     */
    where?: ConversationThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationThreads to fetch.
     */
    orderBy?: ConversationThreadOrderByWithRelationInput | ConversationThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversationThreads.
     */
    cursor?: ConversationThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationThreads.
     */
    distinct?: ConversationThreadScalarFieldEnum | ConversationThreadScalarFieldEnum[]
  }

  /**
   * ConversationThread create
   */
  export type ConversationThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * The data needed to create a ConversationThread.
     */
    data: XOR<ConversationThreadCreateInput, ConversationThreadUncheckedCreateInput>
  }

  /**
   * ConversationThread createMany
   */
  export type ConversationThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConversationThreads.
     */
    data: ConversationThreadCreateManyInput | ConversationThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversationThread createManyAndReturn
   */
  export type ConversationThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * The data used to create many ConversationThreads.
     */
    data: ConversationThreadCreateManyInput | ConversationThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversationThread update
   */
  export type ConversationThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * The data needed to update a ConversationThread.
     */
    data: XOR<ConversationThreadUpdateInput, ConversationThreadUncheckedUpdateInput>
    /**
     * Choose, which ConversationThread to update.
     */
    where: ConversationThreadWhereUniqueInput
  }

  /**
   * ConversationThread updateMany
   */
  export type ConversationThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConversationThreads.
     */
    data: XOR<ConversationThreadUpdateManyMutationInput, ConversationThreadUncheckedUpdateManyInput>
    /**
     * Filter which ConversationThreads to update
     */
    where?: ConversationThreadWhereInput
    /**
     * Limit how many ConversationThreads to update.
     */
    limit?: number
  }

  /**
   * ConversationThread updateManyAndReturn
   */
  export type ConversationThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * The data used to update ConversationThreads.
     */
    data: XOR<ConversationThreadUpdateManyMutationInput, ConversationThreadUncheckedUpdateManyInput>
    /**
     * Filter which ConversationThreads to update
     */
    where?: ConversationThreadWhereInput
    /**
     * Limit how many ConversationThreads to update.
     */
    limit?: number
  }

  /**
   * ConversationThread upsert
   */
  export type ConversationThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * The filter to search for the ConversationThread to update in case it exists.
     */
    where: ConversationThreadWhereUniqueInput
    /**
     * In case the ConversationThread found by the `where` argument doesn't exist, create a new ConversationThread with this data.
     */
    create: XOR<ConversationThreadCreateInput, ConversationThreadUncheckedCreateInput>
    /**
     * In case the ConversationThread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationThreadUpdateInput, ConversationThreadUncheckedUpdateInput>
  }

  /**
   * ConversationThread delete
   */
  export type ConversationThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
    /**
     * Filter which ConversationThread to delete.
     */
    where: ConversationThreadWhereUniqueInput
  }

  /**
   * ConversationThread deleteMany
   */
  export type ConversationThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationThreads to delete
     */
    where?: ConversationThreadWhereInput
    /**
     * Limit how many ConversationThreads to delete.
     */
    limit?: number
  }

  /**
   * ConversationThread.runs
   */
  export type ConversationThread$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    cursor?: AgentRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * ConversationThread without action
   */
  export type ConversationThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationThread
     */
    select?: ConversationThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationThread
     */
    omit?: ConversationThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationThreadInclude<ExtArgs> | null
  }


  /**
   * Model AgentRun
   */

  export type AggregateAgentRun = {
    _count: AgentRunCountAggregateOutputType | null
    _avg: AgentRunAvgAggregateOutputType | null
    _sum: AgentRunSumAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  export type AgentRunAvgAggregateOutputType = {
    depth: number | null
  }

  export type AgentRunSumAggregateOutputType = {
    depth: number | null
  }

  export type AgentRunMinAggregateOutputType = {
    id: string | null
    threadId: string | null
    agentId: string | null
    parentRunId: string | null
    rootRunId: string | null
    depth: number | null
    kind: $Enums.AgentRunKind | null
    status: $Enums.AgentRunStatus | null
    startedAt: Date | null
    finishedAt: Date | null
    errorCode: string | null
  }

  export type AgentRunMaxAggregateOutputType = {
    id: string | null
    threadId: string | null
    agentId: string | null
    parentRunId: string | null
    rootRunId: string | null
    depth: number | null
    kind: $Enums.AgentRunKind | null
    status: $Enums.AgentRunStatus | null
    startedAt: Date | null
    finishedAt: Date | null
    errorCode: string | null
  }

  export type AgentRunCountAggregateOutputType = {
    id: number
    threadId: number
    agentId: number
    parentRunId: number
    rootRunId: number
    depth: number
    kind: number
    status: number
    input: number
    startedAt: number
    finishedAt: number
    errorCode: number
    _all: number
  }


  export type AgentRunAvgAggregateInputType = {
    depth?: true
  }

  export type AgentRunSumAggregateInputType = {
    depth?: true
  }

  export type AgentRunMinAggregateInputType = {
    id?: true
    threadId?: true
    agentId?: true
    parentRunId?: true
    rootRunId?: true
    depth?: true
    kind?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    errorCode?: true
  }

  export type AgentRunMaxAggregateInputType = {
    id?: true
    threadId?: true
    agentId?: true
    parentRunId?: true
    rootRunId?: true
    depth?: true
    kind?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    errorCode?: true
  }

  export type AgentRunCountAggregateInputType = {
    id?: true
    threadId?: true
    agentId?: true
    parentRunId?: true
    rootRunId?: true
    depth?: true
    kind?: true
    status?: true
    input?: true
    startedAt?: true
    finishedAt?: true
    errorCode?: true
    _all?: true
  }

  export type AgentRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRun to aggregate.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentRuns
    **/
    _count?: true | AgentRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentRunMaxAggregateInputType
  }

  export type GetAgentRunAggregateType<T extends AgentRunAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentRun[P]>
      : GetScalarType<T[P], AggregateAgentRun[P]>
  }




  export type AgentRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithAggregationInput | AgentRunOrderByWithAggregationInput[]
    by: AgentRunScalarFieldEnum[] | AgentRunScalarFieldEnum
    having?: AgentRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentRunCountAggregateInputType | true
    _avg?: AgentRunAvgAggregateInputType
    _sum?: AgentRunSumAggregateInputType
    _min?: AgentRunMinAggregateInputType
    _max?: AgentRunMaxAggregateInputType
  }

  export type AgentRunGroupByOutputType = {
    id: string
    threadId: string
    agentId: string
    parentRunId: string | null
    rootRunId: string
    depth: number
    kind: $Enums.AgentRunKind
    status: $Enums.AgentRunStatus
    input: JsonValue
    startedAt: Date
    finishedAt: Date | null
    errorCode: string | null
    _count: AgentRunCountAggregateOutputType | null
    _avg: AgentRunAvgAggregateOutputType | null
    _sum: AgentRunSumAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  type GetAgentRunGroupByPayload<T extends AgentRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
            : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
        }
      >
    >


  export type AgentRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    agentId?: boolean
    parentRunId?: boolean
    rootRunId?: boolean
    depth?: boolean
    kind?: boolean
    status?: boolean
    input?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    errorCode?: boolean
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
    events?: boolean | AgentRun$eventsArgs<ExtArgs>
    _count?: boolean | AgentRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    agentId?: boolean
    parentRunId?: boolean
    rootRunId?: boolean
    depth?: boolean
    kind?: boolean
    status?: boolean
    input?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    errorCode?: boolean
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    agentId?: boolean
    parentRunId?: boolean
    rootRunId?: boolean
    depth?: boolean
    kind?: boolean
    status?: boolean
    input?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    errorCode?: boolean
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectScalar = {
    id?: boolean
    threadId?: boolean
    agentId?: boolean
    parentRunId?: boolean
    rootRunId?: boolean
    depth?: boolean
    kind?: boolean
    status?: boolean
    input?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    errorCode?: boolean
  }

  export type AgentRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "agentId" | "parentRunId" | "rootRunId" | "depth" | "kind" | "status" | "input" | "startedAt" | "finishedAt" | "errorCode", ExtArgs["result"]["agentRun"]>
  export type AgentRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
    events?: boolean | AgentRun$eventsArgs<ExtArgs>
    _count?: boolean | AgentRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
  }
  export type AgentRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ConversationThreadDefaultArgs<ExtArgs>
  }

  export type $AgentRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentRun"
    objects: {
      thread: Prisma.$ConversationThreadPayload<ExtArgs>
      events: Prisma.$AgentEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      threadId: string
      agentId: string
      parentRunId: string | null
      rootRunId: string
      depth: number
      kind: $Enums.AgentRunKind
      status: $Enums.AgentRunStatus
      input: Prisma.JsonValue
      startedAt: Date
      finishedAt: Date | null
      errorCode: string | null
    }, ExtArgs["result"]["agentRun"]>
    composites: {}
  }

  type AgentRunGetPayload<S extends boolean | null | undefined | AgentRunDefaultArgs> = $Result.GetResult<Prisma.$AgentRunPayload, S>

  type AgentRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentRunCountAggregateInputType | true
    }

  export interface AgentRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentRun'], meta: { name: 'AgentRun' } }
    /**
     * Find zero or one AgentRun that matches the filter.
     * @param {AgentRunFindUniqueArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentRunFindUniqueArgs>(args: SelectSubset<T, AgentRunFindUniqueArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentRunFindUniqueOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentRunFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentRunFindFirstArgs>(args?: SelectSubset<T, AgentRunFindFirstArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentRunFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentRuns
     * const agentRuns = await prisma.agentRun.findMany()
     * 
     * // Get first 10 AgentRuns
     * const agentRuns = await prisma.agentRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentRunFindManyArgs>(args?: SelectSubset<T, AgentRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentRun.
     * @param {AgentRunCreateArgs} args - Arguments to create a AgentRun.
     * @example
     * // Create one AgentRun
     * const AgentRun = await prisma.agentRun.create({
     *   data: {
     *     // ... data to create a AgentRun
     *   }
     * })
     * 
     */
    create<T extends AgentRunCreateArgs>(args: SelectSubset<T, AgentRunCreateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentRuns.
     * @param {AgentRunCreateManyArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentRunCreateManyArgs>(args?: SelectSubset<T, AgentRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentRuns and returns the data saved in the database.
     * @param {AgentRunCreateManyAndReturnArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentRunCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentRun.
     * @param {AgentRunDeleteArgs} args - Arguments to delete one AgentRun.
     * @example
     * // Delete one AgentRun
     * const AgentRun = await prisma.agentRun.delete({
     *   where: {
     *     // ... filter to delete one AgentRun
     *   }
     * })
     * 
     */
    delete<T extends AgentRunDeleteArgs>(args: SelectSubset<T, AgentRunDeleteArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentRun.
     * @param {AgentRunUpdateArgs} args - Arguments to update one AgentRun.
     * @example
     * // Update one AgentRun
     * const agentRun = await prisma.agentRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentRunUpdateArgs>(args: SelectSubset<T, AgentRunUpdateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentRuns.
     * @param {AgentRunDeleteManyArgs} args - Arguments to filter AgentRuns to delete.
     * @example
     * // Delete a few AgentRuns
     * const { count } = await prisma.agentRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentRunDeleteManyArgs>(args?: SelectSubset<T, AgentRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentRunUpdateManyArgs>(args: SelectSubset<T, AgentRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns and returns the data updated in the database.
     * @param {AgentRunUpdateManyAndReturnArgs} args - Arguments to update many AgentRuns.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentRunUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentRun.
     * @param {AgentRunUpsertArgs} args - Arguments to update or create a AgentRun.
     * @example
     * // Update or create a AgentRun
     * const agentRun = await prisma.agentRun.upsert({
     *   create: {
     *     // ... data to create a AgentRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentRun we want to update
     *   }
     * })
     */
    upsert<T extends AgentRunUpsertArgs>(args: SelectSubset<T, AgentRunUpsertArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunCountArgs} args - Arguments to filter AgentRuns to count.
     * @example
     * // Count the number of AgentRuns
     * const count = await prisma.agentRun.count({
     *   where: {
     *     // ... the filter for the AgentRuns we want to count
     *   }
     * })
    **/
    count<T extends AgentRunCountArgs>(
      args?: Subset<T, AgentRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentRunAggregateArgs>(args: Subset<T, AgentRunAggregateArgs>): Prisma.PrismaPromise<GetAgentRunAggregateType<T>>

    /**
     * Group by AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentRunGroupByArgs['orderBy'] }
        : { orderBy?: AgentRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentRun model
   */
  readonly fields: AgentRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    thread<T extends ConversationThreadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationThreadDefaultArgs<ExtArgs>>): Prisma__ConversationThreadClient<$Result.GetResult<Prisma.$ConversationThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends AgentRun$eventsArgs<ExtArgs> = {}>(args?: Subset<T, AgentRun$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentRun model
   */
  interface AgentRunFieldRefs {
    readonly id: FieldRef<"AgentRun", 'String'>
    readonly threadId: FieldRef<"AgentRun", 'String'>
    readonly agentId: FieldRef<"AgentRun", 'String'>
    readonly parentRunId: FieldRef<"AgentRun", 'String'>
    readonly rootRunId: FieldRef<"AgentRun", 'String'>
    readonly depth: FieldRef<"AgentRun", 'Int'>
    readonly kind: FieldRef<"AgentRun", 'AgentRunKind'>
    readonly status: FieldRef<"AgentRun", 'AgentRunStatus'>
    readonly input: FieldRef<"AgentRun", 'Json'>
    readonly startedAt: FieldRef<"AgentRun", 'DateTime'>
    readonly finishedAt: FieldRef<"AgentRun", 'DateTime'>
    readonly errorCode: FieldRef<"AgentRun", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentRun findUnique
   */
  export type AgentRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findUniqueOrThrow
   */
  export type AgentRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findFirst
   */
  export type AgentRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findFirstOrThrow
   */
  export type AgentRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findMany
   */
  export type AgentRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRuns to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun create
   */
  export type AgentRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentRun.
     */
    data: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
  }

  /**
   * AgentRun createMany
   */
  export type AgentRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentRun createManyAndReturn
   */
  export type AgentRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun update
   */
  export type AgentRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentRun.
     */
    data: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
    /**
     * Choose, which AgentRun to update.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun updateMany
   */
  export type AgentRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
  }

  /**
   * AgentRun updateManyAndReturn
   */
  export type AgentRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun upsert
   */
  export type AgentRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentRun to update in case it exists.
     */
    where: AgentRunWhereUniqueInput
    /**
     * In case the AgentRun found by the `where` argument doesn't exist, create a new AgentRun with this data.
     */
    create: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
    /**
     * In case the AgentRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
  }

  /**
   * AgentRun delete
   */
  export type AgentRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter which AgentRun to delete.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun deleteMany
   */
  export type AgentRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRuns to delete
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to delete.
     */
    limit?: number
  }

  /**
   * AgentRun.events
   */
  export type AgentRun$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    where?: AgentEventWhereInput
    orderBy?: AgentEventOrderByWithRelationInput | AgentEventOrderByWithRelationInput[]
    cursor?: AgentEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentEventScalarFieldEnum | AgentEventScalarFieldEnum[]
  }

  /**
   * AgentRun without action
   */
  export type AgentRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
  }


  /**
   * Model AgentEvent
   */

  export type AggregateAgentEvent = {
    _count: AgentEventCountAggregateOutputType | null
    _avg: AgentEventAvgAggregateOutputType | null
    _sum: AgentEventSumAggregateOutputType | null
    _min: AgentEventMinAggregateOutputType | null
    _max: AgentEventMaxAggregateOutputType | null
  }

  export type AgentEventAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AgentEventSumAggregateOutputType = {
    sequence: number | null
  }

  export type AgentEventMinAggregateOutputType = {
    runId: string | null
    threadId: string | null
    sequence: number | null
    createdAt: Date | null
  }

  export type AgentEventMaxAggregateOutputType = {
    runId: string | null
    threadId: string | null
    sequence: number | null
    createdAt: Date | null
  }

  export type AgentEventCountAggregateOutputType = {
    runId: number
    threadId: number
    sequence: number
    event: number
    createdAt: number
    _all: number
  }


  export type AgentEventAvgAggregateInputType = {
    sequence?: true
  }

  export type AgentEventSumAggregateInputType = {
    sequence?: true
  }

  export type AgentEventMinAggregateInputType = {
    runId?: true
    threadId?: true
    sequence?: true
    createdAt?: true
  }

  export type AgentEventMaxAggregateInputType = {
    runId?: true
    threadId?: true
    sequence?: true
    createdAt?: true
  }

  export type AgentEventCountAggregateInputType = {
    runId?: true
    threadId?: true
    sequence?: true
    event?: true
    createdAt?: true
    _all?: true
  }

  export type AgentEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentEvent to aggregate.
     */
    where?: AgentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentEvents to fetch.
     */
    orderBy?: AgentEventOrderByWithRelationInput | AgentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentEvents
    **/
    _count?: true | AgentEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentEventMaxAggregateInputType
  }

  export type GetAgentEventAggregateType<T extends AgentEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentEvent[P]>
      : GetScalarType<T[P], AggregateAgentEvent[P]>
  }




  export type AgentEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentEventWhereInput
    orderBy?: AgentEventOrderByWithAggregationInput | AgentEventOrderByWithAggregationInput[]
    by: AgentEventScalarFieldEnum[] | AgentEventScalarFieldEnum
    having?: AgentEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentEventCountAggregateInputType | true
    _avg?: AgentEventAvgAggregateInputType
    _sum?: AgentEventSumAggregateInputType
    _min?: AgentEventMinAggregateInputType
    _max?: AgentEventMaxAggregateInputType
  }

  export type AgentEventGroupByOutputType = {
    runId: string
    threadId: string
    sequence: number
    event: JsonValue
    createdAt: Date
    _count: AgentEventCountAggregateOutputType | null
    _avg: AgentEventAvgAggregateOutputType | null
    _sum: AgentEventSumAggregateOutputType | null
    _min: AgentEventMinAggregateOutputType | null
    _max: AgentEventMaxAggregateOutputType | null
  }

  type GetAgentEventGroupByPayload<T extends AgentEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentEventGroupByOutputType[P]>
            : GetScalarType<T[P], AgentEventGroupByOutputType[P]>
        }
      >
    >


  export type AgentEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    threadId?: boolean
    sequence?: boolean
    event?: boolean
    createdAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentEvent"]>

  export type AgentEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    threadId?: boolean
    sequence?: boolean
    event?: boolean
    createdAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentEvent"]>

  export type AgentEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    runId?: boolean
    threadId?: boolean
    sequence?: boolean
    event?: boolean
    createdAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentEvent"]>

  export type AgentEventSelectScalar = {
    runId?: boolean
    threadId?: boolean
    sequence?: boolean
    event?: boolean
    createdAt?: boolean
  }

  export type AgentEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"runId" | "threadId" | "sequence" | "event" | "createdAt", ExtArgs["result"]["agentEvent"]>
  export type AgentEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }
  export type AgentEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }
  export type AgentEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }

  export type $AgentEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentEvent"
    objects: {
      run: Prisma.$AgentRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      runId: string
      threadId: string
      sequence: number
      event: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["agentEvent"]>
    composites: {}
  }

  type AgentEventGetPayload<S extends boolean | null | undefined | AgentEventDefaultArgs> = $Result.GetResult<Prisma.$AgentEventPayload, S>

  type AgentEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentEventCountAggregateInputType | true
    }

  export interface AgentEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentEvent'], meta: { name: 'AgentEvent' } }
    /**
     * Find zero or one AgentEvent that matches the filter.
     * @param {AgentEventFindUniqueArgs} args - Arguments to find a AgentEvent
     * @example
     * // Get one AgentEvent
     * const agentEvent = await prisma.agentEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentEventFindUniqueArgs>(args: SelectSubset<T, AgentEventFindUniqueArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentEventFindUniqueOrThrowArgs} args - Arguments to find a AgentEvent
     * @example
     * // Get one AgentEvent
     * const agentEvent = await prisma.agentEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventFindFirstArgs} args - Arguments to find a AgentEvent
     * @example
     * // Get one AgentEvent
     * const agentEvent = await prisma.agentEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentEventFindFirstArgs>(args?: SelectSubset<T, AgentEventFindFirstArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventFindFirstOrThrowArgs} args - Arguments to find a AgentEvent
     * @example
     * // Get one AgentEvent
     * const agentEvent = await prisma.agentEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentEvents
     * const agentEvents = await prisma.agentEvent.findMany()
     * 
     * // Get first 10 AgentEvents
     * const agentEvents = await prisma.agentEvent.findMany({ take: 10 })
     * 
     * // Only select the `runId`
     * const agentEventWithRunIdOnly = await prisma.agentEvent.findMany({ select: { runId: true } })
     * 
     */
    findMany<T extends AgentEventFindManyArgs>(args?: SelectSubset<T, AgentEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentEvent.
     * @param {AgentEventCreateArgs} args - Arguments to create a AgentEvent.
     * @example
     * // Create one AgentEvent
     * const AgentEvent = await prisma.agentEvent.create({
     *   data: {
     *     // ... data to create a AgentEvent
     *   }
     * })
     * 
     */
    create<T extends AgentEventCreateArgs>(args: SelectSubset<T, AgentEventCreateArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentEvents.
     * @param {AgentEventCreateManyArgs} args - Arguments to create many AgentEvents.
     * @example
     * // Create many AgentEvents
     * const agentEvent = await prisma.agentEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentEventCreateManyArgs>(args?: SelectSubset<T, AgentEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentEvents and returns the data saved in the database.
     * @param {AgentEventCreateManyAndReturnArgs} args - Arguments to create many AgentEvents.
     * @example
     * // Create many AgentEvents
     * const agentEvent = await prisma.agentEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentEvents and only return the `runId`
     * const agentEventWithRunIdOnly = await prisma.agentEvent.createManyAndReturn({
     *   select: { runId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentEvent.
     * @param {AgentEventDeleteArgs} args - Arguments to delete one AgentEvent.
     * @example
     * // Delete one AgentEvent
     * const AgentEvent = await prisma.agentEvent.delete({
     *   where: {
     *     // ... filter to delete one AgentEvent
     *   }
     * })
     * 
     */
    delete<T extends AgentEventDeleteArgs>(args: SelectSubset<T, AgentEventDeleteArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentEvent.
     * @param {AgentEventUpdateArgs} args - Arguments to update one AgentEvent.
     * @example
     * // Update one AgentEvent
     * const agentEvent = await prisma.agentEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentEventUpdateArgs>(args: SelectSubset<T, AgentEventUpdateArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentEvents.
     * @param {AgentEventDeleteManyArgs} args - Arguments to filter AgentEvents to delete.
     * @example
     * // Delete a few AgentEvents
     * const { count } = await prisma.agentEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentEventDeleteManyArgs>(args?: SelectSubset<T, AgentEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentEvents
     * const agentEvent = await prisma.agentEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentEventUpdateManyArgs>(args: SelectSubset<T, AgentEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentEvents and returns the data updated in the database.
     * @param {AgentEventUpdateManyAndReturnArgs} args - Arguments to update many AgentEvents.
     * @example
     * // Update many AgentEvents
     * const agentEvent = await prisma.agentEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentEvents and only return the `runId`
     * const agentEventWithRunIdOnly = await prisma.agentEvent.updateManyAndReturn({
     *   select: { runId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentEvent.
     * @param {AgentEventUpsertArgs} args - Arguments to update or create a AgentEvent.
     * @example
     * // Update or create a AgentEvent
     * const agentEvent = await prisma.agentEvent.upsert({
     *   create: {
     *     // ... data to create a AgentEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentEvent we want to update
     *   }
     * })
     */
    upsert<T extends AgentEventUpsertArgs>(args: SelectSubset<T, AgentEventUpsertArgs<ExtArgs>>): Prisma__AgentEventClient<$Result.GetResult<Prisma.$AgentEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventCountArgs} args - Arguments to filter AgentEvents to count.
     * @example
     * // Count the number of AgentEvents
     * const count = await prisma.agentEvent.count({
     *   where: {
     *     // ... the filter for the AgentEvents we want to count
     *   }
     * })
    **/
    count<T extends AgentEventCountArgs>(
      args?: Subset<T, AgentEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentEventAggregateArgs>(args: Subset<T, AgentEventAggregateArgs>): Prisma.PrismaPromise<GetAgentEventAggregateType<T>>

    /**
     * Group by AgentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentEventGroupByArgs['orderBy'] }
        : { orderBy?: AgentEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentEvent model
   */
  readonly fields: AgentEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends AgentRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentRunDefaultArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentEvent model
   */
  interface AgentEventFieldRefs {
    readonly runId: FieldRef<"AgentEvent", 'String'>
    readonly threadId: FieldRef<"AgentEvent", 'String'>
    readonly sequence: FieldRef<"AgentEvent", 'Int'>
    readonly event: FieldRef<"AgentEvent", 'Json'>
    readonly createdAt: FieldRef<"AgentEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentEvent findUnique
   */
  export type AgentEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter, which AgentEvent to fetch.
     */
    where: AgentEventWhereUniqueInput
  }

  /**
   * AgentEvent findUniqueOrThrow
   */
  export type AgentEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter, which AgentEvent to fetch.
     */
    where: AgentEventWhereUniqueInput
  }

  /**
   * AgentEvent findFirst
   */
  export type AgentEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter, which AgentEvent to fetch.
     */
    where?: AgentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentEvents to fetch.
     */
    orderBy?: AgentEventOrderByWithRelationInput | AgentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentEvents.
     */
    cursor?: AgentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentEvents.
     */
    distinct?: AgentEventScalarFieldEnum | AgentEventScalarFieldEnum[]
  }

  /**
   * AgentEvent findFirstOrThrow
   */
  export type AgentEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter, which AgentEvent to fetch.
     */
    where?: AgentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentEvents to fetch.
     */
    orderBy?: AgentEventOrderByWithRelationInput | AgentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentEvents.
     */
    cursor?: AgentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentEvents.
     */
    distinct?: AgentEventScalarFieldEnum | AgentEventScalarFieldEnum[]
  }

  /**
   * AgentEvent findMany
   */
  export type AgentEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter, which AgentEvents to fetch.
     */
    where?: AgentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentEvents to fetch.
     */
    orderBy?: AgentEventOrderByWithRelationInput | AgentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentEvents.
     */
    cursor?: AgentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentEvents.
     */
    distinct?: AgentEventScalarFieldEnum | AgentEventScalarFieldEnum[]
  }

  /**
   * AgentEvent create
   */
  export type AgentEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentEvent.
     */
    data: XOR<AgentEventCreateInput, AgentEventUncheckedCreateInput>
  }

  /**
   * AgentEvent createMany
   */
  export type AgentEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentEvents.
     */
    data: AgentEventCreateManyInput | AgentEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentEvent createManyAndReturn
   */
  export type AgentEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * The data used to create many AgentEvents.
     */
    data: AgentEventCreateManyInput | AgentEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentEvent update
   */
  export type AgentEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentEvent.
     */
    data: XOR<AgentEventUpdateInput, AgentEventUncheckedUpdateInput>
    /**
     * Choose, which AgentEvent to update.
     */
    where: AgentEventWhereUniqueInput
  }

  /**
   * AgentEvent updateMany
   */
  export type AgentEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentEvents.
     */
    data: XOR<AgentEventUpdateManyMutationInput, AgentEventUncheckedUpdateManyInput>
    /**
     * Filter which AgentEvents to update
     */
    where?: AgentEventWhereInput
    /**
     * Limit how many AgentEvents to update.
     */
    limit?: number
  }

  /**
   * AgentEvent updateManyAndReturn
   */
  export type AgentEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * The data used to update AgentEvents.
     */
    data: XOR<AgentEventUpdateManyMutationInput, AgentEventUncheckedUpdateManyInput>
    /**
     * Filter which AgentEvents to update
     */
    where?: AgentEventWhereInput
    /**
     * Limit how many AgentEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentEvent upsert
   */
  export type AgentEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentEvent to update in case it exists.
     */
    where: AgentEventWhereUniqueInput
    /**
     * In case the AgentEvent found by the `where` argument doesn't exist, create a new AgentEvent with this data.
     */
    create: XOR<AgentEventCreateInput, AgentEventUncheckedCreateInput>
    /**
     * In case the AgentEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentEventUpdateInput, AgentEventUncheckedUpdateInput>
  }

  /**
   * AgentEvent delete
   */
  export type AgentEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
    /**
     * Filter which AgentEvent to delete.
     */
    where: AgentEventWhereUniqueInput
  }

  /**
   * AgentEvent deleteMany
   */
  export type AgentEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentEvents to delete
     */
    where?: AgentEventWhereInput
    /**
     * Limit how many AgentEvents to delete.
     */
    limit?: number
  }

  /**
   * AgentEvent without action
   */
  export type AgentEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentEvent
     */
    select?: AgentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentEvent
     */
    omit?: AgentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    sku: 'sku',
    slug: 'slug',
    name: 'name',
    categorySlug: 'categorySlug',
    description: 'description',
    images: 'images',
    reorderPoint: 'reorderPoint',
    priceAmountMinor: 'priceAmountMinor',
    currency: 'currency',
    stockQuantity: 'stockQuantity',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const StockReservationScalarFieldEnum: {
    reservationId: 'reservationId',
    status: 'status',
    createdAt: 'createdAt',
    releasedAt: 'releasedAt'
  };

  export type StockReservationScalarFieldEnum = (typeof StockReservationScalarFieldEnum)[keyof typeof StockReservationScalarFieldEnum]


  export const StockReservationItemScalarFieldEnum: {
    reservationId: 'reservationId',
    productId: 'productId',
    quantity: 'quantity'
  };

  export type StockReservationItemScalarFieldEnum = (typeof StockReservationItemScalarFieldEnum)[keyof typeof StockReservationItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    externalId: 'externalId',
    status: 'status',
    paymentStatus: 'paymentStatus',
    subtotalAmountMinor: 'subtotalAmountMinor',
    totalAmountMinor: 'totalAmountMinor',
    currency: 'currency',
    recipientName: 'recipientName',
    phone: 'phone',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    province: 'province',
    postalCode: 'postalCode',
    countryCode: 'countryCode',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    productName: 'productName',
    quantity: 'quantity',
    unitPriceAmountMinor: 'unitPriceAmountMinor',
    lineTotalAmountMinor: 'lineTotalAmountMinor'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    userId: 'userId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    provider: 'provider',
    providerSessionId: 'providerSessionId',
    providerPaymentId: 'providerPaymentId',
    status: 'status',
    processedEventId: 'processedEventId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ConversationThreadScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    agentId: 'agentId',
    title: 'title',
    status: 'status',
    archivedAt: 'archivedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationThreadScalarFieldEnum = (typeof ConversationThreadScalarFieldEnum)[keyof typeof ConversationThreadScalarFieldEnum]


  export const AgentRunScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    agentId: 'agentId',
    parentRunId: 'parentRunId',
    rootRunId: 'rootRunId',
    depth: 'depth',
    kind: 'kind',
    status: 'status',
    input: 'input',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    errorCode: 'errorCode'
  };

  export type AgentRunScalarFieldEnum = (typeof AgentRunScalarFieldEnum)[keyof typeof AgentRunScalarFieldEnum]


  export const AgentEventScalarFieldEnum: {
    runId: 'runId',
    threadId: 'threadId',
    sequence: 'sequence',
    event: 'event',
    createdAt: 'createdAt'
  };

  export type AgentEventScalarFieldEnum = (typeof AgentEventScalarFieldEnum)[keyof typeof AgentEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ReservationStatus'
   */
  export type EnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus'>
    


  /**
   * Reference to a field of type 'ReservationStatus[]'
   */
  export type ListEnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'OrderPaymentStatus'
   */
  export type EnumOrderPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPaymentStatus'>
    


  /**
   * Reference to a field of type 'OrderPaymentStatus[]'
   */
  export type ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPaymentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'ConversationThreadStatus'
   */
  export type EnumConversationThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationThreadStatus'>
    


  /**
   * Reference to a field of type 'ConversationThreadStatus[]'
   */
  export type ListEnumConversationThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationThreadStatus[]'>
    


  /**
   * Reference to a field of type 'AgentRunKind'
   */
  export type EnumAgentRunKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentRunKind'>
    


  /**
   * Reference to a field of type 'AgentRunKind[]'
   */
  export type ListEnumAgentRunKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentRunKind[]'>
    


  /**
   * Reference to a field of type 'AgentRunStatus'
   */
  export type EnumAgentRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentRunStatus'>
    


  /**
   * Reference to a field of type 'AgentRunStatus[]'
   */
  export type ListEnumAgentRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentRunStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    externalId?: StringNullableFilter<"Product"> | string | null
    sku?: StringNullableFilter<"Product"> | string | null
    slug?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    categorySlug?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    images?: JsonNullableFilter<"Product">
    reorderPoint?: IntFilter<"Product"> | number
    priceAmountMinor?: BigIntFilter<"Product"> | bigint | number
    currency?: StringFilter<"Product"> | string
    stockQuantity?: IntFilter<"Product"> | number
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    reservationItems?: StockReservationItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    slug?: SortOrder
    name?: SortOrder
    categorySlug?: SortOrder
    description?: SortOrder
    images?: SortOrderInput | SortOrder
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    currency?: SortOrder
    stockQuantity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reservationItems?: StockReservationItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    sku?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    categorySlug?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    images?: JsonNullableFilter<"Product">
    reorderPoint?: IntFilter<"Product"> | number
    priceAmountMinor?: BigIntFilter<"Product"> | bigint | number
    currency?: StringFilter<"Product"> | string
    stockQuantity?: IntFilter<"Product"> | number
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    reservationItems?: StockReservationItemListRelationFilter
  }, "id" | "externalId" | "sku" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    slug?: SortOrder
    name?: SortOrder
    categorySlug?: SortOrder
    description?: SortOrder
    images?: SortOrderInput | SortOrder
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    currency?: SortOrder
    stockQuantity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    externalId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null
    slug?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    categorySlug?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    images?: JsonNullableWithAggregatesFilter<"Product">
    reorderPoint?: IntWithAggregatesFilter<"Product"> | number
    priceAmountMinor?: BigIntWithAggregatesFilter<"Product"> | bigint | number
    currency?: StringWithAggregatesFilter<"Product"> | string
    stockQuantity?: IntWithAggregatesFilter<"Product"> | number
    status?: EnumProductStatusWithAggregatesFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type StockReservationWhereInput = {
    AND?: StockReservationWhereInput | StockReservationWhereInput[]
    OR?: StockReservationWhereInput[]
    NOT?: StockReservationWhereInput | StockReservationWhereInput[]
    reservationId?: StringFilter<"StockReservation"> | string
    status?: EnumReservationStatusFilter<"StockReservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeFilter<"StockReservation"> | Date | string
    releasedAt?: DateTimeNullableFilter<"StockReservation"> | Date | string | null
    items?: StockReservationItemListRelationFilter
  }

  export type StockReservationOrderByWithRelationInput = {
    reservationId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    releasedAt?: SortOrderInput | SortOrder
    items?: StockReservationItemOrderByRelationAggregateInput
  }

  export type StockReservationWhereUniqueInput = Prisma.AtLeast<{
    reservationId?: string
    AND?: StockReservationWhereInput | StockReservationWhereInput[]
    OR?: StockReservationWhereInput[]
    NOT?: StockReservationWhereInput | StockReservationWhereInput[]
    status?: EnumReservationStatusFilter<"StockReservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeFilter<"StockReservation"> | Date | string
    releasedAt?: DateTimeNullableFilter<"StockReservation"> | Date | string | null
    items?: StockReservationItemListRelationFilter
  }, "reservationId">

  export type StockReservationOrderByWithAggregationInput = {
    reservationId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    releasedAt?: SortOrderInput | SortOrder
    _count?: StockReservationCountOrderByAggregateInput
    _max?: StockReservationMaxOrderByAggregateInput
    _min?: StockReservationMinOrderByAggregateInput
  }

  export type StockReservationScalarWhereWithAggregatesInput = {
    AND?: StockReservationScalarWhereWithAggregatesInput | StockReservationScalarWhereWithAggregatesInput[]
    OR?: StockReservationScalarWhereWithAggregatesInput[]
    NOT?: StockReservationScalarWhereWithAggregatesInput | StockReservationScalarWhereWithAggregatesInput[]
    reservationId?: StringWithAggregatesFilter<"StockReservation"> | string
    status?: EnumReservationStatusWithAggregatesFilter<"StockReservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeWithAggregatesFilter<"StockReservation"> | Date | string
    releasedAt?: DateTimeNullableWithAggregatesFilter<"StockReservation"> | Date | string | null
  }

  export type StockReservationItemWhereInput = {
    AND?: StockReservationItemWhereInput | StockReservationItemWhereInput[]
    OR?: StockReservationItemWhereInput[]
    NOT?: StockReservationItemWhereInput | StockReservationItemWhereInput[]
    reservationId?: StringFilter<"StockReservationItem"> | string
    productId?: StringFilter<"StockReservationItem"> | string
    quantity?: IntFilter<"StockReservationItem"> | number
    reservation?: XOR<StockReservationScalarRelationFilter, StockReservationWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type StockReservationItemOrderByWithRelationInput = {
    reservationId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reservation?: StockReservationOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type StockReservationItemWhereUniqueInput = Prisma.AtLeast<{
    reservationId_productId?: StockReservationItemReservationIdProductIdCompoundUniqueInput
    AND?: StockReservationItemWhereInput | StockReservationItemWhereInput[]
    OR?: StockReservationItemWhereInput[]
    NOT?: StockReservationItemWhereInput | StockReservationItemWhereInput[]
    reservationId?: StringFilter<"StockReservationItem"> | string
    productId?: StringFilter<"StockReservationItem"> | string
    quantity?: IntFilter<"StockReservationItem"> | number
    reservation?: XOR<StockReservationScalarRelationFilter, StockReservationWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "reservationId_productId">

  export type StockReservationItemOrderByWithAggregationInput = {
    reservationId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    _count?: StockReservationItemCountOrderByAggregateInput
    _avg?: StockReservationItemAvgOrderByAggregateInput
    _max?: StockReservationItemMaxOrderByAggregateInput
    _min?: StockReservationItemMinOrderByAggregateInput
    _sum?: StockReservationItemSumOrderByAggregateInput
  }

  export type StockReservationItemScalarWhereWithAggregatesInput = {
    AND?: StockReservationItemScalarWhereWithAggregatesInput | StockReservationItemScalarWhereWithAggregatesInput[]
    OR?: StockReservationItemScalarWhereWithAggregatesInput[]
    NOT?: StockReservationItemScalarWhereWithAggregatesInput | StockReservationItemScalarWhereWithAggregatesInput[]
    reservationId?: StringWithAggregatesFilter<"StockReservationItem"> | string
    productId?: StringWithAggregatesFilter<"StockReservationItem"> | string
    quantity?: IntWithAggregatesFilter<"StockReservationItem"> | number
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerEmail?: StringFilter<"Order"> | string
    externalId?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFilter<"Order"> | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFilter<"Order"> | bigint | number
    totalAmountMinor?: BigIntFilter<"Order"> | bigint | number
    currency?: StringFilter<"Order"> | string
    recipientName?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    line1?: StringFilter<"Order"> | string
    line2?: StringFilter<"Order"> | string
    city?: StringFilter<"Order"> | string
    province?: StringFilter<"Order"> | string
    postalCode?: StringFilter<"Order"> | string
    countryCode?: StringFilter<"Order"> | string
    idempotencyKey?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    externalId?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
    currency?: SortOrder
    recipientName?: SortOrder
    phone?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    countryCode?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    userId_idempotencyKey?: OrderUserIdIdempotencyKeyCompoundUniqueInput
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerEmail?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFilter<"Order"> | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFilter<"Order"> | bigint | number
    totalAmountMinor?: BigIntFilter<"Order"> | bigint | number
    currency?: StringFilter<"Order"> | string
    recipientName?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    line1?: StringFilter<"Order"> | string
    line2?: StringFilter<"Order"> | string
    city?: StringFilter<"Order"> | string
    province?: StringFilter<"Order"> | string
    postalCode?: StringFilter<"Order"> | string
    countryCode?: StringFilter<"Order"> | string
    idempotencyKey?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }, "id" | "externalId" | "userId_idempotencyKey">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    externalId?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
    currency?: SortOrder
    recipientName?: SortOrder
    phone?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    countryCode?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    customerName?: StringWithAggregatesFilter<"Order"> | string
    customerEmail?: StringWithAggregatesFilter<"Order"> | string
    externalId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusWithAggregatesFilter<"Order"> | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntWithAggregatesFilter<"Order"> | bigint | number
    totalAmountMinor?: BigIntWithAggregatesFilter<"Order"> | bigint | number
    currency?: StringWithAggregatesFilter<"Order"> | string
    recipientName?: StringWithAggregatesFilter<"Order"> | string
    phone?: StringWithAggregatesFilter<"Order"> | string
    line1?: StringWithAggregatesFilter<"Order"> | string
    line2?: StringWithAggregatesFilter<"Order"> | string
    city?: StringWithAggregatesFilter<"Order"> | string
    province?: StringWithAggregatesFilter<"Order"> | string
    postalCode?: StringWithAggregatesFilter<"Order"> | string
    countryCode?: StringWithAggregatesFilter<"Order"> | string
    idempotencyKey?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPriceAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
    lineTotalAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPriceAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
    lineTotalAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    productName?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    unitPriceAmountMinor?: BigIntWithAggregatesFilter<"OrderItem"> | bigint | number
    lineTotalAmountMinor?: BigIntWithAggregatesFilter<"OrderItem"> | bigint | number
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    orderId?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amountMinor?: BigIntFilter<"Payment"> | bigint | number
    currency?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    providerSessionId?: StringNullableFilter<"Payment"> | string | null
    providerPaymentId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    processedEventId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerSessionId?: SortOrderInput | SortOrder
    providerPaymentId?: SortOrderInput | SortOrder
    status?: SortOrder
    processedEventId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    providerSessionId?: string
    processedEventId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    amountMinor?: BigIntFilter<"Payment"> | bigint | number
    currency?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    providerPaymentId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }, "id" | "orderId" | "providerSessionId" | "processedEventId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerSessionId?: SortOrderInput | SortOrder
    providerPaymentId?: SortOrderInput | SortOrder
    status?: SortOrder
    processedEventId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    orderId?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    amountMinor?: BigIntWithAggregatesFilter<"Payment"> | bigint | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    provider?: StringWithAggregatesFilter<"Payment"> | string
    providerSessionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    providerPaymentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    processedEventId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ConversationThreadWhereInput = {
    AND?: ConversationThreadWhereInput | ConversationThreadWhereInput[]
    OR?: ConversationThreadWhereInput[]
    NOT?: ConversationThreadWhereInput | ConversationThreadWhereInput[]
    id?: StringFilter<"ConversationThread"> | string
    userId?: StringFilter<"ConversationThread"> | string
    agentId?: StringFilter<"ConversationThread"> | string
    title?: StringFilter<"ConversationThread"> | string
    status?: EnumConversationThreadStatusFilter<"ConversationThread"> | $Enums.ConversationThreadStatus
    archivedAt?: DateTimeNullableFilter<"ConversationThread"> | Date | string | null
    createdAt?: DateTimeFilter<"ConversationThread"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationThread"> | Date | string
    runs?: AgentRunListRelationFilter
  }

  export type ConversationThreadOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    runs?: AgentRunOrderByRelationAggregateInput
  }

  export type ConversationThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationThreadWhereInput | ConversationThreadWhereInput[]
    OR?: ConversationThreadWhereInput[]
    NOT?: ConversationThreadWhereInput | ConversationThreadWhereInput[]
    userId?: StringFilter<"ConversationThread"> | string
    agentId?: StringFilter<"ConversationThread"> | string
    title?: StringFilter<"ConversationThread"> | string
    status?: EnumConversationThreadStatusFilter<"ConversationThread"> | $Enums.ConversationThreadStatus
    archivedAt?: DateTimeNullableFilter<"ConversationThread"> | Date | string | null
    createdAt?: DateTimeFilter<"ConversationThread"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationThread"> | Date | string
    runs?: AgentRunListRelationFilter
  }, "id">

  export type ConversationThreadOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationThreadCountOrderByAggregateInput
    _max?: ConversationThreadMaxOrderByAggregateInput
    _min?: ConversationThreadMinOrderByAggregateInput
  }

  export type ConversationThreadScalarWhereWithAggregatesInput = {
    AND?: ConversationThreadScalarWhereWithAggregatesInput | ConversationThreadScalarWhereWithAggregatesInput[]
    OR?: ConversationThreadScalarWhereWithAggregatesInput[]
    NOT?: ConversationThreadScalarWhereWithAggregatesInput | ConversationThreadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConversationThread"> | string
    userId?: StringWithAggregatesFilter<"ConversationThread"> | string
    agentId?: StringWithAggregatesFilter<"ConversationThread"> | string
    title?: StringWithAggregatesFilter<"ConversationThread"> | string
    status?: EnumConversationThreadStatusWithAggregatesFilter<"ConversationThread"> | $Enums.ConversationThreadStatus
    archivedAt?: DateTimeNullableWithAggregatesFilter<"ConversationThread"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ConversationThread"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConversationThread"> | Date | string
  }

  export type AgentRunWhereInput = {
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    threadId?: StringFilter<"AgentRun"> | string
    agentId?: StringFilter<"AgentRun"> | string
    parentRunId?: StringNullableFilter<"AgentRun"> | string | null
    rootRunId?: StringFilter<"AgentRun"> | string
    depth?: IntFilter<"AgentRun"> | number
    kind?: EnumAgentRunKindFilter<"AgentRun"> | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFilter<"AgentRun"> | $Enums.AgentRunStatus
    input?: JsonFilter<"AgentRun">
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
    errorCode?: StringNullableFilter<"AgentRun"> | string | null
    thread?: XOR<ConversationThreadScalarRelationFilter, ConversationThreadWhereInput>
    events?: AgentEventListRelationFilter
  }

  export type AgentRunOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    agentId?: SortOrder
    parentRunId?: SortOrderInput | SortOrder
    rootRunId?: SortOrder
    depth?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    input?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    thread?: ConversationThreadOrderByWithRelationInput
    events?: AgentEventOrderByRelationAggregateInput
  }

  export type AgentRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    threadId?: StringFilter<"AgentRun"> | string
    agentId?: StringFilter<"AgentRun"> | string
    parentRunId?: StringNullableFilter<"AgentRun"> | string | null
    rootRunId?: StringFilter<"AgentRun"> | string
    depth?: IntFilter<"AgentRun"> | number
    kind?: EnumAgentRunKindFilter<"AgentRun"> | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFilter<"AgentRun"> | $Enums.AgentRunStatus
    input?: JsonFilter<"AgentRun">
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
    errorCode?: StringNullableFilter<"AgentRun"> | string | null
    thread?: XOR<ConversationThreadScalarRelationFilter, ConversationThreadWhereInput>
    events?: AgentEventListRelationFilter
  }, "id">

  export type AgentRunOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    agentId?: SortOrder
    parentRunId?: SortOrderInput | SortOrder
    rootRunId?: SortOrder
    depth?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    input?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    _count?: AgentRunCountOrderByAggregateInput
    _avg?: AgentRunAvgOrderByAggregateInput
    _max?: AgentRunMaxOrderByAggregateInput
    _min?: AgentRunMinOrderByAggregateInput
    _sum?: AgentRunSumOrderByAggregateInput
  }

  export type AgentRunScalarWhereWithAggregatesInput = {
    AND?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    OR?: AgentRunScalarWhereWithAggregatesInput[]
    NOT?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentRun"> | string
    threadId?: StringWithAggregatesFilter<"AgentRun"> | string
    agentId?: StringWithAggregatesFilter<"AgentRun"> | string
    parentRunId?: StringNullableWithAggregatesFilter<"AgentRun"> | string | null
    rootRunId?: StringWithAggregatesFilter<"AgentRun"> | string
    depth?: IntWithAggregatesFilter<"AgentRun"> | number
    kind?: EnumAgentRunKindWithAggregatesFilter<"AgentRun"> | $Enums.AgentRunKind
    status?: EnumAgentRunStatusWithAggregatesFilter<"AgentRun"> | $Enums.AgentRunStatus
    input?: JsonWithAggregatesFilter<"AgentRun">
    startedAt?: DateTimeWithAggregatesFilter<"AgentRun"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"AgentRun"> | Date | string | null
    errorCode?: StringNullableWithAggregatesFilter<"AgentRun"> | string | null
  }

  export type AgentEventWhereInput = {
    AND?: AgentEventWhereInput | AgentEventWhereInput[]
    OR?: AgentEventWhereInput[]
    NOT?: AgentEventWhereInput | AgentEventWhereInput[]
    runId?: StringFilter<"AgentEvent"> | string
    threadId?: StringFilter<"AgentEvent"> | string
    sequence?: IntFilter<"AgentEvent"> | number
    event?: JsonFilter<"AgentEvent">
    createdAt?: DateTimeFilter<"AgentEvent"> | Date | string
    run?: XOR<AgentRunScalarRelationFilter, AgentRunWhereInput>
  }

  export type AgentEventOrderByWithRelationInput = {
    runId?: SortOrder
    threadId?: SortOrder
    sequence?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    run?: AgentRunOrderByWithRelationInput
  }

  export type AgentEventWhereUniqueInput = Prisma.AtLeast<{
    runId_sequence?: AgentEventRunIdSequenceCompoundUniqueInput
    AND?: AgentEventWhereInput | AgentEventWhereInput[]
    OR?: AgentEventWhereInput[]
    NOT?: AgentEventWhereInput | AgentEventWhereInput[]
    runId?: StringFilter<"AgentEvent"> | string
    threadId?: StringFilter<"AgentEvent"> | string
    sequence?: IntFilter<"AgentEvent"> | number
    event?: JsonFilter<"AgentEvent">
    createdAt?: DateTimeFilter<"AgentEvent"> | Date | string
    run?: XOR<AgentRunScalarRelationFilter, AgentRunWhereInput>
  }, "runId_sequence">

  export type AgentEventOrderByWithAggregationInput = {
    runId?: SortOrder
    threadId?: SortOrder
    sequence?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    _count?: AgentEventCountOrderByAggregateInput
    _avg?: AgentEventAvgOrderByAggregateInput
    _max?: AgentEventMaxOrderByAggregateInput
    _min?: AgentEventMinOrderByAggregateInput
    _sum?: AgentEventSumOrderByAggregateInput
  }

  export type AgentEventScalarWhereWithAggregatesInput = {
    AND?: AgentEventScalarWhereWithAggregatesInput | AgentEventScalarWhereWithAggregatesInput[]
    OR?: AgentEventScalarWhereWithAggregatesInput[]
    NOT?: AgentEventScalarWhereWithAggregatesInput | AgentEventScalarWhereWithAggregatesInput[]
    runId?: StringWithAggregatesFilter<"AgentEvent"> | string
    threadId?: StringWithAggregatesFilter<"AgentEvent"> | string
    sequence?: IntWithAggregatesFilter<"AgentEvent"> | number
    event?: JsonWithAggregatesFilter<"AgentEvent">
    createdAt?: DateTimeWithAggregatesFilter<"AgentEvent"> | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    externalId?: string | null
    sku?: string | null
    slug: string
    name: string
    categorySlug?: string
    description?: string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: number
    priceAmountMinor: bigint | number
    currency?: string
    stockQuantity?: number
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reservationItems?: StockReservationItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    externalId?: string | null
    sku?: string | null
    slug: string
    name: string
    categorySlug?: string
    description?: string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: number
    priceAmountMinor: bigint | number
    currency?: string
    stockQuantity?: number
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reservationItems?: StockReservationItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationItems?: StockReservationItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationItems?: StockReservationItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    externalId?: string | null
    sku?: string | null
    slug: string
    name: string
    categorySlug?: string
    description?: string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: number
    priceAmountMinor: bigint | number
    currency?: string
    stockQuantity?: number
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationCreateInput = {
    reservationId: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    releasedAt?: Date | string | null
    items?: StockReservationItemCreateNestedManyWithoutReservationInput
  }

  export type StockReservationUncheckedCreateInput = {
    reservationId: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    releasedAt?: Date | string | null
    items?: StockReservationItemUncheckedCreateNestedManyWithoutReservationInput
  }

  export type StockReservationUpdateInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: StockReservationItemUpdateManyWithoutReservationNestedInput
  }

  export type StockReservationUncheckedUpdateInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: StockReservationItemUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type StockReservationCreateManyInput = {
    reservationId: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    releasedAt?: Date | string | null
  }

  export type StockReservationUpdateManyMutationInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StockReservationUncheckedUpdateManyInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StockReservationItemCreateInput = {
    quantity: number
    reservation: StockReservationCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutReservationItemsInput
  }

  export type StockReservationItemUncheckedCreateInput = {
    reservationId: string
    productId: string
    quantity: number
  }

  export type StockReservationItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    reservation?: StockReservationUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutReservationItemsNestedInput
  }

  export type StockReservationItemUncheckedUpdateInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StockReservationItemCreateManyInput = {
    reservationId: string
    productId: string
    quantity: number
  }

  export type StockReservationItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StockReservationItemUncheckedUpdateManyInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderCreateInput = {
    id?: string
    userId: string
    customerName?: string
    customerEmail?: string
    externalId?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint | number
    totalAmountMinor: bigint | number
    currency?: string
    recipientName: string
    phone: string
    line1: string
    line2?: string
    city: string
    province?: string
    postalCode?: string
    countryCode: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId: string
    customerName?: string
    customerEmail?: string
    externalId?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint | number
    totalAmountMinor: bigint | number
    currency?: string
    recipientName: string
    phone: string
    line1: string
    line2?: string
    city: string
    province?: string
    postalCode?: string
    countryCode: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    userId: string
    customerName?: string
    customerEmail?: string
    externalId?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint | number
    totalAmountMinor: bigint | number
    currency?: string
    recipientName: string
    phone: string
    line1: string
    line2?: string
    city: string
    province?: string
    postalCode?: string
    countryCode: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PaymentCreateInput = {
    id?: string
    orderId: string
    userId: string
    amountMinor: bigint | number
    currency: string
    provider?: string
    providerSessionId?: string | null
    providerPaymentId?: string | null
    status?: $Enums.PaymentStatus
    processedEventId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    orderId: string
    userId: string
    amountMinor: bigint | number
    currency: string
    provider?: string
    providerSessionId?: string | null
    providerPaymentId?: string | null
    status?: $Enums.PaymentStatus
    processedEventId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    processedEventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    processedEventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    orderId: string
    userId: string
    amountMinor: bigint | number
    currency: string
    provider?: string
    providerSessionId?: string | null
    providerPaymentId?: string | null
    status?: $Enums.PaymentStatus
    processedEventId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    processedEventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    processedEventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationThreadCreateInput = {
    id?: string
    userId: string
    agentId: string
    title?: string
    status?: $Enums.ConversationThreadStatus
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunCreateNestedManyWithoutThreadInput
  }

  export type ConversationThreadUncheckedCreateInput = {
    id?: string
    userId: string
    agentId: string
    title?: string
    status?: $Enums.ConversationThreadStatus
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ConversationThreadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUpdateManyWithoutThreadNestedInput
  }

  export type ConversationThreadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ConversationThreadCreateManyInput = {
    id?: string
    userId: string
    agentId: string
    title?: string
    status?: $Enums.ConversationThreadStatus
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationThreadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationThreadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateInput = {
    id?: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
    thread: ConversationThreadCreateNestedOneWithoutRunsInput
    events?: AgentEventCreateNestedManyWithoutRunInput
  }

  export type AgentRunUncheckedCreateInput = {
    id?: string
    threadId: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
    events?: AgentEventUncheckedCreateNestedManyWithoutRunInput
  }

  export type AgentRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    thread?: ConversationThreadUpdateOneRequiredWithoutRunsNestedInput
    events?: AgentEventUpdateManyWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AgentEventUncheckedUpdateManyWithoutRunNestedInput
  }

  export type AgentRunCreateManyInput = {
    id?: string
    threadId: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
  }

  export type AgentRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentEventCreateInput = {
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: AgentRunCreateNestedOneWithoutEventsInput
  }

  export type AgentEventUncheckedCreateInput = {
    runId: string
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentEventUpdateInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: AgentRunUpdateOneRequiredWithoutEventsNestedInput
  }

  export type AgentEventUncheckedUpdateInput = {
    runId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentEventCreateManyInput = {
    runId: string
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentEventUpdateManyMutationInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentEventUncheckedUpdateManyInput = {
    runId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StockReservationItemListRelationFilter = {
    every?: StockReservationItemWhereInput
    some?: StockReservationItemWhereInput
    none?: StockReservationItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StockReservationItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    categorySlug?: SortOrder
    description?: SortOrder
    images?: SortOrder
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    currency?: SortOrder
    stockQuantity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    stockQuantity?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    categorySlug?: SortOrder
    description?: SortOrder
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    currency?: SortOrder
    stockQuantity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    categorySlug?: SortOrder
    description?: SortOrder
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    currency?: SortOrder
    stockQuantity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    reorderPoint?: SortOrder
    priceAmountMinor?: SortOrder
    stockQuantity?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StockReservationCountOrderByAggregateInput = {
    reservationId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    releasedAt?: SortOrder
  }

  export type StockReservationMaxOrderByAggregateInput = {
    reservationId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    releasedAt?: SortOrder
  }

  export type StockReservationMinOrderByAggregateInput = {
    reservationId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    releasedAt?: SortOrder
  }

  export type EnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StockReservationScalarRelationFilter = {
    is?: StockReservationWhereInput
    isNot?: StockReservationWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type StockReservationItemReservationIdProductIdCompoundUniqueInput = {
    reservationId: string
    productId: string
  }

  export type StockReservationItemCountOrderByAggregateInput = {
    reservationId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type StockReservationItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StockReservationItemMaxOrderByAggregateInput = {
    reservationId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type StockReservationItemMinOrderByAggregateInput = {
    reservationId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type StockReservationItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumOrderPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPaymentStatus | EnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPaymentStatusFilter<$PrismaModel> | $Enums.OrderPaymentStatus
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderUserIdIdempotencyKeyCompoundUniqueInput = {
    userId: string
    idempotencyKey: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    externalId?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
    currency?: SortOrder
    recipientName?: SortOrder
    phone?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    countryCode?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    externalId?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
    currency?: SortOrder
    recipientName?: SortOrder
    phone?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    countryCode?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    externalId?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
    currency?: SortOrder
    recipientName?: SortOrder
    phone?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    countryCode?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    subtotalAmountMinor?: SortOrder
    totalAmountMinor?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumOrderPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPaymentStatus | EnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderPaymentStatusFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPriceAmountMinor?: SortOrder
    lineTotalAmountMinor?: SortOrder
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerSessionId?: SortOrder
    providerPaymentId?: SortOrder
    status?: SortOrder
    processedEventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerSessionId?: SortOrder
    providerPaymentId?: SortOrder
    status?: SortOrder
    processedEventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerSessionId?: SortOrder
    providerPaymentId?: SortOrder
    status?: SortOrder
    processedEventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumConversationThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusFilter<$PrismaModel> | $Enums.ConversationThreadStatus
  }

  export type AgentRunListRelationFilter = {
    every?: AgentRunWhereInput
    some?: AgentRunWhereInput
    none?: AgentRunWhereInput
  }

  export type AgentRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationThreadCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    archivedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    archivedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationThreadMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    archivedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConversationThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
  }

  export type EnumAgentRunKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunKind | EnumAgentRunKindFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunKindFilter<$PrismaModel> | $Enums.AgentRunKind
  }

  export type EnumAgentRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunStatus | EnumAgentRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunStatusFilter<$PrismaModel> | $Enums.AgentRunStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConversationThreadScalarRelationFilter = {
    is?: ConversationThreadWhereInput
    isNot?: ConversationThreadWhereInput
  }

  export type AgentEventListRelationFilter = {
    every?: AgentEventWhereInput
    some?: AgentEventWhereInput
    none?: AgentEventWhereInput
  }

  export type AgentEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentRunCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    agentId?: SortOrder
    parentRunId?: SortOrder
    rootRunId?: SortOrder
    depth?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    input?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    errorCode?: SortOrder
  }

  export type AgentRunAvgOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type AgentRunMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    agentId?: SortOrder
    parentRunId?: SortOrder
    rootRunId?: SortOrder
    depth?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    errorCode?: SortOrder
  }

  export type AgentRunMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    agentId?: SortOrder
    parentRunId?: SortOrder
    rootRunId?: SortOrder
    depth?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    errorCode?: SortOrder
  }

  export type AgentRunSumOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type EnumAgentRunKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunKind | EnumAgentRunKindFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunKindWithAggregatesFilter<$PrismaModel> | $Enums.AgentRunKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentRunKindFilter<$PrismaModel>
    _max?: NestedEnumAgentRunKindFilter<$PrismaModel>
  }

  export type EnumAgentRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunStatus | EnumAgentRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentRunStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentRunStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AgentRunScalarRelationFilter = {
    is?: AgentRunWhereInput
    isNot?: AgentRunWhereInput
  }

  export type AgentEventRunIdSequenceCompoundUniqueInput = {
    runId: string
    sequence: number
  }

  export type AgentEventCountOrderByAggregateInput = {
    runId?: SortOrder
    threadId?: SortOrder
    sequence?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentEventAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AgentEventMaxOrderByAggregateInput = {
    runId?: SortOrder
    threadId?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentEventMinOrderByAggregateInput = {
    runId?: SortOrder
    threadId?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentEventSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type StockReservationItemCreateNestedManyWithoutProductInput = {
    create?: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput> | StockReservationItemCreateWithoutProductInput[] | StockReservationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutProductInput | StockReservationItemCreateOrConnectWithoutProductInput[]
    createMany?: StockReservationItemCreateManyProductInputEnvelope
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
  }

  export type StockReservationItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput> | StockReservationItemCreateWithoutProductInput[] | StockReservationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutProductInput | StockReservationItemCreateOrConnectWithoutProductInput[]
    createMany?: StockReservationItemCreateManyProductInputEnvelope
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StockReservationItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput> | StockReservationItemCreateWithoutProductInput[] | StockReservationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutProductInput | StockReservationItemCreateOrConnectWithoutProductInput[]
    upsert?: StockReservationItemUpsertWithWhereUniqueWithoutProductInput | StockReservationItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockReservationItemCreateManyProductInputEnvelope
    set?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    disconnect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    delete?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    update?: StockReservationItemUpdateWithWhereUniqueWithoutProductInput | StockReservationItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockReservationItemUpdateManyWithWhereWithoutProductInput | StockReservationItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
  }

  export type StockReservationItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput> | StockReservationItemCreateWithoutProductInput[] | StockReservationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutProductInput | StockReservationItemCreateOrConnectWithoutProductInput[]
    upsert?: StockReservationItemUpsertWithWhereUniqueWithoutProductInput | StockReservationItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockReservationItemCreateManyProductInputEnvelope
    set?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    disconnect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    delete?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    update?: StockReservationItemUpdateWithWhereUniqueWithoutProductInput | StockReservationItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockReservationItemUpdateManyWithWhereWithoutProductInput | StockReservationItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
  }

  export type StockReservationItemCreateNestedManyWithoutReservationInput = {
    create?: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput> | StockReservationItemCreateWithoutReservationInput[] | StockReservationItemUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutReservationInput | StockReservationItemCreateOrConnectWithoutReservationInput[]
    createMany?: StockReservationItemCreateManyReservationInputEnvelope
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
  }

  export type StockReservationItemUncheckedCreateNestedManyWithoutReservationInput = {
    create?: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput> | StockReservationItemCreateWithoutReservationInput[] | StockReservationItemUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutReservationInput | StockReservationItemCreateOrConnectWithoutReservationInput[]
    createMany?: StockReservationItemCreateManyReservationInputEnvelope
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
  }

  export type EnumReservationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReservationStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StockReservationItemUpdateManyWithoutReservationNestedInput = {
    create?: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput> | StockReservationItemCreateWithoutReservationInput[] | StockReservationItemUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutReservationInput | StockReservationItemCreateOrConnectWithoutReservationInput[]
    upsert?: StockReservationItemUpsertWithWhereUniqueWithoutReservationInput | StockReservationItemUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: StockReservationItemCreateManyReservationInputEnvelope
    set?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    disconnect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    delete?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    update?: StockReservationItemUpdateWithWhereUniqueWithoutReservationInput | StockReservationItemUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: StockReservationItemUpdateManyWithWhereWithoutReservationInput | StockReservationItemUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
  }

  export type StockReservationItemUncheckedUpdateManyWithoutReservationNestedInput = {
    create?: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput> | StockReservationItemCreateWithoutReservationInput[] | StockReservationItemUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: StockReservationItemCreateOrConnectWithoutReservationInput | StockReservationItemCreateOrConnectWithoutReservationInput[]
    upsert?: StockReservationItemUpsertWithWhereUniqueWithoutReservationInput | StockReservationItemUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: StockReservationItemCreateManyReservationInputEnvelope
    set?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    disconnect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    delete?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    connect?: StockReservationItemWhereUniqueInput | StockReservationItemWhereUniqueInput[]
    update?: StockReservationItemUpdateWithWhereUniqueWithoutReservationInput | StockReservationItemUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: StockReservationItemUpdateManyWithWhereWithoutReservationInput | StockReservationItemUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
  }

  export type StockReservationCreateNestedOneWithoutItemsInput = {
    create?: XOR<StockReservationCreateWithoutItemsInput, StockReservationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockReservationCreateOrConnectWithoutItemsInput
    connect?: StockReservationWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReservationItemsInput = {
    create?: XOR<ProductCreateWithoutReservationItemsInput, ProductUncheckedCreateWithoutReservationItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReservationItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type StockReservationUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<StockReservationCreateWithoutItemsInput, StockReservationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockReservationCreateOrConnectWithoutItemsInput
    upsert?: StockReservationUpsertWithoutItemsInput
    connect?: StockReservationWhereUniqueInput
    update?: XOR<XOR<StockReservationUpdateToOneWithWhereWithoutItemsInput, StockReservationUpdateWithoutItemsInput>, StockReservationUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutReservationItemsNestedInput = {
    create?: XOR<ProductCreateWithoutReservationItemsInput, ProductUncheckedCreateWithoutReservationItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReservationItemsInput
    upsert?: ProductUpsertWithoutReservationItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReservationItemsInput, ProductUpdateWithoutReservationItemsInput>, ProductUncheckedUpdateWithoutReservationItemsInput>
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumOrderPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderPaymentStatus
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type AgentRunCreateNestedManyWithoutThreadInput = {
    create?: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput> | AgentRunCreateWithoutThreadInput[] | AgentRunUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutThreadInput | AgentRunCreateOrConnectWithoutThreadInput[]
    createMany?: AgentRunCreateManyThreadInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type AgentRunUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput> | AgentRunCreateWithoutThreadInput[] | AgentRunUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutThreadInput | AgentRunCreateOrConnectWithoutThreadInput[]
    createMany?: AgentRunCreateManyThreadInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type EnumConversationThreadStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConversationThreadStatus
  }

  export type AgentRunUpdateManyWithoutThreadNestedInput = {
    create?: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput> | AgentRunCreateWithoutThreadInput[] | AgentRunUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutThreadInput | AgentRunCreateOrConnectWithoutThreadInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutThreadInput | AgentRunUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: AgentRunCreateManyThreadInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutThreadInput | AgentRunUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutThreadInput | AgentRunUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type AgentRunUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput> | AgentRunCreateWithoutThreadInput[] | AgentRunUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutThreadInput | AgentRunCreateOrConnectWithoutThreadInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutThreadInput | AgentRunUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: AgentRunCreateManyThreadInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutThreadInput | AgentRunUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutThreadInput | AgentRunUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type ConversationThreadCreateNestedOneWithoutRunsInput = {
    create?: XOR<ConversationThreadCreateWithoutRunsInput, ConversationThreadUncheckedCreateWithoutRunsInput>
    connectOrCreate?: ConversationThreadCreateOrConnectWithoutRunsInput
    connect?: ConversationThreadWhereUniqueInput
  }

  export type AgentEventCreateNestedManyWithoutRunInput = {
    create?: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput> | AgentEventCreateWithoutRunInput[] | AgentEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: AgentEventCreateOrConnectWithoutRunInput | AgentEventCreateOrConnectWithoutRunInput[]
    createMany?: AgentEventCreateManyRunInputEnvelope
    connect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
  }

  export type AgentEventUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput> | AgentEventCreateWithoutRunInput[] | AgentEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: AgentEventCreateOrConnectWithoutRunInput | AgentEventCreateOrConnectWithoutRunInput[]
    createMany?: AgentEventCreateManyRunInputEnvelope
    connect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
  }

  export type EnumAgentRunKindFieldUpdateOperationsInput = {
    set?: $Enums.AgentRunKind
  }

  export type EnumAgentRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentRunStatus
  }

  export type ConversationThreadUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<ConversationThreadCreateWithoutRunsInput, ConversationThreadUncheckedCreateWithoutRunsInput>
    connectOrCreate?: ConversationThreadCreateOrConnectWithoutRunsInput
    upsert?: ConversationThreadUpsertWithoutRunsInput
    connect?: ConversationThreadWhereUniqueInput
    update?: XOR<XOR<ConversationThreadUpdateToOneWithWhereWithoutRunsInput, ConversationThreadUpdateWithoutRunsInput>, ConversationThreadUncheckedUpdateWithoutRunsInput>
  }

  export type AgentEventUpdateManyWithoutRunNestedInput = {
    create?: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput> | AgentEventCreateWithoutRunInput[] | AgentEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: AgentEventCreateOrConnectWithoutRunInput | AgentEventCreateOrConnectWithoutRunInput[]
    upsert?: AgentEventUpsertWithWhereUniqueWithoutRunInput | AgentEventUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: AgentEventCreateManyRunInputEnvelope
    set?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    disconnect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    delete?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    connect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    update?: AgentEventUpdateWithWhereUniqueWithoutRunInput | AgentEventUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: AgentEventUpdateManyWithWhereWithoutRunInput | AgentEventUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: AgentEventScalarWhereInput | AgentEventScalarWhereInput[]
  }

  export type AgentEventUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput> | AgentEventCreateWithoutRunInput[] | AgentEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: AgentEventCreateOrConnectWithoutRunInput | AgentEventCreateOrConnectWithoutRunInput[]
    upsert?: AgentEventUpsertWithWhereUniqueWithoutRunInput | AgentEventUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: AgentEventCreateManyRunInputEnvelope
    set?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    disconnect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    delete?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    connect?: AgentEventWhereUniqueInput | AgentEventWhereUniqueInput[]
    update?: AgentEventUpdateWithWhereUniqueWithoutRunInput | AgentEventUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: AgentEventUpdateManyWithWhereWithoutRunInput | AgentEventUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: AgentEventScalarWhereInput | AgentEventScalarWhereInput[]
  }

  export type AgentRunCreateNestedOneWithoutEventsInput = {
    create?: XOR<AgentRunCreateWithoutEventsInput, AgentRunUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AgentRunCreateOrConnectWithoutEventsInput
    connect?: AgentRunWhereUniqueInput
  }

  export type AgentRunUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<AgentRunCreateWithoutEventsInput, AgentRunUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AgentRunCreateOrConnectWithoutEventsInput
    upsert?: AgentRunUpsertWithoutEventsInput
    connect?: AgentRunWhereUniqueInput
    update?: XOR<XOR<AgentRunUpdateToOneWithWhereWithoutEventsInput, AgentRunUpdateWithoutEventsInput>, AgentRunUncheckedUpdateWithoutEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPaymentStatus | EnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPaymentStatusFilter<$PrismaModel> | $Enums.OrderPaymentStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPaymentStatus | EnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPaymentStatus[] | ListEnumOrderPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumConversationThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusFilter<$PrismaModel> | $Enums.ConversationThreadStatus
  }

  export type NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
  }

  export type NestedEnumAgentRunKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunKind | EnumAgentRunKindFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunKindFilter<$PrismaModel> | $Enums.AgentRunKind
  }

  export type NestedEnumAgentRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunStatus | EnumAgentRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunStatusFilter<$PrismaModel> | $Enums.AgentRunStatus
  }

  export type NestedEnumAgentRunKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunKind | EnumAgentRunKindFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunKind[] | ListEnumAgentRunKindFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunKindWithAggregatesFilter<$PrismaModel> | $Enums.AgentRunKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentRunKindFilter<$PrismaModel>
    _max?: NestedEnumAgentRunKindFilter<$PrismaModel>
  }

  export type NestedEnumAgentRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentRunStatus | EnumAgentRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentRunStatus[] | ListEnumAgentRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentRunStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentRunStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StockReservationItemCreateWithoutProductInput = {
    quantity: number
    reservation: StockReservationCreateNestedOneWithoutItemsInput
  }

  export type StockReservationItemUncheckedCreateWithoutProductInput = {
    reservationId: string
    quantity: number
  }

  export type StockReservationItemCreateOrConnectWithoutProductInput = {
    where: StockReservationItemWhereUniqueInput
    create: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput>
  }

  export type StockReservationItemCreateManyProductInputEnvelope = {
    data: StockReservationItemCreateManyProductInput | StockReservationItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StockReservationItemUpsertWithWhereUniqueWithoutProductInput = {
    where: StockReservationItemWhereUniqueInput
    update: XOR<StockReservationItemUpdateWithoutProductInput, StockReservationItemUncheckedUpdateWithoutProductInput>
    create: XOR<StockReservationItemCreateWithoutProductInput, StockReservationItemUncheckedCreateWithoutProductInput>
  }

  export type StockReservationItemUpdateWithWhereUniqueWithoutProductInput = {
    where: StockReservationItemWhereUniqueInput
    data: XOR<StockReservationItemUpdateWithoutProductInput, StockReservationItemUncheckedUpdateWithoutProductInput>
  }

  export type StockReservationItemUpdateManyWithWhereWithoutProductInput = {
    where: StockReservationItemScalarWhereInput
    data: XOR<StockReservationItemUpdateManyMutationInput, StockReservationItemUncheckedUpdateManyWithoutProductInput>
  }

  export type StockReservationItemScalarWhereInput = {
    AND?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
    OR?: StockReservationItemScalarWhereInput[]
    NOT?: StockReservationItemScalarWhereInput | StockReservationItemScalarWhereInput[]
    reservationId?: StringFilter<"StockReservationItem"> | string
    productId?: StringFilter<"StockReservationItem"> | string
    quantity?: IntFilter<"StockReservationItem"> | number
  }

  export type StockReservationItemCreateWithoutReservationInput = {
    quantity: number
    product: ProductCreateNestedOneWithoutReservationItemsInput
  }

  export type StockReservationItemUncheckedCreateWithoutReservationInput = {
    productId: string
    quantity: number
  }

  export type StockReservationItemCreateOrConnectWithoutReservationInput = {
    where: StockReservationItemWhereUniqueInput
    create: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput>
  }

  export type StockReservationItemCreateManyReservationInputEnvelope = {
    data: StockReservationItemCreateManyReservationInput | StockReservationItemCreateManyReservationInput[]
    skipDuplicates?: boolean
  }

  export type StockReservationItemUpsertWithWhereUniqueWithoutReservationInput = {
    where: StockReservationItemWhereUniqueInput
    update: XOR<StockReservationItemUpdateWithoutReservationInput, StockReservationItemUncheckedUpdateWithoutReservationInput>
    create: XOR<StockReservationItemCreateWithoutReservationInput, StockReservationItemUncheckedCreateWithoutReservationInput>
  }

  export type StockReservationItemUpdateWithWhereUniqueWithoutReservationInput = {
    where: StockReservationItemWhereUniqueInput
    data: XOR<StockReservationItemUpdateWithoutReservationInput, StockReservationItemUncheckedUpdateWithoutReservationInput>
  }

  export type StockReservationItemUpdateManyWithWhereWithoutReservationInput = {
    where: StockReservationItemScalarWhereInput
    data: XOR<StockReservationItemUpdateManyMutationInput, StockReservationItemUncheckedUpdateManyWithoutReservationInput>
  }

  export type StockReservationCreateWithoutItemsInput = {
    reservationId: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    releasedAt?: Date | string | null
  }

  export type StockReservationUncheckedCreateWithoutItemsInput = {
    reservationId: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    releasedAt?: Date | string | null
  }

  export type StockReservationCreateOrConnectWithoutItemsInput = {
    where: StockReservationWhereUniqueInput
    create: XOR<StockReservationCreateWithoutItemsInput, StockReservationUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutReservationItemsInput = {
    id?: string
    externalId?: string | null
    sku?: string | null
    slug: string
    name: string
    categorySlug?: string
    description?: string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: number
    priceAmountMinor: bigint | number
    currency?: string
    stockQuantity?: number
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutReservationItemsInput = {
    id?: string
    externalId?: string | null
    sku?: string | null
    slug: string
    name: string
    categorySlug?: string
    description?: string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: number
    priceAmountMinor: bigint | number
    currency?: string
    stockQuantity?: number
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutReservationItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReservationItemsInput, ProductUncheckedCreateWithoutReservationItemsInput>
  }

  export type StockReservationUpsertWithoutItemsInput = {
    update: XOR<StockReservationUpdateWithoutItemsInput, StockReservationUncheckedUpdateWithoutItemsInput>
    create: XOR<StockReservationCreateWithoutItemsInput, StockReservationUncheckedCreateWithoutItemsInput>
    where?: StockReservationWhereInput
  }

  export type StockReservationUpdateToOneWithWhereWithoutItemsInput = {
    where?: StockReservationWhereInput
    data: XOR<StockReservationUpdateWithoutItemsInput, StockReservationUncheckedUpdateWithoutItemsInput>
  }

  export type StockReservationUpdateWithoutItemsInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StockReservationUncheckedUpdateWithoutItemsInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    releasedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUpsertWithoutReservationItemsInput = {
    update: XOR<ProductUpdateWithoutReservationItemsInput, ProductUncheckedUpdateWithoutReservationItemsInput>
    create: XOR<ProductCreateWithoutReservationItemsInput, ProductUncheckedCreateWithoutReservationItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReservationItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReservationItemsInput, ProductUncheckedUpdateWithoutReservationItemsInput>
  }

  export type ProductUpdateWithoutReservationItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutReservationItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categorySlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    reorderPoint?: IntFieldUpdateOperationsInput | number
    priceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPriceAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
    lineTotalAmountMinor?: BigIntFilter<"OrderItem"> | bigint | number
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    userId: string
    customerName?: string
    customerEmail?: string
    externalId?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint | number
    totalAmountMinor: bigint | number
    currency?: string
    recipientName: string
    phone: string
    line1: string
    line2?: string
    city: string
    province?: string
    postalCode?: string
    countryCode: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    customerName?: string
    customerEmail?: string
    externalId?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.OrderPaymentStatus
    subtotalAmountMinor: bigint | number
    totalAmountMinor: bigint | number
    currency?: string
    recipientName: string
    phone: string
    line1: string
    line2?: string
    city: string
    province?: string
    postalCode?: string
    countryCode: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumOrderPaymentStatusFieldUpdateOperationsInput | $Enums.OrderPaymentStatus
    subtotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    recipientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateWithoutThreadInput = {
    id?: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
    events?: AgentEventCreateNestedManyWithoutRunInput
  }

  export type AgentRunUncheckedCreateWithoutThreadInput = {
    id?: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
    events?: AgentEventUncheckedCreateNestedManyWithoutRunInput
  }

  export type AgentRunCreateOrConnectWithoutThreadInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput>
  }

  export type AgentRunCreateManyThreadInputEnvelope = {
    data: AgentRunCreateManyThreadInput | AgentRunCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type AgentRunUpsertWithWhereUniqueWithoutThreadInput = {
    where: AgentRunWhereUniqueInput
    update: XOR<AgentRunUpdateWithoutThreadInput, AgentRunUncheckedUpdateWithoutThreadInput>
    create: XOR<AgentRunCreateWithoutThreadInput, AgentRunUncheckedCreateWithoutThreadInput>
  }

  export type AgentRunUpdateWithWhereUniqueWithoutThreadInput = {
    where: AgentRunWhereUniqueInput
    data: XOR<AgentRunUpdateWithoutThreadInput, AgentRunUncheckedUpdateWithoutThreadInput>
  }

  export type AgentRunUpdateManyWithWhereWithoutThreadInput = {
    where: AgentRunScalarWhereInput
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyWithoutThreadInput>
  }

  export type AgentRunScalarWhereInput = {
    AND?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    OR?: AgentRunScalarWhereInput[]
    NOT?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    threadId?: StringFilter<"AgentRun"> | string
    agentId?: StringFilter<"AgentRun"> | string
    parentRunId?: StringNullableFilter<"AgentRun"> | string | null
    rootRunId?: StringFilter<"AgentRun"> | string
    depth?: IntFilter<"AgentRun"> | number
    kind?: EnumAgentRunKindFilter<"AgentRun"> | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFilter<"AgentRun"> | $Enums.AgentRunStatus
    input?: JsonFilter<"AgentRun">
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
    errorCode?: StringNullableFilter<"AgentRun"> | string | null
  }

  export type ConversationThreadCreateWithoutRunsInput = {
    id?: string
    userId: string
    agentId: string
    title?: string
    status?: $Enums.ConversationThreadStatus
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationThreadUncheckedCreateWithoutRunsInput = {
    id?: string
    userId: string
    agentId: string
    title?: string
    status?: $Enums.ConversationThreadStatus
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationThreadCreateOrConnectWithoutRunsInput = {
    where: ConversationThreadWhereUniqueInput
    create: XOR<ConversationThreadCreateWithoutRunsInput, ConversationThreadUncheckedCreateWithoutRunsInput>
  }

  export type AgentEventCreateWithoutRunInput = {
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentEventUncheckedCreateWithoutRunInput = {
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentEventCreateOrConnectWithoutRunInput = {
    where: AgentEventWhereUniqueInput
    create: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput>
  }

  export type AgentEventCreateManyRunInputEnvelope = {
    data: AgentEventCreateManyRunInput | AgentEventCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type ConversationThreadUpsertWithoutRunsInput = {
    update: XOR<ConversationThreadUpdateWithoutRunsInput, ConversationThreadUncheckedUpdateWithoutRunsInput>
    create: XOR<ConversationThreadCreateWithoutRunsInput, ConversationThreadUncheckedCreateWithoutRunsInput>
    where?: ConversationThreadWhereInput
  }

  export type ConversationThreadUpdateToOneWithWhereWithoutRunsInput = {
    where?: ConversationThreadWhereInput
    data: XOR<ConversationThreadUpdateWithoutRunsInput, ConversationThreadUncheckedUpdateWithoutRunsInput>
  }

  export type ConversationThreadUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationThreadUncheckedUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumConversationThreadStatusFieldUpdateOperationsInput | $Enums.ConversationThreadStatus
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentEventUpsertWithWhereUniqueWithoutRunInput = {
    where: AgentEventWhereUniqueInput
    update: XOR<AgentEventUpdateWithoutRunInput, AgentEventUncheckedUpdateWithoutRunInput>
    create: XOR<AgentEventCreateWithoutRunInput, AgentEventUncheckedCreateWithoutRunInput>
  }

  export type AgentEventUpdateWithWhereUniqueWithoutRunInput = {
    where: AgentEventWhereUniqueInput
    data: XOR<AgentEventUpdateWithoutRunInput, AgentEventUncheckedUpdateWithoutRunInput>
  }

  export type AgentEventUpdateManyWithWhereWithoutRunInput = {
    where: AgentEventScalarWhereInput
    data: XOR<AgentEventUpdateManyMutationInput, AgentEventUncheckedUpdateManyWithoutRunInput>
  }

  export type AgentEventScalarWhereInput = {
    AND?: AgentEventScalarWhereInput | AgentEventScalarWhereInput[]
    OR?: AgentEventScalarWhereInput[]
    NOT?: AgentEventScalarWhereInput | AgentEventScalarWhereInput[]
    runId?: StringFilter<"AgentEvent"> | string
    threadId?: StringFilter<"AgentEvent"> | string
    sequence?: IntFilter<"AgentEvent"> | number
    event?: JsonFilter<"AgentEvent">
    createdAt?: DateTimeFilter<"AgentEvent"> | Date | string
  }

  export type AgentRunCreateWithoutEventsInput = {
    id?: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
    thread: ConversationThreadCreateNestedOneWithoutRunsInput
  }

  export type AgentRunUncheckedCreateWithoutEventsInput = {
    id?: string
    threadId: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
  }

  export type AgentRunCreateOrConnectWithoutEventsInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutEventsInput, AgentRunUncheckedCreateWithoutEventsInput>
  }

  export type AgentRunUpsertWithoutEventsInput = {
    update: XOR<AgentRunUpdateWithoutEventsInput, AgentRunUncheckedUpdateWithoutEventsInput>
    create: XOR<AgentRunCreateWithoutEventsInput, AgentRunUncheckedCreateWithoutEventsInput>
    where?: AgentRunWhereInput
  }

  export type AgentRunUpdateToOneWithWhereWithoutEventsInput = {
    where?: AgentRunWhereInput
    data: XOR<AgentRunUpdateWithoutEventsInput, AgentRunUncheckedUpdateWithoutEventsInput>
  }

  export type AgentRunUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    thread?: ConversationThreadUpdateOneRequiredWithoutRunsNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockReservationItemCreateManyProductInput = {
    reservationId: string
    quantity: number
  }

  export type StockReservationItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    reservation?: StockReservationUpdateOneRequiredWithoutItemsNestedInput
  }

  export type StockReservationItemUncheckedUpdateWithoutProductInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StockReservationItemUncheckedUpdateManyWithoutProductInput = {
    reservationId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StockReservationItemCreateManyReservationInput = {
    productId: string
    quantity: number
  }

  export type StockReservationItemUpdateWithoutReservationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutReservationItemsNestedInput
  }

  export type StockReservationItemUncheckedUpdateWithoutReservationInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StockReservationItemUncheckedUpdateManyWithoutReservationInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    productName: string
    quantity: number
    unitPriceAmountMinor: bigint | number
    lineTotalAmountMinor: bigint | number
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lineTotalAmountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type AgentRunCreateManyThreadInput = {
    id?: string
    agentId: string
    parentRunId?: string | null
    rootRunId: string
    depth?: number
    kind?: $Enums.AgentRunKind
    status?: $Enums.AgentRunStatus
    input: JsonNullValueInput | InputJsonValue
    startedAt?: Date | string
    finishedAt?: Date | string | null
    errorCode?: string | null
  }

  export type AgentRunUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AgentEventUpdateManyWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AgentEventUncheckedUpdateManyWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    parentRunId?: NullableStringFieldUpdateOperationsInput | string | null
    rootRunId?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    kind?: EnumAgentRunKindFieldUpdateOperationsInput | $Enums.AgentRunKind
    status?: EnumAgentRunStatusFieldUpdateOperationsInput | $Enums.AgentRunStatus
    input?: JsonNullValueInput | InputJsonValue
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentEventCreateManyRunInput = {
    threadId: string
    sequence: number
    event: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentEventUpdateWithoutRunInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentEventUncheckedUpdateWithoutRunInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentEventUncheckedUpdateManyWithoutRunInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    event?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}