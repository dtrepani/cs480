<?php
$pageTitle = "Senior Project";

include("header.php");
?>

<h1>Inbox</h1>
<ul class="task-list">
	<li>
		<i class="fa fa-check check-icon"></i>
		<span class="task-name">Call mom</span>
		<i class="fa fa-ellipsis-v edit-icon"></i>
	</li>
	<li class="is-complete">
		<i class="fa fa-check check-icon"></i>
		<span class="task-name">Meet with person at place with a really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long task name</span>
		<i class="fa fa-ellipsis-v edit-icon"></i>
	</li>
	<li>
		<i class="fa fa-check check-icon"></i>
		<span class="task-name">Do laundry</span>
		<i class="fa fa-ellipsis-v edit-icon"></i>
	</li>
</ul>

<div id="calendar">
	<div id="calendar-header">
		<h1 id="month-name">February</h1>
		<ul id="calendar-views">
			<li>Day</li>
			<li>Week</li>
			<li>Month</li>
			<li>Agenda</li>
		</ul>
	</div>
	<ul id="calendar-month">
		<ul id="month-day-names">
			<li>Sun</li>
			<li>Mon</li>
			<li>Tue</li>
			<li>Wed</li>
			<li>Thur</li>
			<li>Fri</li>
			<li>Sat</li>
		</ul>

		<ul id="month" class="calendar-view">
			<li>
				<ul class="all-day-events">
					<li></li>
					<li></li>
				</ul>
				<span class="day-number">1</span>
				<ul class="events">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</li>
			<li class="is-today">
				<ul class="all-day-events">
					<li></li>
				</ul>
				<span class="day-number">2</span>
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
				<span class="day-number">22</span>
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