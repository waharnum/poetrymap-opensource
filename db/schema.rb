# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150417002014) do

  create_table "location_excerpts", force: true do |t|
    t.integer  "location_id"
    t.integer  "poem_id"
    t.text     "excerpt"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "location_excerpts", ["location_id"], name: "index_location_excerpts_on_location_id"
  add_index "location_excerpts", ["poem_id"], name: "index_location_excerpts_on_poem_id"

  create_table "locations", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.float    "longitude"
    t.float    "latitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "image_url"
    t.text     "image_credit"
    t.text     "image_credit_url"
  end

  create_table "locations_poems", id: false, force: true do |t|
    t.integer "poem_id"
    t.integer "location_id"
  end

  add_index "locations_poems", ["location_id", "poem_id"], name: "index_locations_poems_on_location_id_and_poem_id"

  create_table "poems", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "source_id"
    t.integer  "poet_id"
    t.text     "excerpt"
  end

  add_index "poems", ["poet_id"], name: "index_poems_on_poet_id"
  add_index "poems", ["source_id"], name: "index_poems_on_source_id"

  create_table "poets", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sources", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "library_item_id"
    t.string   "type"
    t.string   "url"
  end

end
