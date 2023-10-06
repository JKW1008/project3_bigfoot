export default class ResponseBody {
  constructor (statusCode, statusText, message, data) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message;
    this.data = data;
  }
}
