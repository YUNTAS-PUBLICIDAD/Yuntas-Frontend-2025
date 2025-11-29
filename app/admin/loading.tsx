import Loader from "@/components/atoms/Loader";

export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 w-full">
            <Loader size="lg" />
            <p className="text-[#203565] text-lg font-medium">Cargando datos...</p>
        </div>
    );
}