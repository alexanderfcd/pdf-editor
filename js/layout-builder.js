import { CreateBase } from "./core.js";
import { LayoutDialog, ModuleDialog, PageTemplateDialog } from "./dialog.js";
import { renderModule } from "./module/module.js";
import { createModule } from "./modules.js";
import { getModuleConfig, saveModuleStyle } from "./module/module-config.js";

const SECTION_LAYOUTS = [
  // ── Hero ─────────────────────────────────────────────
  {
    id: "hero-split",
    category: "Hero",
    title: "Hero split",
    description: "Large title and body left, image right.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h2>Design that tells your story</h2>", inlineEditable: true },
        css: "width:46%;left:6%;top:36px;",
      },
      {
        config: { name: "text", template: "default", content: "<p>Use this section for a concise explanation with a clear visual anchor on the right.</p>", inlineEditable: true },
        css: "width:46%;left:6%;top:140px;",
      },
      {
        config: { name: "image", template: "default", file: "https://placehold.co/640x420/ECEFF3/111827", radius: 14 },
        css: "width:40%;height:240px;left:54%;top:36px;",
      },
    ],
  },
  {
    id: "hero-centered",
    category: "Hero",
    title: "Hero centered",
    description: "Centered headline and subtext with an image below.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h1 style='text-align:center'>Your big headline</h1>", inlineEditable: true },
        css: "width:72%;left:14%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='text-align:center'>Supporting copy that gives context to your headline and invites the reader to keep going.</p>", inlineEditable: true },
        css: "width:60%;left:20%;top:110px;",
      },
      {
        config: { name: "image", template: "default", file: "https://placehold.co/900x380/E5E7EB/374151", radius: 10 },
        css: "width:80%;height:200px;left:10%;top:200px;",
      },
    ],
  },
  {
    id: "hero-image-bg",
    category: "Hero",
    title: "Image background",
    description: "Full-width image with overlaid text.",
    components: [
      {
        config: { name: "image", template: "default", file: "https://placehold.co/900x360/374151/9CA3AF", radius: 0 },
        css: "width:88%;height:280px;left:6%;top:20px;",
      },
      {
        config: { name: "text", template: "default", content: "<h2 style='color:#fff'>Bold statement here</h2>", inlineEditable: true },
        css: "width:56%;left:12%;top:80px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='color:#e5e7eb'>Supporting detail that sits on top of the image.</p>", inlineEditable: true },
        css: "width:50%;left:12%;top:180px;",
      },
    ],
  },

  // ── Text ─────────────────────────────────────────────
  {
    id: "text-two-col",
    category: "Text",
    title: "Two columns",
    description: "Two equal text columns side by side.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h3>Column one</h3><p>Write the first column's content here. Keep it balanced with the column on the right.</p>", inlineEditable: true },
        css: "width:44%;left:4%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h3>Column two</h3><p>Write the second column's content here. These two blocks sit side by side.</p>", inlineEditable: true },
        css: "width:44%;left:52%;top:30px;",
      },
    ],
  },
  {
    id: "text-three-col",
    category: "Text",
    title: "Three columns",
    description: "Three equal text blocks for features or highlights.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h4>Feature one</h4><p>Short description of this feature or benefit.</p>", inlineEditable: true },
        css: "width:28%;left:4%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h4>Feature two</h4><p>Short description of this feature or benefit.</p>", inlineEditable: true },
        css: "width:28%;left:36%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h4>Feature three</h4><p>Short description of this feature or benefit.</p>", inlineEditable: true },
        css: "width:28%;left:68%;top:30px;",
      },
    ],
  },
  {
    id: "pull-quote",
    category: "Text",
    title: "Pull quote",
    description: "Large decorative quote with attribution.",
    components: [
      {
        config: { name: "shape", template: "default", fill: "#F9FAFB", stroke: "#E5E7EB", strokeWidth: 1, opacity: 1 },
        css: "width:88%;height:220px;left:6%;top:20px;",
      },
      {
        config: { name: "text", template: "default", content: "<h2 style='text-align:center;font-style:italic'>&ldquo;A great quote that captures attention and builds trust.&rdquo;</h2>", inlineEditable: true },
        css: "width:74%;left:13%;top:50px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='text-align:center;color:#6B7280'>— Name, Title</p>", inlineEditable: true },
        css: "width:50%;left:25%;top:170px;",
      },
    ],
  },
  {
    id: "numbered-steps",
    category: "Text",
    title: "Numbered steps",
    description: "Three numbered steps or process stages.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h2 style='text-align:center'>How it works</h2>", inlineEditable: true },
        css: "width:72%;left:14%;top:20px;",
      },
      {
        config: { name: "text", template: "default", content: "<p><strong>1.</strong> First step — explain what happens at the start of the process.</p>", inlineEditable: true },
        css: "width:26%;left:4%;top:100px;",
      },
      {
        config: { name: "text", template: "default", content: "<p><strong>2.</strong> Second step — describe the middle part of the process clearly.</p>", inlineEditable: true },
        css: "width:26%;left:37%;top:100px;",
      },
      {
        config: { name: "text", template: "default", content: "<p><strong>3.</strong> Third step — show the outcome or final action to take.</p>", inlineEditable: true },
        css: "width:26%;left:70%;top:100px;",
      },
    ],
  },

  // ── Media ─────────────────────────────────────────────
  {
    id: "media-left",
    category: "Media",
    title: "Image left, text right",
    description: "Left image with heading and body copy.",
    components: [
      {
        config: { name: "image", template: "default", file: "https://placehold.co/560x640/F3F4F6/374151", radius: 10 },
        css: "width:34%;height:280px;left:6%;top:30px;",
      },
      {
        config: { name: "shape", template: "default", fill: "#E9EEF7", stroke: "#CBD5E1", strokeWidth: 1, opacity: 0.9 },
        css: "width:52%;height:280px;left:42%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h3>Section headline</h3>", inlineEditable: true },
        css: "width:46%;left:45%;top:70px;",
      },
      {
        config: { name: "text", template: "default", content: "<p>Drop in details, bullet points, or value highlights to support the visual.</p>", inlineEditable: true },
        css: "width:46%;left:45%;top:150px;",
      },
    ],
  },
  {
    id: "media-right",
    category: "Media",
    title: "Text left, image right",
    description: "Text block on the left, tall image on the right.",
    components: [
      {
        config: { name: "shape", template: "default", fill: "#F0FDF4", stroke: "#BBF7D0", strokeWidth: 1, opacity: 1 },
        css: "width:50%;height:280px;left:4%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h3>Headline goes here</h3>", inlineEditable: true },
        css: "width:44%;left:7%;top:70px;",
      },
      {
        config: { name: "text", template: "default", content: "<p>Supporting copy to complement the image. Keep it concise and focused.</p>", inlineEditable: true },
        css: "width:44%;left:7%;top:150px;",
      },
      {
        config: { name: "image", template: "default", file: "https://placehold.co/560x640/F3F4F6/374151", radius: 10 },
        css: "width:34%;height:280px;left:60%;top:30px;",
      },
    ],
  },
  {
    id: "centered-cta",
    category: "Media",
    title: "Centered callout",
    description: "Shape background with centered text and image.",
    components: [
      {
        config: { name: "shape", template: "default", fill: "#F3F4F6", stroke: "#D1D5DB", strokeWidth: 1, opacity: 1 },
        css: "width:88%;height:300px;left:6%;top:24px;",
      },
      {
        config: { name: "text", template: "default", content: "<h2 style='text-align:center'>Your headline here</h2>", inlineEditable: true },
        css: "width:72%;left:14%;top:60px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='text-align:center'>Add supporting copy and a strong call to action in this area.</p>", inlineEditable: true },
        css: "width:64%;left:18%;top:140px;",
      },
      {
        config: { name: "image", template: "default", file: "https://placehold.co/360x200/E5E7EB/111827", radius: 12 },
        css: "width:32%;height:150px;left:34%;top:220px;",
      },
    ],
  },
  {
    id: "image-pair",
    category: "Media",
    title: "Image pair",
    description: "Two images side by side with captions.",
    components: [
      {
        config: { name: "image", template: "default", file: "https://placehold.co/500x380/E5E7EB/374151", radius: 8 },
        css: "width:44%;height:200px;left:4%;top:20px;",
      },
      {
        config: { name: "image", template: "default", file: "https://placehold.co/500x380/D1D5DB/374151", radius: 8 },
        css: "width:44%;height:200px;left:52%;top:20px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='text-align:center;font-size:13px;color:#6B7280'>Caption for image one</p>", inlineEditable: true },
        css: "width:44%;left:4%;top:228px;",
      },
      {
        config: { name: "text", template: "default", content: "<p style='text-align:center;font-size:13px;color:#6B7280'>Caption for image two</p>", inlineEditable: true },
        css: "width:44%;left:52%;top:228px;",
      },
    ],
  },
  {
    id: "gallery-row",
    category: "Media",
    title: "Photo gallery",
    description: "Full-width gallery with multiple images.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h3>Gallery</h3>", inlineEditable: true },
        css: "width:72%;left:14%;top:10px;",
      },
      {
        config: { name: "gallery", template: "default", columns: 3, gap: 8, files: ["https://placehold.co/400x300/E5E7EB/374151", "https://placehold.co/400x300/D1D5DB/374151", "https://placehold.co/400x300/CBD5E1/374151", "https://placehold.co/400x300/BFCBD9/374151", "https://placehold.co/400x300/B0BDC8/374151", "https://placehold.co/400x300/A3B1BA/374151"] },
        css: "width:88%;height:260px;left:6%;top:60px;",
      },
    ],
  },

  // ── Data ─────────────────────────────────────────────
  {
    id: "chart-with-text",
    category: "Data & Charts",
    title: "Chart + description",
    description: "Bar chart on the left with explanatory text on the right.",
    components: [
      {
        config: {
          name: "chart", template: "default", chartType: "bar",
          data: [
            { label: "Q1", value: 42, color: "#4e79a7" },
            { label: "Q2", value: 65, color: "#f28e2b" },
            { label: "Q3", value: 53, color: "#e15759" },
            { label: "Q4", value: 78, color: "#76b7b2" },
          ],
        },
        css: "width:46%;height:220px;left:4%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h3>Performance overview</h3><p>Use this space to explain what the chart shows, highlight key trends, or call out the most important data points.</p>", inlineEditable: true },
        css: "width:44%;left:52%;top:50px;",
      },
    ],
  },
  {
    id: "chart-pie-text",
    category: "Data & Charts",
    title: "Pie chart + description",
    description: "Pie chart with a text breakdown on the right.",
    components: [
      {
        config: {
          name: "chart", template: "default", chartType: "pie",
          data: [
            { label: "Category A", value: 35, color: "#4e79a7" },
            { label: "Category B", value: 28, color: "#f28e2b" },
            { label: "Category C", value: 22, color: "#e15759" },
            { label: "Category D", value: 15, color: "#76b7b2" },
          ],
        },
        css: "width:46%;height:220px;left:4%;top:30px;",
      },
      {
        config: { name: "text", template: "default", content: "<h3>Distribution breakdown</h3><p>Summarise the share of each category and what it means for your audience.</p>", inlineEditable: true },
        css: "width:44%;left:52%;top:50px;",
      },
    ],
  },
  {
    id: "chart-full",
    category: "Data & Charts",
    title: "Full-width chart",
    description: "Large chart spanning the full section width.",
    components: [
      {
        config: { name: "text", template: "default", content: "<h3>Monthly trend</h3>", inlineEditable: true },
        css: "width:72%;left:14%;top:10px;",
      },
      {
        config: {
          name: "chart", template: "default", chartType: "line",
          data: [
            { label: "Jan", value: 30, color: "#4e79a7" },
            { label: "Feb", value: 48, color: "#4e79a7" },
            { label: "Mar", value: 42, color: "#4e79a7" },
            { label: "Apr", value: 61, color: "#4e79a7" },
            { label: "May", value: 55, color: "#4e79a7" },
            { label: "Jun", value: 74, color: "#4e79a7" },
          ],
        },
        css: "width:88%;height:220px;left:6%;top:55px;",
      },
    ],
  },
  {
    id: "two-charts",
    category: "Data & Charts",
    title: "Two charts",
    description: "Bar and pie charts side by side for comparison.",
    components: [
      {
        config: {
          name: "chart", template: "default", chartType: "bar",
          data: [
            { label: "A", value: 55, color: "#4e79a7" },
            { label: "B", value: 38, color: "#f28e2b" },
            { label: "C", value: 72, color: "#e15759" },
            { label: "D", value: 44, color: "#76b7b2" },
          ],
        },
        css: "width:44%;height:210px;left:4%;top:30px;",
      },
      {
        config: {
          name: "chart", template: "default", chartType: "pie",
          data: [
            { label: "A", value: 55, color: "#4e79a7" },
            { label: "B", value: 38, color: "#f28e2b" },
            { label: "C", value: 72, color: "#e15759" },
            { label: "D", value: 44, color: "#76b7b2" },
          ],
        },
        css: "width:44%;height:210px;left:52%;top:30px;",
      },
    ],
  },
];

