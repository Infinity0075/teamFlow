import User from "../models/User.js";

export const onboardUser = async (req, res) => {
  try {
    const { department, designation, skills } = req.body;

    if (!department || !designation) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update ONLY logged-in user
    user.department = department;
    user.designation = designation;
    user.skills = skills || [];
    user.isOnboarded = true;

    await user.save();

    res.status(200).json({
      message: "Onboarding completed",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Onboarding failed" });
  }
};
