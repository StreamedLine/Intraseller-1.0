class Question < ApplicationRecord
	has_many :categoryQuestions
	has_many :categories, :through => :categoryQuestions
	has_many :itemQuestions
	has_many :items, :through => :itemQuestions
	has_many :answers
	
	validates :content, presence: true

	def answer_for_view
		self.answers.build
	end

	def answers_count
		self.answers.count
	end

	def self.unanswered
		all_questions = self.all 
		unanswered_questions = all_questions - all_questions.joins(:answers)
	end
end
