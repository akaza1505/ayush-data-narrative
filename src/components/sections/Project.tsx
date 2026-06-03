import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  BarChart2,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Zap,
  Star,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Globe,
  Database,
  Layers,
  X,
} from "lucide-react";
import { Reveal } from "../Reveal";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
  Cell,
} from "recharts";

import screenshot51 from "@/public/Screenshot (51).png";
import screenshot52 from "@/public/Screenshot (52).png";
import screenshot53 from "@/public/Screenshot (53).png";
import screenshot54 from "@/public/Screenshot (54).png";

const images = [screenshot51, screenshot52, screenshot53, screenshot54];

const dashboards = [
  {
    title: "Executive Summary Dashboard",
    description: "Consolidated high-level ROI, ROAS, and revenue growth tracking across all marketing verticals.",
    src: screenshot51,
    tags: ["Power BI", "Executive Reporting", "ROI Tracking"],
  },
  {
    title: "Channel Performance Analysis",
    description: "Granular breakdown of media spend, CPA, and conversion rates across search, social, and display channels.",
    src: screenshot52,
    tags: ["DAX", "Channel Attribution", "Spend Analysis"],
  },
  {
    title: "Live Campaign Monitor",
    description: "Real-time tracking of active campaigns with anomaly detection and automated alert parameters.",
    src: screenshot53,
    tags: ["Power BI Embedded", "Real-time Data", "KPI Monitoring"],
  },
  {
    title: "Conversion Funnel Analysis",
    description: "Multi-stage funnel mapping from impression to lead capture, highlighting drop-off points.",
    src: screenshot54,
    tags: ["Funnel Visualization", "User Behavior", "Process Optimization"],
  },
];

