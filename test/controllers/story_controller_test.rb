require 'test_helper'

class StoryControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get edit" do
    get :edit
    assert_response :success
  end

  test "should get delete" do
    get :delete
    assert_response :success
  end

  test "should get get_story" do
    get :get_story
    assert_response :success
  end

  test "should get get_stories" do
    get :get_stories
    assert_response :success
  end

end