// ── Page templates ──────────────────────────────────────────────────────────
const PAGE_TEMPLATES = [
  // ── Basic ─────────────────────────────────────────────
  {
    id: "page-blank",
    category: "Basic",
    title: "Blank page",
    description: "An empty page to start from scratch.",
    components: [],
  },

  // ── Cover ─────────────────────────────────────────────
  {
    id: "cover-classic",
    category: "Cover",
    title: "Classic cover",
    description: "Dark header band with title, subtitle and document metadata.",
    components: [
      { config: { name: "image", template: "default", file: "https://placehold.co/800x460/1e3a5f/1e3a5f" }, css: "width:100%;height:460px;left:0;top:0;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/180x60/ffffff22/ffffff" }, css: "width:18%;height:52px;left:6%;top:28px;" },
      { config: { name: "text", template: "default", content: "<h1 style='color:#fff;font-size:34px;line-height:1.25;margin:0'>Your Document<br>Title Goes Here</h1>", inlineEditable: true }, css: "width:76%;left:12%;top:160px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#93c5fd;margin:0'>Subtitle or brief description of this document's purpose</p>", inlineEditable: true }, css: "width:64%;left:12%;top:330px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x2/e2e8f0/e2e8f0" }, css: "width:76%;height:2px;left:12%;top:610px;" },
      { config: { name: "text", template: "default", content: "<p style='font-weight:700;margin:0'>Company Name</p>", inlineEditable: true }, css: "width:44%;left:12%;top:630px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#6b7280;font-size:13px;margin:0'>Month YYYY &bull; Prepared by Author</p>", inlineEditable: true }, css: "width:66%;left:12%;top:688px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x50/1e3a5f/1e3a5f" }, css: "width:100%;height:50px;left:0;top:1072px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#ffffff80;font-size:11px;margin:0;text-align:right'>Confidential</p>", inlineEditable: true }, css: "width:20%;left:74%;top:1083px;" },
    ],
  },
  {
    id: "cover-centered",
    category: "Cover",
    title: "Centered cover",
    description: "Minimal centered layout with accent bar and decorative circle.",
    components: [
      { config: { name: "image", template: "default", file: "https://placehold.co/800x8/4f46e5/4f46e5" }, css: "width:100%;height:8px;left:0;top:0;" },
      { config: { name: "shape", template: "circle", fill: "#ede9fe", stroke: "#ede9fe", strokeWidth: 0, opacity: 1 }, css: "width:38%;height:260px;left:31%;top:100px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/160x50/6d28d9/ffffff" }, css: "width:14%;height:44px;left:43%;top:178px;" },
      { config: { name: "text", template: "default", content: "<h1 style='text-align:center;font-size:38px;line-height:1.2;margin:0'>Document Title</h1>", inlineEditable: true }, css: "width:74%;left:13%;top:420px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:center;color:#6b7280;margin:0'>Subtitle &bull; Version 1.0</p>", inlineEditable: true }, css: "width:62%;left:19%;top:560px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/120x4/4f46e5/4f46e5" }, css: "width:12%;height:4px;left:44%;top:640px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:center;font-size:13px;color:#6b7280;margin:0'>Author Name &bull; Date</p>", inlineEditable: true }, css: "width:62%;left:19%;top:820px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x8/4f46e5/4f46e5" }, css: "width:100%;height:8px;left:0;top:1114px;" },
    ],
  },

  // ── Invoice ───────────────────────────────────────────
  {
    id: "invoice-standard",
    category: "Invoice",
    title: "Invoice",
    description: "Standard invoice with line items, subtotal, tax and total.",
    components: [
      // Header
      { config: { name: "image", template: "default", file: "https://placehold.co/800x90/f8fafc/f8fafc" }, css: "width:100%;height:90px;left:0;top:0;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/180x52/e2e8f0/94a3b8" }, css: "width:18%;height:50px;left:6%;top:20px;" },
      { config: { name: "text", template: "default", content: "<h2 style='text-align:right;font-size:26px;letter-spacing:0.06em;color:#1e293b;margin:0'>INVOICE</h2><p style='text-align:right;color:#64748b;font-size:12px;margin:4px 0 0'>#INV-0001</p>", inlineEditable: true }, css: "width:32%;left:62%;top:22px;" },
      // Divider
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:100px;" },
      // FROM
      { config: { name: "text", template: "default", content: "<p style='font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 6px'>FROM</p><p style='font-weight:700;margin:0 0 2px'>Your Company, Inc.</p><p style='color:#64748b;font-size:13px;margin:0'>123 Business Street, City<br>contact@yourcompany.com</p>", inlineEditable: true }, css: "width:36%;left:6%;top:116px;" },
      // BILL TO
      { config: { name: "text", template: "default", content: "<p style='font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 6px'>BILL TO</p><p style='font-weight:700;margin:0 0 2px'>Client Name</p><p style='color:#64748b;font-size:13px;margin:0'>456 Client Avenue, City<br>client@email.com</p>", inlineEditable: true }, css: "width:36%;left:54%;top:116px;" },
      // Dates
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#64748b;margin:0 0 3px'><strong style='color:#1e293b'>Invoice date:</strong> January 1, 2025</p><p style='font-size:13px;color:#64748b;margin:0'><strong style='color:#1e293b'>Due date:</strong> January 31, 2025</p>", inlineEditable: true }, css: "width:36%;left:54%;top:226px;" },
      // Table header
      { config: { name: "image", template: "default", file: "https://placehold.co/800x34/1e293b/1e293b" }, css: "width:88%;height:34px;left:6%;top:306px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#fff;font-size:11px;font-weight:700;margin:0'>DESCRIPTION</p>", inlineEditable: true }, css: "width:40%;left:7%;top:315px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#fff;font-size:11px;font-weight:700;text-align:center;margin:0'>QTY</p>", inlineEditable: true }, css: "width:10%;left:50%;top:315px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#fff;font-size:11px;font-weight:700;text-align:right;margin:0'>UNIT PRICE</p>", inlineEditable: true }, css: "width:14%;left:62%;top:315px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#fff;font-size:11px;font-weight:700;text-align:right;margin:0'>AMOUNT</p>", inlineEditable: true }, css: "width:13%;left:79%;top:315px;" },
      // Row 1
      { config: { name: "text", template: "default", content: "<p style='margin:0'>Website Design &amp; Development</p>", inlineEditable: true }, css: "width:40%;left:7%;top:356px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:center;margin:0'>1</p>", inlineEditable: true }, css: "width:10%;left:50%;top:356px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$2,400.00</p>", inlineEditable: true }, css: "width:14%;left:62%;top:356px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$2,400.00</p>", inlineEditable: true }, css: "width:13%;left:79%;top:356px;" },
      // Row 2
      { config: { name: "text", template: "default", content: "<p style='margin:0'>SEO Optimization</p>", inlineEditable: true }, css: "width:40%;left:7%;top:396px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:center;margin:0'>3</p>", inlineEditable: true }, css: "width:10%;left:50%;top:396px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$300.00</p>", inlineEditable: true }, css: "width:14%;left:62%;top:396px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$900.00</p>", inlineEditable: true }, css: "width:13%;left:79%;top:396px;" },
      // Row 3
      { config: { name: "text", template: "default", content: "<p style='margin:0'>Monthly Maintenance</p>", inlineEditable: true }, css: "width:40%;left:7%;top:436px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:center;margin:0'>6</p>", inlineEditable: true }, css: "width:10%;left:50%;top:436px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$150.00</p>", inlineEditable: true }, css: "width:14%;left:62%;top:436px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;margin:0'>$900.00</p>", inlineEditable: true }, css: "width:13%;left:79%;top:436px;" },
      // Row dividers
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:380px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:420px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:460px;" },
      // Totals
      { config: { name: "text", template: "default", content: "<p style='text-align:right;color:#64748b;margin:0 0 6px'>Subtotal: <strong style='color:#1e293b'>$4,200.00</strong></p><p style='text-align:right;color:#64748b;margin:0 0 6px'>Tax (10%): <strong style='color:#1e293b'>$420.00</strong></p>", inlineEditable: true }, css: "width:32%;left:60%;top:478px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x2/1e293b/1e293b" }, css: "width:32%;height:2px;left:60%;top:528px;" },
      { config: { name: "text", template: "default", content: "<p style='text-align:right;font-weight:700;font-size:16px;margin:0'>Total: $4,620.00</p>", inlineEditable: true }, css: "width:32%;left:60%;top:540px;" },
      // Notes
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px'>Payment Terms</p><p style='font-size:13px;color:#64748b;margin:0'>Payment due within 30 days. Please include the invoice number on your payment. Thank you for your business.</p>", inlineEditable: true }, css: "width:42%;left:6%;top:490px;" },
      // Footer
      { config: { name: "image", template: "default", file: "https://placehold.co/800x2/e2e8f0/e2e8f0" }, css: "width:88%;height:2px;left:6%;top:1060px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;margin:0'>Your Company, Inc. &bull; 123 Business St &bull; contact@yourcompany.com</p>", inlineEditable: true }, css: "width:60%;left:6%;top:1072px;" },
    ],
  },

  // ── Report ────────────────────────────────────────────
  {
    id: "report-executive-summary",
    category: "Report",
    title: "Executive summary",
    description: "Report page with title, KPI metrics and body text.",
    components: [
      // Accent bar
      { config: { name: "image", template: "default", file: "https://placehold.co/800x6/2563eb/2563eb" }, css: "width:100%;height:6px;left:0;top:0;" },
      // Title
      { config: { name: "text", template: "default", content: "<h1 style='font-size:28px;margin:0'>Executive Summary</h1>", inlineEditable: true }, css: "width:78%;left:6%;top:30px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#6b7280;margin:0'>Q4 2024 &bull; Prepared by Team</p>", inlineEditable: true }, css: "width:40%;left:6%;top:88px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:120px;" },
      // KPI boxes
      { config: { name: "shape", template: "default", fill: "#eff6ff", stroke: "#bfdbfe", strokeWidth: 1, opacity: 1 }, css: "width:24%;height:90px;left:6%;top:136px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#2563eb;font-weight:700;text-transform:uppercase;margin:0 0 4px'>Revenue</p><p style='font-size:24px;font-weight:700;margin:0'>$2.4M</p><p style='font-size:11px;color:#16a34a;margin:0'>↑ 18% YoY</p>", inlineEditable: true }, css: "width:22%;left:7%;top:152px;" },
      { config: { name: "shape", template: "default", fill: "#eff6ff", stroke: "#bfdbfe", strokeWidth: 1, opacity: 1 }, css: "width:24%;height:90px;left:32%;top:136px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#2563eb;font-weight:700;text-transform:uppercase;margin:0 0 4px'>Customers</p><p style='font-size:24px;font-weight:700;margin:0'>1,280</p><p style='font-size:11px;color:#16a34a;margin:0'>↑ 24% YoY</p>", inlineEditable: true }, css: "width:22%;left:33%;top:152px;" },
      { config: { name: "shape", template: "default", fill: "#eff6ff", stroke: "#bfdbfe", strokeWidth: 1, opacity: 1 }, css: "width:24%;height:90px;left:58%;top:136px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#2563eb;font-weight:700;text-transform:uppercase;margin:0 0 4px'>NPS Score</p><p style='font-size:24px;font-weight:700;margin:0'>72</p><p style='font-size:11px;color:#16a34a;margin:0'>↑ 8 pts</p>", inlineEditable: true }, css: "width:22%;left:59%;top:152px;" },
      // Body
      { config: { name: "text", template: "default", content: "<h3 style='margin:0 0 8px'>Overview</h3><p style='color:#374151;line-height:1.7;margin:0'>This document summarises the key findings and performance highlights from the quarter. The business has continued to demonstrate strong growth across all core metrics, with revenue increasing 18% year-over-year and customer acquisition outpacing targets by 12%.</p>", inlineEditable: true }, css: "width:88%;left:6%;top:266px;" },
      { config: { name: "text", template: "default", content: "<h3 style='margin:0 0 8px'>Key Highlights</h3><p style='color:#374151;line-height:1.7;margin:0'>• Product launch drove a 24% increase in new user registrations<br>• Customer satisfaction scores reached an all-time high of 72 NPS<br>• Operational costs were reduced by 9% through process improvements<br>• Three new strategic partnerships were established in the quarter</p>", inlineEditable: true }, css: "width:88%;left:6%;top:420px;" },
      { config: { name: "text", template: "default", content: "<h3 style='margin:0 0 8px'>Outlook</h3><p style='color:#374151;line-height:1.7;margin:0'>Looking ahead, the team is focused on scaling operations to support continued growth. Investment in infrastructure and talent acquisition remains a top priority for the next fiscal period.</p>", inlineEditable: true }, css: "width:88%;left:6%;top:590px;" },
      // Page footer
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:1060px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;margin:0'>Confidential &bull; Company Name</p>", inlineEditable: true }, css: "width:40%;left:6%;top:1072px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;text-align:right;margin:0'>Page 2</p>", inlineEditable: true }, css: "width:16%;left:78%;top:1072px;" },
    ],
  },
  {
    id: "report-toc",
    category: "Report",
    title: "Table of contents",
    description: "Clean table of contents with chapter listings.",
    components: [
      { config: { name: "image", template: "default", file: "https://placehold.co/800x6/1e3a5f/1e3a5f" }, css: "width:100%;height:6px;left:0;top:0;" },
      { config: { name: "text", template: "default", content: "<h1 style='font-size:30px;margin:0'>Table of Contents</h1>", inlineEditable: true }, css: "width:78%;left:6%;top:40px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x2/1e3a5f/1e3a5f" }, css: "width:88%;height:2px;left:6%;top:110px;" },
      // TOC rows
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;margin:0'>Chapter</p>", inlineEditable: true }, css: "width:64%;left:6%;top:128px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;text-align:right;margin:0'>Page</p>", inlineEditable: true }, css: "width:14%;left:78%;top:128px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:154px;" },
      // Rows
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>1. Executive Summary</p>", inlineEditable: true }, css: "width:64%;left:6%;top:172px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>3</p>", inlineEditable: true }, css: "width:14%;left:78%;top:172px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>Company overview and key metrics</p>", inlineEditable: true }, css: "width:64%;left:7%;top:198px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:228px;" },

      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>2. Market Analysis</p>", inlineEditable: true }, css: "width:64%;left:6%;top:246px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>7</p>", inlineEditable: true }, css: "width:14%;left:78%;top:246px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>Competitive landscape and growth opportunities</p>", inlineEditable: true }, css: "width:64%;left:7%;top:272px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:302px;" },

      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>3. Financial Performance</p>", inlineEditable: true }, css: "width:64%;left:6%;top:320px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>12</p>", inlineEditable: true }, css: "width:14%;left:78%;top:320px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>Revenue, costs and profitability analysis</p>", inlineEditable: true }, css: "width:64%;left:7%;top:346px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:376px;" },

      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>4. Strategy &amp; Roadmap</p>", inlineEditable: true }, css: "width:64%;left:6%;top:394px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>18</p>", inlineEditable: true }, css: "width:14%;left:78%;top:394px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>12-month plan and key initiatives</p>", inlineEditable: true }, css: "width:64%;left:7%;top:420px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:450px;" },

      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>5. Team &amp; Operations</p>", inlineEditable: true }, css: "width:64%;left:6%;top:468px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>24</p>", inlineEditable: true }, css: "width:14%;left:78%;top:468px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>Organisational structure and hiring plan</p>", inlineEditable: true }, css: "width:64%;left:7%;top:494px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:524px;" },

      { config: { name: "text", template: "default", content: "<p style='font-size:15px;font-weight:700;margin:0'>6. Appendix</p>", inlineEditable: true }, css: "width:64%;left:6%;top:542px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:15px;text-align:right;margin:0'>30</p>", inlineEditable: true }, css: "width:14%;left:78%;top:542px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:13px;color:#6b7280;margin:0'>Data sources and supplementary material</p>", inlineEditable: true }, css: "width:64%;left:7%;top:568px;" },
      // Footer
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:1060px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;margin:0'>Company Name &bull; Confidential</p>", inlineEditable: true }, css: "width:40%;left:6%;top:1072px;" },
    ],
  },
  {
    id: "report-data",
    category: "Report",
    title: "Data & charts page",
    description: "Side-by-side charts with analysis text below.",
    components: [
      { config: { name: "image", template: "default", file: "https://placehold.co/800x6/2563eb/2563eb" }, css: "width:100%;height:6px;left:0;top:0;" },
      { config: { name: "text", template: "default", content: "<h2 style='font-size:22px;margin:0'>Performance Analysis</h2>", inlineEditable: true }, css: "width:78%;left:6%;top:24px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#6b7280;font-size:13px;margin:0'>Q4 2024</p>", inlineEditable: true }, css: "width:30%;left:6%;top:64px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:92px;" },
      // Charts
      { config: { name: "chart", template: "default", chartType: "bar", data: [{ label: "Q1", value: 42, color: "#3b82f6" }, { label: "Q2", value: 68, color: "#3b82f6" }, { label: "Q3", value: 55, color: "#3b82f6" }, { label: "Q4", value: 81, color: "#3b82f6" }] }, css: "width:42%;height:200px;left:6%;top:108px;" },
      { config: { name: "chart", template: "default", chartType: "pie", data: [{ label: "Product", value: 54, color: "#3b82f6" }, { label: "Services", value: 28, color: "#60a5fa" }, { label: "Support", value: 18, color: "#93c5fd" }] }, css: "width:42%;height:200px;left:52%;top:108px;" },
      // Analysis
      { config: { name: "text", template: "default", content: "<h3 style='font-size:16px;margin:0 0 8px'>Revenue by Quarter</h3><p style='color:#374151;line-height:1.7;font-size:13px;margin:0'>Q4 showed the strongest performance of the year with $81M in revenue, representing a 47% increase over Q1. The consistent upward trajectory reflects the success of the mid-year product refresh.</p>", inlineEditable: true }, css: "width:42%;left:6%;top:330px;" },
      { config: { name: "text", template: "default", content: "<h3 style='font-size:16px;margin:0 0 8px'>Revenue Mix</h3><p style='color:#374151;line-height:1.7;font-size:13px;margin:0'>Product sales continue to dominate the revenue mix at 54%. Services grew to 28%, up from 22% in the prior year, reflecting greater adoption of the consulting offering.</p>", inlineEditable: true }, css: "width:42%;left:52%;top:330px;" },
      // Footer
      { config: { name: "image", template: "default", file: "https://placehold.co/800x1/e2e8f0/e2e8f0" }, css: "width:88%;height:1px;left:6%;top:1060px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;margin:0'>Confidential &bull; Company Name</p>", inlineEditable: true }, css: "width:40%;left:6%;top:1072px;" },
      { config: { name: "text", template: "default", content: "<p style='font-size:11px;color:#94a3b8;text-align:right;margin:0'>Page 5</p>", inlineEditable: true }, css: "width:16%;left:78%;top:1072px;" },
    ],
  },

  // ── Closing ───────────────────────────────────────────
  {
    id: "closing-thankyou",
    category: "Closing",
    title: "Thank you page",
    description: "Closing page with contact information and branding.",
    components: [
      { config: { name: "image", template: "default", file: "https://placehold.co/800x600/1e3a5f/1e3a5f" }, css: "width:100%;height:600px;left:0;top:0;" },
      { config: { name: "shape", template: "circle", fill: "#ffffff18", stroke: "#ffffff18", strokeWidth: 0, opacity: 1 }, css: "width:50%;height:380px;left:50%;top:-60px;" },
      { config: { name: "text", template: "default", content: "<h1 style='color:#fff;font-size:40px;line-height:1.2;margin:0'>Thank You</h1>", inlineEditable: true }, css: "width:74%;left:13%;top:200px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#93c5fd;font-size:18px;margin:0'>We appreciate your time and trust.</p>", inlineEditable: true }, css: "width:66%;left:13%;top:318px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/120x4/4f46e5/4f46e5" }, css: "width:12%;height:4px;left:13%;top:388px;" },
      { config: { name: "text", template: "default", content: "<p style='color:#fff;font-size:15px;font-weight:700;margin:0 0 6px'>Company Name</p><p style='color:#93c5fd;font-size:13px;margin:0'>contact@company.com &bull; (555) 123-4567<br>www.company.com</p>", inlineEditable: true }, css: "width:54%;left:13%;top:700px;" },
      { config: { name: "image", template: "default", file: "https://placehold.co/180x60/ffffff18/ffffff" }, css: "width:18%;height:52px;left:6%;top:28px;" },
    ],
  },
];

