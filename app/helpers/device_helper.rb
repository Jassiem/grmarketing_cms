module DeviceHelper
	def send_notifications(message)
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
    data = {:title => "Drizzy", :message => message}

    notification_destinations.uniq!
    GCM.send_notification( notification_destinations, data )
    # GCM.send_notification( destination, data, :collapse_key => "placar_score_global", :time_to_live => 3600, :delay_while_idle => false )
	end
end
