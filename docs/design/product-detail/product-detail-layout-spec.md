\# Product Detail Page – FASTWear



Use FASTWear build spec v6 as baseline.



\## Scope

Refine only Product Detail Page and AR Try-On modal.



\## References

\- product-detail-current-reference.png

\- product-detail-return-policy-expanded-reference.png

\- product-detail-ar-qr-modal-reference.png



\## Changes



\### 1. Add Return Policy Section



Add accordion below:

"Chất liệu \& cách bảo quản"



New section:

"Hướng dẫn đổi trả"



Content:



\- Trong 24h đầu nếu sản phẩm không đúng mô tả - đổi ngay hoặc hoàn tiền 100%.



Chi tiết hơn khách hàng có thể liên hệ FASTWear qua hotline 028.3512.7254 hoặc tại trang Chính sách đổi trả tại web.



\- Highlight hotline

\- "Chính sách đổi trả" → link /policy



\---



\### 2. AR Try-On (QR Modal)



\- Trigger: button "Thử đồ ảo"

\- Open centered modal



Content:



Title:

Thử outfit bằng AR



Subtitle:

Trải nghiệm trang phục ngay trên điện thoại của bạn



QR:

Quét mã QR để bắt đầu trải nghiệm thử đồ ảo



Steps:

1\. Mở camera điện thoại

2\. Cho phép truy cập camera

3\. Hướng camera vào người



Note:

Đây là bản demo thử đồ bằng AR trên thiết bị di động. Trải nghiệm tốt nhất trên điện thoại.



\---



\## Constraints



\- Không đổi schema product

\- Không đổi cart logic

\- Không đổi routing

\- Không thêm dependency QR

\- Dùng QR image từ /public/ar-qr/