// Segment definitions for interactive campaign filtering
const SEGMENTS = {
  all: {
    name: "All Campaigns",
    kpis: {
      spend: "$58,400",
      revenue: "$233,600",
      roas: "4.0x",
      convRate: "3.8%",
    },
    executiveData: [
      { month: "Jan", Spend: 8000, Revenue: 28000, ROAS: 3.5 },
      { month: "Feb", Spend: 9500, Revenue: 36100, ROAS: 3.8 },
      { month: "Mar", Spend: 11000, Revenue: 46200, ROAS: 4.2 },
      { month: "Apr", Spend: 13000, Revenue: 55900, ROAS: 4.3 },
      { month: "May", Spend: 12000, Revenue: 51600, ROAS: 4.3 },
      { month: "Jun", Spend: 14900, Revenue: 62580, ROAS: 4.2 },
    ],
    channelData: [
      { name: "Social", CPA: 24, ConvRate: 3.5, color: "#3B82F6" },
      { name: "Email", CPA: 8, ConvRate: 6.8, color: "#10B981" },
      { name: "Search", CPA: 31, ConvRate: 4.2, color: "#F59E0B" },
      { name: "Display", CPA: 48, ConvRate: 1.5, color: "#F43F5E" },
      { name: "SEO", CPA: 12, ConvRate: 5.2, color: "#06B6D4" },
    ],
    funnelData: [
      { stage: "Impressions", value: 100000, percentage: 100, fill: "#3B82F6" },
      { stage: "Clicks", value: 8000, percentage: 8, fill: "#8B5CF6" },
      { stage: "Leads", value: 1200, percentage: 1.2, fill: "#F59E0B" },
      { stage: "Purchases", value: 380, percentage: 0.38, fill: "#10B981" },
    ],
  },
  ecommerce: {
    name: "E-Commerce",
    kpis: {
      spend: "$84,200",
      revenue: "$269,440",
      roas: "3.2x",
      convRate: "4.5%",
    },
    executiveData: [
      { month: "Jan", Spend: 12000, Revenue: 34800, ROAS: 2.9 },
      { month: "Feb", Spend: 14000, Revenue: 43400, ROAS: 3.1 },
      { month: "Mar", Spend: 15500, Revenue: 51150, ROAS: 3.3 },
      { month: "Apr", Spend: 18000, Revenue: 61200, ROAS: 3.4 },
      { month: "May", Spend: 16500, Revenue: 54450, ROAS: 3.3 },
      { month: "Jun", Spend: 20200, Revenue: 64640, ROAS: 3.2 },
    ],
    channelData: [
      { name: "Social", CPA: 18, ConvRate: 4.8, color: "#3B82F6" },
      { name: "Email", CPA: 6, ConvRate: 8.5, color: "#10B981" },
      { name: "Search", CPA: 22, ConvRate: 3.9, color: "#F59E0B" },
      { name: "Display", CPA: 34, ConvRate: 2.2, color: "#F43F5E" },
      { name: "SEO", CPA: 9, ConvRate: 5.8, color: "#06B6D4" },
    ],
    funnelData: [
      { stage: "Impressions", value: 150000, percentage: 100, fill: "#3B82F6" },
      { stage: "Clicks", value: 12000, percentage: 8, fill: "#8B5CF6" },
      { stage: "Leads", value: 2400, percentage: 1.6, fill: "#F59E0B" },
      { stage: "Purchases", value: 720, percentage: 0.48, fill: "#10B981" },
    ],
  },
  saas: {
    name: "B2B SaaS",
    kpis: {
      spend: "$42,500",
      revenue: "$212,500",
      roas: "5.0x",
      convRate: "2.1%",
    },
    executiveData: [
      { month: "Jan", Spend: 6000, Revenue: 27000, ROAS: 4.5 },
      { month: "Feb", Spend: 6800, Revenue: 32640, ROAS: 4.8 },
      { month: "Mar", Spend: 7500, Revenue: 39000, ROAS: 5.2 },
      { month: "Apr", Spend: 8500, Revenue: 44200, ROAS: 5.2 },
      { month: "May", Spend: 8200, Revenue: 42640, ROAS: 5.2 },
      { month: "Jun", Spend: 10500, Revenue: 52500, ROAS: 5.0 },
    ],
    channelData: [
      { name: "Social", CPA: 45, ConvRate: 2.1, color: "#3B82F6" },
      { name: "Email", CPA: 15, ConvRate: 4.5, color: "#10B981" },
      { name: "Search", CPA: 55, ConvRate: 2.8, color: "#F59E0B" },
      { name: "Display", CPA: 95, ConvRate: 0.9, color: "#F43F5E" },
      { name: "SEO", CPA: 25, ConvRate: 3.2, color: "#06B6D4" },
    ],
    funnelData: [
      { stage: "Impressions", value: 50000, percentage: 100, fill: "#3B82F6" },
      { stage: "Clicks", value: 3500, percentage: 7, fill: "#8B5CF6" },
      { stage: "Leads", value: 750, percentage: 1.5, fill: "#F59E0B" },
      { stage: "Purchases", value: 180, percentage: 0.36, fill: "#10B981" },
    ],
  },
  leadgen: {
    name: "Lead Generation",
    kpis: {
      spend: "$31,000",
      revenue: "$108,500",
      roas: "3.5x",
      convRate: "3.2%",
    },
    executiveData: [
      { month: "Jan", Spend: 4500, Revenue: 14400, ROAS: 3.2 },
      { month: "Feb", Spend: 4800, Revenue: 16320, ROAS: 3.4 },
      { month: "Mar", Spend: 5200, Revenue: 18720, ROAS: 3.6 },
      { month: "Apr", Spend: 5800, Revenue: 21460, ROAS: 3.7 },
      { month: "May", Spend: 5700, Revenue: 20520, ROAS: 3.6 },
      { month: "Jun", Spend: 6200, Revenue: 21700, ROAS: 3.5 },
    ],
    channelData: [
      { name: "Social", CPA: 30, ConvRate: 2.9, color: "#3B82F6" },
      { name: "Email", CPA: 10, ConvRate: 5.5, color: "#10B981" },
      { name: "Search", CPA: 38, ConvRate: 3.2, color: "#F59E0B" },
      { name: "Display", CPA: 60, ConvRate: 1.2, color: "#F43F5E" },
      { name: "SEO", CPA: 15, ConvRate: 4.1, color: "#06B6D4" },
    ],
    funnelData: [
      { stage: "Impressions", value: 80000, percentage: 100, fill: "#3B82F6" },
      { stage: "Clicks", value: 5500, percentage: 6.8, fill: "#8B5CF6" },
      { stage: "Leads", value: 1100, percentage: 1.38, fill: "#F59E0B" },
      { stage: "Purchases", value: 290, percentage: 0.36, fill: "#10B981" },
    ],
  },
};

