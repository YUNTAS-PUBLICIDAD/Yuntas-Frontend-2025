// de formato ISO a DD-MM-YYYY 
export const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const parts = dateString.split('T')[0].split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
};