const db = require("../db/dbConfig.js");

const getAllFavorites = async () => {
  try {
    const allFavorites = await db.any("SELECT * FROM favorite");
    return allFavorites;
  } catch (error) {
    return error;
  }
};

const getFavorite = async (id) => {
  try {
    const oneFavorite = await db.one(
      "SELECT * FROM favorite WHERE favorite_id=$1",
      id
    );
    return oneFavorite;
  } catch (error) {
    return error;
  }
};

// const createFavorite = async (document) => {
//   try {
//     const newFavorite = await db.one(
//       "INSERT INTO favorite (name, image, is_favorite, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
//       [document.name, document.image, document.is_favorite, document.user_id]
//     );
//     return newFavorite;
//   } catch (error) {
//     return error;
//   }
// };

const deleteFavorite = async (id) => {
  try {
    const deletedfavorite = await db.one(
      "DELETE FROM favorite WHERE favorite_id=$1 RETURNING *",
      id
    );
    return deletedfavorite;
  } catch (error) {
    return error;
  }
};

// const updateFavorite = async (id, document) => {
//   try {
//     const updatedFavorite = await db.one(
//       "UPDATE favorite SET name=$1, image=$2, is_favorite=$3, user_id=$4 WHERE id=$5 RETURNING *",
//       [
//         document.name,
//         document.image,
//         document.is_favorite,
//         document.user_id,
//         id,
//       ]
//     );
//     return updatedFavorite;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  getAllFavorites,
  getFavorite,
  // createFavorite,
  deleteFavorite,
  // updateFavorite,
};
