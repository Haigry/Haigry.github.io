<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Memastikan variabel yang digunakan tersedia dan tidak null
    $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;
    $product_id = isset($_POST['product_id']) ? $_POST['product_id'] : null;
    $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : null;
    $total_price = isset($_POST['total_price']) ? $_POST['total_price'] : null;

    // Memastikan semua field diisi
    if ($user_id === null || $product_id === null || $quantity === null || $total_price === null) {
        echo "Error: Semua field harus diisi";
        exit();
    }

    // Persiapan statement SQL dengan prepared statement untuk menghindari SQL injection
    $stmt = $conn->prepare("INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)");
    
    // Binding parameter ke prepared statement
    $stmt->bind_param("iiid", $user_id, $product_id, $quantity, $total_price);

    try {
        // Eksekusi statement
        if ($stmt->execute()) {
            // Jika berhasil, redirect ke halaman tampilkan_data_pesanan.php
            header("Location: Lihat.php");
            exit();
        } else {
            echo "Error: Gagal menambahkan pesanan";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

    // Menutup statement
    $stmt->close();
}
?>