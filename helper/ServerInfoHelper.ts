import EnviromentHelper from "../EnviromentHelper";
import {ServerInfo} from "@directus/sdk";
import ServerAPI from "../ServerAPI";

export class ServerInfoHelper {

    static getProjectName(serverInfo: ServerInfo){
        return serverInfo?.project?.project_name;
    }

    static getProjectColor(serverInfo: ServerInfo){
        return serverInfo?.project?.project_color;
    }

    static getProjectLogoAssetId(serverInfo: ServerInfo){
        return serverInfo?.project?.project_logo;
    }
    static getProjectLogoURL(serverInfo: ServerInfo){
        return ServerAPI.getAssetImageURL(ServerInfoHelper.getProjectLogoAssetId(serverInfo));
    }

    static getProjectBackgroundAssetId(serverInfo: ServerInfo){
        return serverInfo?.project?.public_background;
    }
    static getProjectBackgroundURL(serverInfo: ServerInfo){
        return ServerAPI.getAssetImageURL(ServerInfoHelper.getProjectBackgroundAssetId(serverInfo));
    }

    static getProjectVersion(): string {
        let manifest = EnviromentHelper.getAppManifest();
        return !!manifest?.version ? manifest.version : "";
    }
}
