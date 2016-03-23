# About the open-source Toronto Poetry Map

This is an open source version of the Ruby on Rails application that runs the [Toronto Poetry Map](http://www.torontopoetry.ca/) developed by the [Toronto Public Library](http://www.torontopubliclibrary.ca/) for the 2015 National Poetry Month (April). While the appearance, copy and data are somewhat different, it has no less functionality than the released version.

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

## On the Data Model

- the data model is a relatively simple one and not derived from any existing metadata standard (although it could be mapped to one easily enough)
  - **Poets** are people who write poems.
  - **Poems** are written by poets. Create a poet before creating poems authored by them.
    - The *excerpt* of a poem is a preformatted text field, so enter the poem exactly as it should appear in terms of spacing, punctuation, line breaks, etc
  - **Books** and **Websites** are **Sources** of poems.
    - **Books** can optionally have a *Library Item* field added; this is an identifier that (in combination with code in *book.rb*) that allows the construction of a link to the item in the library catalogue. The implementation in this code is specific to to Toronto Public Library's online catalogue.
  - **Locations** are locations! Two things in particular to note are:
    - you can specify longitude and latitude manually, but it's probably easier to make use of the automatic geocoding and simply enter a sufficienty disambiguated address that the application can automatically geocode it. We found that adding city/town & province/state was typically good enough, FE: "789 yonge st toronto on"
  - **Location excerpts** allow you to create location-specific excerpts for a particular poem, rather than using the "default" one



## Other Notes

- there is no authentication or authorization required in this version for the administrative interface; production code should restrict access through means documented at https://github.com/sferik/rails_admin (the Gem used for the administrative interface) or other means.

- the sample data is a snapshot of the poems and other information entered at around the time of release in April 2015.
