import { Button, Card, Input, Layout, Menu, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

export default function HomePage() {
    const [googleIdToken, setGoogleIdToken] = useState();
    const [pToken, setPtoken] = useState<string>();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const navigate = useNavigate();

    const googleOnSuccess = (response: any) => {
        setGoogleIdToken(response.tokenObj.id_token);
    };

    const googleOnFailure = (response: any) => {
        console.log("logging failed.", response);
    };

    const googleOnLogoutSuccess = () => {
        console.log("logged out.");
        setPtoken(undefined);
        setIsLoggedin(false);
    };

    const userLoginSuccess = (pToken: string) => {
        console.log("login success. Ptoken: ", pToken);
        setPtoken(pToken);
        setIsLoggedin(true);
    };

    const play = () => {
        navigate("play");
    };


    useEffect(() => {
        googleIdToken &&
            axios
                .get(
                    "http://20.120.33.143:5000/user/authorize?googleIdToken=" +
                        googleIdToken
                )
                .then((res) => {
                    userLoginSuccess(res.data.PToken);
                })
                .catch(_ => {
                    axios
                        .post("http://20.120.33.143:5000/user/create", {
                            googleIdToken: googleIdToken,
                        })
                        .then((res) => {
                            userLoginSuccess(res.data.pToken);
                        })
                        .catch((error) => console.log(error));
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleIdToken]);

    useEffect(() => {

        if (pToken) 
        {
            window.localStorage.setItem("p_token", pToken);
        }
        else
        {
            window.localStorage.removeItem("p_token");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pToken]);


    return (
        <>
            <Layout>
                <Header>
                    <Menu
                        className="antd-menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                    >
                        <img
                            src="./logo.svg"
                            alt="Logo"
                            style={{ height: "64px" }}
                        />

                        {isLoggedin && (
                            <GoogleLogout
                                clientId="215306563787-3h1jm6ccsqg6cbgckf3datbrt1d24hk8.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={googleOnLogoutSuccess}
                            />
                        )}
                        {!isLoggedin && (
                            <GoogleLogin
                                clientId="215306563787-3h1jm6ccsqg6cbgckf3datbrt1d24hk8.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={googleOnSuccess}
                                onFailure={googleOnFailure}
                                cookiePolicy={"single_host_origin"}
                                isSignedIn={true}
                            />
                        )}
                    </Menu>
                </Header>
                <Content>
                    <div className="play">
                        {isLoggedin && pToken && (
                            <Button onClick={() => play()}>
                                Play
                            </Button>
                        )}
                    </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
}
