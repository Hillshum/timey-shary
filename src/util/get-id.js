const LEN = 6
const POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export default function makeid() {
  let text = "";

  for (var i = 0; i < 6; i++)
    text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));

  return text;
}