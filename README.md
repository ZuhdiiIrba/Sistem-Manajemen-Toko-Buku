# SISTEM MANAJEMEN TOKO BUKU
Program ini memungkinkan pengguna untuk mengelola data buku dengan fitur CRUD (Create, Read, Update, Delete) serta fitur tambahan seperti validasi input, penyimpanan data ke file JSON, pencarian buku, filter kategori, dan pengurutan harga buku.

## Fitur
* Menampilkan semua data buku dalam bentuk tabel.
* Menambahkan buku baru dengan validasi input.
* Mencari buku berdasarkan judul atau ID.
* Memperbarui data buku berdasarkan ID.
* Menghapus buku berdasarkan ID.
* Menampilkan daftar buku berdasarkan kategori.
* Mengurutkan buku berdasarkan harga.
* Menampilkan buku dengan stok rendah.
* Menghitung total nilai stok seluruh buku.
* Menyimpan data buku ke file `books.json`.
* Memuat data buku dari `books.json` saat program dijalankan.

## Cara Menjalankan
* Pastikan Node.js sudah terinstal.
* Buka terminal dan arahkan ke folder proyek `TokoBuku`.
* Pastikan `package.json` menggunakan `"type": "module"`.
* Jalankan program dengan perintah:

  ```bash
  node main.js
  ```

## Format Data Buku
Setiap data buku disimpan dalam bentuk object di dalam array.
```javascript
{
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    kategori: "Novel",
    harga: 85000,
    stok: 10
}
```
## Penjelasan Function CRUD
Berikut adalah fungsi-fungsi utama yang dieksekusi dalam proses manipulasi data pada aplikasi ini:
* Create (Tambah Data): Mengonfirmasi dan mengeksekusi penambahan data buku baru (input judul, penulis, kategori, harga, stok) yang dimasukkan pengguna, lalu menyimpannya ke dalam Array setelah lolos validasi input.
* Read (Tampilkan Data): Mengeksekusi proses pembacaan seluruh data dari Array dan menampilkannya secara rapi ke dalam bentuk tabel di terminal agar pengguna bisa melihat semua koleksi buku.
* Update (Ubah Data): Mengeksekusi pencarian data buku spesifik berdasarkan ID yang dimasukkan pengguna, lalu memperbarui informasi detail buku tersebut (seperti harga atau stok) dengan data yang baru.
* Delete (Hapus Data): Mengeksekusi proses penghapusan data buku tertentu secara permanen dari dalam Array berdasarkan ID buku yang dipilih.

## Struktur Project
* `data.js` → Berisi array data buku awal.
* `functions.js` → Berisi fungsi CRUD dan fitur tambahan.
* `main.js` → Program utama interaktif melalui CLI.
* `package.json` → Konfigurasi project Node.js.
* `books.json` → File penyimpanan data buku.
* `README.md` → Penjelasan project.

## Penggunaan
1. Jalankan program melalui terminal.
2. Pilih menu sesuai operasi yang ingin dilakukan.
3. Ikuti instruksi yang muncul di layar.
4. Pilih menu keluar untuk mengakhiri program.

## Requirements
* Node.js.
* Terminal atau PowerShell.

## Author
* Nama: Zuhdii Irba Tsana
* Tema Proyek: Sistem Manajemen Toko Buku.
* Kelas: Trial Study Club Backend Basic KSM Veterabtech UPNVJ 2026.
* Mentor : Kak Nadia
