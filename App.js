import React, { useMemo, useState } from "react";

/**
 * 闲职 MVP：零成本可上线的单页原型
 * 目标：验证「时间超市 + 按Case + 多维画像 + 灵活定价」的核心假设
 * 使用方式：
 * 1) 直接在 Vercel/Netlify 新建 React 项目，把本文件作为默认页面导入即可。
 * 2) 所有占位链接（如 Google 表单、Calendly/TidyCal）替换为你的真实链接。
 * 3) 初期数据放在 TALENTS 常量里；也可改为从一个公开 JSON（如 GitHub Gist）拉取。
 */

// ======= 占位链接（上线前替换） =======
const FORM_FREELANCER_SIGNUP = "https://your-google-form-for-freelancers"; // 自由职业者入驻表单
const FORM_CLIENT_POST = "https://your-google-form-for-clients"; // 雇主发布需求表单（含时间段）
const DOC_PRICE_POLICY = "https://your-notion-doc-pricing"; // 定价说明/折扣机制说明
const DOC_TAX_FAQ = "https://your-notion-tax-faq"; // 个体户/税务 FAQ

// ======= 示例数据（可直接改） =======
const TALENTS = [
  {
    id: "t1",
    name: "张晨",
    role: "摄影师",
    city: "北京",
    expYears: 8,
    tier: "精英 Lv4",
    tags: ["TVC", "品牌广告", "可带组"],
    dayRateMin: 10000,
    dayRateMax: 18000,
    discountWindows: ["周一-周四", "淡季(1-2月)"];
    availability: "2025-11-05",
    calendarUrl: "https://calendly.com/your-talent-1",
    cases: ["李宁TVC", "腾讯公益短片"],
    devices: ["ARRI Alexa Mini", "DJI Inspire 3"],
    awards: ["金瞳银奖"],
    rating: 4.9,
  },
  {
    id: "t2",
    name: "王璐",
    role: "灯光师",
    city: "北京",
    expYears: 3,
    tier: "专业 Lv2",
    tags: ["小型广告", "MV", "夜戏经验"],
    dayRateMin: 800,
    dayRateMax: 1500,
    discountWindows: ["工作日全天"],
    availability: "2025-11-01",
    calendarUrl: "https://calendly.com/your-talent-2",
    cases: ["独立乐队MV", "咖啡品牌短片"],
    devices: ["Aputure 600D Pro", "Nanlite Pavotube"],
    awards: [],
    rating: 4.6,
  },
  {
    id: "t3",
    name: "刘野",
    role: "美术指导",
    city: "上海",
    expYears: 12,
    tier: "大师 Lv5",
    tags: ["TVC", "时尚大片", "大型搭景"],
    dayRateMin: 20000,
    dayRateMax: 30000,
    discountWindows: ["提前30天预定"],
    availability: "2025-11-20",
    calendarUrl: "https://calendly.com/your-talent-3",
    cases: ["国际运动品牌TVC", "美妆节日大片"],
    devices: [],
    awards: ["亚太广告节美术金奖"],
    rating: 5.0,
  },
];

const ROLES = ["摄影师", "灯光师", "美术指导", "导演", "制片", "剪辑", "调色", "编剧", "后期" ];
const CITIES = ["不限", "北京", "上海", "广州", "深圳", "杭州"];
const TIERS = ["不限", "专业 Lv2", "精英 Lv4", "大师 Lv5"]; // 仅示例

