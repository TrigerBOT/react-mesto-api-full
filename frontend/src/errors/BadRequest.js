class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}

export default BadRequest;
