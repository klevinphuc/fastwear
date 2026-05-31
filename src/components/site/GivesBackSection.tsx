import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type SupportMode = "money" | "items";
type PaymentMethodId = "momo" | "zalopay" | "bank";
type DeliveryMethod = "dropoff" | "pickup";

type Campaign = {
  id: string;
  tag: string;
  badge: string;
  icon: string;
  title: string;
  ctaLine: string;
  description: string;
  cardDescription: string;
  raised: string;
  goal: string;
  percent: number;
  supporters: number;
  daysLeft: number;
  image: string;
  moneyAmounts: string[];
  moneyImpact: string[];
  itemTypes: string[];
  moneySuccessMessage: string;
  itemSuccessMessage: string;
};

const campaigns = [
  {
    id: "tu-quan-ao-cho-em",
    tag: "TRẺ EM",
    badge: "Trẻ em",
    icon: "👗",
    title: "Tủ Quần Áo Cho Em",
    ctaLine: "Cùng FASTWear mang niềm vui mặc đẹp đến trẻ em vùng cao.",
    description:
      "Mỗi phần ủng hộ sẽ được FASTWear dùng để trao tặng quần áo sạch đẹp, áo ấm và dụng cụ học tập cho trẻ em vùng cao trước mùa tựu trường.",
    cardDescription:
      "Trao tặng trang phục sạch đẹp và dụng cụ học tập cho trẻ em vùng cao trước mùa tựu trường.",
    raised: "12.500.000đ",
    goal: "20.000.000đ",
    percent: 63,
    supporters: 342,
    daysLeft: 15,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
    moneyAmounts: ["20.000đ", "30.000đ", "50.000đ", "100.000đ", "200.000đ"],
    moneyImpact: [
      "20.000đ có thể góp một phần dụng cụ học tập.",
      "50.000đ có thể góp một phần áo ấm hoặc balo.",
      "100.000đ+ giúp FASTWear chuẩn bị thêm nhiều phần quà trọn vẹn hơn.",
    ],
    itemTypes: [
      "Quần áo trẻ em",
      "Áo ấm",
      "Dụng cụ học tập",
      "Balo / cặp sách",
      "Giày dép trẻ em",
      "Khác",
    ],
    moneySuccessMessage:
      "FASTWear đã ghi nhận thông tin ủng hộ của bạn. Cảm ơn bạn đã cùng chúng tôi mang niềm vui đến các em nhỏ.",
    itemSuccessMessage:
      "FASTWear đã nhận thông tin gửi tặng của bạn. Chúng tôi sẽ liên hệ để xác nhận lịch nhận hiện vật trong thời gian sớm nhất.",
  },
  {
    id: "xanh-hoa-thoi-trang",
    tag: "MÔI TRƯỜNG",
    badge: "Môi trường",
    icon: "♻️",
    title: "Xanh Hóa Thời Trang",
    ctaLine: "Cùng FASTWear kéo dài vòng đời thời trang và giảm rác thải dệt may.",
    description:
      "Khoản đóng góp của bạn sẽ hỗ trợ FASTWear thu gom, phân loại, tái chế vải thừa và xử lý quần áo cũ sau mỗi mùa thuê một cách có trách nhiệm hơn.",
    cardDescription:
      "Tái chế vải thừa và thu gom quần áo cũ để giảm rác thải dệt may sau mỗi mùa thuê.",
    raised: "8.200.000đ",
    goal: "15.000.000đ",
    percent: 55,
    supporters: 218,
    daysLeft: 23,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=85",
    moneyAmounts: ["20.000đ", "50.000đ", "100.000đ", "150.000đ", "300.000đ"],
    moneyImpact: [
      "20.000đ hỗ trợ chi phí phân loại vải.",
      "50.000đ hỗ trợ chi phí vận chuyển đồ cũ đến điểm thu gom.",
      "100.000đ+ góp phần tài trợ hoạt động tái chế và xử lý vải sau sử dụng.",
    ],
    itemTypes: [
      "Quần áo cũ còn sử dụng được",
      "Vải thừa / vải vụn",
      "Túi vải / túi tái sử dụng",
      "Móc treo",
      "Phụ kiện thời trang cũ",
      "Khác",
    ],
    moneySuccessMessage:
      "Cảm ơn bạn đã cùng FASTWear xanh hóa thời trang. Đóng góp của bạn sẽ được dùng cho các hoạt động thu gom và tái chế có trách nhiệm.",
    itemSuccessMessage:
      "FASTWear đã ghi nhận thông tin đóng góp của bạn. Chúng tôi sẽ phân loại và xử lý hiện vật theo hướng tái sử dụng hoặc tái chế phù hợp.",
  },
  {
    id: "tu-tin-toa-sang",
    tag: "CỘNG ĐỒNG",
    badge: "Cộng đồng",
    icon: "✨",
    title: "Tự Tin Tỏa Sáng",
    ctaLine: "Cùng FASTWear tiếp thêm sự tự tin cho phụ nữ trên hành trình việc làm.",
    description:
      "Khoản đóng góp sẽ hỗ trợ trang phục phỏng vấn, workshop phong thái và các hoạt động giúp phụ nữ có hoàn cảnh khó khăn tự tin hơn khi tìm kiếm cơ hội nghề nghiệp.",
    cardDescription:
      "Hỗ trợ trang phục phỏng vấn và workshop phong thái cho phụ nữ đang tìm cơ hội việc làm.",
    raised: "5.800.000đ",
    goal: "10.000.000đ",
    percent: 58,
    supporters: 156,
    daysLeft: 31,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    moneyAmounts: ["30.000đ", "50.000đ", "100.000đ", "200.000đ", "500.000đ"],
    moneyImpact: [
      "50.000đ hỗ trợ một phần chi phí chuẩn bị trang phục phỏng vấn.",
      "100.000đ hỗ trợ hoạt động workshop phong thái và định hướng hình ảnh cá nhân.",
      "200.000đ+ góp phần tài trợ trọn gói hỗ trợ cho một người tham gia chương trình.",
    ],
    itemTypes: [
      "Áo sơ mi công sở",
      "Blazer / vest nữ",
      "Quần tây / chân váy công sở",
      "Giày công sở",
      "Túi xách đi làm",
      "Phụ kiện thanh lịch",
      "Khác",
    ],
    moneySuccessMessage:
      "Cảm ơn bạn đã cùng FASTWear tiếp thêm sự tự tin cho những phụ nữ đang tìm kiếm cơ hội mới.",
    itemSuccessMessage:
      "FASTWear đã nhận thông tin đóng góp của bạn. Món quà này sẽ được chuẩn bị để trao đến những người cần thêm sự tự tin trong hành trình nghề nghiệp.",
  },
] satisfies Campaign[];

