\# FASTWear Website Build Specification (v6.0 - Flexible Design Foundation, TypeScript, TanStack \& Lovable AI Architecture)



\## 0. Purpose of This Specification



This document is the master build specification for the FASTWear ecommerce website.



It should be used as a \*\*baseline design foundation and technical guardrail\*\*, not as a fixed page template. Future page-level prompts may override visual layout details when redesigning a specific page, as long as they do not break the core technical architecture, product data schema, cart calculation logic, Vietnamese-language requirement, and FASTWear brand positioning.



\*\*Important rule for AI/Codex/Lovable:\*\*



> Use this specification as the baseline. When the user gives a newer page-specific instruction, prioritize that instruction for layout, composition, and visual treatment, while preserving the hard constraints defined in this document.



\---



\## 1. Project Objective \& Core Concept



\### 1.1. Business Case



Consumer behavior is shifting toward cost-saving, convenience, and sustainability. High-end fashion items for special occasions such as evening gowns, suits, áo dài, high heels, and accessories often have high price tags but low usage frequency. This creates both financial waste and environmental waste.



FASTWear addresses this problem by helping users access premium fashion without needing to own every item they wear.



\### 1.2. Solution



\*\*FASTWear\*\* is a smart high-end occasion-wear rental platform built around an ecommerce model combined with a direct-experience showroom.



FASTWear allows users to:



\- Browse premium fashion items online

\- Rent outfits for special occasions

\- Select size, color, rental dates, and delivery/showroom options

\- Access AI-assisted support through FASTHelp

\- Use AR Try-On or showroom try-on to reduce fit uncertainty

\- Consume fashion in a more sustainable and cost-effective way



\### 1.3. Core Positioning



FASTWear should be positioned as:



> A premium Vietnamese fashion rental platform for important occasions, combining online convenience, showroom confidence, and sustainable consumption.



Suggested brand message:



> Thuê outfit cao cấp cho khoảnh khắc quan trọng.



\---



\## 2. Specification Priority System



This section defines how AI tools should interpret this document during future design and implementation requests.



\### 2.1. Hard Constraints



These constraints must not be broken unless the user explicitly requests a technical restructuring.



\- Use React 18+ with TypeScript only.

\- Do not convert `.tsx` or `.ts` files into plain JavaScript or JSX.

\- Preserve the TanStack Router architecture.

\- Preserve existing route paths unless the user explicitly asks to change routing.

\- Do not manually edit `routeTree.gen.ts` unless the existing project workflow requires regeneration.

\- Preserve the product data schema in `src/lib/products.ts`.

\- Preserve cart calculation rules.

\- Preserve the rental model: rental price per day, deposit, rental days, shipping fee, total payable.

\- Preserve FASTHelp Assistant.

\- Preserve AR Try-On concept.

\- Preserve Vietnamese-first customer-facing copy.

\- Preserve responsive design across desktop, tablet, and mobile.

\- Do not remove existing core pages.

\- Do not add unnecessary dependencies.

\- Do not copy any reference website 1:1.



\### 2.2. Flexible Design Directions



These are baseline directions, not rigid templates.



AI may reinterpret these directions for a specific page when the user gives a page-level prompt.



\- Premium minimalist style

\- Editorial fashion look

\- Spacious layout and strong whitespace

\- Clean ecommerce usability

\- Premium but accessible tone

\- Green/champagne accent palette

\- Refined serif headings and clean sans-serif UI text

\- Product-image-led layout

\- Clear rental journey

\- Strong but elegant call-to-action hierarchy



\### 2.3. Page-Level Override Rule



For future design tasks:



> The user’s latest page-specific prompt overrides the layout details in this specification, but not the hard constraints.



Example:



If the user asks to redesign only the Homepage hero, AI should update only the hero section and preserve the rest of the app unless instructed otherwise.



Recommended phrase for future prompts:



```text

Use the FASTWear build spec as the baseline, but prioritize this page-specific instruction for layout and visual treatment. Do not change technical architecture, product schema, routing, cart logic, or unrelated pages.

```



