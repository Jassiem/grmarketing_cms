class CardController < ApplicationController
	def create
		logger.info params
		@card = Card.new(card_params)
    if(@card.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create card.'}, status: :bad_request
    end
	end

	def delete
		@card = Card.find(params[:card_id])
		@card.delete

		if(@card.destroyed?)
			render :json => {}, status: :ok
		else
			render :json => {message: 'Unable to delete card.'}, status: :bad_request
		end
	end

	def edit
		@card = Card.find(params[:card][:id])

		if(@card.update_attributes(card_params) && @card.save)
			render :json => {}, status: :ok
		else
			render :json => {message: 'Unable to update card.'}, status: :bad_request
		end

	rescue ActiveRecord::RecordNotFound
		render :json => {message: 'Unable to update card. Card cannot be found.'}, status: :bad_request
	end

	def get_card		
		@card = Card.find(params[:card_id])
		render :json => {card: @card}, status: :ok

	rescue ActiveRecord::RecordNotFound
		render :json => {message: 'Unable to retrieve card.  The card cannot be found.'}, status: :bad_request
	end

	def get_all_cards
		all_cards = Card.all.to_a
		all_cards.each_with_index do |card, index| 
			card[:graphic_file_name] = card.graphic.url(:thumb)
		end
		render :json =>{all_cards: all_cards}, status: :ok
	end

  private
  def card_params
    params.permit(:title, :description, :graphic, :start_date, :end_date)
  end
end
