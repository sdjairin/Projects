import mongoose from "mongoose";

const creationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "article",
        "blog-title",
        "image",
        "background-removal",
        "object-removal",
        "resume-review",
      ],
    },
    publish: { type: Boolean, default: false },
    likes: { type: [String], default: [] }, // array of user IDs who liked the creation
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Creation ||
  mongoose.model("Creation", creationSchema);
