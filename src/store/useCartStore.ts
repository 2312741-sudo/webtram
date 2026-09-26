"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  subCategory?: string;
  categoryName?: string;
}

export interface CartToastInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  timestamp: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toast: CartToastInfo | null;
  addItem: (
    product: Omit<CartItem, "quantity">,
    quantity?: number,
    openDrawer?: boolean
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
  toggleCart: () => void;
  hideToast: () => void;
  getTotalCount: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toast: null,
      addItem: (product, quantity = 1, openDrawer = false) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          const newItems = existing
            ? state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [...state.items, { ...product, quantity }];

          return {
            items: newItems,
            isOpen: openDrawer ? true : state.isOpen,
            toast: {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity,
              timestamp: Date.now(),
            },
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null),
        }));
      },
      setQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      hideToast: () => set({ toast: null }),
      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalAmount: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "tram_cart_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
