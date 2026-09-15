
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
 * // Fetch zero or more ConversationThreads
 * const conversationThreads = await prisma.conversationThread.findMany()
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
   * // Fetch zero or more ConversationThreads
   * const conversationThreads = await prisma.conversationThread.findMany()
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
      modelProps: "conversationThread" | "agentRun" | "agentEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'ConversationThreadStatus'
   */
  export type EnumConversationThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationThreadStatus'>
    


  /**
   * Reference to a field of type 'ConversationThreadStatus[]'
   */
  export type ListEnumConversationThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationThreadStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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

  export type EnumConversationThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusFilter<$PrismaModel> | $Enums.ConversationThreadStatus
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

  export type AgentRunListRelationFilter = {
    every?: AgentRunWhereInput
    some?: AgentRunWhereInput
    none?: AgentRunWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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

  export type EnumConversationThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumConversationThreadStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConversationThreadStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NestedEnumConversationThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusFilter<$PrismaModel> | $Enums.ConversationThreadStatus
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

  export type NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationThreadStatus | EnumConversationThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationThreadStatus[] | ListEnumConversationThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationThreadStatusFilter<$PrismaModel>
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