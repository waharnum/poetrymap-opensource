require 'test_helper'

class PoetsControllerTest < ActionController::TestCase
  setup do
    @poet = poets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:poets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create poet" do
    assert_difference('Poet.count') do
      post :create, poet: { first_name: @poet.first_name, last_name: @poet.last_name }
    end

    assert_redirected_to poet_path(assigns(:poet))
  end

  test "should show poet" do
    get :show, id: @poet
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @poet
    assert_response :success
  end

  test "should update poet" do
    patch :update, id: @poet, poet: { first_name: @poet.first_name, last_name: @poet.last_name }
    assert_redirected_to poet_path(assigns(:poet))
  end

  test "should destroy poet" do
    assert_difference('Poet.count', -1) do
      delete :destroy, id: @poet
    end

    assert_redirected_to poets_path
  end
end
