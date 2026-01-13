# 🛡️ SmartWealth - ระบบจำลองและเปรียบเทียบประกัน

เว็บแอปพลิเคชันสำหรับจำลอง เปรียบเทียบ และทำความเข้าใจประกันประเภทต่างๆ ด้วยตัวเอง ก่อนคุยกับตัวแทน

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)
![React Router](https://img.shields.io/badge/React_Router-7.x-red)

## ✨ Features

### 📊 จำลองประกันแบบ Interactive
- **ประกันชีวิต**: คำนวณทุนประกันที่เหมาะสมด้วย x10 Rule
- **ประกันออมทรัพย์**: จำลองผลตอบแทน พร้อมเปรียบเทียบกับการลงทุนเอง
- **ประกันสุขภาพ**: เปรียบเทียบแผนต่างๆ และคำนวณเบี้ยตามอายุ
- **ประกันอุบัติเหตุ**: เปรียบเทียบความคุ้มครองและเบี้ยประกัน

### 🎯 ข้อดี/ข้อเสียที่ชัดเจน
- แสดงข้อดีและข้อควรระวังของแต่ละประกันอย่างโปร่งใส
- ไม่ได้โปรโมทประกันใดประกันหนึ่ง
- ให้ความรู้ที่เป็นกลางและเข้าใจง่าย

### 💡 คลังความรู้
- บทความเจาะลึกเรื่องการเงิน ภาษี และการวางแผน
- ระบบความคิดเห็นและคะแนน
- SEO-optimized สำหรับการค้นหา

### 🔧 Tax Optimizer
- คัดกรองความเหมาะสมด้านภาษี
- คำนวณผลประโยชน์จากการลดหย่อนภาษี
- แนะนำกลยุทธ์ตามฐานรายได้

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (แนะนำ) หรือ npm/yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/smartwealth.git
cd smartwealth

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

เปิดเบราว์เซอร์ที่ http://localhost:5173

### Build for Production

```bash
# Build
pnpm build

# Preview production build
pnpm preview
```

## 📁 โครงสร้างโปรเจค

```
smartwealth/
├── src/
│   ├── app/               # Main app & routing
│   ├── components/        # Reusable components
│   │   ├── common/        # ErrorBoundary, Loading
│   │   ├── insurance/     # InsuranceCard, Chart, etc.
│   │   └── layout/        # Navbar, Footer, SEOHead
│   ├── config/            # Configuration
│   ├── constants/         # Static data & routes
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── public/                # Static assets
└── ...config files
```

ดูรายละเอียดเพิ่มเติมใน [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🔌 Backend Integration

### Go Backend API

โปรเจคนี้ออกแบบให้ทำงานกับ Go backend API

```bash
# ตั้งค่า API URL ใน .env
VITE_API_BASE_URL=http://localhost:8080/api
```

### API Endpoints

```
GET    /api/articles              # List articles
GET    /api/articles/:id          # Get article detail
POST   /api/comments              # Add comment
GET    /api/comments?articleId=1  # Get article comments
POST   /api/calculate/savings     # Calculate savings plan
```

ดูเอกสาร API แบบเต็มใน [API.md](./API.md)

## 🎨 การใช้งาน Components

### InsuranceCard
```tsx
import { InsuranceCard } from './components/insurance/InsuranceCard';
import { Wallet } from 'lucide-react';

<InsuranceCard
  icon={Wallet}
  title="ประกันออมทรัพย์"
  description="สะสมเงินพร้อมคุ้มครอง"
  pros={['ได้เงินคืน', 'ลดหย่อนภาษี']}
  cons={['ผูกมัดระยะยาว', 'ผลตอบแทนต่ำ']}
  onClick={() => navigate('/savings')}
/>
```

### Custom Hooks
```tsx
import { useInsuranceCalculations } from './hooks';

const { savingCalcs, healthCalcs } = useInsuranceCalculations({
  age: 35,
  sumAssured: 1000000,
  taxRate: 0.10
});
```

## 🔧 Configuration

### Environment Variables

```bash
# API
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000

# Features
VITE_ENABLE_COMMENTS=true
VITE_ENABLE_ANALYTICS=false

# SEO
VITE_APP_URL=https://smartwealth.example.com
VITE_DEFAULT_OG_IMAGE=/og-image.jpg
```

## 📱 Responsive Design

- **Mobile First**: ออกแบบสำหรับมือถือก่อน
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Optimized**: ปุ่มและ UI elements ใหญ่พอสำหรับการแตะ

## 🎯 SEO Features

- ✅ Unique title และ description ทุกหน้า
- ✅ Open Graph tags สำหรับ social sharing
- ✅ JSON-LD structured data
- ✅ Sitemap generation
- ✅ robots.txt
- ✅ Semantic HTML
- ✅ Fast loading (< 2s)

## 🧪 Testing (Coming Soon)

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

## 📊 Performance

- **Bundle Size**: < 500KB (gzipped)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Following Airbnb style guide
- **Prettier**: Auto-formatting
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

## 🔒 Security

- ✅ Input validation (client & server)
- ✅ XSS protection (React's built-in)
- ✅ CSRF protection (backend)
- ✅ No sensitive data in frontend
- ✅ HTTPS only in production

## 📈 Roadmap

### Phase 1 (Current)
- [x] Basic insurance types
- [x] Calculation engines
- [x] Articles & knowledge base
- [x] SEO optimization

### Phase 2 (Next)
- [ ] User authentication
- [ ] Save calculations
- [ ] Comparison tool (side-by-side)
- [ ] Email notifications

### Phase 3 (Future)
- [ ] AI chatbot assistant
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👥 Team

- **Design & Architecture**: SmartWealth Team
- **Frontend Development**: React + TypeScript
- **Backend**: Go + PostgreSQL
- **UI/UX**: Tailwind CSS + Radix UI

## 📞 Support

- **Email**: support@smartwealth.example.com
- **LINE**: @smartwealth
- **Website**: https://smartwealth.example.com

## 🙏 Acknowledgments

- [React](https://react.dev) - UI Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Charts
- [Lucide](https://lucide.dev) - Icons
- [React Router](https://reactrouter.com) - Routing

---

Made with ❤️ for financial literacy in Thailand 🇹🇭
