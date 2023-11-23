<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Produk</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .container1 {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .product-card {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            width: 200px;
            text-align: center;
            background: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .product-card img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }

        .product-card h2 {
            font-size: 1.2em;
            margin: 10px 0;
            color: #333;
        }

        .product-card p {
            font-size: 1em;
            color: #777;
        }

        .button-group {
            text-align: center;
            margin: 20px 0;
        }

        .button-group a {
            display: inline-block;
            margin: 5px;
            padding: 10px 20px;
            background-color: #632818;
            color: #f7d488;
            text-decoration: none;
            border-radius: 30px;
            font-size: 1.2em;
            transition: background-color 0.3s;
        }

        .button-group a:hover {
            background-color: #4a1c0c;
        }
    </style>
</head>
<body>

<div class="container">
    
<h1>View producks in here</h1>

<div class="container1">
<?php
    include 'koneksi.php';
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo '<div class="product-card">';
            echo '<img src="uploads/' . $row["Gambar"] . '" alt="' . $row["name"] . '">';
            echo '<h2>' . $row["name"] . '</h2>';
            echo '<p>Rp ' . $row["price"] . '</p>';
            echo '<a href="pesan.php?id=' . $row["id"] . '" class="pesan-button">Pesan</a>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
    ?>
</div>
<div class="button-group">
    <a href="index.php">Kembali</a>
</div>
</div>
</body>
</html>