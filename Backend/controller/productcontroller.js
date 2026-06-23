import Product from '../models/product.js' // import Product from model foolder

// Seed Products: automatically adding sample data into the database

// exporting function so that it can be used route
export const seedProducts = async (req, res) => {

  try {
     // Array of available categories
    const categories = [
      "Electronics",
      "Books",
      "Clothing",
      "Sports",
      "Furniture"
    ];
     // Empty array to temporarily store products
    const products = [];
    // Total product we want to create
    const totalProducts = 200000;
    // Loop from 1 to 20000
    for (let i = 1; i <= totalProducts; i++) {
     // create aa product object and add it to array
      products.push({
      // product name will be Product 1, product2 etc
        name: `Product ${i}`,
       // Pick a random category from categories array
        category:
          categories[
            Math.floor(Math.random() * categories.length )
          ],
       // Random price b/w 100 and 5099
        price:Math.floor(Math.random() * 5000 ) + 100

      });
      // When array size become 5000 add it to mongodb
      if (products.length === 5000) {

        await Product.insertMany(products);
        // clear array after insertion
        products.length = 0;

        console.log(
          `${i} Products Inserted`
        );
      }
    }

    res.status(201).json({
      message: "200000 Products Inserted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get Products

export const getProducts = async (req, res) => {

  try {
   // extract query parameter from url
    const {
      search,
      category,
      cursor, // cursor pagination
      snapshot, // Snapshot pagination
      limit = 20 // default 20 records 
    } = req.query;
 // empty query object
    let query = {};

    // Search
 
    if (search) {
   // find products whose name contain search text
      query.name = {
        $regex: search, // pattern matching
        $options: "i" // case sensitive
      };
    }

    // Category Filter

    if (category) {
      // only product of selected category
      query.category = category;
    }

    // Snapshot Pagination

    if (snapshot) {

      query.createdAt = {
        $lte: new Date(snapshot)
      };
    }

    // Cursor Pagination

    if (cursor) {

      query._id = {
        $lt: cursor
      };
    }

    const products =
      await Product.find(query)
        .sort({ _id: -1 })
        .limit(Number(limit));

    const nextCursor =
      products.length > 0
        ? products[products.length - 1]._id
        : null;

    res.status(200).json({

      products,

      nextCursor,

      snapshot:
        snapshot ||
        new Date().toISOString()

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};