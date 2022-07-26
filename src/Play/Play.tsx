import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";

export default function Play() {

    const navigate = useNavigate();

    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "unity/Build.loader.js",
        dataUrl: "unity/Build.data",
        frameworkUrl: "unity/Build.framework.js",
        codeUrl: "unity/Build.wasm",
    });
    
    const loadingPercentage = Math.round(loadingProgression * 100);

    if (!window.localStorage["p_token"]) 
    {
        navigate("/");
    }

    return (
        <div className="container">
            {isLoaded === false && (
                <div className="loading-overlay">
                <p>Loading... ({loadingPercentage}%)</p>
                </div>
            )}
            <Unity className="unity" unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}