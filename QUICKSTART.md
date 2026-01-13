# 🚀 Quick Start Guide

เริ่มต้นใช้งาน SmartWealth ภายใน 5 นาที!

## 📋 Prerequisites

ตรวจสอบว่าคุณมีสิ่งเหล่านี้ติดตั้งอยู่แล้ว:

```bash
# Check Node.js (ต้องการ v18+)
node --version

# Check pnpm (แนะนำ)
pnpm --version

# ถ้ายังไม่มี pnpm ติดตั้งด้วย
npm install -g pnpm
```

## 🎬 Setup ใน 3 ขั้นตอน

### 1️⃣ Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/smartwealth.git
cd smartwealth

# Install dependencies
pnpm install
```

### 2️⃣ Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env (optional)
# nano .env
```

### 3️⃣ Start Development Server

```bash
# Start dev server
pnpm dev
```

เปิดเบราว์เซอร์ที่ http://localhost:5173 🎉

## 🧪 ทดสอบว่าทำงาน

### ✅ Checklist

- [ ] หน้าแรกโหลดได้
- [ ] Navigation menu ทำงาน
- [ ] Calculator แสดงผลถูกต้อง
- [ ] ไม่มี error ใน console

### 🔧 แก้ปัญหาเบื้องต้น

**ปัญหา: Port 5173 ถูกใช้แล้ว**
```bash
# ใช้ port อื่น
pnpm dev -- --port 3000
```

**ปัญหา: Module not found**
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules
pnpm install
```

**ปัญหา: TypeScript errors**
```bash
# ตรวจสอบ type errors
pnpm type-check
```

## 🎨 ทดลองแก้ไข Code

### แก้ไข Component

1. เปิด `/src/pages/OverviewPage.tsx`
2. แก้ไขข้อความในหน้า
3. บันทึกไฟล์
4. ดูการเปลี่ยนแปลงทันทีในเบราว์เซอร์ (HMR)

### สร้าง Component ใหม่

```tsx
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-6 bg-white rounded-3xl">
      <h1 className="text-2xl font-black">{title}</h1>
    </div>
  );
}
```

ใช้งาน:
```tsx
import { MyComponent } from './components/MyComponent';

<MyComponent title="Hello World" />
```

## 📚 ทดลอง Features

### 1. Calculator
- ไปที่ "สะสมทรัพย์"
- ปรับ slider อายุและทุนประกัน
- ดูกราฟเปรียบเทียบ

### 2. Tax Optimizer
- ตอบคำถามคัดกรอง
- เลือกกลยุทธ์ภาษี
- ดูผลลัพธ์

### 3. Articles
- ไปที่ "คลังความรู้"
- คลิกอ่านบทความ
- ทดลองแสดงความคิดเห็น

## 🔌 ต่อกับ Backend (Optional)

### Setup Go Backend

```bash
# Clone backend repo
git clone https://github.com/yourusername/smartwealth-api.git
cd smartwealth-api

# Start backend
go run main.go
```

### Update Frontend Config

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_COMMENTS=true
```

## 🏗️ Build Production

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Output จะอยู่ที่ `/dist` folder

## 📱 ทดสอบบน Mobile

### Option 1: Network Access

```bash
# Find your local IP
ipconfig getifaddr en0  # macOS
ip addr show            # Linux

# Start with host
pnpm dev --host

# เปิดบน mobile: http://YOUR_IP:5173
```

### Option 2: Use ngrok

```bash
# Install ngrok
npm install -g ngrok

# In another terminal
ngrok http 5173

# ใช้ URL ที่ได้
```

## 🎯 Next Steps

### Learn the Architecture
```bash
# อ่าน documentation
cat ARCHITECTURE.md
```

### Explore Code
```bash
# ดู structure
tree src/ -L 2

# อ่าน types
cat src/types/insurance.ts

# ศึกษา hooks
cat src/hooks/useInsuranceCalculations.ts
```

### Make Changes
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ...

# Commit
git add .
git commit -m "feat: add my feature"
```

## 📖 เอกสารที่เป็นประโยชน์

- [README.md](./README.md) - Overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- [API.md](./API.md) - API documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

## ❓ FAQ

**Q: ต้องรู้อะไรบ้างก่อนเริ่ม?**
A: React, TypeScript, และ Tailwind CSS พื้นฐาน

**Q: ใช้ IDE อะไรดี?**
A: VSCode พร้อม extensions: ESLint, Prettier, Tailwind CSS IntelliSense

**Q: ทำไมใช้ pnpm แทน npm?**
A: เร็วกว่าและประหยัด disk space

**Q: สามารถใช้งานโดยไม่มี backend ได้ไหม?**
A: ได้! ทุก feature ทำงานด้วย mock data

**Q: Deploy ไปไหนได้บ้าง?**
A: Vercel, Netlify, GitHub Pages, หรือ Cloud hosting ใดๆ

## 🆘 ขอความช่วยเหลือ

- 💬 Slack: #smartwealth-dev
- 📧 Email: dev@smartwealth.example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smartwealth/issues)

## 🎉 ทำสำเร็จแล้ว!

ตอนนี้คุณพร้อมพัฒนา SmartWealth แล้ว! 

Happy coding! 🚀
