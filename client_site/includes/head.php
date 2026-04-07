<?php
$pageTitle = $pageTitle ?? 'Critter Haven Crafts';
$pageDescription = $pageDescription ?? 'Critter Haven Crafts - Unique handmade crafts and artisan products. Discover one-of-a-kind jewelry, home decor, and gifts crafted with care.';
$ogTitle = $ogTitle ?? $pageTitle;
$ogDescription = $ogDescription ?? $pageDescription;
$ogImage = $ogImage ?? 'documentation/logo.png';
$ogUrl = $ogUrl ?? 'https://CritterHavencrafts.com';
$ogType = $ogType ?? 'website';
?>
<head>
    <meta charset="UTF-8">
    <meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($ogTitle) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($ogDescription) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($ogImage) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($ogUrl) ?>">
    <meta property="og:type" content="<?= htmlspecialchars($ogType) ?>">

    <title><?= htmlspecialchars($pageTitle) ?></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
