<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST['user_id'];
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $total_price = $_POST['total_price'];

    $sql = "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($user_id, $product_id, $quantity, $total_price)";

    if ($conn->query($sql) === TRUE) {
        header("Location: tampilkan_data_pesanan.php");
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
    <title>Tambah Data Pesanan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Tambah Data Pesanan</h1>
        <form method="post">
            User ID: <input type="text" name="user_id" required><br>
            Product ID: <input type="text" name="product_id" required><br>
            Quantity: <input type="text" name="quantity" required><br>
            Total Price: <input type="text" name="total_price" required><br>
            <input type="submit" value="Simpan">
        </form>
        <a href="tampilkan_data_pesanan.php">Kembali ke Tampilkan Data Produk</a>
    </div>
</body>
</html>
