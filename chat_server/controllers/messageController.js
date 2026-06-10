const Message = require("../models/Message");

const getRoomMessages = async (
  req,
  res
) => {
  try {

    const messages =
      await Message.find({
        roomId: req.params.roomId,
      }).sort({
        createdAt: 1,
      });

    res.status(200).json({
      messages,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

module.exports = {
  getRoomMessages,
};