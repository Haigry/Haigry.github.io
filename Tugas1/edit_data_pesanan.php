<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $user_id = $_POST['user_id'];
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $total_price = $_POST['total_price'];

    $sql = "UPDATE orders SET user_id=$user_id, product_id=$product_id, quantity=$quantity, total_price=$total_price WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        header("Location: tampilkan_data_pesanan.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$id = $_GET['id'];
$sql = "SELECT * FROM orders WHERE id=$id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data Pesanan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Edit Data Pesanan</h1>
        <form method="post">
            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
            User ID: <br><input type="text" name="user_id" value="<?php echo $row['user_id']; ?>" required><br>
            Product ID: <br><input type="text" name="product_id" value="<?php echo $row['product_id']; ?>" required><br>
            Quantity: <br><input type="text" name="quantity" value="<?php echo $row['quantity']; ?>" required><br>
            Total Price: <br><input type="text" name="total_price" value="<?php echo $row['total_price']; ?>" required><br>
            <input type="submit" value="Simpan">
        </form>
    </div>
</body>
</html>
