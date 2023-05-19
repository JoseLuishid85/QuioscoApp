import Image from "next/image"
import useQuiosco from "@/hook/useQuiosco"


const Categoria = ({ categoria }) => {

    const { categoriaAcutal, handleClickCategoria } = useQuiosco();
    const { nombre,icono, id } = categoria
    return (
        <div className={`${categoriaAcutal?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-4 hover:bg-amber-400`}>
            <Image 
                width={50}
                height={50}
                src={`/assets/img/icono_${icono}.svg`}
                alt='Imagen Icono' 
            />
            <button type="button" className="text-2xl font-bold hover:cursor-pointer" 
                    onClick={() => handleClickCategoria(id)} 
            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria