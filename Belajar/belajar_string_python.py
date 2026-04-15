# ============================================================
#   MODUL BELAJAR PYTHON: STRING & REGULAR EXPRESSION
#   Mencakup 5 Topik Utama:
#     1. Pengenalan String
#     2. Mengakses & Memanipulasi String
#     3. Operator & Metode String
#     4. Parsing String
#     5. Regular Expression (Regex)
# ============================================================


# ============================================================
# BAB 1: PENGENALAN STRING
# ============================================================

# String adalah tipe data untuk menyimpan teks (urutan karakter).
# Ditulis di antara tanda kutip tunggal (' ') atau ganda (" ").

# --- 1.1 Cara Membuat String ---
teks1 = 'Halo Dunia'          # kutip tunggal
teks2 = "Belajar Python"      # kutip ganda
teks3 = '''Ini adalah string  # triple quotes -> bisa multi-baris
lebih dari satu baris'''
teks4 = ''                    # string kosong

print(teks1)
print(teks2)
print(teks3)
print(type(teks1))            # Output: <class 'str'>

# --- 1.2 Escape Character ---
# Karakter khusus yang disisipkan menggunakan backslash (\)

print('Baris 1\nBaris 2')     # \n = baris baru (newline)
print('Nama:\tBudi')          # \t = tab
print('C:\\Users\\Budi')      # \\ = karakter backslash
print('Ini adalah \'contoh\' escape')  # \' = kutip tunggal


# ============================================================
# BAB 2: MENGAKSES & MEMANIPULASI STRING
# ============================================================

# --- 2.1 Indexing (Mengakses Karakter) ---
# Indeks dimulai dari 0 (dari depan) atau -1 (dari belakang).
# Contoh: 'Python' -> P=0, y=1, t=2, h=3, o=4, n=5
#                     P=-6, y=-5, t=-4, h=-3, o=-2, n=-1

teks = 'Python'
print(teks[0])    # P  -> karakter pertama
print(teks[1])    # y  -> karakter kedua
print(teks[5])    # n  -> karakter terakhir (indeks positif)
print(teks[-1])   # n  -> karakter terakhir (indeks negatif)
print(teks[-2])   # o  -> karakter kedua dari belakang
print(teks[-6])   # P  -> karakter pertama (indeks negatif)

# --- 2.2 Slicing (Memotong String) ---
# Sintaks: teks[start : stop : step]
#   start = indeks awal (inklusif), default 0
#   stop  = indeks akhir (eksklusif), default akhir string
#   step  = langkah/jeda antar karakter, default 1

teks = 'Belajar Python'
print(teks[0:7])    # 'Belajar'  -> indeks 0 s/d 6
print(teks[8:])     # 'Python'   -> dari indeks 8 sampai akhir
print(teks[:7])     # 'Belajar'  -> dari awal s/d indeks 6
print(teks[-6:])    # 'Python'   -> 6 karakter dari belakang
print(teks[::2])    # setiap 2 karakter sekali
print(teks[::-1])   # membalik seluruh string

# --- 2.3 Manipulasi Dasar ---
nama = 'Budi Santoso'

print(len(nama))            # 12          -> panjang string
print(nama.upper())         # BUDI SANTOSO -> semua huruf besar
print(nama.lower())         # budi santoso -> semua huruf kecil
print(nama.title())         # Budi Santoso -> huruf depan tiap kata kapital
print(nama.swapcase())      # bUDI sANTOSO -> balik besar/kecil

# Menghapus spasi di tepi string
teks = '  Halo  '
print(teks.strip())         # 'Halo'   -> hapus spasi kiri & kanan
print(teks.lstrip())        # 'Halo  ' -> hapus spasi kiri saja
print(teks.rstrip())        # '  Halo' -> hapus spasi kanan saja


# ============================================================
# BAB 3: OPERATOR & METODE STRING
# ============================================================

# --- 3.1 Operator String ---
a = 'Hello'
b = ' World'

print(a + b)            # 'Hello World'  -> penggabungan (+)
print('Ha' * 3)         # 'HaHaHa'       -> pengulangan (*)
print('ell' in a)       # True           -> cek keanggotaan (in)
print('xyz' in a)       # False
print('xyz' not in a)   # True           -> cek bukan anggota (not in)
print('abc' == 'abc')   # True           -> perbandingan (==)
print('abc' < 'abd')    # True           -> bandingkan karakter per karakter

