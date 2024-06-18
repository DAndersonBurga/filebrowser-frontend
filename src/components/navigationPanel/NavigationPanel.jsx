import SearchIcon from "../../icons/search/SearchIcon";

const NavigationPanel = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscando archivos...");
  }

  return (
    <nav className="w-full gap-2 h-12 bg-gray-800 flex items-center text-white px-2">
        <form className="w-full">
          <input
            className="w-full p-1 rounded-md bg-transparent border border-white/60" 
            type="text" 
            defaultValue="/D/tareas/programacion" 
          />
        </form>

        <form className="w-56" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              className="w-full p-1 rounded-md bg-transparent border border-white/60" 
              type="search"
              placeholder="Buscar archivos"
            />

            <SearchIcon className="h-5 w-5 absolute right-1.5 top-1.5" />
          </div>
        </form>
    </nav>
  )
}

export default NavigationPanel