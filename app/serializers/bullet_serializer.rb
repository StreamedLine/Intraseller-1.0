class BulletSerializer < ActiveModel::Serializer
  attributes :id, :nugget
  belongs_to :bulletable
end
