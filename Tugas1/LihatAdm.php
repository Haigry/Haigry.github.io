<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleNav.css">
</head>
<body>
<div class="navigation">
    <a href="tampilkan_data_produk.php">Data Produk</a>
    <a href="tampilkan_data_kategori.php">Data Kategori</a>
    <a href="tampilkan_data_pengguna.php">Data Pengguna</a>
    <a href="tampilkan_data_pesanan.php">Data Pesanan</a>
    <a href="LihatAdm.php">Halaman Utama</a>
</div>
    

<div class="container">
    
<h1></h1>

<div class="container1">
<?php
    include 'koneksi.php';
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo '<div class="product-card">';
            echo '<img src="uploads/' . $row["Gambar"] . '" alt="' . $row["name"] . '">';
            echo '<h2>' . $row["name"] . '</h2>';
            echo '<p>Rp ' . $row["price"] . '</p>';
            echo '<a href="pemesanan_User.php?id=' . $row["id"] . '" class="pesan-button">Pesan</a>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
    ?>
</div>
<div class="button-group">
    <a href="index.php">Kembali</a>
</div>
</div>
</body>
</html>