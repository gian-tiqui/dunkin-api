export const getCombos = async (req, res) => {
  try {
    const filter = {};

    if (req.query.name) filter.name = { $regex: req.query.name, $options: "i" };
    if (req.query.minPrice)
      filters.price = { ...filters.price, $gte: req.query.minPrice };

    if (req.query.maxPrice)
      filters.price = { ...filters.price, $lte: req.query.maxPrice };

    const combos = await Combo.find(filter);
    return res.status(200).json(combos);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCombo = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCombos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCombos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCombos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
