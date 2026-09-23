# LỘ TRÌNH PHÁT TRIỂN CÁC MÔ HÌNH MÔ PHỎNG DƯỢC HỌC TƯƠNG TÁC (GIZMOS LAB)
## The BioDispatch · Dr. Xuan Chien Hoang (Dr. rer. nat., University of Hamburg)

Tài liệu này lưu trữ toàn bộ đặc tả kỹ thuật, cơ sở dược lý và phương trình toán học của **6 Mô hình Mô phỏng Trực quan Tiếp theo** dự kiến triển khai trên nền tảng The BioDispatch.

---

### Mô hình 1: Trục TMAO Tim - Gan - Ruột (Gut-Liver TMAO Axis & Atheroma Cascade)
* **Chủ đề cốt lõi:** Chuyển hóa Choline/Carnitine từ chế độ ăn thành TMA qua enzyme `CutC/D` của hệ vi sinh đường ruột, sau đó được vận chuyển về gan và oxy hóa bởi `FMO3` thành Trimethylamine N-oxide (TMAO), kích hoạt thụ thể `CD36` trên đại thực bào tạo bọt và thúc đẩy mảng xơ vữa động mạch.
* **Các biến số tương tác (Sliders / Controls):**
  - Khẩu phần Choline/Carnitine nạp vào hàng ngày (Trứng, thịt đỏ vs Đậu hạt, thực vật).
  - Tỉ lệ vi khuẩn đường ruột sinh enzyme `CutC/D` (Firmicutes vs Bacteroidetes).
  - Hoạt lực enzyme `FMO3` tại gan (yếu tố di truyền hoặc ức chế bởi hợp chất thực vật).
  - Chất ức chế tự nhiên: Nồng độ **3,3-Dimethyl-1-butanol (DMB)** từ giấm balsamic hoặc dầu ô liu nguyên chất (DMB cạnh tranh ức chế CutC/D).
* **Đầu ra trực quan (Visual Telemetry):**
  - Biểu đồ nồng độ TMAO huyết tương (µmol/L) theo thời gian.
  - Thước đo nguy cơ tim mạch biến cố lớn (MACE Risk Score).
  - Đồ họa mặt cắt lòng động mạch: Tốc độ tích tụ tế bào bọt (Foam cells) và độ dày lớp nội mạc mạch vành.
* **Cơ sở y văn & Trích dẫn:** Wang et al. (*Nature*, 2011, PMID: 21478875); Tang et al. (*NEJM*, 2013, PMID: 23614584); Zhu et al. (*Cell*, 2016).

---

### Mô hình 2: Lên men Tinh bột kháng & Hàng rào Niêm mạc ruột (Resistant Starch → SCFA & Tight Junctions)
* **Chủ đề cốt lõi:** Lên men kỵ khí tinh bột kháng (RS2/RS3) tại manh tràng và đại tràng bởi *Faecalibacterium prausnitzii* và *Bifidobacterium*, sinh tổng hợp Axit béo chuỗi ngắn (SCFA: Butyrate, Acetate, Propionate), hạ pH lòng ruột, ức chế enzyme `HDAC` và củng cố liên kết protein `Claudin-1` / `Occludin` chống rò rỉ ruột (Leaky Gut).
* **Các biến số tương tác (Sliders / Controls):**
  - Liều lượng tinh bột kháng (g/ngày): Tinh bột chuối xanh, yến mạch ngâm qua đêm, cơm nguội.
  - Đa dạng khuẩn lạc đường ruột (Chỉ số Shannon / Mức độ phong phú của chủng sinh butyrate).
  - Thời gian vận chuyển thức ăn qua đại tràng (Colonic Transit Time: 24h – 72h).
  - Nồng độ kháng sinh làm suy giảm hệ vi sinh (Dysbiosis stress test).
* **Đầu ra trực quan (Visual Telemetry):**
  - Tỉ lệ sinh SCFA (Molar Ratio Acetate : Propionate : Butyrate chuẩn 60:20:20).
  - Độ mở khe hở niêm mạc ruột (Tight Junction Paracellular Permeability) & nồng độ độc tố LPS tràn vào tĩnh mạch cửa.
  - Phổ pH lòng đại tràng (pH 5.5 đến 6.8).
* **Cơ sở y văn & Trích dẫn:** Koh et al. (*Cell*, 2016, PMID: 27984723); Canani et al. (*World J Gastroenterol*, 2011); Morrison & Preston (*Gut Microbes*, 2016).

