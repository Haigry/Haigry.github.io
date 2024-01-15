<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleNav.css">
    <script>
        function toggleNav() {
    var nav = document.querySelector('.navigation');
    nav.classList.toggle('show');
}
    </script>
</head>
<body>

<button class="nav-toggle" onclick="toggleNav()">Toggle Navigation</button>

<div class="navigation">
    <a href="tampilkan_data_produk.php">Data Produk</a>
    <a href="tampilkan_data_kategori.php">Data Kategori</a>
    <a href="tampilkan_data_pengguna.php">Data Pengguna</a>
    <a href="tampilkan_data_pesanan.php">Data Pesanan</a>
    <a href="LihatAdm.php">Halaman Utama</a>
</div>

    <div class="container">
    <h1>Data Pengguna</h1>
            <?php
            include 'koneksi.php';

            $sql = "SELECT * FROM users";
            $result = $conn->query($sql);
            ?>

<table>
    <tr>
        <th>NO</th>
        <th>Username</th>
        <th>role</th>
        <th>Aksi</th>
    </tr>
    <?php
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>".$row["id"]."</td><td>".$row["username"]."</td><td>".$row["role"]."</td>";
            
            echo "<td>
                <a href='edit_data_pengguna.php?id=".$row['id']."'>Edit</a>
                <a href='hapus_data_pengguna.php?id=".$row['id']."'>Hapus</a>
            </td></tr>";
        }
    } else {
        echo "0 results";
    }
    ?>

</table>
    <a href="tambah_data_pengguna.php">Tambah Data</a>
    <a href="LihatAdm.php">Kembali ke halaman utama</a>
    </div>
</body>
</html>
