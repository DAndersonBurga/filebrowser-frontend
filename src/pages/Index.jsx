import HardDiskIcon from "../icons/files/HardDiskIcon"

const Index = () => {
  return (
    <section className="h-full bg-gray-600 p-2 text-white">
      <h1 className="text-xl font-normal mb-5">Dispositivos y unidades</h1>

      <div>
        <button>
          <HardDiskIcon 
            className="size-10"
          />
          <span className="text-2xl text-center leading-0">+</span>
        </button>
      </div>
    </section>
  )
}

export default Index