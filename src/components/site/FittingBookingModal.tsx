import { useEffect, useMemo, useState, type FormEvent } from "react";
import { addDays, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/lib/use-auth";

type FittingBookingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type BookingForm = {
  fullName: string;
  phone: string;
  email: string;
  guests: string;
  note: string;
};

const initialForm: BookingForm = {
  fullName: "",
  phone: "",
  email: "",
  guests: "0",
  note: "",
};

const timeSlots = [
  { id: "09:00", label: "09:00 - 10:30" },
  { id: "10:30", label: "10:30 - 12:00" },
  { id: "14:00", label: "14:00 - 15:30" },
  { id: "16:00", label: "16:00 - 17:30" },
  { id: "19:00", label: "19:00 - 20:30" },
] as const;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function createBookingCode() {
  return `FW-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function getSoldOutSlots(date: Date) {
  if (isSameDay(date, addDays(startOfDay(new Date()), 1))) return new Set(["10:30"]);
  if (date.getDay() === 0) return new Set(["16:00", "19:00"]);
  if (date.getDay() === 6) return new Set(["14:00"]);
  return new Set<string>();
}

export function FittingBookingModal({ open, onOpenChange }: FittingBookingModalProps) {
  const { user } = useAuth();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setError("");
      setIsSubmitting(false);
      return;
    }

    if (user) {
      setForm((current) => ({
        ...current,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      }));
    }
  }, [open, user]);

  const soldOutSlots = useMemo(
    () => (selectedDate ? getSoldOutSlots(selectedDate) : new Set<string>()),
    [selectedDate],
  );

  const updateForm = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.fullName.trim().length < 2) {
      setError("Bạn nhập họ tên đầy đủ giúp FASTWear nhé.");
      return;
    }

    if (form.phone.trim().length < 9) {
      setError("Số điện thoại chưa hợp lệ.");
      return;
    }

    if (!isEmail(form.email)) {
      setError("Email chưa đúng định dạng.");
      return;
    }

    if (!selectedDate) {
      setError("Bạn chọn ngày thử đồ trước khi xác nhận.");
      return;
    }

    if (!selectedSlot) {
      setError("Bạn chọn một khung giờ còn chỗ giúp FASTWear nhé.");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 850);
    });

    const bookingCode = createBookingCode();
    toast.success("Đặt lịch thành công! Mã lịch hẹn đã được gửi về Email của bạn", {
      description: `${bookingCode} - ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}, ${selectedSlot}`,
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-[1.35rem] border-[#d9cfbb] bg-[#fbf9f4] p-0 text-[#1e3a2f] shadow-2xl">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="relative overflow-hidden bg-[#1e3a2f] px-6 py-7 text-[#fbf9f4] lg:px-8">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(251,249,244,0.12))]" />
            <div className="relative">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbf9f4]/12">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <DialogHeader className="mt-6 text-left">
                <DialogTitle className="font-serif text-3xl leading-tight text-[#fbf9f4]">
                  Đặt lịch thử
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-6 text-[#fbf9f4]/72">
                  FASTWear chuẩn bị sẵn outfit, size và phụ kiện theo ghi chú để buổi fitting diễn
                  ra gọn gàng hơn.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-8 space-y-4 text-sm text-[#fbf9f4]/82">
                <div className="rounded-2xl border border-[#fbf9f4]/14 bg-[#fbf9f4]/8 p-4">
                  <p className="font-semibold text-[#fbf9f4]">Showroom FASTWear</p>
                  <p className="mt-1 leading-6">
                    Tư vấn phom dáng, kiểm tra độ dài và phối phụ kiện.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#fbf9f4]/14 bg-[#fbf9f4]/8 p-4">
                  <p className="font-semibold text-[#fbf9f4]">Thời lượng 90 phút</p>
                  <p className="mt-1 leading-6">
                    Mỗi lịch hẹn có stylist hỗ trợ riêng theo khung giờ bạn chọn.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <form className="space-y-6 px-5 py-6 sm:px-7 lg:px-8" onSubmit={submitBooking}>
            <section>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1e3a2f]/70">
                Thông tin khách hàng
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fitting-full-name">Họ tên</Label>
                  <Input
                    id="fitting-full-name"
                    value={form.fullName}
                    onChange={(event) => updateForm("fullName", event.target.value)}
                    autoComplete="name"
                    className="h-11 rounded-xl border-[#d9cfbb] bg-white/75"
                    placeholder="Nguyễn Mai Linh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitting-phone">Số điện thoại</Label>
                  <Input
                    id="fitting-phone"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
                    className="h-11 rounded-xl border-[#d9cfbb] bg-white/75"
                    placeholder="0909 123 456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitting-email">Email</Label>
                  <Input
                    id="fitting-email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    autoComplete="email"
                    type="email"
                    className="h-11 rounded-xl border-[#d9cfbb] bg-white/75"
                    placeholder="ban@fastwear.vn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitting-guests">Số lượng người đi cùng</Label>
                  <Input
                    id="fitting-guests"
                    value={form.guests}
                    onChange={(event) => updateForm("guests", event.target.value)}
                    inputMode="numeric"
                    min={0}
                    type="number"
                    className="h-11 rounded-xl border-[#d9cfbb] bg-white/75"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1e3a2f]/70">
                  Chọn ngày
                </h3>
                <div className="mt-4 rounded-2xl border border-[#d9cfbb] bg-white/70 p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedSlot("");
                    }}
                    disabled={(date) => isBefore(startOfDay(date), today)}
                    locale={vi}
                    className="mx-auto bg-transparent text-[#1e3a2f] [--cell-size:2.25rem]"
                    classNames={{
                      caption_label: "text-sm font-bold text-[#1e3a2f]",
                      day_button:
                        "rounded-xl transition hover:bg-[#eef2ea] data-[selected-single=true]:bg-[#1e3a2f] data-[selected-single=true]:text-white",
                      today: "rounded-xl bg-[#ebe2d0] text-[#1e3a2f]",
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1e3a2f]/70">
                  Khung giờ
                </h3>
                <div className="mt-4 grid gap-3">
                  {timeSlots.map((slot) => {
                    const disabled = soldOutSlots.has(slot.id);
                    const selected = selectedSlot === slot.label;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        disabled={disabled}
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`flex h-12 items-center justify-between rounded-xl border px-4 text-sm font-semibold transition ${
                          selected
                            ? "border-[#1e3a2f] bg-[#1e3a2f] text-white shadow-[0_10px_22px_rgba(30,58,47,0.18)]"
                            : "border-[#d9cfbb] bg-white/70 text-[#1e3a2f] hover:border-[#1e3a2f]/50 hover:bg-[#eef2ea]"
                        } disabled:cursor-not-allowed disabled:border-[#d9cfbb] disabled:bg-[#eee8dc] disabled:text-[#1e3a2f]/38 disabled:shadow-none`}
                      >
                        <span>{slot.label}</span>
                        {disabled && <span className="text-xs font-medium">Hết chỗ</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <Label htmlFor="fitting-note">Trang phục cần thử</Label>
              <Textarea
                id="fitting-note"
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                className="min-h-24 rounded-2xl border-[#d9cfbb] bg-white/75"
                placeholder="Tên outfit, link sản phẩm hoặc dịp mặc để FASTWear chuẩn bị trước."
              />
            </section>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1e3a2f] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(30,58,47,0.18)] transition duration-200 hover:bg-[#275241] hover:shadow-[0_16px_28px_rgba(30,58,47,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CalendarCheck className="h-4 w-4" />
              )}
              {isSubmitting ? "Đang xác nhận..." : "Xác nhận đặt lịch"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
