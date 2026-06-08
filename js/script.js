/* ================================
   JAVASCRIPT LANJUTAN — SILA
   DOM, Event Handling, CRUD, localStorage
   ================================ */

// ════════════════════════════════
// DATA LAYER (localStorage)
// localStorage adalah penyimpanan data di browser
// Data tidak hilang meskipun: halaman di-refresh, browser ditutup
// yang bertahan meskipun halaman ditutup/refresh.
// Data disimpan sebagai string JSON.
// Alur: Array → JSON → localStorage
// ════════════════════════════════


//1.Membaca data dari localstorage dan mengkonversi dari JSON ke Array
function getData(){
   const raw = localStorage.getItem('sila_data');
   //jika data-nya ada. parse JSON --> Array; jika data tidak ada kembalikan Array kosong
   return raw ? JSON.parse(raw) : [];
}

//2. Menyimpan data ke localstorage (Array --> JSon)
function saveData(){
   localStorage.setItem('sila_data', JSON.stringify(data));
}

//3.Format Data Tanggal (dd-MM-yyyy --> 04 juni 2026)
function formattanggal(datastr){
   const bulan = [
      'januari',
      'februari',
      'maret',
      'april',
      'juni',
      'juli',
      'agustus',
      'september',
      'oktober',
      'november',
      'desember',
   ];
   const d = new Date(datastr);
   return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

//4.form handling
//menangani form pengajuan: mode Tambah(create) dan mode edit (update) berdasarkan parameter URL
//tugas FORM : mengumpulkan semua input --> validasi --> create data baru --> update data --> simpan ke local storage

function iniForm(){
   const form = document.getElementById('formPengajuan')
   if (!form) return; //jika halaman tidak punya form, keluar

   //deteksi mode edit atau tidak?
   //jika parameter URL tidak ditemukan maka data lama ditampilkan, jika tdk maka adalah mode tambah (create)

   const editId = URLParams.get('edit');
   let editmode = false;
   if(editId){
      // cari item yang akan di edit berdasarkan ID
      const data = getData();
      const itemToEdit = data.find(function (item){
         return item.id == editId;
      });
      //edit data
      if (itemToEdit){
         editmode = true; //mode edit aktif
         //Isi field Form dengan data yang ada (  pre-fill)

         document.getElementById('nama').value = itemToEdit.nama || '';
         document.getElementById('nim').value = itemToEdit.nim || '';
         const prodiEL = document.getElementById('prodi');
         if (prodiEL && itemToEdit.prodi) prodiEL.value = itemToEdi.prodi || ''
         const layananEL = document.getElementById('layanan');
         if (layananEL && itemToEdit.layanan) layananEL.value = itemToEdit.layanan || ''
         document.getElementById('tanggal').value = itemToEdit.tanggal || ''
         document.getElementById('keterangan').value = itemToEdit.keterangan || ''

         //ubah tek tombol --> "simpan perubahan"
         const btnSubmit = form.querySelector('button[type="submit"]');
         if (btnSubmit) btnSubmit.innerHTML ='✏️ Simpan Perubahan'
      }
   }

   //submit (create)
   // --> menggunakan event listener untuk submit form (eventnya submit)
   //sebelum submit form akan melakukan validasi
   //saat tombol diajukan di klik : 1. ambil data dari form 2. validasi data, 3.simpan data 4. redicted ke halaman riwayat
   //struktur.addEventListener('event', function())
   form.addEventListener('submit', function(e){
      //cegah form reload halaman
      e.preventDefault();
      //1. Ambil nilai semua field
      const Nama = document.getElementById('nama').value.trim();
      const nim = document.getElementById('nim').value.trim();
      const prodi = document.getElementById('prodi').value;
      const layanan = document.getElementById('layanan').value;
      const tanggal = document.getElementById('tanggal').value;
      const keterangan = document.getElementById('keterangan').value.trim();
      const errorEL = document. getElementById('formError').value.trim();

      errorEL.textContent = ''; // reset pesan error sebelum validasi

      //validasi Form
      if(!Nama || !nim || !prodi || !layanan || !tanggal){
         errorEL.textContent = '❌ semua field wajib diisi bos!'
         return; //hentikan eksekusi jika tidak valid
      }

      //NIM harus 8 karakter
      if (nim.length !== 8 || isNaN(nim)) {
         errorEL.textContent = '❌ NIM harus terdiri dari 8 digit bos!';
         return;
      }

      //crud (create dan update)
      const data = getData();
      if(editmode){
         for (let i =0; i< data.length; i++){
            if (data[i].id == editId) {
               data[i].nama = nama;
               data[i].nim = nim;
               data[i].prodi = prodi;
               data [i].layanan = layanan
               data [i].tanggal = tanggal
               data[i].keterangan =keterangan
               break;
         }
      }
   }
   else{ //create: buat objct data yg baru}
      const item = {
         id: Date.now(), //timestamp dalam milideti dbg ID
         nama: nama,
         nim: nim,
         prodi: nim,
         layanan: layanan,
         tanggal: tanggal,
         keterangan: keterangan,
      };
      data.push(item) //tambah data ke Array
   }
   saveData(data); //simpan ke localstorage
   form.reset();
   errorEL.textContent= '';
   alert(editId ? '💯perubahan berhasil disimpan!' : '💯pengajuan berhasil dsimpan!')
   window.location.href = 'riwayat.html' // pindah halaman
});
}