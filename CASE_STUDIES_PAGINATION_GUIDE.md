# Case Studies & Pagination Implementation Guide

## 📋 สรุปการเพิ่มฟีเจอร์

### ✅ 1. Case Studies System

เพิ่ม Case Study เข้าไปในคลังความรู้ เพื่อแสดงตัวอย่างจริงจากลูกค้า

#### ไฟล์ที่สร้างใหม่:

**Types**
- อัปเดต `/src/types/insurance.ts` - เพิ่ม `CaseStudy` interface

**Mock Data**  
- `/src/constants/caseStudies.ts` - 8 Case Studies ครอบคลุมทุกประเภทประกัน

**Components**
- `/src/components/common/Pagination.tsx` - Pagination component ใช้ได้ทุกที่

**Pages**
- `/src/pages/CaseStudyDetailPage.tsx` - หน้ารายละเอียด Case Study
- อัปเดต `/src/pages/ArticlesPage.tsx` - เพิ่ม Tabs และ Pagination

**Routes**
- อัปเดต `/src/app/App.tsx` - เพิ่ม route `/articles/case/:id`

---

## 🎯 Case Study Mock Data (8 กรณีศึกษา)

### 1. **หัวหน้าครอบครัว งบจำกัด**
- **ปัญหา:** ต้องการทุนสูง แต่งบจำกัด
- **แก้ไข:** Term Life 5M เบี้ย 12,000/ปี
- **ผลลัพธ์:** ครอบครัวได้รับความคุ้มครองเพียงพอ 10 ปี

### 2. **Freelancer เก็บเงินไม่อยู่**
- **ปัญหา:** รายได้ไม่สม่ำเสมอ ออมไม่เป็น
- **แก้ไข:** ประกันออมทรัพย์ 20 ปี 100,000/ปี
- **ผลลัพธ์:** บังคับออมได้ + ลดหย่อนภาษี 30,000/ปี

### 3. **วัยทำงาน เจ็บป่วยบ่อย**
- **ปัญหา:** ต้องไป รพ. บ่อย ใช้สิทธิต้องรอคิว
- **แก้ไข:** ประกันสุขภาพเหมาจ่าย 5M + OPD
- **ผลลัพธ์:** ใช้ รพ.เอกชนสะดวก ประหยัด 50,000/ปี

### 4. **คนขับรถประจำทาง**
- **ปัญหา:** ขับรถทุกวัน เสี่ยงสูง
- **แก้ไข:** PA Premium 3M เบี้ย 3,500/ปี
- **ผลลัพธ์:** ความคุ้มครองสูง เบี้ยถูก วันละ 10 บาท

### 5. **ผู้บริหาร วางแผนเกษียณ**
- **ปัญหา:** อีก 15 ปีเกษียณ ต้องการ 5M
- **แก้ไข:** ประกันออมทรัพย์ 15 ปี 300,000/ปี
- **ผลลัพธ์:** ได้ 6.2M + ประหยัดภาษี 1.575M

### 6. **แม่บ้าน กลัวโรคร้ายแรง**
- **ปัญหา:** ไม่มีประกันจากงาน มีประวัติครอบครัว
- **แก้ไข:** ประกันสุขภาพ 5M + CI 10M
- **ผลลัพธ์:** ตรวจพบได้เงิน 2M ทันที

### 7. **SME Owner ต้องการครบวงจร**
- **ปัญหา:** ต้องการความคุ้มครองครบทุกด้าน
- **แก้ไข:** แผนรวม 4 แผน รวม 260,500/ปี
- **ผลลัพธ์:** คุ้มครอง 18M + ลดหย่อนภาษี 70,000

### 8. **นักศึกษาจบใหม่ งบน้อย**
- **ปัญหา:** เพิ่งเริ่มทำงาน ขับมอเตอร์ไซค์
- **แก้ไข:** PA Basic 1M เบี้ย 1,200/ปี
- **ผลลัพธ์:** ความคุ้มครองพื้นฐาน วันละ 3 บาท

---

## 📄 Pagination System

### คุณสมบัติ:

