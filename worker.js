const { parentPort, workerData } = require("worker_threads"); // Import parentPort untuk komunikasi dengan thread utama dan menerima data tambahan dari thread utama, seperti angka awal dan akhir.

let sum = 0; // Variabel untuk menampung penjumlahan yang dilakukan oleh perulangan
for (let i = workerData.start; i <= workerData.end; i++) {
    sum += i; // Melakukan penjumlahan variabel sum dengan nilai i yang ditentukan berdasarkan nilai awal dan akan bertambah terus hingga nilai i sama besar dengan nilai akhir.
}


parentPort.postMessage(sum); // Komunikasi dengan thread utama setelah proses selesai dieksekusi dengan mengirim hasil penjumlahan yang ada pada variabel sum.