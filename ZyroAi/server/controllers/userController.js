import Creation from "../models/creation.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const creations = await Creation.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user creations: " + error.message,
    });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await Creation.find({ publish: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user creations: " + error.message,
    });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const creation = await Creation.findById(id);

    if (!creation) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    const currentLikes = creation.likes || []; // Handle undefined likes
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation liked";
    }

    await Creation.findByIdAndUpdate(id, { likes: updatedLikes });

    res.status(200).json({
      success: true,
      message,
      likes: updatedLikes, // Return updated likes for frontend
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to toggle like: " + error.message,
    });
  }
};
