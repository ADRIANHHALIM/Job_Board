# 🚀 WorkQuest - Job Portal

WorkQuest adalah platform portal pekerjaan yang memungkinkan pengguna untuk mencari dan memposting lowongan pekerjaan dengan mudah. Aplikasi ini dikembangkan menggunakan **Next.js** sebagai frontend dan menggunakan **Node.js dengan Express** sebagai backend. Autentikasi pengguna dan state management dikelola menggunakan **Firebase Auth** dan **Context API**.

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🏗️ **Tech Stack & Integrasi**

### **Frontend (Next.js & React)**
- **Next.js 14** - Framework React untuk SSR & SSG.
- **React Hook Form** - Validasi dan manajemen form yang efisien.
- **Framer Motion** - Animasi interaktif dan smooth UI.
- **Lucide Icons** - Ikon modern dan ringan untuk UI.
- **Tailwind CSS** - Styling cepat dengan utility-first.
- **ShadCN** - UI component untuk tampilan profesional.
- **Context API** - State management untuk autentikasi.
- **NextAuth.js (opsional)** - Jika menggunakan OAuth seperti Google/Facebook.

### **Backend (Node.js & Express)**
- **Express.js** - Framework backend ringan untuk API.
- **MongoDB dengan Mongoose** - Database NoSQL untuk menyimpan data pekerjaan & user.
- **Firebase Auth** - Autentikasi user berbasis email/password dan OAuth.
- **Cloudinary (opsional)** - Untuk mengelola unggahan gambar pekerjaan.
- **JWT (Json Web Token)** - Token-based authentication untuk API security.

### **Deployment**
- **Vercel** - Hosting frontend dengan performa tinggi.
- **Railway / Render / AWS** - Hosting backend dan database.
- **MongoDB Atlas** - Database NoSQL berbasis cloud.

---

## ⚡ **Fitur Utama**
- ✅ **Autentikasi User** - Login & Register menggunakan Firebase Auth.
- ✅ **Mode Terang & Gelap** - Implementasi dark mode dengan localStorage.
- ✅ **Posting Lowongan Kerja** - Pengguna dapat menambahkan pekerjaan.
- ✅ **Pencarian Pekerjaan** - Cari pekerjaan berdasarkan kategori dan kata kunci.
- ✅ **Responsif & Animasi Halus** - UI interaktif dengan Framer Motion.
- ✅ **Navigasi Dinamis** - Navbar yang berubah saat login/logout.

---

## 🚀 **Cara Menjalankan Proyek Secara Lokal**
### **1️⃣ Clone Repository**
```bash
git clone https://github.com/username/workquest.git
cd workquest

