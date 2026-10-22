import readline from "readline";
import {
    loadBooks,
    getAllBooks,
    addBook,
    searchBook,
    updateBook,
    deleteBook,
    filterBooksByCategory,
    sortBooksByPrice,
    showLowStockBooks,
    calculateStockValue
} from "./functions.js";

// Membuat interface terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menerima Input Pengguna
const ask = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
};

// Menampilkan Menu
const showMenu = () => {
    console.log("\n================================");
    console.log("     BOOKSPACE - TOKO BUKU");
    console.log("==================================");
    console.log("1. Tampilkan Semua Buku");
    console.log("2. Tambah Buku Baru");
    console.log("3. Cari Buku");
    console.log("4. Ubah Data Buku");
    console.log("5. Hapus Buku");
    console.log("6. Filter Berdasarkan Kategori");
    console.log("7. Urutkan Buku Berdasarkan Harga");
    console.log("8. Tampilkan Buku dengan Stok Rendah");
    console.log("9. Hitung Total Nilai Stok Buku");
    console.log("0. Keluar");
    console.log("==================================");
};

// MENJALANKAN PROGRAM
const runProgram = async () => {
    loadBooks();
    let isRunning = true;
    while (isRunning) {
        showMenu();
        const choice = await ask("Pilih menu (0-9): ");
        switch (choice) {
            case "1":
                getAllBooks();
                break;
            case "2": {
                const judul = await ask("Judul buku: ");
                const penulis = await ask("Nama penulis: ");
                const kategori = await ask("Kategori buku: ");
                const hargaInput = await ask("Harga buku: ");
                const stokInput = await ask("Jumlah stok: ");
                const bookData = {
                    judul,
                    penulis,
                    kategori,
                    harga: Number(hargaInput),
                    stok: Number(stokInput)
                };
                addBook(bookData);
                break;
            }
            case "3": {
                const keyword = await ask("Masukkan judul atau ID buku: ");
                if (!keyword) {
                    console.log("Kata kunci tidak boleh kosong.");
                } else {
                    searchBook(keyword);
                }
                break;
            }
            case "4": {
                const idInput = await ask(
                    "Masukkan ID buku yang ingin diubah: "
                );
                const id = Number(idInput);
                if (!Number.isInteger(id) || id <= 0) {
                    console.log("ID harus berupa bilangan bulat positif.");
                    break;
                }
                const judul = await ask("Judul baru (Enter jika tetap): ");
                const penulis = await ask("Penulis baru (Enter jika tetap): ");
                const kategori = await ask("Kategori baru (Enter jika tetap): ");
                const hargaInput = await ask("Harga baru (Enter jika tetap): ");
                const stokInput = await ask("Stok baru (Enter jika tetap): ");
                const updatedData = {};
                if (judul !== "") {
                    updatedData.judul = judul;
                }
                if (penulis !== "") {
                    updatedData.penulis = penulis;
                }
                if (kategori !== "") {
                    updatedData.kategori = kategori;
                }
                if (hargaInput !== "") {
                    updatedData.harga = Number(hargaInput);
                }
                if (stokInput !== "") {
                    updatedData.stok = Number(stokInput);
                }
                updateBook(id, updatedData);
                break;
            }
            case "5": {
                const idInput = await ask(
                    "Masukkan ID buku yang ingin dihapus: "
                );
                const id = Number(idInput);
                if (!Number.isInteger(id) || id <= 0) {
                    console.log("ID harus berupa bilangan bulat positif.");
                    break;
                }
                const confirmation = await ask(
                    "Yakin ingin menghapus buku ini? (y/n): "
                );
                if (confirmation.toLowerCase() === "y") {
                    deleteBook(id);
                } else {
                    console.log("Penghapusan dibatalkan.");
                }
                break;
            }
            case "6": {
                const category = await ask("Masukkan kategori buku: ");
                if (!category) {
                    console.log("Kategori tidak boleh kosong.");
                } else {
                    filterBooksByCategory(category);
                }
                break;
            }
            case "7":
                sortBooksByPrice();
                break;
            case "8":
                showLowStockBooks();
                break;
            case "9":
                calculateStockValue();
                break;
            case "0":
                console.log("Terima kasih telah menggunakan BookSpace!");
                isRunning = false;
                break;
            default:
                console.log("Pilihan tidak valid. Silakan pilih menu 0-9.");
        }
        if (isRunning) {
            await ask("\nTekan Enter untuk kembali ke menu...");
        }
    }
    rl.close();
};

// Menjalankan program dn enangani Eror
runProgram().catch((error) => {
    console.error("Terjadi kesalahan:", error);
    rl.close();
});