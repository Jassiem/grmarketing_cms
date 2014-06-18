class DeviceController < ApplicationController
	def create
		@device = Device.new(device_params)
    if(@device.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create device.'}, status: :bad_request
    end
	end

	def get_all_devices
		all_devices = Device.all.to_a
		render :json =>{all_devices: all_devices}, status: :ok
	end

  private
    def device_params
      params.require(:device).permit(:registration_id)
    end
end
