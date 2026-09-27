# NOZOMI / ENMUSUBI website handoff

## Gói bàn giao

- Toàn bộ source và assets: `NOZOMI-ENMUSUBI-source-handoff.zip`
- File hướng dẫn này: `HANDOFF-NOZOMI.md`
- Thư mục source chính: `dist/`

## Preview

- [NOZOMI](http://127.0.0.1:4173/#nozomi)
- [ENMUSUBI](http://127.0.0.1:4173/?layout=medical4#enmusubi)
- [Cộng đồng](http://127.0.0.1:4173/?layout=medical4#cong-dong)

## Run

Serve the `dist` folder with any static server. Example:

```bash
python -m http.server 4173 --directory dist
```

Then open `http://127.0.0.1:4173/#nozomi`.

## Main files

- `dist/index.html`: current page markup.
- `dist/style.css`: main responsive layout and mobile rules.
- `dist/locale-ja.js`: Japanese toggle, translated copy, dynamic sections and disclosures.
- `dist/script.js`: base interactions.
- `dist/chapters.js`: chapter navigation.
- `dist/motion.css` and `dist/motion.js`: scroll and motion effects.
- `dist/assets/`: logos, founder images, NOZOMI logistics images, ENMUSUBI medical/lab images and fonts.

`dist/classic.html` is the matching classic entry page. `dist/dark.html` is the alternate dark page.

## Current behavior

- Vietnamese is the default language; the `日本語` toggle translates the page.
- NOZOMI is the primary company section; ENMUSUBI is the secondary company section.
- On mobile, dense card groups use horizontal rows that can be swiped. The care journey is the only ENMUSUBI content kept behind a disclosure.
- Medical partner logos use contained image sizing so they do not crop or stretch.
- Community video cards link to YouTube, including Trạm Hành trang: `https://www.youtube.com/watch?v=244Ceer9o6g`.

## Verification

The latest source was checked with:

```bash
node --check dist/locale-ja.js
git diff --check
```

All modified source is inside this project folder. Keep the `dist/assets` folder together with the HTML/CSS/JS files when copying to another project.

## Tóm tắt toàn bộ trao đổi và yêu cầu đã xử lý

### Định hướng tổng thể

- Website là founder profile của Nguyễn Thị Tường Hải, gồm hai thương hiệu NOZOMI và ENMUSUBI.
- NOZOMI là phần chính, tập trung vào đào tạo và kết nối nguồn nhân lực cho doanh nghiệp Nhật Bản, trong đó logistics là một hướng nổi bật.
- ENMUSUBI là phần phụ, tập trung vào kết nối doanh nghiệp, chăm sóc sức khỏe và hành trình hỗ trợ Việt – Nhật.
- Nội dung cần tự nhiên, chuyên nghiệp, giống thông tin doanh nghiệp thực tế; tránh các câu máy móc như “học thật, dạy thật”.
- Tiêu đề cần tạo ấn tượng, phần tiểu sử phải gọn, dễ đọc và không tạo cảm giác website bán xe.

### Logo, thương hiệu và hình ảnh đã dùng

- Đã thay logo DG Nozomi bằng logo NOZOMI mới và slogan do người dùng cung cấp.
- Đã thêm logo NOZOMI/ENMUSUBI ở phần chuyển đổi công ty và tăng kích thước logo.
- Đã sửa lỗi logo Toyota bị crop trên mobile bằng cách giữ đúng tỉ lệ ảnh và giới hạn khung chứa.
- Đã thêm ảnh văn phòng, đội ngũ và hoạt động Nozomi từ các file PEP_9548.JPG, PEP_8977.JPG, PEP_9537.JPG và PEP_9497.JPG.
- Đã thêm hình logistics: xe tải trên cầu, đường cao tốc và hình đào tạo vận hành.
- Đã thêm hình kết nối nhân lực đa ngành: chăm sóc, lưu trú, thực phẩm, sản xuất, nông nghiệp và điều phối.
- Đã thêm hình lab ENMUSUBI: kính hiển vi, nghiên cứu trong phòng lab và ống nghiệm.

### Nội dung founder profile

- Phần giới thiệu founder được xây dựng theo tài liệu “Ms.Hải - Founder Profile.pdf” và nội dung người dùng cung cấp.
- Nội dung kinh nghiệm quốc tế gồm thương mại, xúc tiến đầu tư, công nghiệp, logistics, may mặc và vật liệu.
- Đã bỏ đoạn “Đây là cơ sở để tôi đặt định hướng…” khỏi phần tiểu sử dài và chuyển ý chính sang phần sứ mệnh/NOZOMI phù hợp hơn.
- Phần kinh nghiệm được thiết kế thành khối gọn, có logo đối tác và các lĩnh vực liên quan.

### NOZOMI

- Có phần đào tạo tiếng Nhật, văn hóa và tác phong làm việc Nhật Bản.
- Có lộ trình đào tạo 5 bước và phần giá trị đào tạo.
- Có khối logistics với nội dung diễn đạt tự nhiên, không lặp lại quá trực tiếp việc “lái xe tải”.
- Có dịch vụ nhân sự linh hoạt/cho thuê lại lao động, diễn đạt theo hướng chuyên nghiệp: NOZOMI đồng hành về hồ sơ, đào tạo, sắp xếp vị trí, lương và hỗ trợ trong thời gian làm việc tại doanh nghiệp đối tác.
- Có phần kết nối nhân lực đa ngành nghề cho doanh nghiệp Nhật Bản.

### ENMUSUBI

- Có phần giới thiệu kết nối chuyên môn và chăm sóc sức khỏe Việt – Nhật.
- Có 3 nhóm dịch vụ: tư vấn đầu tư, chăm sóc sức khỏe và đồng hành Việt – Nhật.
- Có danh sách các đơn vị: Bệnh viện Ouji, CellPro Japan và AS Medical Support.
- Có phần hành trình “Một hành trình / Sự chăm sóc liền mạch”; đây là phần được thu gọn riêng trên mobile.
- Các nhóm thẻ y tế, đối tác, chương trình phổ thông/chuyên sâu và nội dung cộng đồng được bố trí theo hàng ngang hoặc hàng ngang có thể vuốt trên mobile để tránh chiều dài quá lớn.
- Có khu vực hình ảnh lab và nội dung Medicacell Type-I theo tài liệu ENMUSUBI.

### Cộng đồng và video

- Đã giữ phần “Mang Y tế về gần nhà”.
- Đã cập nhật link Trạm Hành trang:
  `https://www.youtube.com/watch?v=244Ceer9o6g`
- Video “Mang Y tế về gần nhà” đang dùng link YouTube trong source hiện tại.

### Responsive, animation và ngôn ngữ

- Đã tối ưu typography tiếng Việt với font Vietnam Regular/Semibold và font Lora italic cho điểm nhấn.
- Đã kiểm tra dấu tiếng Việt và chuyển đổi tiếng Nhật.
- Vietnamese là mặc định; nút `日本語` chuyển nội dung sang tiếng Nhật.
- Animation ảnh dùng transition nhẹ, ưu tiên mượt và giảm cảm giác giật trên mobile.
- Layout mobile đã được trả về dạng dọc ở các phần chính; các nhóm card được rút gọn hoặc cho phép vuốt ngang khi cần.
- Đã xử lý lỗi nội dung tiếng Việt còn sót khi chuyển sang bản tiếng Nhật ở các vùng đã được khai báo trong `locale-ja.js`.

### Tài liệu và tài sản người dùng đã gửi

- `template NOZOMI ngang.docx`
- `Ms.Hải - Founder Profile.pdf`
- `LOGO & SLOGIAN NOZOMI-02.png`
- `LOGO & SLOGIAN NOZOMI-03.png`
- `PEP_9548.JPG`, `PEP_8977.JPG`, `PEP_9537.JPG`, `PEP_9497.JPG`
- Các ảnh tham chiếu bố cục founder, kinh nghiệm, đối tác, ENMUSUBI và cộng đồng được gửi dưới dạng ảnh chụp màn hình trong cuộc trò chuyện.

### Trạng thái bàn giao

- Source hiện tại nằm trong `dist/` và đã được đóng gói vào `NOZOMI-ENMUSUBI-source-handoff.zip`.
- Preview local đang dùng cổng `4173`.
- Chưa thực hiện push GitHub trong trạng thái bàn giao này.
- Khi chuyển sang project khác, cần copy nguyên thư mục `dist/`, đặc biệt là `dist/assets/`; không chỉ copy HTML vì CSS/JS và hình ảnh phụ thuộc vào thư mục assets.
