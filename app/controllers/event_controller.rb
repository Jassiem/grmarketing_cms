class EventController < ApplicationController
	def create
		@event = Event.new(event_params)
    if(@event.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create event.'}, status: :bad_request
    end
	end

	def delete

	end

	def edit

	end

	def get_event

	end

	def get_all_events
		all_events = Event.all.to_a
		logger.info all_events
		render :json =>{all_events: all_events}, status: :ok
	end

  private
    def event_params
      params.require(:event).permit(:name, :description, :event_date)
    end
end
