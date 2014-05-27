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
		@event = Event.find(params[:event_id])
		@event.delete

		if(@event.destroyed?)
			render :json => {}, status: :ok
		else
			render :json => {message: 'Unable to delete event.'}, status: :bad_request
		end
	end

	def edit
		@event = Event.find(params[:event][:id])

		if(@event.update_attributes(event_params) && @event.save)
			render :json => {}, status: :ok
		else
			render :json => {message: 'Unable to update event.'}, status: :bad_request
		end

	rescue ActiveRecord::RecordNotFound
		render :json => {message: 'Unable to update event. Event cannot be found.'}, status: :bad_request
	end

	def get_event
		@event = Event.find(params[:event_id])
		render :json => {event: @event}, status: :ok

	rescue ActiveRecord::RecordNotFound
		render :json => {message: 'Unable to retrieve event.  The event cannot be found.'}, status: :bad_request
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
