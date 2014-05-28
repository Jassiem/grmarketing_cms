require 'test_helper'

class PetitionControllerTest < ActionController::TestCase
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

  test "should get get_petition" do
    get :get_petition
    assert_response :success
  end

  test "should get get_all_petitions" do
    get :get_all_petitions
    assert_response :success
  end

end
