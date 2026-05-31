import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteShell } from "@/components/site/SiteShell";
import { useCart, type CartItem } from "@/lib/cart";
import { formatVND } from "@/lib/products";

type PaymentMethodId = "cod" | "momo" | "zalopay" | "bank-card";
type WalletPaymentId = Extract<PaymentMethodId, "momo" | "zalopay">;

const checkoutPaymentMethods: Array<{
  id: PaymentMethodId;
  title: string;
  icon: string;
}> = [
  {
    id: "cod",
    title: "Thanh toán khi giao hàng (COD)",
    icon: "/payment/cod-icon.png",
  },
  {
    id: "momo",
    title: "Chuyển khoản qua ví điện tử MoMo",
    icon: "/payment/momo-logo.png",
  },
  {
    id: "zalopay",
    title: "Chuyển khoản qua ví điện tử Zalopay",
    icon: "/payment/zalopay-logo.png",
  },
  {
    id: "bank-card",
    title: "Thanh toán qua thẻ ngân hàng",
    icon: "/payment/bank-card-icon.png",
  },
];

const walletPayments: Record<
  WalletPaymentId,
  { label: string; qrImage: string; placeholder: string }
> = {
  momo: {
    label: "MoMo",
    qrImage: "/payment/momo-qr.jpg",
    placeholder: "QR MoMo",
  },
  zalopay: {
    label: "Zalopay",
    qrImage: "/payment/zalopay-qr.png",
    placeholder: "QR Zalopay",
  },
};

const paymentMethodLabels: Record<PaymentMethodId, string> = {
  cod: "Thanh toán khi giao hàng (COD)",
  momo: "MoMo",
  zalopay: "Zalopay",
  "bank-card": "Thẻ ngân hàng",
};

const deliveryMethodLabels: Record<string, string> = {
  delivery: "Giao tận nơi",
  pickup: "Đến cửa hàng lấy",
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const steps = ["Địa chỉ", "Giao hàng", "Trả hàng", "Thanh toán"];
const deliveryMethods = [
  {
    id: "delivery",
    title: "Giao tận nơi",
    description: "30.000đ · 1–2 ngày tại TP.HCM/Hà Nội; 3–5 ngày tại tỉnh thành khác",
  },
  {
    id: "pickup",
    title: "Đến cửa hàng lấy",
    description: "Miễn phí — Sài Gòn / Hà Nội",
  },
];

const returnMethods = [
  { id: "courier", title: "Giao bưu điện đến", description: "Free pickup" },
  { id: "store", title: "Mang đến cửa hàng", description: "Tặng 5K FASTCoin" },
];

type AddressForm = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
};

type AddressField = keyof AddressForm;
type AddressErrors = Partial<Record<AddressField, string>>;