class LayoutBuilderService extends CreateBase {
  constructor(instance) {
    
    super();
    this.root = instance
  }

  async addModule(target, template = "default") {
    const dlg = new ModuleDialog();
    const moduledata = await dlg.promise();
    if (!moduledata) {
      return;
    }
     
    const module = createModule(
      {
        name: moduledata.name,
        template: "default",
        ...moduledata.defaults,
      },
      moduledata.defaultCSS
    );

    const off = target.getBoundingClientRect();
    const otop =
      target.ownerDocument.defaultView.scrollY -
      (off.top + target.ownerDocument.defaultView.scrollY);

    target.querySelector(".section-content").append(module);
    renderModule(module);
    module.style.top = `calc(${otop}px + var(--toolbar-height))`;
    module.style.left = "calc(50% - " + module.offsetWidth / 2 + "px)";
    this.root.dispatch('moduleInserted', {module, target})
  }

  _renderLayoutPreview(layout) {
    const page = document.createElement("div");
    page.style.cssText =
      "width:8.27in;height:11.69in;position:relative;background:#fff;overflow:hidden;";
    (layout.components || []).forEach((item) => {
      try {
        const module = createModule(item.config, item.css);
        page.appendChild(module);
        renderModule(module);
      } catch (e) {
        // skip components that fail in preview context
      }
    });
    return page;
  }

