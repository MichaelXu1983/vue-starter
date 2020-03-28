import Cookies from "js-cookie";

const expiresTime = new Date(new Date().getTime() + 1440 * 60 * 1000);

export function getAuthority() {
  return Cookies.get("authority") || "admin";
}

export function setAuthority(authority) {
  return Cookies.set("authority", authority, { expires: expiresTime });
}

export function removeAuthority(authority) {
  return Cookies.remove("authority", authority);
}
