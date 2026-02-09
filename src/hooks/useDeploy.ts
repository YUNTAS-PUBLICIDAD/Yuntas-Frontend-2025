'use client';

import { useState, useCallback } from "react";
import {
    DeployServiceResponse,
} from "@/types/admin/deploy";
import {
    triggerDeployService,
} from "@/services/deployService";

interface UseDeployReturn {
    isLoading: boolean;
    triggerDeploy: () => Promise<DeployServiceResponse>;
}

export function useDeploy(): UseDeployReturn {
    const [isLoading, setIsLoading] = useState(false);

    const triggerDeploy = useCallback(async () : Promise<DeployServiceResponse> => {
        setIsLoading(true);

        const result = await triggerDeployService();


        setIsLoading(false);

        return result;
    }, []);

    return {
        isLoading,
        triggerDeploy,
    };
}