\---



\## 3. Final Technology Stack



The project is built on a modern, high-performance architecture utilizing AI-assisted tools and deployed through Cloudflare.



\- \*\*Core Framework:\*\* React 18+ with TypeScript (`.tsx`, `.ts`)

\- \*\*Build Tool \& Environment:\*\* Vite + Bun, managed through `bun.lock`

\- \*\*Routing:\*\* TanStack Router with file-based routing and auto-generated `routeTree.gen.ts`

\- \*\*Styling \& UI Components:\*\* Tailwind CSS integrated with Shadcn/ui in `src/components/ui/`

\- \*\*Deployment:\*\* Cloudflare Pages/Workers using `wrangler.jsonc` and `server.ts`

\- \*\*Data Handling:\*\* Strictly typed mock data managed through TypeScript files such as `src/lib/products.ts`

\- \*\*AI Assistant Endpoint:\*\* `api.fasthelp.ts`, connected to the selected AI provider such as Google AI/Gemini



\---



\## 4. Page \& Routing Architecture



Routes are file-based and located in `src/routes/`.



Required user journey:



\- `/` -> `index.tsx`  

&#x20; Homepage with hero, category/occasion browsing, featured products, trust sections, and CTA blocks.



\- `/about` -> `about.tsx`  

&#x20; About FASTWear, sustainability angle, showroom model, and brand story.



\- `/categories` -> `categories.tsx`  

&#x20; Catalog and filtering experience.



\- `/search` -> `search.tsx`  

&#x20; Advanced search and discovery.



\- `/product/$id` -> `product.$id.tsx`  

&#x20; Dynamic Product Detail Page.



\- `/cart` -> `cart.tsx`  

&#x20; Shopping cart with rental details and sticky summary.



\- `/checkout` -> `checkout.tsx`  

&#x20; Checkout, customer information, rental confirmation, delivery/showroom options, and payment summary.



\- `/account` -> `account.tsx`  

&#x20; User order history, rental tracking, and account-level information.



\- `/policy` -> `policy.tsx`  

&#x20; Rental terms, deposit policy, return rules, damage policy, cancellation, and showroom policy.



\- `api.fasthelp.ts`  

&#x20; API endpoint for FASTHelp chat/assistant logic.



\---



\## 5. UI/UX Design System



\## 5.1. Design Direction



FASTWear should feel like a premium Vietnamese fashion rental ecommerce website.



The experience should be:



\- Premium but not intimidating

\- Minimalist but not empty

\- Editorial but still practical for ecommerce

\- Fashion-forward but trustworthy

\- Clean, spacious, and product-image-led

\- Suitable for users renting outfits for weddings, parties, graduation, formal events, photoshoots, dates, business occasions, and traditional Vietnamese events



\### Reference Usage Policy



Reference websites such as Taelor.style may be used only as UX inspiration for:



\- Clear value proposition

\- Spacious section rhythm

\- Guided rental flow

\- Strong CTA hierarchy

\- Simple step-by-step explanation

\- Premium visual pacing

\- Occasion-based browsing

\- Trust-building sections



Do \*\*not\*\* copy:



\- Exact layout

\- Exact copywriting

\- Exact brand tone

\- Subscription menswear positioning

\- Visual identity

\- Component composition 1:1



FASTWear must remain distinct as a Vietnamese high-end occasion-wear rental platform.



\---



\## 5.2. Brand Personality



FASTWear should communicate:



\- Dress high-end without owning high-end

\- Convenient rental for important occasions

\- Smart, sustainable, and cost-effective fashion consumption

\- Confidence before events

\- Online browsing combined with direct showroom experience

\- Premium access without luxury ownership burden



\### Tone of Voice



Customer-facing copy should be:



\- Vietnamese first

\- Short and elegant

\- Clear and confident

\- Premium but simple

\- Helpful, not overly casual

\- Avoiding excessive Gen Z slang