// Sync case study KPIs dynamically based on vertical filters
const SEGMENT_KPIS: Record<string, { label: string; value: number; suffix: string; color: string; icon: any }[]> = {
  all: [
    { label: "Campaigns Analyzed", value: 24, suffix: "", color: "#F59E0B", icon: BarChart2 },
    { label: "Revenue Growth Tracked", value: 32, suffix: "%", color: "#10B981", icon: TrendingUp },
    { label: "KPIs Monitored", value: 18, suffix: "+", color: "#3B82F6", icon: Target },
    { label: "Stakeholders Served", value: 12, suffix: "+", color: "#F43F5E", icon: Users },
  ],
  ecommerce: [
    { label: "Campaigns Analyzed", value: 38, suffix: "", color: "#F59E0B", icon: BarChart2 },
    { label: "Revenue Growth Tracked", value: 28, suffix: "%", color: "#10B981", icon: TrendingUp },
    { label: "KPIs Monitored", value: 15, suffix: "+", color: "#3B82F6", icon: Target },
    { label: "Stakeholders Served", value: 16, suffix: "+", color: "#F43F5E", icon: Users },
  ],
  saas: [
    { label: "Campaigns Analyzed", value: 14, suffix: "", color: "#F59E0B", icon: BarChart2 },
    { label: "Revenue Growth Tracked", value: 45, suffix: "%", color: "#10B981", icon: TrendingUp },
    { label: "KPIs Monitored", value: 24, suffix: "+", color: "#3B82F6", icon: Target },
    { label: "Stakeholders Served", value: 8, suffix: "+", color: "#F43F5E", icon: Users },
  ],
  leadgen: [
    { label: "Campaigns Analyzed", value: 19, suffix: "", color: "#F59E0B", icon: BarChart2 },
    { label: "Revenue Growth Tracked", value: 35, suffix: "%", color: "#10B981", icon: TrendingUp },
    { label: "KPIs Monitored", value: 20, suffix: "+", color: "#3B82F6", icon: Target },
    { label: "Stakeholders Served", value: 10, suffix: "+", color: "#F43F5E", icon: Users },
  ],
};

// Sync channel performances
const SEGMENT_CHANNELS: Record<string, { name: string; performance: number; color: string }[]> = {
  all: [
    { name: "Social Media", performance: 78, color: "#3B82F6" },
    { name: "Email Marketing", performance: 92, color: "#10B981" },
    { name: "Paid Search", performance: 61, color: "#F59E0B" },
    { name: "Display Ads", performance: 44, color: "#F43F5E" },
    { name: "Content / SEO", performance: 83, color: "#06B6D4" },
  ],
  ecommerce: [
    { name: "Social Media", performance: 85, color: "#3B82F6" },
    { name: "Email Marketing", performance: 88, color: "#10B981" },
    { name: "Paid Search", performance: 55, color: "#F59E0B" },
    { name: "Display Ads", performance: 68, color: "#F43F5E" },
    { name: "Content / SEO", performance: 74, color: "#06B6D4" },
  ],
  saas: [
    { name: "Social Media", performance: 64, color: "#3B82F6" },
    { name: "Email Marketing", performance: 95, color: "#10B981" },
    { name: "Paid Search", performance: 72, color: "#F59E0B" },
    { name: "Display Ads", performance: 30, color: "#F43F5E" },
    { name: "Content / SEO", performance: 90, color: "#06B6D4" },
  ],
  leadgen: [
    { name: "Social Media", performance: 70, color: "#3B82F6" },
    { name: "Email Marketing", performance: 82, color: "#10B981" },
    { name: "Paid Search", performance: 68, color: "#F59E0B" },
    { name: "Display Ads", performance: 48, color: "#F43F5E" },
    { name: "Content / SEO", performance: 78, color: "#06B6D4" },
  ],
};

