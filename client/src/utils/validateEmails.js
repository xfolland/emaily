const REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmails = (emailList) => {
  if (!emailList) return;
  const invalidEmails = emailList
    .split(",")
    .map((email) => email.trim())
    .filter((email) => !REGEX.test(email));
  if (invalidEmails.length) return `These emails are invalid: ${invalidEmails}`;
};

export default validateEmails;
