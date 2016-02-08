<!DOCTYPE html>
<head>
	<meta charset="utf-8">

	<title><?php echo (isset($pageTitle) ? $pageTitle : "Senior Project") ?></title>

	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</head>
<body>
	<div class="wrapper">
		<div id="sidebar" class="is-collapsed disable-preload-transition">
			<div id="header-sidebar" class="header">
				<i id="sidebar-toggle" class="fa fa-bars fa-fw"></i>
			</div>
			<nav id="nav" role="navigation">
				<ul id="nav-calendar-list">
					<a href="#"><li id="nav-calendar" class="is-selected">
						<i class="fa fa-calendar fa-fw"></i>
						Calendar
					</li></a>
					<li id="nav-my-calendars" class="sub-nav">
						<i class="fa fa-calendar-o fa-fw"></i>
						My Calendars
						<ul class="sub-nav-list">
							<a href="#"><li>Personal</li></a>
							<a href="#"><li>Appointments</li></a>
							<a href="#"><li>Classes</li></a>
							<a href="#"><li>Work</li></a>
						</ul>
					</li>
				</ul>

				<ul id="nav-task-list">
					<a href="#"><li id="nav-inbox">
						<i class="fa fa-inbox fa-fw"></i>
						Inbox
					</li></a>
					<a href="#"><li id="nav-today">
						<i class="fa fa-list fa-fw"></i>
						Today
					</li></a>
					<a href="#"><li id="nav-7-days">
						<i class="fa fa-list fa-fw"></i>
						Next 7 Days
					</li></a>
					<li id="nav-my-labels" class="sub-nav">
						<i class="fa fa-list-alt fa-fw"></i>
						My Labels
						<ul class="sub-nav-list">
							<a href="#"><li>Personal</li></a>
							<a href="#"><li>Shopping</li></a>
							<a href="#"><li>Project</li></a>
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<div id="content-wrapper">
			<div id="overlay"></div>

			<div id="header-main" class="header">
				<i class="fa fa-plus"></i>
				<i class="fa fa-cog"></i>
			</div>

			<main id="content" role="main">