  async addLayout(target) {
    const dlg = new LayoutDialog({
      layouts: SECTION_LAYOUTS,
      renderPreview: (layout) => this._renderLayoutPreview(layout),
    });
    const selectedLayout = await dlg.promise();
    if (!selectedLayout) {
      return;
    }

    const sectionContent = target.querySelector(".section-content");
    let lastInserted = null;

    selectedLayout.components.forEach((item) => {
      const module = createModule(item.config, item.css);
      sectionContent.append(module);
      renderModule(module);
      lastInserted = module;
    });

    if (lastInserted) {
      this.root.dispatch("moduleInserted", { module: lastInserted, target });
    }
  }

  delete(target) {
    // Prevent deleting the last remaining section
    const sectionCount = target.parentNode.querySelectorAll(".section").length;
    if (sectionCount <= 1) return;

    if (confirm("Are you sure you want to delete this page?")) {
      const sectionData = this._serializeSection(target);
      const id = sectionData.id;
      const sectionsEl = target.parentNode;

      // Record both states synchronously before the animation so undo/redo is
      // immediately consistent even if the user acts during the fade animation.
      this.root.stateManager.record({ type: "sectionRestore", ...sectionData }, true); // undo
      this.root.stateManager.record({ type: "sectionRemove", id }, true);              // redo

      target.style.opacity = 0;
      const handleEnd = () => {
        target.removeEventListener("transitionend", handleEnd);
        target.remove();
        this.buttonsVisibility(sectionsEl);
        this.dispatch("delete", target);
        this.dispatch("change");
      };
      target.addEventListener("transitionend", handleEnd);
    }
  }
  moveUp(target) {
    let prev = target.previousElementSibling;
    if (!prev || !prev.classList.contains("section")) return;

    const id = target.dataset.id;

    // Record both states synchronously — history is immediately correct.
    this.root.stateManager.record({ type: "sectionMoveDown", id }, true); // undo
    this.root.stateManager.record({ type: "sectionMoveUp", id }, true);   // redo

    // FLIP technique: capture old positions, move DOM immediately, animate visually.
    const tRect = target.getBoundingClientRect();
    const pRect = prev.getBoundingClientRect();

    // Synchronous DOM move — undo/redo is safe from this point forward.
    prev.parentNode.insertBefore(target, prev);

    // Snap elements to their old visual positions (no transition).
    target.style.transition = "none";
    prev.style.transition = "none";
    target.style.transform = `translateY(${tRect.top - pRect.top}px)`;
    prev.style.transform = `translateY(${pRect.top - tRect.top}px)`;

    // Force reflow so the snap is applied before re-enabling transitions.
    void target.offsetHeight;

    // Animate to final positions (transform: none).
    target.style.transition = "";
    prev.style.transition = "";
    target.style.transform = "";
    prev.style.transform = "";

    this.buttonsVisibility(target.parentNode);
    this.dispatch("change");
    this.dispatch("moveUp", target);
  }

