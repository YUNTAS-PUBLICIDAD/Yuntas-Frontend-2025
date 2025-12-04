interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold text-[#203565] border-b border-gray-200 pb-2">
                {title}
            </h3>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
}