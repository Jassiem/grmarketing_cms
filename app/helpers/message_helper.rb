module MessageHelper
	def send_notifications(title, message)
		# configure GCM paramters
		GCM.host = 'https://android.googleapis.com/gcm/send'
	  GCM.format = :json
	  GCM.key = "AIzaSyAJ3isLmgf6jG4yKrO1MLpo2zxE2zY1lvo"

	  # get all registrationIds of all GR users
	  user_devices = Device.all.to_a
	  notification_destinations = []

	  user_devices.each do |device| 
	  	notification_destinations.push(device.registration_id)
	  end
	  data = {:title => title, :message => message}

	  notification_destinations.uniq!
	  GCM.send_notification( notification_destinations, data )
	end
end
