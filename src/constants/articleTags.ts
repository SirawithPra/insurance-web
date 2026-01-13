// =====================
// Article Tags System
// =====================

/**
 * Tags แบ่งเป็น 2 ประเภท:
 * 
 * 1. COMMON_TAGS (แสดงหลายหน้า)
 *    - เช่น ภาษี, การวางแผน, การเงิน
 *    - บทความที่มี tags เหล่านี้จะแสดงในหลายหน้า
 * 
 * 2. SPECIFIC_TAGS (แสดงเฉพาะหน้า)
 *    - เช่น term-life, whole-life, accident-specific
 *    - บทความจะแสดงเฉพาะในหน้าที่เกี่ยวข้อง
 */

// Tags ที่แสดงหลายหน้า (Common Tags)
export const COMMON_TAGS = [
  'ภาษี',
  'การวางแผน',
  'การเงิน',
  'ลดหย่อนภาษี',
  'การลงทุน',
  'เกษียณ',
  'พื้นฐาน',
  'คำแนะนำ',
  'การเลือก',
  'การเปรียบเทียบ'
] as const;

// Tags เฉพาะสำหรับแต่ละหน้า (Specific Tags)
export const LIFE_PROTECTION_TAGS = [
  'ประกันชีวิต',
  'term-life',
  'whole-life',
  'x10-rule',
  'ทุนประกัน',
  'ความคุ้มครอง'
] as const;

export const SAVINGS_PLAN_TAGS = [
  'ประกันออมทรัพย์',
  'ออมทรัพย์',
  'RMF',
  'LTF',
  'ผลตอบแทน',
  'เงินคืน'
] as const;

export const HEALTH_PLAN_TAGS = [
  'ประกันสุขภาพ',
  'สุขภาพ',
  'โรคร้ายแรง',
  'เหมาจ่าย',
  'OPD',
  'IPD'
] as const;

export const ACCIDENT_PLAN_TAGS = [
  'ประกันอุบัติเหตุ',
  'อุบัติเหตุ',
  'PA',
  'ทุพพลภาพ',
  'การเคลม'
] as const;

// Helper function to check if a tag is common
export const isCommonTag = (tag: string): boolean => {
  return (COMMON_TAGS as readonly string[]).includes(tag);
};

// Helper function to get tags for a specific page
export const getPageTags = (page: 'life' | 'savings' | 'health' | 'accident'): readonly string[] => {
  const specificTags = {
    life: LIFE_PROTECTION_TAGS,
    savings: SAVINGS_PLAN_TAGS,
    health: HEALTH_PLAN_TAGS,
    accident: ACCIDENT_PLAN_TAGS
  };

  return [...COMMON_TAGS, ...specificTags[page]];
};

// Filter articles by tags for a specific page
export const shouldShowArticleOnPage = (
  articleTags: string[],
  page: 'life' | 'savings' | 'health' | 'accident'
): boolean => {
  const pageTags = getPageTags(page);
  
  // Check if article has any tag that belongs to this page
  return articleTags.some(tag => 
    (pageTags as readonly string[]).includes(tag)
  );
};
