const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Personal Care', 'Transportation', 'Energy', 'Other'],
      message: 'Category must be one of the predefined options'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  sustainabilityScore: {
    type: Number,
    required: [true, 'Sustainability score is required'],
    min: [0, 'Sustainability score must be at least 0'],
    max: [100, 'Sustainability score cannot exceed 100']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Sustainable+Product'
  },
  price: {
    type: Number,
    min: [0, 'Price must be positive']
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ sustainabilityScore: -1 });

module.exports = mongoose.model('Product', productSchema);
