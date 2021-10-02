import { test, expect } from "@playwright/test";

const TEST_URL = "https://metal-12afc.web.app";
const TEST_USER = "ohagi2149@gmail.com";
const TEST_PASS = "testtest";

/**
 *
 */
test("ログインできるか", async ({ page }) => {
  await page.goto(TEST_URL + "/login");

  // ログインする
  await page.fill(".username input", TEST_USER);
  await page.fill(".password input", TEST_PASS);
  await page.click(".login-btn");

  // URLが正しいか
  await expect(page).toHaveURL(TEST_URL + "/");

  // ログインアラートが表示されるか
  const content = await page.textContent(".MuiAlert-message");
  expect(content).toBe("ログインしました");
});

/**
 *
 */
test("ログインに失敗するか", async ({ page }) => {
  await page.goto(TEST_URL + "/login");

  // ログインする
  await page.fill(".username input", "wrong_user");
  await page.fill(".password input", "wrong_password");
  await page.click(".login-btn");

  // URLが正しいか
  await expect(page).toHaveURL(TEST_URL + "/login");

  // ログイン失敗アラートが表示されるか
  const content = await page.textContent(".MuiAlert-message");
  expect(content).toBe("ログインに失敗しました");
});

/**
 *
 */
test("ログアウトできるか", async ({ page }) => {
  await page.goto(TEST_URL + "/login");

  // ログインする
  await page.fill(".username input", TEST_USER);
  await page.fill(".password input", TEST_PASS);
  await page.click(".login-btn");

  // ログアウトする
  await page.click("header button :text('ログアウト')");
  await page.click("div[role=dialog] button :text('ログアウト')");

  // URLが正しいか
  await expect(page).toHaveURL(TEST_URL + "/login");

  // ログアウトアラートが表示されるか
  const content = await page.textContent(".MuiAlert-message");
  expect(content).toBe("ログアウトしました");
});

/**
 *
 */
test("パスワード変更画面に遷移できるか", async ({ page }) => {
  await page.goto(TEST_URL + "/login");

  await page.click("text=パスワードを忘れた場合");

  // URLが正しいか
  await expect(page).toHaveURL(TEST_URL + "/forgotPassword");
});

// 未ログイン時にログインページに遷移するか

// 新規登録画面に遷移できるか

//await page.waitForSelector(".MuiAlert-message", { state: "visible" });
