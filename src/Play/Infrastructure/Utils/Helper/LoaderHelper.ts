import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class LoadingTracker
{
	public path: string;
	public progress: number = 0;
	public finished: boolean = false;
    public error: ErrorEvent | undefined;

	constructor(path: string)
	{
		this.path = path;
	}
}

export default class LoaderHelper {

    static loadGLTF(path: string, onLoadingFinished: (gltf: any) => void): LoadingTracker {

        let gltfLoader = new GLTFLoader();
        let tracker = new LoadingTracker(path);

        gltfLoader.load(path,
            (gltf) => {
                tracker.finished = true;
                tracker.progress = 1;
                onLoadingFinished(gltf);
            },
            (xhr) => {
                if (xhr.lengthComputable) {
                    tracker.progress = xhr.loaded / xhr.total
                }
            },
            (error) => {
                tracker.error = error;
                console.error(error);
            });
            
		return tracker;
    }

    static loadFBX(path: string, onLoadingFinished: (fbx: any) => void): LoadingTracker {

        let fbxLoader = new FBXLoader();
        let tracker = new LoadingTracker(path);

        fbxLoader.load(path,
            (fbx) => {
                onLoadingFinished(fbx);
                tracker.finished = true;
                tracker.progress = 1;
            },
            (xhr) => {
                if (xhr.lengthComputable) {
                    tracker.progress = xhr.loaded / xhr.total
                }
            },
            (error) => {
                tracker.error = error;
                console.error(error);
            });
            
		return tracker;
    }
}



