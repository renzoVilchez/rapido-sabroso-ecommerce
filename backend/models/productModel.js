import db from './db.js';

const getAll = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.productId,
        p.productName,
        p.productDescription,
        p.productPrice,
        p.productImage,
        c.categoryName
      FROM 
        products p
      JOIN 
        categories c ON p.categoryId = c.categoryId
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAll,
};