  moveDown(target) {
    let next = target.nextElementSibling;
    if (!next || !next.classList.contains("section")) return;

    const id = target.dataset.id;

    // Record both states synchronously — history is immediately correct.
    this.root.stateManager.record({ type: "sectionMoveUp", id }, true);   // undo
    this.root.stateManager.record({ type: "sectionMoveDown", id }, true); // redo

    // FLIP technique: capture old positions, move DOM immediately, animate visually.
    const tRect = target.getBoundingClientRect();
    const nRect = next.getBoundingClientRect();

    // Synchronous DOM move — undo/redo is safe from this point forward.
    next.parentNode.insertBefore(next, target);

    // Snap elements to their old visual positions (no transition).
    target.style.transition = "none";
    next.style.transition = "none";
    target.style.transform = `translateY(${tRect.top - nRect.top}px)`;
    next.style.transform = `translateY(${nRect.top - tRect.top}px)`;

    // Force reflow so the snap is applied before re-enabling transitions.
    void target.offsetHeight;

    // Animate to final positions (transform: none).
    target.style.transition = "";
    next.style.transition = "";
    target.style.transform = "";
    next.style.transform = "";

    this.buttonsVisibility(target.parentNode);
    this.dispatch("change");
    this.dispatch("moveDown", target);
  }