// Sync case study insights based on vertical filters
const SEGMENT_INSIGHTS: Record<string, { icon: any; text: string; color: string }[]> = {
  all: [
    { icon: Zap, text: "Identified top-3 underperforming channels via funnel analysis", color: "#F59E0B" },
    { icon: Activity, text: "Built live dashboard tracking 18 campaign KPIs in real-time", color: "#10B981" },
    { icon: Target, text: "Pinpointed 27% budget inefficiency through ROI visualization", color: "#3B82F6" },
    { icon: Star, text: "Presented insights to C-suite, informing Q3 strategy shift", color: "#F43F5E" },
  ],
  ecommerce: [
    { icon: Zap, text: "Optimized retargeting ads, boosting Social performance by 15%", color: "#F59E0B" },
    { icon: Activity, text: "Automated cart abandonment alerts leading to 88% email efficiency", color: "#10B981" },
    { icon: Target, text: "Reduced display ad wastage to salvage $12,000 in Q4 budget", color: "#3B82F6" },
    { icon: Star, text: "Reported ROAS trends to merchants, driving inventory strategies", color: "#F43F5E" },
  ],
  saas: [
    { icon: Zap, text: "Identified B2B SEO high-intent keywords, yielding 90% performance", color: "#F59E0B" },
    { icon: Activity, text: "Integrated CRM pipeline data for full-funnel attribution", color: "#10B981" },
    { icon: Target, text: "Flagged high CPA in display ads, reducing sign-up leakages", color: "#3B82F6" },
    { icon: Star, text: "Aligned marketing goals with sales pipeline metrics for Q3", color: "#F43F5E" },
  ],
  leadgen: [
    { icon: Zap, text: "Re-allocated budget to paid search, increasing lead quality by 25%", color: "#F59E0B" },
    { icon: Activity, text: "Standardized UTM tagging across channels for clean lead capture", color: "#10B981" },
    { icon: Target, text: "Decreased average cost-per-lead (CPA) by 18% in 30 days", color: "#3B82F6" },
    { icon: Star, text: "Provided regional lead density reports to executive board", color: "#F43F5E" },
  ],
};

