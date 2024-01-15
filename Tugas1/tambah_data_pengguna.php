<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>alert('Username is already taken. Please choose another.');</script>";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $hashedPassword, $role);
    
        if ($stmt->execute()) {
            echo "<script>alert('Registrasi berhasil. Kamu sudah dapat login.');</script>";
        } else {
            echo "<script>alert('Error: gagal login.');</script>";
        }
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>User Registration</h1>
        <form method="post">
            Username: <input type="text" name="username" required><br>
            Password: <input type="password" name="password" required><br>
            Role: <br>
            <label><input type="radio" name="role" value="user" checked> User</label>
            <label><input type="radio" name="role" value="admin"> Admin</label><br><br>
            <input type="submit" value="Register">
        </form>
        <a href="tampilkan_data_pengguna.php">Kembali ke Tampilkan Data Produk</a>
    </div>
</body>
</html>
