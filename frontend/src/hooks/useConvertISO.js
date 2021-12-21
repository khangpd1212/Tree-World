export default function useConvertISO() {

  const convertISO = (ISO) => {
    let today = new Date(ISO);
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let fullDate = date + " " + time;
    return fullDate
  }
  return { convertISO }
}
