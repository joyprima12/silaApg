// Konstanta 
const LAYANAN = ['SKA', 'CAK', 'TNM', 'PDA'];
// Fungsi: format tanggal mengubah '2026-10-01' jadi '1 Okt 2026' 
function formatTanggal(dateStr) {
    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul',
        'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = new Date(dateStr);
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' +
        d.getFullYear();
}

// Fungsi: validasi form (dipanggil oleh tag form onsubmit) 
function validasiForm() {
    const namalengkap = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const prodi = document.getElementById('prodi').value;
    const layanan = document.getElementById('layanan').value;
    const tanggal = document.getElementById('tanggal').value;
    // Berlanjut ke validasi... 

    if (namalengkap === '' || nim === '' || prodi === '' || layanan === '' ||
        tanggal === '') {
        alert('❌ Semua field wajib diisi!');
        return false; / Mencegah submit halaman! /
    }
}

 if (nim.length !== 8 || isNaN(nim)) { 
        alert('❌ NIM harus terdiri dari 8 digit angka!'); 
        return false; 
    }

    // Berhasil (jika tak ada return false dari dua pencegat di atas) 
    alert(' Pengajuan berhasil!\n\n' + 
        'Nama: ' + nama + '\n' + 
        'NIM: ' + nim + '\n' + 
        'Prodi: ' + prodi + '\n' + 
        'Layanan: ' + layanan + '\n' + 
        'Tanggal: ' + formatTanggal(tanggal)); 
 
    return true; / Yes, form sah dikirim /

// Berhasil 
    console.log("Data Pengajuan:", { 
        namalengkap: nama, 
        nim: nim, 
        prodi: prodi, 
        layanan: layanan, 
        tanggal: formatTanggal(tanggal) 
    }); 
 
    // Mengembalikan false agar form tidak disubmit dan halaman tidak 
ter-refresh 
    return false; 




