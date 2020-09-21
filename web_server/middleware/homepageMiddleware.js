export default async function({ store, redirect }) {
  try {
    if (!store.state.auth.loggedIn) {
      console.log("Not logged in");
      return redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
}
