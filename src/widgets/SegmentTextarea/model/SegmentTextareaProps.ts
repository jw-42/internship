import React from "react";

export interface SegmentTextareaProps {
    getRef?: React.Ref<HTMLTextAreaElement> | undefined,
    translate?: string|undefined,
    data?: any
}