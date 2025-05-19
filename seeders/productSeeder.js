const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  {
    name: "H1c 2MP",
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "289000",
    description: [
      "1080p Resolution",
      "108° Wide-Angle Lens",
      "IR Night Vision Up to 10 m (32 ft)",
      "Motion Detection",
      "Three Sound-Alert Modes",
      "Sleep Mode for Privacy Protection",
      "Two-Way Talk",
      "Install with Magnetic Base",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.3Pd86MF26TWvm3K3hpOGmwHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "C6n 2MP", //C6N 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "329000",
    description: [
      "1080p",
      "Smart Night Vision with Smart IR (up to 10m / 33ft.)",
      "Motorized Pan and Tilt 360° Visual Coverage",
      "Smart Tracking",
      "View from Anywhere",
      "Wi-Fi 2.4 GHz",
      "MicroSD Slot (up to 256 GB)",
      "Two-Way Talk",
    ],
    image:
      "https://rakitan.com/jsg-content/uploads/modules/produk/20221208015221.jpg",
  },

  // nd Pricelist dan os nya nda ada, apa mau dihapus aja ta? tapi dulu PL yg di wa ada wkkwkwk
  {
    name: "C6n Pro 2K", //C6N 4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "479000",
    description: [
      "2K Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://hanoicomputercdn.com/media/product/85767_camera_wifi_ezviz_c6n_pro_2k_3mp.jpg",
  },

  {
    name: "H6c Pro", //h6c pro 2mp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "329000",
    description: [
      "1080p Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Tracking",
      "Loud Noise Detection",
      "Two-Way Calling",
      "Sleep Mode for Privacy Protection",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://qtctech.vn/Content/uploads/2023/10/camera-wifi-h6c-pro.webp",
  },

  {
    name: "H6c Pro 2K", //h6c pro 3mp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "339000",
    description: [
      "2K Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://image.coolblue.be/max/500x500/products/1884699",
  },

  {
    name: "H6c Pro 2K+", //h6c pro 4mp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "499000",
    description: [
      "2K⁺ Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Supports 2.4 / 5 GHz Dual-Band Wi-Fi",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://image.coolblue.be/max/500x500/products/1884699",
  },

  {
    name: "H6c Pro 3K", //h6c pro 5mp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "589000",
    description: [
      "3K Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Supports 2.4 / 5 GHz Dual-Band Wi-Fi¹",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay1 Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.612Fo7TR9X7M5Wj_-_ghDwHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H6c Pro 4K", //h6c pro 8mp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "749000",
    description: [
      "4K Resolution",
      "360° Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Compression",
      "Supports Dual-Band Wi-Fi 6 (2.4 / 5 GHz)",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://mfs.ezvizlife.com/97195500c81be7f525abc5fcbe1d36ee.png",
    //gambar nya kl ada lebih bagus kasih yg lain
  },

  {
    name: "TY1 2MP", //TY1 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "329000",
    description: [
      "Image Sensor: 1/3, Progressive Scan CMOS",
      "Lens: 4mm@ F2.4, 85° diagonal view",
      "Max Resolution: 1920 × 1080",
      "Video Compression: H.264",
      "Wi-Fi: IEEE802.11b/g/n, 2.4GHz",
      "Storage: MicroSD (Max 256GB)",
      "Smart Alarm: Motion detection",
      "Wired Network: RJ45",
      "Temperature: -10°C to 45°C",
    ],
    image: "https://mysds.co.id/wp-content/uploads/2024/01/OIP-1.jpeg",
  },

  {
    name: "TY1 Pro 2MP",
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "329000",
    description: [
      "1080p Resolution",
      "Panoramic View",
      "Smart Color Night Vision",
      "Patrol Mode",
      "Two-Way Calling with Touch Button",
      "Smart Human Shape Detection",
      "Auto-Tracking",
      "Loud Noise Detection",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://mfs.ezvizlife.com/4f55a04ea571fe3a25c2109594613283.png",
  },

  {
    name: "TY1 Pro 2K", //TY1 PRO 3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "339000",
    description: [
      "2K Resolution",
      "Panoramic View",
      "Smart Color Night Vision",
      "Patrol Mode",
      "Two-Way Calling with Touch Button",
      "Smart Human Shape Detection",
      "Auto-Tracking",
      "Loud Noise Detection",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://mfs.ezvizlife.com/968dd599f7235afbca7966692435c95d.png?ver=48313",
  },

  {
    name: "TY1 Pro 2K+", //TY1 PRO 4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "499000",
    description: [
      "2K⁺ Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Dual-Band Wi-Fi",
      "MicroSD/Cloud Storage",
    ],
    image:
      "https://mfs.ezvizlife.com/968dd599f7235afbca7966692435c95d.png?ver=48313",
  },

  {
    name: "TY1 Pro 3K", //TY1 PRO 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "579000",
    description: [
      "3K Resolution",
      "Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Supports 2.4 / 5 GHz Dual-Band Wi-Fi",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://cdn2.cellphones.com.vn/x/media/catalog/product/c/a/camera-ip-wifi-ezviz-ty1-pro-4mp-2.png",
    //aga kurang yakin sama fotone
  },

  {
    name: "TY1 Pro 4K", //TY1 PRO 8MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "749000",
    description: [
      "4K Resolution",
      "360° Panoramic View",
      "Patrol Mode",
      "Smart Color Night Vision",
      "Smart Human Shape Detection",
      "Auto-Zoom Tracking",
      "Loud Noise Detection",
      "Two-Way Calling with Touch Button",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Compression",
      "Supports Dual-Band Wi-Fi 6 (2.4 / 5 GHz)¹",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage²",
    ],
    image:
      "https://cdn2.cellphones.com.vn/x/media/catalog/product/c/a/camera-ip-wifi-ezviz-ty1-pro-4mp-2.png",
    //aga kurang yakin sama fotone
  },

  {
    name: "H6 3K", //H6 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "649000",
    description: [
      "2K⁺ Resolution",
      "Panoramic View",
      "IR Night Vision (Up to 10 m / 33 ft)",
      "Smart Human Motion Detection",
      "Auto-Tracking",
      "Two-Way Talk",
      "Sleep Mode for Privacy Protection",
      "H.265 Video Technology",
      "Supports MicroSD Card (Up to 256 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://media.ldlc.com/r1600/ld/products/00/06/06/36/LD0006063668.jpg",
  },

  {
    name: "C60p Dual Mix 2K", //C60p 3 +3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "799000",
    description: [
      "2K & 2K Dual-Lens Stitching",
      "360° Panoramic View",
      "Two-Way Calling with Touch Button",
      "IR Night Vision (Up to 10 m / 33 ft)",
      "AI-Powered Human Shape Detection",
      "Smart Tracking",
      "Two Patrol Modes for Auto-Security",
      "Sleep Mode for Privacy Protection",
      "Supports Dual-Band Wi-Fi 6 (2.4 / 5 GHz)",
      "H.265 Video Compression",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.0narlHPR_k67qeDTECNPJgHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H7c Dual 2K+", //H7c 4+4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "699000",
    description: [
      "2K⁺ & 2K⁺ Dual Lenses",
      "Panoramic View",
      "Two-Way Calling with Touch Button",
      "Smart Color Night Vision",
      "AI-Powered Human Shape Detection",
      "Loud Noise Detection",
      "Co-Detection for Auto Smart Tracking",
      "Sleep Mode for Privacy Protection",
      "Supports Dual-Band Wi-Fi 6 (2.4 / 5 GHz)",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://truongthinhtelecom.com/wp-content/uploads/2024/05/23.jpg",
  },

  {
    name: "H3c Color", //H3c 2MP Color
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "559000",
    description: [
      "1080p Resolution",
      "Color Night Vision",
      "IP67 Weatherproof Design",
      "AI-Powered Human Shape Detection",
      "H.265 Video Technology",
      "Audio Pick-Up",
      "Active Defense with Strobe Light",
      "Smart Integration with Google Assistant, Amazon Alexa & IFTTT",
      "Supports MicroSD Card1 (Up to 512 GB)",
      "Supports EZVIZ CloudPlay Storage2",
    ],
    image:
      "https://th.bing.com/th/id/OIP.0vxieHUoGT0etiFsRmPLNwHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H3c 2K+", //H3c 4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "729000",
    description: [
      "2K⁺ Resolution",
      "Color Night Vision",
      "Two-Way Talk",
      "Customizable Voice Alerts",
      "AI-Powered Human Shape Detection",
      "Waving-Hand Recognition & Control",
      "Customizable Detection Zone",
      "Active Defense with Siren and Strobe Light",
      "IP67 Weatherproof Design",
      "H.265 Video Technology",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage¹",
      "Smart Integration with Google Assistant, Amazon Alexa & IFTTT",
    ],
    image:
      "https://th.bing.com/th/id/OIP.e62cr8p4131QD5SociVLNQHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H3c 3K", //H3c 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "789000",
    description: [
      "3K Resolution",
      "Color Night Vision",
      "Two-Way Talk",
      "Customizable Voice Alerts",
      "AI-Powered Human / Vehicle Shape Detection",
      "Waving-Hand Recognition & Control",
      "Customizable Detection Zones",
      "Active Defense with Siren and Strobe Light",
      "IP67 Weatherproof Design",
      "H.265 Video Technology",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
      "Smart Integration with Google Assistant & Amazon Alexa",
    ],
    image:
      "https://mfs.ezvizlife.com/6363a11141dfd145fa145aaf5ff49fe9.png?ver=52475",
  },

  {
    name: "H3 3K", //H3 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "999000",
    description: [
      "3K Resolution",
      "AI-Powered Human / Vehicle Shape Detection",
      "Color Night Vision",
      "Waving-Hand Recognition & Control",
      "Customizable Detection Zone",
      "Customizable Voice Alerts",
      "Active Defense with Strobe Light and Siren",
      "Two-Way Talk",
      "High-Endurance Aluminum Alloy Enclosure",
      "IP67 Weatherproof Design",
      "H.265 Video Technology",
      "Supports MicroSD Card¹ (Up to 512 GB)",
    ],
    image:
      "https://th.bing.com/th/id/OIP.iB108Xsum-XxS6F80VKyywHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H4 2K", //h4 3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "649000",
    description: [
      "2K Resolution",
      "AI-Powered Human / Vehicle Shape Detection",
      "Active Defense with Siren and Strobe Light",
      "Color Night Vision",
      "Enhanced Audio Pickup¹ (Up to 15 meters)",
      "Two-Way Calling",
      "Customizable Voice Alerts",
      "Customizable Detection Zone",
      "IP67 Weatherproof Design",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.3fxUzNyfwfi5cNDmOR-BRwHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H8c", //H8c 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "599000",
    description: [
      "1080p Resolution",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "AI-Powered Human Shape Detection",
      "Auto-Tracking",
      "One-Click Return to Pre-Set Directions",
      "Two-Way Talk",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://cameraezviz.com.vn/wp-content/uploads/2022/10/Camera-Ezviz-H8C.jpg",
  },

  {
    name: "H8c 2K+", //H8c 4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "799000",
    description: [
      "2K⁺ Resolution",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "AI-Powered Human Shape Detection",
      "Auto-Zoom Tracking",
      "One-Click Return to Pre-Set Directions",
      "Two-Way Talk",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.6_kHRoJStmw3sMfwOUoy-QHaHa?pid=ImgDet&w=474&h=474&rs=1",
  },

  {
    name: "H8c 3K", //H8c Pro 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "949000",
    description: [
      "3K Resolution",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "AI-Powered Human / Vehicle Shape Detection",
      "Auto-Zoom Tracking",
      "One-Click Return to Pre-Set Directions",
      "Weatherproof Design",
      "Active Defense with Siren and Strobe Light",
      "Two-Way Talk",
      "H8c Pro 3K Pan & Tilt Wi-Fi Camera",
      "H.265 Video Compression",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://images.tcdn.com.br/img/img_prod/1358667/camera_de_seguranca_ezviz_h8c_pro_3k_wifi_957_1_0b606aa7a3f4be204933fab36cc0ee2c.jpeg",
  },

  {
    name: "H8c Pro 4K", //H8c 8MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "999000",
    description: [
      "4K Resolution",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "AI-Powered Human / Vehicle Shape Detection",
      "Auto-Zoom Tracking",
      "One-Click Return to Pre-Set Directions",
      "Weatherproof Design",
      "Active Defense with Siren and Strobe Light",
      "Two-Way Talk",
      "H.265 Video Compression",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://www.goldonecomputer.com/image/cache/catalog/Products/CCTV/EZVIZ/H8c-330x409-330x409.jpg",
  },

  {
    name: "H8 Pro 3K", //H8c 5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1199000",
    description: [
      "3K Resolution",
      "Active Defense with Siren and Strobe Light",
      "360° Panoramic Coverage",
      "AI-Powered Human / Vehicle Shape Detection",
      "Auto-Tracking",
      "One-Click Return to Pre-Set Directions",
      "Camera Call Initiation by Waving a Hand",
      "Color Night Vision",
      "Two-Way Talk",
      "H.265 Video Technology",
      "Weatherproof Design",
      "Supports MicroSD Cards (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://cdn.idealo.com/folder/Product/202281/5/202281560/s1_produktbild_max/ezviz-h8-pro-3k-303102533.jpg",
  },

  {
    name: "H8x 2K+", //H8x 4MP ColorNight
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1199000",
    description: [
      "2K⁺ Resolution",
      "1/1.8” CMOS sensor",
      "ColorFULL Night Vision under Ultra-Low Light",
      "F1.0 Large Aperture",
      "360° Panoramic View",
      "AI-Powered Human / Vehicle Shape Detection",
      "Auto-Zoom Tracking",
      "Two Patrol Modes for Auto-Security",
      "One-Click Return to Pre-Set Directions",
      "Active Defense with Siren & Strobe Light",
      "Two-Way Talk",
      "Weatherproof Design",
      "H.265 Video Compression",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://www.itcapital.hu/wp-content/uploads/ezviz_h8_pro_2k_wifi_ip_kamera.jpg",
  },

  {
    name: "H80x Dual 4K", //H80x 8MP+2MP ColorNight
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1199000",
    description: [
      "4K Resolution",
      "Intelligent Dual Lenses",
      "ColorFULL Night Vision under Ultra-Low Light",
      "F1.0 Large Aperture",
      "360° Panoramic View",
      "AI-Powered Human / Vehicle Shape Detection",
      "One-Click Return to Pre-Set Directions",
      "Active Defense with Siren & Strobe Light",
      "Two-Way Talk",
      "Weatherproof Design",
      "H.265 Video Compression",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://qtctech.vn/Content/uploads/2024/08/ezviz-h80x-dual-2-mat-qtctech.webp",
  },

  {
    name: "H80f 2K+ x 3 ", //H80f 4+4+4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1399000",
    description: [
      "Two Patrol Modes for Auto-Security",
      "360° Panoramic View",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "IP67 Weatherproof Design",
      "Two-Way Talk",
      "H.265 Video Compression",
      "Smart Integration with Google Assistant & Amazon Alexa¹",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
      "Easy Installation",
    ],
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/466/218/products/h80f.png?v=1739845822057",
  },

  {
    name: "H90 Dual 2K+", //H90 4+4MPp
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "1199000",
    description: [
      "2K+ & 2K+ Dual Lenses",
      "Co-Detection for Auto Smart Tracking",
      "One-Tap Control for Linked View Change",
      "Dual Rotations for Ultra-Flexible Vision",
      "AI-Powered Human / Vehicle Shape Detection",
      "360° Panoramic View",
      "Two Patrol Modes for Auto-Security",
      "Two-Way Talk",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "H.265 Video Compression",
      "Color Night Vision",
      "Balanced Image Exposure with Smart Lights",
      "Easy Installation",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.j9w3r_FlB-ddl-LxcK5vHQHaG6?rs=1&pid=ImgDetMain",
  },

  {
    name: "H9c Dual 2K", //H9c 3+3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "999000",
    description: [
      "3K & 3K Dual Lenses",
      "Co-Detection for Auto Smart Tracking",
      "One-Tap Control for Linked View Change",
      "Two Patrol Modes for Auto-Security",
      "AI-Powered Human / Vehicle Shape Detection",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "Two-Way Talk",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "Enhanced Dual Wi-Fi Antennas",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.GUNBpNjMByRdabHt8tNCCwHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H9c Dual 3K", //H9c 5+5MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1299000",
    description: [
      "2K & 2K Dual Lenses",
      "Co-Detection for Auto Smart Tracking",
      "One-Tap Control for Linked View Change",
      "Two Patrol Modes for Auto-Security",
      "AI-Powered Human / Vehicle Shape Detection",
      "360° Panoramic Coverage",
      "Color Night Vision",
      "Two-Way Talk",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "Enhanced Dual Wi-Fi Antennas",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.EnjkPsOf6oGPqplGg9qKAwHaHa?rs=1&pid=ImgDetMain",
  },

  //BATERRY CAMERA
  {
    name: "CB1", //CB1 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "629000",
    description: [
      "1080p Resolution",
      "IR Night Vision Up to 5 m (16 ft)",
      "Smart Human Motion Detection",
      "Up to 40 Days of Battery Life¹ (1,600 mAh Rechargeable Battery)",
      "Install with Magnetic Base",
      "Two-Way Talk",
      "Sleep Mode for Privacy Protection",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.K7Y10sL4s6jvoYS1TYWJxgHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "CB2", //CB2 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "879000",
    description: [
      "1080p Resolution",
      "IR Night Vision Up to 5 m (16 ft)",
      "Smart Human Motion Detection",
      "Up to 40 Days of Battery Life¹ (1,600 mAh Rechargeable Battery)",
      "Install with Magnetic Base",
      "Two-Way Talk",
      "Sleep Mode for Privacy Protection",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.K7Y10sL4s6jvoYS1TYWJxgHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "CB3", //CB3 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "999000",
    description: [
      "1080p Resolution",
      "Up to 120 Days of Battery Life (5200 mAh)",
      "Smart Human Motion Detection",
      "Color Night Vision",
      "Weatherproof Design",
      "Active Defense with Siren and Strobe Light",
      "Two-Way Talk",
      "Customizable Voice Alerts",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa-enabled device",
      "Works with EZVIZ Solar Panel for Battery Charging",
      "Supports MicroSD Card (Up to 256 GB) & EZVIZ Cloud Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.boleSMh-1Q3jpzGwIlGx0AHaHa?rs=1&pid=ImgDetMain",
  },
  //CB3+SOLAR PANEL KIT SOLD OUT KYKE WKWKW

  {
    name: "HB8 2K+", //HB8 4MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1899000",
    description: [
      "2K⁺ Resolution",
      "360° Panoramic Coverage",
      "Up to 210 Days of Battery Life (10400 mAh)",
      "Free 32 GB eMMC Storage",
      "Smart Human Motion Detection",
      "Auto-Tracking",
      "Color Night Vision",
      "Active Defense",
      "Weatherproof Design",
      "Two-Way Talk",
      "Customizable Voice Alerts",
      "H.265 Video Compression",
      "Works with EZVIZ Solar Panel for Battery Charging",
    ],
    image:
      "https://th.bing.com/th/id/OIP.TTVFLCYEV7xnxrRDy6sKqAHaHa?pid=ImgDet&w=474&h=474&rs=1",
  },

  {
    name: "BM1", //BM1 2MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "1299000",
    description: [
      "Crying Detection",
      "Out-of-Crib Alerts",
      "Baby Activity Detection (Powered by human-shape algorithm)",
      "Auto-Play Soothing Music",
      "All-Night Battery(2,000 mAh)",
      "Clear Night Vision Without Visible Red Light",
      "View From Anywhere with 1080p FHD",
      "Hear and Talk",
      "Easy Setup",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Cards (Up to 256 GB) & EZVIZ Cloud Storage",
      "Strict Data & Privacy Protection",
    ],
    image:
      "https://th.bing.com/th/id/OIP.53F2J5oVTCoE2l8QFIabngHaHa?rs=1&pid=ImgDetMain",
  },

  //4G CAMERA
  {
    name: "H8c 4G",
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "899000",
    description: [
      "Supports 4G Network Connectivity",
      "2K Resolution",
      "Panoramic View",
      "AI-Powered Human / Vehicle Shape Detection",
      "Auto-Tracking",
      "Two-Way Talk",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "H.265 Video Technology",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.aTVhQblBkULelyqsLQqxxQHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "EB8 4G",
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "2299000",
    description: [
      "4G Connectivity",
      "Device GPS Location Viewing",
      "2K Resolution",
      "Panoramic View",
      "Extra-Large Battery Capacity (10,400 mAh)",
      "Smart Human Motion Detection",
      "Two-Way Talk",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "Works with EZVIZ Solar Panel (Type-C Version) for Battery Charging",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image: "https://m.media-amazon.com/images/I/51PSdvTT5IL.AC_SL1500.jpg",
  },

  //POE
  {
    name: "H8c POE 2K", //H8c POE 3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "629000",
    description: [
      "2K Resolution",
      "Panoramic View",
      "AI-Powered Human Shape Detection",
      "Auto-Tracking",
      "Two-Way Talk",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "Weatherproof Design",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "H.265 Video Technology",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.Dv9RQQ9kmHNCTYOkVEC-3AHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "H5 POE 2K", //H5 POE 3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "599000",
    description: [
      "2K Resolution",
      "Two-Way Talk",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "IP67 Weatherproof Design",
      "AI-Powered Human / Vehicle Shape Detection",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://mfs.ezvizlife.com/f64db3300dd26a2d62898327be82fb24_middle.png",
  },

  {
    name: "H4 POE 2K", //H5 POE 3MP
    type: "Camera",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "569000",
    description: [
      "Power Over Ethernet",
      "2K Resolution",
      "Two-Way Talk",
      "Color Night Vision",
      "Active Defense with Siren and Strobe Light",
      "IP67 Weatherproof Design",
      "AI-Powered Human / Vehicle Shape Detection",
      "H.265 Video Technology",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://megajaipur.com/image/cache/catalog/images/products/security/ptz-pt-4g-wifi-camera/Hikvision/CS-H4-R201-1H3EKFL/hikvision-ezviz-h4-poe-2k-3mp-dome-ip-wifi-camera%20(2)-550x550.webp",
  },

  // Smart Entry
  {
    name: "DL03",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "799000",
    description: [
      "Connects to 2.4 GHz Wi-Fi",
      "No Connectivity Hub Needed",
      "Remote Unlocking via the EZVIZ App",
      "Lock Status Check & Alerts",
      "Multiple Unlock Methods",
      "Smart Integration with EZVIZ Cameras¹",
      "Supports Anti-Peeping Codes",
      "Anti-Tamper Alarm",
      "Supports Emergency Power Supply (Type-C)",
      "Sturdy Design",
    ],
    image: "https://mfs.ezvizlife.com/a58a7f96f92f3bfa84842778a38549e2.png",
  },

  {
    name: "DL03 PRO",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "999000",
    description: [
      "Connects to 2.4 GHz Wi-Fi",
      "No Connectivity Hub Needed",
      "Fingerprint Unlocking",
      "Remote EZVIZ App Unlocking & Controls",
      "Real-Time Lock Status Check & Alerts",
      "Multiple Unlock Methods",
      "Smart Integration with EZVIZ Cameras¹",
      "Sturdy Lock Body",
      "Anti-Tamper Alarm",
      "Supports Emergency Power Supply",
    ],
    image:
      "https://mfs.ezvizlife.com/1847e2d5b70e839ee1b30e0d5d8a4ae7.png?ver=45853",
  },

  {
    name: "DL04",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "1349000",
    description: [
      "Supports 2.4 GHz Wi-Fi",
      "Passcode Unlocking",
      "Remote EZVIZ App Unlocking & Controls",
      "Lock Status Check & Alerts",
      "Multiple Unlock Methods",
      "Smart Integration with EZVIZ Cameras¹",
      "Supports Anti-Peeping Codes",
      "Sturdy Design",
      "Anti-Tamper Alarm",
      "Supports Emergency Power Supply (Type-C)",
    ],
    image:
      "https://realplaza.vtexassets.com/arquivos/ids/36530863-800-auto?v=638691166581870000&width=800&height=auto&aspect=true",
  },

  {
    name: "DL04 PRO",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1649000",
    description: [
      "Connects to 2.4 GHz Wi-Fi",
      "Fingerprint Unlocking",
      "Remote EZVIZ App Unlocking & Controls",
      "Lock Status Check & Alerts",
      "Multiple Unlock Methods",
      "Smart Integration with EZVIZ Cameras¹",
      "Supports Anti-Peeping Codes",
      "Sturdy Design",
      "Anti-Tamper Alarm",
      "Supports Emergency Power Supply (Type-C)",
    ],
    image: "https://mfs.ezvizlife.com/81674be380c4cea6c8351bed74229b5c.jpg",
    // bee nemu background yg putih biar sama konsep nya
  },

  {
    name: "DL05", // Smart Lock
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "1999000",
    description: [
      "Multiple Unlock Methods",
      "Easy Control via EZVIZ App",
      "Real-Time Mobile Alerts",
      "Supports Temporary Access Codes",
      "Supports Anti-Peeping Codes",
      "Supports Child Safety Lock",
      "Built-In Electronic Doorbell",
      "Anti-Tamper Alarm",
      "Weatherproof Design",
      "Supports Emergency Power Supply",
      "Low-Battery Warning Signal",
      "Smart Integration with EZVIZ Cameras",
    ],
    image:
      "https://th.bing.com/th/id/OIP.CqclRyrHfCtRY3wQxtC1uAHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "DL06 PRO", // Smart Lock
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "2499000",
    description: [
      "Dual-Sided Fingerprint Design",
      "Synchronized Unlocking of Two Interlinked Locks",
      "Fingerprint Unlocking",
      "Passcode & Proximity Card Unlocking",
      "Remote Unlocking & Control via the EZVIZ App",
      "Dual-Sided Weatherproof Design",
      "Smart Integration with EZVIZ Cameras",
      "Supports Wi-Fi & Bluetooth Connectivity",
      "Anti-Tamper Alarm",
      "Built-in Doorbell",
      "Low-Battery Warning Signal",
      "Rechargeable Battery (Supports Type-c charging)",
    ],
    image:
      "https://th.bing.com/th/id/OIP.CqclRyrHfCtRY3wQxtC1uAHaHa?rs=1&pid=ImgDetMain",
    //masih loading
  },

  {
    name: "DL50FVS",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "4399000",
    description: [
      "Face Recognition with Dual-Lens 3D Structured Light",
      "Built-In Security Chip for Local Processing",
      "Multiple Unlock Methods",
      "Remote EZVIZ App Controls & Alerts",
      "Built-In Smart Door Viewer",
      "4-Inch IPS Color Screen",
      "Live View with Two-Way Video Call",
      "Up to 4 Months of Battery Life (5,000 mAh Rechargeable Lithium Battery)¹",
      "Safe Design Against Peeping & Forced Entry",
      "Sturdy Lock Body with Anti-Tamper Alarm",
      "Supports Emergency Power Supply",
    ],
    image:
      "https://mfs.ezvizlife.com/b310bac3860cca1f5e2b9f28fd04958a.png?ver=52475",
  },

  {
    name: "SD7",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold
    price: "1399000",
    description: [
      "7-Inch IPS Touch Screen",
      "Smart Integration with EZVIZ Devices",
      "4,600 mAh Rechargeable Lithium Battery (Type-C charging)",
      "Live View & Playback",
      "Remote Control via EZVIZ App",
      "Two-Way Talk",
      "2.4 GHz Wi-Fi",
      "Easy Installation",
    ],
    image:
      "https://th.bing.com/th/id/OIP.ny5mGgEJ9H_d_KK1FbUzxgHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "HP5",
    type: "Smart Entry",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "2099000",
    description: [
      "1080p Resolution",
      "7-Inch Color Touch Screen",
      "Remote Door/Gate Unlock",
      "2-Wire",
      "Remote Control via the EZVIZ App",
      "Two-Way Talk (Supports voice changer feature)",
      "Built-In Doorbell with Multiple Ringtones",
      "Smart RFID Unlock (2 tags included)",
      "Weatherproof Design",
      "Supports Dual-Band Wi-Fi 6 (2.4 / 5 GHz)",
      "Supports MicroSD Card (Up to 512 GB) & EZVIZ CloudPlay Storage",
    ],
    image:
      "https://th.bing.com/th/id/OIP.yW7gNPqnW9AouOv28cNbhgHaHa?rs=1&pid=ImgDetMain",
  },

  // tak lompatin smart sensor nya(kalau ketemu nd website nya masukin aja nanti stok nya jadi 0, ga se?)

  //Nas
  {
    name: "R5C",
    type: "Storage",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "949000",
    description: [
      "Processor Architecture: ARM Cortex A7 2core",
      "Processor Frequency: 1 GHz",
      "System Memory: 512M",
      "System Flash: 128M",
      "Number Of Slot: 1",
      "HDD Type: 3.5",
      "Local Storage: Up to 8TB",
      "IP Camera Input: Up to 8 channels",
      "IP Camera Max Resolution: 8MP",
      "Video Compression: H.264 & H.265",
      "Video Playback: Support search and playback 24/7 or motion detection video clips",
      "System Setting: Support view device/channel/recording, Support online update firmware",
    ],
    image: "https://aacgroup.com.my/uploads/pricelist_img/1704940025_32249.jpg",
  },

  // Wifi NVR
  {
    name: "X5S 4W",
    type: "NVR",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "729000",
    description: [
      "HDMI/VGA output",
      "Wi-Fi range up to 100 m",
      "Supports H.265",
      "Supports 5 Megapixel cameras",
      "Third-party compatibility",
      "Storage up to 8TB",
    ],
    image:
      "https://th.bing.com/th/id/OIP.1QYq1njDTPoCScK7lMVRWQHaFV?rs=1&pid=ImgDetMain",
  },

  {
    name: "X5S 8W",
    type: "NVR",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "879000",
    description: [
      "HDMI/VGA output",
      "Wi-Fi range up to 100 m",
      "Supports H.265",
      "Supports 5 Megapixel cameras",
      "Third-party compatibility",
      "Storage up to 8TB",
    ],
    image:
      "https://th.bing.com/th/id/OIP.e0DCfc74Ib8_dq22Tzb0lwHaFT?rs=1&pid=ImgDetMain",
  },

  // SMART CLEANER
  {
    name: "RS2",
    type: "Smart Cleaner",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "9899000",
    description: [
      "Automatic Mop Installation & Detachment",
      "Automatic Mop Washing & Air-Drying",
      "Auto Water Tank Refilling (For the Robot)",
      "All-in-One Dock for Mop Changing, Self-Cleaning, Charging & Storage",
      "Four Flexible Cleaning Modes",
      "D-ToF Laser Navigation & Mapping",
      "Advanced Obstacle Detection & Avoidance",
      "Remote App Control & Map Customization",
      "One-Click Dock Control via the Screen",
      "Smart Integration with Google Assistant & Amazon Alexa",
      "3K Camera for Additional Pet Care & Home Protection",
      "Data & Privacy Protection",
    ],
    image:
      "https://lmt-web.mstatic.lv/eshop/22700/ezviz-rs-2-perspective-01.png",
  },

  {
    name: "RH2",
    type: "Vacuum & Floor Cleaner",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "4699000",
    description: [
      "Up to 72,000 RPM Brushless Motor Speed",
      "Large Dual Tanks to Separate Dirty/Clean Water",
      "Long Runtime to Clean Up to 200m²",
      "Thorough Electrolyzed Water Cleaning",
      "Self-Cleaning & Hot Air-Drying Cycle",
      "Anti-Bacteria & Anti-Odor Design",
      "Increased Dust Visibility with Built-In LED Light",
      "Smart Suction & Water Flow Control",
      "Smart Stain Sensing",
      "Upgraded Corner & Edge Cleaning",
      "Voice Prompts & LED Display",
    ],
    image:
      "https://th.bing.com/th/id/OIP.89XKERejeZIeMl6kLvkYZAHaHa?rs=1&pid=ImgDetMain",
  },

  // Accessories
  {
    name: "Solar Panel-E", //Type-c
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "549000",
    description: [
      "Energy-efficient and environmentally friendly",
      "High efficiency with monocrystalline silicon cell solutions",
      "Up to 6.18W charging for long-lasting power supply",
      "4-meter cable for installation flexibility",
      "IP65 weather-resistant protection for outdoor use",
    ],
    image:
      "https://th.bing.com/th/id/OIP.O5h8rmIAXC3QFdmU5KqanQHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "PBC24",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "1699000",
    description: [
      "Open Circuit Voltage: 18.4V (-5%, +10%)",
      "Short Circuit Current: 1.65A (-5%, +10%)",
      "Power Voltage: 15.3V (-5%, +10%)",
      "Max Power Current: 1.57A (-5%, +10%)",
      "Max. Power: 24W",
      "Battery Capacity: 75Wh (14.6V 5000mAh) rechargeable battery, battery life varies based on settings, usage & temperature",
      "Interface: One Type-C input port, two USB-A output ports",
      "Transformation Efficiency: 0.23",
      "IP Grade: IP65",
      "Operating Conditions: -20°C to 60°C (-4°F to 140°F), Humidity 90% or less (non-condensing)",
      "Working environment temperature range for battery camera charging: 0-45°C",
      "Power Supply: DC 5V/2A",
      "Material: High efficiency monocrystalline silicon cell",
    ],
    image:
      "https://th.bing.com/th/id/OIP.Ld7KkjJkiXWoiZ6I9pF5WAHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "WallMount Bracket",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "49000",
    description: [
      "Compatible with series C6CN, C6N, TY1 and TY2",
      "Model : CS-CMT-Bracket-Wall Mount",
    ],
    image:
      "https://img.lazcdn.com/g/p/3c131e2f34d4d832201958731042b775.jpg_720x720q80.jpg",
  },

  // nyari di tokped lain aku
  {
    name: "Power Extention Cable 5 Meter", //PCA-05
    type: "Cable",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0,
    price: "69900",
    description: [
      "5 Meter",
      "Power Extension Cable Accessory For Ezviz Outdoor Camera",
      "Connector DC/M5.5 to DC/F5.5 ",
      "Compatibility EZVIZ Bullet , Outdoor PT, Dome",
    ],
    image:
      "https://www.discomp.cz/ezviz-cs-cmt-pca05-extension-power-cable-5m_ig128848.jpg?attname=thumbnail&attpedid=52",
  },

  {
    name: "Power Extention Cable 10 Meter", //PCA-10
    type: "Cable",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 0, //sold out nd tokped Bandar nya
    price: "99900",
    description: [
      "10 Meter",
      "Power Extension Cable Accessory For Ezviz Outdoor Camera",
      "Connector DC/M5.5 to DC/F5.5 ",
      "Compatibility EZVIZ Bullet , Outdoor PT, Dome",
    ],
    image:
      "https://www.ittrade.cz/ezviz-cs-cmt-pca10-prodluzovaci-napajeci-kabel-10m_ies2381300.jpg",
  },

  {
    name: "Micro-SD Card 32GB",
    type: "Memory",
    condition: "new",
    minPurchase: 1,
    brand: "LEXAR",
    stock: 0, //sold out nd tokped Bandar nya
    price: "69000",
    description: [
      "32GB",
      "Class 10 UHS-I for Full HD Video",
      "Durable Design",
      "Read Speeds up to 90MB/s",
      "Write Speeds up to 20MB/s / 50MB/s",
      "High-speed, large-capacity microSD cards ideal for continuous recording",
    ],
    image:
      "https://th.bing.com/th/id/OIP.j2Pzt3_8owbDvBDjytGbtQHaH_?rs=1&pid=ImgDetMain",
  },

  {
    name: "Micro-SD Card 64GB",
    type: "Memory",
    condition: "new",
    minPurchase: 1,
    brand: "LEXAR",
    stock: 10,
    price: "99000",
    description: [
      "64GB",
      "Class 10 UHS-I for Full HD Video",
      "Durable Design",
      "Read Speeds up to 90MB/s",
      "Write Speeds up to 20MB/s / 50MB/s",
      "High-speed, large-capacity microSD cards ideal for continuous recording",
    ],
    image:
      "https://th.bing.com/th/id/OIP.bvpu5ZhHAL18Utih4dRz1gHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "Micro-SD Card 128GB",
    type: "Memory",
    condition: "new",
    minPurchase: 1,
    brand: "LEXAR",
    stock: 10,
    price: "219000",
    description: [
      "128GB",
      "Class 10 UHS-I for Full HD Video",
      "Durable Design",
      "Read Speeds up to 90MB/s",
      "Write Speeds up to 20MB/s / 50MB/s",
      "High-speed, large-capacity microSD cards ideal for continuous recording",
    ],
    image:
      "https://th.bing.com/th/id/OIP.SQi0KZFXqa10GbywFB07awHaHa?rs=1&pid=ImgDetMain",
  },

  {
    name: "Micro-SD Card 256GB",
    type: "Memory",
    condition: "new",
    minPurchase: 1,
    brand: "LEXAR",
    stock: 10,
    price: "369000",
    description: [
      "256GB",
      "Class 10 UHS-I for Full HD Video",
      "Durable Design",
      "Read Speeds up to 90MB/s",
      "Write Speeds up to 20MB/s / 50MB/s",
      "High-speed, large-capacity microSD cards ideal for continuous recording",
    ],
    image:
      "https://th.bing.com/th/id/OIP.SQi0KZFXqa10GbywFB07awHaHa?rs=1&pid=ImgDetMain",
  },
  {
    name: "Bracket Dome OEM",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "EZVIZ",
    stock: 10,
    price: "18000",
    description: [],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbHo9i0_lF-kI9btyFrCpq7WuFdXNTbh80w&s",
  },
  {
    name: "Stopkontak LB 1",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "Uticon",
    stock: 10,
    price: "12000",
    description: [],
    image:
      "https://images.tokopedia.net/img/cache/700/product-1/2019/8/2/10674936/10674936_f3667e8c-0fe4-4de6-b5ef-f838cd88eb3c_700_700",
  },
  {
    name: "Steker",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "Uticon",
    stock: 10,
    price: "10000",
    description: [],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUnhJADEVxvolBARKWv4CGxLlY57-PLQ_YhA&s",
  },
  {
    name: "Kabel Listrik",
    type: "Accessories",
    condition: "new",
    minPurchase: 1,
    brand: "-",
    stock: 100,
    price: "10000",
    description: [],
    image:
      "https://siplah-oss.tokoladang.co.id/merchant/42577/product/3SC37s0SJQttaDMmhKmGCcG24NA333TFpu8t5Xoq.jpg",
  },
];

const seedProducts = async () => {
  try {
    console.log(process.env);

    await mongoose.connect(process.env.MONGODB_URL_DEV_TEST);
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    console.log("Products seeded successfully:", createdProducts);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedProducts();
