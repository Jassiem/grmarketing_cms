require 'test_helper'

class DeviceControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get get_all_devices" do
    get :get_all_devices
    assert_response :success
  end

end
