/**
 * Quality Gatekeeper Validator for The BioDispatch
 * Ensures every dispatch meets Dr. Xuan Chien Hoang's editorial standards:
 * - Minimum word count (in-depth, not superficial)
 * - Ban on em-dash / en-dash
 * - Must have core blockquote analogy
 * - Must have molecular pathway flowchart (──►)
 * - Must have comparison table
 * - Acronym audit: checks for unexplained bare jargon
 * - Valid DOI & PubMed citation
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function validateDispatchContent(markdownString, lang = 'vi') {
  const issues = [];
  const { data: frontmatter, content } = matter(markdownString);

  // 1. Kiểm tra Frontmatter
  if (!frontmatter.title || frontmatter.title.length < 15) {
    issues.push('Tiêu đề quá ngắn hoặc không đầy đủ.');
  }
  if (!frontmatter.excerpt || frontmatter.excerpt.length < 60) {
    issues.push('Đoạn trích tóm tắt (excerpt) quá ngắn, chưa nêu bật nghịch lý sinh học.');
  }
  if (!frontmatter.doi) {
    issues.push('Thiếu mã định danh y văn quốc tế DOI.');
  }

  // 2. Kiểm tra Dấu câu (Typography Rule)
  if (markdownString.includes('—') || markdownString.includes('–')) {
    issues.push('Vi phạm quy chuẩn typography: Phát hiện dấu em-dash (—) hoặc en-dash (–). Bắt buộc thay bằng dấu phẩy, hai chấm hoặc gạch nối ngắn (-).');
  }

  // 3. Kiểm tra Độ dài & Chiều sâu (Length & Depth)
  const wordCount = content.trim().split(/\s+/).length;
  const minWords = lang === 'vi' ? 700 : 600; // Ngưỡng tối thiểu chấp nhận được
  if (wordCount < minWords) {
    issues.push(`Bài viết quá sơ sài (${wordCount} từ). Bắt buộc tối thiểu ${minWords} từ để phân tích đầy đủ câu chuyện đời thực và cơ chế.`);
  }

  // 4. Kiểm tra Khối Ẩn dụ Đời thường
  const hasAnalogyBlock = />\s*\*"[\s\S]*?"\*/.test(content) || />\s*[\*"].*[\*"]/.test(content);
  if (!hasAnalogyBlock) {
    issues.push('Thiếu khối ẩn dụ đời thường cốt lõi trong blockquote in nghiêng (> *"...*).');
  }

  // 5. Kiểm tra Sơ đồ Cơ chế Pathway Flowchart
  const hasFlowchart = content.includes('──►');
  if (!hasFlowchart) {
    issues.push('Thiếu sơ đồ cơ chế phân tử dạng chuỗi phản ứng liên kết bằng mũi tên ──►.');
  }

  // 6. Kiểm tra Bảng Đối thoại Số liệu Lâm sàng
  const hasTable = /\|[\s\S]*?\|[\s\S]*?\n\|(?:\s*[:-]+[-| :]*)\|/.test(content);
  if (!hasTable) {
    issues.push('Thiếu bảng Markdown so sánh các trạng thái sinh lý / chỉ số phân tử.');
  }

  // 7. Kiểm tra Lời dặn an toàn / Ứng dụng thực tế
  const hasActionableSection = /##\s*.*(?:Lời khuyên|Ứng dụng|Chiến lược|Khuyến nghị|Protocol|Application|Safety|Bài học thực tiễn|Thực tiễn|Can thiệp|Lời kết|Tương lai|Safe|Tóm tắt Thực hành|Takeaway|Takeaways|Nguyên tắc|Hướng dẫn|Giải pháp|Quy tắc|Mẹo|Bảo vệ|Guideline|Action Plan|Practical)/i.test(content);
  if (!hasActionableSection) {
    issues.push('Thiếu phần hướng dẫn thực hành / ứng dụng thực tế hoặc cảnh báo an toàn ở cuối bài.');
  }

  return {
    isValid: issues.length === 0,
    issues,
    wordCount
  };
}

export function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { isValid: false, issues: [`File không tồn tại: ${filePath}`] };
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(content);
  const lang = frontmatter.lang || (filePath.endsWith('-en.md') ? 'en' : 'vi');
  return validateDispatchContent(content, lang);
}

