
const ContextMenu = ({ x, y, children }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                zIndex: 1000,
            }}
            className="w-36"
        >
            <ul
                className="list-none p-0 m-0 flex flex-col items-start"
            >
                {children}
            </ul>
        </div>
    )
}

export default ContextMenu