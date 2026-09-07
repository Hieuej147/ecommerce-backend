# TanStack Query và Redux Toolkit trong React

## Mục tiêu của tài liệu

Tài liệu này giải thích cách dùng đúng `@tanstack/react-query` và Redux Toolkit
trong một ứng dụng React/TypeScript. Ví dụ được viết theo bối cảnh
`dashboard-admin-ecommern` gọi API Gateway của project này.

Tài liệu chỉ tập trung vào code và pattern. Không cần chạy `npm install` để đọc
hoặc thực hành các ví dụ.

## 1. Hai thư viện giải quyết hai vấn đề khác nhau

### TanStack Query: server state

Server state là dữ liệu có nguồn sự thật ở backend:

- products, orders, customers;
- metrics và dashboard overview;
- trạng thái loading/error của request;
- cache, refetch, retry và đồng bộ lại dữ liệu;
- create/update/delete thông qua mutation.

TanStack Query được tạo ra để tránh phải tự viết một hệ thống gồm `useEffect`,
`useState`, loading flag, error flag, cache, request deduplication và logic
refetch cho từng API.

### Redux Toolkit: client state

Client state là state thuộc về trải nghiệm và logic của frontend:

- sidebar đang mở hay đóng;
- modal nào đang mở;
- product/order đang được chọn;
- bulk selection;
- wizard nhiều bước;
- draft UI cần chia sẻ giữa nhiều component.

Redux lưu state global theo một chiều: UI dispatch action, reducer cập nhật
state, UI render lại theo state mới. Redux Toolkit (`@reduxjs/toolkit`) là cách
được Redux khuyến nghị để viết Redux hiện nay.

### Quy tắc phân chia

| Dữ liệu | Nơi quản lý |
| --- | --- |
| `GET /products` | TanStack Query |
| `GET /orders/admin` | TanStack Query |
| API loading/error | TanStack Query |
| Cache API | TanStack Query |
| Sidebar open/closed | Redux Toolkit |
| Selected product ID | Redux Toolkit |
| Modal open/closed | Redux Toolkit |
| Form draft | Local state; Redux nếu nhiều vùng UI cần dùng |
| Clerk session/token | Clerk Provider, không tự copy vào Redux |

Không đưa toàn bộ `products` hoặc `orders` vào Redux rồi lại dùng TanStack Query
cho cùng dữ liệu. Khi đó sẽ có hai source of truth và phải đồng bộ thủ công.

## 2. Lưu ý về RTK Query

Redux Toolkit có một addon tên là RTK Query. RTK Query cũng giải quyết fetching
và caching server state, nhưng cache của nó nằm trong Redux store.

Có hai lựa chọn hợp lệ:

```text
TanStack Query + Redux Toolkit cho client state
hoặc
RTK Query cho server state + Redux Toolkit cho client state
```

Trong tài liệu này chọn lựa chọn thứ nhất để học rõ ranh giới giữa server state
và client state. Không dùng TanStack Query và RTK Query cho cùng một endpoint.

## 3. Cài đặt package

Ví dụ package cần cho dashboard Vite:

```bash
pnpm add @tanstack/react-query @reduxjs/toolkit react-redux
```

Project `dashboard-admin-ecommern` hiện đã có `@tanstack/react-query`, nhưng
chưa có implementation Query và đang dùng Zustand cho `activeDashboardId`.
Nếu muốn chuyển hoàn toàn sang Redux Toolkit thì thay state đó từng feature một,
không cần viết lại toàn bộ dashboard cùng lúc.

## 4. Thiết lập Redux Toolkit

### 4.1. Tạo slice cho UI

`src/lib/store/dashboard-ui-slice.ts`:

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DashboardUiState = {
  sidebarOpen: boolean;
  selectedProductId: string | null;
  productModalOpen: boolean;
};

const initialState: DashboardUiState = {
  sidebarOpen: true,
  selectedProductId: null,
  productModalOpen: false,
};

