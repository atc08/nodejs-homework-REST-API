const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.fullInf;
        return ret;
      },
    },
  }
);

contactSchema.virtual('fullInf').get(function () {
  return `This is ${this.name} phone number ${this.phone}`;
});

contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
