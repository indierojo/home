class Game
	def initialize
		@roll_scores = []
		@current_roll = 1
	end

	def roll pins
		@roll_scores[@current_roll] = pins
		@current_roll += 1
	end

	def score
		score = 0
		roll = 1
		10.times do
			if is_strike roll
				score += 10 + @roll_scores[roll + 1] + @roll_scores[roll + 2]
				roll += 1
			elsif is_spare roll
				score += 10 + @roll_scores[roll + 2]
				roll += 2
			else
				score += @roll_scores[roll] + @roll_scores[roll + 1]
				roll += 2
			end
		end
		return score
	end

	def is_spare roll_number
		return @roll_scores[roll_number] + @roll_scores[roll_number+1] == 10
	end

	def is_strike roll_number
		return @roll_scores[roll_number] == 10
	end
end