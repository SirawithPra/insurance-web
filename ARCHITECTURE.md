# SmartWealth - Architecture Documentation

## 📁 โครงสร้างโปรเจค

```
smartwealth/
├── public/                 # Static assets
│   └── robots.txt         # SEO crawler configuration
├── src/
│   ├── app/               # Main application entry
│   │   └── App.tsx        # Root component with routing
│   ├── components/        # Reusable components
│   │   ├── common/        # Common components (ErrorBoundary, Loading)
│   │   ├── insurance/     # Insurance-specific components
│   │   └── layout/        # Layout components (Navbar, Footer, SEOHead)
│   ├── config/            # Configuration files
│   │   └── env.ts         # Environment variables
│   ├── constants/         # Constants and static data
│   │   ├── insurance.ts   # Insurance data (plans, rates, articles)
│   │   ├── routes.ts      # Route definitions
│   │   └── seo.ts         # SEO metadata
│   ├── hooks/             # Custom React hooks
│   │   ├── useInsuranceCalculations.ts
│   │   ├── useTaxOptimizer.ts
│   │   ├── useArticles.ts
│   │   ├── useComments.ts
│   │   └── useSEO.ts
│   ├── pages/             # Page components
│   │   ├── OverviewPage.tsx
│   │   ├── LifeProtectionPage.tsx
│   │   ├── SavingsPlanPage.tsx
│   │   ├── HealthPlanPage.tsx
│   │   ├── AccidentPlanPage.tsx
│   │   ├── ArticlesPage.tsx
│   │   ├── ArticleDetailPage.tsx
│   │   └── ContactPage.tsx
│   ├── services/          # API services
│   │   ├── api.ts         # Base API client
│   │   ├── articleService.ts
│   │   └── commentService.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── insurance.ts
│   │   ├── api.ts
│   │   └── common.ts
│   └── utils/             # Utility functions
│       ├── formatters.ts  # Number/currency formatters
│       ├── seo.ts         # SEO helpers
│       └── sitemap.ts     # Sitemap generator
├── .env.example           # Environment variables template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🏗️ สถาปัตยกรรม

### 1. **Component Architecture**

#### Layout Components
- `MainLayout`: Layout หลักที่ wrap ทุกหน้า มี Navbar, Footer, และ Mobile CTA
- `Navbar`: Navigation bar พร้อม responsive menu
- `Footer`: Footer พร้อมข้อมูลติดต่��และ disclaimer
- `SEOHead`: Component สำหรับจัดการ SEO metadata

#### Page Components
แต่ละ page เป็น standalone component ที่:
- ใช้ `MainLayout` wrap
- จัดการ SEO ด้วย `SEOHead`
- ใช้ custom hooks สำหรับ business logic

#### Reusable Components
- `InsuranceCard`: แสดงข้อมูลประกันพร้อมข้อดี/ข้อเสีย
- `ComparisonChart`: กราฟเปรียบเทียบผลตอบแทน
- `MetricCard`: แสดงตัวเลขสำคัญ
- `CommentSection`: ระบบความคิดเห็น
- `ErrorBoundary`: Error handling
- `Loading`: Loading states

### 2. **State Management**

ใช้ React Hooks และ Context (ไม่ต้องใช้ Redux เพราะ state ไม่ซับซ้อน):

- **Local State**: `useState` สำหรับ UI state
- **Custom Hooks**: แยก business logic ออกมาเป็น hooks
- **URL State**: ใช้ React Router สำหรับ navigation state

### 3. **Data Flow**

```
User Input → Hook → Service → API (Go Backend) → Database
                ↓
            Component Update