\- Avoiding generic ecommerce phrases



Example copy direction:



\- “Thuê outfit cao cấp cho khoảnh khắc quan trọng.”

\- “Chọn nhanh. Thử dễ. Mặc đẹp đúng dịp.”

\- “Tủ đồ sự kiện, không cần sở hữu.”

\- “Đặt lịch thử tại showroom hoặc thuê trực tuyến trong vài bước.”

\- “Phong cách nổi bật, chi phí hợp lý, trải nghiệm nhẹ nhàng.”



\---



\## 5.3. Visual Design Tokens



\### Typography



Recommended font direction:



\- \*\*Headings:\*\* `Playfair Display`, `Lora`, or a similar refined serif font

\- \*\*Body/UI:\*\* `Inter`, `Montserrat`, or a similar clean sans-serif font



Rules:



\- Headings should feel editorial and premium.

\- Body text should remain easy to read.

\- Buttons and labels should be clean, compact, and confident.

\- Avoid mixing too many font styles.



Recommended hierarchy:



\- H1: `text-4xl` to `text-6xl`, tight tracking, medium/semi-bold

\- H2: `text-2xl` to `text-4xl`

\- H3: `text-xl` to `text-2xl`

\- Body: `text-base`, `leading-relaxed`

\- Micro-copy/badges: `text-xs` or `text-sm`, uppercase, wider tracking



\### Color Palette



Use a restrained luxury palette.



Recommended colors:



\- Background: `#FAF8F3` or `#FAFAFA`

\- Surface/Card: `#FFFFFF`

\- Text Primary: `#111827`

\- Text Secondary: `#6B7280`

\- Border: `#E5E7EB`

\- Primary CTA: `#043927`

\- Premium Accent: `#C8A45D` or champagne gold

\- Soft Highlight: `#F3EFE6`



Usage rules:



\- Use emerald green mainly for primary CTAs, selected states, and important highlights.

\- Use champagne gold sparingly for premium badges, ratings, or accent lines.

\- Avoid heavy gradients.

\- Avoid using too many saturated colors.

\- Product images should remain the visual focus.



\### Borders, Radius, and Shadows



\- Prefer clean rectangular layouts.

\- Use `rounded-none` or `rounded-sm` for editorial/product sections.

\- Use `rounded-md` only for functional UI elements when needed.

\- Use borders more than shadows.

\- Shadows should be subtle and rare.

\- Avoid overly soft SaaS-style cards unless the page requires functional separation.



\### Spacing



\- Use generous whitespace.

\- Desktop sections should generally use `py-16`, `py-20`, or `py-24`.

\- Main content width should usually use `max-w-7xl`.

\- Product grids should feel breathable and premium.

\- Avoid crowded marketplace-style layouts.

\- Keep mobile spacing compact but not cramped.



\### Imagery



Product imagery is the main selling asset.



Rules:



\- Use vertical product image ratios such as 3:4 or 4:5.

\- Prioritize clean fashion imagery.

\- Avoid overly noisy image backgrounds.

\- Product cards should let the image dominate the card.

\- Hero images should feel editorial and aspirational.

\- If multiple product images exist, support hover image swap on desktop.



\---



\## 5.4. Core UX Principles



1\. Make the rental journey clear on every major page.

2\. Keep product images as the main visual focus.

3\. Make CTAs visible but elegant.

4\. Make pricing, deposit, and rental days transparent.

5\. Build trust through policy clarity, showroom option, and support.

6\. Preserve Vietnamese-first experience.

7\. Avoid making the website feel like a generic marketplace.

8\. Avoid making the website feel like a copied reference website.

9\. Do not sacrifice usability for aesthetics.

10\. Mobile experience must be polished, not an afterthought.



\---



\## 6. Page-Level Design Baseline



This section defines baseline direction only. It should guide future page-specific prompts but should not prevent creative redesign.



\---



\### 6.1. Homepage `/`



The homepage should act as a premium fashion rental landing page.



