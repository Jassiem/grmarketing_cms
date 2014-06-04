class NewsletterController < ApplicationController
	def create
		@newsletter = Newsletter.new(newsletter_params)
    if(@newsletter.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to subcribe to newsletter.'}, status: :bad_request
    end
	end

   private
    def newsletter_params
      params.require(:newsletter).permit(:recipient_name, :recipient_email)
    end
end