const initialAddress: AddressForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  district: "",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, count, summary } = useCart();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const [returnMethod, setReturnMethod] = useState("");
  const [returnMethodError, setReturnMethodError] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [returnDateError, setReturnDateError] = useState("");
  const [pay, setPay] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const [qrPayment, setQrPayment] = useState<WalletPaymentId | null>(null);
  const [qrImageError, setQrImageError] = useState(false);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [cardStep, setCardStep] = useState<"details" | "otp">("details");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardOtp, setCardOtp] = useState("");
  const [cardError, setCardError] = useState("");
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);
  const orderCompletionStarted = useRef(false);
  const checkoutShippingFee = deliveryMethod === "pickup" ? 0 : summary.shippingFee;
  const checkoutTotalPayable =
    summary.rentalSubtotal + summary.depositRequired + checkoutShippingFee;

  const updateAddress = (field: AddressField, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
    setAddressErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateAddress = () => {
    const nextErrors: AddressErrors = {};

    if (!address.fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên.";
    if (!isPhoneLike(address.phone)) nextErrors.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    if (!isEmailLike(address.email)) nextErrors.email = "Vui lòng nhập email hợp lệ.";
    if (!address.address.trim()) nextErrors.address = "Vui lòng nhập địa chỉ.";
    if (!address.city.trim()) nextErrors.city = "Vui lòng nhập thành phố.";
    if (!address.district.trim()) nextErrors.district = "Vui lòng nhập quận / huyện.";

    setAddressErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateDelivery = () => {
    const message = deliveryMethod ? "" : "Vui lòng chọn phương thức nhận hàng.";
    setDeliveryError(message);
    return !message;
  };

  const validateReturn = () => {
    const methodMessage = returnMethod ? "" : "Vui lòng chọn phương thức trả hàng.";
    const dateMessage = expectedReturnDate ? "" : "Vui lòng chọn ngày trả dự kiến.";

    setReturnMethodError(methodMessage);
    setReturnDateError(dateMessage);
    return !methodMessage && !dateMessage;
  };

  const validatePayment = () => {
    const paymentMessage = pay ? "" : "Vui lòng chọn phương thức thanh toán.";
    const agreeMessage = agree ? "" : "Vui lòng đồng ý Chính sách thuê.";

    setPaymentError(paymentMessage);
    setAgreeError(agreeMessage);
    return !paymentMessage && !agreeMessage;
  };

  const validateCurrentStep = () => {
    if (step === 0) return validateAddress();
    if (step === 1) return validateDelivery();
    if (step === 2) return validateReturn();
    return validatePayment();
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(steps.length - 1, current + 1));
  };

  const activeQrPayment = qrPayment ? walletPayments[qrPayment] : null;

  const completeOrder = async () => {
    if (orderCompletionStarted.current) return;

    orderCompletionStarted.current = true;
    setIsCompletingOrder(true);
    setQrPayment(null);
    setQrImageError(false);
    setCardDialogOpen(false);
    setCardStep("details");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardOtp("");
    setCardError("");

    try {
      await fetch("/api/order-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createOrderId(),
          customerName: address.fullName.trim(),
          customerEmail: address.email.trim().toLowerCase(),
          productNames: getProductNames(items),
          rentalDate: getRentalDateLabel(items),
          returnDate: expectedReturnDate || getReturnDateLabel(items),
          rentalPrice: summary.rentalSubtotal,
          deposit: summary.depositRequired,
          totalAmount: checkoutTotalPayable,
          pickupMethod: deliveryMethodLabels[deliveryMethod] || deliveryMethod,
          paymentMethod: pay ? paymentMethodLabels[pay as PaymentMethodId] : undefined,
          orderStatus: pay === "cod" ? "Đã xác nhận" : "Đã thanh toán",
        }),
      });
    } catch (error) {
      console.error("FASTWear order confirmation email request failed", error);
    }

    void navigate({ to: "/order-success" });
  };

  const selectPaymentMethod = (id: PaymentMethodId) => {
    setPay(id);
    setPaymentError("");

    if (id === "momo" || id === "zalopay") {
      setQrPayment(id);
      setQrImageError(false);
      return;
    }

    if (id === "bank-card") {
      setCardDialogOpen(true);
      setCardStep("details");
      setCardError("");
      return;
    }
  };

  const closeCardDialog = (open: boolean) => {
    setCardDialogOpen(open);
    if (!open) {
      setCardStep("details");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setCardOtp("");
      setCardError("");
    }
  };

  const continueCardPayment = () => {
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      setCardError("Vui lòng nhập đầy đủ thông tin thẻ.");
      return;
    }

    setCardError("");
    setCardStep("otp");
  };

  const verifyCardOtp = () => {
    if (!cardOtp.trim()) {
      setCardError("Vui lòng nhập mã OTP.");
      return;
    }

    void completeOrder();
  };

  const submitOrder = () => {
    if (!pay) {
      setPaymentError("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    if (!agree) {
      setAgreeError("Vui lòng đồng ý Chính sách thuê.");
      return;
    }

    setPaymentError("");
    setAgreeError("");

    if (pay === "momo" || pay === "zalopay") {
      setQrPayment(pay);
      setQrImageError(false);
      return;
    }

    if (pay === "bank-card") {
      setCardDialogOpen(true);
      setCardStep("details");
      setCardError("");
      return;
    }

    void completeOrder();
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Thanh toán</h1>

        <div className="mt-6 flex items-center gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {i + 1}
              </div>
              <span className={i === step ? "font-medium" : "text-muted-foreground"}>{s}</span>
              {i < steps.length - 1 && <span className="mx-2 h-px w-6 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="space-y-5 rounded-2xl bg-card p-6">
            {step === 0 && (
              <>
                <h2 className="font-serif text-2xl">Địa chỉ giao</h2>
                <Field
                  label="Họ tên"
                  value={address.fullName}
                  onChange={(value) => updateAddress("fullName", value)}
                  error={addressErrors.fullName}
                />
                <Field
                  label="Số điện thoại"
                  type="tel"
                  value={address.phone}
                  onChange={(value) => updateAddress("phone", value)}
                  error={addressErrors.phone}
                />
                <Field
                  label="Email cá nhân"
                  type="email"
                  value={address.email}
                  onChange={(value) => updateAddress("email", value)}
                  error={addressErrors.email}
                />
                <Field
                  label="Địa chỉ"
                  value={address.address}
                  onChange={(value) => updateAddress("address", value)}
                  error={addressErrors.address}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Thành phố"
                    value={address.city}
                    onChange={(value) => updateAddress("city", value)}
                    error={addressErrors.city}
                  />
                  <Field
                    label="Quận / Huyện"
                    value={address.district}
                    onChange={(value) => updateAddress("district", value)}
                    error={addressErrors.district}
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="font-serif text-2xl">Phương thức nhận</h2>
                <div className="space-y-3">
                  {deliveryMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition hover:border-primary ${deliveryMethod === method.id ? "border-primary bg-primary/5" : "border-border"}`}
                    >
                      <input
                        type="radio"
                        name="ship"
                        checked={deliveryMethod === method.id}
                        onChange={() => {
                          setDeliveryMethod(method.id);
                          setDeliveryError("");
                        }}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{method.title}</div>
                        <div className="text-xs text-muted-foreground">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {deliveryError && <ErrorText>{deliveryError}</ErrorText>}
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-serif text-2xl">Phương thức trả</h2>
                <div className="space-y-3">
                  {returnMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition hover:border-primary ${returnMethod === method.id ? "border-primary bg-primary/5" : "border-border"}`}
                    >
                      <input
                        type="radio"
                        name="ret"
                        checked={returnMethod === method.id}
                        onChange={() => {
                          setReturnMethod(method.id);
                          setReturnMethodError("");
                        }}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{method.title}</div>
                        <div className="text-xs text-muted-foreground">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {returnMethodError && <ErrorText>{returnMethodError}</ErrorText>}
                <Field
                  label="Ngày trả dự kiến"
                  type="date"
                  value={expectedReturnDate}
                  onChange={(value) => {
                    setExpectedReturnDate(value);
                    setReturnDateError("");
                  }}
                  error={returnDateError}
                />
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-serif text-2xl">Thanh toán</h2>
                <div className="flex flex-col gap-3">
                  {checkoutPaymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => selectPaymentMethod(method.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:border-primary ${
                        pay === method.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background">
                        <img
                          src={method.icon}
                          alt={method.title}
                          className="max-h-8 max-w-8 object-contain"
                        />
                      </span>
                      <span className="text-sm font-medium">{method.title}</span>
                    </button>
                  ))}
                </div>
                {paymentError && <ErrorText>{paymentError}</ErrorText>}
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      setAgreeError("");
                    }}
                    className="mt-1"
                  />
                  Tôi đã đọc và đồng ý{" "}
                  <Link to="/policy" className="text-primary underline">
                    Chính sách thuê
                  </Link>
                  .
                </label>
                {agreeError && <ErrorText>{agreeError}</ErrorText>}
              </>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="rounded-full border border-border px-5 py-2 text-sm"
                disabled={step === 0}
              >
                Quay lại
              </button>
              {step < 3 ? (
                <button
                  onClick={goNext}
                  className="rounded-full bg-primary px-6 py-2 text-sm text-primary-foreground"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  onClick={submitOrder}
                  disabled={isCompletingOrder}
                  className="rounded-full bg-primary px-6 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompletingOrder ? "Đang xử lý..." : "Đặt thuê"}
                </button>
              )}
            </div>
          </div>

          <aside className="h-fit space-y-2 rounded-2xl bg-[color:var(--cream)] p-6 text-sm">
            <h3 className="font-serif text-xl">Đơn hàng</h3>
            {count === 0 && (
              <p className="rounded-xl bg-background/70 p-3 text-xs leading-5 text-muted-foreground">
                Giỏ thuê đang trống. Bạn vẫn có thể xem trước quy trình thanh toán.
              </p>
            )}
            <div className="flex justify-between">
              <span>{count} món thuê</span>
              <span>{formatVND(summary.rentalSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí giao</span>
              <span>{formatVND(checkoutShippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cọc (hoàn lại)</span>
              <span>{formatVND(summary.depositRequired)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-serif text-lg">
              <span>Tổng</span>
              <span className="text-primary">{formatVND(checkoutTotalPayable)}</span>
            </div>
          </aside>
        </div>
      </div>

      <Dialog
        open={qrPayment !== null}
        onOpenChange={(open) => {
          if (!open) {
            setQrPayment(null);
            setQrImageError(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanh toán qua ví điện tử</DialogTitle>
          </DialogHeader>
          {activeQrPayment && (
            <div className="space-y-4 text-sm">
              <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4">
                {qrImageError ? (
                  <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-background text-base font-semibold text-muted-foreground">
                    {activeQrPayment.placeholder}
                  </div>
                ) : (
                  <img
                    src={activeQrPayment.qrImage}
                    alt={activeQrPayment.placeholder}
                    onError={() => setQrImageError(true)}
                    className="h-48 w-48 rounded-lg object-contain"
                  />
                )}
              </div>
              <div className="space-y-2 rounded-xl bg-muted/40 p-4">
                <InfoRow label="Tài khoản" value="Công ty TNHH FASTWear" />
                <InfoRow label="Ví điện tử" value={activeQrPayment.label} />
                <InfoRow label="Số tài khoản" value="0978597171" />
                <InfoRow label="Nội dung" value="DH.10299.H82" />
                <InfoRow label="Số tiền" value={formatVND(checkoutTotalPayable)} />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setQrPayment(null);
                setQrImageError(false);
              }}
              className="rounded-full border border-border px-5 py-2 text-sm"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => void completeOrder()}
              disabled={isCompletingOrder}
              className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCompletingOrder ? "Đang xử lý..." : "Tôi đã chuyển khoản"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cardDialogOpen} onOpenChange={closeCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanh toán qua thẻ ngân hàng</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {cardStep === "details" ? (
              <>
                <Field
                  label="Số thẻ"
                  value={cardNumber}
                  onChange={(value) => {
                    setCardNumber(value);
                    setCardError("");
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Ngày hết hạn"
                    value={cardExpiry}
                    onChange={(value) => {
                      setCardExpiry(value);
                      setCardError("");
                    }}
                  />
                  <Field
                    label="Mã bảo mật CVC/CVV"
                    type="password"
                    value={cardCvc}
                    onChange={(value) => {
                      setCardCvc(value);
                      setCardError("");
                    }}
                  />
                </div>
              </>
            ) : (
              <Field
                label="Mã OTP"
                value={cardOtp}
                onChange={(value) => {
                  setCardOtp(value);
                  setCardError("");
                }}
              />
            )}
            {cardError && <ErrorText>{cardError}</ErrorText>}
          </div>
          <DialogFooter className="gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => closeCardDialog(false)}
              className="rounded-full border border-border px-5 py-2 text-sm"
            >
              Đóng
            </button>
            {cardStep === "details" ? (
              <button
                type="button"
                onClick={continueCardPayment}
                className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
              >
                Tiếp tục
              </button>
            ) : (
              <button
                type="button"
                onClick={verifyCardOtp}
                disabled={isCompletingOrder}
                className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompletingOrder ? "Đang xử lý..." : "Xác thực"}
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function createOrderId() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `FW-${datePart}-${randomPart}`;
}

function getProductNames(items: CartItem[]) {
  return items.length ? items.map((item) => item.name) : ["Đơn thuê FASTWear"];
}

function getRentalDateLabel(items: CartItem[]) {
  const firstItem = items[0];
  if (!firstItem) return undefined;

  return firstItem.rentalStartDate;
}

function getReturnDateLabel(items: CartItem[]) {
  const firstItem = items[0];
  if (!firstItem) return undefined;

  return firstItem.rentalEndDate;
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        className={`mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-destructive">{children}</p>;
}

function isEmailLike(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isPhoneLike(value: string) {
  return /^[0-9+\-\s().]{8,}$/.test(value.trim());
}