  clone(target) {
    const clone = document.createElement("div");
    clone.innerHTML = `<div class="section-content"></div><div class="layout-menu"></div>`;
    const comtentBlock = clone.querySelector(".section-content");
    clone.className = `section`;
    clone.setAttribute("style", target.getAttribute("style"));
    for (let key in target.dataset) {
      if (key === "id") {
        clone.dataset[key] = $ir.prefix(
          (Math.random() + 1).toString(36).substring(6) + $ir.id()
        );
      } else {
        clone.dataset[key] = target.dataset[key];
      }
    }
    comtentBlock.setAttribute(
      "style",
      target.querySelector(".section-content").getAttribute("style")
    );
    clone.dataset.id = $ir.id();

    target.after(clone);

    target.querySelectorAll(".component").forEach((e) => {
      const neNode = TargetMethods.clone(e, false);
      comtentBlock.append(neNode);
      renderModule(neNode);
    });

    this.nav(clone);
    this.dispatch("change");
    this.dispatch("clone", clone);

    // Record undo/redo pair — undo removes the clone, redo adds it back
    const cloneData = this._serializeSection(clone);
    this.root.stateManager.record({ type: "sectionRemove", id: cloneData.id }, true);
    this.root.stateManager.record({ type: "sectionRestore", ...cloneData }, true);

    clone.scrollIntoView({
      behavior: "smooth",
    });
  }

