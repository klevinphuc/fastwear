import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Banknote,
  BarChart3,
  CalendarClock,
  CircleDollarSign,
  Globe2,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Bảng quản trị — FASTWear" },
      {
        name: "description",
        content: "Bảng quản trị dữ liệu mẫu cho chủ shop FASTWear theo dõi hiệu suất kinh doanh.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

const adminStats = {
  totalRevenue: 186500000,
  totalOrders: 428,
  totalUsers: 1240,
  websiteVisitors: 52800,
  activeRentals: 37,
  conversionRate: 4.8,
};

const monthlyBusinessData = [
  { month: "T1", revenue: 11200000, orders: 24 },
  { month: "T2", revenue: 16800000, orders: 35 },
  { month: "T3", revenue: 21400000, orders: 46 },
  { month: "T4", revenue: 19600000, orders: 42 },
  { month: "T5", revenue: 24700000, orders: 55 },
  { month: "T6", revenue: 29800000, orders: 63 },
  { month: "T7", revenue: 33200000, orders: 71 },
  { month: "T8", revenue: 42100000, orders: 92 },
];

const userGrowthData = [
  { month: "T1", users: 760, returning: 210 },
  { month: "T2", users: 828, returning: 248 },
  { month: "T3", users: 904, returning: 286 },
  { month: "T4", users: 990, returning: 314 },
  { month: "T5", users: 1086, returning: 352 },
  { month: "T6", users: 1148, returning: 391 },
  { month: "T7", users: 1198, returning: 426 },
  { month: "T8", users: 1240, returning: 468 },
];

const trafficSources = [
  {
    source: "search",
    label: "Tìm kiếm",
    visitors: 18480,
    share: 35,
    color: "#146c54",
    fill: "var(--color-search)",
  },
  {
    source: "social",
    label: "Mạng xã hội",
    visitors: 15312,
    share: 29,
    color: "#3d5a80",
    fill: "var(--color-social)",
  },
  {
    source: "direct",
    label: "Trực tiếp",
    visitors: 10032,
    share: 19,
    color: "#8f3f71",
    fill: "var(--color-direct)",
  },
  {
    source: "referral",
    label: "Giới thiệu",
    visitors: 6336,
    share: 12,
    color: "#d08a2d",
    fill: "var(--color-referral)",
  },
  {
    source: "ads",
    label: "Quảng cáo",
    visitors: 2640,
    share: 5,
    color: "#b84a62",
    fill: "var(--color-ads)",
  },
];

const productPerformance = [
  {
    name: "Đầm lụa champagne",
    category: "Đầm dự tiệc",
    rentals: 86,
    revenue: 25800000,
    utilization: 92,
    status: "Bán chạy",
  },
  {
    name: "Suit linen xanh rêu",
    category: "Suit nam",
    rentals: 64,
    revenue: 17920000,
    utilization: 84,
    status: "Ổn định",
  },
  {
    name: "Áo dài gấm đỏ",
    category: "Áo dài",
    rentals: 58,
    revenue: 19140000,
    utilization: 88,
    status: "Tăng mạnh",
  },
  {
    name: "Set blazer ivory",
    category: "Công sở",
    rentals: 47,
    revenue: 11750000,
    utilization: 73,
    status: "Theo dõi",
  },
];

const activeRentalQueue = [
  {
    code: "FW-1048",
    customer: "Minh Anh",
    item: "Đầm lụa champagne",
    due: "Hôm nay",
    value: 1450000,
  },
  {
    code: "FW-1045",
    customer: "Quang Huy",
    item: "Suit linen xanh rêu",
    due: "01/06",
    value: 1280000,
  },
  { code: "FW-1039", customer: "Bảo Trân", item: "Áo dài gấm đỏ", due: "02/06", value: 1620000 },
  { code: "FW-1036", customer: "Gia Linh", item: "Set blazer ivory", due: "03/06", value: 980000 },
];

const revenueChartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "#146c54",
  },
} satisfies ChartConfig;

const ordersChartConfig = {
  orders: {
    label: "Đơn hàng",
    color: "#3d5a80",
  },
} satisfies ChartConfig;

const usersChartConfig = {
  users: {
    label: "Tổng người dùng",
    color: "#8f3f71",
  },
  returning: {
    label: "Khách quay lại",
    color: "#d08a2d",
  },
} satisfies ChartConfig;

