# Quy chuẩn Biên tập & Xuất bản The BioDispatch (Editorial Standards V2)

Hệ thống The BioDispatch được định vị là ấn bản Y sinh Chuyển hóa & Công nghệ Sinh học (TechBio & Metabolic Medicine) chuẩn mực quốc tế của **TS. Hoàng Xuân Chiến** (Dr. rer. nat. · Đại học Hamburg, CHLB Đức).

Mọi bài viết chuyên khảo mới khi khởi tạo hoặc cập nhật **BẮT BUỘC** tuân thủ các nguyên tắc bất di bất dịch và vượt qua **Cổng Kiểm Duyệt Chất Lượng (Quality Gatekeeper)** trước khi xuất bản.

---

## 1. Bản sắc Văn phong TS. Hoàng Xuân Chiến (Tone & Narrative Archetype)

Bài viết của TS. Hoàng Xuân Chiến **KHÔNG PHẢI** là bản tóm tắt học thuật khô cứng dịch từ báo cáo y khoa, mà là **nghệ thuật dẫn dắt đời thường để giải mã phòng lab**:

1. **Khởi đầu bằng Câu chuyện Đời thực / Bẫy Quảng cáo Đại chúng**:
   * Mở đầu bằng một hiện tượng quen thuộc: một thói quen ăn uống, một viên TPCN tiền triệu mà ai cũng đồn thổi, hoặc một cảm giác cơ thể ai cũng từng trải qua.
2. **Phá vỡ Hiểu lầm (The Counter-Intuitive Twist)**:
   * Chỉ ra điểm mà đa số mọi người đang hiểu sai. Dẫn dắt người đọc thấy sự thật sinh học phân tử thú vị hơn nhiều so với định kiến.
3. **CẤM NÉM TỪ VIẾT TẮT KHÔNG GIẢI NGHĨA (The Acronym Ban & Personification Rule)**:
   * **Bắt buộc**: Bất kỳ từ viết tắt nào (kể cả quen thuộc như NAD+, ATP, AQP4, CD38, CSF, PGC-1α...) đều **phải được giải nghĩa ngay lần đầu xuất hiện** và **gán cho một vai diễn / hình tượng đời thường** (chiếc van nước, người thủ kho, tên trộm năng lượng, viên gạch liên kết...).
   * Giải thích cơ chế giống như kể chuyện về hoạt động của một bộ máy, một thành phố hay một doanh nghiệp.
4. **Hài hước, Tự nhiên và Duyên dáng**:
   * Xưng hô: Giữ tinh thần chia sẻ khoa học ấm áp, mạch lạc (*"Nói một cách nôm na là...", "Hãy tưởng tượng bạn đang...", "Nhưng khoan đã, có một nghịch lý ở đây..."*).
5. **CẤM TUYỆT ĐỐI dấu gạch ngang dài (`—` em-dash và `–` en-dash)**:
   * Thay bằng dấu phẩy (`,`), dấu hai chấm (`:`), dấu gạch nối ngắn tiêu chuẩn (`-`), hoặc mở ngoặc đơn (`(...)`).
6. **Ẩn dụ Đời thực Trang trọng**:
   * Đặt trọn vẹn phép ẩn dụ cốt lõi vào một blockquote in nghiêng:
     ```markdown
     > *"Lời giải thích ẩn dụ đời thực sâu sắc, so sánh cơ chế phân tử với các hiện tượng quen thuộc..."*
     ```

---

## 2. Cổng Kiểm Duyệt Chất Lượng Bắt Buộc (Quality Gatekeeper Rules)

Trước khi một bài viết được phép xuất bản lên The BioDispatch, bộ lọc tự động `validate-dispatch.mjs` sẽ kiểm tra 7 tiêu chí:

| Tiêu chí | Chuẩn bắt buộc | Nếu vi phạm |
| :--- | :--- | :--- |
| **Độ dài bài viết** | Tối thiểu 1.200 từ cho bản tiếng Việt, 1.000 từ cho tiếng Anh | ❌ REJECT (Bài quá ngắn, thiếu phân tích sâu) |
| **Giải nghĩa chữ viết tắt** | Tỷ lệ chữ viết tắt không giải nghĩa = 0 | ❌ REJECT (Yêu cầu bổ sung chú giải đời thường) |
| **Cấu trúc 5 nhịp** | Đủ 5 phần: Mở đầu đời thực, Phá vỡ hiểu lầm, Cơ chế phân tử, Bảng đối thoại số liệu, Lời khuyên an toàn | ❌ REJECT (Thiếu nhịp dẫn dắt) |
| **Sơ đồ Pathway** | Có ít nhất 1 flowchart pipeline chuẩn (`──►`) | ❌ REJECT (Thiếu trực quan hóa luồng phản ứng) |
| **Bảng số liệu đối sánh** | Có ít nhất 1 bảng Markdown so sánh trạng thái sinh lý | ❌ REJECT (Thiếu bảng dữ liệu thực chứng) |
| **Kiểm tra dấu câu** | Không chứa em-dash (`—`) hay en-dash (`–`) | ❌ REJECT (Lỗi quy chuẩn typography) |
| **Minh chứng Y văn** | Có DOI và/hoặc PMID xác thực trên PubMed/Nature/Science | ❌ REJECT (Vi phạm liêm chính khoa học) |

---

## 3. Hình ảnh Minh họa Chuẩn mực (16:9 Medical Illustration)

* Mỗi bài viết bắt buộc phải có hình minh họa tỷ lệ 16:9 phong cách Swiss Minimal Dark Mode y học tại `/images/posts/<slug>.jpg`.
* Hình ảnh phải mô tả chính xác cơ chế sinh học phân tử của bài viết, không dùng hình trùng lặp giữa các bài.

---

## 4. Danh mục Y văn Thực chứng (§ 6 References) & Tương tác Gizmo

* Luôn khai báo đầy đủ `doi` và `pmid` trong `SEED_REFS` tại `src/lib/store.ts`.
* Nút **PubMed ↗** và **DOI ↗** phải hoạt động chính xác 100%.
* Liên kết Gizmo mô phỏng phù hợp (`pathway`, `pk`, `synergy`, `biomarker` hoặc `null`).
