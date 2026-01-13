import { Testimonial } from '../types';

// =====================
// Testimonial Mock Data
// =====================

export const LIFE_PROTECTION_TESTIMONIALS: Testimonial[] = [
  {
    id: 'life-test-1',
    name: 'คุณสมชาย วงศ์ประเสริฐ',
    rating: 5,
    comment: 'ซื้อประกันชีวิตแบบมีคืนเงินไปได้ 5 ปีแล้ว รู้สึกมั่นใจมากที่ครอบครัวได้รับความคุ้มครอง และยังได้เงินคืนอีกด้วย ทีมงานให้คำปรึกษาดีมาก อธิบายละเอียดง่ายต่อการเข้าใจ',
    insuranceType: 'life',
    location: 'กรุงเทพฯ',
    verified: true,
    purchaseDate: new Date('2019-03-15'),
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'life-test-2',
    name: 'คุณอรอนงค์ สุขใจ',
    rating: 5,
    comment: 'เคยกังวลเรื่องความคุ้มครองให้ลูกๆ พอได้ปรึกษาทีมงานที่นี่ ช่วยเลือกแผนที่เหมาะกับงบและความต้องการ ตอนนี้จ่ายเบี้ยมา 3 ปีแล้ว รู้สึกโล่งใจมากครับ',
    insuranceType: 'life',
    location: 'เชียงใหม่',
    verified: true,
    purchaseDate: new Date('2021-07-20'),
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'life-test-3',
    name: 'คุณประวิทย์ มานะชัย',
    rating: 4,
    comment: 'แผนประกันดี เบี้ยไม่แพง ตอนแรกกลัวว่าจะเคลมยุ่งยาก แต่พอลองเคลมจริงก็ไม่ยุ่งยากเลย ได้เงินเร็วด้วย แนะนำเลยครับ',
    insuranceType: 'life',
    location: 'นครราชสีมา',
    verified: true,
    purchaseDate: new Date('2020-11-05'),
    createdAt: new Date('2023-12-20')
  }
];

export const SAVINGS_PLAN_TESTIMONIALS: Testimonial[] = [
  {
    id: 'savings-test-1',
    name: 'คุณวิไล ทองดี',
    rating: 5,
    comment: 'ตอนแรกไม่เข้าใจเรื่องประกันออมทรัพย์เลย แต่พอทีมงานอธิบายให้ฟัง ถึงเข้าใจว่ามันดีกว่าฝากธนาคารยังไง ได้ทั้งดอกเบี้ยสูง ลดหย่อนภาษีได้ และยังมีความคุ้มครองชีวิตอีก สุดยอดมากค่ะ!',
    insuranceType: 'savings',
    location: 'กรุงเทพฯ',
    verified: true,
    purchaseDate: new Date('2020-01-15'),
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'savings-test-2',
    name: 'คุณธนากร เจริญศรี',
    rating: 5,
    comment: 'ออมเงินมา 8 ปีแล้ว เห็นผลจริงๆ เงินเพิ่มขึ้นเยอะ ตอนแรกกลัวว่าผูกมัดยาวเกินไป แต่จริงๆ มันบังคับให้เราออมได้สม่ำเสมอ ดีกว่าเก็บเองเยอะ แถมยังลดหย่อนภาษีได้อีก ประหยัดภาษีไปเยอะ',
    insuranceType: 'savings',
    location: 'ชลบุรี',
    verified: true,
    purchaseDate: new Date('2016-06-10'),
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'savings-test-3',
    name: 'คุณสุภาพร ใจดี',
    rating: 4,
    comment: 'เป็นการออมที่ดีมาก เหมาะกับคนที่ไม่มีวินัยในการออมเงิน เพราะต้องจ่ายทุกปี ผลตอบแทนก็ดีกว่าฝากธรรมดา แค่ต้องตั้งใจจ่ายให้ติดต่อกันนะคะ',
    insuranceType: 'savings',
    location: 'ภูเก็ต',
    verified: true,
    purchaseDate: new Date('2019-09-22'),
    createdAt: new Date('2023-12-28')
  }
];

export const HEALTH_PLAN_TESTIMONIALS: Testimonial[] = [
  {
    id: 'health-test-1',
    name: 'คุณนิภา ศรีสุข',
    rating: 5,
    comment: 'เคยป่วยต้องเข้าโรงพยาบาลฉุกเฉิน โชคดีที่มีประกันสุขภาพไว้ ได้ห้องส่วนตัว ค่ารักษาทั้งหมดประกันจ่ายให้หมด ไม่ต้องกังวลเรื่องเงินเลย บริการจากทีมงานดีมาก ช่วยจัดการทุกอย่าง',
    insuranceType: 'health',
    location: 'กรุงเทพฯ',
    verified: true,
    purchaseDate: new Date('2021-02-28'),
    createdAt: new Date('2024-01-08')
  },
  {
    id: 'health-test-2',
    name: 'คุณสมศักดิ์ บุญมา',
    rating: 5,
    comment: 'ดีมากครับ เคลมง่าย เอกสารไม่ยุ่งยาก โอนเงินเข้าบัญชีเร็วมาก แค่ 3 วันก็ได้เงินแล้ว ใครที่ยังไม่มีประกันสุขภาพแนะนำให้ซื้อเลย อายุยิ่งน้อยเบี้ยยิ่งถูก',
    insuranceType: 'health',
    location: 'สมุทรปราการ',
    verified: true,
    purchaseDate: new Date('2020-08-15'),
    createdAt: new Date('2024-01-11')
  },
  {
    id: 'health-test-3',
    name: 'คุณพิมพ์ใจ รักดี',
    rating: 4,
    comment: 'ประกันดีค่ะ คุ้มครองครอบคลุม วงเงินสูง เพียงแค่อยากให้มีแพ็กเกจที่ถูกกว่านี้อีกสักหน่อยสำหรับคนที่งบจำกัด โดยรวมแล้วดีมากค่ะ แนะนำเลย',
    insuranceType: 'health',
    location: 'เชียงราย',
    verified: true,
    purchaseDate: new Date('2022-03-10'),
    createdAt: new Date('2023-12-15')
  }
];

