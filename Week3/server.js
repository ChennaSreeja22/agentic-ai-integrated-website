import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const goal = req.body.goal;

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: `Generate a step-by-step task plan to achieve this goal: ${goal}`,

            config: {

                responseMimeType: "application/json",

                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        tasks: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    task_name: {
                                        type: "STRING"
                                    },
                                    priority: {
                                        type: "STRING"
                                    },
                                    estimated_time: {
                                        type: "STRING"
                                    }
                                },
                                required: [
                                    "task_name",
                                    "priority",
                                    "estimated_time"
                                ]
                            }
                        }
                    },
                    required: ["tasks"]
                }

            }

        });

        const data = JSON.parse(response.text);

        res.json(data);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to generate tasks."
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});