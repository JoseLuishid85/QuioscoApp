import Layout from "@/layout/Layout"
import Head from "next/head"
import useQuiosco from "@/hook/useQuiosco"
import Producto from "@/components/Producto";

export default function Home() {

    const { categoriaAcutal } = useQuiosco();

    return (
        <Layout pagina={`Menu ${categoriaAcutal?.nombre}`}>
            <h1 className="text-4xl font-black">{ categoriaAcutal?.nombre }</h1>
            <p className="text-2xl my-10">
                Elige y personaliza tu pedido a continuación 
            </p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categoriaAcutal?.productos?.map(producto =>(
                    <Producto
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </div>
        </Layout>
    )
}