---

### Mô hình 3: Ngã ba Mevalonate: Cân bằng Statin – Cholesterol – CoQ10 (Mevalonate Shunt & SAMS)
* **Chủ đề cốt lõi:** Khi dùng thuốc hạ mỡ máu nhóm Statin để ức chế enzyme `HMG-CoA Reductase`, con đường Mevalonate bị chặn không chỉ làm giảm Cholesterol mà còn làm sụt giảm nghiêm trọng quá trình tổng hợp **Coenzyme Q10 (Ubiquinone)** và Dolichol ở ty thể, dẫn đến hội chứng đau mỏi cơ do statin (Statin-Associated Muscle Symptoms - SAMS).
* **Các biến số tương tác (Sliders / Controls):**
  - Liều Statin (Atorvastatin/Rosuvastatin theo mg/ngày).
  - Hoạt tính enzyme chuyển hóa `CYP3A4` / `SLCO1B1` (yếu tố dược lý di truyền).
  - Nồng độ bù trừ CoQ10 bổ sung đường uống (dạng Ubiquinol 100mg – 300mg).
  - Mức độ tập luyện thể chất (Stress oxy hóa ty thể).
* **Đầu ra trực quan (Visual Telemetry):**
  - Mức giảm LDL-C huyết tương (%) song song với mức sụt giảm CoQ10 tại màng trong ty thể tế bào cơ (%).
  - Tỉ lệ rủi ro đau mỏi cơ vân (Myopathy Probability Curve).
  - Cửa sổ liều lượng tối ưu: Đạt mục tiêu tim mạch mà không gây độc tế bào cơ.
* **Cơ sở y văn & Trích dẫn:** Stroes et al. (*Eur Heart J*, 2015, PMID: 25697241); Hargreaves et al. (*Drug Saf*, 2005); Qu et al. (*J Am Heart Assoc*, 2018).

---

### Mô hình 4: Cửa sổ Thủy phân Sulforaphane & Nhiệt độ Chế biến (Myrosinase Thermal Inactivation)
* **Chủ đề cốt lõi:** Hoạt chất chống ung thư Sulforaphane trong bông cải xanh không tồn tại ở dạng tự do mà nằm ở dạng tiền chất Glucoraphanin. Cần có enzyme `Myrosinase` xúc tác thủy phân khi nhai hoặc nghiền nát tế bào thực vật. Nếu nấu quá chín (trên 60°C), myrosinase bị bất hoạt bất thuận nghịch, glucoraphanin đi xuống ruột chỉ được chuyển hóa với hiệu suất cực thấp (<10%) bởi hệ vi khuẩn.
* **Các biến số tương tác (Sliders / Controls):**
  - Nhiệt độ chế biến (Luộc 100°C, Hấp 70°C, Xào 140°C, Ăn sống 25°C).
  - Thời gian xử lý nhiệt (0 đến 15 phút).
  - Thời gian ủ sau khi cắt/nghiền trước khi nấu (Hack: chờ 40 phút để enzyme kịp thủy phân).
  - Bổ sung nguồn myrosinase ngoại sinh từ hạt mù tạt (Brown mustard seed powder).
* **Đầu ra trực quan (Visual Telemetry):**
  - Đồ thị nhiệt động học hoạt tính enzyme Myrosinase (% hoạt lực còn lại).
  - Khối lượng Sulforaphane tự do thu được (µmol).
  - Mức độ kích hoạt con đường chống oxy hóa nhân tế bào Nrf2-ARE.
* **Cơ sở y văn & Trích dẫn:** Fahey et al. (*Cancer Epidemiol Biomarkers Prev*, 2012, PMID: 22442296); Ghawi et al. (*Food Chem*, 2014); Okunade et al. (*Mol Nutr Food Res*, 2018).

---

