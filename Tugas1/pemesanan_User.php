<?php
// pesan.php

include 'koneksi.php';

// Periksa apakah parameter id ada di URL
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $product_id = $_GET['id'];

    // Ambil data produk berdasarkan ID
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
    } else {
        echo "Produk tidak ditemukan.";
        exit;
    }
    $stmt->close();
} else {
    echo "ID produk tidak valid.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Produk</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Pesan Produk</h1>
    <div class="product-card">
        <img src="uploads/<?php echo $product['Gambar']; ?>" alt="<?php echo $product['name']; ?>">
        <h2><?php echo $product['name']; ?></h2>
        <p>Rp <?php echo $product['price']; ?></p>
        <form method="post" action="proses_pesan.php">
            <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
            Jumlah Pesanan: <input type="number" name="quantity" required><br>
            <input type="submit" value="Pesan">
        </form>
    </div>
    <div class="button-group">
        <a href="index.php">Kembali</a>
    </div>
</div>

</body>
</html>
