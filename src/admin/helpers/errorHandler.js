function errorHandler(error) {
  if (TypeError) {
    throw new Error("Произошла ошибка");
  }

  if (error.response.data.message) {
    switch (error.response.data.message) {
      case "The given data was invalid.":
        throw new Error("Ошибка валидации");

      default:
        throw new Error(error.response.data.message);
    }
  }

  if (error.response.data.error) {
    switch (error.response.data.error) {
      case "token_not_provided":
        throw new Error("Токен авторизации не предоставлен");

      case "token_expired":
        throw new Error("Токен авторизации просрочен");
      default:
        throw new Error(error.response.data.error);
    }
  }
}

export default errorHandler;