Recommended sections:



1\. Announcement bar

2\. Clean navbar

3\. Large editorial hero

4\. Occasion/category browsing

5\. Featured rental collection

6\. “How FASTWear Works” 3-step section

7\. Why rent with FASTWear

8\. Showroom / Try-on trust section

9\. Sustainability / Gives Back section

10\. Final CTA



Hero direction:



\- Strong headline that explains rental value immediately

\- Short subheadline

\- One primary CTA and one secondary CTA

\- Editorial product/fashion image

\- Clear Vietnamese copy



Possible CTA labels:



\- “Khám phá bộ sưu tập”

\- “Thuê ngay”

\- “Đặt lịch thử tại showroom”



The homepage should not be only a product grid. It must also explain the concept and build trust.



\---



\### 6.2. Product Card `RentCard.tsx`



Product cards should feel like high-end fashion cards, not ordinary marketplace cards.



Rules:



\- Image ratio: 3:4 or 4:5

\- Image should take most of the card

\- Designer/brand should be uppercase, small, and muted

\- Product name should be clean and readable

\- Rental price should be clear but not visually aggressive

\- Availability should be subtle

\- Quick Add may appear on hover on desktop

\- On mobile, key action must remain accessible

\- If `images` exists, support hover image swap on desktop

\- Avoid heavy card shadows



Information priority:



1\. Image

2\. Designer

3\. Product name

4\. Rental price per day

5\. Availability / rating / quick action



\---



\### 6.3. Categories `/categories`



The catalog page should prioritize browsing, filtering, and discovery.



Required filter logic:



\- Category

\- Size

\- Occasion

\- Color

\- Gender



Recommended UX:



\- Left sidebar filters on desktop

\- Drawer filters on mobile

\- Spacious product grid

\- Sort options:

&#x20; - Recommended

&#x20; - Price low to high

&#x20; - Price high to low

&#x20; - Newest

\- Polished empty states

\- Clear active filter chips



The catalog should not feel like a discount marketplace. It should feel curated.



\---



\### 6.4. Search `/search`



The search page should help users find outfits quickly.



Recommended elements:



\- Large search input

\- Suggested keywords

\- Recent or popular searches if available

\- Filter chips

\- Results grid

\- Empty state with helpful suggestions



Suggested search prompt examples:



\- “Đầm dự tiệc”

\- “Áo dài tốt nghiệp”

\- “Suit nam”

\- “Phụ kiện ánh kim”

\- “Outfit dưới 500k/ngày”



\---



\### 6.5. Product Detail `/product/$id`



The product detail page should create confidence before rental.



Desktop layout baseline:



\- Left side: image gallery

\- Right side: sticky product information panel



Required information:



\- Designer

\- Product name

\- Rating

\- Rental price per day

\- Deposit

\- Size selector

\- Color selector

\- Rental date selector

\- Availability

\- Rent Now CTA

\- Add to Cart secondary CTA

\- Rental policy summary

\- Showroom try-on / AR Try-On entry point



CTA direction:



\- Primary button: full width, dark emerald background, white text

\- Secondary action: border-based

\- Deposit and rental days should be clearly explained



Trust-building details:



\- Fit/size guidance

\- Return policy summary

\- Deposit explanation

\- Cleaning/quality assurance note

\- Showroom try-on or AR Try-On option



\---



\### 6.6. Cart `/cart`



The cart must make rental cost calculation transparent.



Show for each item:



\- Product image

\- Product name

\- Designer

\- Selected size

\- Selected color

\- Rental dates

\- Rental days

\- Rental subtotal

\- Deposit

\- Shipping fee

\- Total payable



Design baseline:



\- Two-column layout on desktop

\- Sticky order summary

\- Clear checkout CTA

\- Editable rental details where possible

\- Transparent explanation of deposit



\---



\### 6.7. Checkout `/checkout`



Checkout should feel trustworthy and simple.



Required sections:



\- Contact information

\- Delivery or showroom pickup option