function AnimatedBar({ width, color, delay = 0, active }: { width: number; color: string; delay?: number; active: boolean }) {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setCurrentWidth(width), delay);
    return () => clearTimeout(timer);
  }, [active, width, delay]);

  return (
    <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${currentWidth}%`,
          background: color,
          transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
}

function CounterKpi({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 2000;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, value]);

  return <span>{count}{suffix}</span>;
}

// Custom formatted tooltips for Recharts
const CustomTooltip = ({ active, payload, label, suffix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-charcoal/95 p-3 shadow-xl backdrop-blur-md text-[11px] font-mono text-paper">
        <p className="text-paper/40 mb-1.5 font-semibold uppercase tracking-wider">{label}</p>
        <div className="space-y-1.5">
          {payload.map((item: any, index: number) => {
            let val = item.value;
            if (item.name === "Spend" || item.name === "CPA") {
              val = `$${val.toLocaleString()}`;
            } else if (item.name === "ROAS") {
              val = `${val}x`;
            } else if (item.name === "ConvRate" || item.name === "Conversion Rate") {
              val = `${val}%`;
            } else if (item.name === "percentage") {
              val = `${val}%`;
            } else {
              val = `${val.toLocaleString()}${suffix}`;
            }
            return (
              <div key={index} className="flex items-center gap-3 justify-between">
                <span className="flex items-center gap-1.5 text-paper/70">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                  {item.name}:
                </span>
                <span className="font-semibold" style={{ color: item.color || item.fill }}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export function Project() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const kpiRef = useRef<HTMLDivElement>(null);
  const kpiVisible = useInView(kpiRef, { once: true, amount: 0.2 });

  const dashboardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: dashboardRef, offset: ["start end", "end start"] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const dashboardRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  const [segment, setSegment] = useState<"all" | "ecommerce" | "saas" | "leadgen">("all");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const segmentOptions: { value: "all" | "ecommerce" | "saas" | "leadgen"; label: string }[] = [
    { value: "all", label: "All Verticals" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "saas", label: "B2B SaaS" },
    { value: "leadgen", label: "Lead Gen" },
  ];

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [marqueeHovered, setMarqueeHovered] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) => (prev !== null && prev < dashboards.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : dashboards.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex]);


  const nextSlide = () => {
    setActiveLightboxIndex((prev) => (prev !== null && prev < dashboards.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : dashboards.length - 1));
  };

  // Live Stream state variables (Slide 3)
  const [liveData, setLiveData] = useState<{ time: string; Users: number; Conversions: number }[]>([]);
  const [liveTotals, setLiveTotals] = useState({ users: 1420, conversions: 58 });
  const [isLivePlaying, setIsLivePlaying] = useState(true);

  // Initialize live data with last 15 points
  useEffect(() => {
    const data = [];
    const baseTime = Date.now() - 30 * 1000; // 30 seconds ago
    for (let i = 0; i < 15; i++) {
      const date = new Date(baseTime + i * 2000);
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      data.push({
        time: timeStr,
        Users: Math.floor(Math.random() * 60) + 80,
        Conversions: Math.floor(Math.random() * 6) + 2,
      });
    }
    setLiveData(data);
  }, []);

  // Interval for streaming real-time mock data
  useEffect(() => {
    if (!isLivePlaying) return;

    const interval = setInterval(() => {
      const date = new Date();
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const newUsers = Math.floor(Math.random() * 60) + 80;
      const newConversions = Math.floor(Math.random() * 6) + 2;

      setLiveData((prev) => {
        const next = [...prev.slice(1), { time: timeStr, Users: newUsers, Conversions: newConversions }];
        return next;
      });

      setLiveTotals((prev) => ({
        users: prev.users + newUsers,
        conversions: prev.conversions + newConversions,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLivePlaying]);

  const tabs = [
    { title: "Exec Summary", icon: TrendingUp },
    { title: "Channels", icon: BarChart2 },
    { title: "Live Monitor", icon: Activity },
    { title: "Funnel Analysis", icon: Target },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-ink/10 py-16 md:py-24 overflow-hidden bg-paper text-ink"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.005] via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">04 — Case Study</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Featured Work</span>
        </div>

        {/* First section (Original Visuals) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-[-0.03em] text-balance">
                Marketing Campaign Performance — <span className="italic">a Power BI story.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-4 text-sm text-mist leading-relaxed">
              An interactive, live analytical report built to bridge media spend with business outcomes. Explore campaign data across verticals, inspect real-time performance, and analyze conversion drop-offs.
            </Reveal>
            <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-mist">
              <span className="rounded-full border border-ink/15 px-3 py-1">Power BI</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">DAX</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">Attribution</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">Executive Reporting</span>
            </Reveal>
          </div>

          {/* Interactive dashboard mock */}
          <motion.div
            ref={dashboardRef}
            style={{ y: dashboardY, rotate: dashboardRotate }}
            className="lg:col-span-8 flex justify-center w-full"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#000000] text-paper shadow-2xl w-full flex flex-col h-[520px]">

              {/* TOP BAR / POWER BI WORKSPACE */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-black px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-500 text-ink font-bold text-[10px]">
                    BI
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-paper/40 leading-none">
                      Power BI Embedded
                    </span>
                    <span className="text-xs font-bold text-paper mt-0.5">
                      {SEGMENTS[segment].name} Performance
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Live Status Indicator */}
                  <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[9px] font-mono text-paper/60">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Live Feed
                  </div>

                  {/* Segment Dropdown Selector — custom dark-themed */}
                  <div className="relative" onBlur={() => setDropdownOpen(false)}>
                    <button
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg pl-2.5 pr-2.5 py-1.5 text-[10px] font-mono text-paper focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer transition-colors"
                    >
                      {segmentOptions.find((o) => o.value === segment)?.label}
                      <SlidersHorizontal size={10} className="text-paper/40" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 z-50 min-w-[130px] overflow-hidden rounded-lg border border-white/[0.12] bg-[#111111] shadow-xl">
                        {segmentOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSegment(opt.value); setDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[10px] font-mono transition-colors ${
                              segment === opt.value
                                ? "bg-amber-500/20 text-amber-400"
                                : "text-paper/70 hover:bg-white/[0.06] hover:text-paper"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* REPORT PAGES NAVIGATION */}
              <div className="flex items-center gap-1 border-b border-white/[0.08] bg-black p-1.5 overflow-x-auto scrollbar-none">
                {tabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium transition-all shrink-0 ${isActive
                        ? "bg-white/[0.08] text-paper border border-white/[0.08] shadow-sm font-semibold"
                        : "text-paper/40 hover:text-paper/70 hover:bg-white/[0.02]"
                        }`}
                    >
                      <Icon size={11} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-amber-400" : ""} />
                      {tab.title}
                    </button>
                  );
                })}
              </div>

              {/* CANVAS / CHART VIEW AREA */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden bg-black">

                {/* PAGE DYNAMIC KPI SUMMARY CARD */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {activeTab === 0 && (
                    <>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Total Spend</div>
                        <div className="text-sm font-bold text-sky-400 mt-0.5">{SEGMENTS[segment].kpis.spend}</div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Total Revenue</div>
                        <div className="text-sm font-bold text-emerald-400 mt-0.5">{SEGMENTS[segment].kpis.revenue}</div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Avg ROAS</div>
                        <div className="text-sm font-bold text-amber-400 mt-0.5">{SEGMENTS[segment].kpis.roas}</div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Conv. Rate</div>
                        <div className="text-sm font-bold text-rose-400 mt-0.5">{SEGMENTS[segment].kpis.convRate}</div>
                      </div>
                    </>
                  )}
                  {activeTab === 1 && (
                    <>
                      <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center justify-around">
                        <div className="text-center">
                          <div className="text-[9px] font-mono text-paper/40 uppercase">Lowest CPA Channel</div>
                          <div className="text-xs font-bold text-emerald-400 mt-0.5">Email Marketing</div>
                        </div>
                        <div className="h-6 w-[1px] bg-white/[0.08]" />
                        <div className="text-center">
                          <div className="text-[9px] font-mono text-paper/40 uppercase">Best CPA</div>
                          <div className="text-xs font-bold text-emerald-400 mt-0.5">
                            ${SEGMENTS[segment].channelData.find(c => c.name === "Email")?.CPA}/acq
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 flex items-center justify-around">
                        <div className="text-center">
                          <div className="text-[9px] font-mono text-paper/40 uppercase">Highest CR Channel</div>
                          <div className="text-xs font-bold text-sky-400 mt-0.5">Email Marketing</div>
                        </div>
                        <div className="h-6 w-[1px] bg-white/[0.08]" />
                        <div className="text-center">
                          <div className="text-[9px] font-mono text-paper/40 uppercase">Max Conversion</div>
                          <div className="text-xs font-bold text-sky-400 mt-0.5">
                            {SEGMENTS[segment].channelData.find(c => c.name === "Email")?.ConvRate}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab === 2 && (
                    <>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Live Visitor Rate</div>
                        <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                          <Activity size={12} className="animate-pulse text-emerald-500" />
                          {liveData.length > 0 ? liveData[liveData.length - 1].Users : 0}/m
                        </div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Live Conv. Rate</div>
                        <div className="text-sm font-bold text-amber-400 mt-0.5">
                          {liveData.length > 0 ? ((liveData[liveData.length - 1].Conversions / liveData[liveData.length - 1].Users) * 100).toFixed(1) : 0}%
                        </div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Total Visitors</div>
                        <div className="text-sm font-bold text-sky-400 mt-0.5">{liveTotals.users}</div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Total Conv.</div>
                        <div className="text-sm font-bold text-rose-400 mt-0.5">{liveTotals.conversions}</div>
                      </div>
                    </>
                  )}
                  {activeTab === 3 && (
                    <>
                      <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Impression-to-Click Rate</div>
                        <div className="text-xs font-bold text-sky-400 mt-0.5">
                          {((SEGMENTS[segment].funnelData[1].value / SEGMENTS[segment].funnelData[0].value) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-lg p-2 text-center">
                        <div className="text-[9px] font-mono text-paper/40 uppercase">Lead-to-Purchase Rate</div>
                        <div className="text-xs font-bold text-emerald-400 mt-0.5">
                          {((SEGMENTS[segment].funnelData[3].value / SEGMENTS[segment].funnelData[2].value) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* THE ACTUAL CHARTS CONTAINER */}
                <div className="flex-1 w-full h-[240px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 0 ? (
                      /* PAGE 1: Spend vs ROAS (Composed Chart) */
                      <ComposedChart
                        data={SEGMENTS[segment].executiveData}
                        margin={{ top: 10, right: -5, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                        <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `$${v / 1000}k`} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `${v}x`} tickLine={false} />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Legend wrapperStyle={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', paddingTop: '5px' }} />
                        <Bar yAxisId="left" dataKey="Spend" fill="#3B82F6" name="Spend" radius={[3, 3, 0, 0]} barSize={28} />
                        <Line yAxisId="right" type="monotone" dataKey="ROAS" stroke="#F59E0B" name="ROAS" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                      </ComposedChart>
                    ) : activeTab === 1 ? (
                      /* PAGE 2: CPA vs Conv Rate (Composed Chart) */
                      <ComposedChart
                        data={SEGMENTS[segment].channelData}
                        margin={{ top: 10, right: -5, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                        <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `$${v}`} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `${v}%`} tickLine={false} />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Legend wrapperStyle={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', paddingTop: '5px' }} />
                        <Bar yAxisId="left" dataKey="CPA" name="CPA (Cost per Acq)" radius={[3, 3, 0, 0]} barSize={24}>
                          {SEGMENTS[segment].channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                        <Line yAxisId="right" type="monotone" dataKey="ConvRate" stroke="#10B981" name="Conversion Rate" strokeWidth={2.5} dot={{ r: 3 }} />
                      </ComposedChart>
                    ) : activeTab === 2 ? (
                      /* PAGE 3: Live Monitor (Area Chart) */
                      <AreaChart
                        data={liveData}
                        margin={{ top: 10, right: -5, left: -20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} tickFormatter={(t) => t.split(':').slice(1).join(':')} />
                        <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                        <Legend wrapperStyle={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', paddingTop: '5px' }} />
                        <Area yAxisId="left" type="monotone" dataKey="Users" stroke="#10B981" fillOpacity={1} fill="url(#colorUsers)" name="Active Visitors" strokeWidth={2} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="Conversions" stroke="#F59E0B" name="Conversions" strokeWidth={2} dot={{ r: 2 }} />
                      </AreaChart>
                    ) : (
                      /* PAGE 4: Funnel Analysis (Horizontal Bar Chart) */
                      <BarChart
                        layout="vertical"
                        data={SEGMENTS[segment].funnelData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                        <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v} />
                        <YAxis type="category" dataKey="stage" stroke="rgba(255,255,255,0.5)" fontSize={9} width={80} tickLine={false} />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Bar dataKey="value" name="Volume" radius={[0, 4, 4, 0]} barSize={20}>
                          {SEGMENTS[segment].funnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>

                {/* PLAYBACK CONTROLS (Only visible on Live Monitor) */}
                {activeTab === 2 && (
                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-2">
                    <span className="text-[9px] font-mono text-paper/30">
                      Auto-ticking every 2s
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const date = new Date();
                          const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                          setLiveData((prev) => [
                            ...prev.slice(1),
                            {
                              time: timeStr,
                              Users: Math.floor(Math.random() * 60) + 80,
                              Conversions: Math.floor(Math.random() * 6) + 2,
                            }
                          ]);
                        }}
                        className="flex items-center gap-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2 py-1 text-[9px] font-mono transition-colors text-paper"
                      >
                        <RefreshCw size={9} /> Force Tick
                      </button>
                      <button
                        onClick={() => setIsLivePlaying(!isLivePlaying)}
                        className={`flex items-center gap-1 rounded px-2.5 py-1 text-[9px] font-mono transition-colors ${isLivePlaying
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          }`}
                      >
                        {isLivePlaying ? (
                          <>
                            <Pause size={9} fill="currentColor" /> Pause Feed
                          </>
                        ) : (
                          <>
                            <Play size={9} fill="currentColor" /> Resume Feed
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* REPORT BOTTOM NAVIGATION BAR */}
              <div className="flex items-center justify-between border-t border-white/[0.08] bg-black px-4 py-2 text-[10px] font-mono text-paper/40">
                <div className="flex items-center gap-1.5">
                  <Globe size={11} className="text-amber-500/70" />
                  <span>https://app.powerbi.com/ayush-portfolio</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1))}
                    className="hover:text-paper transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="font-semibold text-paper/60">
                    Page {activeTab + 1} of {tabs.length}
                  </span>
                  <button
                    onClick={() => setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0))}
                    className="hover:text-paper transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5">
                  <span>Zoom: Fit to page</span>
                  <div className="h-2 w-[1px] bg-white/10 mx-1" />
                  <Database size={10} className="text-sky-400" />
                  <span>SQL Server</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sliding Image Marquee Strip */}
        <div className="mt-16 animate-fade-in">
          {/* Label row */}
          <div className="mb-6 flex items-center justify-between px-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Dashboard Pages</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Power BI · 4 Views</span>
          </div>

          {/* Overflow container with edge fade */}
          <div
            className="marquee-container relative overflow-hidden rounded-2xl"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <div
              className="marquee-track flex gap-5"
              style={{
                width: "max-content",
                animation: "marquee-rtl 18s linear infinite",
                animationPlayState: marqueeHovered ? "paused" : "running",
              }}
            >
              {[...images, ...images].map((src, i) => (
                <div
                  key={i}
                  onMouseEnter={() => {
                    setMarqueeHovered(true);
                    setActiveLightboxIndex(i % images.length);
                  }}
                  onMouseLeave={() => {
                    setMarqueeHovered(false);
                    setActiveLightboxIndex(null);
                  }}
                  className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-ink/10 shadow-lg"
                  style={{ width: "clamp(300px, 36vw, 560px)", aspectRatio: "16/10" }}
                >
                  <img
                    src={src}
                    alt={`Dashboard view ${(i % images.length) + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400" />
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee-rtl {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          {/* CTA FOOTER */}
          <div className="mt-12 pt-8 border-t border-ink/10 flex justify-end">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal hover:text-ink transition-colors duration-300 group cursor-pointer"
            >
              Discuss this work
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md pointer-events-none"
          >
            {/* Top Header info */}
            <div className="absolute top-6 left-6 text-white/70 font-mono text-[11px] tracking-wider uppercase">
              <span className="font-semibold text-white">{dashboards[activeLightboxIndex].title}</span>
              <span className="mx-2">·</span>
              <span>{activeLightboxIndex + 1} / {images.length}</span>
            </div>

            {/* Main Image View */}
            <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center">
              <motion.img
                key={activeLightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                src={images[activeLightboxIndex]}
                alt={dashboards[activeLightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            {/* Description metadata */}
            <div className="absolute bottom-8 text-center max-w-xl px-4">
              <p className="text-white text-sm font-medium mb-2">{dashboards[activeLightboxIndex].description}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {dashboards[activeLightboxIndex].tags.map((tag, idx) => (
                  <span key={idx} className="font-mono text-[9px] uppercase tracking-widest text-white/50 border border-white/10 rounded-full px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
