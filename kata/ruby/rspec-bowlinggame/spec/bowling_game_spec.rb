require "spec_helper"

describe "game object" do
	before :each do
		@game = Game.new
	end

	context "gutter game" do
		it "should have a score of 0" do
			20.times {roll_x_pins 0}
			@game.score.should eql 0
		end
	end
	context "roll all ones" do
		it "should have a score of 20" do
			20.times {roll_x_pins 1}
			@game.score.should eql 20
		end
	end
	context "roll one spare" do
		it "should double the score for the following roll" do
			roll_spare
			roll_x_pins 3
			17.times { roll_x_pins 0 }
			@game.score.should eql 16
		end
	end
	context "roll one strike" do
		it "should double the score for the next two rolls" do
			roll_strike
			roll_x_pins 3
			roll_x_pins 4
			17.times {roll_x_pins(0)}
			@game.score.should eql 24
		end
	end
	context "roll perfect game" do
		it "should have a score of 300" do
			12.times {roll_x_pins 10}
			@game.score.should eql 300
		end
	end
end

def roll_x_pins number_of_pins
	@game.roll(number_of_pins)
end

def roll_spare
	2.times { roll_x_pins 5 }
end

def roll_strike
	roll_x_pins 10
end