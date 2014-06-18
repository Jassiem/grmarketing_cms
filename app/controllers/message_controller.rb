class MessageController < ApplicationController
	include MessageHelper

  def create
    @message = Message.new(message_params)
    if(@message.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create message.'}, status: :bad_request
    end
  end

  def delete
    @message = Message.find(params[:message_id])
    @message.delete

    if(@message.destroyed?)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to delete message.'}, status: :bad_request
    end
  end

  def edit
    @message = Message.find(params[:message][:id])

    if(@message.update_attributes(message_params) && @message.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to update message.'}, status: :bad_request
    end

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to update message. Message cannot be found.'}, status: :bad_request
  end

  def get_message
    @message = Message.find(params[:message_id])
    logger.info @message.to_yaml
    render :json => {message: @message}, status: :ok

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to retrieve message.  The message cannot be found.'}, status: :bad_request
  end

  def get_messages
    all_messages = Message.all.to_a
    render :json =>{all_messages: all_messages}, status: :ok
  end

  def notify
  	@message = Message.find(params[:message_id])

		send_notifications(@message.title, @message.contents)
		render :json => {}, status: :ok
	end

  private
    def message_params
      params.require(:message).permit(:title, :contents)
    end
end
