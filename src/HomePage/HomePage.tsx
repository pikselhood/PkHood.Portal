import { Button, Card, Input, Layout, Menu, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Character, UserData } from "../Play/Infrastructure/Types/userData";
import "./styles.scss";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

interface ICharacterForm {
    characterName: string;
    characterClass: string;
}

export default function HomePage() {
    const [accessToken, setAccessToken] = useState();
    const [ptoken, setPtoken] = useState<string>();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [characterForm, setCharacterForm] = useState<ICharacterForm>({
        characterName: "",
        characterClass: "warrior",
    });
    const [userData, setUserData] = useState<UserData>();

    const navigate = useNavigate();

    const responseGoogle = (response: any) => {
        setAccessToken(response.tokenObj.id_token);
        //window.localStorage.setItem("p_token");
    };
    const onLogoutSuccess = () => {
        console.log("logged out");
        window.localStorage.removeItem("p_token");
        setIsLoggedin(false);
    };
    const apiLoginSuccess = (res: string) => {
        window.localStorage.setItem("p_token", res);
        setPtoken(res);
        setIsLoggedin(true);
    };

    const getPtoken = () => {
        return ptoken ? "Bearer " + ptoken : "none";
    };

    const getUserData = () => {
        axios
            .get("http://20.120.33.143:5000/user", {
                headers: { Authorization: getPtoken() },
            })
            .then((res) => setUserData(res.data));
    };

    useEffect(() => {
        accessToken &&
            axios
                .get(
                    "http://20.120.33.143:5000/user/authorize?googleIdToken=" +
                        accessToken
                )
                .then((res) => {
                    apiLoginSuccess(res.data.pToken);
                    //navigate("play");
                })
                .catch((error) => {
                    //console.log(error.data.statusCode);
                    axios
                        .post("http://20.120.33.143:5000/user/create", {
                            googleIdToken: accessToken,
                        })
                        .then((res) => {
                            apiLoginSuccess(res.data.pToken);
                        })
                        .catch((error) => console.log(error));
                    //console.log(error);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    useEffect(() => {
        if (accessToken && isLoggedin) {
            getUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedin]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios
            .post("http://20.120.33.143:5000/user/character", characterForm, {
                headers: { Authorization: getPtoken() },
            })
            .then((res) => {
                getUserData();
                console.log(res);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormChange = (
        formName: "characterName" | "characterClass",
        value: string
    ) => {
        setCharacterForm({ ...characterForm, [formName]: value });
    };

    const play = (character: Character) => {
        window.localStorage.setItem("characterId", character.id);
        window.localStorage.setItem("characterClass", character.class);
        window.localStorage.setItem("characterName", character.name);
        navigate("play");
    };

    const characterCreationForm = (
        <Modal
            title="Create Your Character"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={
                        !(
                            characterForm.characterName.length > 3 &&
                            characterForm.characterName.length < 18
                        )
                    }
                    onClick={handleOk}
                >
                    Create
                </Button>,
            ]}
        >
            <label>Character Name</label>
            <Input
                onChange={(e) =>
                    handleFormChange("characterName", e.target.value)
                }
            />
            <label>Choose Class</label>
            <Select
                defaultValue="warrior"
                style={{ width: 120 }}
                onChange={(e) => handleFormChange("characterClass", e)}
            >
                <Option value="warrior">Warrior</Option>
                <Option value="archer">Archer</Option>
                <Option value="mage">Mage</Option>
                <Option value="healer">Healer</Option>
            </Select>
        </Modal>
    );

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
                                onLogoutSuccess={onLogoutSuccess}
                            />
                        )}
                        {!isLoggedin && (
                            <GoogleLogin
                                clientId="215306563787-3h1jm6ccsqg6cbgckf3datbrt1d24hk8.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                                isSignedIn={true}
                            />
                        )}
                    </Menu>
                </Header>
                <Content>
                    <div className="page">
                        {isLoggedin && userData && (
                            <Card style={{ width: 300 }}>
                                {userData.characterList.map((cl) => (
                                    <p
                                        key={cl.name}
                                        onClick={() => play(cl)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {cl.name}
                                    </p>
                                ))}
                                <p
                                    onClick={() => showModal()}
                                    style={{ cursor: "pointer" }}
                                >
                                    {"Create Character"}
                                </p>
                            </Card>
                        )}
                    </div>
                    {characterCreationForm}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
}
