const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");

const User = require("../repocihot/users");
const { HttCode } = require("../help/const");
const EmailService = require("../servies/email");
const { CreteEmailSentikSeteder }