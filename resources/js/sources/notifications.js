var my = my || {};

my.Notifications = {

	render: function(data) {
		var notificationBlock = '<div class="notification-block ' + data.type + '">';
		notificationBlock += 'Downloading: ' + data.filename;
		notificationBlock += '</div>';
		$('.notification-list').html(notificationBlock);
	}

}