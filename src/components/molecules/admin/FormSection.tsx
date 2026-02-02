interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    headerActions?: React.ReactNode;
}

export default function FormSection({ title, children, headerActions }: FormSectionProps) {
    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="text-lg font-bold text-[#203565]">
                    {title}
                </h3>
                {headerActions && (
                    <div className="flex items-center gap-2">
                        {headerActions}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
}