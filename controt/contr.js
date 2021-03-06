const Contacts = require("../bing/index");
const listContacts = async (req, res, next) => {
    try {
      const contacts = await Contacts.listContacts();
  
      return res.json({ status: "success", code: 200, data: { contacts } });
    } catch (error) {
      next(error);
    }
  };
  
  const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId);
  
      if (contact) {
        console.log(contact);
        console.log(contact.info);
        return res
          .status(200)
          .json({ status: "success", code: 200, data: { contact } });
      }
  
      return res.json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
      next(error);
    }
  };
  
  const addContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body);
  
      return res
        .status(201)
        .json({ status: "success", code: 201, data: { contact } });
    } catch (error) {
      next(error);
    }
  };
  
  const removeContact = async (req, res, next) => {
    try {
      const contact = await Contacts.removeContact(req.params.contactId);
  
      if (contact) {
        return res.status(200).json({
          status: "success",
          code: 200,
          data: { contact },
          message: "Contact deleted",
        });
      }
  
      return res.json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
      next(error);
    }
  };
  
  const updateContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
  
      if (contact) {
        return res.status(200).json({
          status: "success",
          code: 200,
          data: { contact },
        });
      }
  
      return res.json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
  };