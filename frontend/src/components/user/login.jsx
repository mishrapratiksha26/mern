import React, { useState } from "react";
import { API } from "../../service/api";
import { TextField, Box, Button, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = () => {
  const [account, setAccount] = useState("login"); //by default on loginbox
  const [signUp, setsignUp] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const toggleSignup = () => {
    if (account === "login") {
      setAccount("signup");
    } else {
      setAccount("login");
    }
  };

  const signUpUser = async () => {
    let response = await API.userSignup(signUp);
    if (response.isSuccess) {
      setError("");
      setsignUp(signupInitialValues);
      toggleSignup("login");
    } else {
      setError("Something went wrong");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      setsignUp(loginInitialValues);
      console.log("login success");
      // toggleSignup("login");
    } else {
      setError("Something went wrong");
    }
  };
  const onInputChange = (e) => {
    setsignUp({ ...signUp, [e.target.name]: e.target.value }); //append the new values to the already existing signUp values
    console.log(signUp);
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value }); //append the new values to the already existing signUp values
    console.log(login);
  };

  return (
    <Component>
      <Box>
        <Image src="" alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              onChange={(e) => onValueChange(e)}
              variant="standard"
              name="username"
              label="Enter Username"
            />
            <TextField
              onChange={(e) => onValueChange(e)}
              variant="standard"
              name="password"
              label="Enter Password"
            />

            {/* {error && <Error>{error}</Error>} */}

            <LoginButton onClick={loginUser} variant="contained">
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton style={{ marginBottom: 50 }} onClick={toggleSignup}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              onChange={(e) => onInputChange(e)}
              variant="standard"
              name="name"
              label="Enter Name"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              variant="standard"
              name="email"
              label="Enter Email"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              variant="standard"
              name="username"
              label="Enter Username"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              variant="standard"
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}
            <SignupButton onClick={signUpUser}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
