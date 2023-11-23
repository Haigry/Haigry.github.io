<?php
include 'koneksi.php';

$id = $_GET['id'];

$sql = "DELETE FROM users WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    header("Location: tampilkan_data_pengguna.php");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
