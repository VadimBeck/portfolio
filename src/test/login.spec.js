const fs = require("fs");
const webdriverio = require("webdriverio");
const options = require("../../wdio.conf");
const client = webdriverio.multiremote(options);

jest.setTimeout(90000);

beforeAll(() => {
  return client.init().url("http://localhost:8080/admin#/login");
});

test('На странице есть кнопка "Авторизоваться"', () => {
  return client
    .isVisible(".send-button")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(screenshots => {
      for (const browserName in screenshots) {
        fs.writeFileSync(
          `./screenshots/login_form_button_${browserName}.png`,
          screenshots[browserName].value,
          "base64"
        );
      }
    });
});

test("Форма имеет все необходимые поля", () => {
  return client
    .isVisible(".login__form")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .isExisting(".login__input--name")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .isExisting(".login__input--password")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(screenshots => {
      for (const browserName in screenshots) {
        fs.writeFileSync(
          `./screenshots/login_form_inputs_${browserName}.png`,
          screenshots[browserName].value,
          "base64"
        );
      }
    });
});

test('Кнопка "Отправить" заблокирована до тех пор, пока не введены все необходимые данные', () => {
  return client
    .click(".send-button")
    .pause(500)
    .getAttribute(".send-button", "disabled")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe("true");
      }
    })
    .screenshot()
    .then(screenshots => {
      for (const browserName in screenshots) {
        fs.writeFileSync(
          `./screenshots/login_form_disabled_btn_${browserName}.png`,
          screenshots[browserName].value,
          "base64"
        );
      }
    })
    .addValue(".login__input--name", "test")
    .addValue(".login__input--password", "1234")
    .pause(500)
    .getAttribute(".send-button", "disabled")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(null);
      }
    })
    .screenshot()
    .then(screenshots => {
      for (const browserName in screenshots) {
        fs.writeFileSync(
          `./screenshots/login_form_enabled_btn_${browserName}.png`,
          screenshots[browserName].value,
          "base64"
        );
      }
    });
});

afterAll(() => {
  return client.end();
});
