<?php
$pageTitle = "Senior Project";

include("header.php");
?>

<h1>Inbox</h1>
<ul class="task-list">
	<li class="incomplete">
		<i class="fa fa-check check"></i>
		<span>Call mom</span>
		<i class="fa fa-ellipsis-v edit"></i>
	</li>
	<li class="complete">
		<i class="fa fa-check check"></i>
		<span>Meet with person at place with a really, really, really, long task name</span>
		<i class="fa fa-ellipsis-v edit"></i>
	</li>
	<li class="incomplete">
		<i class="fa fa-check check"></i>
		<span>Do laundry</span>
		<i class="fa fa-ellipsis-v edit"></i>
	</li>
</ul>

<div id="calendar">
	<div id="calendar-header">
		<h1>February</h1>
		<ul id="calendar-view">
			<li>Day</li>
			<li>Week</li>
			<li>Month</li>
			<li>Agenda</li>
		</ul>
	</div>
	<ul id="calendar-month">
		<ul id="day-names">
			<li>Sun</li>
			<li>Mon</li>
			<li>Tue</li>
			<li>Wed</li>
			<li>Thur</li>
			<li>Fri</li>
			<li>Sat</li>
		</ul>

		<ul id="month">
			<li>
				<ul class="all-day-events">
					<li></li>
					<li></li>
				</ul>
				<span class="date">1</span>
				<ul class="events">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</li>
			<li>
				<ul class="all-day-events">
					<li></li>
				</ul>
				<span class="date">2</span>
				<ul class="events">
					<li></li>
					<li></li>
					<li></li>
				</ul>
				</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>

			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>

			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>

			<li>
				<ul class="all-day-events">
					<li></li>
				</ul>
				<span class="date">22</span>
				<ul class="events">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>

			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</ul>
</div>

<?php include("footer.php"); ?>