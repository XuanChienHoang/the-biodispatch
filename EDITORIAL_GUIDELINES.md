# Quy chuẩn Biên tập & Xuất bản The BioDispatch (Editorial Standards)

Hệ thống The BioDispatch được định vị là ấn bản Y sinh Chuyển hóa & Công nghệ Sinh học (TechBio & Metabolic Medicine) chuẩn mực quốc tế của **TS. Hoàng Xuân Chiến** (Dr. rer. nat. · Đại học Hamburg, CHLB Đức).

Mọi bài viết chuyên khảo mới khi khởi tạo hoặc cập nhật **BẮT BUỘC** tuân thủ 6 nguyên tắc bất di bất dịch sau:

---

## 1. Kiểm soát Dấu câu & Văn phong (Typography & Tone)

* **CẤM TUYỆT ĐỐI dấu gạch ngang dài (`—` em-dash và `–` en-dash)**:
  * Trong toàn bộ văn bản tiếng Việt và tiếng Anh, tuyệt đối không dùng em-dash hay en-dash.
  * Thay thế linh hoạt bằng: dấu phẩy (`,`), dấu hai chấm (`:`), dấu gạch nối ngắn tiêu chuẩn (`-`), hoặc mở ngoặc đơn (`(...)`).
* **Định dạng Ẩn dụ Đời thực**:
  * KHÔNG sử dụng nhãn thô cứng như `"Ẩn dụ đời thực:"` hay `"Ví von:"`.
  * Đặt trọn vẹn phép ẩn dụ vào một blockquote in nghiêng trang trọng:
    ```markdown
    > *"Lời giải thích ẩn dụ đời thực sâu sắc, so sánh cơ chế phân tử với các hiện tượng quen thuộc..."*
    ```

---

## 2. Hình ảnh Minh họa Chuẩn mực (16:9 Medical Illustration)

* Mỗi bài viết bắt buộc phải có ít nhất một hình minh họa tỷ lệ 16:9 phong cách Swiss Minimal Dark Mode y học tại `/images/posts/<slug>.jpg`.
* Hình ảnh được chèn ngay bên dưới phần mở đầu (lead/excerpt) và ngay phía trên mục số 1:
  ```markdown
  ![Mô tả chú thích chi tiết của hình ảnh minh họa](/images/posts/<slug>.jpg)
  ```

---

## 3. Sơ đồ Cơ chế Phân tử (Pathway Flowchart Pipeline)

* Các chuỗi truyền tin phân tử, chuyển hóa hoặc dược động học được viết bằng cú pháp khối mã:
  ```text
  [Giai đoạn 1] ──► [Giai đoạn 2] ──► [Giai đoạn 3] ──► [Giai đoạn 4]
  ```
* Hệ thống tự động chuyển đổi thông qua component `PathwayFlowchart`:
  * **Trên Desktop**: Tự động dàn hàng ngang thành các thẻ bo góc phòng lab, chia đều độ rộng (`flex-1`), kết nối bằng mũi tên dạ quang `→`. Chữ tự xuống dòng, **tuyệt đối không bị ép 1 dòng hay phải cuộn ngang**.
  * **Trên Mobile / Màn hình nhỏ**: Tự động xếp chồng dọc thành chuỗi giai đoạn (Vertical Pipeline), kết nối bằng mũi tên chỉ xuống `↓`.
  * **Đa đường truyền (Multi-track)**: Mỗi dòng chứa mũi tên `──►` sẽ hiển thị thành một luồng phản ứng độc lập (ví dụ so sánh Có hoạt chất vs Không có hoạt chất).
  * **Sơ đồ cây 2D**: Các sơ đồ phân nhánh chứa `│`, `┌`, `└`, `▼` sẽ giữ nguyên dạng lưới đơn cách, kèm thanh cuộn mượt và huy hiệu thông báo.

---

## 4. Mục Danh mục Y văn Thực chứng (§ 6 References)

* **Vị trí bắt buộc**: Đặt ngay phía dưới phần kết luận bài viết, **phía trên** mục Gizmo mô phỏng tương tác. Tràn rộng toàn trang (full container width).
* **Nút bấm hành động trực tiếp**:
  * Luôn khai báo đầy đủ `doi` và/hoặc `pmid` trong `SEED_REFS` tại `src/lib/store.ts`.
  * Nút **PubMed ↗** (trỏ đến `https://pubmed.ncbi.nlm.nih.gov/<pmid>/`) và nút **DOI ↗** (trỏ đến `https://doi.org/<doi>`) phải hoạt động chính xác 100%.

---

## 5. Tương tác Thí nghiệm Ảo (Interactive Laboratory Gizmo)

* Tùy theo chủ đề bài viết, liên kết Gizmo phù hợp qua frontmatter:
  * `gizmo: "pathway"`: Bản đồ điều hòa trục AMPK - mTOR - Nrf2.
  * `gizmo: "pk"`: Mô hình dược động học 1 ngăn nồng độ máu theo thời gian.
  * `gizmo: "synergy"`: Ma trận cộng hưởng hoạt chất tự nhiên.
  * `gizmo: "biomarker"`: Dự báo chỉ số viêm nhạy cao hs-CRP.
  * `gizmo: null`: Đối với các bài phân tích lâm sàng không cần mô phỏng.

---

## 6. Cấu trúc Frontmatter Chuẩn cho Bài viết Mới

```yaml
---
title: "Tiêu đề bài viết chuẩn học thuật và cuốn hút"
date: "YYYY-MM-DD"
excerpt: "Đoạn tóm tắt cô đọng 2-3 câu làm nổi bật nghịch lý lâm sàng hoặc cơ chế cốt lõi."
author: "TS. Hoàng Xuân Chiến"
authorRole: "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức"
tags: ["Mật mã Tim mạch", "Hoạt chất", "Cơ chế phân tử"]
organ: "Cardiovascular" # Hoặc: Metabolic, Cellular Aging, Hepatic, Neurological
tier: "Clinical Deep-Dive" # Hoặc: Foundational, Research Brief
readingTime: "8 phút đọc"
featured: true
doi: "10.xxxx/xxxxxx"
gizmo: null # Hoặc: "pathway", "pk", "synergy", "biomarker"
lang: "vi"
image: "/images/posts/<slug>.jpg"
imageAlt: "Mô tả đồ họa phân tử y sinh"
---
```
