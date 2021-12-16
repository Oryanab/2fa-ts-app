export const getCookie = (cname: string): string => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const handleLocalStorage = (token: string) => {
  const now = new Date();
  let inFiveMinutes = AddMinutesToDate(now, 5);
  document.cookie = `token=${token}; expires=${inFiveMinutes}`;
};

export const deleteAllCookies = () => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const AddMinutesToDate = (date: Date, minutes: any) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const delete_cookie = (name: string) => {
  document.cookie =
    name +
    "=; Path=/;  Domain=" +
    "/" +
    "; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";
};
