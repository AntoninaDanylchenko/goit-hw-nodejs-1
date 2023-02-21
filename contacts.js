// import { promises as fs } from "fs";
// import path from "path";
const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const userList = JSON.parse(data);
    return userList;
  } catch (err) {
    console.log(err.message);
  }
};
const getContactById = async (contactId) => {
  try {
    const userList = await listContacts();
    const user = userList.find((item) => item.id === contactId);
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const userList = await listContacts();
    const newUserList = userList.filter((item) => item.id !== contactId);
    // const usInd = userList.findIndex((item) => item.id === contactId);
    // if (!usInd) {
    //   return null;
    // }
    // const removeUser = userList.splice(usInd, 1);
    await updaiteUser(newUserList);
    return newUserList;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const userList = await listContacts();
    const newUser = { id: v4(), name, email, phone };
    userList.push(newUser);
    await updaiteUser(userList);
    return newUser;
  } catch (err) {
    console.log(err.message);
  }
};

const updaiteUser = async (userList) => {
  await fs.writeFile(contactsPath, JSON.stringify(userList));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const fileOperation = async (filePath, action = "read", data = {}) => {
//   switch (action) {
//     case "read":
//       const userList = await fs.readFile(filePath, "utf-8");
//       console.table(userList);
//       break;
//     case "add":
//       await fs.appendFile(filePath, data);
//       break;
//     case "replace":
//       await fs.writeFile(filePath, data);
//       break;
//   }
// };
