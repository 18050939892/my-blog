// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useStore } from '@nanostores/react';
// d多下载了上面这个和nanostores
import { contentStore } from '@/store/content';
import './index.css'
export function UserStatus(props) {
    // const {isActive}=props
    const {pathname}=props
    const content = useStore(contentStore);
    const currentPath =
        pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    const isActive = (path: string) => {
        const currentPathArray = currentPath.split("/").filter(p => p.trim());
        const pathArray = path.split("/").filter(p => p.trim());
        return currentPath === path || currentPathArray[0] === pathArray[0];
    };
    if (content) {
        return <>
        <li className="col-span-2 new-li">
            <a
                href="/create"
                class:list={{"active-nav": isActive("/create")}}
            >
                Create
            </a></li>
            <li className="col-span-2 new-li">
            <a href='#' onClick={(e) => {
              e.stopPropagation();
              contentStore.set(false);
                window.location.href = '/'
            }
            }>
                Exit
            </a></li>
            
            </>
            } else {
        return <li className="col-span-2 new-li">
            <a
                href="/login"
                class:list={{"active-nav": isActive("/login")}}
            >
                Login
            </a>
        </li>
            }
            }