export default function App() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("摄影师");
  const [city, setCity] = useState("不限");
  const [tier, setTier] = useState("不限");
  const [maxBudget, setMaxBudget] = useState(20000);
  const [sortKey, setSortKey] = useState("rating");

  const filtered = useMemo(() => {
    return TALENTS.filter((t) => {
      const roleOk = !role || t.role.includes(role);
      const cityOk = city === "不限" || t.city === city;
      const tierOk = tier === "不限" || t.tier === tier;
      const budgetOk = t.dayRateMin <= maxBudget;
      const qOk = !q || `${t.name}${t.tags.join(" ")}${t.cases.join(" ")}`.includes(q);
      return roleOk && cityOk && tierOk && budgetOk && qOk;
    }).sort((a, b) => {
      if (sortKey === "price") return a.dayRateMin - b.dayRateMin;
      if (sortKey === "exp") return b.expYears - a.expYears;
      return b.rating - a.rating; // 默认按评分
    });
  }, [q, role, city, tier, maxBudget, sortKey]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black">闲职</span>
            <span className="text-xs text-gray-500">— 自由职业者的时间超市</span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <a className="hover:underline" href={DOC_PRICE_POLICY} target="_blank" rel="noreferrer">定价/折扣机制</a>
            <a className="hover:underline" href={DOC_TAX_FAQ} target="_blank" rel="noreferrer">税务与个体户</a>
            <a className="px-3 py-1.5 rounded-xl bg-gray-900 text-white" href={FORM_CLIENT_POST} target="_blank" rel="noreferrer">发布需求</a>
            <a className="px-3 py-1.5 rounded-xl bg-white border" href={FORM_FREELANCER_SIGNUP} target="_blank" rel="noreferrer">自由职业者入驻</a>
          </nav>
        </div>
      </header>

      {/* Hero 区域 */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">用更自由的方式，找到对的人</h1>
          <p className="mt-3 text-gray-600">时间超市 × 按Case报价 × 多维职业画像 × 税务合规。雇主像订酒店一样，按时间和能力筛人；创作者用数据说话，价格随供需动态调整。</p>
          <div className="mt-5 flex gap-3">
            <a href={FORM_CLIENT_POST} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-2xl bg-black text-white">我有项目</a>
            <a href={FORM_FREELANCER_SIGNUP} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-2xl bg-white border">我来接单</a>
          </div>
          <p className="mt-4 text-xs text-gray-500">MVP 原型 · 所有数据演示用 | 替换为你的实际链接即可上线验证</p>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <Filters
            q={q}
            setQ={setQ}
            role={role}
            setRole={setRole}
            city={city}
            setCity={setCity}
            tier={tier}
            setTier={setTier}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            sortKey={sortKey}
            setSortKey={setSortKey}
          />
        </div>
      </section>

      {/* 列表 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">没有匹配到合适的人选，试着放宽筛选条件～</p>
        )}
      </section>

      {/* 底部说明 */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">关于定价</h3>
            <p>支持【公开价】与【商议价】，可设置淡季/工作日「自动折扣」，或隐藏折扣仅对特定链接可见。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">关于时间</h3>
            <p>「时间超市」让雇主按日期筛选可约档期；自由职业者可连接 Calendly/TidyCal，自动避免撞档。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">税务合规</h3>
            <p>后续可对接个体户注册与自动申报（MVP 阶段先用发票代开/合作机构）。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Filters({ q, setQ, role, setRole, city, setCity, tier, setTier, maxBudget, setMaxBudget, sortKey, setSortKey }) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm w-16">搜索</label>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="姓名/案例/标签" className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-16">角色</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border rounded-xl px-3 py-2">
            {ROLES.map(r=> <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm w-16">城市</label>
          <select value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border rounded-xl px-3 py-2">
            {CITIES.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-16">段位</label>
          <select value={tier} onChange={(e)=>setTier(e.target.value)} className="w-full border rounded-xl px-3 py-2">
            {TIERS.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-16">预算≤</label>
          <input type="number" value={maxBudget} onChange={(e)=>setMaxBudget(Number(e.target.value||0))} className="w-full border rounded-xl px-3 py-2" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">排序</span>
        <button onClick={()=>setSortKey("rating")} className={`px-3 py-1.5 rounded-xl border ${sortKey==='rating'? 'bg-black text-white':'bg-white'}`}>评分优先</button>
        <button onClick={()=>setSortKey("price")} className={`px-3 py-1.5 rounded-xl border ${sortKey==='price'? 'bg-black text-white':'bg-white'}`}>价格优先</button>
        <button onClick={()=>setSortKey("exp")} className={`px-3 py-1.5 rounded-xl border ${sortKey==='exp'? 'bg-black text-white':'bg-white'}`}>经验优先</button>
      </div>
    </div>
  );
}

function TalentCard({ talent }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{talent.name} <span className="text-gray-500 font-medium">· {talent.role}</span></h3>
          <p className="text-sm text-gray-500">{talent.city} · {talent.tier} · {talent.expYears}年经验</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">评分</div>
          <div className="text-xl font-bold">{talent.rating.toFixed(1)}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {talent.tags.map((tg) => (
          <span key={tg} className="text-xs px-2 py-1 rounded-full bg-gray-100 border">{tg}</span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-xl bg-gray-50 border">
          <div className="text-gray-500">日薪区间</div>
          <div className="font-semibold">¥{talent.dayRateMin.toLocaleString()} - {talent.dayRateMax.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">折扣档：{talent.discountWindows?.join(" / ") || "—"}</div>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 border">
          <div className="text-gray-500">最早可约</div>
          <div className="font-semibold">{talent.availability}</div>
          <div className="text-xs text-gray-500 mt-1">支持时间超市预定</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-xl bg-white border">
          <div className="text-gray-500">代表案例</div>
          <div className="font-semibold truncate">{talent.cases.join("、")}</div>
        </div>
        <div className="p-3 rounded-xl bg-white border">
          <div className="text-gray-500">设备/奖项</div>
          <div className="font-semibold truncate">{[...talent.devices, ...talent.awards].join("、") || "—"}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <a href={talent.calendarUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-xl bg-black text-white">预约档期</a>
        <a href={FORM_CLIENT_POST + "?talent=" + encodeURIComponent(talent.name)} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-xl bg-white border">按Case询价</a>
      </div>
    </div>
  );
}