# --- 3.2 Metode String Penting ---
kalimat = 'belajar python itu menyenangkan'

# find()       -> mencari posisi pertama substring, kembalikan -1 jika tidak ada
print(kalimat.find('python'))       # 8

# index()      -> seperti find(), tapi raise ValueError jika tidak ada
# print(kalimat.index('java'))      # -> ValueError

# count()      -> menghitung berapa kali substring muncul
print(kalimat.count('a'))           # 4

# replace()    -> mengganti substring dengan string lain
baru = kalimat.replace('python', 'Java')
print(baru)                         # 'belajar Java itu menyenangkan'

# split()      -> memecah string menjadi list berdasarkan pemisah
kata_kata = kalimat.split(' ')
print(kata_kata)                    # ['belajar', 'python', 'itu', 'menyenangkan']

# join()       -> menggabungkan list menjadi string dengan pemisah tertentu
print(', '.join(kata_kata))         # 'belajar, python, itu, menyenangkan'

# startswith() -> cek apakah string diawali dengan substring tertentu
print(kalimat.startswith('belajar'))  # True

# endswith()   -> cek apakah string diakhiri dengan substring tertentu
print(kalimat.endswith('kan'))        # True

# isdigit()    -> True jika semua karakter adalah digit
print('123'.isdigit())    # True
print('12a'.isdigit())    # False

# isalpha()    -> True jika semua karakter adalah huruf
print('abc'.isalpha())    # True

# isalnum()    -> True jika semua karakter huruf dan/atau angka
print('abc123'.isalnum())  # True

# center()     -> tempatkan string di tengah dengan padding
print('Hi'.center(10, '-'))  # '----Hi----'

# zfill()      -> isi sisi kiri dengan angka nol
print('42'.zfill(5))         # '00042'

# --- 3.3 String Formatting ---
nama  = 'Siti'
usia  = 20
nilai = 95.5

# f-string (Python 3.6+) -> cara paling modern & direkomendasikan
print(f'Nama: {nama}, Usia: {usia} tahun')  # langsung masukkan variabel
print(f'Nilai: {nilai:.1f}')                 # .1f = 1 angka desimal

# format() -> cara alternatif dengan placeholder {}
print('Nama: {}, Usia: {} tahun'.format(nama, usia))

# % operator -> cara lama, masih umum ditemui
print('Nama: %s, Usia: %d' % (nama, usia))  # %s=string, %d=integer

# Format angka
angka = 1234567.89
print(f'{angka:,.2f}')   # '1,234,567.89' -> format ribuan + 2 desimal
print(f'{angka:e}')      # '1.234568e+06'  -> notasi ilmiah


# ============================================================
# BAB 4: PARSING STRING
# ============================================================
# Parsing = proses mengurai/mengekstrak informasi dari string.
# Berguna saat memproses data teks seperti CSV, log, konfigurasi, dll.

# --- 4.1 Parsing dengan split() ---

# Contoh parsing data CSV sederhana
data_csv = 'Budi,25,Jakarta,Programmer'
kolom = data_csv.split(',')         # pisahkan berdasarkan koma
print('Nama    :', kolom[0])        # Budi
print('Usia    :', kolom[1])        # 25
print('Kota    :', kolom[2])        # Jakarta
print('Pekerjaan:', kolom[3])       # Programmer

# split() dengan maxsplit -> batasi jumlah pemisahan
teks = 'apple:banana:cherry:date'
hasil = teks.split(':', 2)          # hanya 2 kali split
print(hasil)                        # ['apple', 'banana', 'cherry:date']

# --- 4.2 Parsing Tanggal & Waktu ---
from datetime import datetime

# Cara manual dengan split
tanggal_str = '15/04/2024'
bagian = tanggal_str.split('/')
hari   = int(bagian[0])
bulan  = int(bagian[1])
tahun  = int(bagian[2])
print(f'Hari: {hari}, Bulan: {bulan}, Tahun: {tahun}')

# Cara modern dengan datetime.strptime (direkomendasikan)
# strptime -> parse string menjadi objek datetime
tanggal = datetime.strptime('15/04/2024', '%d/%m/%Y')
print(tanggal.strftime('%d %B %Y'))  # '15 April 2024'
print(tanggal.year)                  # 2024