\- Rental date confirmation

\- Payment summary

\- Deposit explanation

\- Final confirmation CTA



UX rules:



\- Avoid clutter

\- Make errors clear

\- Keep the final payable amount visible

\- Reassure users about return/deposit policy

\- Keep Vietnamese labels clear and professional



\---



\### 6.8. About `/about`



The About page should explain:



\- Why FASTWear exists

\- The problem of high-cost, low-frequency fashion ownership

\- Premium access without ownership

\- Sustainable fashion angle

\- Online + showroom experience model



Avoid generic corporate text.



The About page should feel like a brand story, not a legal description.



\---



\### 6.9. Account `/account`



The account page should help users manage rentals.



Recommended content:



\- Current rental orders

\- Past rental history

\- Tracking status

\- Return date reminders

\- Deposit status

\- User profile basics



Design should be clean, functional, and consistent with the premium visual system.



\---



\### 6.10. Policy `/policy`



The policy page should be easy to scan.



Required topics:



\- Rental duration

\- Deposit

\- Delivery and pickup

\- Return policy

\- Late return

\- Damage/loss policy

\- Cancellation

\- Showroom try-on

\- Cleaning/quality assurance



Use accordions or clean sections if appropriate.



\---



\### 6.11. FASTHelp `ChatBubble.tsx` and `FastHelp.tsx`



FASTHelp should match the premium design system.



UI direction:



\- Small floating chat bubble

\- Clean white panel

\- Minimal border

\- Subtle emerald accent

\- Vietnamese-first greeting

\- Suggested quick prompts



Suggested quick prompts:



\- “Tôi nên thuê gì cho tiệc cưới?”

\- “Chính sách đặt cọc thế nào?”

\- “Có thể thử đồ ở showroom không?”

\- “Gợi ý outfit theo ngân sách”

\- “Tôi cần outfit cho lễ tốt nghiệp”



Behavior:



\- Keep responses helpful and concise

\- Use product context when available

\- Do not hallucinate unavailable products

\- Explain rental policies clearly



\---



\### 6.12. AR Try-On `ARTryOn.tsx`



AR Try-On should be presented as a confidence-building feature.



Recommended UX:



\- Clear entry point on product detail page

\- QR-based mobile flow

\- Simple instructions

\- Camera permission explanation

\- Fallback message if device/browser does not support AR



Tone:



\- Practical and reassuring, not overly futuristic

\- Explain that AR Try-On helps preview style/fit but does not replace exact size checking



\---



\## 7. Product Data Schema



Data is managed centrally in `src/lib/products.ts`.



AI must strictly adhere to this type unless the user explicitly asks to modify the data model.



```typescript

export type Product = {

&#x20; id: string;

&#x20; name: string;

&#x20; designer: string;

&#x20; price: number;              // Rental price per day

&#x20; deposit: number;            // Fixed deposit amount

&#x20; category: string;

&#x20; gender: "Nữ" | "Nam" | "Unisex";

&#x20; occasion: string\[];

&#x20; sizes: string\[];

&#x20; colors: string\[];           // Hex code, e.g. "#1A1A1A"

&#x20; available: boolean;

&#x20; rating: number;

&#x20; image: string;              // Thumbnail

&#x20; images?: string\[];          // Gallery

};

```



Rules:



\- Do not remove existing fields.

\- Do not rename fields unless all dependent code is updated.

\- Do not change `gender` values unless the user explicitly requests a broader taxonomy.

\- Product images should be handled through `image` and optional `images`.

\- Product cards and detail pages should use this schema consistently.



\---



\## 8. Cart State \& Calculation Math



When users add a product to the cart, the state must track:



\- `product\_id`

\- `name`

\- `selected\_size`

\- `selected\_color`

\- `rental\_days`

\- selected rental dates if implemented

\- shipping method if implemented



Rental days:



\- Calculated from DatePicker

\- Minimum: 2 days

\- Maximum: 7 days



Calculation rules:



