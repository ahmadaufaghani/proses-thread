const { Worker } = require("worker_threads"); // Import worker thread yang akan digunakan untuk memecah proses.
const prompt = require("prompt-sync")(); // Import prompt sync untuk menerima input dari pengguna.

console.log("==========================================");
console.log("=== PROGRAM PENJUMLAHAN DENGAN THREAD ====");
console.log("==========================================");
const first = Number(prompt("Masukkan angka awal: ")); // Meminta input angka mulai.
const last = Number(prompt("Masukkan angka akhir: ")); // Meminta input angka yang dituju.


const numThreads = 4; // Pendefinisian banyak thread yang ingin digunakan.

let total = 0; // Menampung hasil penjumlahan secara global.

let jumlahPerhitungan = 0; // Counter untuk mengecek apakah eksekusi sesuai dengan thread yang digunakan.

const range = Math.floor(last / numThreads); // Menentukan pembagian range/bagian proses yang harus dieksekusi oleh masing-masing thread.

let newStart = first; // Pendefinisian angka mulai untuk thread pertama sesuai inputan dari variabel first.

// Perulangan agar masing-masing thread dapat mengeksekusi proses sesuai range/pembagian yang telah ditentukan sebelumnya.
for (let i = 0; i < numThreads; ++i) {

    // Pendefinisian angka akhir pada masing-masing thread (kecuali thread terakhir) sesuai range/pembagian yang telah ditentukan sebelumnya.
    let newEnd = newStart + range - 1;
    
    // Pendefinisian angka akhir pada thread terakhir yang di mana akan mengeksekusi sisa dari proses yang ada.
    if(i === numThreads - 1) {
        newEnd = last;
    }
    
    // Tahap di mana pengeksekusian proses terjadi berdasarkan angka awal dan akhir yang telah ditentukan sebelumnya pada masing-masing thread di luar thread utama.  
    const worker = new Worker("./worker.js", {
        workerData: { start: newStart, end: newEnd }
    });
    
    // Tahap di mana masing-masing thread yang telah selesai melakukan eksekusi proses, maka akan mengirimkan pesan pada thread utama dan hasil perhitungan akan ditambahkan pada variabel total yang bersifat global serta variabel jumlahPerhitungan diperbarui sejalan dengan selesainya masing-masing proses yang telah dibagi.
    worker.on("message", (data) => {
        total += data;
        jumlahPerhitungan++;

        // Untuk mengecek apakah seluruh proses telah selesai dengan membandingkan variabel jumlahPerhitungan dan numThreads serta menampilkan hasil penjumlahan.
        if(jumlahPerhitungan === numThreads) {
            console.log(`Hasil penjumlahan : ${total}`);
        }
        
    });
    
    // Pendefinisian ulang angka mulai untuk masing-masing thread selanjutnya sesuai range/pembagian yang telah ditentukan sebelumnya.
    newStart += range; 
}