const trafficChartConfig = {
  search: {
    label: "Tìm kiếm",
    color: "#146c54",
  },
  social: {
    label: "Mạng xã hội",
    color: "#3d5a80",
  },
  direct: {
    label: "Trực tiếp",
    color: "#8f3f71",
  },
  referral: {
    label: "Giới thiệu",
    color: "#d08a2d",
  },
  ads: {
    label: "Quảng cáo",
    color: "#b84a62",
  },
} satisfies ChartConfig;

const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("vi-VN");

function AdminDashboardPage() {
  const overviewCards = [
    {
      title: "Tổng doanh thu",
      value: formatVND(adminStats.totalRevenue),
      delta: "+18,4% so với tháng trước",
      icon: CircleDollarSign,
      accent: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Tổng đơn hàng",
      value: numberFormatter.format(adminStats.totalOrders),
      delta: "+42 đơn mới",
      icon: ShoppingBag,
      accent: "text-blue-700 bg-blue-50",
    },
    {
      title: "Tổng người dùng",
      value: numberFormatter.format(adminStats.totalUsers),
      delta: "+96 tài khoản",
      icon: Users,
      accent: "text-fuchsia-700 bg-fuchsia-50",
    },
    {
      title: "Lượt truy cập website",
      value: numberFormatter.format(adminStats.websiteVisitors),
      delta: "+12,7% traffic",
      icon: Globe2,
      accent: "text-amber-700 bg-amber-50",
    },
    {
      title: "Đơn thuê đang hoạt động",
      value: numberFormatter.format(adminStats.activeRentals),
      delta: "9 đơn cần trả trong 48h",
      icon: PackageCheck,
      accent: "text-teal-700 bg-teal-50",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: `${adminStats.conversionRate}%`,
      delta: "+0,6 điểm",
      icon: TrendingUp,
      accent: "text-rose-700 bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f4] text-[#202620]">
      <header className="sticky top-0 z-30 border-b border-[#dde2dc] bg-[#fbfbf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#163f32] text-sm font-black text-white">
              FW
            </div>
            <div>
              <div className="text-sm font-semibold uppercase text-[#647067]">FASTWear</div>
              <div className="text-lg font-bold leading-tight">Bảng quản trị</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg border border-[#d9ddd6] bg-white px-3 py-2 text-[#59645b]">
              Dữ liệu mẫu - 31/05/2026
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#163f32] px-3 py-2 font-semibold text-white transition hover:bg-[#0f3026]"
            >
              Trang bán hàng
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] space-y-6 px-4 py-5 md:px-6 lg:py-7">
        <section className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[#657168]">Tổng quan kinh doanh</p>
            <h1 className="mt-1 text-3xl font-bold tracking-normal md:text-4xl">
              Hiệu suất cho thuê thời trang
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm sm:flex">
            <MetricPill label="Doanh thu TB/đơn" value={formatVND(436000)} />
            <MetricPill label="Tồn kho sẵn sàng" value="312 sản phẩm" />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {overviewCards.map((card) => (
            <OverviewCard key={card.title} {...card} />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <DashboardChartCard
            title="Doanh thu theo tháng"
            description="Doanh thu mẫu từ đơn thuê đã thanh toán"
            icon={Banknote}
          >
            <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
              <BarChart data={monthlyBusinessData} margin={{ left: 8, right: 8, top: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${Number(value) / 1000000}tr`}
                  width={42}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => (
                        <>
                          <span className="text-muted-foreground">Doanh thu</span>
                          <span className="ml-auto font-mono font-medium text-foreground">
                            {formatVND(Number(value))}
                          </span>
                        </>
                      )}
                    />
                  }
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </DashboardChartCard>

          <DashboardChartCard
            title="Đơn hàng theo tháng"
            description="Số đơn thuê hoàn tất và đang xử lý"
            icon={ShoppingBag}
          >
            <ChartContainer config={ordersChartConfig} className="h-[300px] w-full">
              <AreaChart data={monthlyBusinessData} margin={{ left: 8, right: 8, top: 12 }}>
                <defs>
                  <linearGradient id="ordersFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={34} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="var(--color-orders)"
                  fill="url(#ordersFill)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </DashboardChartCard>

          <DashboardChartCard
            title="Tăng trưởng người dùng"
            description="Tổng tài khoản và nhóm khách quay lại"
            icon={Users}
          >
            <ChartContainer config={usersChartConfig} className="h-[300px] w-full">
              <LineChart data={userGrowthData} margin={{ left: 8, right: 8, top: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={42} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="returning"
                  stroke="var(--color-returning)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </DashboardChartCard>

          <DashboardChartCard
            title="Nguồn truy cập website"
            description="Phân bổ lượt truy cập mẫu theo kênh"
            icon={Globe2}
          >
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <ChartContainer config={trafficChartConfig} className="h-[300px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="source" />} />
                  <Pie
                    data={trafficSources}
                    dataKey="visitors"
                    nameKey="source"
                    innerRadius={62}
                    outerRadius={96}
                    paddingAngle={3}
                  >
                    {trafficSources.map((item) => (
                      <Cell key={item.source} fill={item.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="source" />} />
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col justify-center gap-2">
                {trafficSources.map((source) => (
                  <div
                    key={source.source}
                    className="rounded-lg border border-[#e2e5df] bg-white p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">{source.label}</span>
                      <span className="text-sm text-[#657168]">{source.share}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf0eb]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${source.share}%`,
                          backgroundColor: source.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardChartCard>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-lg border-[#dfe3dd] bg-white shadow-sm">
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0 p-5">
              <div>
                <CardTitle className="text-lg">Hiệu suất sản phẩm</CardTitle>
                <p className="mt-1 text-sm text-[#657168]">Sản phẩm nổi bật theo lượt thuê</p>
              </div>
              <BarChart3 className="h-5 w-5 text-[#657168]" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-y border-[#e3e6e0] bg-[#f7f8f5] text-xs uppercase text-[#657168]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Sản phẩm</th>
                      <th className="px-5 py-3 font-semibold">Danh mục</th>
                      <th className="px-5 py-3 font-semibold">Lượt thuê</th>
                      <th className="px-5 py-3 font-semibold">Doanh thu</th>
                      <th className="px-5 py-3 font-semibold">Tỷ lệ sử dụng</th>
                      <th className="px-5 py-3 font-semibold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance.map((product) => (
                      <tr key={product.name} className="border-b border-[#edf0eb] last:border-0">
                        <td className="px-5 py-4 font-semibold">{product.name}</td>
                        <td className="px-5 py-4 text-[#657168]">{product.category}</td>
                        <td className="px-5 py-4">{numberFormatter.format(product.rentals)}</td>
                        <td className="px-5 py-4">{formatVND(product.revenue)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#edf0eb]">
                              <div
                                className="h-full rounded-full bg-[#146c54]"
                                style={{ width: `${product.utilization}%` }}
                              />
                            </div>
                            <span>{product.utilization}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-lg border border-[#dfe3dd] bg-[#f9faf7] px-2.5 py-1 text-xs font-semibold">
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-[#dfe3dd] bg-white shadow-sm">
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0 p-5">
              <div>
                <CardTitle className="text-lg">Đơn thuê đang hoạt động</CardTitle>
                <p className="mt-1 text-sm text-[#657168]">
                  {adminStats.activeRentals} đơn trong chu kỳ hiện tại
                </p>
              </div>
              <CalendarClock className="h-5 w-5 text-[#657168]" />
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              {activeRentalQueue.map((rental) => (
                <div
                  key={rental.code}
                  className="rounded-lg border border-[#e2e5df] bg-[#fbfcf9] p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{rental.customer}</div>
                      <div className="mt-1 text-sm text-[#657168]">{rental.item}</div>
                    </div>
                    <span className="rounded-lg bg-[#163f32] px-2.5 py-1 text-xs font-semibold text-white">
                      {rental.due}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-[#657168]">{rental.code}</span>
                    <span className="font-semibold">{formatVND(rental.value)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <Card className="rounded-lg border-[#dfe3dd] bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#657168]">{title}</p>
            <div className="mt-2 truncate text-2xl font-bold tracking-normal text-[#202620]">
              {value}
            </div>
          </div>
          <div
            className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", accent)}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#146c54]">
          <TrendingUp className="h-3.5 w-3.5" />
          {delta}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardChartCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg border-[#dfe3dd] bg-white shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0 p-5">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="mt-1 text-sm text-[#657168]">{description}</p>
        </div>
        <Icon className="mt-0.5 h-5 w-5 text-[#657168]" />
      </CardHeader>
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </Card>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#d9ddd6] bg-white px-3 py-2">
      <div className="text-xs text-[#657168]">{label}</div>
      <div className="mt-0.5 text-sm font-bold">{value}</div>
    </div>
  );
}

function formatVND(value: number) {
  return vndFormatter.format(value);
}
