class PartialsController < ApplicationController
	def show_partial
		render "/partials/" + params[:partial], :layout => false
	end
end