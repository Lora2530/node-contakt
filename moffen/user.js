const { Schema, model } = require("mongoose");
const gr = require("gravatar");
const {Subscription} = require("../help/const");
const bcryptjs = require("bcryptjs");
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate(value) {
                const re = /\S+@\S+\. \S+/g;
                return re.test(String(value).toLowerCase());
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },

        subscription: {
            type: String,
            enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
            default: Subscription.STARTER,
        },

        token: {
            type: String,
            default: null,
        },

        avatar: {
            type: String,
            default: function() {
                return gr.url(this.email, {s: '250'}, true)
            },
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        }
    },
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  });
  
  userSchema.methods.isValidPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };
  
  const User = model("user", userSchema);
  
  module.exports = User;