# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_09_201130) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "factions", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_system_id", null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["game_system_id", "name"], name: "index_factions_on_game_system_id_and_name", unique: true
  end

  create_table "game_systems", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["name"], name: "index_game_systems_on_name", unique: true
  end

  create_table "models", force: :cascade do |t|
    t.string "name", null: false
    t.integer "faction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["faction_id", "name"], name: "index_models_on_faction_id_and_name", unique: true
    t.index ["faction_id"], name: "index_models_on_faction_id"
  end

  create_table "user_factions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "faction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["faction_id"], name: "index_user_factions_on_faction_id"
    t.index ["user_id"], name: "index_user_factions_on_user_id"
  end

  create_table "user_image_associations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "user_image_id", null: false
    t.integer "user_faction_id"
    t.integer "sort_index", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_model_id"
    t.index ["user_faction_id"], name: "index_user_image_associations_on_user_faction_id"
    t.index ["user_id"], name: "index_user_image_associations_on_user_id"
    t.index ["user_image_id"], name: "index_user_image_associations_on_user_image_id"
    t.index ["user_model_id"], name: "index_user_image_associations_on_user_model_id"
  end

  create_table "user_images", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_images_on_user_id"
  end

  create_table "user_model_groups", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "user_faction_id", null: false
    t.string "name", null: false
    t.integer "sort_index", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_faction_id", "name"], name: "index_user_model_groups_on_user_faction_id_and_name", unique: true
  end

  create_table "user_models", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "model_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "qty_unassembled", default: 0, null: false
    t.integer "qty_assembled", default: 0, null: false
    t.integer "qty_in_progress", default: 0, null: false
    t.integer "qty_finished", default: 0, null: false
    t.bigint "user_model_group_id"
    t.bigint "user_faction_id", null: false
    t.text "notes"
    t.index ["model_id"], name: "index_user_models_on_model_id"
    t.index ["user_faction_id"], name: "index_user_models_on_user_faction_id"
    t.index ["user_id", "model_id", "name"], name: "index_user_models_on_user_id_and_model_id_and_name", unique: true
    t.index ["user_id"], name: "index_user_models_on_user_id"
    t.index ["user_model_group_id"], name: "index_user_models_on_user_model_group_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "encrypted_password", null: false
    t.string "encrypted_password_iv", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "foo@test.com", null: false
    t.string "display_name"
    t.bigint "profile_picture_id"
    t.text "bio"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
