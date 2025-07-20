import OpenAI from "openai";
import Creation from "../models/creation.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

//generateArticle function to create an article using AI
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: prompt, // Original prompt
      content: content, // Generated content
      type: "article", // Type creation
      publish: false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    // Update user's free usage if they're on free plan
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article generated successfully",
      content: content,
      data: {
        creationId: creation._id,
        remainingUsage:
          plan === "premium" ? "unlimited" : 10 - (free_usage + 1),
      },
    });
  } catch (error) {
    console.error("Error generating article:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: error.message,
    });
  }
};

//generate Blog Titles function to create blog titles using AI
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: prompt, // Original prompt
      content: content, // Generated content
      type: "blog-title", // Type creation
      publish: false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    // Update user's free usage if they're on free plan
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog title generated successfully",
      content: content,
      data: {
        creationId: creation._id,
        remainingUsage:
          plan === "premium" ? "unlimited" : 10 - (free_usage + 1),
      },
    });
  } catch (error) {
    console.error("Error generating blog title:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate blog title",
      error: error.message,
    });
  }
};

//generateImage function to create images using AI
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feauture is only available for premium subscriptions",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: prompt, // Original prompt
      content: secure_url, // Generated content
      type: "image", // Type creation
      publish: req.body.publish ?? false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    return res.status(200).json({
      success: true,
      message: "Image generated successfully",
      content: secure_url,
      data: {
        creationId: creation._id,
      },
    });
  } catch (error) {
    console.error("Error generating image", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate image",
      error: error.message,
    });
  }
};

//removeImageBackground function to remove background from images using AI
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feauture is only available for premium subscriptions",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: "Remove background from image",
      content: secure_url, // Generated content
      type: "background-removal", // Type creation
      publish: false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    return res.status(200).json({
      success: true,
      message: "Image without backgroud generated successfully",
      content: secure_url,
      data: {
        creationId: creation._id,
      },
    });
  } catch (error) {
    console.error("Error generating image without background", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate image without background",
      error: error.message,
    });
  }
};

//removeImageObject function to remove objects from images using AI
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feauture is only available for premium subscriptions",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: `Remove ${object} from image`,
      content: imageUrl, // Generated content
      type: "object-removal", // Type creation
      publish: false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    return res.status(200).json({
      success: true,
      message: "Image with removed object generated successfully",
      content: imageUrl,
      data: {
        creationId: creation._id,
      },
    });
  } catch (error) {
    console.error("Error generating image with removed object", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate image with removed object",
      error: error.message,
    });
  }
};

//resumeReview function to review resumes using AI
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feauture is only available for premium subscriptions",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds the 5MB limit.",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content: \n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // Save the creation to the database
    const creation = new Creation({
      userId: userId, // userId
      prompt: "Review the uploaded resume",
      content: content, // Generated content
      type: "resume-review", // Type creation
      publish: false, // default not published
      likes: [], // empty likes array
    });

    await creation.save();

    return res.status(200).json({
      success: true,
      message: "Resume review generated successfully",
      content: content,
      data: {
        creationId: creation._id,
      },
    });
  } catch (error) {
    console.error("Error generating resume review", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate resume review",
      error: error.message,
    });
  }
};
