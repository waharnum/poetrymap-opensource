RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'Source' do
    navigation_label 'Source related'    
  end

  # Hide library_item_id on Source -> Website create
  config.model 'Website' do    
    edit do
      configure :library_item_id do
        hide
      end
    end
    parent Source
  end

  # Hide url on Source -> Book create
  config.model 'Book' do    
    edit do
      configure :url do
        hide
      end
    end
    parent Source
  end  

end
