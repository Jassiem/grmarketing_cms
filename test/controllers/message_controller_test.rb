require 'test_helper'

class MessageControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get get_message" do
    get :get_message
    assert_response :success
  end

  test "should get get_messages" do
    get :get_messages
    assert_response :success
  end

  test "should get delete" do
    get :delete
    assert_response :success
  end

end