const impactStats = [
  { value: "1.247", label: "LƯỢT ỦNG HỘ" },
  { value: "26.500.000", label: "TỔNG ĐÃ QUYÊN (đ)" },
  { value: "890", label: "BỘ ĐỒ ĐÃ TRAO TẶNG" },
];

const paymentMethods: Record<
  PaymentMethodId,
  { label: string; image: string; note: string }
> = {
  momo: {
    label: "MoMo",
    image: "/payment/momo-qr.jpg",
    note: "Quét QR MoMo và ghi nội dung chuyển khoản theo tên chiến dịch.",
  },
  zalopay: {
    label: "ZaloPay",
    image: "/payment/zalopay-qr.png",
    note: "Quét QR ZaloPay và ghi nội dung chuyển khoản theo tên chiến dịch.",
  },
  bank: {
    label: "Chuyển khoản ngân hàng",
    // TODO: Replace with a dedicated bank transfer QR image when available in public/payment.
    image: "/payment/bank-qr.png",
    note: "Tạm dùng QR hiện có để minh họa luồng chuyển khoản ngân hàng.",
  },
};

function GivingCampaignModal({
  campaign,
  open,
  onOpenChange,
}: {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [supportMode, setSupportMode] = useState<SupportMode>("money");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("momo");
  const [itemType, setItemType] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("dropoff");
  const [pickupAddress, setPickupAddress] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [successMode, setSuccessMode] = useState<SupportMode | null>(null);

  useEffect(() => {
    if (!campaign) return;

    setSupportMode("money");
    setSelectedAmount(campaign.moneyAmounts[0]);
    setCustomAmount("");
    setPaymentMethod("momo");
    setItemType(campaign.itemTypes[0]);
    setItemQuantity("");
    setDeliveryMethod("dropoff");
    setPickupAddress("");
    setAvailableTime("");
    setItemNote("");
    setSenderName("");
    setSenderPhone("");
    setSenderEmail("");
    setAnonymous(false);
    setMessage("");
    setSuccessMode(null);
  }, [campaign]);

  if (!campaign) return null;

  const payment = paymentMethods[paymentMethod];
  const amountLabel = customAmount.trim() || selectedAmount;
  const successMessage =
    successMode === "items" ? campaign.itemSuccessMessage : campaign.moneySuccessMessage;

  const continueSupporting = () => {
    setSuccessMode(null);
    setSupportMode("money");
    setSelectedAmount(campaign.moneyAmounts[0]);
    setCustomAmount("");
    setPaymentMethod("momo");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-[#ded3bc] bg-[#fbf8ef] p-0 text-[#1c1410] shadow-2xl sm:max-w-5xl">
        <DialogHeader className="border-b border-[#e5dac4] px-5 py-5 text-left sm:px-7">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#1d4e3f] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbf8ef]">
              {campaign.badge}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b7650]">
              {campaign.percent}% mục tiêu
            </span>
          </div>
          <DialogTitle className="font-serif text-3xl leading-tight sm:text-4xl">
            {campaign.title}
          </DialogTitle>
          <DialogDescription className="max-w-3xl text-sm leading-6 text-[#1c1410]/68">
            {campaign.ctaLine}
          </DialogDescription>
        </DialogHeader>

        {successMode ? (
          <div className="px-5 py-10 sm:px-7">
            <div className="mx-auto max-w-2xl rounded-[28px] border border-[#e5dac4] bg-white/70 p-8 text-center shadow-[0_20px_50px_rgba(28,20,16,0.08)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1d4e3f] text-2xl text-[#fbf8ef]">
                ✓
              </div>
              <h3 className="mt-5 font-serif text-3xl">FASTWear đã ghi nhận</h3>
              <p className="mt-3 text-sm leading-6 text-[#1c1410]/70">{successMessage}</p>
              <button
                type="button"
                onClick={continueSupporting}
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1d4e3f] px-6 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
              >
                Tiếp tục ủng hộ
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <section className="space-y-5 border-b border-[#e5dac4] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="overflow-hidden rounded-[24px] border border-[#e5dac4] bg-white/45">
                <img
                  src={campaign.image}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b7650]">
                  Tác động chiến dịch
                </p>
                <p className="mt-2 text-sm leading-6 text-[#1c1410]/72">{campaign.description}</p>
              </div>

              <div className="rounded-[24px] border border-[#e5dac4] bg-white/58 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <strong>{campaign.raised}</strong>
                  <span className="text-[#1c1410]/58">Mục tiêu {campaign.goal}</span>
                </div>
                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8ddc8]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={campaign.percent}
                >
                  <span
                    className="block h-full rounded-full bg-[#1d4e3f]"
                    style={{ width: `${campaign.percent}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7650]">
                  <span>{campaign.supporters} người ủng hộ</span>
                  <span>{campaign.daysLeft} ngày còn lại</span>
                </div>
              </div>

              {supportMode === "money" ? (
                <div className="rounded-[24px] border border-[#e5dac4] bg-white/58 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b7650]">
                        {payment.label}
                      </p>
                      <p className="mt-1 text-sm text-[#1c1410]/68">
                        Số tiền: <strong>{amountLabel}</strong>
                      </p>
                    </div>
                    <img
                      src={payment.image}
                      alt={`QR ${payment.label}`}
                      className="h-24 w-24 rounded-xl border border-[#e5dac4] bg-white object-contain p-1"
                    />
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#1c1410]/58">{payment.note}</p>
                </div>
              ) : (
                <div className="rounded-[24px] border border-[#e5dac4] bg-white/58 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b7650]">
                    Gợi ý hiện vật
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {campaign.itemTypes.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-[#e5dac4] bg-[#fbf8ef] px-3 py-1 text-xs font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="p-5 sm:p-7">
              <Tabs
                value={supportMode}
                onValueChange={(value) => setSupportMode(value as SupportMode)}
              >
                <TabsList className="grid h-auto w-full grid-cols-2 rounded-full bg-[#e9ddc8] p-1">
                  <TabsTrigger
                    value="money"
                    className="rounded-full px-3 py-2 data-[state=active]:bg-white"
                  >
                    Ủng hộ bằng tiền
                  </TabsTrigger>
                  <TabsTrigger
                    value="items"
                    className="rounded-full px-3 py-2 data-[state=active]:bg-white"
                  >
                    Quyên góp hiện vật
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="money" className="mt-6 space-y-6">
                  <div>
                    <label className="text-sm font-semibold">Chọn số tiền ủng hộ</label>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {campaign.moneyAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={`min-h-11 rounded-full border px-3 text-sm font-semibold transition ${
                            !customAmount && selectedAmount === amount
                              ? "border-[#1d4e3f] bg-[#1d4e3f] text-[#fbf8ef]"
                              : "border-[#d8cdb5] bg-white/58 text-[#1c1410] hover:border-[#1d4e3f]"
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Số tiền khác">
                    <Input
                      value={customAmount}
                      onChange={(event) => setCustomAmount(event.target.value)}
                      placeholder="Nhập số tiền bạn muốn ủng hộ"
                      className="border-[#d8cdb5] bg-white/70"
                    />
                  </Field>

                  <div>
                    <label className="text-sm font-semibold">Phương thức thanh toán</label>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {(Object.keys(paymentMethods) as PaymentMethodId[]).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`rounded-2xl border p-3 text-left text-sm font-semibold transition ${
                            paymentMethod === method
                              ? "border-[#1d4e3f] bg-[#1d4e3f] text-[#fbf8ef]"
                              : "border-[#d8cdb5] bg-white/58 hover:border-[#1d4e3f]"
                          }`}
                        >
                          {paymentMethods[method].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[22px] bg-[#f2eadc] p-4">
                    <p className="text-sm font-semibold">Gợi ý tác động</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#1c1410]/68">
                      {campaign.moneyImpact.map((impact) => (
                        <li key={impact}>• {impact}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSuccessMode("money")}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1d4e3f] px-6 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
                  >
                    Tôi đã chuyển khoản
                  </button>
                </TabsContent>

                <TabsContent value="items" className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Loại hiện vật">
                      <select
                        value={itemType}
                        onChange={(event) => setItemType(event.target.value)}
                        className="h-9 w-full rounded-md border border-[#d8cdb5] bg-white/70 px-3 text-sm outline-none focus:ring-1 focus:ring-[#1d4e3f]"
                      >
                        {campaign.itemTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Số lượng ước tính">
                      <Input
                        value={itemQuantity}
                        onChange={(event) => setItemQuantity(event.target.value)}
                        placeholder="Ví dụ: 5 món"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                  </div>

                  <Field label="Hình thức gửi">
                    <select
                      value={deliveryMethod}
                      onChange={(event) => setDeliveryMethod(event.target.value as DeliveryMethod)}
                      className="h-9 w-full rounded-md border border-[#d8cdb5] bg-white/70 px-3 text-sm outline-none focus:ring-1 focus:ring-[#1d4e3f]"
                    >
                      <option value="dropoff">Tôi mang đến showroom FASTWear</option>
                      <option value="pickup">FASTWear hỗ trợ qua lấy tận nhà</option>
                    </select>
                  </Field>

                  {deliveryMethod === "pickup" ? (
                    <Field label="Địa chỉ lấy hàng">
                      <Input
                        value={pickupAddress}
                        onChange={(event) => setPickupAddress(event.target.value)}
                        placeholder="Nhập địa chỉ để FASTWear liên hệ nhận"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Thời gian phù hợp">
                      <Input
                        value={availableTime}
                        onChange={(event) => setAvailableTime(event.target.value)}
                        placeholder="Ví dụ: cuối tuần, sau 18h"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                    <Field label="Họ và tên">
                      <Input
                        value={senderName}
                        onChange={(event) => setSenderName(event.target.value)}
                        placeholder="Tên người gửi"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Số điện thoại">
                      <Input
                        value={senderPhone}
                        onChange={(event) => setSenderPhone(event.target.value)}
                        placeholder="Số điện thoại liên hệ"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        type="email"
                        value={senderEmail}
                        onChange={(event) => setSenderEmail(event.target.value)}
                        placeholder="Email của bạn"
                        className="border-[#d8cdb5] bg-white/70"
                      />
                    </Field>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(event) => setAnonymous(event.target.checked)}
                      className="h-4 w-4 accent-[#1d4e3f]"
                    />
                    Tôi muốn ủng hộ ẩn danh
                  </label>

                  <Field label="Ghi chú">
                    <Textarea
                      value={itemNote}
                      onChange={(event) => setItemNote(event.target.value)}
                      placeholder="Tình trạng hiện vật, thông tin cần lưu ý"
                      className="border-[#d8cdb5] bg-white/70"
                    />
                  </Field>

                  <Field label="Lời nhắn gửi kèm">
                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Một lời nhắn nhỏ cho người nhận"
                      className="border-[#d8cdb5] bg-white/70"
                    />
                  </Field>

                  <button
                    type="button"
                    onClick={() => setSuccessMode("items")}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1d4e3f] px-6 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
                  >
                    Xác nhận gửi tặng
                  </button>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

export function GivesBackSection() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const openCampaign = (campaign: Campaign) => setSelectedCampaign(campaign);

  return (
    <section className="csr-section" aria-labelledby="csr-title">
      <div className="csr-inner">
        <header className="csr-header">
          <h2 id="csr-title" className="csr-title">
            Thời trang có trách nhiệm
          </h2>
          <p className="csr-subtitle">
            Mỗi đơn thuê, một hành động ý nghĩa — 5% giá trị mỗi đơn được dành cho cộng đồng.
          </p>
        </header>

        <div className="csr-campaign-grid" aria-label="Danh sách chiến dịch gây quỹ xã hội">
          {campaigns.map((campaign) => (
            <article className="csr-card" key={campaign.title}>
              <figure className="csr-media">
                <img src={campaign.image} alt="" />
                <figcaption className="csr-tag">{campaign.tag}</figcaption>
              </figure>

              <div className="csr-card-body">
                <h3 className="csr-card-title">
                  <span aria-hidden="true">{campaign.icon}</span>
                  {campaign.title}
                </h3>
                <p className="csr-card-description">{campaign.cardDescription}</p>

                <div className="csr-progress-block">
                  <div
                    className="csr-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={campaign.percent}
                    aria-label={`${campaign.title} đã đạt ${campaign.percent}%`}
                  >
                    <span style={{ width: `${campaign.percent}%` }} />
                  </div>
                  <div className="csr-progress-meta">
                    <strong>{campaign.percent}%</strong>
                    <span>
                      {campaign.raised} / {campaign.goal}
                    </span>
                  </div>
                </div>

                <dl className="csr-card-stats">
                  <div>
                    <dt>Người ủng hộ</dt>
                    <dd>{campaign.supporters}</dd>
                  </div>
                  <div>
                    <dt>Ngày còn lại</dt>
                    <dd>{campaign.daysLeft}</dd>
                  </div>
                </dl>

                <div className="csr-actions">
                  <button
                    className="csr-support-button"
                    type="button"
                    onClick={() => openCampaign(campaign)}
                  >
                    ❤️ Ủng hộ ngay
                  </button>
                  <button
                    className="csr-share-button"
                    type="button"
                    onClick={() => openCampaign(campaign)}
                    aria-label={`Ủng hộ ${campaign.title}`}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="csr-stats-bar" aria-label="Số liệu tổng kết gây quỹ">
          {impactStats.map((stat) => (
            <div className="csr-impact" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </aside>
      </div>

      <GivingCampaignModal
        campaign={selectedCampaign}
        open={selectedCampaign !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCampaign(null);
        }}
      />
    </section>
  );
}
