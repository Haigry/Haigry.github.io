<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $user['role'];

        if ($user['role'] == 'admin') {
            header("Location: LihatAdm.php");
            $_SESSION['login_message'] = 'Berhasil login sebagai admin.';
        } 
        else if ($user['role'] == 'user') {
            header("Location: Lihat.php");
            $_SESSION['login_message'] = 'Berhasil login sebagai user.';
        }
        exit();
    } else {
        $_SESSION['login_message'] = 'Error: Gagal login.';
    }

    $stmt->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <style>
        .container {
   background-color: rgba(255, 255, 255, 0.9);
   padding: 50px;
   border-radius: 20px;
   text-align: center;
   box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
   width: 20%;
   height: 70%;}
    </style>
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <form method="post">
            Username: <input type="text" name="username" required><br>
            Password: <input type="password" name="password" required><br>
            <input type="submit" value="Login">
        </form>
        <?php
        if (isset($_SESSION['login_message'])) {
            echo "<script>alert('" . $_SESSION['login_message'] . "');</script>";
            unset($_SESSION['login_message']);
        }
        ?>
        <a href="register.php">Register</a>
    </div>
</body>
</html>