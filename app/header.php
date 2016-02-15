<!DOCTYPE html>
<head>
	<meta charset="utf-8">

	<title><?php echo (isset($pageTitle) ? $pageTitle : "Senior Project") ?></title>

	<link rel="stylesheet" type="text/css" href="app/css/main.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"> -->
	<script type="text/javascript" src="app/js/main.min.js"></script>
</head>
<body>
	<div class="wrapper">
		<?php include("app/sidebar.php"); ?>

		<div id="content-wrapper" class="disable-preload-transition">
			<div id="overlay"></div>

			<div id="header-main" class="header">
				<i class="fa fa-plus"></i>
				<i class="fa fa-cog"></i>
			</div>

			<main id="content" class="disable-preload-transition" role="main">