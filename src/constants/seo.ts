// =====================
// SEO Configuration
// =====================

export const SEO_CONFIG = {
  DEFAULT: {
    title: 'SmartWealth - เข้าใจประกันด้วยตัวเอง ก่อนคุยกับตัวแทน',
    description: 'จำลองผลลัพธ์ เปรียบเทียบแผน และเข้าใจข้อดีข้อเสียของประกันแต่ละประเภท ด้วยข้อมูลที่โปร่งใสและเข้าใจง่าย',
    keywords: 'ประกันชีวิต, ประกันสุขภาพ, ประกันออมทรัพย์, ประกันอุบัติเหตุ, วางแผนการเงิน, ลดหย่อนภาษี',
    ogImage: '/og-image.jpg'
  },
  PAGES: {
    overview: {
      title: 'ภาพรวมประกันทุกประเภท | SmartWealth',
      description: 'เปรียบเทียบประกันทุกประเภท พร้อมข้อดีข้อเสีย เพื่อช่วยคุณตัดสินใจได้ง่ายขึ้น',
      keywords: 'เปรียบเทียบประกัน, ข้อดีข้อเสียประกัน, ประกันแต่ละประเภท'
    },
    life: {
      title: 'ประกันชีวิต - คำนวณทุนที่เหมาะสมด้วยกฎ x10 | SmartWealth',
      description: 'คำนวณทุนประกันชีวิตที่เหมาะสมด้วยหลักการ x10 Rule มาตรฐานสากล เพื่อความมั่นคงของครอบครัว',
      keywords: 'ประกันชีวิต, x10 rule, ทุนประกัน, Financial Pyramid, ประกันชีวิตแบบ Term'
    },
    savings: {
      title: 'ประกันออมทรัพย์ - จำลองผลตอบแทนและลดหย่อนภาษี | SmartWealth',
      description: 'จำลองผลตอบแทนประกันออมทรัพย์ เปรียบเทียบกับการลงทุนเอง พร้อมคำนวณผลประโยชน์ด้านภาษี',
      keywords: 'ประกันออมทรัพย์, ลดหย่อนภาษี, AIA Endowment, ประกันสะสมทรัพย์, จุดคุ้มทุน'
    },
    health: {
      title: 'ประกันสุขภาพ - เลือกแผนที่เหมาะกับคุณ | SmartWealth',
      description: 'เปรียบเทียบแผนประกันสุขภาพแบบเหมาจ่าย จากวงเงิน 1-25 ล้านบาท เลือกแผนที่เหมาะกับไลฟ์สไตล์คุณ',
      keywords: 'ประกันสุขภาพ, ประกันสุขภาพเหมาจ่าย, Health Happy, ค่าห้อง OPD'
    },
    accident: {
      title: 'ประกันอุบัติเหตุ - คุ้มครอง 24 ชั่วโมง | SmartWealth',
      description: 'เปรียบเทียบแผนประกันอุบัติเหตุ เบี้ยถูก คุ้มครองสูง เหมาะกับทุกคนในครอบครัว',
      keywords: 'ประกันอุบัติเหตุ, PA, ประกันอุบัติเหตุ 24 ชั่วโมง, เบี้ยถูก'
    },
    articles: {
      title: 'คลังความรู้ - บทความด้านการเงินและประกัน | SmartWealth',
      description: 'รวมบทความเจาะลึกเรื่องการเงิน ภาษี และการสร้างมรดก เพื่ออนาคตที่มั่นคงของคุณ',
      keywords: 'บทความประกัน, ความรู้การเงิน, การวางแผนการเงิน, ภาษี, การลงทุน'
    },
    needsAnalysis: {
      title: 'วิเคราะห์ความต้องการประกันภัย - Needs Analysis | SmartWealth',
      description: 'เครื่องมือวิเคราะห์เชิงสถานการณ์เพื่อประเมินความเพียงพอของความคุ้มครองประกันภัย ตามหลัก HLV และมาตรฐานอุตสาหกรรม',
      keywords: 'วิเคราะห์ความต้องการ, needs analysis, HLV, human life value, ประกันภัย, วางแผนการเงิน, PPR'
    },
    contact: {
      title: 'ติดต่อที่ปรึกษา - ปรึกษาฟรี | SmartWealth',
      description: 'ติดต่อที่ปรึกษาการเงินมืออาชีพ พร้อมอธิบายกราฟและตัวเลขให้คุณเข้าใจง่ายๆ',
      keywords: 'ที่ปรึกษาประกัน, ปรึกษาฟรี, financial advisor, AIA'
    }
  }
} as const;

// JSON-LD Schema for Organization
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'SmartWealth',
  description: 'เว็บไซต์จำลองและเปรียบเทียบแผนประกันแบบโปร่งใส',
  url: 'https://smartwealth.com',
  logo: 'https://smartwealth.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+66-8x-xxx-xxxx',
    contactType: 'customer service',
    areaServed: 'TH',
    availableLanguage: 'th'
  }
};

// Helper function to generate article schema
export const generateArticleSchema = (article: {
  id: number;
  title: string;
  summary: string;
  image: string;
  publishedAt?: string;
  author?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.summary,
  image: article.image,
  datePublished: article.publishedAt || new Date().toISOString(),
  author: {
    '@type': 'Person',
    name: article.author || 'SmartWealth Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'SmartWealth',
    logo: {
      '@type': 'ImageObject',
      url: 'https://smartwealth.com/logo.png'
    }
  }
});