### Mô hình 5: Bộ căn chỉnh Nhịp Sinh học & Cửa sổ Melatonin (Circadian Phase Response Curve)
* **Chủ đề cốt lõi:** Đường cong đáp ứng pha (Phase Response Curve - PRC) của nhân trên chéo (Suprachiasmatic Nucleus - SCN) dưới tác động của phổ ánh sáng xanh (460-480nm) và nồng độ Melatonin nội sinh, ảnh hưởng trực tiếp đến chu kỳ thức ngủ, chuyển hóa đường huyết (hệ số nhạy cảm insulin giảm mạnh vào ban đêm) và chức năng ty thể.
* **Các biến số tương tác (Sliders / Controls):**
  - Thời điểm tiếp xúc ánh sáng mặt trời tự nhiên buổi sáng (Lux & Giờ thức dậy).
  - Cường độ ánh sáng màn hình điện tử / đèn LED xanh sau 20:00.
  - Giờ ăn tối cuối cùng trong ngày (Khoảng cách giữa bữa tối và giờ ngủ).
  - Bổ sung Melatonin ngoại sinh hoặc Magnesi Glycinate (liều và thời điểm uống).
* **Đầu ra trực quan (Visual Telemetry):**
  - Đường cong nồng độ Cortisol huyết thanh (đỉnh sáng sớm) và Melatonin nội sinh (đỉnh nửa đêm).
  - Độ trễ pha giấc ngủ (Phase Delay / Phase Advance tính bằng phút).
  - Chỉ số nhạy cảm Insulin ban đêm và nhiệt độ cơ thể lõi (Core Body Temperature).
* **Cơ sở y văn & Trích dẫn:** Khalsa et al. (*J Physiol*, 2003, PMID: 12692188); Wright et al. (*Curr Biol*, 2013); Walker (*Why We Sleep*, 2017).

---

### Mô hình 6: Bộ đếm Hạt mỡ xơ vữa ApoB vs LDL-C (ApoB Particle Count Discordance Simulator)
* **Chủ đề cốt lõi:** Sự bất tương xứng (Discordance) giữa hàm lượng Cholesterol trong hạt LDL (LDL-C tính bằng mg/dL) và Tổng số lượng các hạt lipoprotein sinh xơ vữa thực tế (Apolipoprotein B - ApoB tính bằng nmol/L). Ở những người có kháng insulin, gan nhiễm mỡ (MASLD) hoặc hội chứng chuyển hóa, các hạt LDL bị thu nhỏ và đặc lại (Small Dense LDL), khiến LDL-C xét nghiệm vẫn bình thường nhưng ApoB lại rất cao, tạo điểm mù nguy cơ tim mạch chết người.
* **Các biến số tương tác (Sliders / Controls):**
  - Nồng độ LDL-C (mg/dL).
  - Nồng độ Triglycerides huyết thanh (mg/dL).
  - Mức độ đề kháng Insulin (Chỉ số HOMA-IR hoặc Triglyceride/HDL ratio).
  - Đường kính trung bình của hạt lipoprotein (sdLDL vs lbLDL).
* **Đầu ra trực quan (Visual Telemetry):**
  - Biểu đồ mô phỏng mật độ hạt: So sánh thể tích cholesterol vs số lượng đầu đạn ApoB va chạm nội mô động mạch mỗi phút.
  - Biểu đồ nhiệt phân loại: Concordant vs Discordant Zone (Vùng an toàn ảo vs Vùng rủi ro thực sự).
  - Khuyến nghị can thiệp dược lý và thảo dược hạ ApoB (như Berberine phối hợp sterol thực vật).
* **Cơ sở y văn & Trích dẫn:** Sniderman et al. (*Lancet*, 2019, PMID: 31648873); Ference et al. (*J Am Coll Cardiol*, 2017); Mach et al. (*ESC/EAS Guidelines*, 2020).

---

### Kiến trúc Kỹ thuật & Tiêu chuẩn Triển khai
1. **Kiểm thử Cục bộ (Localhost First):** Tuyệt đối luôn biên dịch và kiểm thử hoàn hảo trên `localhost:3000` (`npm run build` không lỗi) trước khi triển khai bất kỳ commit nào lên Vercel.
2. **Khung giao diện (Chassis):** Kế thừa `BiomedicalGizmoContainer` trong `src/components/gizmo/Chassis.tsx` (3 vùng chuẩn: Telemetry HUD, SVG Visual Canvas, Control Dashboard & Layman Guide).
3. **Hiệu năng & Bảo mật:** Tính toán thuần client-side (TypeScript + SVG toán học + Tailwind CSS + Framer Motion), không gửi bất kỳ dữ liệu nào của người dùng lên server bên ngoài.
4. **Song ngữ:** Cung cấp cả bản tiếng Việt và tiếng Anh, kèm mục **💡 Góc Giải Thích Dễ Hiểu** sử dụng các ẩn dụ sinh học trực quan cho đại chúng.
