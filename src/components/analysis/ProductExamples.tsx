
import { Shield, Heart, Zap, Wallet, AlertTriangle, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import type { CoverageEstimate, PremiumEstimate } from '../../types/analysis';

interface ProductExamplesProps {
  coverage: CoverageEstimate;
  premiums: PremiumEstimate;
  className?: string;
}

export const ProductExamples: React.FC<ProductExamplesProps> = ({
  coverage,
  premiums,
  className = ''
}) => {
  // Convert to practical product specs
  const products = {
    life: {
      death: coverage.life,
      premium: premiums.life,
      type: coverage.life >= 5000000 ? 'Term Life หรือ Endowment' : 'Endowment'
    },
    health: coverage.health > 0 ? {
      limit: coverage.health,
      roomLimit: Math.min(25000, Math.round(coverage.health / 100)),
      opd: coverage.health >= 2000000,
      premium: premiums.health,
      type: coverage.health >= 5000000 ? 'แบบจ่ายตามจริง' : 'แบบเหมาจ่าย'
    } : null,
    incomeProtection: {
      totalCoverage: coverage.incomeProtection,
      dailyBenefit: Math.round(coverage.incomeProtection / 180),
      days: 180,
      premium: premiums.incomeProtection
    },
    ci: {
      lumpSum: coverage.ci,
      perDisease: Math.round(coverage.ci / 3), // แบ่ง 3 กลุ่มโรค
      premium: premiums.ci
    },
    accident: {
      death: coverage.accident,
      disability: coverage.accident,
      medicalExpense: Math.round(coverage.accident * 0.1), // 10% ของทุนหลัก
      dailyHospital: Math.min(5000, Math.round(coverage.accident / 1000)),
      premium: premiums.accident
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-indigo-900 mb-2">
              ตัวอย่างผลิตภัณฑ์ประกันภัย (Product Examples)
            </h3>
            <p className="text-sm text-indigo-800">
              ตัวเลขด้านล่างแสดงในรูปแบบที่สามารถนำไป<strong>เปรียบเทียบกับผลิตภัณฑ์จริง</strong>ได้
              <br />
              เป็นตัวอย่างสำหรับการสนทนากับตัวแทน ไม่ใช่การเสนอขายหรือรับประกันราคา
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* 1. Life Insurance */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">ประกันชีวิต (Life Insurance)</h4>
              <p className="text-xs text-slate-600">{products.life.type}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1">ทุนเสียชีวิต</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(products.life.death)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">เบี้ยประมาณ/เดือน</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(products.life.premium)}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
              <strong>ตัวอย่างผลิตภัณฑ์:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Term Life:</strong> คุ้มครองเฉพาะเสียชีวิต ไม่มีมูลค่าเวนคืน (เบี้ยถูกสุด)</li>
                <li>• <strong>Endowment (สะสมทรัพย์):</strong> ทุนประกัน + ออมเงิน + ลดหย่อนภาษี</li>
                <li>• <strong>Whole Life:</strong> คุ้มครองตลอดชีพ มีมูลค่าเวนคืน</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Health Insurance */}
        {products.health && (
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Heart className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">ประกันสุขภาพ (Health Insurance)</h4>
                <p className="text-xs text-slate-600">{products.health.type}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">วงเงินรวม/ปี</p>
                    <p className="text-xl font-bold text-green-900">
                      {formatCurrency(products.health.limit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">เบี้ยประมาณ/เดือน</p>
                    <p className="text-xl font-bold text-green-900">
                      {formatCurrency(products.health.premium)}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-green-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ค่าห้อง/วัน (สูงสุด)</span>
                    <span className="font-bold text-green-900">{formatCurrency(products.health.roomLimit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">OPD</span>
                    <span className="font-bold text-green-900">
                      {products.health.opd ? '✓ รวม' : '✗ ไม่รวม'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
                <strong>ตัวอย่างผลิตภัณฑ์:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• <strong>แบบเหมาจ่าย:</strong> จ่ายคงที่ตามเลท เช่น ห้อง 2,500/วัน</li>
                  <li>• <strong>แบบจ่ายตามจริง:</strong> จ่ายค่ารักษาจริง ไม่เกินวงเงิน</li>
                  <li>• <strong>OIC 13 หมวด:</strong> ครอบคลุมทั้ง IPD, OPD, ศัลยกรรม</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. Income Protection */}
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Wallet className="text-purple-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">ประกันชดเชยรายได้ (Income Protection / CI Rider)</h4>
              <p className="text-xs text-slate-600">Daily Hospitalization Benefit</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">ชดเชย/วัน</p>
                  <p className="text-xl font-bold text-purple-900">
                    {formatCurrency(products.incomeProtection.dailyBenefit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">สูงสุด (วัน)</p>
                  <p className="text-xl font-bold text-purple-900">
                    {products.incomeProtection.days} วัน
                  </p>
                </div>
              </div>
              
              <div className="border-t border-purple-200 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">วงเงินรวมสูงสุด</span>
                  <span className="font-bold text-purple-900">
                    {formatCurrency(products.incomeProtection.totalCoverage)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
              <strong>วิธีการซื้อ:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Rider ประกันสุขภาพ:</strong> ซื้อแนบกับแบบหลัก เช่น ชดเชย 1,000-5,000/วัน</li>
                <li>• <strong>CI (โรคร้ายแรง):</strong> ถ้าป่วยโรคร้าย จ่ายก้อน แต่ไม่ได้จ่ายรายวัน</li>
                <li>• <strong>ตัวอย่าง:</strong> ซื้อชดเชย 3,000 บาท/วัน × 180 วัน = วงเงินรวม 540,000 บาท</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Critical Illness */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">ประกันโรคร้ายแรง (Critical Illness)</h4>
              <p className="text-xs text-slate-600">Lump Sum Payment</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">จ่ายก้อน (Lump Sum)</p>
                  <p className="text-xl font-bold text-orange-900">
                    {formatCurrency(products.ci.lumpSum)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">เบี้ยประมาณ/เดือน</p>
                  <p className="text-xl font-bold text-orange-900">
                    {formatCurrency(products.ci.premium)}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-orange-200 pt-3">
                <p className="text-xs text-slate-600 mb-2">ตัวอย่างจ่ายต่อโรค (ถ้าแบบแยกโรค):</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-xs text-slate-600">มะเร็ง</p>
                    <p className="text-sm font-bold">{(products.ci.perDisease / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-xs text-slate-600">หัวใจ</p>
                    <p className="text-sm font-bold">{(products.ci.perDisease / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-xs text-slate-600">Stroke</p>
                    <p className="text-sm font-bold">{(products.ci.perDisease / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
              <strong>ตัวอย่างผลิตภัณฑ์:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>CI แบบก้อน:</strong> ป่วย 1 โรค จ่ายเต็มจำนวนเลย เช่น 2M</li>
                <li>• <strong>CI แบบแยกโรค:</strong> แต่ละโรคจ่ายแยก เช่น มะเร็ง 1M, หัวใจ 1M</li>
                <li>• <strong>CI Rider:</strong> ซื้อแนบกับประกันหลัก ถูกกว่าซื้อแยก</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Personal Accident */}
        <div className="bg-white border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Zap className="text-red-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">ประกันอุบัติเหตุ (Personal Accident - PA)</h4>
              <p className="text-xs text-slate-600">24 Hours Worldwide</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">เสียชีวิต/ทุพพลภาพ</p>
                  <p className="text-xl font-bold text-red-900">
                    {formatCurrency(products.accident.death)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">เบี้ยประมาณ/เดือน</p>
                  <p className="text-xl font-bold text-red-900">
                    {formatCurrency(products.accident.premium)}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-red-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">ค่ารักษาพยาบาล (PA Medical)</span>
                  <span className="font-bold text-red-900">
                    {formatCurrency(products.accident.medicalExpense)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">ค่าชดเชยนอนโรงพยาบาล/วัน</span>
                  <span className="font-bold text-red-900">
                    {formatCurrency(products.accident.dailyHospital)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
              <strong>ตัวอย่างแผน PA:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>ทุนหลัก:</strong> เสียชีวิต/ทุพพลภาพ 5M</li>
                <li>• <strong>PA Medical:</strong> ค่ารักษา 500k (10% ของทุนหลัก)</li>
                <li>• <strong>Daily Hospital:</strong> ชดเชย 3,000-5,000 บาท/วัน</li>
                <li>• <strong>Loss of Organs:</strong> เสียอวัยวะ จ่ายตามเลท (เช่น ตาข้างหนึ่ง 50%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Tips */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-slate-900 mb-3">💡 เคล็ดลับการเลือกซื้อ</h4>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <strong>1. เริ่มจากฐานราก:</strong> ซื้อ Life + PA ก่อน (เบี้ยถูก คุ้มครองสูง)
          </p>
          <p>
            <strong>2. เพิ่มสุขภาพ:</strong> ถ้ามีงบ ซื้อประกันสุขภาพแบบเหมาจ่าย 1-2M
          </p>
          <p>
            <strong>3. เสริม Riders:</strong> ซื้อ CI, Income Protection แนบกับแบบหลัก (ถูกกว่าซื้อแยก)
          </p>
          <p>
            <strong>4. เปรียบเทียบ:</strong> ตัวเลขข้างต้นเป็นประมาณการ ราคาจริงขึ้นกับบริษัท อายุ สุขภาพ
          </p>
          <p className="text-xs text-slate-500 mt-3">
            * ตัวเลขทั้งหมดเป็นการประมาณการเพื่อใช้เป็นกรอบในการเปรียบเทียบเท่านั้น
          </p>
        </div>
      </div>
    </div>
  );
};
