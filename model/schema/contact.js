const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.fullInf;
        return ret;
      },
    },
  }
);

contactSchema.virtual('fullInf').get(function () {
  return `The phone number of ${this.name} is ${this.phone}`;
});

contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
