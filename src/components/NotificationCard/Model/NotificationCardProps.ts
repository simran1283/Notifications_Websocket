
export interface NotificationCardProps {
    type: string,
    title: string,
    message: string,
    timestamp: string,
    badge?: string,
    markAsRead : () => void
    dismiss : () => void
}

export const typeStyles: Record<string, { bg: string; border: string }> = {
    info: { bg: "#d9eaff", border: "#3b82f6" },
    success: { bg: "#e6fbe9", border: "#25a358ff" },
    warning: { bg: "#fff4cc", border: "#eab308" },
    error: { bg: "#ffe5e5", border: "#f85e5eff" },
};