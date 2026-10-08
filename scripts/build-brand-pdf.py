import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# 1. Register Unicode TrueType Fonts from Windows Fonts directory
# This guarantees 100% flawless Vietnamese diacritics rendering without any missing glyphs!
FONT_DIR = "C:/Windows/Fonts"
pdfmetrics.registerFont(TTFont("ArialVN", os.path.join(FONT_DIR, "arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialVN-Bold", os.path.join(FONT_DIR, "arialbd.ttf")))
pdfmetrics.registerFont(TTFont("ArialVN-Italic", os.path.join(FONT_DIR, "ariali.ttf")))
pdfmetrics.registerFont(TTFont("ArialVN-BoldItalic", os.path.join(FONT_DIR, "arialbi.ttf")))

pdfmetrics.registerFont(TTFont("TimesVN", os.path.join(FONT_DIR, "times.ttf")))
pdfmetrics.registerFont(TTFont("TimesVN-Bold", os.path.join(FONT_DIR, "timesbd.ttf")))
pdfmetrics.registerFont(TTFont("TimesVN-Italic", os.path.join(FONT_DIR, "timesi.ttf")))

PAGE_WIDTH, PAGE_HEIGHT = A4

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return

        self.saveState()
        self.setFont("ArialVN", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running header
        self.drawString(54, PAGE_HEIGHT - 36, "PHYTOCODEX · OFFICIAL BRAND IDENTITY & MARKETING DOSSIER")
        self.drawRightString(PAGE_WIDTH - 54, PAGE_HEIGHT - 36, "DR. XUAN CHIEN HOANG · HAMBURG")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        self.line(54, PAGE_HEIGHT - 42, PAGE_WIDTH - 54, PAGE_HEIGHT - 42)

        # Running footer
        self.line(54, 46, PAGE_WIDTH - 54, 46)
        self.drawString(54, 34, "CONFIDENTIAL & PROPRIETARY · WWW.PHYTO-CODEX.ORG")
        page_str = f"Trang {self._pageNumber} / {page_count}"
        self.drawRightString(PAGE_WIDTH - 54, 34, page_str)
        self.restoreState()


def build_brand_guidelines_pdf(filename="public/branding/Phytocodex_Brand_Guidelines_and_Marketing_Dossier.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Brand Colors
    navy = colors.HexColor("#0B1528")
    gold = colors.HexColor("#B48A2C")
    teal = colors.HexColor("#0D9488")
    dark_slate = colors.HexColor("#1E293B")
    soft_slate = colors.HexColor("#475569")
    bg_light = colors.HexColor("#F8FAFC")

    # Typography styles with full Vietnamese Unicode support
    cover_pre = ParagraphStyle(
        'CoverPre',
        parent=styles['Normal'],
        fontName='ArialVN-Bold',
        fontSize=10,
        leading=13,
        textColor=teal,
        alignment=1,
        spaceAfter=6
    )

    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='TimesVN-Bold',
        fontSize=32,
        leading=38,
        textColor=navy,
        alignment=1,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='ArialVN-Bold',
        fontSize=12,
        leading=16,
        textColor=gold,
        alignment=1,
        spaceAfter=6
    )

    tagline_style = ParagraphStyle(
        'CoverTagline',
        parent=styles['Normal'],
        fontName='TimesVN-Italic',
        fontSize=11,
        leading=16,
        textColor=teal,
        alignment=1,
        spaceAfter=20
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='TimesVN-Bold',
        fontSize=17,
        leading=21,
        textColor=navy,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='ArialVN-Bold',
        fontSize=11,
        leading=15,
        textColor=gold,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='ArialVN',
        fontSize=9.5,
        leading=14.5,
        textColor=dark_slate,
        spaceAfter=7
    )

    quote_style = ParagraphStyle(
        'BrandQuote',
        parent=styles['Normal'],
        fontName='TimesVN-Italic',
        fontSize=9.5,
        leading=15,
        textColor=navy,
        leftIndent=14,
        rightIndent=14,
        spaceBefore=5,
        spaceAfter=9
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='ArialVN',
        fontSize=9,
        leading=13.5,
        textColor=soft_slate,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='ArialVN-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white,
        alignment=0
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='ArialVN',
        fontSize=8.5,
        leading=12,
        textColor=dark_slate
    )

    story = []

    # ================= PAGE 1: COVER PAGE =================
    story.append(Spacer(1, 25))
    
    # Large Central Vertical Lockup Badge
    emblem_cover_path = 'public/branding/logos/phytocodex-lockup-vertical-color-white-bg.jpg'
    if os.path.exists(emblem_cover_path):
        story.append(Image(emblem_cover_path, width=250, height=280))
        story.append(Spacer(1, 15))

    story.append(Paragraph("BRAND IDENTITY & PR-MARKETING DOSSIER", cover_pre))
    story.append(Paragraph("PHYTOCODEX", title_style))
    story.append(Paragraph("DECODING THE MOLECULES OF HEALTH", subtitle_style))
    story.append(Paragraph("Where Eastern Botanicals Meet European Science", tagline_style))

    story.append(HRFlowable(width="60%", thickness=1.2, color=gold, spaceBefore=4, spaceAfter=18))

    meta_text = """
    <b>Sáng lập & Chủ tịch Học thuật:</b> TS. Hoàng Xuân Chiến (Dr. rer. nat. | Đại học Hamburg, CHLB Đức)<br/>
    <b>Cổng thông tin chính thức:</b> https://www.phyto-codex.org<br/>
    <b>Loại tài liệu:</b> Master Brand Guidelines & Strategic PR-Marketing Monograph<br/>
    <b>Phiên bản:</b> 1.0 (Phát hành 2026) · Toàn quyền bảo lưu bản quyền
    """
    story.append(Paragraph(meta_text, ParagraphStyle('CoverMeta', fontName='ArialVN', fontSize=9, leading=15, textColor=soft_slate, alignment=1)))
    story.append(PageBreak())

    # ================= PAGE 2: BRAND IDENTITY & PHILOSOPHY =================
    story.append(Paragraph("1. Tổng Quan Thương Hiệu & Triết Lý Cốt Lõi", h1_style))
    story.append(Paragraph("Phytocodex không chỉ là một ấn phẩm y sinh học, mà là chuẩn mực định danh cao cấp kết nối giữa kho tàng dược liệu cổ truyền phương Đông và phương pháp luận khoa học thực chứng phương Tây.", body_style))

    story.append(Paragraph("1.1. Giải Mã Danh Xưng: PHYTOCODEX", h2_style))
    story.append(Paragraph("• <b>Phyto (Thực vật học / Dược liệu học cổ xưa):</b> Đại diện cho kho tàng ngàn năm của các loài thảo dược Á Đông, các hoạt chất polyphenol, ginsenoside, flavonoid tự nhiên đã nuôi dưỡng sức khỏe của hàng triệu thế hệ nhân loại.<br/>• <b>Codex (Bộ điển / Quy điển khoa học kinh điển):</b> Tượng trưng cho tính chính xác tuyệt đối, sự nghiêm cẩn trong học thuật của nền y sinh học Châu Âu, nơi mọi giả thuyết đều được giải mã ở cấp độ thụ thể, enzyme và động học phân tử.", bullet_style))

    story.append(Paragraph("1.2. Khẩu Hiệu Định Vị (Brand Slogans & Taglines)", h2_style))
    quote_box = """
    <b>Phiên bản Tiếng Anh (Global Master Slogan):</b><br/>
    <i>\"Decoding the molecules of health — where Eastern botanicals meet European science.\"</i><br/><br/>
    <b>Phiên bản Tiếng Việt (Bản địa hóa chính thức):</b><br/>
    <i>\"Giải mã phân tử sức khỏe — nơi dược liệu Á Đông gặp khoa học Châu Âu.\"</i>
    """
    story.append(Paragraph(quote_box, quote_style))

    story.append(Paragraph("1.3. Ý Nghĩa Biểu Tượng Logo (The Emblem Archetype)", h2_style))
    emblem_desc = """
    Biểu tượng trung tâm của Phytocodex là sự dung hợp điêu khắc giữa ba yếu tố biểu trưng trường tồn:<br/>
    1. <b>Chiếc lá Bạch Quả (Ginkgo Biloba Leaf):</b> Biểu tượng tối cao của sự trường thọ, trí tuệ cổ xưa và khả năng thích nghi phi thường qua hàng trăm triệu năm của thảm thực vật Á Đông.<br/>
    2. <b>Vòng Benzen Hóa Học & Tinh Thể Phân Tử (Chemical Benzene Ring & Molecular Nodes):</b> Đại diện cho phòng thí nghiệm y sinh hiện đại tại CHLB Đức, sự bóc tách hoạt chất phân tử nhỏ (Metabolomics) và cơ chế dẫn truyền tín hiệu nội bào.<br/>
    3. <b>Mầm Chồi Dược Thảo (Botanical Sprout):</b> Tượng trưng cho sự tái sinh, khả năng phục hồi tế bào và y học phòng ngừa chủ động.
    """
    story.append(Paragraph(emblem_desc, body_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2. Tầm Nhìn, Sứ Mệnh & Giá Trị Cốt Lõi (PR-Marketing)", h1_style))
    story.append(Paragraph("• <b>TẦM NHÌN (VISION):</b> Trở thành nền tảng giải mã phân tử và bách khoa y sinh thực chứng độc lập uy tín hàng đầu cho các nhà nghiên cứu, bác sĩ, dược sĩ và người quan tâm đến sức khỏe trường thọ chuyên sâu trên toàn cầu.", bullet_style))
    story.append(Paragraph("• <b>SỨ MỆNH (MISSION):</b> Triệt tiêu các ảo giác quảng cáo (Anti-Hype), đem lại sự minh bạch tuyệt đối cho thực phẩm bảo vệ sức khỏe và dược liệu thông qua các bằng chứng khoa học chuẩn PubMed, DOI và hướng dẫn lâm sàng quốc tế.", bullet_style))
    story.append(Paragraph("• <b>GIÁ TRỊ CỐT LÕI (CORE VALUES):</b> Liêm chính khoa học (Scientific Integrity) · Độc lập học thuật (Academic Independence) · Thẩm mỹ tinh tế (Refined Aesthetics) · Thực tiễn ứng dụng (Clinical Translation).", bullet_style))

    story.append(PageBreak())

    # ================= PAGE 3: COLOR SYSTEM & TYPOGRAPHY =================
    story.append(Paragraph("3. Hệ Thống Màu Sắc Nhận Diện (Color Palette)", h1_style))
    story.append(Paragraph("Bảng màu của Phytocodex được phối hợp theo chuẩn 'Haute Science' — sang trọng, sâu lắng, khoa học và trường tồn.", body_style))

    # Color Table
    color_data = [
        [
            Paragraph("<b>Màu Sắc</b>", table_header_style),
            Paragraph("<b>Mã HEX / RGB</b>", table_header_style),
            Paragraph("<b>Vai Trò Nhận Diện</b>", table_header_style),
            Paragraph("<b>Ý Nghĩa Tâm Lý</b>", table_header_style)
        ],
        [
            Paragraph("<b>Midnight Navy</b>", table_cell_style),
            Paragraph("#0B1528<br/>rgb(11, 21, 40)", table_cell_style),
            Paragraph("Màu nền chủ đạo (Primary Dark / Text Main)", table_cell_style),
            Paragraph("Chiều sâu học thuật, sự uy nghiêm của phòng thí nghiệm.", table_cell_style)
        ],
        [
            Paragraph("<b>Emerald Botanical</b>", table_cell_style),
            Paragraph("#0D9488 / #10B981<br/>rgb(13, 148, 136)", table_cell_style),
            Paragraph("Màu thảo dược & sinh học (Botanical Secondary)", table_cell_style),
            Paragraph("Sức sống tự nhiên, thực vật trị liệu, thanh lọc.", table_cell_style)
        ],
        [
            Paragraph("<b>Imperial Antique Gold</b>", table_cell_style),
            Paragraph("#B48A2C / #D4AF37<br/>rgb(180, 138, 44)", table_cell_style),
            Paragraph("Màu điểm xuyết quý phái (Luxury Gold Accent)", table_cell_style),
            Paragraph("Quy chuẩn Codex cổ điển, chất lượng di sản hoàng gia.", table_cell_style)
        ],
        [
            Paragraph("<b>Pure Crisp White</b>", table_cell_style),
            Paragraph("#FFFFFF<br/>rgb(255, 255, 255)", table_cell_style),
            Paragraph("Màu nền tài liệu (Clean Background)", table_cell_style),
            Paragraph("Minh bạch lâm sàng, thanh khiết của dược dụng.", table_cell_style)
        ],
        [
            Paragraph("<b>Slate Gray</b>", table_cell_style),
            Paragraph("#64748B<br/>rgb(100, 116, 139)", table_cell_style),
            Paragraph("Màu văn bản phụ & đường kẻ (Secondary Wire)", table_cell_style),
            Paragraph("Chính xác, trung lập của số liệu phân tích.", table_cell_style)
        ]
    ]

    t_colors = Table(color_data, colWidths=[100, 105, 140, 140])
    t_colors.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), navy),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, bg_light])
    ]))
    story.append(t_colors)
    story.append(Spacer(1, 12))

    story.append(Paragraph("4. Quy Chuẩn Kiểu Chữ (Typography)", h1_style))
    story.append(Paragraph("• <b>Font Tiêu đề & Wordmark (Display & Brand):</b> Cinzel / Trajan Pro / Times New Roman.<br/><i>Đặc trưng:</i> Font chữ Serif cổ điển mang phong thái quy điển hoàng gia Châu Âu, khẳng định uy tín và bề dày học thuật.<br/>• <b>Font Nội dung & Giao diện (Body & Editorial):</b> Inter / Arial / Helvetica.<br/><i>Đặc trưng:</i> Font chữ Sans-serif hiện đại, độ dễ đọc hoàn hảo trên cả màn hình di động lẫn ấn phẩm in ấn A4 chuẩn y khoa.", body_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("5. Bộ Nhận Diện Logo Đa Biến Thể Đã Xuất Xưởng", h1_style))
    story.append(Paragraph("Trọn bộ logo đã được tối ưu hóa cho mọi môi trường truyền thông và in ấn:", body_style))

    logo_table_data = [
        [
            Paragraph("<b>Tên Tệp Tin (File Name)</b>", table_header_style),
            Paragraph("<b>Định Dạng & Nền</b>", table_header_style),
            Paragraph("<b>Mục Đích Sử Dụng PR-Marketing</b>", table_header_style)
        ],
        [
            Paragraph("phytocodex-lockup-horizontal-color-white-bg.jpg", table_cell_style),
            Paragraph("JPEG (Nền Trắng)", table_cell_style),
            Paragraph("Tiêu đề thư, báo cáo báo chí, hồ sơ đối tác, hợp đồng.", table_cell_style)
        ],
        [
            Paragraph("phytocodex-lockup-horizontal-color-transparent.png", table_cell_style),
            Paragraph("PNG (Trong Suốt)", table_cell_style),
            Paragraph("Header trang web, chèn vào slide thuyết trình, video.", table_cell_style)
        ],
        [
            Paragraph("phytocodex-lockup-horizontal-white-navy-bg.jpg", table_cell_style),
            Paragraph("JPEG (Nền Navy)", table_cell_style),
            Paragraph("Banner LinkedIn, bìa tạp chí, ấn phẩm đêm, kỷ yếu.", table_cell_style)
        ],
        [
            Paragraph("phytocodex-lockup-horizontal-black-transparent.png", table_cell_style),
            Paragraph("PNG (Đen Đơn Sắc Trong Suốt)", table_cell_style),
            Paragraph("In ấn đơn sắc trắng đen, fax, bao bì thuốc, tem nhãn.", table_cell_style)
        ],
        [
            Paragraph("phytocodex-lockup-vertical-color-white-bg.jpg", table_cell_style),
            Paragraph("JPEG (Khối Dọc)", table_cell_style),
            Paragraph("Trang bìa sách, poster hội thảo, backdrop sự kiện.", table_cell_style)
        ],
        [
            Paragraph("phytocodex-icon-color-transparent.png", table_cell_style),
            Paragraph("PNG (Icon Rời Không Chữ)", table_cell_style),
            Paragraph("Favicon, avatar mạng xã hội, huy hiệu dập nổi.", table_cell_style)
        ]
    ]

    t_logos = Table(logo_table_data, colWidths=[180, 125, 180])
    t_logos.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), navy),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, bg_light])
    ]))
    story.append(t_logos)

    story.append(PageBreak())

    # ================= PAGE 4: PR & MARKETING STRATEGY =================
    story.append(Paragraph("6. Chiến Lược Truyền Thông & Tiếp Thị (PR-Marketing)", h1_style))
    story.append(Paragraph("Bộ tài liệu phục vụ các chiến dịch hợp tác truyền thông, tài trợ và phát triển thương hiệu toàn cầu.", body_style))

    story.append(Paragraph("6.1. Chân Dung Khán Giả Mục Tiêu (Target Audience Archetypes)", h2_style))
    story.append(Paragraph("1. <b>Bác sĩ, Dược sĩ, Chuyên gia Dinh dưỡng:</b> Tìm kiếm các tổng quan cơ chế phân tử đã được đối soát PubMed để tư vấn bệnh nhân một cách an toàn và thực chứng.<br/>2. <b>Lãnh đạo Doanh nghiệp Dược & Thực phẩm Chức năng:</b> Khảo sát xu hướng R&D nguyên liệu mới (như Urolithin A, Sulforaphane, Butyrate) để định hình công thức sản phẩm.<br/>3. <b>Người tiêu dùng hiểu biết (Health Optimizers & Biohackers):</b> Những người quan tâm đến tuổi thọ sinh học, giấc ngủ, chuyển hóa nhưng chán nản với các chiêu trò tiếp thị 'thần dược' vô căn cứ.", bullet_style))

    story.append(Paragraph("6.2. Các Trụ Cột Nội Dung Độc Quyền (Content Pillars)", h2_style))
    story.append(Paragraph("• <b>Metabolic Longevity (Trường thọ Chuyển hóa):</b> Trục NAD+, ty thể, mỡ nâu UCP1, tự thực mitophagy, điều hòa đường huyết.<br/>• <b>Gut-Brain-Immune Triad (Trục Ruột - Não - Miễn dịch):</b> Hệ vi sinh, Butyrate, hàng rào ruột, hệ Glymphatic não bộ.<br/>• <b>Botanical Molecular Pharmacokinetics (Dược động học Dược liệu):</b> Sinh khả dụng, tương tác hoạt chất (ví dụ Curcumin - Piperine, Quercetin - Bromelain).<br/>• <b>TechBio & Clinical Biomarkers (Công nghệ Sinh học & Dấu ấn Lâm sàng):</b> Chuyển hóa học (Metabolomics), tỷ lệ Triglyceride/HDL, hs-CRP.", bullet_style))

    story.append(Paragraph("6.3. Quy Chuẩn Bảo Vệ Thương Hiệu (Brand Protection Guidelines)", h2_style))
    story.append(Paragraph("Để bảo toàn vị thế học thuật tối cao của TS. Hoàng Xuân Chiến và Phytocodex, các nguyên tắc sau đây là <b>bắt buộc tuyệt đối</b> trong mọi hoạt động PR và Marketing:<br/>• <b>Không quảng cáo thuốc chữa bách bệnh:</b> Mọi phát ngôn đều phải kèm trích dẫn DOI/PubMed chính thức.<br/>• <b>Khoảng cách an toàn (Safe Clearspace):</b> Khi đặt logo trên ấn phẩm, khoảng cách trống xung quanh tối thiểu bằng chiều cao của ký tự 'P' trong chữ PHYTO.<br/>• <b>Không bóp méo tỷ lệ:</b> Tuyệt đối không kéo giãn, xoay nghiêng hoặc thay đổi thứ tự màu sắc của biểu tượng.<br/>• <b>Tuyên bố miễn trừ trách nhiệm y khoa:</b> Luôn ghi rõ bản quyền thuộc về Phytocodex và nội dung dành cho mục đích giáo dục khoa học, không thay thế chẩn đoán y tế cá nhân.", body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("7. Thông Tin Liên Hệ & Đại Diện Học Thuật", h1_style))
    contact_box = """
    <b>Hội đồng Biên tập & Truyền thông Quốc tế Phytocodex:</b><br/>
    • <b>Chủ tịch Hội đồng & Tổng Biên tập:</b> TS. Hoàng Xuân Chiến (Dr. rer. nat. | Đại học Hamburg, CHLB Đức)<br/>
    • <b>Cổng thông tin trực tuyến:</b> https://www.phyto-codex.org<br/>
    • <b>LinkedIn Chuyên gia:</b> linkedin.com/in/dr-chien-xuan-hoang<br/>
    • <b>Email Ban Thư ký / PR:</b> editorial@phyto-codex.org · contact@phyto-codex.org
    """
    story.append(Paragraph(contact_box, quote_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Master Brand Guidelines PDF generated at: {filename}")

if __name__ == "__main__":
    build_brand_guidelines_pdf()
