import { createContext, useContext, type RefObject } from "react";

/**
 * The page scrolls inside a custom container (not the window), so any
 * scroll-linked animation needs this ref as the `container` option of
 * motion's `useScroll`.
 */
export const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export const useScrollContainer = () => useContext(ScrollContainerContext);
