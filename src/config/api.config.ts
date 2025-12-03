import { endpoints } from "./endpoints";


function createApiConfig() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    return {
        apiUrl,
        endpoints,
        
        getUrl: (endpoint: string): string => {
            return `${apiUrl}${endpoint}`;
        },
        
        getFullUrl: (endpoint: string | ((arg: any) => string), param?: any): string => {
            const path = typeof endpoint === "function" ? endpoint(param) : endpoint;
            return `${apiUrl}${path}`;
        },
    };
}

export const apiConfig = createApiConfig();