# --- 4.3 Parsing Data Terstruktur ---

# Parsing log file sederhana
log = '[ERROR] 2024-04-15 10:30:22 - File not found: data.txt'
bagian = log.split(']')
level = bagian[0].replace('[', '').strip()   # ambil level log
sisa  = bagian[1].strip()                    # ambil sisa informasi
print('Level:', level)       # ERROR
print('Sisa info:', sisa)    # 2024-04-15 10:30:22 - File not found: data.txt

# Parsing data multi-baris (key: value)
data = '''
Nama: Andi Setiawan
Email: andi@email.com
Telepon: 08123456789
'''
for baris in data.strip().split('\n'):
    if ':' in baris:
        kunci, nilai = baris.split(':', 1)  # maxsplit=1 agar nilai tetap utuh
        print(f'{kunci.strip()} => {nilai.strip()}')
# Output:
# Nama => Andi Setiawan
# Email => andi@email.com
# Telepon => 08123456789


# ============================================================
# BAB 5: REGULAR EXPRESSION (REGEX)
# ============================================================
# Regex = pola teks untuk mencari, mencocokkan, dan memanipulasi string.
# Python menyediakan modul 're' untuk keperluan ini.

import re

# --- 5.1 Karakter Spesial Regex ---
# .       = karakter apa saja (kecuali newline)
# ^       = awal string
# $       = akhir string
# *       = 0 atau lebih pengulangan
# +       = 1 atau lebih pengulangan
# ?       = 0 atau 1 pengulangan (opsional)
# \d      = digit (0-9)
# \D      = bukan digit
# \w      = huruf, angka, atau underscore
# \W      = bukan \w
# \s      = whitespace (spasi, tab, dll)
# \S      = bukan whitespace
# [abc]   = salah satu dari a, b, atau c
# [^abc]  = bukan a, b, atau c
# {n}     = tepat n kali
# {n,m}   = antara n dan m kali
# (pola)  = grup / capture group
# a|b     = a atau b

# --- 5.2 Fungsi-Fungsi re ---
teks = 'Nomor HP: 08123456789 dan 08987654321'

# re.search() -> mencari pola pertama kali (di mana saja dalam string)
hasil = re.search(r'\d+', teks)
if hasil:
    print('Ditemukan:', hasil.group())   # 08123456789
    print('Posisi:', hasil.span())       # (10, 21)

# re.findall() -> mencari SEMUA kemunculan pola, kembalikan list
semua_nomor = re.findall(r'\d+', teks)
print('Semua nomor:', semua_nomor)       # ['08123456789', '08987654321']

# re.match() -> cocokkan pola hanya dari AWAL string
kalimat = 'Python sangat keren'
cocok = re.match(r'Python', kalimat)
print('Match:', cocok.group() if cocok else 'Tidak ditemukan')  # Python

# re.sub() -> ganti semua kemunculan pola dengan string lain
sensor = re.sub(r'\d', '*', teks)
print('Tersensor:', sensor)
# 'Nomor HP: *********** dan ***********'

# --- 5.3 Validasi dengan Regex ---

# Validasi format email
def validasi_email(email):
    pola = r'^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$'
    # ^         = harus dari awal string
    # [\w.-]+   = 1+ karakter (huruf/angka/titik/dash)
    # @         = karakter @
    # \.[a-zA-Z]{2,} = titik lalu 2+ huruf (misal .com, .co.id)
    # $         = harus sampai akhir string
    return bool(re.match(pola, email))

print(validasi_email('user@email.com'))     # True
print(validasi_email('bukan-email'))        # False
print(validasi_email('nama@domain.co.id'))  # True

# Validasi nomor HP Indonesia
def validasi_hp(nomor):
    pola = r'^(08|\+628|628)\d{8,11}$'
    # Dimulai dengan 08 atau +628 atau 628
    # Diikuti 8-11 digit angka
    return bool(re.match(pola, nomor))

print(validasi_hp('081234567890'))    # True
print(validasi_hp('07123456789'))     # False
print(validasi_hp('+6281234567890'))  # True

# --- 5.4 Grup dalam Regex ---
# Grup () digunakan untuk menangkap bagian tertentu dari pola.

