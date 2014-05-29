class StoryController < ApplicationController
  def create
    @story = Story.new(story_params)
    if(@story.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to create story.'}, status: :bad_request
    end
  end

  def delete
    @story = Story.find(params[:story_id])
    @story.delete

    if(@story.destroyed?)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to delete story.'}, status: :bad_request
    end
  end

  def edit
    @story = Story.find(params[:story][:id])

    if(@story.update_attributes(story_params) && @story.save)
      render :json => {}, status: :ok
    else
      render :json => {message: 'Unable to update story.'}, status: :bad_request
    end

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to update story. Story cannot be found.'}, status: :bad_request
  end

  def get_story
    @story = Story.find(params[:story_id])
    render :json => {story: @story}, status: :ok

  rescue ActiveRecord::RecordNotFound
    render :json => {message: 'Unable to retrieve story.  The story cannot be found.'}, status: :bad_request
  end

  def get_all_stories
    all_stories = Story.all.to_a
    render :json =>{all_stories: all_stories}, status: :ok
  end

  private
    def story_params
      params.require(:story).permit(:title, :content)
    end
end
