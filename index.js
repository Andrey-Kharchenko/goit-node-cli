const { listContacts, getContactById, deleteContact, addContact } = require("./contacts")
const { Command } = require('commander');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();
const options = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
 break;
      case "get":
      const findByID = await getContactById(id);
      return console.log(findByID);
     break;
      case "add":
      const newContact = await addContact({name, email, phone});
      return console.log(newContact);
 break;
      case "remove":
      const removeContact = await deleteContact(id);
      return console.log(removeContact);
   break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
  
}

invokeAction(options)