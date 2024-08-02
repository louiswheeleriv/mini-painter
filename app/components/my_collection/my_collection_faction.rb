module MyCollection
  class MyCollectionFaction < ReactComponent
    def initialize(raw_props = {})
      super('MyCollectionFaction', raw_props: raw_props)
    end

    def props
      user_faction = ::UserFaction.find_by(
        user_id: current_user_id,
        id: params[:user_faction_id]
      )
      faction = user_faction.faction
      faction_model_by_id = ::Model.where(faction_id: user_faction.faction_id).map { |model| [model.id, model] }.to_h
      raw_props.merge(
        game_system: faction.game_system,
        faction: faction,
        user_faction: user_faction,
        faction_model_by_id: faction_model_by_id,
        user_model_groups: user_faction.user_model_groups.order(sort_index: :asc),
        user_models: user_faction.user_models
      )
    end
  end
end
