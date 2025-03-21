import Diary from "../models/Diary.js";

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user.id })
      .lean()
      .populate("user", ["name", "email"]);
    return res.status(200).json({ diaries });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const diary = await Diary.findById(id)
      .lean()
      .populate("user", ["name", "email"]);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    return res.status(200).json({ diary });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDiary = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    const diary = await Diary.create({
      title,
      description,
      eventDate,
      user: req.user.id,
    });
    if (!diary) {
      return res.status(400).json({ message: "Invalid diary data" });
    }
    return res.status(201).json({ diary });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;
    const diary = await Diary.findById(id);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    diary.title = title;
    diary.description = description;
    diary.eventDate = eventDate;
    await diary.save();
    return res.status(200).json({ diary });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const diary = await Diary.findById(id);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    await diary.remove();
    return res.status(200).json({ message: "Diary removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

