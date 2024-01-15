<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];

    if ($_FILES['gambar']['size'] > 0) {
        $gambar = $_FILES['gambar']['name'];
        $lokasiGambar = $_FILES['gambar']['tmp_name'];
        $tujuan = 'uploads/' . $gambar;
        move_uploaded_file($lokasiGambar, $tujuan);

        $sql = "UPDATE products SET name='$name', price=$price, category_id=$category_id, gambar='$gambar' WHERE id=$id";
    } else {
        $sql = "UPDATE products SET name='$name', price=$price, category_id=$category_id WHERE id=$id";
    }

    if ($conn->query($sql) === TRUE) {
        header("Location: tampilkan_data_produk.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$id = $_GET['id'];
$sql = "SELECT * FROM products WHERE id=$id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data Produk</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .container img {
            max-width: 200px;
            max-height: 200px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Edit Data Produk</h1>
        <form method="post" enctype="multipart/form-data">
            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
            Nama: <br><input type="text" name="name" value="<?php echo $row['name']; ?>" required><br>
            Harga: <br><input type="text" name="price" value="<?php echo $row['price']; ?>" required><br>
            Kategori ID: <br><input type="text" name="category_id" value="<?php echo $row['category_id']; ?>" required><br>
            <label for="custom-file-upload" class="custom-upload-btn">Gambar</label> <br><br>
            <img id="previewImage" id="custom-file-upload" src="uploads/<?php echo $row['Gambar']; ?>"><br>
            <input  type="file" name="Gambar" id="custom-file-upload" onchange="previewFile()"><br>
            <input type="submit" value="Simpan">
        </form>
    </div>

    <script>
        function previewFile() {
            var preview = document.getElementById('previewImage');
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                preview.src = reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "";
            }
        }
    </script>
</body>
</html>