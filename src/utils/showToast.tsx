import toast, { IconTheme, ToastPosition } from 'react-hot-toast';

interface ToastOptions {
    position?: ToastPosition;
    duration?: number;
}

const baseStyle = {
    border: '1px solid',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(32, 53, 101, 0.1), 0 2px 4px -1px rgba(32, 53, 101, 0.06)',
};

const defaultPosition: ToastPosition = 'bottom-right';

const WarningIcon: React.FC<IconTheme> = ({ primary = '#f59e0b', secondary = '#fff' }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            className="triangle-animate"
            d="M10 3L3 17Q2 18, 3.5 18L16.5 18Q18 18, 17 17L10 3Z"
            fill={primary}
        />
        <text
            className="exclamation-animate"
            x="10"
            y="16"
            textAnchor="middle"
            fill={secondary}
            fontSize="10"
            fontWeight="bold"
        >
            !
        </text>
    </svg>
);

export const showToast = {
    success: (message: string, options?: ToastOptions) => {
        toast.success(message, {
            position: options?.position || defaultPosition,
            duration: options?.duration || 3000,
            style: {
                ...baseStyle,
                backgroundColor: '#e8f5e9',
                borderColor: '#16a34a',
                color: '#1b5e20',
            },
            iconTheme: {
                primary: '#16a34a',
                secondary: '#e8f5e9',
            },
        });
    },

    error: (message: string, options?: ToastOptions) => {
        toast.error(message, {
            position: options?.position || defaultPosition,
            duration: options?.duration || 4000,
            style: {
                ...baseStyle,
                backgroundColor: '#fce4e4',
                borderColor: '#dc2626',
                color: '#991b1b',
            },
            iconTheme: {
                primary: '#dc2626',
                secondary: '#fce4e4',
            },
        });
    },

    warning: (message: string, options?: ToastOptions) => {
        toast(message, {
            position: options?.position || defaultPosition,
            duration: options?.duration || 3500,
            icon: <WarningIcon primary="#f59e0b" secondary="#fff" />,
            style: {
                ...baseStyle,
                backgroundColor: '#fff9e6',
                borderColor: '#f59e0b',
                color: '#92400e',
            },
        });
    },
};