```typescript

rentalSubtotal = rental\_days \* product.price;



depositRequired = product.deposit;



shippingFee = shippingMethod === "standard" ? 30000 : 0;



totalPayable = rentalSubtotal + depositRequired + shippingFee;

```



UX rules:



\- Display rental subtotal separately from deposit.

\- Explain that deposit is not the same as rental fee.

\- Keep total payable visible in cart and checkout.

\- Do not hide shipping fee.

\- If the user changes rental days, update subtotal and total immediately.



\---



\## 9. Core Features Specification



\### 9.1. FASTHelp Assistant



Files:



\- `ChatBubble.tsx`

\- `FastHelp.tsx`

\- `api.fasthelp.ts`



Purpose:



\- Provide 24/7 customer support

\- Answer questions about products, sizing, rental process, deposit, delivery, return, showroom, and outfit suggestions



Flow:



1\. User opens floating chat bubble

2\. User asks a question

3\. Frontend sends request to `api.fasthelp.ts`

4\. API endpoint calls selected AI provider

5\. Assistant returns context-aware response



Rules:



\- Keep UI premium and minimal

\- Keep user-facing copy Vietnamese-first

\- Do not expose API keys

\- Do not hallucinate unavailable product inventory

\- Use product catalog context if already implemented



\---



\### 9.2. AR Try-On



File:



\- `ARTryOn.tsx`



Purpose:



\- Let users virtually preview garments through smartphone camera

\- Bridge the gap between online browsing and physical fitting



Cross-device flow:



1\. Product detail page generates QR code

2\. User scans QR code with mobile phone

3\. Mobile page requests camera access

4\. AR overlay/filter is rendered for the selected garment



Rules:



\- Keep the explanation simple

\- Include fallback for unsupported devices

\- Do not overpromise sizing accuracy

\- Present AR Try-On as a confidence aid



\---



\## 10. Catalog Filtering Requirements



The `/categories` page and homepage browsing tabs must support filtering based on available product data.



Required navigation tabs:



\- Nam

\- Nữ

\- Phụ kiện

\- Sale

\- Lookbook



Required filters:



\- Category, e.g. Suit, Áo dài, Đầm

\- Size

\- Occasion

\- Color

\- Gender



Recommended enhancements:



\- Sort by recommended

\- Sort by price low to high

\- Sort by price high to low

\- Sort by newest

\- Active filter chips

\- Mobile filter drawer

\- Clear filters button



Spelling note:



\- Use `occasion`, not `occassion`.



\---



\## 11. Folder Structure Strict Adherence



The project should preserve the existing structure.



```text

src/

├─ components/

│  ├─ site/                         # FASTWear specific UI

│  │  ├─ tabs/

│  │  ├─ AnnouncementBar.tsx

│  │  ├─ ARTryOn.tsx

│  │  ├─ ChatBubble.tsx

│  │  ├─ FastHelp.tsx

│  │  ├─ GivesBackSection.tsx

│  │  ├─ PillTabs.tsx

│  │  ├─ RentCard.tsx

│  │  └─ SiteShell.tsx

│  └─ ui/                           # Shadcn/ui generic components

├─ hooks/

│  └─ use-mobile.tsx

├─ lib/

│  ├─ catalog.ts

│  ├─ products.ts

│  └─ utils.ts

├─ routes/                          # TanStack file-based routing

│  ├─ index.tsx

│  ├─ product.$id.tsx

│  └─ ... (all pages)

├─ routeTree.gen.ts

└─ router.tsx

```



Rules:



\- Prefer editing existing components in `src/components/site/`.

\- Use `src/components/ui/` only for generic reusable UI primitives.

\- Do not duplicate large UI blocks unnecessarily.

\- Keep page components focused.

\- Extract repeated design patterns into reusable site components when appropriate.



\---



\## 12. AI Refactor Workflow



Design refactor should be done step by step, not all at once.



Recommended sequence:



1\. Global design tokens, typography, spacing, navbar, footer

2\. Homepage

