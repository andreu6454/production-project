import {FeatureFlags} from "@/shared/types/featureFlags";
import {LOCAL_STORAGE_LAST_DESIGN_KEY} from "@/shared/const/localStorage";

const defaultFeatures: FeatureFlags = {
    isAppRedesigned: true
}

let featureFlags: FeatureFlags = {
    ...defaultFeatures
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlags(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}