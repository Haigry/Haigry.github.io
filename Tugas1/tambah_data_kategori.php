<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];

    $sql = "INSERT INTO categories (name) VALUES ('$name')";

    if ($conn->query($sql) === TRUE) {
        header("Location: tampilkan_data_kategori.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Data Kategori</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Tambah Data Kategori</h1>
        <form method="post">
            Nama: <input type="text" name="name" required><br>
            <input type="submit" value="Simpan">
        </form>
        <a href="tampilkan_data_kategori.php">Kembali ke Tampilkan Data Produk</a>
    </div>
</body>
</html>
