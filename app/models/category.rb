class Category < ApplicationRecord
	has_many :categoryItems
	has_many :items, :through => :categoryItems
	has_many :categoryQuestions
	has_many :questions, :through => :categoryQuestions
	has_many :tags, as: :taggable

	validates :name, {presence: true}

	def tags_attributes=(tags_attributes)
		tags_attributes.each do |i, tag_attributes|
			next if tag_attributes[:label].blank?
			if tag_attributes[:id].blank?
				tag = Tag.find_or_create_by(label: tag_attributes[:label])
			else
				tag = Tag.find(tag_attributes[:id])
				tag.update(label: tag_attributes[:label])
			end
			self.tags << tag
		end
	end

	def build_item
		item = self.items.build
		item.links.build
		item.tags.build
		item
	end

	def find_or_build_item_from_params(item_params)
		item = Item.find_or_build_item_with_params(item_params)
		if !self.items.include?(item) 
			return item if !item.save
			self.items << item 
		end
		item
	end

	def title
		self.name
	end 

end
