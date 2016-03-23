class PoetsController < ApplicationController
  before_action :set_poet, only: [:show]

  # GET /poets
  # GET /poets.json
  def index
    @poets = Poet.all
  end

  # GET /poets/1
  # GET /poets/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poet
      @poet = Poet.find(params[:id])
    end
end
