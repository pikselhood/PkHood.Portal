import { Unity, useUnityContext } from "react-unity-webgl";

function ReactGameRunner() {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "unity/Build.loader.js",
        dataUrl: "unity/Build.data",
        frameworkUrl: "unity/Build.framework.js",
        codeUrl: "unity/Build.wasm",
      });
      // We'll round the loading progression to a whole number to represent the
      // percentage of the Unity Application that has loaded.
      const loadingPercentage = Math.round(loadingProgression * 100);
      return (
        <div className="container">
          {isLoaded === false && (
            // We'll conditionally render the loading overlay if the Unity
            // Application is not loaded.
            <div className="loading-overlay">
              <p>Loading... ({loadingPercentage}%)</p>
            </div>
          )}
          <Unity className="unity" unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
        </div>
      );
  }

export default ReactGameRunner;