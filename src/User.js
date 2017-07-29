class User {
  isAuth = false;
  isAuthenticated() {
    return this.isAuth;
  }
  userLogin() {
    this.isAuth = true;
  }
  userLogout() {
    this.isAuth = false;
  }
}

const user = new User();
export default user;