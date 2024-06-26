import useGlobalContext from "./useGlobalContext"

const useContextMenu = () => {
    const { store } = useGlobalContext()
    const { contextMenu, setContextMenu } = store

    const handleOnAuxClick = (e) => {
        e.preventDefault()

        setContextMenu({
          visible: !contextMenu?.visible,
          x: e.clientX,
          y: e.clientY
        })
    }

    return {
        handleOnAuxClick
    }
}

export default useContextMenu;