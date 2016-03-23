# About the open-source Toronto Poetry Map

This is an open source version of the Ruby on Rails application that runs the [Toronto Poetry Map](http://www.torontopoetry.ca/) developed by the [Toronto Public Library](http://www.torontopubliclibrary.ca/) for the 2015 National Poetry Month (April).

It is provided as-is under the terms of the [MIT License](https://opensource.org/licenses/MIT) for the use of those who may want to experiment with it or develop similar projects.

[Alan Harnum](https://github.com/waharnum), Sandra Gornall and Rachel Tennenhouse were the core development team of the application, with curation by then-poet laureate of Toronto George Elliott Clarke and editorial work by the library's Reader's Services Committee.

## Installation Notes for Local Environment (using sqlite3 as DB)

- prereqs: rails, ruby, bundle, etc - standard rails stack stuff
- checkout the repo, following commands are from the directory it's checked out
- ` bundle install --without production`
- ` rake db:migrate`
- optional, if you want to load the sample data
  - ` rake db:data:load`
- `rails s` to run on localhost:3000
- localhost:3000/admin to add and edit content

## Other Notes

- there is no authentication or authorization required in this version for the administrative interface; production code should restrict access through means documented at https://github.com/sferik/rails_admin (the Gem used for the administrative interface) or other means
