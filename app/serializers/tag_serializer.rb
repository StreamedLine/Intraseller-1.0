class TagSerializer < ActiveModel::Serializer
  attributes :id, :label
  belongs_to :categories
end
