import React, { useContext, useState } from "react"

export type DrawerType = 'hamburger' | 'cart' | 'closed';
export type DrawerContextValue = {
    type: DrawerType;
    open: (mode: DrawerType) => void;
    close: () => void;
}

export function Drawer({ children, type }: { children?: React.ReactNode, type: DrawerType }) {
    const { type: activeType, close } = useDrawer();
    const expanded = type === activeType;

    const drawerDecoration = `w-[351px] max-w-full fixed left-[-1px] top-0 z-[999] h-full bg-white transition-transform duration-300 ease-in-out ${expanded ? "translate-x-0" : "-translate-x-full"}`;
    return (<div className={drawerDecoration}>
        {children}
    </div>)
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

Drawer.Provider = function DrawerProvider({ children }: { children: React.ReactNode }) {
    const [type, setType] = useState<DrawerType>('closed');
    
    return (
        <DrawerContext.Provider
            value={{
                type,
                open: setType,
                close: () => setType('closed'),
            }}
        >
            {children}
            {(type!="closed") && <div onClick={() => setType('closed')} className="!visible fixed bottom-0 left-0 right-0 top-0 z-[998] block bg-black opacity-80"></div>}
        </DrawerContext.Provider>
    );
}


export const useDrawer = () => {
    const drawer = useContext(DrawerContext)
    if (!drawer) {
        throw new Error('useDrawer must be used within an Drawer.Provider');
    }
    return drawer;
}