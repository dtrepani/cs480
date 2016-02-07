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

			<div id="sidebar" class="is-collapsed">
				<div id="header-sidebar" class="header">
					<i id="sidebar-toggle" class="fa fa-bars fa-fw"></i>
				</div>
				<nav id="nav" role="navigation">
					<ul id="nav-calendar-list">
						<li id="nav-calendar" class="is-selected">
  							<i class="fa fa-calendar fa-fw"></i>
							Calendar
						</li>
						<li id="nav-sub-calendars" class="sub-nav">
  							<i class="fa fa-calendar-o fa-fw"></i>
							My Calendars
						</li>
					</ul>

					<ul id="nav-task-list">
						<li id="nav-inbox">
  							<i class="fa fa-inbox fa-fw"></i>
							Inbox
						</li>
						<li id="nav-today">
  							<i class="fa fa-list fa-fw"></i>
							Today
						</li>
						<li id="nav-7-days">
  							<i class="fa fa-list fa-fw"></i>
							Next 7 Days
						</li>
						<li id="nav-sub-labels" class="sub-nav">
  							<i class="fa fa-list-alt fa-fw"></i>
							My Labels
						</li>
					</ul>
				</nav>
			</div>

			<div id="content-wrapper">
				<div id="header-main" class="header">
					<i class="fa fa-plus"></i>
					<i class="fa fa-cog"></i>
				</div>

				<div id="content">