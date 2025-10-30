export interface Step {
    id: number;
    title: string;
    description: string;
    adminNote?: string;
    adminImage?: string;
    action?: {
        text: string;
        href?: string;
        type: 'download' | 'link' | 'generate-ip';
    };
    ipAddress?: string;
    details?: string[];
}