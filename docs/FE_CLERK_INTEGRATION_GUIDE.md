# Clerk trên Next.js và API Gateway

## Nguyên tắc

```text
Next.js + @clerk/nextjs
  ├─ hiển thị SignIn/SignUp và user menu
  ├─ giữ session cookie của Clerk
  └─ lấy short-lived session token bằng getToken()
          │ Authorization: Bearer <token>
          ▼
API Gateway + @clerk/express
  └─ verify JWT, tạo actor, enforce role/ownership
```

FE không gọi Users Service, Catalog Service hoặc Agent Service trực tiếp; tất cả
đi qua REST Gateway. FE cũng không cần `CLERK_SECRET_KEY` hay
`CLERK_JWT_KEY`.

## 1. Cài package và biến môi trường

```bash
pnpm add @clerk/nextjs
```

`.env.local` của Next.js chỉ chứa public key:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Không đặt `CLERK_SECRET_KEY`, `CLERK_JWT_KEY`, webhook secret hoặc OpenAI key
vào biến bắt đầu bằng `NEXT_PUBLIC_`.

## 2. Bọc toàn app bằng ClerkProvider

App Router (`app/layout.tsx`):

```tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="vi">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Nếu layout đã có `Providers`, đặt `ClerkProvider` ở ngoài component đó để mọi
client component đều dùng được Clerk hooks.

## 3. Sign in / Sign up

MVP passwordless email OTP + Google OAuth dùng component có sẵn:

```tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn routing="path" path="/sign-in" />;
}
```

```tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp routing="path" path="/sign-up" />;
}
```

Clerk Dashboard phải bật email verification bằng code và Google OAuth. FE
không tự xử lý OTP; Clerk component xử lý flow đó.

## 4. Middleware bảo vệ route cho UX

`middleware.ts` ở root Next app:

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtected = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/copilot(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtected(request)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|map)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

Middleware chỉ redirect người chưa đăng nhập. Backend vẫn phải verify token ở
mỗi request protected; không bao giờ tin việc FE đã chạy middleware.

## 5. Gọi Gateway bằng session token

Tạo một client helper ở client component:

```tsx
'use client';

import { useAuth } from '@clerk/nextjs';

export function useApi() {
  const { getToken } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

  return async function api<T>(path: string, init: RequestInit = {}) {
    const token = await getToken();
    const headers = new Headers(init.headers);
    headers.set('content-type', 'application/json');
    if (token) headers.set('authorization', `Bearer ${token}`);

    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${await response.text()}`);
    }
    return (await response.json()) as T;
  };
}
```

Ví dụ lấy profile:

```tsx
const api = useApi();
const profile = await api('/v1/me');
```

`getToken()` là token session của user hiện tại, không phải publishable key và
không phải OAuth access token của Google. Khi user đăng nhập bằng Google, Clerk
vẫn phát hành Clerk session token; Gateway chỉ verify token Clerk đó.

## 6. Hiển thị admin UI

FE có thể đọc metadata để ẩn/hiện menu:

```tsx
const { user } = useUser();
const isAdmin = user?.publicMetadata?.role === 'admin';
```

Đây chỉ là tối ưu giao diện. Endpoint admin vẫn phải gọi Gateway với session
token có claim `role=admin`; nếu không sẽ nhận `403 Admin role required`.

Sau khi đổi `publicMetadata` trên Dashboard, gọi `getToken()` sau khi session
được refresh hoặc yêu cầu user sign out/sign in để nhận claim mới.

## 7. CopilotKit trên FE

```tsx
import { CopilotKit } from '@copilotkit/react-core';

<CopilotKit
  runtimeUrl={`${process.env.NEXT_PUBLIC_API_URL}/v1/api/copilotkit`}
  agent="dashboard"
>
  {children}
</CopilotKit>;
```

Nếu tự dùng `HttpAgent`, truyền `Authorization` qua middleware/fetch wrapper
bằng `getToken()`. Tên agent phải là `dashboard`; `default` sẽ gây lỗi
`Agent 'default' not found`.

## 8. Checklist lỗi thường gặp

- `Missing secretKey`: secret key bị đặt nhầm trong client/Next public env;
  component Clerk chỉ cần publishable key.
- `401`: chưa gửi `Authorization: Bearer <getToken()>` hoặc token hết hạn.
- `403 Admin role required`: session token chưa refresh sau khi đặt metadata
  role, hoặc user chưa có public metadata `role=admin`.
- Runtime `404`: sai base path; dùng `/v1/api/copilotkit`, không dùng
  `/api/copilotkit` khi gọi Gateway port 3000.
- Agent not found: dùng `agent="dashboard"`, không dùng `default`.
