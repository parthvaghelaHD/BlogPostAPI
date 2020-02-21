exports.Message = function (code = "", status, message, data = "") {
  let obj = {
    code,
    status,
    message,
    data: { data }
  }
  return obj;
}