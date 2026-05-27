import { useCallback, useEffect, useMemo, useState } from "react";

export const CART_STORAGE_KEY = "fastwear.cart.v1";
export const CART_UPDATED_EVENT = "fastwear:cart-updated";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  designer: string;
  image: string;
  price: number;
  deposit: number;
  selectedSize: string;
  selectedColor?: string;
  rentalDays: number;
  rentalStartDate: string;
  rentalEndDate: string;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, "id" | "quantity"> & {
  quantity?: number;
};

export type CartSummary = {
  rentalSubtotal: number;
  depositRequired: number;
  shippingFee: number;
  totalPayable: number;
};

const emptySummary: CartSummary = {
  rentalSubtotal: 0,
  depositRequired: 0,
  shippingFee: 0,
  totalPayable: 0,
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

function normalizeCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) return null;

  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.productId) ||
    !isNonEmptyString(value.name) ||
    !isNonEmptyString(value.designer) ||
    !isNonEmptyString(value.image) ||
    !isNonEmptyString(value.selectedSize) ||
    !isNonEmptyString(value.rentalStartDate) ||
    !isNonEmptyString(value.rentalEndDate)
  ) {
    return null;
  }

  const price = positiveNumber(value.price);
  const deposit = positiveNumber(value.deposit);
  const rentalDays = positiveNumber(value.rentalDays);
  const quantity = positiveNumber(value.quantity, 1);

  if (!price || !rentalDays) return null;

  return {
    id: value.id,
    productId: value.productId,
    name: value.name,
    designer: value.designer,
    image: value.image,
    price,
    deposit,
    selectedSize: value.selectedSize,
    selectedColor: isNonEmptyString(value.selectedColor) ? value.selectedColor : undefined,
    rentalDays,
    rentalStartDate: value.rentalStartDate,
    rentalEndDate: value.rentalEndDate,
    quantity,
  };
}

function readCartItems(): CartItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      const normalized = normalizeCartItem(item);
      return normalized ? [normalized] : [];
    });
  } catch {
    return [];
  }
}

function writeCartItems(items: CartItem[]) {
  if (!isBrowser()) return;

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

function createCartItem(input: CartItemInput): CartItem {
  return {
    ...input,
    id: createCartItemId(),
    quantity: input.quantity && input.quantity > 0 ? input.quantity : 1,
  };
}

function createCartItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getCartSummary(items: CartItem[]): CartSummary {
  if (items.length === 0) return emptySummary;

  const rentalSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.rentalDays * item.quantity,
    0,
  );
  const depositRequired = items.reduce((sum, item) => sum + item.deposit * item.quantity, 0);
  const shippingFee = 30000;

  return {
    rentalSubtotal,
    depositRequired,
    shippingFee,
    totalPayable: rentalSubtotal + depositRequired + shippingFee,
  };
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = useCallback(() => {
    setItems(readCartItems());
  }, []);

  useEffect(() => {
    refresh();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) refresh();
    };

    window.addEventListener(CART_UPDATED_EVENT, refresh);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  const addItem = useCallback((input: CartItemInput) => {
    const item = createCartItem(input);
    const nextItems = [...readCartItems(), item];
    writeCartItems(nextItems);
    setItems(nextItems);
    return item;
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    const nextItems = readCartItems().filter((item) => item.id !== cartItemId);
    writeCartItems(nextItems);
    setItems(nextItems);
  }, []);

  const clearCart = useCallback(() => {
    writeCartItems([]);
    setItems([]);
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const summary = useMemo(() => getCartSummary(items), [items]);

  return {
    items,
    count,
    addItem,
    removeItem,
    clearCart,
    summary,
  };
}
