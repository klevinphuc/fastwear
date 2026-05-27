\# FASTWear — Intermediate Category Landing Pages



\## Goal



Redesign the Nam, Nữ, and Phụ kiện navigation flows into intermediate landing pages inspired by Taelor's collection structure, but not copied 1:1.



These pages should not immediately show the full product grid. Instead, they should guide users into subcategories first, then offer a clear "Tất cả sản phẩm" option.



\## Pages / Tabs



Apply to:

\- Nam

\- Nữ

\- Phụ kiện



Do not apply yet to:

\- Phối đồ

\- Ưu đãi



\## Reference Images



Use these as visual references:

\- docs/design/catalog-pages/nam-intermediate-reference.png

\- docs/design/catalog-pages/nu-intermediate-reference.png

\- docs/design/catalog-pages/phu-kien-intermediate-reference.png



\## Layout Structure



Each intermediate page has 2 major sections.



\---



\## Section 1: Category Discovery



For Nam and Nữ:

Title:

\- Eyebrow: NAM or NỮ

\- Heading: Dịp đặc biệt



For Phụ kiện:

\- Eyebrow: PHỤ KIỆN

\- Heading: Dòng sản phẩm



Below the title:

\- 3 large vertical editorial cards in one row on desktop

\- Cards should be tall, similar to Taelor's collection cards

\- No childish icons

\- No decorative emoji

\- Each card should only contain:

&#x20; - Image

&#x20; - Title

&#x20; - 1–2 short description lines



Card style:

\- Image on top

\- Text below image

\- Clean, minimal

\- No heavy card shadows

\- Rounded corners can be subtle

\- Product-image-led

\- Generous spacing



Nam cards:

\- Công sở

\- Hẹn hò

\- Thanh lịch thường ngày



Nữ cards:

\- Dự tiệc

\- Du lịch

\- Cưới hỏi



Phụ kiện cards:

\- Túi xách

\- Giày

\- Trang sức



\---



\## Section 2: All Products



This must be a separate section directly below Section 1.



Title area:

\- Eyebrow: NAM / NỮ / PHỤ KIỆN

\- Heading: Tất cả sản phẩm

\- Short supporting line

\- CTA: Xem tất cả sản phẩm



Important:

\- Do not place the heading or paragraph inside the image.

\- Text should sit above the image as its own section header.

\- CTA should sit near the heading area, not embedded inside the image.



Image:

\- One single wide horizontal image

\- Width should visually match the total width of the 3 cards above

\- Image height should be shorter than the vertical cards

\- Use object-cover

\- Rounded corners allowed

\- No large overlay text inside the image



\---



\## Navigation Behavior



Clicking a top card should route/filter to the corresponding product listing for that subcategory.



Clicking "Tất cả sản phẩm" should route/filter to the full product listing for that main category.



Do not create new routes unless necessary.

Prefer using existing route/query structure if the app already has one.



Possible routes if supported:

\- /categories?gender=Nam\&occasion=CongSo

\- /categories?gender=Nữ\&occasion=DuTiec

\- /categories?category=Phụ kiện\&type=TuiXach



If the app currently uses tab query parameters like /?tab=nam, preserve that pattern and add view/filter state only if it fits the existing architecture.



\## Constraints



Do not change:

\- product schema

\- cart calculation logic

\- routeTree.gen.ts

\- FASTHelp

\- AR Try-On

\- Homepage design

\- global theme

\- product data, unless explicitly requested later



Use existing product schema:

\- id

\- name

\- designer

\- price

\- deposit

\- category

\- gender

\- occasion

\- sizes

\- colors

\- available

\- rating

\- image

\- images?



\## Visual Direction



\- Clean, minimal, premium

\- Inspired by Taelor collection layout, not copied

\- FASTWear identity must remain distinct

\- Vietnamese-first copy

\- Cream/off-white background

\- Emerald only for main CTA/active state

\- Product-image-led

\- Spacious layout

