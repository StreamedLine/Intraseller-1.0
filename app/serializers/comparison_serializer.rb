class ComparisonSerializer < ActiveModel::Serializer
  attributes :id, :item, :compared
  has_many :bullets
end