  buttonsVisibility(root) {
    const all = root.querySelectorAll(".layout-menu");
    all.forEach((node, i) => {
      node.querySelector('[data-action="moveUp"]').style.display =
        i === 0 ? "none" : "";
      node.querySelector('[data-action="moveDown"]').style.display =
        i === all.length - 1 ? "none" : "";
    });
  }
  nav(layout) {
    const template = `
        <ul class="menu menu-start">
          <li>
                <a class="tooltip tooltip-left layout-menu-btn" data-tip="Add element" data-action="addModule">
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg></a>
            </li>
            <li>
                <a class="tooltip tooltip-left layout-menu-btn" data-tip="Insert layout" data-action="addLayout">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M80-80v-360h360v360H80Zm440 0v-360h360v360H520ZM80-520v-360h800v360H80Zm80-80h640v-200H160v200Zm0 440h200v-200H160v200Zm440 0h200v-200H600v200Z"/></svg>
                </a>
            </li>
        </ul>
        <ul class="menu menu-end">
            <li>
                <a class="tooltip tooltip-left" data-tip="Move Up" data-action="moveUp">
                    <svg xmlns="http://www.w3.org/2000/svg" class="	" viewBox="0 -960 960 960"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
                </a>
            </li>

            <li>
                <a class="tooltip tooltip-left" data-tip="Move down" data-action="moveDown">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 -960 960 960"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
                </a>
            </li>
            <li>
                <a class="tooltip tooltip-left" data-tip="Clone" data-action="clone">

                    <svg xmlns="http://www.w3.org/2000/svg"  class="" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>                    
                </a>
            </li>
                <li>
                <a class="tooltip tooltip-left" data-tip="Delete" data-action="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="	" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </a>
            </li>
        </ul>
        `;

    const nav =
      layout.querySelector(".layout-menu") || document.createElement("div");
    nav.className = "layout-menu";
    nav.innerHTML = template;
    nav.querySelectorAll("[data-action]").forEach((node) => {
      node.addEventListener("click", () => {
        this[node.dataset.action](layout);
      });
    });
    layout.appendChild(nav);
    this._addPageInsertBtn(layout);
    layout.__mounted = true;
    return nav;
  }

