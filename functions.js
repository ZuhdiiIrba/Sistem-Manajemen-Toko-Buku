import fs from "fs";
import { books } from "./data.js";

//menyimpan Data ke file Json
export const saveBooksToFile = () => {
    fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
    console.log("Data buku berhasil disimpan ke books.json");
};

// Load Data dari File JSON
export const loadBooks = () => {
    if (fs.existsSync("books.json")) {
        try {
            const data = fs.readFileSync("books.json", "utf8");
            const savedBooks = JSON.parse(data);

            if (Array.isArray(savedBooks)) {
                books.splice(0, books.length, ...savedBooks);
                console.log("Data buku berhasil dimuat.");
                return;
            }
        } catch (error) {
            console.log("File data tidak dapat dibaca.");
        }
    }
    saveBooksToFile();
};

// Read : Menampilkan semua Buku
export const getAllBooks = () => {
    if (books.length === 0) {
        console.log("Belum ada data boku.");
        return;
    }
     const bookList = books.map((book) => ({
        ID: book.id,
        Judul: book.judul,
        Penulis: book.penulis,
        Kategori: book.kategori,
        Harga: `Rp${book.harga.toLocaleString("id-ID")}`,
        Stok: book.stok
    }));
    console.table(bookList);
};

// Create : menambahkan buku
export const addBook = (bookData) => {
    const {judul, penulis, kategori, harga, stok} = bookData;
    if (!judul || !penulis || !kategori) {
        console.log("Judul, penulis, dan kategori wajib diisi.");
        return;
    }
    if (!Number.isFinite(harga) || harga <= 0 || !Number.isInteger(stok) || stok < 0) {
        console.log("Harga atau stok tidak valid.");
        return;
    }
    const newId = books.length === 0 ? 1 : Math.max(...books.map((book) => book.id)) + 1;
    const newBook = {
        id: newId,
        judul,
        penulis,
        kategori,
        harga,
        stok
    };
    books.push(newBook);
    saveBooksToFile();
    console.log(`Buku "${judul}" berhasil ditambahkan.`);
};

// Search: Mencari Buku
export const searchBook = (keyword) => {
    const searchResult = books.filter((book) =>
    book.judul.toLowerCase().includes(keyword.toLowerCase()) ||
    String(book.id) === keyword
);
if (searchResult.length === 0) {
    console.log("Buku tidak ditemukan.");
    return;
}
console.table(searchResult);
};

//Update : mengubah data buku
export const updateBook = (id, updatedData) => {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
        console.log("ID buku tidak ditemukan.");
        return;
    }
    const { judul, penulis, kategori, harga, stok } = updatedData;

    if (
        (judul !== undefined && !judul.trim()) ||
        (penulis !== undefined && !penulis.trim()) ||
        (kategori !== undefined && !kategori.trim())
    ) {
        console.log("Data teks tidak boleh kosong.");
        return;
    }
    if (
        (harga !== undefined &&
            (!Number.isFinite(harga) || harga <= 0)) ||
        (stok !== undefined &&
            (!Number.isInteger(stok) || stok < 0))
    ) {
        console.log("Harga atau stok tidak valid.");
        return;
    }

    const updatedBook = {...books[index], ...updatedData};
    books[index] = updatedBook;
    saveBooksToFile();
    console.log(`Data buku dengan ID ${id} berhasil diubah.`);
};
//Delete : menghapus buku
export const deleteBook = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
        console.log("ID buku tidak ditemukan.");
        return;
    }
    const deletedBook = books[index];
    books.splice(index, 1);
    saveBooksToFile();
    console.log(`Buku "${deletedBook.judul}" berhasil dihapus.`);
};
//Filter berdasarkan kategori
export const filterBooksByCategory = (category) => {
    const result = books.filter((book) =>
        book.kategori.toLowerCase() === category.toLowerCase()
    );
    if (result.length === 0) {
        console.log("Buku dengan kategori tersebut tidak ditemukan.");
        return;
    }
    console.table(result);
};

//Mengurutkan buku berdasarkan harga
export const sortBooksByPrice = () => {
    const sortedBooks = [...books].sort(
        (a, b) => a.harga - b.harga
    );
    console.table(sortedBooks);
};

//Menampilkan buku dengan stok rendah
export const showLowStockBooks = () => {
    const lowStockBooks = books.filter((book) => book.stok < 5);
    if (lowStockBooks.length === 0) {
        console.log("Tidak ada buku dengan stok rendah.");
        return;
    }
    console.table(lowStockBooks);
};

//Menghitung total nilai stok
export const calculateStockValue = () => {
    const total = books.reduce((sum, book) => sum + book.harga * book.stok,0 );
    console.log(
        `Total nilai stok seluruh buku: Rp${total.toLocaleString("id-ID")}`
    );
};