✅ **แสดงหมายเลขหน้า** - พร้อม ellipsis (...) เมื่อมีหลายหน้า
✅ **ปุ่ม ก่อนหน้า/ถัดไป** - พร้อม disable state
✅ **Highlight หน้าปัจจุบัน** - สีน้ำเงิน
✅ **Scroll to Top** - เมื่อเปลี่ยนหน้า
✅ **Responsive** - ใช้งานได้ทุกหน้าจอ

### การตั้งค่า:

```tsx
const ITEMS_PER_PAGE = 6; // บทความ 6 ต่อหน้า

// Calculate pagination
const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
const paginatedItems = items.slice(startIndex, endIndex);

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

### Pagination Logic:

- **≤7 หน้า:** แสดงทุกหน้า `[1] [2] [3] [4] [5] [6] [7]`
- **>7 หน้า:** แสดงแบบ smart `[1] ... [5] [6] [7] ... [20]`
- **หน้าปัจจุบัน:** แสดง ±1 หน้า

---

## 🎨 ArticlesPage Features

### Tab System:

1. **บทความ (12 บทความ)**
   - Grid 3 คอลัมน์
   - แสดง category, title, summary
   - Click เข้าสู่หน้ารายละเอียด

2. **Case Study (8 กรณีศึกษา)**
   - Grid 2 คอลัมน์ (ใหญ่กว่า)
   - แสดงข้อมูลลูกค้า, เบี้ย, ความคุ้มครอง
   - แสดง tags
   - Click เข้าสู่หน้ารายละเอียด Case Study

### State Management:

```tsx
const [activeTab, setActiveTab] = useState<TabType>('articles');
const [currentPage, setCurrentPage] = useState(1);

// Reset to page 1 when switching tabs
const handleTabChange = (tab: TabType) => {
  setActiveTab(tab);
  setCurrentPage(1);
};
```

---

## 📱 CaseStudyDetailPage Layout

### Structure:

1. **Header**
   - Category badge
   - Title
   - Summary

2. **Featured Image**
   - Aspect ratio 16:9
   - Rounded corners

3. **Customer Profile Card** (Purple gradient)
   - ชื่อ-นามสกุล
   - อายุ
   - อาชีพ

4. **Problem Card** (Red)
   - ปัญหาที่พบ
   - Icon: AlertCircle

5. **Solution Card** (Amber)
   - แนวทางแก้ไข
   - Icon: Lightbulb

6. **Result Card** (Green)
   - ผลลัพธ์
   - Icon: CheckCircle

7. **Stats Summary**
   - เบี้ยประกัน/ปี
   - ทุนประกัน/ความคุ้มครอง

8. **Tags**
   - แสดง tags ที่เกี่ยวข้อง

9. **CTA**
   - ปุ่มปรึกษาผู้เชี่ยวชาญผ่าน LINE

---

## 🔗 Routes

```tsx
// ArticlesPage - คลังความรู้
/articles

// Article Detail
/articles/:id