```

#### Hooks Layer
- `useInsuranceCalculations`: คำนวณ savings plan
- `useTaxOptimizer`: คำนวณภาษี
- `useArticles`: จัดการบทความ (CRUD)
- `useComments`: จัดการความคิดเห็น (CRUD)
- `useSEO`: จัดการ SEO metadata

#### Services Layer
- `articleService`: CRUD operations สำหรับบทความ
- `commentService`: CRUD operations สำหรับความคิดเห็น
- `api`: Base HTTP client (axios/fetch wrapper)

### 4. **Routing**

ใช้ React Router v7 สำหรับ client-side routing:

```typescript
Routes:
- /                    → Redirect to /overview
- /overview            → OverviewPage (ภาพรวมประกัน)
- /life                → LifeProtectionPage (ประกันชีวิต)
- /savings             → SavingsPlanPage (ประกันออมทรัพย์)
- /health              → HealthPlanPage (ประกันสุขภาพ)
- /accident            → AccidentPlanPage (ประกันอุบัติเหตุ)
- /articles            → ArticlesPage (คลังความรู้)
- /articles/:id        → ArticleDetailPage (บทความ)
- /contact             → ContactPage (ติดต่อ)
```

### 5. **SEO Strategy**

#### Meta Tags
ทุกหน้ามี:
- Title tag (unique per page)
- Description (unique per page)
- Keywords
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags

#### Structured Data (JSON-LD)
- Article schema สำหรับบทความ
- Organization schema สำหรับหน้าหลัก
- BreadcrumbList schema

#### Sitemap & Robots.txt
- Dynamic sitemap generation
- robots.txt สำหรับควบคุม crawler

## 🔌 Backend Integration

### API Endpoints (Go Backend)

#### Articles
```
GET    /api/articles              # List articles
GET    /api/articles/:id          # Get article
POST   /api/articles              # Create article (admin)
PUT    /api/articles/:id          # Update article (admin)
DELETE /api/articles/:id          # Delete article (admin)
```

#### Comments
```
GET    /api/comments?articleId=:id  # List comments by article
POST   /api/comments                # Create comment
DELETE /api/comments/:id            # Delete comment
```

#### Calculations
```
POST   /api/calculate/savings       # Calculate savings plan
POST   /api/calculate/tax           # Calculate tax benefits
```

### API Client Configuration

```typescript
// src/config/env.ts
VITE_API_BASE_URL=http://localhost:8080/api
```

### Error Handling
- Network errors: Retry mechanism
- API errors: User-friendly messages
- Validation errors: Form-level feedback

## 🎨 Styling

- **Tailwind CSS v4**: Utility-first CSS
- **Custom Theme**: ดูใน `/src/styles/theme.css`
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: ยังไม่รองรับ (อาจเพิ่มในอนาคต)

## 📱 Responsive Breakpoints

```
sm:  640px   # Small devices
md:  768px   # Medium devices  
lg:  1024px  # Large devices
xl:  1280px  # Extra large
2xl: 1536px  # 2X Extra large
```

## 🚀 Performance Optimizations

1. **Code Splitting**: Dynamic imports สำหรับ pages
2. **Lazy Loading**: Images และ components
3. **Memoization**: `useMemo`, `useCallback` สำหรับ expensive calculations
4. **Bundle Size**: Tree-shaking และ minification

## 🔒 Security Considerations

1. **XSS Prevention**: React's built-in escaping
2. **CSRF Protection**: Token-based (handle by backend)
3. **Input Validation**: Client-side + server-side validation
4. **API Keys**: ไม่เก็บใน frontend (ใช้ backend proxy)

## 🧪 Testing Strategy (Future)

1. **Unit Tests**: Jest + React Testing Library
2. **E2E Tests**: Playwright/Cypress
3. **API Tests**: Mock Service Worker (MSW)

## 📈 Analytics & Monitoring (Future)

1. **Google Analytics**: ติดตาม user behavior
2. **Error Tracking**: Sentry สำหรับ error monitoring
3. **Performance**: Web Vitals tracking

## 🔄 CI/CD (Future)

1. **Build**: Vite build
2. **Test**: Run tests
3. **Deploy**: Deploy to hosting (Vercel/Netlify/Cloud Run)
