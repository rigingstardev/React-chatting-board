import Notifier from "react-desktop-notification";

export const WindowsNotify = (
  title,
  content,
  domain,
  imageURL,
  popwin,
) => {

  //Here will pop a notifier and always open in a new window when clicked.
  Notifier.focus(title, content, domain, imageURL);

  // //Here will pop notifier and open in a specified name window "popwin1" when clicked.
  // Notifier.start("Title", "Here is context", "www.google.com", "validated image url", "popwin1");

  // //Here will pop notifier and focus parent window only when clicked.
  // Notifier.focus("Title", "Here is context", "www.google.com", "validated image url");

}