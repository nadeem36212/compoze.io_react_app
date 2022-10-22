export const environment: Environment = {
    apiBase:
        process.env['REACT_APP_COST_BASE_URL']!,
    compozeApiBase: process.env['REACT_APP_COST_COMPOZE_BASE_URL']!, 
    unauthenticatedcompozeApiBase: process.env['REACT_APP_COMPOZE_UNAUTHENTICATED_BASE_URL']!, 
    environment: process.env.NODE_ENV,
};

export interface Environment {
    apiBase: string;
    compozeApiBase: string;
    unauthenticatedcompozeApiBase: string;
    environment: typeof process.env.NODE_ENV;
}