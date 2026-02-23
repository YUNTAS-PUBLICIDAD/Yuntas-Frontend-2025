import React from "react";

type RenderLinkMarkersOptions = {
    productBasePath?: string;
    linkClassName?: string;
};

const DEFAULT_LINK_CLASS = "font-bold";

function isSafeHttpUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function isSafeSlug(value: string): boolean {
    return /^[a-z0-9-]+$/.test(value);
}

function pushTextWithLineBreaks(nodes: React.ReactNode[], text: string, keyPrefix: string) {
    const parts = text.split("\n");
    parts.forEach((part, index) => {
        if (part) {
            nodes.push(<React.Fragment key={`${keyPrefix}-text-${index}`}>{part}</React.Fragment>);
        }
        if (index < parts.length - 1) {
            nodes.push(<br key={`${keyPrefix}-br-${index}`} />);
        }
    });
}

export function renderLinkMarkers(text: string, options: RenderLinkMarkersOptions = {}): React.ReactNode[] {
    const { productBasePath = "/productos", linkClassName = DEFAULT_LINK_CLASS } = options;
    const nodes: React.ReactNode[] = [];
    const pattern = /\[(custom|product):([^\]|]+)\|([^\]]+)\]/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const chunk = text.slice(lastIndex, match.index);
            pushTextWithLineBreaks(nodes, chunk, `chunk-${keyIndex}`);
            keyIndex += 1;
        }

        const type = match[1];
        const target = match[2].trim();
        const label = match[3].trim();

        if (type === "custom" && isSafeHttpUrl(target)) {
            nodes.push(
                <a
                    key={`custom-${keyIndex}`}
                    href={target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                >
                    {label}
                </a>
            );
        } else if (type === "product" && isSafeSlug(target)) {
            nodes.push(
                <a
                    key={`product-${keyIndex}`}
                    href={`${productBasePath}/${target}`}
                    className={linkClassName}
                >
                    {label}
                </a>
            );
        } else {
            pushTextWithLineBreaks(nodes, match[0], `invalid-${keyIndex}`);
        }

        keyIndex += 1;
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
        const remainder = text.slice(lastIndex);
        pushTextWithLineBreaks(nodes, remainder, `tail-${keyIndex}`);
    }

    return nodes;
}