  _addPageInsertBtn(section) {
    // Remove old if re-mounting
    const old = section.querySelector(".section-insert-btn");
    if (old) old.remove();

    const btn = document.createElement("div");
    btn.className = "section-insert-btn";
    btn.innerHTML = `
      <button class="section-insert-btn-inner" title="Insert page after">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="16" height="16">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
      </button>`;
    btn.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      this.insertPage(section);
    });
    section.appendChild(btn);
  }

  /** Serialize a section into a plain object suitable for state recording. */
  _serializeSection(section) {
    const components = [];
    section.querySelectorAll(":scope > .section-content > .component").forEach((comp) => {
      saveModuleStyle(comp); // ensure latest CSS is in the config
      components.push({
        id: comp.dataset.id,
        config: getModuleConfig(comp),
        css: comp.getAttribute("style") || "",
      });
    });
    const prevSibling = section.previousElementSibling;
    return {
      id: section.dataset.id,
      // afterId = null means "insert before the first section"
      afterId: prevSibling?.classList.contains("section") ? prevSibling.dataset.id : null,
      components,
    };
  }

  async insertPage(afterSection) {
    const dlg = new PageTemplateDialog({
      templates: PAGE_TEMPLATES,
      renderPreview: (tpl) => this._renderLayoutPreview(tpl),
    });
    const selected = await dlg.promise();
    if (!selected) return;

    const section = document.createElement("div");
    section.className = "section";
    section.dataset.id = $ir.id ? $ir.id() : Date.now().toString(36);
    const content = document.createElement("div");
    content.className = "section-content";
    section.appendChild(content);

    if (afterSection) {
      afterSection.after(section);
    } else {
      // Insert before the first section
      const firstSection = this.root.settings.sections.querySelector(".section");
      if (firstSection) {
        firstSection.before(section);
      } else {
        this.root.settings.sections.appendChild(section);
      }
    }

    (selected.components || []).forEach((item) => {
      const module = createModule(item.config, item.css);
      content.append(module);
      renderModule(module);
    });

    this.nav(section);
    this.buttonsVisibility(section.parentElement);
    this.dispatch("change");

    // Record undo/redo pair — undo removes the new page, redo adds it back
    const sectionData = this._serializeSection(section);
    this.root.stateManager.record({ type: "sectionRemove", id: sectionData.id }, true);
    this.root.stateManager.record({ type: "sectionRestore", ...sectionData }, true);

    section.scrollIntoView({ behavior: "smooth" });
  }

  renderStartBtn(sectionsEl) {
    const existing = sectionsEl.querySelector(".section-insert-btn-start");
    if (existing) existing.remove();

    const wrap = document.createElement("div");
    wrap.className = "section-insert-btn-start";
    wrap.innerHTML = `
      <button class="section-insert-btn-inner" title="Insert page at beginning">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="16" height="16">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
      </button>`;
    wrap.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      this.insertPage(null);
    });

    sectionsEl.insertBefore(wrap, sectionsEl.firstChild);
  }
}

export class LayoutManagerComponent {
  constructor(instance) {

    this.layoutService = new LayoutBuilderService(instance);
    this.target = instance.settings.sections;
    this.mount();
    this.layoutService.buttonsVisibility(this.target);

    this.layoutService.on("change", () => {
      setTimeout(() => {
        this.layoutService.buttonsVisibility(this.target);
      });
    });
  }

  nav(layout) {
    return this.layoutService.nav(layout);
  }

  mount() {
    this.layoutService.renderStartBtn(this.target);
    this.target.querySelectorAll(".section").forEach((node) => {
      if (!node.__mounted) {
        node.__mounted = true;
        this.nav(node);
      }
    });
  }
}
