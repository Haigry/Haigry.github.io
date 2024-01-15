<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $username = $_POST['username'];
    $role = $_POST['role'];

    $sql = "UPDATE users SET username='$username', role='$role' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        header("Location: tampilkan_data_pengguna.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id=$id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data Pengguna</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Edit Data Pengguna</h1>
        <form method="post">
            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
            Username: <br><input type="text" name="username" value="<?php echo $row['username']; ?>" required><br>
            Email: <br><input type="text" name="role" value="<?php echo $row['role']; ?>" required><br>
            <input type="submit" value="Simpan">
        </form>
    </div>
</body>
</html>
