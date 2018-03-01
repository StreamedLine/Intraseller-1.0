class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :bhsku, :mfrsku, :updated_at
  belongs_to :categories
end