3\. Product card and catalog grid

4\. Product detail page

5\. Cart and checkout

6\. About, policy, account

7\. FASTHelp and AR Try-On polish

8\. Final responsive QA pass



Each step must preserve:



\- Existing routes

\- Existing product data schema

\- Existing cart math

\- Vietnamese language

\- TypeScript-only implementation

\- Responsive design



\---



\## 13. Prompt Template for Future Page-Level Design Tasks



Use this template when asking AI/Codex/Lovable to redesign a specific page.



```text

Use the FASTWear build spec v6 as the baseline, but prioritize this page-specific instruction for layout and visual treatment.



Task:

Refine only \[PAGE / COMPONENT NAME].



Goal:

\[Describe the desired visual and UX outcome.]



Design direction:

\[Describe the mood, structure, references, or changes.]



Hard constraints:

\- Do not change routing.

\- Do not change product schema.

\- Do not change cart calculation logic.

\- Do not remove FASTHelp or AR Try-On.

\- Do not edit unrelated pages.

\- Keep Vietnamese customer-facing copy.

\- Keep TypeScript only.

\- Keep responsive behavior.



Expected output:

\- Update only the relevant files.

\- Explain what changed.

\- Mention any assumptions.

```



Example:



```text

Use the FASTWear build spec v6 as the baseline, but prioritize this page-specific instruction for layout and visual treatment.



Task:

Refine only the Homepage hero section in `src/routes/index.tsx`.



Goal:

Make the hero feel more editorial and premium, with stronger rental positioning and clearer CTA hierarchy.



Design direction:

Use a split visual layout with one large fashion image, a short Vietnamese headline, one primary CTA, and one secondary CTA. Keep the style spacious and high-end, but do not copy Taelor.style.



Hard constraints:

\- Do not change routing.

\- Do not change product schema.

\- Do not change cart calculation logic.

\- Do not edit product cards, cart, checkout, or unrelated pages.

\- Keep Vietnamese customer-facing copy.

\- Keep TypeScript only.

\- Keep responsive behavior.



Expected output:

\- Update only the Homepage hero.

\- Explain what changed.

\- Mention any assumptions.

```



\---



\## 14. Design Refactor Guardrails



When refining design, AI must avoid these common issues:



\- Do not redesign the entire website when only one page/component is requested.

\- Do not overwrite working business logic for visual changes.

\- Do not replace the product schema just to make the UI easier.

\- Do not remove existing pages.

\- Do not remove mobile responsiveness.

\- Do not add mock routes that do not exist.

\- Do not add external packages unless clearly necessary.

\- Do not introduce English copy into customer-facing UI unless requested.

\- Do not make the site look like a generic SaaS landing page.

\- Do not make the site look like a discount marketplace.

\- Do not copy Taelor.style or any reference website 1:1.

\- Do not make all pages visually identical; each page can have a suitable layout while sharing the same design language.



\---



\## 15. Definition of Done for Design Refactor



A design refactor is considered successful when:



\- The updated page/component still compiles.

\- TypeScript errors are not introduced.

\- Existing routes still work.

\- Product schema and cart logic remain intact.

\- Customer-facing copy remains Vietnamese-first.

\- The UI feels more premium, spacious, and fashion-oriented.

\- CTA hierarchy is clearer.

\- Rental flow is easier to understand.

\- Mobile layout remains polished.

\- The change is limited to the requested scope.

\- The result follows FASTWear’s brand direction without copying a reference website.



\---



\## 16. Final Design North Star



FASTWear should not feel like a generic ecommerce store.



It should feel like:



> A curated Vietnamese premium fashion rental experience where users can confidently choose, try, rent, and return high-end outfits for important occasions.



The design should help users quickly understand:



1\. What FASTWear offers

2\. Why renting is valuable

3\. How the rental process works

4\. Which outfit fits their occasion

5\. What they need to pay now

6\. How deposit, delivery, showroom, and return work

7\. Why FASTWear is trustworthy



