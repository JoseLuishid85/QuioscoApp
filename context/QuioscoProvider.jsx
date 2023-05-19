import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from 'axios'
import { toast } from "react-toastify";

const QuioscoContext = createContext()

const  QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaAcutal,setCategoriaActual] = useState({})
    const [producto,setProducto] = useState({})
    const [modal,setModal] = useState(false)
    const [pedido,setPedido] = useState([])
    const [nombre,setNombre] = useState('')
    const [total,setTotal] = useState(0)

    const router = useRouter()

    const obtenerCartegorias = async () =>{
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)
    },[pedido])

    useEffect(() =>{
        obtenerCartegorias()
    },[])

    useEffect(() =>{
        setCategoriaActual(categorias[0])
    },[categorias])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])

        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) =>{
        if(pedido.some(productoState => productoState.id === producto.id)){
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Producto Actualizado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            }else{
            setPedido([...pedido,producto])
            toast.success('Producto agregado al Pedido', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setModal(false)
        
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)

        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)

        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) =>{
        e.preventDefault();

        try {
            await axios.post('/api/ordenes',{
                pedido,
                nombre,
                total,
                fecha: Date.now().toString()
            })

            //Restear APP
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado con Exito')

            setTimeout(() => {
                router.push('/')
            }, 3000);

            

        } catch (error) {
            console.log(error)
        }

        console.log("Enviando")
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaAcutal,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}          

        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext