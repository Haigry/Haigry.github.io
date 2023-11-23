<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $gambar = $_FILES['Gambar']['name'];
    $lokasiGambar = $_FILES['Gambar']['tmp_name'];
    $tujuan = 'uploads/' . $gambar;
    move_uploaded_file($lokasiGambar, $tujuan);

    $stmt = $conn->prepare("INSERT INTO products (name, price, category_id, gambar) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siis", $name, $price, $category_id, $gambar);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        header("Location: tampilkan_data_produk.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
        $stmt->close();
        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Data Produk</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Tambah Data Produk</h1>
        <form method="post" enctype="multipart/form-data">
            Nama: <input type="text" name="name" required><br>
            Harga: <input type="text" name="price" required><br>
            Kategori ID: <input type="text" name="category_id" required><br>
            <label for="custom-file-upload" class="custom-upload-btn">Gambar</label><br><br>
            <input type="file" name="Gambar" id="custom-file-upload" required onchange="previewImage(event)" accept="image/*">
            <img id="imagePreview" src="#" alt="Preview" style="max-width: 200px; max-height: 200px; display: none;" class="center">
            <br><br>
            <input type="submit" value="Simpan">
        </form>
        <a href="tampilkan_data_produk.php">Kembali ke Tampilkan Data Produk</a>
    </div>

    <script>
        function previewImage(event) {
            var preview = document.getElementById('imagePreview');
            var file = event.target.files[0];
            var reader = new FileReader();

            reader.onload = function() {
                preview.src = reader.result;
                preview.style.display = 'block';
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    </script>
</body>
</html>