export const ACCIDENT_PLAN_TESTIMONIALS: Testimonial[] = [
  {
    id: 'accident-test-1',
    name: 'คุณเจษฎา วีระชัย',
    rating: 5,
    comment: 'เคยเกิดอุบัติเหตุจากรถชน ต้องพักรักษาตัวที่โรงพยาบาล โชคดีที่มีประกันอุบัติเหตุไว้ ได้เงินชดเชยค่ารักษาและค่าชดเชยรายได้ช่วยเหลือครอบครัวได้มาก เบี้ยถูกมากเมื่อเทียบกับความคุ้มครองที่ได้',
    insuranceType: 'accident',
    location: 'นนทบุรี',
    verified: true,
    purchaseDate: new Date('2020-04-20'),
    createdAt: new Date('2024-01-07')
  },
  {
    id: 'accident-test-2',
    name: 'คุณรัชนี สว่างจิต',
    rating: 5,
    comment: 'ซื้อมาแค่ปีนึง เบี้ยแค่หลักร้อย แต่พอเกิดอุบัติเหตุจริงๆ ถึงรู้สึกว่าคุ้มมาก ได้เงินชดเชยเยอะ ทีมงานช่วยเรื่องเอกสารเคลมให้ด้วย ไม่ต้องกังวลเรื่องยุ่งยากเลยค่ะ',
    insuranceType: 'accident',
    location: 'ระยอง',
    verified: true,
    purchaseDate: new Date('2023-01-12'),
    createdAt: new Date('2024-01-14')
  },
  {
    id: 'accident-test-3',
    name: 'คุณอนุชา มั่นคง',
    rating: 4,
    comment: 'เบี้ยถูก ความคุ้มครองดี เหมาะกับคนที่ต้องขับรถหรือขับมอเตอร์ไซค์บ่อยๆ อย่างผม แนะนำให้ทุกคนมีไว้ครับ ไม่มีใครรู้ว่าอะไรจะเกิดขึ้น',
    insuranceType: 'accident',
    location: 'ขอนแก่น',
    verified: true,
    purchaseDate: new Date('2021-11-30'),
    createdAt: new Date('2023-12-22')
  }
];

export const GENERAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'general-test-1',
    name: 'คุณมานิตา สุขสันต์',
    rating: 5,
    comment: 'ชอบเว็บนี้มาก เปรียบเทียบแผนประกันได้ง่าย เห็นภาพรวมชัดเจน ทีมงานให้คำปรึกษาดีมาก ไม่ขายของแบบหนักใจ ช่วยวิเคราะห์ว่าแผนไหนเหมาะกับเราจริงๆ ประทับใจมากค่ะ',
    insuranceType: 'general',
    location: 'กรุงเทพฯ',
    verified: true,
    purchaseDate: new Date('2023-05-10'),
    createdAt: new Date('2024-01-09')
  },
  {
    id: 'general-test-2',
    name: 'คุณสุรชัย ดีเลิศ',
    rating: 5,
    comment: 'ตอนแรกไม่รู้จะเลือกประกันไหนดี เพราะมีเยอะมาก แต่พอมาใช้เครื่องมือเปรียบเทียบที่นี่ ทำให้เห็นข้อแตกต่างชัดเจน ตัดสินใจได้ง่ายขึ้นเยอะ ขอบคุณมากครับ',
    insuranceType: 'general',
    location: 'สงขลา',
    verified: true,
    purchaseDate: new Date('2023-08-22'),
    createdAt: new Date('2024-01-13')
  },
  {
    id: 'general-test-3',
    name: 'คุณกนกวรรณ แสงดาว',
    rating: 5,
    comment: 'บริการดีมาก ตอบคำถามรวดเร็ว ให้คำแนะนำตรงประเด็น ไม่รู้สึกกดดันในการซื้อเลย ประทับใจในความเป็นมืออาชีพของทีมงานค่ะ จะแนะนำเพื่อนๆ ให้มาใช้บริการแน่นอน',
    insuranceType: 'general',
    location: 'อุดรธานี',
    verified: true,
    purchaseDate: new Date('2023-10-15'),
    createdAt: new Date('2024-01-16')
  }
];

// Export all testimonials
export const ALL_TESTIMONIALS = {
  life: LIFE_PROTECTION_TESTIMONIALS,
  savings: SAVINGS_PLAN_TESTIMONIALS,
  health: HEALTH_PLAN_TESTIMONIALS,
  accident: ACCIDENT_PLAN_TESTIMONIALS,
  general: GENERAL_TESTIMONIALS
};
