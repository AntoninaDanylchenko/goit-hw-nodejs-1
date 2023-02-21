const contactsOperations = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const userList = await contactsOperations.listContacts();
      console.table(userList);
      break;

    case "get":
      const user = await contactsOperations.getContactById(id);
      if (!user) {
        throw new Error(`Product by id=${id} not found`);
      }
      console.table(user);
      break;

    case "add":
      await contactsOperations.addContact(name, email, phone);
      const newuserList = await contactsOperations.listContacts();
      console.table(newuserList);
      break;

    case "remove":
      const removeUser = await contactsOperations.removeContact(id);
      console.table(removeUser);
      break;

    case "update":
      const updateUser = await contactsOperations.updateContactById(
        id,
        name,
        email,
        phone
      );
      console.table(updateUser);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