teks = 'Tanggal lahir: 15-04-2001'

# Grup biasa -> akses dengan .group(1), .group(2), dst
pola = r'(\d{2})-(\d{2})-(\d{4})'
hasil = re.search(pola, teks)
if hasil:
    print('Tanggal penuh:', hasil.group(0))  # 15-04-2001 (seluruh match)
    print('Hari  :', hasil.group(1))          # 15
    print('Bulan :', hasil.group(2))          # 04
    print('Tahun :', hasil.group(3))          # 2001

# Named groups -> akses dengan nama yang lebih deskriptif
pola2 = r'(?P<hari>\d{2})-(?P<bulan>\d{2})-(?P<tahun>\d{4})'
hasil2 = re.search(pola2, teks)
if hasil2:
    print('Hari (named) :', hasil2.group('hari'))    # 15
    print('Tahun (named):', hasil2.group('tahun'))   # 2001

# --- 5.5 Flag Regex ---
# Flag mengubah cara kerja pola regex.

teks = 'Python PYTHON python PyThOn'

# re.IGNORECASE (re.I) -> abaikan perbedaan huruf besar/kecil
hasil = re.findall(r'python', teks, re.IGNORECASE)
print('Case-insensitive:', hasil)
# ['Python', 'PYTHON', 'python', 'PyThOn']

# re.MULTILINE (re.M) -> ^ dan $ berlaku untuk setiap baris
multi = '''baris pertama
baris kedua
baris ketiga'''
hasil2 = re.findall(r'^baris', multi, re.MULTILINE)
print('Awal setiap baris:', hasil2)   # ['baris', 'baris', 'baris']

# re.DOTALL (re.S) -> titik (.) cocok dengan newline juga
teks2 = 'Awal\nTengah\nAkhir'
hasil3 = re.search(r'Awal.+Akhir', teks2, re.DOTALL)
print('DOTALL:', hasil3.group() if hasil3 else 'Tidak ditemukan')
# 'Awal\nTengah\nAkhir'


# ============================================================
# BONUS: LATIHAN SOAL (JAWABAN)
# ============================================================

# Soal 1: Tampilkan inisial dari nama lengkap
def inisial(nama_lengkap):
    kata = nama_lengkap.split()
    return '.'.join(k[0].upper() for k in kata) + '.'

print(inisial('Budi Santoso'))         # B.S.
print(inisial('Andi Budi Candra'))     # A.B.C.

# Soal 2: Cek apakah kata adalah palindrom
def is_palindrom(kata):
    kata = kata.lower()
    return kata == kata[::-1]          # bandingkan dengan kebalikannya

print(is_palindrom('radar'))   # True
print(is_palindrom('python'))  # False
print(is_palindrom('kasur rusak'))  # False (cek kata utuh)

# Soal 3: Parsing string dengan pemisah |
data = 'Andi|Jakarta|Dokter'
nama_p, kota, profesi = data.split('|')
print(f'Nama: {nama_p}, Kota: {kota}, Profesi: {profesi}')

# Soal 4: Cari semua alamat email dalam paragraf
paragraf = 'Hubungi kami di info@perusahaan.com atau support@help.co.id untuk bantuan.'
emails = re.findall(r'[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}', paragraf)
print('Email ditemukan:', emails)

# Soal 5: Validator kata sandi
def validasi_password(password):
    if len(password) < 8:
        return False, 'Minimal 8 karakter'
    if not re.search(r'[A-Z]', password):
        return False, 'Harus ada huruf besar'
    if not re.search(r'\d', password):
        return False, 'Harus ada angka'
    return True, 'Password valid!'

print(validasi_password('abc123'))        # False - terlalu pendek
print(validasi_password('abcdefgh'))      # False - tidak ada huruf besar & angka
print(validasi_password('Abcdefg1'))      # True


# ============================================================
# TIPS BELAJAR
# ============================================================
# 1. Praktikkan setiap contoh kode langsung di Python.
# 2. Gunakan https://regex101.com untuk uji coba regex secara interaktif.
# 3. String di Python bersifat IMMUTABLE (tidak bisa diubah langsung).
#    Setiap operasi pada string selalu menghasilkan string BARU.
# 4. Ketik help(str) di Python untuk melihat semua metode string.