export const dashboardUiSlice = createSlice({
  name: "dashboardUi",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openProductModal(state, action: PayloadAction<string>) {
      state.selectedProductId = action.payload;
      state.productModalOpen = true;
    },
    closeProductModal(state) {
      state.selectedProductId = null;
      state.productModalOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  openProductModal,
  closeProductModal,
} = dashboardUiSlice.actions;

export default dashboardUiSlice.reducer;
```

Reducer trông như đang mutate state vì Redux Toolkit dùng Immer. Immer tạo ra
một immutable state mới phía sau; không nên viết reducer thủ công bằng cách
mutate object thật.

### 4.2. Tạo store và typed hooks

`src/lib/store/store.ts`:

```ts
import { configureStore } from "@reduxjs/toolkit";
import dashboardUiReducer from "./dashboard-ui-slice";

export const store = configureStore({
  reducer: {
    dashboardUi: dashboardUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

`src/lib/store/hooks.ts`:

```ts
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### 4.3. Bọc React app bằng Redux Provider

Trong `main.tsx`, `Provider` phải nằm trong `ClerkProvider` nếu các API hook cần
Clerk context:

```tsx
import { Provider } from "react-redux";
import { store } from "./lib/store/store";

<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</ClerkProvider>;
```

Đọc và dispatch UI state:

```tsx
const sidebarOpen = useAppSelector(
  (state) => state.dashboardUi.sidebarOpen,
);
const dispatch = useAppDispatch();

<button onClick={() => dispatch(toggleSidebar())}>
  {sidebarOpen ? "Close" : "Open"}
</button>;
```

## 5. Thiết lập TanStack Query

### 5.1. Tạo một QueryClient duy nhất

`src/lib/query-client.ts`:

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

Không tạo `new QueryClient()` bên trong component. Làm vậy sẽ tạo cache mới mỗi
lần render và làm mất mục đích của QueryClient.

Ý nghĩa các option:

- `staleTime`: thời gian dữ liệu được xem là fresh. Fresh query không cần
  refetch chỉ vì component mount lại.
- `gcTime`: thời gian cache inactive còn tồn tại trước khi bị garbage collect.
- `retry`: số lần retry khi query throw error. Không nên retry vô hạn lỗi auth.
- `refetchOnWindowFocus`: có thể tắt trong lúc học/debug; production nên chọn
  theo tính chất dữ liệu.

### 5.2. Thêm QueryClientProvider

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

<Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</Provider>;
```

TanStack Query v5 dùng object syntax:

```ts
useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});
```

Không dùng syntax cũ:

```ts
// Không dùng trong v5
useQuery(["products"], fetchProducts);
```

## 6. API layer có Clerk token

API function không được gọi React hook. Hook `useApi()` hiện có trong dashboard
chỉ nên được gọi ở custom hook hoặc component, sau đó truyền Axios instance vào
API function.

```ts
import type { AxiosInstance } from "axios";

export type ProductListParams = {
  pageSize?: number;
  pageToken?: string;
  search?: string;
  status?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  stockQuantity: number;
  price: {
    amountMinor: number;
    currency: string;
  };
  images: Record<string, string>;
};

export type ListProductsResponse = {
  products: Product[];
  pageInfo: {
    nextPageToken?: string;
  };
};

export async function listProducts(
  api: AxiosInstance,
  params: ProductListParams,
) {
  const response = await api.get<ListProductsResponse>("/products", {
    params,
  });

  return response.data;
}
```

Với `ENV.API_BASE_URL = http://localhost:3000/v1`, path `"/products"` sẽ gọi
`GET /v1/products`. Không viết `"/v1/products"` lần nữa nếu base URL đã chứa
`/v1`.

## 7. Query key và `useQuery`

### 7.1. Query key factory

`src/features/products/products-keys.ts`:

```ts
import type { ProductListParams } from "./products-api";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductListParams) =>
    [...productKeys.lists(), params] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
};
```

Query key phải chứa mọi biến mà `queryFn` sử dụng. Nếu request phụ thuộc vào
`search`, `status` hoặc `pageToken` mà key không chứa chúng, các request khác
nhau sẽ dùng nhầm cache.

Các key sau là khác nhau vì thứ tự phần tử trong array có ý nghĩa:

```ts
["products", "list", { page: 1, search: "phone" }];
["products", "list", { page: 2, search: "phone" }];
```

Object bên trong được hash ổn định, nhưng mọi giá trị phải serializable.

### 7.2. Tạo `useProducts`

```tsx
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/use-api";
import { listProducts, type ProductListParams } from "./products-api";
import { productKeys } from "./products-keys";

export function useProducts(params: ProductListParams) {
  const api = useApi();

  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => listProducts(api, params),
  });
}
```

### 7.3. Dùng query trong page

```tsx
export default function ProductsPage() {
  const search = useAppSelector((state) => state.productsUi.search);

  const productsQuery = useProducts({
    pageSize: 20,
    search,
  });

  if (productsQuery.isPending) {
    return <ProductsSkeleton />;
  }

  if (productsQuery.isError) {
    return <ProductsError error={productsQuery.error} />;
  }

  if (productsQuery.data.products.length === 0) {
    return <EmptyProducts />;
  }

  return <ProductsTable products={productsQuery.data.products} />;
}
```

`isPending` mô tả query chưa có data lần đầu. `isFetching` có thể là true trong
lúc đã có data nhưng đang refetch background; vì vậy không nên thay cả bảng bằng
skeleton mỗi lần `isFetching`.

```tsx
return (
  <>
    {productsQuery.isFetching && <SmallRefreshingIndicator />}
    <ProductsTable products={productsQuery.data?.products ?? []} />
  </>
);
```

## 8. Redux cho filter UI và TanStack Query cho kết quả API

Nếu search chỉ dùng trong Products page, local state thường đủ:

```tsx
const [search, setSearch] = useState("");
const productsQuery = useProducts({ search });
```

Dùng Redux khi nhiều component cần cùng filter hoặc filter là một phần của
dashboard workflow:

```ts
type ProductsUiState = {
  search: string;
  status: string | undefined;
};

const productsUiSlice = createSlice({
  name: "productsUi",
  initialState: { search: "", status: undefined } satisfies ProductsUiState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatus(state, action: PayloadAction<string | undefined>) {
      state.status = action.payload;
    },
  },
});
```

Page kết hợp hai thư viện như sau:

```tsx
const { search, status } = useAppSelector((state) => state.productsUi);

const productsQuery = useProducts({
  pageSize: 20,
  search,
  status,
});
```

Redux chỉ giữ input của UI. Kết quả `productsQuery.data` vẫn thuộc về TanStack
Query.

## 9. Mutation create/update/delete

### 9.1. API function

```ts
export type UpdateProductInput = {
  id: string;
  body: {
    name?: string;
    description?: string;
    stockQuantity?: number;
    priceAmountMinor?: number;
    currency?: string;
  };
};

export async function updateProduct(
  api: AxiosInstance,
  input: UpdateProductInput,
) {
  const response = await api.patch<Product>(
    `/products/${input.id}`,
    input.body,
  );

  return response.data;
}
```

### 9.2. Mutation hook

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProduct() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "update"],
    mutationFn: (input: UpdateProductInput) => updateProduct(api, input),
    onSuccess: async (updatedProduct) => {
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct,
      );

      await queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}
```

`setQueryData` cập nhật detail cache nếu response là object mới nhất. List cache
vẫn được invalidate vì product có thể xuất hiện trong nhiều list/filter khác
nhau.

Trong component:

```tsx
const updateProduct = useUpdateProduct();

function onSubmit(input: UpdateProductInput) {
  updateProduct.mutate(input, {
    onSuccess: () => dispatch(closeProductModal()),
  });
}

return (
  <button disabled={updateProduct.isPending} onClick={() => onSubmit(input)}>
    {updateProduct.isPending ? "Saving..." : "Save"}
  </button>
);
```

Mutation dùng cho create/update/delete hoặc side effect. Sau mutation:

- dùng `invalidateQueries` khi nhiều query có thể bị ảnh hưởng;
- dùng `setQueryData` khi biết chính xác cache nào và response mới nhất;
- chỉ dùng optimistic update khi UX thực sự cần và có rollback rõ ràng.

Không dispatch response vào Redux để tự đồng bộ với Query cache.

## 10. Xử lý lỗi auth và retry

Không nên retry nhiều lần với `401` hoặc `403`. API client có thể chuẩn hóa lỗi:

```ts
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
```

Query riêng lẻ có thể dùng retry policy:

```ts
useQuery({
  queryKey: productKeys.list(params),
  queryFn: () => listProducts(api, params),
  retry: (failureCount, error) => {
    if (error instanceof ApiError && [401, 403, 404].includes(error.status)) {
      return false;
    }

    return failureCount < 2;
  },
});
```

Backend vẫn là nơi quyết định quyền admin. Việc frontend ẩn menu không thay thế
`AdminGuard`; `403 Admin role required` phải được xử lý như một lỗi thật.

## 11. Pattern hoàn chỉnh cho dashboard

```text
User nhập search
  -> Redux cập nhật productsUi.search
  -> queryKey thay đổi
  -> TanStack Query lấy/cache list mới
  -> ProductsTable render data

User submit update product
  -> mutation gọi PATCH /products/:id
  -> thành công: set detail cache
  -> invalidate product list queries
  -> Redux đóng modal
  -> bảng nhận dữ liệu mới từ Query cache
```

Cấu trúc feature nên tách theo domain:

```text
src/
  app/
    providers.tsx
  lib/
    query-client.ts
    use-api.ts
    store/
      store.ts
      hooks.ts
  features/
    products/
      products-api.ts
      products-keys.ts
      products-hooks.ts
      products-ui-slice.ts
      products-page.tsx
    orders/
      orders-api.ts
      orders-keys.ts
      orders-hooks.ts
```

## 12. Các anti-pattern cần tránh

### Lưu server data vào Redux

```ts
// Sai: Redux trở thành cache API thủ công
dispatch(setProducts(response.products));
```

Thay bằng `useQuery` và để Query cache quản lý data.

### Fetch trong `useEffect`

```tsx
// Sai trong trường hợp thông thường
useEffect(() => {
  api.get("/products").then(setProducts);
}, []);
```

Thay bằng `useQuery`, vì query đã quản lý loading, error, cache, retry và
refetch.

### Query key thiếu biến

```ts
// Sai nếu queryFn dùng search
queryKey: ["products"];
queryFn: () => listProducts(api, { search });
```

```ts
// Đúng
queryKey: ["products", { search }];
```

### Tạo QueryClient trong component

```tsx
// Sai
function App() {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>...</QueryClientProvider>;
}
```

Tạo client ở module scope một lần.

### Gọi hook trong API function

```ts
// Sai: hook chỉ được gọi trong React component/custom hook
export async function listProducts() {
  const api = useApi();
}
```

Truyền `api` vào function như ví dụ ở phần API layer.

### Dùng Redux và Zustand cho cùng concern

Project dashboard hiện có `dashboard-store.ts` của Zustand cho
`activeDashboardId`. Khi chuyển sang Redux, chọn một owner duy nhất cho state
này; không đọc từ Zustand rồi ghi sang Redux.

## 13. Checklist code review

- [ ] Có một `QueryClient` dùng chung.
- [ ] App có `QueryClientProvider`.
- [ ] App có Redux `Provider` nếu có Redux slice.
- [ ] API function không chứa React hook.
- [ ] Component không gọi Axios trực tiếp.
- [ ] Query key chứa đầy đủ biến request.
- [ ] Query data không bị copy vào Redux.
- [ ] Mutation có loading/error handling.
- [ ] Mutation invalidate đúng query key.
- [ ] Không retry vô hạn lỗi `401/403`.
- [ ] Backend vẫn kiểm tra quyền admin.
- [ ] Không dùng RTK Query và TanStack Query cho cùng resource.

## 14. Tài liệu chính thức

- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [TanStack Query query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [TanStack Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [TanStack Query important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [TanStack Query và client state](https://tanstack.com/query/v3/docs/framework/react/guides/does-this-replace-client-state)
- [Redux overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Why Redux Toolkit is the recommended approach](https://redux.js.org/introduction/why-rtk-is-redux-today)
- [`configureStore`](https://redux-toolkit.js.org/api/configurestore/)
- [Redux Toolkit modern Redux tutorial](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)
- [RTK Query overview](https://redux-toolkit.js.org/rtk-query/overview)

