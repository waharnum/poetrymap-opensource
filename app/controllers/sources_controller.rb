class SourcesController < ApplicationController
  before_action :set_source, only: [:show]

  # GET /sources
  # GET /sources.json
  def index
    @sources = Source.all
  end

  # GET /sources/1
  # GET /sources/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Source.find(params[:id])
    end
end
