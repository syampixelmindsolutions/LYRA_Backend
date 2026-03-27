import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: 100
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      enum: ['top', 'middle', 'bottom'],
      default: 'top'
    },
    colorFrom: {
      type: String,
      default: 'from-purple-900'
    },
    colorVia: {
      type: String,
      default: 'via-violet-800'
    },
    colorTo: {
      type: String,
      default: 'to-purple-600'
    },
    ctaText: {
      type: String,
      default: 'Shop Now'
    }
  },
  {
    timestamps: true
  }
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;