export type FormDataValue = string | number | boolean | File | null | undefined;
export type FormDataObject = {
    [key: string]: FormDataValue | FormDataValue[] | FormDataObject | FormDataObject[];
};

interface ToFormDataOptions {
    parentKey?: string;
    includeEmpty?: boolean;
}

// Esta utilidad convierte un objeto a FormData de forma recursiva
export function toFormData(data: FormDataObject, options: ToFormDataOptions = {}, formData: FormData = new FormData()): FormData {
    const { parentKey = "", includeEmpty = false } = options;

    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

        const value = data[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (value === null || value === undefined) {
            if (includeEmpty) {
                formData.append(formKey, "");
            }
            continue;
        }

        if (value instanceof File) {
            formData.append(formKey, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                const arrayKey = `${formKey}[${index}]`;

                if (item instanceof File) {
                    formData.append(arrayKey, item);
                } else if (typeof item === "object" && item !== null) {
                    toFormData(item as FormDataObject, { parentKey: arrayKey, includeEmpty }, formData);
                } else if (item !== null && item !== undefined && String(item).trim() !== "") {
                    formData.append(arrayKey, String(item));
                }
            });
        } else if (typeof value === "object") {
            toFormData(value as FormDataObject, { parentKey: formKey, includeEmpty }, formData);
        } else {
            formData.append(formKey, String(value));
        }
    }

    return formData;
}

// imprime contenido de FormData
export function logFormData(formData: FormData): void {
    formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}: ${value}`);
        }
    });
}