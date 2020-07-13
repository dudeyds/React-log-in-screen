const Welcome = ({ user, onSignOut }) => {
  return (
    React.createElement("form", null, "Thank you for logging in",
    React.createElement("strong", null, user.email), "!",
    React.createElement("a", { href: "javascript:;", onClick: onSignOut }, "Sign out")));


};

class LoginForm extends React.Component {

  handleSignIn(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.onSignIn(email, password);
  }

  render() {
    return (
      React.createElement("form", { onSubmit: this.handleSignIn.bind(this) },
      React.createElement("h3", null, "Sign in"),
      React.createElement("input", {type: "text", ref: "email", placeholder: "enter your email", "required": "required" }),
      React.createElement("input", { type: "password", ref: "password", placeholder: "enter password", "required": "required" }),
      React.createElement("input", { type: "submit", value: "Login" })));


  }}




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
		user: null,
		toast: null};

  }
  signIn(email, password) {
		axios.post('http://localhost:3000/login',{
			username: email,
			password: password
		})
		.then((response) => {
			if(response.status === 201){this.setState({
				user: 
				{
					email,
					password 
				}, 
				toast: null
			});
			} else {
				this.setState( {
				user:null,
				toast: response.data
			});
			}
		}, (error) => {
			this.setState( {
				user:null,
				toast: error.response.data
			});
			
			console.log(error);
		});
  }

  signOut() {
    this.setState({ user: null, toast: null });
  }

  render() {
    return (
      React.createElement("section", { id: "entry-page" },

      this.state.user ? //if the state has a username applied to it
      React.createElement(Welcome, {
        user: this.state.user,
        onSignOut: this.signOut.bind(this) }) :

      //otherwise show the login form
      React.createElement(LoginForm, {
        onSignIn: this.signIn.bind(this) }),
		this.state.toast ?
		React.createElement("div",{id: "snackbar", className: "show"},this.state.toast) :
		null
		
		
		));






  }}



ReactDOM.render(React.createElement(App, null), document.getElementById("app"));