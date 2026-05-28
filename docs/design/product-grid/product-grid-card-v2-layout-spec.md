# Product Grid Card V2 – FASTWear

## Scope

Refine only the product card UI used in the Nam, Nữ, and Phụ kiện product grid pages.

References:
- `nam-product-grid-card-v2-reference.png`
- `nu-product-grid-card-v2-reference.png`
- `phu-kien-product-grid-card-v2-reference.png`

## Goal

Make product cards visually consistent with the premium homepage product card style.

The card should feel:
- premium
- minimal
- image-led
- spacious
- less marketplace-like
- consistent across Nam, Nữ, and Phụ kiện

## Card Default State

Each product card should use:

- Large product image on top
- Rounded card container
- Soft cream/white background
- Thin champagne/neutral border
- No heavy shadow
- Product image ratio around 4:5
- Category/occasion pill badge on top-left of the image
- Brand/designer shown as uppercase muted text
- Product name shown clearly below brand
- Rental price in emerald green
- `/ ngày thuê` microcopy below price
- `Xem chi tiết →` link/action at bottom-right

## Card Information Priority

1. Image
2. Occasion/category badge
3. Designer/brand
4. Product name
5. Rental price per day
6. Detail link

## Remove or De-emphasize

The default card should not look like the old marketplace card.

Avoid:
- visible dark hover overlay by default
- crowded price/deposit columns
- large heart icon if it visually conflicts
- heavy card shadows
- too many visible actions in the default state

## Product Grid Try-On Behavior

Important:
- Product Grid “Thử ảo” should still open the current QR modal.
- Do not break existing `onTryOn` behavior.
- If keeping a hover Try-On action, make it subtle and premium.
- Default static card state should match the references.
- Product Detail “Thử ảo” behavior must not be changed.

## Functional Constraints

Do not change:
- product schema
- cart logic
- checkout logic
- routing
- `routeTree.gen.ts`
- Product Detail Page
- ARTryOn QR modal
- ARTryOn3DLegacy

## Target Files

Likely files:
- `src/components/site/ProductGridCard.tsx`
- `src/components/site/ProductGridView.tsx` only if layout spacing/grid needs adjustment

Avoid editing:
- `src/routes/product.$id.tsx`
- `src/components/site/ARTryOn.tsx`
- `src/components/site/ARTryOn3DLegacy.tsx`
- `src/routes/cart.tsx`
- `src/routes/checkout.tsx`