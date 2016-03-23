require 'test_helper'

class MapPagesControllerTest < ActionController::TestCase
  test "should get location" do
    get :location
    assert_response :success
  end

end