// Case Study Detail  
/articles/case/:id
```

---

## 💡 Best Practices

### 1. Case Study Writing

**ควรมี:**
- ✅ ข้อมูลลูกค้าจริง (อายุ, อาชีพ)
- ✅ ปัญหาที่ชัดเจน
- ✅ แนวทางแก้ไขที่เฉพาะเจาะจง
- ✅ ผลลัพธ์ที่วัดได้ (ตัวเลข)
- ✅ Tags ที่เกี่ยวข้อง

**ไม่ควร:**
- ❌ ใช้ข้อมูลที่เป็นความลับ
- ❌ สัญญาผลลัพธ์ที่ไม่แน่นอน
- ❌ ข้อมูลที่เกินจริง

### 2. Pagination Settings

**แนะนำ:**
- บทความ: 6-9 ต่อหน้า (Grid 3 คอลัมน์)
- Case Study: 4-6 ต่อหน้า (Grid 2 คอลัมน์)

**Mobile:**
- ทุกอย่างเป็น 1 คอลัมน์
- เพิ่ม items per page เป็น 8-10

### 3. SEO Optimization

**ชื่อเรื่อง:**
- ควรมีคำค้นหาหลัก
- ความยาว 50-60 ตัวอักษร
- น่าสนใจ กระตุ้นคลิก

**Summary/Excerpt:**
- ความยาว 150-160 ตัวอักษร
- สรุปเนื้อหาหลักชัดเจน
- มี keyword

**Tags:**
- ใช้ 3-5 tags ต่อเรื่อง
- ควรมีทั้ง common และ specific tags
- ตรงกับเนื้อหาจริง

---

## 🎯 ประโยชน์ของ Case Studies

### 1. สร้างความน่าเชื่อถือ
- แสดงตัวอย่างจริง
- มีข้อมูลที่วัดได้
- ลูกค้าเห็นภาพตัวเอง

### 2. การศึกษา
- เรียนรู้จากกรณีจริง
- เข้าใจปัญหาและวิธีแก้
- เห็นผลลัพธ์ชัดเจน

### 3. SEO
- Content ที่มีคุณค่า
- Keyword ที่หลากหลาย
- เพิ่มเวลาอยู่ในเว็บ

### 4. Conversion
- กระตุ้นให้ติดต่อ
- เห็นตัวอย่างราคาจริง
- สร้าง trust

---

## 📊 Metrics ที่ควรติดตาม

### ArticlesPage
1. **Tab Click Rate** - คนสนใจ Case Study หรือบทความมากกว่า
2. **Article Click Through Rate** - บทความไหนได้รับความสนใจ
3. **Case Study Views** - Case Study ไหนคนดูมากสุด
4. **Pagination Depth** - คนอ่านถึงหน้าไหน
5. **Time on Page** - อยู่นานแค่ไหน

### CaseStudyDetailPage
1. **Read Time** - อ่านจบหรือไม่
2. **CTA Click Rate** - กดปุ่มปรึกษาหรือไม่
3. **Scroll Depth** - scroll ถึงไหน
4. **Bounce Rate** - ออกทันทีหรือไม่

---

## 🚀 ขั้นตอนต่อไป (Backend Integration)

### Phase 1: Database Schema

```sql
CREATE TABLE case_studies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  summary TEXT,
  customer_name VARCHAR(100),
  customer_age INT,
  occupation VARCHAR(100),
  problem TEXT,
  solution TEXT,
  result TEXT,
  premium DECIMAL(10,2),
  coverage DECIMAL(12,2),
  insurance_type VARCHAR(50),
  tags JSONB,
  author VARCHAR(100),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_case_studies_insurance_type ON case_studies(insurance_type);
CREATE INDEX idx_case_studies_published_at ON case_studies(published_at DESC);
CREATE INDEX idx_case_studies_tags ON case_studies USING GIN(tags);
```

### Phase 2: Go API Endpoints

```go
// Get all case studies with pagination
GET /api/case-studies?page=1&limit=6&type=life

// Get featured case studies
GET /api/case-studies/featured

// Get single case study
GET /api/case-studies/:id

// Create case study (Admin)
POST /api/admin/case-studies

// Update case study (Admin)
PUT /api/admin/case-studies/:id

// Delete case study (Admin)
DELETE /api/admin/case-studies/:id
```

### Phase 3: Frontend Service

```tsx
// /src/services/caseStudyService.ts
export const caseStudyService = {
  getCaseStudies: async (params: {
    page?: number;
    limit?: number;
    insuranceType?: string;
  }) => {
    // TODO: Replace with API call
    const response = await api.get('/case-studies', { params });
    return response.data;
  },
  
  getCaseStudyById: async (id: number) => {
    const response = await api.get(`/case-studies/${id}`);
    return response.data;
  }
};
```

---

## ✅ Checklist

- [x] สร้าง CaseStudy type
- [x] สร้าง mock data 8 case studies
- [x] สร้าง Pagination component
- [x] อัปเดต ArticlesPage ให้มี tabs
- [x] เพิ่ม pagination ใน ArticlesPage
- [x] สร้าง CaseStudyDetailPage
- [x] เพิ่ม routes
- [x] ทดสอบ navigation
- [ ] เชื่อม Backend API
- [ ] เพิ่ม loading states
- [ ] เพิ่ม error handling
- [ ] ทดสอบ SEO
- [ ] เพิ่ม Analytics tracking

---

**สร้างเมื่อ:** 9 มกราคม 2026  
**สถานะ:** ✅ เสร็จสมบูรณ์ (Frontend + Mock Data)  
**ต่อไป:** Backend Integration + Admin Dashboard
