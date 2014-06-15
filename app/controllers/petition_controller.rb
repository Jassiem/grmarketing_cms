class PetitionController < ApplicationController
  def create
    @petition = Petition.new(petition_params)
    if(@petition.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create petition.'}, status: :bad_request
    end
  end

  def delete
    @petition = Petition.find(params[:petition_id])
    @petition.delete

    if(@petition.destroyed?)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to delete petition.'}, status: :bad_request
    end
  end

  def edit
    @petition = Petition.find(params[:petition][:id])

    if(@petition.update_attributes(petition_params) && @petition.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to update petition.'}, status: :bad_request
    end

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to update petition. Petition cannot be found.'}, status: :bad_request
  end

  def get_petition
    @petition = Petition.find(params[:petition_id])
    logger.info @petition.to_yaml
    render :json => {petition: @petition}, status: :ok

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to retrieve petition.  The petition cannot be found.'}, status: :bad_request
  end

  def get_all_petitions
    all_petitions = Petition.all.to_a
    render :json =>{all_petitions: all_petitions}, status: :ok
  end

  def sign_petition
    @signatory = Signatory.new(signatory_params)
    if(@signatory.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to sign petition.'}, status: :bad_request
    end
  end

  private
    def petition_params
      params.require(:petition).permit(:name, :contents)
    end

    def signatory_params
      params.require(:signatory).permit(:name, :email, :petition_id)
    end 
end
