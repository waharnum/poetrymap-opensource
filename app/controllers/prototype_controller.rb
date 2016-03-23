class PrototypeController < ApplicationController
  layout "prototype"
  def index
	@locations = Location.all  	
  end

  def leaflet
  end 

end
