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
					<li id="nav-calendar" class="is-selected">
						<a href="#"> <i class="fa fa-calendar fa-fw"></i> Calendar </a>
					</li>
					<li id="nav-my-calendars" class="sub-nav">
						<span>
							<i class="fa fa-calendar-o fa-fw"></i>
							My Calendars
						</span>
						<ul class="sub-nav-list">
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Personal </a></li>
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Appointments </a></li>
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Classes </a></li>
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Work </a></li>
						</ul>
					</li>
				</ul>

				<ul id="nav-task-list">
					<li id="nav-inbox">
						<a href="#"> <i class="fa fa-inbox fa-fw"></i> Inbox </a>
					</li>
					<li id="nav-today">
						<a href="#"> <i class="fa fa-list fa-fw"></i> Today </a>
					</li>
					<li id="nav-7-days">
						<a href="#"> <i class="fa fa-list fa-fw"></i> Next 7 Days </a>
					</li>
					<li id="nav-my-labels" class="sub-nav">
						<span>
							<i class="fa fa-list-alt fa-fw"></i>
							My Labels
						</span>
						<ul class="sub-nav-list">
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Personal </a></li>
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Shopping </a></li>
							<li><a href="#"> <i class="fa fa-circle fa-fw"></i> Project </a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<div id="content-wrapper" class="disable-preload-transition">
			<div id="overlay"></div>

			<div id="header-main" class="header">
				<i class="fa fa-plus"></i>
				<i class="fa fa-cog"></i>
			</div>

			<main id="content" class="disable-preload-transition" role="main">