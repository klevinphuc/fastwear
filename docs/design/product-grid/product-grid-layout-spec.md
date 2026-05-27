\# FASTWear — Product Grid Layout Spec



\## Goal



Redesign the product grid pages for Nam, Nữ, and Phụ kiện after users select a category/view from the intermediate landing pages.



The product grid should feel closer to a premium Taelor-style product listing:

\- image-first

\- clean

\- spacious

\- minimal

\- no large white container layer behind the grid

\- product information short and structured

\- hover CTA aligned with current homepage CTA style



\## References



Use these local references:

\- docs/design/product-grid/nam-product-grid-reference.png

\- docs/design/product-grid/nu-product-grid-reference.png

\- docs/design/product-grid/phu-kien-product-grid-reference.png

\- docs/design/product-grid/homepage-cta-reference.png



\## Pages / Flows



Apply to:

\- /?tab=nam\&view=...

\- /?tab=nu\&view=...

\- /?tab=phu-kien\&view=...



Do not redesign:

\- Homepage

\- Intermediate category landing layout

\- Product Detail Page

\- Cart

\- Checkout



\## Overall Page Layout



Use the current FASTWear header/nav.



Below header:

\- Page title area

\- Short subtitle

\- Filter pill row

\- Sort control on desktop if already present

\- Product grid



Background:

\- Use the main beige/cream site background.

\- Remove the large white container layer behind the product grid.

\- Keep layout spacious and premium.



Desktop grid:

\- 4 columns

\- generous gap

\- image-first cards



Tablet:

\- 2 columns



Mobile:

\- 1 column

\- actions must remain accessible



\## Product Card Layout



Each product card should contain:



1\. Large product image

&#x20;  - vertical image area

&#x20;  - preferred aspect ratio: 3:4 or 4:5

&#x20;  - product-image-led

&#x20;  - minimal border

&#x20;  - no heavy shadow



2\. Product name

&#x20;  - uppercase

&#x20;  - bold

&#x20;  - left-aligned

&#x20;  - concise

&#x20;  - example: QUẦN JEANS ỐNG RỘNG



3\. Product meta row

&#x20;  Three compact columns:

&#x20;  - Column 1:

&#x20;    Label: Thương hiệu

&#x20;    Value: product.designer

&#x20;  - Column 2:

&#x20;    Label: Tiền cọc

&#x20;    Value: product.deposit

&#x20;  - Column 3:

&#x20;    Label: Giá

&#x20;    Value: product.price



Use existing Product schema only:

\- name

\- designer

\- price

\- deposit

\- category

\- gender

\- occasion

\- image

\- images?



Do not change product schema.



\## Hover CTA



On desktop hover over product image:

\- Add a subtle dark overlay over the image.

\- Show two stacked CTA buttons centered over the image.



Button 1:

\- Text: Thuê ngay

\- Style should match homepage primary CTA.

\- Use burgundy / wine fill:

&#x20; #6b1a33

\- Text color:

&#x20; #fffaf3

\- Rounded pill.

\- Premium, confident, not marketplace-like.



Button 2:

\- Text: Thử ảo

\- Style should match homepage secondary CTA.

\- Translucent taupe / glass panel.

\- Light border.

\- Cream/white text.

\- Rounded pill.



Preserve existing handlers:

\- Thuê ngay should keep existing rent/add/cart/detail behavior.

\- Thử ảo should keep existing AR Try-On behavior if already connected.

\- Do not invent new business logic.



\## Filters



Keep current filter behavior and query params.



Do not change:

\- routing structure

\- `view` query behavior from intermediate pages

\- product data

\- cart logic



\## Hard Constraints



Do not edit:

\- src/lib/products.ts

\- src/routeTree.gen.ts

\- cart logic

\- checkout logic

\- FASTHelp logic

\- AR Try-On logic

\- Homepage

\- global theme unless absolutely necessary



Keep:

\- TypeScript only

\- Vietnamese customer-facing copy

\- responsive behavior

\- existing route architecture

