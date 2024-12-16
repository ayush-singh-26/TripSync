import dotenv from 'dotenv'
import { AI_PROMPT } from '../models/AI.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { chatSession } from '../constants/AIModal.js';
import ApiError from '../utils/ApiError.js';
dotenv.config();


const generateTrip = async (req, res) => {
    try {
        
        const { destination, days, budget, traveller } = req.body;
        console.log(destination);
        
        
        // Validate required fields
        if (!destination || !days || !budget || !traveller) {
      return res.status(400).json({
          error: "Missing required fields: destination, days, budget, or traveller",
        });
    }
    
    const FINAL_PROMPT = AI_PROMPT
    .replace(/{location}/g, destination)
    .replace(/{budget}/g, budget)
    .replace(/{totalDays}/g, days)
      .replace(/{traveler}/g, traveller);
  

      const result= await chatSession.sendMessage(FINAL_PROMPT);
      
      const parts = result?.response?.candidates?.[0]?.content?.parts?.[0];

      res.status(200).json(
          new ApiResponse(
              200,
              { result: parts },
              "Trip generated successfully"
            )    
        );
    } catch (error) {
        throw new ApiError(400, "something went wrong", error);
    }
  };
  

export {
    generateTrip
}
